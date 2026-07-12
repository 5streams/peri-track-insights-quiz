import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ConfirmPage = () => {
  const [params] = useSearchParams();
  const leadId = params.get("lead");
  const kit = params.get("kit") === "1";
  const [loading, setLoading] = useState(false);

  const openPortal = async () => {
    if (!leadId) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        body: { lead_id: leadId },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F7EDE2", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 16, padding: "36px 28px", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "#B8629B", fontWeight: 700 }}>
          Welcome
        </div>
        <h1 style={{ fontFamily: "'Iowan Old Style', Palatino, Georgia, serif", fontSize: 32, margin: "10px 0 14px", color: "#3B2233" }}>
          Day 1 starts now.
        </h1>
        <p style={{ color: "#6E5665", fontSize: 17, lineHeight: 1.5 }}>
          Your full Perimenopause Profile {kit ? "and Doctor Visit Kit are" : "is"} on the way to your email. Your 28-Day Reclamation Plan begins with your first 10-minute lesson tonight.
        </p>
        <p style={{ color: "#6E5665", fontSize: 14, marginTop: 24, background: "#FBE9EF", padding: 14, borderRadius: 10 }}>
          After your trial, your membership continues at <b>$29.99/month</b> unless you cancel. Cancel anytime in one tap. We'll email you a reminder 2 days before your trial ends.
        </p>
        <button
          onClick={openPortal}
          disabled={loading || !leadId}
          style={{ marginTop: 22, padding: "12px 22px", background: "transparent", color: "#B8629B", border: "1px solid #B8629B", borderRadius: 8, fontSize: 14, cursor: "pointer" }}
        >
          {loading ? "Opening…" : "Manage subscription / cancel"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;