import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";
import {
  PARTNER_CLUSTERS,
  PARTNER_QUESTIONS,
  PARTNER_OPTS,
  PARTNER_YOUR_AGE_OPTS,
  PARTNER_HER_AGE_OPTS,
  PARTNER_TOGETHER_OPTS,
  PARTNER_INTENT_OPTS,
  PARTNER_BREAKS,
  PARTNER_BANDS,
  partnerPhaseEstimate,
} from "@/data/partnerQuiz";

// step 0 = opener, 1 = your age, 2 = her age, 3 = together, 4 = discovery,
// 5..24 = questions[0..19], 25 = intent
const WELCOME_STEP = 0;
const YOUR_AGE_STEP = 1;
const HER_AGE_STEP = 2;
const TOGETHER_STEP = 3;
const DISCOVERY_STEP = 4;
const FIRST_Q_STEP = 5;
const INTENT_STEP = FIRST_Q_STEP + PARTNER_QUESTIONS.length;
const TOTAL_STEPS = INTENT_STEP + 1;

type ScreenState = { step: number; showBreakForQ?: number };

const HusbandQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [yourAge, setYourAge] = useState<number | null>(null);
  const [herAge, setHerAge] = useState<number | null>(null);
  const [together, setTogether] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array.from({ length: PARTNER_QUESTIONS.length }, () => null)
  );
  const [intent, setIntent] = useState<number | null>(null);
  const [screen, setScreen] = useState<ScreenState>({ step: WELCOME_STEP });
  const [history, setHistory] = useState<ScreenState[]>([]);
  const [opener, setOpener] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  useEffect(() => {
    setQuizState({ quizVariant: "partner", flowVariant: "cold" });
    trackEvent("partner_quiz_view", { quiz_variant: "partner" });
    trackEvent("opener_view", { quiz_variant: "partner" });
  }, []);

  const goTo = (next: ScreenState) => {
    setHistory((h) => [...h, screen]);
    setScreen(next);
  };
  const goBack = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setScreen(prev);
      return h.slice(0, -1);
    });
  };

  const persist = (patch: {
    yourAge?: number | null;
    herAge?: number | null;
    together?: number | null;
    answers?: (number | null)[];
    intent?: number | null;
  }) => {
    const cleanAnswers = (patch.answers ?? answers).map((a) => (a == null ? null : a));
    setQuizState({
      answers: cleanAnswers.map((a) => (a == null ? 0 : a)),
      age: patch.yourAge !== undefined ? patch.yourAge : yourAge,
      cycleStatus: patch.herAge !== undefined ? patch.herAge : herAge,
      intent: patch.intent !== undefined ? patch.intent : intent,
      quizVariant: "partner",
    });
    trackEvent("quiz_progress", {
      quiz_variant: "partner",
      questions_answered: cleanAnswers.filter((a) => a != null).length,
      total_questions: PARTNER_QUESTIONS.length,
      answers: cleanAnswers,
      your_age: patch.yourAge !== undefined ? patch.yourAge : yourAge,
      her_age: patch.herAge !== undefined ? patch.herAge : herAge,
      together: patch.together !== undefined ? patch.together : together,
    });
  };

  const handleYourAge = (i: number) => { setYourAge(i); persist({ yourAge: i }); goTo({ step: HER_AGE_STEP }); };
  const handleHerAge = (i: number) => { setHerAge(i); persist({ herAge: i }); goTo({ step: TOGETHER_STEP }); };
  const handleTogether = (v: number) => { setTogether(v); persist({ together: v }); goTo({ step: DISCOVERY_STEP }); };

  const handleOpener = (answer: "yes" | "complicated") => {
    setOpener(answer);
    setQuizState({ quizVariant: "partner", flowVariant: "cold" });
    trackEvent("quiz_progress", {
      quiz_variant: "partner",
      questions_answered: 0,
      total_questions: PARTNER_QUESTIONS.length,
      answers,
      opener: answer,
    });
    trackEvent("quiz_start", { quiz_variant: "partner", opener: answer });
    goTo({ step: YOUR_AGE_STEP });
  };

  const handleAnswer = (qIdx: number, v: number) => {
    const nextAnswers = [...answers];
    nextAnswers[qIdx] = v;
    setAnswers(nextAnswers);
    persist({ answers: nextAnswers });
    const nextQ = qIdx + 1;
    if (nextQ >= PARTNER_QUESTIONS.length) { goTo({ step: INTENT_STEP }); return; }
    if (PARTNER_BREAKS[nextQ]) {
      goTo({ step: FIRST_Q_STEP + nextQ, showBreakForQ: nextQ });
    } else {
      goTo({ step: FIRST_Q_STEP + nextQ });
    }
  };
  const handleContinueBreak = (qIdx: number) => setScreen({ step: FIRST_Q_STEP + qIdx });

  const handleIntent = async (v: number) => {
    setIntent(v);
    const filled = answers.map((a) => (a == null ? 0 : a));
    const total = filled.reduce((a, b) => a + b, 0);
    const band = PARTNER_BANDS.find((b) => total >= b.min && total <= b.max) || null;
    const clusterScores = PARTNER_CLUSTERS.map((c, ci) => {
      let sum = 0;
      PARTNER_QUESTIONS.forEach((q, qi) => { if (q.c === ci) sum += filled[qi]; });
      return { key: c.key, label: c.label, score: sum, max: 12 };
    });
    const dom = [...clusterScores].sort((a, b) => b.score - a.score)[0];
    const phase = partnerPhaseEstimate(total, herAge);
    const pct = Math.round((total / 60) * 100);

    setQuizState({
      answers: filled, age: yourAge, cycleStatus: herAge, intent: v,
      total, pct,
      band: band ? { name: band.name, copy: band.copy } : undefined,
      clusterScores, dom, phase,
      quizVariant: "partner",
    });

    await trackEvent("quiz_complete", {
      quiz_variant: "partner",
      quiz_results: {
        total, band: band?.name ?? null, phase, dom: dom?.key ?? null, pct,
        clusters: clusterScores, answers: filled,
        your_age: yourAge, her_age: herAge, together, intent: v,
        quiz_variant: "partner",
      },
    });
    navigate("/calculating");
  };

  const progressPct = Math.min(100, Math.round(((screen.step + 1) / TOTAL_STEPS) * 100));
  const canBack = history.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF7F4] to-[#F3E8EE]">
      {screen.step > WELCOME_STEP && (
        <header className="sticky top-0 z-10 bg-[#FBF7F4]/95 backdrop-blur border-b border-[#E8D7DF]">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <button
              onClick={goBack}
              disabled={!canBack}
              aria-label="Back"
              className={`p-2 rounded-full transition ${canBack ? "text-[#5D4154] hover:bg-[#EBD9BC]/40" : "opacity-0 pointer-events-none"}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 h-2 bg-[#EBD9BC]/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C29455] to-[#5D4154] transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-[#5D4154] tabular-nums w-12 text-right">
              {screen.step + 1}/{TOTAL_STEPS}
            </span>
          </div>
        </header>
      )}

      <main className="max-w-2xl mx-auto px-5 pt-6 pb-16">
        {screen.step === WELCOME_STEP && (
          <div className="pt-6 md:pt-10">
            <div className="text-center text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-[#8B5A9F] font-bold mb-5 md:mb-7">
              A PRIVATE 3-MINUTE ASSESSMENT FOR HUSBANDS
            </div>
            <h1 className="font-playfair text-[28px] md:text-[38px] font-semibold text-[#331D2E] leading-[1.12] mb-6 md:mb-8 text-center max-w-xl mx-auto">
              Do you still love her — it's the distance that's killing you?
            </h1>
            <div className="flex flex-col gap-3 max-w-lg mx-auto">
              <button
                onClick={() => handleOpener("yes")}
                className="w-full text-left rounded-2xl border-2 border-[#E8D7DF] bg-white text-[#331D2E] px-5 py-4 font-semibold text-[16px] hover:border-[#C29455] hover:bg-[#FFF9EE] transition"
              >
                Yes — exactly that
              </button>
              <button
                onClick={() => handleOpener("complicated")}
                className="w-full text-left rounded-2xl border-2 border-[#E8D7DF] bg-white text-[#331D2E] px-5 py-4 font-semibold text-[16px] hover:border-[#C29455] hover:bg-[#FFF9EE] transition"
              >
                It's more complicated than that
              </button>
            </div>
            <p className="text-center text-[12px] md:text-[13px] text-[#6E5665] mt-4">
              22 questions · Completely private · She will never see your answers
            </p>
          </div>
        )}

        {screen.step === YOUR_AGE_STEP && (
          <Screen
            eyebrow="About you"
            title="Your age?"
            hint="This stays completely private."
            momentum="Then this is worth 3 minutes of your life. First —"
          >
            <OptionList>
              {PARTNER_YOUR_AGE_OPTS.map((label, i) => (
                <OptButton key={i} onClick={() => handleYourAge(i)} selected={yourAge === i}>{label}</OptButton>
              ))}
            </OptionList>
          </Screen>
        )}

        {screen.step === HER_AGE_STEP && (
          <Screen eyebrow="About her" title="Her age?" hint="This helps us place her pattern on the transition timeline.">
            <OptionList>
              {PARTNER_HER_AGE_OPTS.map((label, i) => (
                <OptButton key={i} onClick={() => handleHerAge(i)} selected={herAge === i}>{label}</OptButton>
              ))}
            </OptionList>
          </Screen>
        )}

        {screen.step === TOGETHER_STEP && (
          <Screen eyebrow="About the two of you" title="How long have you been together?" hint="">
            <OptionList>
              {PARTNER_TOGETHER_OPTS.map((o) => (
                <OptButton key={o.v} onClick={() => handleTogether(o.v)} selected={together === o.v}>
                  {o.t}
                </OptButton>
              ))}
            </OptionList>
          </Screen>
        )}

        {screen.step === DISCOVERY_STEP && (
          <div className="rounded-3xl bg-[#5D4154] text-white p-7 shadow-xl">
            <div className="text-[11px] tracking-[0.14em] uppercase text-[#EBD9BC] font-bold mb-3">
              What you'll get
            </div>
            <h2 className="font-playfair text-2xl font-semibold mb-4 leading-snug">
              Here's what your answers will show you:
            </h2>
            <ul className="space-y-3 mb-5">
              {[
                "Your Distance Score — how deep the spiral runs, on a 0–60 scale",
                "The most likely explanation — and why it's probably not what you fear at 2 a.m.",
                "Your response pattern — the thing you're doing right now that's making it worse (every man in this spot does one of them)",
                "Whether it can come back — and exactly what your part in that is",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#F6ECF1]">
                  <Check className="h-5 w-5 text-[#EBD9BC] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[14px] italic text-[#EBD9BC] mb-6 leading-relaxed">
              If you've stopped initiating because you can't take another no — this was built for you.
            </p>
            <button
              onClick={() => goTo({ step: FIRST_Q_STEP })}
              className="w-full bg-[#C29455] hover:bg-[#a97e46] text-white font-semibold rounded-full py-4 text-base transition"
            >
              Continue
            </button>
          </div>
        )}

        {screen.step >= FIRST_Q_STEP && screen.step < INTENT_STEP && (() => {
          const qIdx = screen.step - FIRST_Q_STEP;
          if (screen.showBreakForQ === qIdx && PARTNER_BREAKS[qIdx]) {
            const info = PARTNER_BREAKS[qIdx];
            return (
              <div className="rounded-3xl bg-[#5D4154] text-white p-7 shadow-xl">
                <div className="text-[11px] tracking-[0.14em] uppercase text-[#EBD9BC] font-bold mb-3">
                  {info.eyebrow}
                </div>
                <h2 className="font-playfair text-2xl font-semibold mb-3 leading-snug">{info.h}</h2>
                <p className="text-[15px] leading-relaxed text-[#F6ECF1] mb-6">{info.p}</p>
                <button
                  onClick={() => handleContinueBreak(qIdx)}
                  className="w-full bg-[#C29455] hover:bg-[#a97e46] text-white font-semibold rounded-full py-4 text-base transition"
                >
                  Continue
                </button>
              </div>
            );
          }
          const q = PARTNER_QUESTIONS[qIdx];
          return (
            <Screen eyebrow={PARTNER_CLUSTERS[q.c].label} title={q.t} hint={q.h || "How often is this true for you?"}>
              <OptionList>
                {PARTNER_OPTS.map((o) => (
                  <OptButton key={o.v} onClick={() => handleAnswer(qIdx, o.v)} selected={answers[qIdx] === o.v}>
                    {o.label}
                  </OptButton>
                ))}
              </OptionList>
            </Screen>
          );
        })()}

        {screen.step === INTENT_STEP && (
          <Screen
            eyebrow="Last question"
            title="If you could understand what's happening and know exactly how to show up — what describes you?"
            hint="Your answer shapes the plan we build for you."
          >
            <OptionList>
              {PARTNER_INTENT_OPTS.map((o) => (
                <OptButton key={o.v} onClick={() => handleIntent(o.v)} selected={intent === o.v} sub={o.sub}>
                  {o.t}
                </OptButton>
              ))}
            </OptionList>
          </Screen>
        )}
      </main>
    </div>
  );
};

const Screen: React.FC<{ eyebrow: string; title: string; hint?: string; children: React.ReactNode }> = ({ eyebrow, title, hint, children }) => (
  <div>
    <div className="text-[11px] tracking-[0.14em] uppercase text-[#8B5A9F] font-bold mb-3">{eyebrow}</div>
    <h1 className="font-playfair text-[26px] md:text-3xl font-semibold text-[#331D2E] leading-snug mb-2">
      {title}
    </h1>
    {hint && <p className="text-[15px] text-[#6E5665] mb-6">{hint}</p>}
    {children}
  </div>
);

const OptionList: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-3">{children}</div>
);

const OptButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  sub?: string;
}> = ({ children, onClick, selected, sub }) => (
  <button
    onClick={onClick}
    className={`w-full text-left rounded-2xl border-2 px-5 py-4 transition font-semibold text-[16px] ${
      selected
        ? "border-[#C29455] bg-[#FFF9EE] text-[#331D2E]"
        : "border-[#E8D7DF] bg-white text-[#331D2E] hover:border-[#C29455] hover:bg-[#FFF9EE]"
    }`}
  >
    <div>{children}</div>
    {sub && <div className="text-[13px] text-[#6E5665] font-normal mt-1">{sub}</div>}
  </button>
);

export default HusbandQuiz;