import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceChoice from "@/components/results/PriceChoice";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MiniLegalFooter from "@/components/MiniLegalFooter";
import { PARTNER_QUESTIONS, PARTNER_OPTS } from "@/data/partnerQuiz";
import { DESIRE_QUESTIONS } from "@/data/desireQuiz";

const TrialPrice: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState<string | undefined>(undefined);
  const [domLabel, setDomLabel] = useState<string>("your heaviest system");
  const [variant, setVariant] = useState<"symptoms" | "desire" | "partner">("symptoms");
  const [echo, setEcho] = useState<{ text: string; rating: string } | null>(null);

  useEffect(() => {
    const s = getQuizState();
    if (!s.answers || !s.answers.length) {
      navigate("/quiz", { replace: true });
      return;
    }
    if (!s.email) {
      navigate("/quiz-email", { replace: true });
      return;
    }
    setEmail(s.email);
    setName(s.name);
    const v = (s.quizVariant as "symptoms" | "desire" | "partner") || "symptoms";
    setVariant(v);
    const fallback = v === "partner" ? "your heaviest factor" : "your heaviest system";
    setDomLabel(s.dom?.label || fallback);

    // Build echo from user's highest-rated answer for this variant
    try {
      const answers = s.answers || [];
      let maxIdx = -1;
      let maxVal = -1;
      answers.forEach((a, i) => {
        if (typeof a === "number" && a > maxVal) { maxVal = a; maxIdx = i; }
      });
      if (maxIdx >= 0 && maxVal >= 2) {
        let text = "";
        if (v === "partner" && PARTNER_QUESTIONS[maxIdx]) {
          text = PARTNER_QUESTIONS[maxIdx].t;
        } else if (v === "desire" && DESIRE_QUESTIONS[maxIdx]) {
          text = DESIRE_QUESTIONS[maxIdx].t;
        }
        const rating = maxVal >= 3 ? "Often" : "Sometimes";
        if (text) setEcho({ text, rating });
      }
    } catch {}
    setReady(true);
  }, [navigate]);

  const handleContinue = async (cents: number) => {
    const s = setQuizState({ trialPriceCents: cents });
    await trackEvent("price_selected", { trial_price_cents: cents });
    await trackEvent("checkout_started");
    try {
      const { data, error } = await supabase.functions.invoke("create-trial-checkout", {
        body: {
          email: s.email,
          name: s.name || null,
          trial_price_cents: cents,
          trial_days: 7,
          lead_id: s.leadId || null,
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
    }
  };

  if (!ready) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#EFDFE7 0%,#F9F0F4 45%,#F5EAD9 100%)",
        fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
        padding: "30px 16px 60px",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {echo && (
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 14,
              boxShadow: "0 6px 20px rgba(70,41,63,.06)",
              color: "#46293F",
              fontSize: 15,
              lineHeight: 1.5,
              borderLeft: "4px solid #A4688F",
            }}
          >
            <span style={{ opacity: 0.75, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 700 }}>
              You told us
            </span>
            <div style={{ marginTop: 4 }}>
              &ldquo;{echo.text}&rdquo; — <b>{echo.rating}</b>.
            </div>
          </div>
        )}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 22,
            marginBottom: 18,
            boxShadow: "0 10px 30px rgba(70,41,63,.08)",
            color: "#46293F",
          }}
        >
          <div
            style={{
              fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
              fontSize: 22,
              lineHeight: 1.25,
              marginBottom: 14,
            }}
          >
            Everything you unlock today:
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {(variant === "partner"
              ? [
                  <>What's actually happening to her — the biology of perimenopause, in plain language</>,
                  <>Your 28-Day Reclamation Plan, starting with <b>{domLabel}</b> — your heaviest factor</>,
                  <>The response pattern you're stuck in — and the exact shift that reverses it</>,
                  <>The conversation script — how to name this without pressure, blame, or hinting</>,
                  <>The gift program for her — so she gets her own tools alongside yours</>,
                ]
              : variant === "desire"
              ? [
                  <>Why the wanting disappeared — your #1 suppressor, named and explained</>,
                  <>The full desire curriculum: the two desire types, the responsive-desire switch, the retraining practices</>,
                  <>The comfort solutions and the hormone conversation that changes your next doctor's appointment</>,
                  <>The 3-sentence script for him — so this becomes something you do together, not something you hide</>,
                  <>The complete plan: hormones, comfort, energy, connection — in the right order</>,
                ]
              : [
                  <>Your full profile — all five systems scored, your stage, your #1 driver explained</>,
                  <>Your 28-Day Reclamation Plan, starting with <b>{domLabel}</b></>,
                  <>The 3 A.M. Protocol + the full SOS toolkit for flashes, rage, and anxiety spikes</>,
                  <>Daily 10-minute lessons + symptom tracker that shows you what's actually working</>,
                  <>The Labs Decoder + the exact words for the doctor conversation</>,
                ]
            ).map((node, i) => (
              <li
                key={i}
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "#5c4553",
                  paddingLeft: 30,
                  position: "relative",
                  marginBottom: 10,
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
                {node}
              </li>
            ))}
          </ul>
          <p
            style={{
              marginTop: 14,
              fontSize: 16,
              lineHeight: 1.55,
              color: "#46293F",
              fontWeight: 600,
            }}
          >
            {variant === "desire"
              ? "7 days. Full access. If it doesn't move anything, cancel in one tap."
              : variant === "partner"
              ? "7 days. Full access. If it doesn't shift anything, cancel in one tap."
              : "7 days. Full access. If it doesn't help, cancel in one tap."}
          </p>
        </div>
        <PriceChoice email={email} firstName={name} mode="select" onContinue={handleContinue} />
        <div
          style={{
            background: "#FFF9EE",
            border: "1px solid #EBD9BC",
            borderRadius: 14,
            padding: "14px 16px",
            marginTop: 14,
            marginBottom: 14,
            color: "#46293F",
            fontSize: 15,
            lineHeight: 1.55,
          }}
        >
          <b>✦ The Feel-It Guarantee:</b> if you don't feel a difference in your #1 {variant === "partner" ? "friction point" : "symptom"} in 28 days, email us and we refund your month. No forms, no hoops.
        </div>
        <MiniLegalFooter />
      </div>
    </div>
  );
};

export default TrialPrice;