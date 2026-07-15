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
        <PriceChoice email={email} firstName={name} mode="select" onContinue={handleContinue} />
        <MiniLegalFooter />
      </div>
    </div>
  );
};

export default TrialPrice;