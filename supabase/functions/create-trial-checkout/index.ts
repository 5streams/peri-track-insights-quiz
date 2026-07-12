import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, createStripeClient, detectEnv } from "../_shared/stripe.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ALLOWED_CENTS = [100, 200, 1000, 1734];
const ALLOWED_DAYS = [7, 14];

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
    const body = await req.json();
    const trial_price_cents = Number(body.trial_price_cents);
    const trial_days = Number(body.trial_days);
    if (!ALLOWED_CENTS.includes(trial_price_cents)) return json({ error: "bad amount" }, 400);
    if (!ALLOWED_DAYS.includes(trial_days)) return json({ error: "bad trial" }, 400);

    const email: string | null = body.email || null;
    const name: string | null = body.name || null;
    let lead_id: string | null = body.lead_id || null;
    const add_kit: boolean = !!body.add_kit;
    const embedded: boolean = !!body.embedded;

    let lead: any = null;
    if (lead_id) {
      const { data } = await supabase.from("leads").select("*").eq("id", lead_id).maybeSingle();
      lead = data;
    }
    if (!lead && email) {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      lead = data;
    }
    if (!lead) {
      const { data, error } = await supabase
        .from("leads")
        .insert({ email, name, status: "checkout_started" })
        .select("*")
        .single();
      if (error) throw error;
      lead = data;
    }
    lead_id = lead.id;

    const env = detectEnv();
    const stripe = createStripeClient(env);

    let customerId: string | null = lead.stripe_customer_id;
    if (!customerId) {
      if (email) {
        const existing = await stripe.customers.list({ email, limit: 1 });
        if (existing.data.length) customerId = existing.data[0].id;
      }
      if (!customerId) {
        const c = await stripe.customers.create({
          ...(email && { email }),
          ...(name && { name }),
          metadata: { lead_id: lead_id! },
        });
        customerId = c.id;
      } else {
        await stripe.customers.update(customerId, { metadata: { lead_id: lead_id! } });
      }
    }

    const siteUrl = Deno.env.get("SITE_URL") || "https://peri-track-insights-quiz.lovable.app";

    const line_items: any[] = [
      {
        price_data: {
          currency: "usd",
          unit_amount: trial_price_cents,
          product_data: {
            name: `${trial_days}-Day Full-Access Trial — Become Her Again`,
          },
        },
        quantity: 1,
      },
    ];
    if (add_kit) {
      line_items.push({
        price_data: {
          currency: "usd",
          unit_amount: 1499,
          product_data: {
            name: "Doctor Visit Kit — one-time add-on",
          },
        },
        quantity: 1,
      });
    }

    const sessionParams: any = {
      mode: "payment",
      customer: customerId!,
      line_items,
      payment_intent_data: {
        setup_future_usage: "off_session",
        statement_descriptor_suffix: "TRIAL",
        description: add_kit
          ? `${trial_days}-day trial + Doctor Visit Kit`
          : `${trial_days}-day trial fee`,
        metadata: {
          lead_id: lead_id!,
          trial_days: String(trial_days),
          kit: add_kit ? "1" : "0",
        },
      },
      custom_text: {
        submit: {
          message: `After your ${trial_days}-day trial, your membership continues at $29.99/month unless you cancel. Cancel anytime in one tap. We'll email you a reminder 2 days before your trial ends.`,
        },
      },
      metadata: {
        lead_id: lead_id!,
        trial_days: String(trial_days),
        trial_price_cents: String(trial_price_cents),
        kit: add_kit ? "1" : "0",
      },
    };

    if (embedded) {
      sessionParams.ui_mode = "embedded_page";
      sessionParams.return_url = `${siteUrl}/confirm?lead=${lead_id}${add_kit ? "&kit=1" : ""}&session_id={CHECKOUT_SESSION_ID}`;
    } else {
      sessionParams.success_url = `${siteUrl}/confirm?lead=${lead_id}${add_kit ? "&kit=1" : ""}&session_id={CHECKOUT_SESSION_ID}`;
      sessionParams.cancel_url = `${siteUrl}/?checkout=cancelled&lead=${lead_id}`;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    await supabase
      .from("leads")
      .update({
        status: "checkout_started",
        stripe_customer_id: customerId,
        trial_price_cents,
        trial_days,
        ...(email && !lead.email && { email }),
        ...(name && !lead.name && { name }),
      })
      .eq("id", lead_id!);

    return json({
      url: session.url,
      client_secret: (session as any).client_secret,
      lead_id,
    });
  } catch (e) {
    console.error("create-trial-checkout error", e);
    return json({ error: (e as Error).message }, 500);
  }
});
