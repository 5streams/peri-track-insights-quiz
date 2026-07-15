import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, ShieldCheck } from "lucide-react";
import couple7 from "@/assets/testimonial-couple-7.jpg";
import couple8 from "@/assets/testimonial-couple-8.jpg";

interface PriceChoiceProps {
  email: string;
  firstName?: string;
  /**
   * "checkout" (default) — call create-trial-checkout immediately and redirect
   *                        to Stripe. Kept for backwards compatibility.
   * "select"             — do NOT call any payment function. Instead, invoke
   *                        `onContinue(selectedCents)` so the parent page can
   *                        persist the choice and navigate to the next step.
   */
  mode?: "checkout" | "select";
  onContinue?: (cents: number) => void | Promise<void>;
}

/**
 * The choose-your-trial-price offer.
 * Charges the chosen amount today via Stripe Checkout (create-trial-checkout
 * edge function), which saves the card and starts the 7-day trial; the
 * $29.99/month subscription begins at trial end unless canceled.
 *
 * COMPLIANCE — do not remove:
 *  - The disclosure box below the buttons must always render.
 *  - The "$17 to build and support every plan" figure must reflect a true,
 *    documentable fully-loaded cost. If it isn't substantiated, change the
 *    headline to neutral copy ("Choose what works for you today") before launch.
 */
const OPTIONS = [
  { cents: 100, label: "$1" },
  { cents: 200, label: "$2" },
  { cents: 1000, label: "$10" },
  { cents: 1734, label: "$17.34", tag: "Cost to cover our team's effort" },
];

const PriceChoice: React.FC<PriceChoiceProps> = ({ email, firstName, mode = "checkout", onContinue }) => {
  const [selected, setSelected] = useState(1000);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleContinue = async () => {
    setLoading(true);
    if (mode === "select") {
      try {
        await onContinue?.(selected);
      } finally {
        setLoading(false);
      }
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke("create-trial-checkout", {
        body: {
          email,
          name: firstName || null,
          trial_price_cents: selected,
          trial_days: 7,
        },
      });
      if (error || !data?.url) throw error || new Error("no checkout url");
      window.location.href = data.url;
    } catch (e) {
      console.error("trial checkout failed", e);
      toast({
        title: "Something went wrong",
        description: "We couldn't open secure checkout. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div
      id="trial-offer"
      style={{
        background: "white",
        border: "2px solid #D4AF37",
        borderRadius: "12px",
        padding: "30px",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#D4AF37",
          fontWeight: 700,
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        Choose your trial price
      </div>
      <p
        style={{
          fontSize: "19px",
          color: "#555",
          maxWidth: "560px",
          margin: "0 auto 16px",
          lineHeight: 1.55,
        }}
      >
        Joining a new program can be daunting, but we're here to help.
      </p>
      <p
        style={{
          fontSize: "19px",
          color: "#555",
          maxWidth: "560px",
          margin: "0 auto 20px",
          lineHeight: 1.55,
        }}
      >
        Try our program with a 7-day trial at a price that suits your budget
        — no hidden fees or obligations. We believe that your wellness should
        never be hindered by money.
      </p>
      {/* The $17.34 figure must reflect a true, documentable per-plan cost. */}
      <p
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#2C3E50",
          maxWidth: "560px",
          margin: "0 auto 12px",
          lineHeight: 1.45,
        }}
      >
        It costs us $17.34 to pay our team, but please select an option that
        works best for you.
      </p>
      <p
        style={{
          fontSize: "17px",
          color: "#6B4E7A",
          maxWidth: "560px",
          margin: "0 auto 22px",
        }}
      >
        You won't be charged at this step.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "12px",
          maxWidth: "560px",
          margin: "0 auto 18px",
        }}
      >
        {OPTIONS.map((o) => {
          const active = selected === o.cents;
          return (
            <button
              key={o.cents}
              onClick={() => setSelected(o.cents)}
              style={{
                padding: "16px 8px",
                borderRadius: "12px",
                border: active ? "2px solid #6B4E7A" : "1.5px solid #ddd",
                background: active ? "#f8f6ff" : "white",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "26px", fontWeight: 700, color: "#6B4E7A" }}>
                {o.label}
              </div>
              {o.tag && (
                <div style={{ fontSize: "12px", color: "#8B7A94", marginTop: "4px" }}>
                  {o.tag}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* DISCLOSURE — required on this screen; do not remove or shrink */}
      <div
        style={{
          background: "#f8f6ff",
          border: "1.5px solid #e8e2f0",
          borderRadius: "12px",
          padding: "16px",
          maxWidth: "560px",
          margin: "0 auto 22px",
        }}
      >
        <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#555", margin: 0 }}>
          Whatever you choose today starts a <strong>7-day trial with full access</strong>.
          After 7 days it's <strong>$29.99/month</strong> unless you cancel — one tap,
          and we'll email you a reminder <strong>2 days before</strong> your trial ends.
          Nothing hidden in the number.
        </p>
      </div>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleContinue}
          disabled={loading}
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)",
            color: "#2C3E50",
            border: "none",
            padding: "20px 44px",
            fontSize: "22px",
            fontWeight: "bold",
            borderRadius: "50px",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? (mode === "select" ? "Saving…" : "Opening secure checkout…")
            : "Continue"}
        </button>
        <p style={{ fontSize: "14px", color: "#888", marginTop: "10px" }}>
          Secure checkout by Stripe · Cancel anytime in one tap
        </p>
      </div>

      {/* Trust bar */}
      <div
        style={{
          maxWidth: 560,
          margin: "28px auto 0",
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={trustPill}>
          <Lock size={14} color="#5c4553" /> 256-bit SSL Encrypted
        </div>
        <div style={trustPill}>
          <ShieldCheck size={14} color="#5c4553" /> Powered by Stripe
        </div>
        <div style={trustPill}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 2l3 6 6 .9-4.5 4.4 1 6.7L12 17l-5.5 3 1-6.7L3 8.9 9 8z" fill="#C29455"/></svg>
          PCI-DSS Compliant
        </div>
      </div>

      {/* Social proof */}
      <p
        style={{
          maxWidth: 560,
          margin: "18px auto 0",
          textAlign: "center",
          fontSize: 16,
          lineHeight: 1.55,
          color: "#46293F",
          fontWeight: 700,
        }}
      >
        Join over 6,000+ women who have rediscovered their desire again.
      </p>

      {/* Testimonials */}
      <div style={{ maxWidth: 560, margin: "22px auto 0", display: "grid", gap: 14 }}>
        {[
          {
            photo: couple7,
            name: "Jenna & Scott W.",
            quote:
              "I had pretty much accepted that the physical part of our marriage was over. We were good roommates and I figured that was enough. A few weeks into the program I started noticing I was actually thinking about him during the day. Now I reach for him without overthinking it. It's been really nice — and honestly kind of fun again.",
          },
          {
            photo: couple8,
            name: "Sofia & Tony D.",
            quote:
              "I started the program by myself because I didn't want to make it into a big thing with my husband. After about three weeks he randomly said 'I feel like I got my wife back' and I almost started crying. I hadn't realized how far away I'd gotten. The wanting is back and I'm the one pulling him close now. It feels natural again.",
          },
        ].map((t) => (
          <div
            key={t.name}
            style={{
              background: "#fff",
              border: "1px solid #EFDFE7",
              borderRadius: 16,
              padding: 20,
              boxShadow: "0 8px 20px rgba(70,41,63,.06)",
              textAlign: "left",
            }}
          >
            <div style={{ color: "#C29455", letterSpacing: 3, fontSize: 14, marginBottom: 10 }}>★★★★★</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#46293F", margin: "0 0 12px", fontStyle: "italic" }}>
              "{t.quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={t.photo}
                alt={t.name}
                loading="lazy"
                width={48}
                height={48}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #EFDFE7",
                  flexShrink: 0,
                }}
              />
              <div style={{ fontWeight: 700, color: "#46293F", fontSize: 14 }}>— {t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const trustPill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 14px",
  borderRadius: 99,
  background: "#F9F0F4",
  border: "1px solid #EFDFE7",
  color: "#5c4553",
  fontSize: 12.5,
  fontWeight: 600,
};

export default PriceChoice;
