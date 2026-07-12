import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const UpsellPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const leadId = params.get("lead");
  const [loading, setLoading] = useState<null | "yes" | "no">(null);
  const [error, setError] = useState<string | null>(null);

  const buyKit = async () => {
    if (!leadId) return;
    setLoading("yes");
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke("purchase-upsell", {
        body: { lead_id: leadId },
      });
      if (error) throw error;
      if (data?.requires_action) {
        setError("Additional card verification is required. Please contact support.");
        setLoading(null);
        return;
      }
      navigate(`/confirm?lead=${leadId}&kit=1`);
    } catch (e: any) {
      setError(e?.message || "Could not process payment. Your card on file was not charged.");
      setLoading(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7EDE2", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 16, padding: "36px 28px", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "#B8629B", fontWeight: 700 }}>
          One-time offer — added to your order
        </div>
        <h1 style={{ fontFamily: "'Iowan Old Style', Palatino, Georgia, serif", fontSize: 30, lineHeight: 1.2, margin: "10px 0 12px", color: "#3B2233" }}>
          Walk into your doctor's office and get taken seriously.
        </h1>
        <p style={{ color: "#6E5665", fontSize: 17, marginBottom: 20 }}>
          Most women get 9 minutes and a shrug. The <b>Doctor Visit Kit</b> changes that conversation.
        </p>
        <ul style={{ background: "#FBE9EF", borderRadius: 12, padding: "16px 20px 16px 36px", color: "#3B2233", fontSize: 15, lineHeight: 1.5 }}>
          <li><b>The HRT Conversation Script</b> — the exact words that move a dismissive appointment forward</li>
          <li><b>The Complete Labs Checklist</b> — every marker worth requesting, and why</li>
          <li><b>Your Printable Symptom Log</b> — 30 days of evidence no doctor can wave away</li>
          <li><b>The Red-Flag Guide</b> — when to push back, when to find a new provider</li>
        </ul>
        <div style={{ textAlign: "center", margin: "22px 0 6px" }}>
          <div style={{ fontFamily: "'Iowan Old Style', Palatino, Georgia, serif", fontSize: 44, color: "#3B2233" }}>$14.99</div>
          <div style={{ color: "#6E5665", fontSize: 13 }}>
            One-time. Instant download. Added to the card on file only if you tap yes below.
          </div>
        </div>
        {error && <div style={{ color: "#B00020", fontSize: 14, textAlign: "center", margin: "10px 0" }}>{error}</div>}
        <button
          onClick={buyKit}
          disabled={loading !== null || !leadId}
          style={{ width: "100%", padding: "16px", background: "#C9A227", color: "#fff", border: 0, borderRadius: 10, fontSize: 17, fontWeight: 700, cursor: "pointer", marginTop: 14 }}
        >
          {loading === "yes" ? "Charging your card on file…" : "Yes — add the Doctor Visit Kit ($14.99)"}
        </button>
        <button
          onClick={() => navigate(`/confirm?lead=${leadId}`)}
          disabled={loading !== null}
          style={{ width: "100%", padding: "12px", background: "transparent", color: "#6E5665", border: 0, fontSize: 14, cursor: "pointer", marginTop: 8 }}
        >
          No thanks, continue to my plan
        </button>
      </div>
    </div>
  );
};

export default UpsellPage;