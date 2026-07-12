
# Funnel Restructure — 5-Beat Flow

Rebuild the post-quiz sequence so each beat is its own route, matching the target flow exactly:

```text
/quiz (22 Qs, existing HTML)
   ↓ (on completion, redirect parent window)
/calculating   ← NEW
   ↓
/quiz-email    ← NEW
   ↓
/trial-price   ← NEW (reuses PriceChoice, no charge yet)
   ↓
/results       ← REDUCED to teaser + benefits + CTA
   ↓ (Get my plan → create-trial-checkout with stored cents)
Stripe Checkout
   ↓
/upsell (existing) → /confirm (existing, add full reveal)
```

## Shared state

- `localStorage.quizState`: `{ answers, score, band, email, name, trialPriceCents, checkpoints }`
- Every step also patches the Supabase `leads` row via existing `track-event` edge function (extend to accept `checkpoints`, `trial_price_cents`, and new event names).
- Every page hydrates from `quizState` on mount; if a required prior field is missing, redirect back to the earliest missing step. This makes refresh safe.

## Step 1 — `/calculating` (new page)

New route `src/pages/Calculating.tsx`.

- H1 "Calculating your results…"
- 5 progress bars, sequential fill ~0.7s each, green ✓ when complete:
  1. Analyzing your sleep pattern
  2. Scoring your nervous-system load
  3. Mapping your cycle stage
  4. Checking your symptom clusters
  5. Sequencing your personalized plan
- Checkpoint modal fires after bars 1, 2, 4 — animation pauses until Yes/No is clicked. Answers stored on `quizState.checkpoints` and sent to `track-event` as `checkpoint_answered` with `{dismissed, normalLabs, sleepFirst}`.
- Below bars: auto-rotating testimonial carousel (~3.5s, dots), reusing existing testimonial content stripped to 5-star + quote + "— Name, age".
- On last bar complete → `navigate("/quiz-email")`.

## Step 2 — `/quiz-email` (new page)

New route `src/pages/QuizEmail.tsx`. Single purpose.

- Logo mark (existing brand mark — no mascot)
- H1 "Enter your email to receive the results"
- Email input (validated, prefilled from `quizState.email`)
- Reassurance box with lock icon: "Your information is 100% secure with us, and we promise not to use it for spamming purposes"
- Button "Explore results" → save email + fire `email_submitted` event → `navigate("/trial-price")`
- Nothing else — no prices, no offers, no benefits.

## Step 3 — `/trial-price` (new page)

New route `src/pages/TrialPrice.tsx`. Reuses `<PriceChoice />` visually, but the Continue behavior changes.

- Refactor `PriceChoice.tsx` to accept an optional `mode: "checkout" | "select"` prop:
  - `"checkout"` (current default, keep for backward compat) → calls `create-trial-checkout` and redirects.
  - `"select"` → stores selected cents in `quizState.trialPriceCents`, patches lead (`price_selected` event), then calls a passed `onContinue()` prop.
- `/trial-price` page renders `<PriceChoice mode="select" onContinue={() => navigate("/results")} />`.
- All copy stays identical ("Joining a new program can be daunting…", "$17.34 to pay our team", "You won't be charged at this step", options $1/$2/$10/$17.34, $10 preselected, disclosure box).

## Step 4 — `/results` (major reduction)

Rewrite `src/pages/Results.tsx` to a lean teaser page. Top to bottom:

1. H1 "Your Perimenopause Assessment"
2. Gauge teaser — reuse `ScoreMeter` showing needle + band name chip only. Cluster breakdown, phase estimate, dominant driver, symptom detail all removed (or wrapped in a blurred locked preview overlay so the user can visually see there's more behind the paywall).
3. Line: "Based on your responses, we've developed your personalized 28-Day Reclamation Plan."
4. "What you will get with your customized plan" — checkmark list next to an app/plan visual:
   - Your full symptom-by-symptom profile — all five systems scored and explained
   - Your hormonal stage + #1 symptom driver, in plain English
   - The 28-Day Reclamation Plan personalized to your heaviest system
   - The 3 A.M. SOS Toolkit + relaxation audio library
   - Daily symptom & protocol tracker — see what's actually working
   - Labs Decoder + doctor-visit prep tools
5. "How your trial works" 3-row timeline:
   - ✓ Take the assessment (struck-through, done)
   - 🔓 Today: full access for the $X you chose (read `trialPriceCents`)
   - 📅 Day 7 (computed date): $29.99/month ($0.99/day) unless you cancel; reminder email 2 days before
6. Primary CTA "Get my plan" → `supabase.functions.invoke("create-trial-checkout", { trial_price_cents, trial_days: 7, email, name, lead_id })`, redirect to returned `url`. Fires `checkout_started`.
7. `<TrustFooter />` + disclaimer.

**Deleted from Results:** MenoMastery $7 ebook, Gumroad links, 72-hour window story, marriage testimonials, was-$97 pricing, all sales-letter sections, `SimplePricingSection`, `SubscriptionOptions`, `OfferSection`, `PremiumOffer`, etc.

## Step 5 — `/confirm` (existing, extend)

Add a full-reveal panel on `ConfirmPage.tsx`:
- Phase estimate
- All 5 cluster bars with scores
- #1 driver explanation
Reuses `calculateHormoneScores` from `quizState.answers`.

## Wiring the HTML quiz → React flow

Existing `public/quiz-funnel.html` completes into its own paywall UI. On last question answered:
- Save `answers`, `score`, `band` into `localStorage.quizState` (write from within the iframe using `window.top.localStorage`).
- Fire `quiz_complete` via existing `track-event`.
- `window.top.location.href = "/calculating"` to exit the iframe.

Remove/hide the current in-iframe paywall + email + price screens so the HTML funnel ends at the last question and hands off cleanly. Keep the HTML file otherwise intact (no visual/quiz-copy changes).

## Backend touches

- Extend `supabase/functions/track-event/index.ts` to accept new event names: `calculating_view`, `checkpoint_answered` (with `checkpoints` jsonb merged into `quiz_results`), `price_selected` (writes `trial_price_cents`), `results_view`, `checkout_started`.
- No changes to `create-trial-checkout`, the `[100,200,1000,1734]` whitelist, or Stripe wiring.

## Guardrails honored

- Disclosure copy preserved on `/trial-price`, `/results` timeline, and Stripe `custom_text`.
- No payment call until "Get my plan" click on `/results`.
- Analytics events fired at each step as listed.
- Refresh at any step resumes via `quizState` + redirect-if-missing guard.

## Acceptance checklist

- Mobile flow: quiz → calculating (3 popups) → email required → price → teaser results (no full breakdown) → Stripe test charges chosen amount → upsell → confirm shows full profile
- Refresh at any step resumes correctly
- No Gumroad links on `/results`
- Lead row contains: answers, checkpoints, email, trial_price_cents, status progression

---

**Scope note:** this is a large edit touching ~10 files (3 new pages, Results rewrite, PriceChoice prop, track-event extension, quiz-funnel handoff, ConfirmPage reveal, App.tsx routes). I'll do it in one pass unless you want to split it (e.g. land calculating+email+price first, then Results rewrite second).
