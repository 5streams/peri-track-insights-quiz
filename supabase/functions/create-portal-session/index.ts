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
    const { lead_id, email } = await req.json();
    let lead: any = null;
    if (lead_id) {
      const { data } = await supabase.from("leads").select("*").eq("id", lead_id).maybeSingle();
      lead = data;
    } else if (email) {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      lead = data;
    }
    if (!lead?.stripe_customer_id) return json({ error: "no customer on file" }, 404);

    const env = detectEnv();
    const stripe = createStripeClient(env);
    const siteUrl = Deno.env.get("SITE_URL") || "https://peri-track-insights-quiz.lovable.app";
    const portal = await stripe.billingPortal.sessions.create({
      customer: lead.stripe_customer_id,
      return_url: `${siteUrl}/account`,
    });
    return json({ url: portal.url });
  } catch (e) {
    console.error("create-portal-session error", e);
    return json({ error: (e as Error).message }, 500);
  }
});
