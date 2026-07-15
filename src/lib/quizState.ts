// Shared client-side state for the post-quiz funnel.
// Persisted in localStorage under `quizState`. Every step hydrates from
// this object, and every step patches the Supabase `leads` row via the
// track-event edge function so refresh survives across steps.

const SUPABASE_URL = "https://bjwrfmoivnttemjydvyz.supabase.co";
const STORAGE_KEY = "quizState";

export type ClusterScore = { key: string; label: string; score: number; max: number };

export type Checkpoints = {
  dismissed?: boolean;
  normalLabs?: boolean;
  sleepFirst?: boolean;
};

export type QuizState = {
  answers?: number[];
  age?: number | null;
  cycleStatus?: number | null;
  intent?: number | null;
  total?: number;
  pct?: number;
  band?: { name: string; copy: string };
  clusterScores?: ClusterScore[];
  dom?: ClusterScore;
  phase?: string;
  checkpoints?: Checkpoints;
  email?: string;
  name?: string;
  trialPriceCents?: number;
  leadId?: string | null;
  quizVariant?: "symptoms" | "desire" | "partner";
  flowVariant?: "search" | "cold";
};

export function getQuizState(): QuizState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as QuizState;
  } catch {
    return {};
  }
}

export function setQuizState(patch: Partial<QuizState>): QuizState {
  const cur = getQuizState();
  const next = { ...cur, ...patch };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function getSessionId(): string {
  try {
    let sid = localStorage.getItem("mm_session_id");
    if (!sid) {
      sid = crypto.randomUUID?.() ?? String(Date.now()) + Math.random().toString(36).slice(2);
      localStorage.setItem("mm_session_id", sid);
    }
    return sid;
  } catch {
    return String(Date.now());
  }
}

export async function trackEvent(event: string, extra: Record<string, unknown> = {}): Promise<void> {
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/track-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: getSessionId(), event, ...extra }),
    });
  } catch {
    // best-effort
  }
}