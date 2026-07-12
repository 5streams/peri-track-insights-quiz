import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FN_URL = "https://bjwrfmoivnttemjydvyz.supabase.co/functions/v1/create-portal-session";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqd3JmbW9pdm50dGVtanlkdnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NTg5MDgsImV4cCI6MjA5OTQzNDkwOH0.qy-dVr9MHDcBXAeUSpG-6emyvFPfZGsl4eixvyvvtOs";

export default function ConfirmPage() {
  const [params] = useSearchParams();
  const lead = params.get("lead");
  const gotKit = params.get("kit") === "1";
  const [busy, setBusy] = useState(false);

  async function openPortal() {
    if (!lead) return;
    setBusy(true);
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
      if (data.url) window.open(data.url, "_blank");
    } finally {
      setBusy(false);
    }
  }

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 7);

  return (
    <div style={{
      maxWidth: 560,
      margin: "0 auto",
      padding: "40px 22px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#3a2434",
      lineHeight: 1.55,
    }}>
      <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "#7E9B84", fontWeight: 700 }}>
        You're in
      </div>
      <h1 style={{ fontFamily: "Iowan Old Style, Palatino, Georgia, serif", fontSize: 36, margin: "8px 0 14px" }}>
        Welcome to Become Her Again.
      </h1>
      <p style={{ fontSize: 18 }}>
        Your full-access trial is active. {gotKit && <b>The Doctor Visit Kit is on its way to your inbox.</b>}
      </p>
      <div style={{
        background: "#F9F1F4",
        borderRadius: 14,
        padding: 22,
        margin: "20px 0",
        fontSize: 16,
      }}>
        <div><b>Trial ends:</b> {trialEnd.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</div>
        <div style={{ marginTop: 6 }}><b>Then:</b> $29.99/month — cancel anytime in one tap.</div>
        <div style={{ marginTop: 6, color: "#6E5665" }}>We'll email you a reminder 2 days before the trial ends.</div>
      </div>
      <button
        onClick={openPortal}
        disabled={busy || !lead}
        style={{
          width: "100%",
          background: "transparent",
          color: "#A4688F",
          border: "2px solid #A4688F",
          borderRadius: 12,
          padding: "16px 20px",
          fontSize: 16,
          fontWeight: 700,
          cursor: busy ? "wait" : "pointer",
        }}
      >
        {busy ? "Opening…" : "Manage subscription / cancel"}
      </button>
    </div>
  );
}
