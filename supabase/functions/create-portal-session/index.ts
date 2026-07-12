import { corsHeaders, getLead, json, stripe } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { lead_id } = await req.json().catch(() => ({}));
    if (!lead_id) return json({ error: "missing lead_id" }, 400);
    const lead = await getLead(lead_id);
    if (!lead?.stripe_customer_id) return json({ error: "no customer" }, 404);

    const session = await stripe.billingPortal.sessions.create({
      customer: lead.stripe_customer_id,
      return_url: `${Deno.env.get("SITE_URL") ?? ""}/account`,
    });
    return json({ url: session.url });
  } catch (err) {
    console.error("portal error:", err);
    return json({ error: (err as Error).message ?? "server_error" }, 500);
  }
});