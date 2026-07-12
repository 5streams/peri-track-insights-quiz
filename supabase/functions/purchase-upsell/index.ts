import {
  corsHeaders,
  getLead,
  json,
  recordPayment,
  sendEmail,
  stripe,
  updateLead,
} from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { lead_id } = await req.json().catch(() => ({}));
    if (!lead_id) return json({ error: "missing lead_id" }, 400);

    const lead = await getLead(lead_id);
    if (!lead) return json({ error: "lead not found" }, 404);
    if (lead.upsell_kit) return json({ ok: true, already: true });
    if (!lead.stripe_customer_id) {
      return json({ error: "no customer on file" }, 400);
    }

    const customer = await stripe.customers.retrieve(lead.stripe_customer_id);
    const defaultPm =
      (customer as any).invoice_settings?.default_payment_method as string | null;
    if (!defaultPm) return json({ error: "no saved card" }, 400);

    try {
      const pi = await stripe.paymentIntents.create({
        amount: 1499,
        currency: "usd",
        customer: lead.stripe_customer_id,
        payment_method: defaultPm,
        off_session: false,
        confirm: true,
        statement_descriptor_suffix: "DRKIT",
        metadata: { lead_id, kind: "upsell_kit" },
      });
      await recordPayment(lead_id, pi.id, "upsell", 1499);
      await updateLead(lead_id, { upsell_kit: true });
      await sendEmail(lead_id, "kit_delivery");
      return json({ ok: true });
    } catch (err) {
      const anyErr = err as any;
      if (anyErr?.code === "authentication_required") {
        return json({
          requires_action: true,
          client_secret: anyErr.raw?.payment_intent?.client_secret,
        });
      }
      console.error("upsell charge failed:", err);
      return json({ error: "payment_failed" }, 402);
    }
  } catch (err) {
    console.error("purchase-upsell error:", err);
    return json({ error: (err as Error).message ?? "server_error" }, 500);
  }
});