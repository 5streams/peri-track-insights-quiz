import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, createStripeClient, detectEnv } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method not allowed" }, 405);
  try {
    const { lead_id } = await req.json();
    if (!lead_id) return json({ error: "lead_id required" }, 400);

    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", lead_id)
      .maybeSingle();
    if (error) throw error;
    if (!lead) return json({ error: "lead not found" }, 404);
    if (lead.upsell_kit) return json({ ok: true, already: true });
    if (!lead.stripe_customer_id) return json({ error: "no customer on file" }, 400);

    const env = detectEnv();
    const stripe = createStripeClient(env);

    const customer: any = await stripe.customers.retrieve(lead.stripe_customer_id);
    const pm = customer?.invoice_settings?.default_payment_method;
    if (!pm) return json({ error: "no saved payment method" }, 400);

    try {
      const pi = await stripe.paymentIntents.create({
        amount: 1499,
        currency: "usd",
        customer: lead.stripe_customer_id,
        payment_method: pm,
        off_session: false,
        confirm: true,
        statement_descriptor_suffix: "DRKIT",
        description: "Doctor Visit Kit",
        metadata: { lead_id, kind: "upsell_kit" },
      });

      await supabase.from("leads").update({ upsell_kit: true }).eq("id", lead_id);
      await supabase
        .from("payments")
        .insert({ lead_id, stripe_object_id: pi.id, kind: "upsell", amount_cents: 1499 });
      await supabase.from("scheduled_emails").insert({
        lead_id,
        template: "kit_delivery",
        send_at: new Date().toISOString(),
      });
      return json({ ok: true });
    } catch (e: any) {
      if (e.code === "authentication_required") {
        return json({
          requires_action: true,
          client_secret: e.raw?.payment_intent?.client_secret,
        });
      }
      console.error("upsell payment failed", e);
      return json({ error: "payment_failed", detail: e.message }, 402);
    }
  } catch (e) {
    console.error("purchase-upsell error", e);
    return json({ error: (e as Error).message }, 500);
  }
});
