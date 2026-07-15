// Desire-variant quiz content. Same scoring architecture as the symptoms quiz:
// 20 questions × 5 clusters × 4-point scale (Never/Rarely/Sometimes/Often).

export const DESIRE_CLUSTERS = [
  { key: "desire", label: "Desire & Response" },
  { key: "comfort", label: "Body & Comfort" },
  { key: "hormones", label: "Hormonal Signals" },
  { key: "energy", label: "Energy & Mind" },
  { key: "connection", label: "Connection & Emotion" },
] as const;

export const DESIRE_QUESTIONS: { c: number; t: string; h: string }[] = [
  // Desire & Response
  { c: 0, t: "I love my partner — but the wanting is just gone.", h: "The ad brought you here for a reason. Be honest." },
  { c: 0, t: "When he initiates, I feel nothing — or I tense up.", h: "" },
  { c: 0, t: "I can't remember the last time I wanted it first.", h: "" },
  { c: 0, t: "I avoid situations that might lead to intimacy — going to bed later, staying busy.", h: "" },
  // Body & Comfort
  { c: 1, t: "Sex is uncomfortable or painful in ways it never used to be.", h: "" },
  { c: 1, t: "My body feels different — and I don't feel at home in it.", h: "" },
  { c: 1, t: "Touch that used to feel good now feels irritating or like \u201Cone more demand.\u201D", h: "" },
  { c: 1, t: "I avoid being seen — changing in private, lights off.", h: "" },
  // Hormonal Signals
  { c: 2, t: "My period has changed — heavier, lighter, closer together, or skipping months.", h: "" },
  { c: 2, t: "I get waves of heat, night sweats, or my sleep breaks between 2 and 4 a.m.", h: "" },
  { c: 2, t: "PMS or mood swings feel more intense or less predictable than they used to.", h: "" },
  { c: 2, t: "Weight is settling around my middle no matter what I do.", h: "" },
  // Energy & Mind
  { c: 3, t: "By the time evening comes, I have nothing left for anyone.", h: "" },
  { c: 3, t: "I snap at the people I love over small things — then feel guilty.", h: "" },
  { c: 3, t: "There's a low hum of anxiety or flatness most days.", h: "" },
  { c: 3, t: "My mind never stops — the mental load runs even in bed.", h: "" },
  // Connection & Emotion
  { c: 4, t: "I feel guilty about what this is doing to him — and to us.", h: "" },
  { c: 4, t: "I avoid affection because I'm afraid of where it might lead.", h: "" },
  { c: 4, t: "I can feel the distance growing, and I don't know how to explain it.", h: "" },
  { c: 4, t: "Sometimes I wonder if something is wrong with me.", h: "" },
];

export const DESIRE_OPTS = [
  { label: "Never", v: 0 },
  { label: "Rarely", v: 1 },
  { label: "Sometimes", v: 2 },
  { label: "Often", v: 3 },
];

export const DESIRE_AGE_OPTS = ["Under 35", "35–39", "40–44", "45–49", "50–55", "56+"];

export const DESIRE_CYCLE_OPTS = [
  { t: "Regular, like clockwork", sub: "Same as it's always been", v: 0 },
  { t: "Still regular — but different", sub: "Heavier, lighter, shorter, or new PMS", v: 1 },
  { t: "Irregular", sub: "Closer together or further apart", v: 2 },
  { t: "I skip months", sub: "60+ day gaps sometimes", v: 3 },
  { t: "No period for 12+ months", sub: "", v: 4 },
  { t: "I can't tell", sub: "IUD, ablation, or hysterectomy", v: 5 },
];

export const DESIRE_INTENT_OPTS = [
  { t: "I want it back — for me AND for us", sub: "", v: 0 },
  { t: "I want to understand what happened first", sub: "", v: 1 },
  { t: "I'm just trying to figure out if something's wrong", sub: "", v: 2 },
];

// Break screens shown BEFORE question index 4, 10, 16.
export const DESIRE_BREAKS: Record<number, { eyebrow: string; h: string; p: string }> = {
  4: {
    eyebrow: "You are not the only one",
    h: "Lost desire is the most common — and least discussed — symptom of perimenopause.",
    p: "Testosterone and estrogen begin shifting years before your last period, and desire is often the first thing to quietly go. It's not your love. It's not your marriage. For most women, it's chemistry — and chemistry can be addressed.",
  },
  10: {
    eyebrow: "It's connected",
    h: "The broken sleep. The 2 p.m. exhaustion. The snapping. The vanished desire. Same story.",
    p: "These aren't separate problems — they're one hormonal transition showing up in different rooms of your life. Your answers are mapping which system is carrying the most weight, because that's where your plan will start.",
  },
  16: {
    eyebrow: "The part no one tells you",
    h: "It comes back.",
    p: "Desire in midlife isn't gone — it's suppressed, by hormones, exhaustion, discomfort, and the mental load. Address the actual drivers in the right order, and the wanting has room to return. That's what your plan is for.",
  },
};

export const DESIRE_BANDS = [
  { min: 0, max: 14, name: "Early Suppression", copy: "Your desire signals are early — this is the best window to address the drivers before they compound." },
  { min: 15, max: 29, name: "Active Suppression", copy: "Your pattern shows active suppression across several systems. This responds well when addressed in the right order." },
  { min: 30, max: 44, name: "Deep Suppression Pattern", copy: "Your answers show a significant, multi-system suppression pattern. This is where a structured plan matters most." },
  { min: 45, max: 60, name: "Heavy Multi-System Suppression", copy: "Your load is heavy across multiple systems. Targeted support exists, and it works — starting with your heaviest suppressor." },
];

export const DESIRE_CHECKPOINTS = [
  { key: "dismissed" as const, q: "Do you still love him — it's just the wanting that's gone?" },
  { key: "normalLabs" as const, q: "Have you been quietly blaming yourself for something that might be chemical?" },
  { key: "sleepFirst" as const, q: "If desire came back, would it change more than just your sex life?" },
];

export const DESIRE_EDUCATION_CARDS = [
  { stat: "1 in 3", label: "midlife women report reduced desire as their #1 symptom." },
  { stat: "4–10 yrs", label: "perimenopause can last — desire shifts often start first." },
  { stat: "Testosterone", label: "falls ~50% between age 20 and 45 — before estrogen even moves." },
  { stat: "Multi-system", label: "sleep, mood, comfort, and energy all quietly suppress desire." },
  { stat: "Reversible", label: "for most women, the drivers are addressable in the right order." },
];

export function desirePhaseEstimate(total: number, cycleStatus: number | null | undefined): string {
  switch (cycleStatus) {
    case 4: return "Likely postmenopause";
    case 3: return "Late perimenopause";
    case 2: return "Mid perimenopause";
    case 1: return "Early perimenopause";
    case 5: return "Cycle-masked — symptom-staged";
    default: return total >= 20 ? "Very early perimenopause" : "Pre-transition";
  }
}