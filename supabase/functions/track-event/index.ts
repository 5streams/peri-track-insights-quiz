import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const session_id: string = body.session_id;
    const event: string = body.event; // 'landing' | 'email' | 'quiz_complete' | 'paywall'
    if (!session_id || !event) {
      return new Response(JSON.stringify({ error: "session_id and event required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const now = new Date().toISOString();
    const patch: Record<string, unknown> = { session_id };

    if (event === "landing") {
      patch.landed_at = now;
      patch.traffic_source = body.traffic_source ?? null;
      patch.utm_medium = body.utm_medium ?? null;
      patch.utm_campaign = body.utm_campaign ?? null;
      patch.utm_content = body.utm_content ?? null;
      patch.utm_term = body.utm_term ?? null;
      patch.gclid = body.gclid ?? null;
      patch.referrer = body.referrer ?? null;
      patch.landing_page = body.landing_page ?? null;
      patch.status = "landed";
    } else if (event === "email") {
      patch.email_submitted_at = now;
      if (body.email) patch.email = body.email;
      if (body.name) patch.name = body.name;
      patch.status = "email_captured";
    } else if (event === "quiz_complete") {
      patch.quiz_completed_at = now;
      if (body.quiz_results) patch.quiz_results = body.quiz_results;
      patch.status = "quiz_completed";
    } else if (event === "paywall") {
      patch.paywall_reached_at = now;
      patch.status = "paywall_reached";
    }

    // Try update by session_id first; insert if none.
    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("session_id", session_id)
      .maybeSingle();

    if (existing) {
      // Don't overwrite existing name/email with null/undefined
      const clean = Object.fromEntries(
        Object.entries(patch).filter(([, v]) => v !== undefined && v !== null || ["landed_at","email_submitted_at","quiz_completed_at","paywall_reached_at","status"].includes(_ as never))
      );
      // Simpler: strip undefined only
      const upd: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(patch)) if (v !== undefined) upd[k] = v;
      await supabase.from("leads").update(upd).eq("id", existing.id);
    } else {
      const ins: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(patch)) if (v !== undefined) ins[k] = v;
      await supabase.from("leads").insert(ins);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("track-event error", e);
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});