import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
    </div>
  );
};

export default PriceChoice;
