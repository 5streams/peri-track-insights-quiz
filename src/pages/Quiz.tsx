import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";

/* ------------------------------------------------------------------
   Quiz content — copied verbatim from the legacy prototype's
   QUESTIONS / OPTS / INTERSTITIALS / BANDS arrays.
   ------------------------------------------------------------------ */

const CLUSTERS = [
  { key: "sleep", label: "Sleep & Energy" },
  { key: "mood", label: "Mood & Mind" },
  { key: "cycle", label: "Cycle & Hormones" },
  { key: "body", label: "Body & Heat" },
  { key: "self", label: "Intimacy & Identity" },
] as const;

const QUESTIONS: { c: number; t: string; h: string; echo: string }[] = [
  // SLEEP
  { c: 0, t: "I wake between 2 and 4 a.m. with my mind racing — and can't fall back asleep.", h: "Even if you fall asleep fine at night.", echo: "Waking at 2–4 a.m., mind racing" },
  { c: 0, t: "I wake up hot or sweating — throwing covers off, pulling them back on, all night.", h: "", echo: "Night sweats disrupting your sleep" },
  { c: 0, t: "I hit a wall of exhaustion in the afternoon, no matter how I slept.", h: "", echo: "The afternoon wall of exhaustion" },
  { c: 0, t: "I feel tired all day — but wired the moment my head hits the pillow.", h: "", echo: "Tired all day, wired at night" },
  // MOOD
  { c: 1, t: "I snap at the people I love over small things — then feel guilty about it afterward.", h: "Be honest. No one sees your answers but you.", echo: "Snapping at the people you love, then the guilt" },
  { c: 1, t: "I walk into rooms and forget why I'm there, or lose words mid-sentence.", h: "", echo: "Brain fog — losing words mid-sentence" },
  { c: 1, t: "I feel a low hum of anxiety or dread — with no obvious cause.", h: "", echo: "Anxiety with no obvious cause" },
  { c: 1, t: "I catch myself thinking: \u201CI don't feel like me anymore.\u201D", h: "", echo: "\u201CI don't feel like me anymore\u201D" },
  // CYCLE
  { c: 2, t: "My period has changed — heavier, lighter, closer together, or skipping months entirely.", h: "Any change from YOUR normal counts.", echo: "Your cycle changing on you" },
  { c: 2, t: "PMS feels more intense than it used to — or shows up at random times of the month.", h: "", echo: "PMS that's more intense, less predictable" },
  { c: 2, t: "I get new breast tenderness, bloating, or headaches around my cycle.", h: "", echo: "New tenderness, bloating, or headaches" },
  { c: 2, t: "My symptoms come in waves — good weeks, then weeks where everything falls apart.", h: "This pattern has a hormonal signature.", echo: "Good weeks, then weeks where it all falls apart" },
  // BODY
  { c: 3, t: "Waves of heat rise up my chest, neck, or face — even in a cool room.", h: "", echo: "Heat waves rising out of nowhere" },
  { c: 3, t: "My heart races or flutters out of nowhere.", h: "Many women are checked for heart issues before anyone mentions hormones.", echo: "Heart racing or fluttering unexpectedly" },
  { c: 3, t: "I have new joint aches or stiffness — like my body aged overnight.", h: "", echo: "Joints aching like you aged overnight" },
  { c: 3, t: "Weight is settling around my middle — no matter what I eat or how I train.", h: "", echo: "Weight settling at your middle despite everything" },
  // SELF
  { c: 4, t: "My desire for intimacy has dropped — or sex is uncomfortable in ways it wasn't before.", h: "", echo: "The spark fading — and missing it" },
  { c: 4, t: "My hair is thinning, or my skin and nails have changed.", h: "", echo: "Hair, skin, and nails changing" },
  { c: 4, t: "Some days I cancel plans because I just can't face people.", h: "", echo: "Canceling plans because you can't face people" },
  { c: 4, t: "Sometimes I look in the mirror and don't recognize the woman looking back.", h: "", echo: "Not recognizing the woman in the mirror" },
];

const OPTS = [
  { label: "Never", v: 0 },
  { label: "Rarely", v: 1 },
  { label: "Sometimes", v: 2 },
  { label: "Often", v: 3 },
];

// Break screens shown BEFORE question index (i.e. after answering the previous question).
const BREAKS: Record<number, { eyebrow: string; stat: string; statsub: string; h: string; p: string }> = {
  4: {
    eyebrow: "The 3 a.m. club",
    stat: "2–4",
    statsub: "a.m.",
    h: "That middle-of-the-night wake-up has a name.",
    p: "Falling progesterone — your body's natural calming hormone — is one of the earliest shifts of perimenopause, and broken sleep is its signature. It gets labeled \u201Cstress\u201D or \u201Canxiety.\u201D It's neither. Your sleep pattern is the first key to your profile.",
  },
  12: {
    eyebrow: "Women like you",
    stat: "1 in 3",
    statsub: "midlife women",
    h: "\u201CI was exactly where you are.\u201D",
    p: "Members with your emerging pattern most often say the same thing: they thought it was stress, aging, or their own failing. It wasn't. It was hormones — and it responded to the right protocol.",
  },
  16: {
    eyebrow: "It's not discipline. It's chemistry.",
    stat: "Midlife",
    statsub: "metabolism shift",
    h: "When estrogen declines, your body changes how it stores fat and handles blood sugar.",
    p: "The workouts and diets that always worked can simply stop working. This is one of the most fixable parts of the transition — once you address the actual cause. One section left.",
  },
};

const AGE_OPTS = ["Under 35", "35–39", "40–44", "45–49", "50–55", "56+"];

const CYCLE_OPTS = [
  { t: "Regular, like clockwork", sub: "Same as it's always been", v: 0 },
  { t: "Still regular — but different", sub: "Heavier, lighter, shorter, or new PMS", v: 1 },
  { t: "Irregular", sub: "Closer together or further apart", v: 2 },
  { t: "I skip months", sub: "60+ day gaps sometimes", v: 3 },
  { t: "No period for 12+ months", sub: "", v: 4 },
  { t: "I can't tell", sub: "IUD, ablation, or hysterectomy", v: 5 },
];

const INTENT_OPTS = [
  { t: "I want them gone — as fast as possible", sub: "", v: 0 },
  { t: "I want a plan that fits my real life", sub: "10 minutes a day, not a life overhaul", v: 1 },
  { t: "I'm just curious for now", sub: "", v: 2 },
];

const BANDS = [
  { min: 0, max: 14, name: "Early Signals", copy: "Your symptom load is still light — which makes this the single best moment to act. Women who prepare in this window report the smoothest transitions." },
  { min: 15, max: 29, name: "The Shift Has Begun", copy: "Your pattern is consistent with active hormonal transition. Symptoms at this level rarely resolve on their own — but they respond well to the right protocol." },
  { min: 30, max: 44, name: "Full Transition Pattern", copy: "Your answers show a significant, multi-system perimenopause pattern. This is the stage where most women finally seek help — and where the right plan changes everything." },
  { min: 45, max: 60, name: "High-Impact Perimenopause", copy: "Your symptom load is heavy across multiple systems. You should not be white-knuckling through this — targeted support exists, and it works." },
];

function phaseEstimate(total: number, cycleStatus: number | null | undefined): string {
  switch (cycleStatus) {
    case 4: return "Likely postmenopause";
    case 3: return "Late perimenopause";
    case 2: return "Mid perimenopause";
    case 1: return "Early perimenopause";
    case 5: return "Cycle-masked — symptom-staged";
    default: return total >= 20 ? "Very early perimenopause" : "Pre-transition";
  }
}

/* ------------------------------------------------------------------
   Step model
   ------------------------------------------------------------------ */
// step 0 = age, 1 = cycle, 2..21 = QUESTIONS[0..19], 22 = intent
const AGE_STEP = 0;
const CYCLE_STEP = 1;
const FIRST_Q_STEP = 2;
const INTENT_STEP = FIRST_Q_STEP + QUESTIONS.length; // 22
const TOTAL_STEPS = INTENT_STEP + 1; // 23

type ScreenState = { step: number; showBreakForQ?: number };

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const initial = useMemo<QuizStartup>(() => resumeFromStorage(), []);
  const [age, setAge] = useState<number | null>(initial.age);
  const [cycleStatus, setCycleStatus] = useState<number | null>(initial.cycleStatus);
  const [answers, setAnswers] = useState<(number | null)[]>(initial.answers);
  const [intent, setIntent] = useState<number | null>(initial.intent);
  const [screen, setScreen] = useState<ScreenState>({ step: initial.resumeStep });
  const [history, setHistory] = useState<ScreenState[]>([]);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

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

  const persistProgress = (patch: {
    age?: number | null;
    cycleStatus?: number | null;
    answers?: (number | null)[];
    intent?: number | null;
  }) => {
    const cleanAnswers = (patch.answers ?? answers).map((a) => (a == null ? null : a));
    setQuizState({
      answers: cleanAnswers.map((a) => (a == null ? 0 : a)),
      age: patch.age !== undefined ? patch.age : age,
      cycleStatus: patch.cycleStatus !== undefined ? patch.cycleStatus : cycleStatus,
      intent: patch.intent !== undefined ? patch.intent : intent,
    });
    const answered = cleanAnswers.filter((a) => a != null).length;
    trackEvent("quiz_progress", {
      questions_answered: answered,
      total_questions: QUESTIONS.length,
      answers: cleanAnswers,
      age: patch.age !== undefined ? patch.age : age,
      cycleStatus: patch.cycleStatus !== undefined ? patch.cycleStatus : cycleStatus,
    });
  };

  const handleAge = (i: number) => {
    setAge(i);
    persistProgress({ age: i });
    goTo({ step: CYCLE_STEP });
  };

  const handleCycle = (v: number) => {
    setCycleStatus(v);
    persistProgress({ cycleStatus: v });
    goTo({ step: FIRST_Q_STEP });
  };

  const handleAnswer = (qIdx: number, v: number) => {
    const nextAnswers = [...answers];
    nextAnswers[qIdx] = v;
    setAnswers(nextAnswers);
    persistProgress({ answers: nextAnswers });
    const nextQ = qIdx + 1;
    if (nextQ >= QUESTIONS.length) {
      goTo({ step: INTENT_STEP });
      return;
    }
    if (BREAKS[nextQ]) {
      goTo({ step: FIRST_Q_STEP + nextQ, showBreakForQ: nextQ });
    } else {
      goTo({ step: FIRST_Q_STEP + nextQ });
    }
  };

  const handleContinueBreak = (qIdx: number) => {
    setScreen({ step: FIRST_Q_STEP + qIdx });
  };

  const handleIntent = async (v: number) => {
    setIntent(v);
    // Compute results.
    const filled = answers.map((a) => (a == null ? 0 : a));
    const total = filled.reduce((a, b) => a + b, 0);
    const band = BANDS.find((b) => total >= b.min && total <= b.max) || null;
    const clusterScores = CLUSTERS.map((c, ci) => {
      let sum = 0;
      QUESTIONS.forEach((q, qi) => { if (q.c === ci) sum += filled[qi]; });
      return { key: c.key, label: c.label, score: sum, max: 12 };
    });
    const dom = [...clusterScores].sort((a, b) => b.score - a.score)[0];
    const phase = phaseEstimate(total, cycleStatus);
    const pct = Math.round((total / 60) * 100);

    setQuizState({
      answers: filled,
      age,
      cycleStatus,
      intent: v,
      total,
      pct,
      band: band ? { name: band.name, copy: band.copy } : undefined,
      clusterScores,
      dom,
      phase,
    });

    await trackEvent("quiz_complete", {
      quiz_results: {
        total, band: band?.name ?? null, phase, dom: dom?.key ?? null, pct,
        clusters: clusterScores, answers: filled, age, cycleStatus, intent: v,
      },
    });

    navigate("/calculating");
  };

  const progressPct = Math.min(100, Math.round(((screen.step + 1) / TOTAL_STEPS) * 100));
  const canBack = history.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF7F4] to-[#F3E8EE]">
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

      <main className="max-w-2xl mx-auto px-5 pt-6 pb-16">
        {screen.step === AGE_STEP && (
          <Screen
            eyebrow="About you"
            title="How old are you?"
            hint="Your age helps us place your symptoms on the transition timeline."
          >
            <OptionList>
              {AGE_OPTS.map((label, i) => (
                <OptButton key={i} onClick={() => handleAge(i)} selected={age === i}>{label}</OptButton>
              ))}
            </OptionList>
          </Screen>
        )}

        {screen.step === CYCLE_STEP && (
          <Screen
            eyebrow="About you"
            title="Which best describes your period right now?"
            hint="This is the single most important staging question."
          >
            <OptionList>
              {CYCLE_OPTS.map((o) => (
                <OptButton key={o.v} onClick={() => handleCycle(o.v)} selected={cycleStatus === o.v} sub={o.sub}>
                  {o.t}
                </OptButton>
              ))}
            </OptionList>
          </Screen>
        )}

        {screen.step >= FIRST_Q_STEP && screen.step < INTENT_STEP && (() => {
          const qIdx = screen.step - FIRST_Q_STEP;
          if (screen.showBreakForQ === qIdx && BREAKS[qIdx]) {
            const info = BREAKS[qIdx];
            return (
              <div className="rounded-3xl bg-[#5D4154] text-white p-7 shadow-xl">
                <div className="text-[11px] tracking-[0.14em] uppercase text-[#EBD9BC] font-bold mb-3">
                  {info.eyebrow}
                </div>
                <div className="font-playfair text-5xl font-semibold mb-2">
                  {info.stat} <span className="text-lg align-middle text-[#EBD9BC]">{info.statsub}</span>
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
          const q = QUESTIONS[qIdx];
          return (
            <Screen
              eyebrow={CLUSTERS[q.c].label}
              title={q.t}
              hint={q.h || "How often is this true for you?"}
            >
              <OptionList>
                {OPTS.map((o) => (
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
            title="If these symptoms could be reduced or gone in the next few weeks — what describes you best?"
            hint="Your answer shapes the plan we build for you."
          >
            <OptionList>
              {INTENT_OPTS.map((o) => (
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

/* ------------------------------------------------------------------
   Small presentational helpers
   ------------------------------------------------------------------ */

const Screen: React.FC<{ eyebrow: string; title: string; hint?: string; children: React.ReactNode }>
  = ({ eyebrow, title, hint, children }) => (
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

/* ------------------------------------------------------------------
   Resume from localStorage on refresh.
   ------------------------------------------------------------------ */
type QuizStartup = {
  age: number | null;
  cycleStatus: number | null;
  answers: (number | null)[];
  intent: number | null;
  resumeStep: number;
};

function resumeFromStorage(): QuizStartup {
  const s = getQuizState();
  const answersRaw = Array.isArray(s.answers) ? s.answers.slice(0, QUESTIONS.length) : [];
  const answers: (number | null)[] = Array.from({ length: QUESTIONS.length }, (_, i) =>
    typeof answersRaw[i] === "number" ? (answersRaw[i] as number) : null
  );
  const age = typeof s.age === "number" ? s.age : null;
  const cycleStatus = typeof s.cycleStatus === "number" ? s.cycleStatus : null;
  const intent = typeof s.intent === "number" ? s.intent : null;
  // Determine resume point: the earliest unanswered step.
  let resumeStep = AGE_STEP;
  if (age == null) resumeStep = AGE_STEP;
  else if (cycleStatus == null) resumeStep = CYCLE_STEP;
  else {
    const firstUnanswered = answers.findIndex((a) => a == null);
    if (firstUnanswered === -1) resumeStep = INTENT_STEP;
    else resumeStep = FIRST_Q_STEP + firstUnanswered;
  }
  return { age, cycleStatus, answers, intent, resumeStep };
}

export default Quiz;
