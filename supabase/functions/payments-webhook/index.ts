import { createClient } from "npm:@supabase/supabase-js@2";
import { createStripeClient, verifyWebhook, type StripeEnv } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function recordPayment(
  lead_id: string | null,
  stripe_object_id: string,
  kind: string,
  amount_cents: number,
): Promise<boolean> {
  const { error } = await supabase
    .from("payments")
    .insert({ lead_id, stripe_object_id, kind, amount_cents });
  if (error) {
    if ((error as any).code === "23505") return false;
    throw error;
  }
  return true;
}

async function findLeadIdByCustomer(customerId: string): Promise<string | null> {
  const { data } = await supabase
    .from("leads")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return (data as any)?.id ?? null;
}

async function findLeadIdBySubscription(subId: string): Promise<string | null> {
  const { data } = await supabase
    .from("leads")
    .select("id")
    .eq("stripe_subscription_id", subId)
    .maybeSingle();
  return (data as any)?.id ?? null;
}

async function scheduleEmail(lead_id: string, template: string, send_at: Date) {
  await supabase.from("scheduled_emails").insert({
    lead_id,
    template,
    send_at: send_at.toISOString(),
  });
}

async function resolvePriceId(stripe: ReturnType<typeof createStripeClient>, lookupKey: string) {
  const list = await stripe.prices.list({ lookup_keys: [lookupKey] });
  if (!list.data.length) throw new Error(`Missing price with lookup_key ${lookupKey}`);
  return list.data[0].id;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const rawEnv = new URL(req.url).searchParams.get("env");
  const env: StripeEnv = rawEnv === "live" ? "live" : "sandbox";
  try {
    const event = await verifyWebhook(req, env);
    const stripe = createStripeClient(env);

    switch (event.type) {
      case "checkout.session.completed": {
        const s: any = event.data.object;
        if (s.mode !== "payment") break;
        const lead_id = s.metadata?.lead_id;
        const trial_days = parseInt(s.metadata?.trial_days || "7", 10);
        if (!lead_id) {
          console.error("checkout.session.completed missing lead_id");
          break;
        }
        const inserted = await recordPayment(lead_id, s.id, "trial_fee", s.amount_total || 0);
        if (!inserted) break;

        const pi = await stripe.paymentIntents.retrieve(s.payment_intent as string);
        const pm = pi.payment_method as string;
        await stripe.customers.update(s.customer as string, {
          invoice_settings: { default_payment_method: pm },
        });

        const trialEnd = Math.floor(Date.now() / 1000) + trial_days * 24 * 3600;
        const priceId = await resolvePriceId(stripe, "membership_monthly");
        const sub = await stripe.subscriptions.create({
          customer: s.customer as string,
          items: [{ price: priceId }],
          trial_end: trialEnd,
          default_payment_method: pm,
          metadata: { lead_id },
          trial_settings: { end_behavior: { missing_payment_method: "cancel" } },
        });

        await supabase
          .from("leads")
          .update({
            status: "trial_active",
            stripe_subscription_id: sub.id,
            trial_ends_at: new Date(trialEnd * 1000).toISOString(),
          })
          .eq("id", lead_id);

        await scheduleEmail(
          lead_id,
          "trial_reminder",
          new Date((trialEnd - 2 * 24 * 3600) * 1000),
        );
        await scheduleEmail(lead_id, "trial_welcome", new Date());
        break;
      }

      case "invoice.paid":
      case "invoice.payment_succeeded": {
        const inv: any = event.data.object;
        if ((inv.amount_paid || 0) <= 0) break;
        const subId = inv.subscription;
        const lead_id = subId ? await findLeadIdBySubscription(subId) : null;
        if (!lead_id) break;
        const inserted = await recordPayment(lead_id, inv.id, "subscription", inv.amount_paid);
        if (!inserted) break;
        await supabase.from("leads").update({ status: "subscribed" }).eq("id", lead_id);
        break;
      }

      case "invoice.payment_failed": {
        const inv: any = event.data.object;
        const subId = inv.subscription;
        if (!subId) break;
        const lead_id = await findLeadIdBySubscription(subId);
        if (!lead_id) break;
        await supabase.from("leads").update({ status: "past_due" }).eq("id", lead_id);
        await scheduleEmail(lead_id, "payment_failed", new Date());
        break;
      }

      case "customer.subscription.updated": {
        const sub: any = event.data.object;
        const lead_id = await findLeadIdBySubscription(sub.id);
        if (!lead_id) break;
        const status =
          sub.status === "trialing"
            ? "trial_active"
            : sub.status === "active"
            ? "subscribed"
            : sub.status === "past_due"
            ? "past_due"
            : sub.status === "canceled"
            ? "canceled"
            : undefined;
        if (status) await supabase.from("leads").update({ status }).eq("id", lead_id);
        break;
      }

      case "customer.subscription.deleted": {
        const sub: any = event.data.object;
        const lead_id = await findLeadIdBySubscription(sub.id);
        if (lead_id) await supabase.from("leads").update({ status: "canceled" }).eq("id", lead_id);
        break;
      }

      case "charge.refunded": {
        const ch: any = event.data.object;
        const lead_id = await findLeadIdByCustomer(ch.customer);
        if (lead_id) await supabase.from("leads").update({ status: "refunded" }).eq("id", lead_id);
        break;
      }

      case "charge.dispute.created": {
        console.error("DISPUTE CREATED", JSON.stringify(event.data.object));
        break;
      }

      default:
        console.log("Unhandled event:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("webhook error", e);
    return new Response("Webhook error", { status: 400 });
  }
});
