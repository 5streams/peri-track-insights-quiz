import {
  corsHeaders,
  getLead,
  json,
  stripe,
  supabaseAdmin,
  updateLead,
} from "../_shared/stripe.ts";

const ALLOWED_PRICES = new Set([100, 500, 900, 1700]);
const ALLOWED_TRIALS = new Set([7, 14]);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    let { lead_id, trial_price_cents, trial_days, name, email } = body;

    trial_price_cents = Number(trial_price_cents);
    trial_days = Number(trial_days);

    if (!ALLOWED_PRICES.has(trial_price_cents)) return json({ error: "bad amount" }, 400);
    if (!ALLOWED_TRIALS.has(trial_days)) return json({ error: "bad trial" }, 400);

    // Upsert lead: allow first-touch creation from client if no lead_id yet.
    let lead = null as any;
    if (lead_id) {
      lead = await getLead(lead_id);
    }
    if (!lead && email) {
      const { data: existing } = await supabaseAdmin
        .from("leads")
        .select("*")
        .eq("email", email)
        .maybeSingle();
      if (existing) lead = existing;
    }
    if (!lead) {
      const { data: inserted, error } = await supabaseAdmin
        .from("leads")
        .insert({ email: email ?? null, name: name ?? null, status: "email_captured" })
        .select()
        .single();
      if (error) throw error;
      lead = inserted;
    }

    // One Stripe Customer per email — reuse if we have one.
    let customerId = lead.stripe_customer_id as string | null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: lead.email ?? email ?? undefined,
        name: lead.name ?? name ?? undefined,
        metadata: { lead_id: lead.id },
      });
      customerId = customer.id;
      await updateLead(lead.id, { stripe_customer_id: customerId });
    }

    const siteUrl = Deno.env.get("SITE_URL") ?? "";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: customerId,
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: trial_price_cents,
          product_data: {
            name: `${trial_days}-Day Full-Access Trial — Become Her Again`,
          },
        },
        quantity: 1,
      }],
      payment_intent_data: {
        setup_future_usage: "off_session",
        statement_descriptor_suffix: "TRIAL",
        metadata: {
          lead_id: lead.id,
          trial_days: String(trial_days),
        },
      },
      custom_text: {
        submit: {
          message:
            `After your ${trial_days}-day trial, your membership continues at $29.99/month unless you cancel. Cancel anytime in one tap. We'll email you a reminder 2 days before your trial ends.`,
        },
      },
      consent_collection: { terms_of_service: "required" },
      success_url: `${siteUrl}/upsell?lead=${lead.id}`,
      cancel_url: `${siteUrl}/paywall?lead=${lead.id}`,
      metadata: {
        lead_id: lead.id,
        trial_days: String(trial_days),
        trial_price_cents: String(trial_price_cents),
      },
    });

    await updateLead(lead.id, {
      status: "checkout_started",
      trial_price_cents,
      trial_days,
    });

    return json({ url: session.url, lead_id: lead.id });
  } catch (err) {
    console.error("create-trial-checkout error:", err);
    return json({ error: (err as Error).message ?? "server_error" }, 500);
  }
});