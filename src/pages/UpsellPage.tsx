import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const FN_URL = "https://bjwrfmoivnttemjydvyz.supabase.co/functions/v1/purchase-upsell";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqd3JmbW9pdm50dGVtanlkdnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NTg5MDgsImV4cCI6MjA5OTQzNDkwOH0.qy-dVr9MHDcBXAeUSpG-6emyvFPfZGsl4eixvyvvtOs";

export default function UpsellPage() {
  const [params] = useSearchParams();
  const nav = useNavigate();
  const lead = params.get("lead");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function buy() {
    if (!lead) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON,
          Authorization: `Bearer ${ANON}`,
        },
        body: JSON.stringify({ lead_id: lead }),
      });
      const data = await res.json();
      if (data.requires_action) {
        setErr("Extra verification needed on your card. Please contact support — we'll help you finish this in one click.");
        return;
      }
      if (!res.ok || data.error) throw new Error(data.error || "failed");
      nav(`/confirm?lead=${lead}&kit=1`);
    } catch (e: any) {
      setErr(e.message || "Payment failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{
      maxWidth: 560,
      margin: "0 auto",
      padding: "40px 22px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#3a2434",
      lineHeight: 1.55,
    }}>
      <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "#B87A99", fontWeight: 700 }}>
        Optional add-on
      </div>
      <h1 style={{ fontFamily: "Iowan Old Style, Palatino, Georgia, serif", fontSize: 34, margin: "8px 0 14px" }}>
        Want to walk into your doctor's office prepared?
      </h1>
      <p style={{ fontSize: 18 }}>
        The <b>Doctor Visit Kit</b> is a printable pack of the exact symptom logs,
        lab requests, and scripts our members use — so the person across the desk
        actually helps you instead of dismissing you.
      </p>
      <ul style={{ fontSize: 17, paddingLeft: 20 }}>
        <li>28-day symptom & cycle log formatted for clinicians</li>
        <li>The exact labs to request (and why each one)</li>
        <li>Word-for-word scripts if you're rushed or dismissed</li>
      </ul>

      <div style={{
        border: "2px solid #C88AA8",
        borderRadius: 14,
        padding: 22,
        margin: "22px 0",
        textAlign: "center",
        background: "#fff",
      }}>
        <div style={{ fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: "#B87A99", fontWeight: 700 }}>
          One-time add-on
        </div>
        <div style={{ fontFamily: "Iowan Old Style, Palatino, Georgia, serif", fontSize: 34 }}>$14.99</div>
        <div style={{ fontSize: 13.5, color: "#6E5665", marginTop: 4 }}>
          Charged today to the card you just saved. Not a subscription.
        </div>
      </div>

      <button
        onClick={buy}
        disabled={busy || !lead}
        style={{
          width: "100%",
          background: "#A4688F",
          color: "#fff",
          border: 0,
          borderRadius: 12,
          padding: "18px 20px",
          fontSize: 18,
          fontWeight: 700,
          cursor: busy ? "wait" : "pointer",
        }}
      >
        {busy ? "Adding to your order…" : "Yes — add the Doctor Visit Kit ($14.99)"}
      </button>
      <button
        onClick={() => nav(`/confirm?lead=${lead || ""}`)}
        style={{
          width: "100%",
          background: "transparent",
          color: "#6E5665",
          border: 0,
          padding: "16px",
          fontSize: 15,
          marginTop: 8,
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        No thanks — take me to my trial
      </button>

      {err && <p style={{ color: "#a11", marginTop: 10 }}>{err}</p>}
      {!lead && <p style={{ color: "#a11", marginTop: 10 }}>Missing lead reference. Please return to the quiz.</p>}
    </div>
  );
}
