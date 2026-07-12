import Stripe from "https://esm.sh/stripe@17.5.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-11-20.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

export const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

export async function getLead(id: string) {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateLead(id: string, patch: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from("leads").update(patch).eq("id", id);
  if (error) throw error;
}

export async function updateLeadBySubscription(
  subId: string,
  patch: Record<string, unknown>,
) {
  const { error } = await supabaseAdmin
    .from("leads")
    .update(patch)
    .eq("stripe_subscription_id", subId);
  if (error) throw error;
}

export async function updateLeadByCustomer(
  customerId: string,
  patch: Record<string, unknown>,
) {
  const { error } = await supabaseAdmin
    .from("leads")
    .update(patch)
    .eq("stripe_customer_id", customerId);
  if (error) throw error;
}

/**
 * Idempotent payment record. Returns false if already recorded (duplicate delivery).
 */
export async function recordPayment(
  leadId: string | null,
  stripeObjectId: string,
  kind: string,
  amountCents: number,
): Promise<boolean> {
  const { error } = await supabaseAdmin.from("payments").insert({
    lead_id: leadId,
    stripe_object_id: stripeObjectId,
    kind,
    amount_cents: amountCents,
  });
  if (error) {
    if ((error as { code?: string }).code === "23505") return false;
    throw error;
  }
  return true;
}

export async function scheduleEmail(
  leadId: string,
  template: string,
  sendAt: Date,
) {
  const { error } = await supabaseAdmin.from("scheduled_emails").insert({
    lead_id: leadId,
    template,
    send_at: sendAt.toISOString(),
  });
  if (error) throw error;
}

export async function sendEmail(leadId: string, template: string) {
  // Placeholder: log the send. Wire to Resend / Lovable Emails later.
  console.log(`[email] lead=${leadId} template=${template}`);
}