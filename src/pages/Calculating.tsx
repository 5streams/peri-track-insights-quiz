import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";
import { DESIRE_CHECKPOINTS, DESIRE_EDUCATION_CARDS } from "@/data/desireQuiz";
import { PARTNER_CHECKPOINTS } from "@/data/partnerQuiz";

const BARS = [
  "Analyzing your sleep pattern",
  "Scoring your nervous-system load",
  "Mapping your cycle stage",
  "Checking your symptom clusters",
  "Sequencing your personalized plan",
];

const SYMPTOMS_CHECKPOINTS: { key: keyof NonNullable<ReturnType<typeof getQuizState>["checkpoints"]>; q: string }[] = [
  { key: "dismissed", q: "Has a doctor ever brushed off your symptoms as \u201Cjust stress\u201D or \u201Cjust aging\u201D?" },
];

const QUOTES = [
  { q: "The 3 A.M. Protocol alone was worth it. I sleep now.", n: "Dana, 49" },
  { q: "For the first time in three years, I felt actually heard.", n: "Michelle, 46" },
  { q: "My energy came back by week three. My family noticed before I did.", n: "Lisa, 51" },
  { q: "I was skeptical about another program, but this one fit into my actual life.", n: "Sarah, 50" },
  { q: "The tracker showed me patterns I couldn't see on my own. Game changer.", n: "Jenn, 44" },
  { q: "By week two I wasn't dreading bedtime anymore.", n: "Rachel, 45" },
];

const Calculating: React.FC = () => {
  const navigate = useNavigate();
  const [barIdx, setBarIdx] = useState(0); // number of bars completed
  const [modalIdx, setModalIdx] = useState<number | null>(null); // which checkpoint is showing
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [quoteFade, setQuoteFade] = useState(1);
  const cpDone = useRef(0);
  const timerRef = useRef<number | null>(null);
  const [variant, setVariant] = useState<"symptoms" | "desire" | "partner">("symptoms");

  const CHECKPOINTS =
    variant === "desire" ? DESIRE_CHECKPOINTS
    : variant === "partner" ? PARTNER_CHECKPOINTS
    : SYMPTOMS_CHECKPOINTS;
  const isDesire = variant === "desire" || variant === "partner";

  useEffect(() => {
    // Redirect back to quiz if no answers present.
    const s = getQuizState();
    if (!s.answers || !s.answers.length) {
      navigate("/quiz", { replace: true });
      return;
    }
    if (s.quizVariant === "desire") setVariant("desire");
    else if (s.quizVariant === "partner") setVariant("partner");
    trackEvent("calculating_view");
  }, [navigate]);

  // Bar animation, pausing when a modal is up.
  useEffect(() => {
    if (modalIdx !== null) return;
    if (barIdx >= BARS.length) {
      const t = window.setTimeout(() => navigate("/results"), 500);
      return () => window.clearTimeout(t);
    }
    timerRef.current = window.setTimeout(() => {
      const nextBarIdx = barIdx + 1;
      // Fire checkpoints spaced through the bars.
      // Symptoms: after bar 2 (1 checkpoint). Desire: after bar 1, 2, 3 (3 checkpoints).
      const cpTrigger = isDesire
        ? (nextBarIdx === 1 || nextBarIdx === 2 || nextBarIdx === 3)
        : nextBarIdx === 2;
      if (cpTrigger && cpDone.current < CHECKPOINTS.length) {
        setBarIdx(nextBarIdx);
        window.setTimeout(() => setModalIdx(cpDone.current), 400);
      } else {
        setBarIdx(nextBarIdx);
      }
    }, 800);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [barIdx, modalIdx, navigate, isDesire, CHECKPOINTS.length]);

  // Rotating testimonial.
  useEffect(() => {
    const t = window.setInterval(() => {
      setQuoteFade(0);
      window.setTimeout(() => {
        setQuoteIdx((i) => (i + 1) % QUOTES.length);
        setQuoteFade(1);
      }, 350);
    }, 3500);
    return () => window.clearInterval(t);
  }, []);

  const answerCheckpoint = (v: boolean) => {
    if (modalIdx === null) return;
    const cp = CHECKPOINTS[modalIdx];
    const s = getQuizState();
    const checkpoints = { ...(s.checkpoints || {}), [cp.key]: v };
    setQuizState({ checkpoints });
    trackEvent("checkpoint_answered", { checkpoints });
    cpDone.current = modalIdx + 1;
    setModalIdx(null);
  };

  const quote = QUOTES[quoteIdx];
  const eduIdx = quoteIdx % DESIRE_EDUCATION_CARDS.length;
  const eduCard = DESIRE_EDUCATION_CARDS[eduIdx];

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 460, margin: "0 auto", padding: "34px 22px 40px", position: "relative" }}>
        <h1 style={h1Style}>Calculating your results…</h1>

        <div style={{ marginTop: 24 }}>
          {BARS.map((label, i) => {
            const done = i < barIdx;
            const active = i === barIdx && modalIdx === null;
            const width = done ? "100%" : active ? "70%" : "0%";
            return (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginBottom: 6, color: "#46293F" }}>
                  <span>{label}</span>
                  <span style={{ color: done ? "#3d9260" : "#8a7085", fontWeight: 700 }}>{done ? "✓" : ""}</span>
                </div>
                <div style={{ height: 10, background: "#F3E3E9", borderRadius: 99, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width,
                      background: done
                        ? "linear-gradient(90deg,#7E9B84,#5f8168)"
                        : "linear-gradient(90deg,#A4688F,#C29455)",
                      borderRadius: 99,
                      transition: "width .7s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {isDesire ? (
          <div
            style={{
              marginTop: 32,
              background: "#F9F0F4",
              borderRadius: 18,
              padding: 22,
              textAlign: "center",
              opacity: quoteFade,
              transition: "opacity .35s ease",
              minHeight: 130,
            }}
          >
            <div style={{ fontFamily: "'Iowan Old Style',Palatino,Georgia,serif", fontSize: 34, color: "#46293F", fontWeight: 600 }}>
              {eduCard.stat}
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: "#5c4553", margin: "10px 0 0" }}>
              {eduCard.label}
            </p>
          </div>
        ) : (
          <div
            style={{
              marginTop: 32,
              background: "#F9F0F4",
              borderRadius: 18,
              padding: 22,
              textAlign: "center",
              opacity: quoteFade,
              transition: "opacity .35s ease",
              minHeight: 130,
            }}
          >
            <div style={{ color: "#C29455", letterSpacing: 2, fontSize: 14 }}>★★★★★</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#5c4553", margin: "10px 0 8px" }}>
              "{quote.q}"
            </p>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#46293F" }}>— {quote.n}</div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {(isDesire ? DESIRE_EDUCATION_CARDS : QUOTES).map((_, i) => (
            <span
              key={i}
              style={{
                width: i === (isDesire ? eduIdx : quoteIdx) ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === (isDesire ? eduIdx : quoteIdx) ? "#46293F" : "#E8D7DF",
                transition: "all .2s",
              }}
            />
          ))}
        </div>

        {modalIdx !== null && (
          <div style={modalOverlay} role="dialog" aria-modal="true">
            <div style={modalCard}>
              <p style={{ fontFamily: "'Iowan Old Style',Palatino,Georgia,serif", fontSize: 19, lineHeight: 1.35, textAlign: "center", marginBottom: 18, color: "#46293F" }}>
                {CHECKPOINTS[modalIdx].q}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btnPrimary} onClick={() => answerCheckpoint(true)}>Yes</button>
                <button style={btnSecondary} onClick={() => answerCheckpoint(false)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(160deg,#EFDFE7 0%,#F9F0F4 45%,#F5EAD9 100%)",
  fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
};
const h1Style: React.CSSProperties = {
  fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
  fontSize: 30,
  lineHeight: 1.2,
  color: "#46293F",
  textAlign: "center",
  margin: 0,
};
const modalOverlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(51,29,46,.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 26,
  zIndex: 50,
};
const modalCard: React.CSSProperties = {
  background: "#fff",
  borderRadius: 18,
  padding: 24,
  width: "100%",
  maxWidth: 380,
  boxShadow: "0 20px 50px rgba(51,29,46,.35)",
};
const btnPrimary: React.CSSProperties = {
  flex: 1,
  padding: 14,
  border: "none",
  borderRadius: 99,
  background: "#46293F",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};
const btnSecondary: React.CSSProperties = {
  flex: 1,
  padding: 14,
  border: "none",
  borderRadius: 99,
  background: "#F3E3E9",
  color: "#46293F",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

export default Calculating;