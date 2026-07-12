import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const ADMIN_PASSWORD = "2025";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const pw = req.headers.get("x-admin-password");
  if (pw !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, session_id, name, email, traffic_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, referrer, landing_page, status, landed_at, email_submitted_at, quiz_completed_at, paywall_reached_at, trial_price_cents, upsell_kit, stripe_customer_id, stripe_subscription_id, quiz_results, created_at",
      )
      .or("traffic_source.eq.google,traffic_source.eq.google_ads,utm_medium.eq.cpc,gclid.not.is.null")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) throw error;

    return new Response(JSON.stringify({ leads: data ?? [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin-google-leads error", e);
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});