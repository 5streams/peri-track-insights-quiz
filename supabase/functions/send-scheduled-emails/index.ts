import { corsHeaders, json, sendEmail, supabaseAdmin } from "../_shared/stripe.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const nowIso = new Date().toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("scheduled_emails")
      .select("id, lead_id, template")
      .is("sent_at", null)
      .lte("send_at", nowIso)
      .limit(200);
    if (error) throw error;

    let sent = 0;
    for (const row of rows ?? []) {
      await sendEmail(row.lead_id, row.template);
      await supabaseAdmin
        .from("scheduled_emails")
        .update({ sent_at: new Date().toISOString() })
        .eq("id", row.id);
      sent++;
    }
    return json({ ok: true, sent });
  } catch (err) {
    console.error("send-scheduled-emails error:", err);
    return json({ error: (err as Error).message ?? "server_error" }, 500);
  }
});