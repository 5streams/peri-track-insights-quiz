import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import TrustFooter from "@/components/TrustFooter";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";

const BENEFITS = [
  "Your full symptom-by-symptom profile — all five systems scored and explained",
  "Your hormonal stage + #1 symptom driver, in plain English",
  "The 28-Day Reclamation Plan personalized to your heaviest system",
  "The 3 A.M. SOS Toolkit + relaxation audio library",
  "Daily symptom & protocol tracker — see what's actually working",
  "Labs Decoder + doctor-visit prep tools",
];

function GaugeSVG({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, pct));
  const angle = Math.PI * (1 - clamped / 100);
  const r = 78;
  const cx = 100;
  const cy = 95;
  const x = cx + r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);
  const large = clamped > 50 ? 1 : 0;
  return (
    <svg width="220" height="130" viewBox="0 0 200 118" role="img" aria-label={`Symptom load ${clamped} percent`}>
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A4688F" />
          <stop offset="1" stopColor="#C29455" />
        </linearGradient>
      </defs>
      <path d="M22 95 A78 78 0 0 1 178 95" fill="none" stroke="#F3E3E9" strokeWidth={14} strokeLinecap="round" />
      <path
        d={`M22 95 A78 78 0 ${large} 1 ${x.toFixed(1)} ${y.toFixed(1)}`}
        fill="none"
        stroke="url(#gg)"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <text x="100" y="82" textAnchor="middle" fontSize="34" fontFamily="Iowan Old Style,Palatino,Georgia,serif" fill="#46293F" fontWeight={600}>
        {clamped}
      </text>
      <text x="100" y="103" textAnchor="middle" fontSize="11" fill="#6E5665" letterSpacing="1">
        SYMPTOM LOAD
      </text>
    </svg>
  );
}

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [state, setState] = useState(() => getQuizState());
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!state.answers || !state.answers.length) {
      navigate("/quiz", { replace: true });
      return;
    }
    if (!state.email) {
      navigate("/quiz-email", { replace: true });
      return;
    }
    if (!state.trialPriceCents) {
      navigate("/trial-price", { replace: true });
      return;
    }
    trackEvent("results_view");
  }, [state, navigate]);

  const priceLabel = useMemo(() => {
    const c = state.trialPriceCents || 100;
    return c % 100 === 0 ? `$${c / 100}` : `$${(c / 100).toFixed(2)}`;
  }, [state.trialPriceCents]);

  const trialEndDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  }, []);

  const startCheckout = async () => {
    setBusy(true);
    await trackEvent("checkout_started");
    try {
      const { data, error } = await supabase.functions.invoke("create-trial-checkout", {
        body: {
          email: state.email,
          name: state.name || null,
          trial_price_cents: state.trialPriceCents,
          trial_days: 7,
          lead_id: state.leadId || null,
        },
      });
      if (error || !data?.url) throw error || new Error("no checkout url");
      if (data.lead_id) setQuizState({ leadId: data.lead_id });
      window.location.href = data.url as string;
    } catch (e) {
      console.error("trial checkout failed", e);
      toast({
        title: "Something went wrong",
        description: "We couldn't open secure checkout. Please try again.",
        variant: "destructive",
      });
      setBusy(false);
    }
  };

  const bandName = state.band?.name || "Perimenopause Pattern";
  const pct = state.pct ?? 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#EFDFE7 0%,#F9F0F4 45%,#F5EAD9 100%)",
        fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
        color: "#46293F",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "30px 22px 60px" }}>
        <h1
          style={{
            fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
            fontSize: 34,
            lineHeight: 1.2,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Your Perimenopause Assessment
        </h1>

        {/* Gauge teaser — needle + band chip only */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "24px 18px", boxShadow: "0 10px 30px rgba(70,41,63,.10)", textAlign: "center" }}>
          <GaugeSVG pct={pct} />
          <div
            style={{
              display: "inline-block",
              marginTop: 8,
              background: "#F3E3E9",
              color: "#46293F",
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRadius: 99,
            }}
          >
            {bandName}
          </div>

          {/* Blurred locked preview so the user sees there's more behind the paywall */}
          <div style={{ position: "relative", marginTop: 22, borderRadius: 14, overflow: "hidden", border: "1.5px dashed #A4688F" }}>
            <div style={{ padding: 18, filter: "blur(5px)", userSelect: "none", pointerEvents: "none", textAlign: "left" }}>
              <div style={{ fontFamily: "'Iowan Old Style',Palatino,Georgia,serif", fontSize: 16, marginBottom: 8 }}>Your #1 driver</div>
              <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, marginBottom: 10 }} />
              <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, marginBottom: 10 }} />
              <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, marginBottom: 10 }} />
              <p style={{ fontSize: 13.5, color: "#6E5665" }}>Your five-system breakdown, phase estimate, and personalized plan…</p>
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(253,250,251,.35)" }}>
              <span style={{ background: "#46293F", color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px 18px", borderRadius: 99 }}>
                Unlock full profile + plan
              </span>
            </div>
          </div>
        </div>

        <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, textAlign: "center", color: "#5c4553" }}>
          Based on your responses, we've developed your personalized{" "}
          <b>28-Day Reclamation Plan</b>.
        </p>

        {/* Benefits */}
        <div
          style={{
            marginTop: 24,
            background: "#fff",
            borderRadius: 20,
            padding: 22,
            boxShadow: "0 10px 30px rgba(70,41,63,.08)",
          }}
        >
          <div
            style={{
              fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
              fontSize: 22,
              marginBottom: 16,
              lineHeight: 1.25,
            }}
          >
            What you will get with your customized plan
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {BENEFITS.map((b) => (
              <li
                key={b}
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "#5c4553",
                  paddingLeft: 30,
                  position: "relative",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 2,
                    width: 22,
                    height: 22,
                    borderRadius: 99,
                    background: "#7E9B84",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Trial timeline */}
        <div
          style={{
            marginTop: 24,
            background: "#fff",
            borderRadius: 20,
            padding: 22,
            boxShadow: "0 10px 30px rgba(70,41,63,.08)",
          }}
        >
          <div
            style={{
              fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
              fontSize: 22,
              marginBottom: 16,
            }}
          >
            How your trial works
          </div>
          <TimelineRow
            icon="✓"
            label={<span style={{ textDecoration: "line-through", color: "#8a7085" }}>Take the assessment</span>}
            done
          />
          <TimelineRow
            icon="🔓"
            label={<span><b>Today:</b> full access for the {priceLabel} you chose</span>}
          />
          <TimelineRow
            icon="📅"
            label={
              <span>
                <b>Day 7 ({trialEndDate}):</b> $29.99/month ($0.99/day) unless you cancel. Reminder email 2 days before.
              </span>
            }
          />
        </div>

        <button
          onClick={startCheckout}
          disabled={busy}
          style={{
            width: "100%",
            marginTop: 28,
            padding: 20,
            border: "none",
            borderRadius: 99,
            background: "linear-gradient(135deg,#D4AF37 0%,#F4D03F 100%)",
            color: "#2C3E50",
            fontSize: 20,
            fontWeight: 800,
            cursor: busy ? "wait" : "pointer",
            boxShadow: "0 10px 30px rgba(70,41,63,.18)",
          }}
        >
          {busy ? "Opening secure checkout…" : "Get my plan"}
        </button>

        <p style={{ fontSize: 12.5, color: "#8a7085", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Informational only — not medical advice or diagnosis. Secure checkout by Stripe · Cancel anytime in one tap.
        </p>

        <div style={{ marginTop: 40 }}>
          <TrustFooter />
        </div>
      </div>
    </div>
  );
};

const TimelineRow: React.FC<{ icon: string; label: React.ReactNode; done?: boolean }> = ({ icon, label, done }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
    <div
      style={{
        width: 32,
        height: 32,
        flexShrink: 0,
        borderRadius: 99,
        background: done ? "#7E9B84" : "#F9F0F4",
        color: done ? "#fff" : "#46293F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: 700,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 15, lineHeight: 1.55, color: "#5c4553", paddingTop: 5 }}>{label}</div>
  </div>
);

export default Results;