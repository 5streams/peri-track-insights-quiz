## Goal

Ship a Meta-traffic funnel at **/becomeheragain** ("Why did the wanting disappear?") that runs alongside the existing symptom quiz. Same backend, same Stripe, same offer — new copy, new questions, new bands.

## Route decision

You said "on /becomeheragain make these necessary changes" but the v7 spec calls it `/desire-quiz`. I'll implement the variant at **/becomeheragain** (your earlier instruction) and also alias **/desire-quiz** → same page, so ad URLs in the spec still work. Say the word if you want only one.

## What's new vs what's reused

Reused as-is: `leads` table, `track-event`, scoring engine (0–3 × 20, 5 clusters), Stripe checkout, upsell, confirm, medical/trial disclosures.

New per variant, chosen by a `quiz_variant` flag on `quizState` + `leads`:
- Welcome copy, 20 questions, 5 cluster keys (desire / comfort / hormones / energy / connection)
- 3 in-quiz interstitials (after Q4, Q10, Q16)
- Calculating checkpoints (3 desire-specific)
- Email screen headline
- Price screen unlock-recap top bullets (intimacy line first)
- Results band names + key line
- Outcome cards: new "Want to want it again" card, forced first
- FLOW_VARIANT = "cold" for this variant: quiz → calculating → email → price → checkout → results teaser → upsell → confirm. Existing "search" flow unchanged.

## Files to add

- `src/data/desireQuiz.ts` — welcome copy, 20 Qs, staging, interstitials, checkpoints, band names, cluster labels
- `src/pages/DesireQuiz.tsx` — welcome + question runner (mirrors `Quiz.tsx`, reads from `desireQuiz.ts`, writes `quiz_variant: "desire"`)
- Route entries in `src/App.tsx`: `/becomeheragain` and `/desire-quiz` → `DesireQuiz`

## Files to modify

- `src/lib/quizState.ts` — add `quizVariant?: "symptoms" | "desire"` and `flowVariant?: "search" | "cold"`
- `src/pages/Calculating.tsx` — branch checkpoints + testimonial vs education card by `quizVariant`; on desire, next step is `/quiz-email` (cold flow), not `/results`
- `src/pages/QuizEmail.tsx` — variant-aware headline; next = `/trial-price`
- `src/pages/TrialPrice.tsx` — when variant=desire, next after checkout = `/results`; recap block gets the two intimacy bullets prepended
- `src/pages/Results.tsx` — band names + key line branch by variant; force "Want to want it again" card first, dominant cluster second; hide face images on desire variant (spec says none)
- `src/pages/ConfirmPage.tsx` — add "Tonight: read 'The Chemistry of Wanting'" card when variant=desire
- `supabase/functions/track-event/index.ts` — accept `quiz_variant` and persist to `leads`

## Database

One migration: `ALTER TABLE public.leads ADD COLUMN quiz_variant text` (nullable, default null; existing rows stay null = symptoms). Existing RLS/grants untouched.

## Scoring & bands

Same 0–60 total. Bands renamed for desire variant only:
- 0–14 Early Suppression · 15–29 Active Suppression · 30–44 Deep Suppression Pattern · 45–60 Heavy Multi-System Suppression

Cluster labels (desire variant):
- desire → "Desire & Response"
- comfort → "Body & Comfort"
- hormones → "Hormonal Signals"
- energy → "Energy & Mind"
- connection → "Connection & Emotion"

## Guardrails baked in

- No diagnosis language — "your pattern," "common drivers"
- No timelines/guarantees for desire returning
- Education stat cards on Calculating (not testimonials) until real released quotes exist
- No face imagery on this variant
- Trial + medical disclosures unchanged and re-rendered

## Acceptance walk-through I'll verify

1. /becomeheragain welcome → 2 staging → 20 Qs → interstitials at 4/10/16 → calculating (3 checkpoints) → email → price → Stripe test charge → results teaser with renamed bands and desire outcome card first → upsell → confirm.
2. leads row has quiz_variant="desire", answers, checkpoints, intent, email, trial_price_cents.
3. /quiz symptom flow still unchanged.

Approve and I'll build it in one pass (migration first, then code).
