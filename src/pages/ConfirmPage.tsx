import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuizState } from "@/lib/quizState";

const FN_URL = "https://bjwrfmoivnttemjydvyz.supabase.co/functions/v1/create-portal-session";
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqd3JmbW9pdm50dGVtanlkdnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM4NTg5MDgsImV4cCI6MjA5OTQzNDkwOH0.qy-dVr9MHDcBXAeUSpG-6emyvFPfZGsl4eixvyvvtOs";

export default function ConfirmPage() {
  const [params] = useSearchParams();
  const lead = params.get("lead");
  const gotKit = params.get("kit") === "1";
  const [busy, setBusy] = useState(false);

  // Full reveal — pulled from the same quizState the funnel wrote before checkout.
  const quiz = getQuizState();

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

      {quiz.clusterScores && quiz.clusterScores.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <div style={{ fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", color: "#A4688F", fontWeight: 700, marginBottom: 6 }}>
            Your full profile
          </div>
          <h2 style={{ fontFamily: "Iowan Old Style, Palatino, Georgia, serif", fontSize: 26, margin: "0 0 14px" }}>
            Unlocked — here's the full picture.
          </h2>

          {quiz.phase && (
            <div
              style={{
                display: "inline-block",
                background: "#F3E3E9",
                color: "#46293F",
                fontSize: 12.5,
                fontWeight: 700,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                padding: "7px 16px",
                borderRadius: 99,
                marginBottom: 14,
              }}
            >
              {quiz.phase}
            </div>
          )}

          <div style={{ marginBottom: 22 }}>
            {quiz.clusterScores.map((c) => (
              <div key={c.key} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginBottom: 5, color: "#46293F" }}>
                  <span>{c.label}</span>
                  <span style={{ color: "#6E5665", fontWeight: 600 }}>{c.score}/{c.max}</span>
                </div>
                <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.max(4, (c.score / c.max) * 100)}%`,
                      background: "linear-gradient(90deg,#A4688F,#C29455)",
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {quiz.dom && (
            <div
              style={{
                background: "#F9F0F4",
                border: "1.5px solid #F3E3E9",
                borderRadius: 18,
                padding: 18,
              }}
            >
              <div style={{ fontFamily: "Iowan Old Style, Palatino, Georgia, serif", fontSize: 17, marginBottom: 6 }}>
                Your #1 driver: {quiz.dom.label}
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#6E5665", margin: 0 }}>
                {dominantCopy(quiz.dom.key)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function dominantCopy(key: string): string {
  const copy: Record<string, string> = {
    sleep:
      "Sleep is your loudest signal. This is the progesterone story — and because sleep loss amplifies every other symptom, your plan starts here for the fastest relief.",
    mood:
      "Your nervous system is carrying the biggest load. Mood, memory, and anxiety changes are hormonal, not personal failure. Your plan leads with the mind-hormone connection.",
    cycle:
      "The estrogen rollercoaster leads your profile. Fluctuating — not just falling — estrogen drives the wave pattern you're feeling. Your plan starts by stabilizing the swings.",
    body:
      "Vasomotor and metabolic shifts lead your profile — heat, heart, joints, and midsection changes. Your plan leads with the physical protocol.",
    self:
      "The changes closest to your sense of self lead your profile. These are the least discussed and most treatable symptoms. Your plan starts with reclaiming them.",
  };
  return copy[key] || "";
}
