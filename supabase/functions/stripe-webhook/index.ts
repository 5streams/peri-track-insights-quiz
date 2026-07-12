import {
  recordPayment,
  scheduleEmail,
  sendEmail,
  stripe,
  supabaseAdmin,
  updateLead,
  updateLeadByCustomer,
  updateLeadBySubscription,
} from "../_shared/stripe.ts";

const whsec = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

async function leadIdFromSubscription(subId: string): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from("leads")
    .select("id")
    .eq("stripe_subscription_id", subId)
    .maybeSingle();
  return data?.id ?? null;
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("missing signature", { status: 400 });
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig, whsec);
  } catch (err) {
    console.error("webhook signature check failed:", err);
    return new Response("bad signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as any;
        if (s.mode !== "payment") break;
        const lead_id = s.metadata?.lead_id as string | undefined;
        const trial_days = parseInt(s.metadata?.trial_days ?? "7", 10);
        if (!lead_id) break;

        // Idempotency guard on the payment intent.
        const inserted = await recordPayment(
          lead_id,
          s.payment_intent as string,
          "trial_fee",
          s.amount_total ?? 0,
        );
        if (!inserted) return new Response("ok"); // duplicate delivery

        // Capture the saved card as default.
        const pi = await stripe.paymentIntents.retrieve(s.payment_intent as string);
        const pm = pi.payment_method as string;
        await stripe.customers.update(s.customer as string, {
          invoice_settings: { default_payment_method: pm },
        });

        const trialEnd = Math.floor(Date.now() / 1000) + trial_days * 24 * 3600;
        const sub = await stripe.subscriptions.create({
          customer: s.customer as string,
          items: [{ price: Deno.env.get("STRIPE_PRICE_MONTHLY")! }],
          trial_end: trialEnd,
          default_payment_method: pm,
          metadata: { lead_id },
          trial_settings: {
            end_behavior: { missing_payment_method: "cancel" },
          },
        });

        await updateLead(lead_id, {
          status: "trial_active",
          stripe_subscription_id: sub.id,
          trial_ends_at: new Date(trialEnd * 1000).toISOString(),
        });
        await scheduleEmail(
          lead_id,
          "trial_reminder",
          new Date((trialEnd - 2 * 24 * 3600) * 1000),
        );
        await sendEmail(lead_id, "trial_welcome");
        break;
      }

      case "invoice.paid": {
        const inv = event.data.object as any;
        if ((inv.amount_paid ?? 0) <= 0) break;
        const recorded = await recordPayment(
          null,
          inv.id,
          "subscription",
          inv.amount_paid,
        );
        if (!recorded) return new Response("ok");
        const subId = inv.subscription as string | null;
        if (subId) {
          const leadId = await leadIdFromSubscription(subId);
          if (leadId) {
            await updateLead(leadId, { status: "subscribed" });
            await supabaseAdmin
              .from("payments")
              .update({ lead_id: leadId })
              .eq("stripe_object_id", inv.id);
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const inv = event.data.object as any;
        const subId = inv.subscription as string | null;
        if (subId) {
          await updateLeadBySubscription(subId, { status: "past_due" });
          const leadId = await leadIdFromSubscription(subId);
          if (leadId) await sendEmail(leadId, "payment_failed");
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await updateLeadBySubscription(sub.id, { status: "canceled" });
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as any;
        const patch: Record<string, unknown> = {};
        if (sub.status === "trialing") patch.status = "trial_active";
        else if (sub.status === "active") patch.status = "subscribed";
        else if (sub.status === "canceled") patch.status = "canceled";
        else if (sub.status === "past_due") patch.status = "past_due";
        if (Object.keys(patch).length) await updateLeadBySubscription(sub.id, patch);
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as any;
        await updateLeadByCustomer(charge.customer as string, { status: "refunded" });
        await recordPayment(
          null,
          `refund_${charge.id}`,
          "refund",
          -(charge.amount_refunded ?? 0),
        );
        break;
      }

      case "charge.dispute.created": {
        const dispute = event.data.object as any;
        console.error("[dispute] charge=", dispute.charge, "amount=", dispute.amount);
        // TODO: hook admin notification
        break;
      }

      default:
        // ignore other events
        break;
    }

    return new Response("ok");
  } catch (err) {
    console.error("webhook handler error:", err, "event=", event.type);
    return new Response("handler error", { status: 500 });
  }
});