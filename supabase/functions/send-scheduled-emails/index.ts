import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { data: due, error } = await supabase
      .from("scheduled_emails")
      .select("id, lead_id, template, send_at")
      .is("sent_at", null)
      .lte("send_at", new Date().toISOString())
      .limit(100);
    if (error) throw error;

    let sent = 0;
    for (const row of due || []) {
      const { data: lead } = await supabase
        .from("leads")
        .select("email, name, trial_ends_at")
        .eq("id", (row as any).lead_id)
        .maybeSingle();
      console.log("[email dispatch]", {
        template: (row as any).template,
        to: (lead as any)?.email,
        name: (lead as any)?.name,
        trial_ends_at: (lead as any)?.trial_ends_at,
      });
      await supabase
        .from("scheduled_emails")
        .update({ sent_at: new Date().toISOString() })
        .eq("id", (row as any).id);
      sent++;
    }
    return new Response(JSON.stringify({ sent }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-scheduled-emails error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
