import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceChoice from "@/components/results/PriceChoice";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MiniLegalFooter from "@/components/MiniLegalFooter";

const TrialPrice: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState<string | undefined>(undefined);
  const [domLabel, setDomLabel] = useState<string>("your heaviest system");
  const [variant, setVariant] = useState<"symptoms" | "desire">("symptoms");

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
    setDomLabel(s.dom?.label || "your heaviest system");
    if (s.quizVariant === "desire") setVariant("desire");
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
            {(variant === "desire"
              ? [
                  <>Why the wanting disappeared — your #1 desire suppressor, explained</>,
                  <>The plan to bring it back: hormones, comfort, energy, and connection — in the right order</>,
                  <>Your full profile — all five systems scored, your stage, your #1 driver explained</>,
                  <>Your 28-Day Reclamation Plan, starting with <b>{domLabel}</b></>,
                  <>The 3 A.M. Protocol + the full SOS toolkit for flashes, rage, and anxiety spikes</>,
                  <>Daily 10-minute lessons + symptom tracker that shows you what's actually working</>,
                  <>The Labs Decoder + the exact words for the doctor conversation</>,
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
            7 days. Full access. If it doesn't help, cancel in one tap.
          </p>
        </div>
        <PriceChoice email={email} firstName={name} mode="select" onContinue={handleContinue} />
        <MiniLegalFooter />
      </div>
    </div>
  );
};

export default TrialPrice;