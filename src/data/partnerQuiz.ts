// Partner-variant ("Husband's Quiz") content. Same scoring architecture:
// 20 questions × 5 clusters × 4-point scale (Never/Rarely/Sometimes/Often).

export const PARTNER_CLUSTERS = [
  { key: "observed", label: "What you're seeing" },
  { key: "impact", label: "What it's doing to you" },
  { key: "response", label: "How you've been responding" },
  { key: "spiral", label: "The spiral" },
  { key: "readiness", label: "Readiness" },
] as const;

export const PARTNER_QUESTIONS: { c: number; t: string; h: string }[] = [
  // What you're seeing
  { c: 0, t: "She pulls away from hugs, hand-holding, or kisses that used to be automatic.", h: "Answer about the last 6 months." },
  { c: 0, t: "She seems exhausted in a way that sleep doesn't fix.", h: "" },
  { c: 0, t: "Her sleep is broken — up in the night, kicking off covers, awake at 3 a.m.", h: "" },
  { c: 0, t: "Her moods shift faster and hit harder than they used to — and small things set them off.", h: "" },
  // What it's doing to you
  { c: 1, t: "I take the rejection personally, even when I tell myself not to.", h: "" },
  { c: 1, t: "I've caught myself wondering if she stopped loving me — or if there's someone else.", h: "" },
  { c: 1, t: "It feels like we're roommates running a household, not partners.", h: "" },
  { c: 1, t: "I miss her — even when she's sitting right next to me.", h: "" },
  // How you've been responding
  { c: 2, t: "I've stopped initiating because I can't take another no.", h: "" },
  { c: 2, t: "I've made comments or jokes about it that landed badly.", h: "" },
  { c: 2, t: "I've pulled back my own affection to protect myself.", h: "" },
  { c: 2, t: "We've had the same argument about it more than once — and it goes nowhere.", h: "" },
  // The spiral
  { c: 3, t: "We touch less in the ordinary ways — the kitchen hug, the couch, the hallway squeeze.", h: "" },
  { c: 3, t: "Our conversations stay on logistics — kids, money, schedules — and rarely go deeper.", h: "" },
  { c: 3, t: "One of us times bedtime to avoid the question hanging in the air.", h: "" },
  { c: 3, t: "The distance is growing, and neither of us has named it out loud.", h: "" },
  // Readiness
  { c: 4, t: "Honestly, I know very little about what happens to a woman's hormones in her 40s.", h: "" },
  { c: 4, t: "I want to help, but the things I try seem to make it worse.", h: "" },
  { c: 4, t: "If I understood what was actually going on, I'd handle this completely differently.", h: "" },
  { c: 4, t: "I'd do the work — if someone showed me exactly what the work is.", h: "" },
];

export const PARTNER_OPTS = [
  { label: "Never", v: 0 },
  { label: "Rarely", v: 1 },
  { label: "Sometimes", v: 2 },
  { label: "Often", v: 3 },
];

export const PARTNER_YOUR_AGE_OPTS = ["Under 35", "35–39", "40–44", "45–49", "50–55", "56+"];
export const PARTNER_HER_AGE_OPTS = ["Under 35", "35–39", "40–44", "45–49", "50–55", "56+"];
export const PARTNER_TOGETHER_OPTS = [
  { t: "Under 5 years", sub: "", v: 0 },
  { t: "5–10 years", sub: "", v: 1 },
  { t: "10–20 years", sub: "", v: 2 },
  { t: "20+ years", sub: "", v: 3 },
];

export const PARTNER_INTENT_OPTS = [
  { t: "I want us back — whatever it takes", sub: "", v: 0 },
  { t: "I want to understand before I act", sub: "", v: 1 },
  { t: "I'm trying to figure out if this is fixable", sub: "", v: 2 },
];

// Break screens shown BEFORE question index 4, 10, 16.
export const PARTNER_BREAKS: Record<number, { eyebrow: string; h: string; p: string }> = {
  4: {
    eyebrow: "Read this before you answer another question",
    h: "There's a strong chance this is not about you.",
    p: "If she's between roughly 38 and 55, there is a well-documented biological transition that buries desire and affection years before anyone connects the dots: perimenopause. Testosterone and estrogen decline. Sleep breaks. Energy vanishes. Touch can literally start to feel like one more demand. Her pulling away is very often chemistry plus exhaustion — not a verdict on you, and not the end of wanting you.",
  },
  10: {
    eyebrow: "The hard part",
    h: "Every man in this spot does one of two things. Both make it worse.",
    p: "Pressure — initiating harder, hinting, keeping score. Or withdrawal — going cold to protect yourself. They're the two natural responses to rejection, and each one confirms her worst fear while deepening yours. This isn't a character flaw. Nobody ever taught you what's actually happening — that's what the rest of this assessment is mapping.",
  },
  16: {
    eyebrow: "The part that should give you hope",
    h: "This spiral runs in reverse, too.",
    p: "When a man understands what's really going on and changes how he shows up, safety comes back first. Affection follows safety. Desire follows affection — in that order, and not overnight. You can't fix her hormones. You can absolutely become the reason it's safe for the wanting to return.",
  },
};

export const PARTNER_BANDS = [
  { min: 0, max: 14, name: "Early Distance", copy: "You're catching the drift early — the best window to change how you're showing up before the spiral deepens." },
  { min: 15, max: 29, name: "The Quiet Spiral", copy: "A pattern is forming across several areas. This responds well when the right adjustments happen in the right order." },
  { min: 30, max: 44, name: "The Standoff Pattern", copy: "The distance has settled into a routine on both sides. This is where a structured plan matters most." },
  { min: 45, max: 60, name: "Deep Disconnection", copy: "The load is heavy on multiple fronts. There is a way back, and it starts with what you understand — not what you do to her." },
];

export const PARTNER_CHECKPOINTS = [
  { key: "dismissed" as const, q: "Do you still love her — it's the distance that's killing you?" },
  { key: "normalLabs" as const, q: "Has she ever said 'it's not you' — and you didn't believe her?" },
  { key: "sleepFirst" as const, q: "If you knew exactly what to do this week, would you do it?" },
];

export function partnerPhaseEstimate(total: number, herAge: number | null | undefined): string {
  // herAge index maps to PARTNER_HER_AGE_OPTS.
  switch (herAge) {
    case 5: return "Likely postmenopausal window";
    case 4: return "Late perimenopause window";
    case 3: return "Mid perimenopause window";
    case 2: return "Early perimenopause window";
    case 1: return "Pre/very early transition";
    case 0: return "Pre-transition";
    default: return total >= 20 ? "Likely perimenopause window" : "Unclear window";
  }
}