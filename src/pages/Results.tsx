import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrustFooter from "@/components/TrustFooter";
import { getQuizState, trackEvent } from "@/lib/quizState";
import couple1 from "@/assets/testimonial-couple-1.jpg";
import couple2 from "@/assets/testimonial-couple-2.jpg";
import couple3 from "@/assets/testimonial-couple-3.jpg";
import couple4 from "@/assets/testimonial-couple-4.jpg";
import couple5 from "@/assets/testimonial-couple-5.jpg";
import couple6 from "@/assets/testimonial-couple-6.jpg";

const BENEFITS = [
  "Your full symptom-by-symptom profile — all five systems scored and explained",
  "Your hormonal stage + #1 symptom driver, in plain English",
  "The 28-Day Reclamation Plan personalized to your heaviest system",
  "The 3 A.M. SOS Toolkit + relaxation audio library",
  "Daily symptom & protocol tracker — see what's actually working",
  "Labs Decoder + doctor-visit prep tools",
];

function GaugeSVG({ pct }: { pct: number }) {
  const clamped = Math.max(0, Math.min(100, pct));
  const angle = Math.PI * (1 - clamped / 100);
  const r = 78;
  const cx = 100;
  const cy = 95;
  const x = cx + r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);
  const large = clamped > 50 ? 1 : 0;
  return (
    <svg width="220" height="130" viewBox="0 0 200 118" role="img" aria-label={`Symptom load ${clamped} percent`}>
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A4688F" />
          <stop offset="1" stopColor="#C29455" />
        </linearGradient>
      </defs>
      <path d="M22 95 A78 78 0 0 1 178 95" fill="none" stroke="#F3E3E9" strokeWidth={14} strokeLinecap="round" />
      <path
        d={`M22 95 A78 78 0 ${large} 1 ${x.toFixed(1)} ${y.toFixed(1)}`}
        fill="none"
        stroke="url(#gg)"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <text x="100" y="82" textAnchor="middle" fontSize="34" fontFamily="Iowan Old Style,Palatino,Georgia,serif" fill="#46293F" fontWeight={600}>
        {clamped}
      </text>
      <text x="100" y="103" textAnchor="middle" fontSize="11" fill="#6E5665" letterSpacing="1">
        SYMPTOM LOAD
      </text>
    </svg>
  );
}

type OutcomeCard = { clusterKey: string; h: string; p: string };
const OUTCOME_CARDS: OutcomeCard[] = [
  {
    clusterKey: "sleep",
    h: "Sleep through the night again.",
    p: "The 2–4 a.m. wake-up isn't stress — and it isn't permanent. Week 1 is built around the sleep reset: the evening sequence, the blood-sugar fix, and the 3 A.M. Protocol for the nights your mind won't stop. Most members start here because when sleep comes back, everything else gets lighter.",
  },
  {
    clusterKey: "mood",
    h: "Feel like yourself again — not the version that snaps.",
    p: "The rage over small things. The guilt afterward. The low hum of dread with no reason. That's chemistry, not character — and it responds to the right plan. You'll learn exactly what's driving it, and get the daily 10-minute tools that bring your baseline back.",
  },
  {
    clusterKey: "self",
    h: "Want to want it again.",
    p: "If your desire quietly disappeared — or sex became uncomfortable in ways it never was — you are not broken, and it is not gone forever. Your plan explains the hormone story behind desire and comfort, what options exist (including the ones doctors rarely mention), and how to bring that part of yourself — and your relationship — back.",
  },
  {
    clusterKey: "body",
    h: "Understand why the weight moved to your middle — and what actually works now.",
    p: "The workouts and diets that always worked stopped working because your body changed the rules. The plan rebuilds your approach for a midlife metabolism: protein targets, blood-sugar stability, and strength work designed for your hormones — not a 25-year-old's.",
  },
  {
    clusterKey: "body",
    h: "Fewer flashes. Calmer nights.",
    p: "Map your triggers, use the in-the-moment tools, and learn the evidence-backed options for turning the heat down — plus exactly what to ask your doctor if you want more help.",
  },
  {
    clusterKey: "cycle",
    h: "Finally understand your pattern.",
    p: "Good weeks, then weeks where everything falls apart? That wave has a hormonal signature. See your own pattern mapped, know what's coming, and plan your life around your body instead of being ambushed by it.",
  },
];

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(() => getQuizState());
  const variant = state.quizVariant === "desire" ? "desire" : "symptoms";
  const isDesire = variant === "desire";

  useEffect(() => {
    if (!state.answers || !state.answers.length) {
      navigate("/quiz", { replace: true });
      return;
    }
    trackEvent("teaser_results_view");
  }, [state, navigate]);

  const handleUnlock = async () => {
    await trackEvent("unlock_clicked");
    navigate("/quiz-email");
  };

  const bandName = state.band?.name || "Perimenopause Pattern";
  const pct = state.pct ?? 0;
  const domLabel = state.dom?.label;
  const domKey = state.dom?.key;
  const orderedCards = React.useMemo(() => {
    if (isDesire) {
      // Force the "Want to want it again" card first (clusterKey "self"),
      // then the dominant-desire-cluster's closest reused card, then the rest.
      const desireCard = OUTCOME_CARDS.find((c) => c.clusterKey === "self");
      const rest = OUTCOME_CARDS.filter((c) => c !== desireCard);
      return desireCard ? [desireCard, ...rest] : OUTCOME_CARDS;
    }
    if (!domKey) return OUTCOME_CARDS;
    const first = OUTCOME_CARDS.filter((c) => c.clusterKey === domKey);
    const rest = OUTCOME_CARDS.filter((c) => c.clusterKey !== domKey);
    return [...first, ...rest];
  }, [domKey, isDesire]);
  const heaviestLabel = domLabel || (isDesire ? "your heaviest suppressor" : "your heaviest system");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#EFDFE7 0%,#F9F0F4 45%,#F5EAD9 100%)",
        fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
        color: "#46293F",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "30px 22px 60px" }}>
        <h1
          style={{
            fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
            fontSize: 34,
            lineHeight: 1.2,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {isDesire ? "Your Desire Profile" : "Your Perimenopause Assessment"}
        </h1>

        {isDesire && (
          <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.55, color: "#5c4553", margin: "-10px auto 18px", maxWidth: 560 }}>
            Your desire didn't disappear — it's being suppressed. The heaviest suppressor in your profile: <b>{domLabel || "your heaviest suppressor"}</b>.
          </p>
        )}

        {/* Gauge teaser — needle + band chip only */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "24px 18px", boxShadow: "0 10px 30px rgba(70,41,63,.10)", textAlign: "center" }}>
          <GaugeSVG pct={pct} />
          <div
            style={{
              display: "inline-block",
              marginTop: 8,
              background: "#F3E3E9",
              color: "#46293F",
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              padding: "7px 16px",
              borderRadius: 99,
            }}
          >
            {bandName}
          </div>

          {domLabel && !isDesire && (
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.5, color: "#5c4553", padding: "0 4px" }}>
              <b>Your heaviest system:</b> {domLabel}.
            </p>
          )}

          {/* Blurred locked preview so the user sees there's more behind the paywall */}
          <div style={{ position: "relative", marginTop: 22, borderRadius: 14, overflow: "hidden", border: "1.5px dashed #A4688F" }}>
            <div style={{ padding: 18, filter: "blur(5px)", userSelect: "none", pointerEvents: "none", textAlign: "left" }}>
              <div style={{ fontFamily: "'Iowan Old Style',Palatino,Georgia,serif", fontSize: 16, marginBottom: 8 }}>Your phase estimate + #1 driver</div>
              <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, marginBottom: 10 }} />
              <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, marginBottom: 10 }} />
              <div style={{ height: 9, background: "#F3E3E9", borderRadius: 99, marginBottom: 10 }} />
              <p style={{ fontSize: 13.5, color: "#6E5665" }}>Your five-system breakdown, phase estimate, and personalized plan…</p>
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(253,250,251,.35)" }}>
              <span style={{ background: "#46293F", color: "#fff", fontSize: 13, fontWeight: 700, padding: "10px 18px", borderRadius: 99 }}>
                Unlock full profile + plan
              </span>
            </div>
          </div>
        </div>

        {/* WHAT CHANGES — outcome cards, dominant cluster first & emphasized */}
        {isDesire ? (
          <DesireSalesSequence domLabel={domLabel || "your heaviest suppressor"} onUnlock={handleUnlock} />
        ) : (
        <div style={{ marginTop: 30 }}>
          <h2
            style={{
              fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
              fontSize: 26,
              lineHeight: 1.25,
              textAlign: "center",
              margin: "0 0 8px",
            }}
          >
            Here's what women use this plan to get back:
          </h2>
          <p style={{ textAlign: "center", fontSize: 16, lineHeight: 1.55, color: "#5c4553", margin: "0 auto 20px", maxWidth: 560 }}>
            Your plan starts with your heaviest system — <b>{heaviestLabel}</b> — because relief there makes everything else easier.
          </p>
          <div style={{ display: "grid", gap: 14 }}>
            {orderedCards.map((card, i) => {
              const emphasized = i === 0;
              return (
                <div
                  key={card.h}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: emphasized ? 24 : 20,
                    border: emphasized ? "2px solid #A4688F" : "1px solid #EFDFE7",
                    boxShadow: emphasized
                      ? "0 14px 34px rgba(70,41,63,.14)"
                      : "0 6px 18px rgba(70,41,63,.06)",
                    transform: emphasized ? "scale(1.01)" : "none",
                  }}
                >
                  {emphasized && (
                    <div
                      style={{
                        display: "inline-block",
                        background: "#46293F",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        borderRadius: 99,
                        marginBottom: 10,
                      }}
                    >
                      Start here
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
                      fontSize: emphasized ? 22 : 20,
                      lineHeight: 1.3,
                      color: "#46293F",
                      marginBottom: 8,
                    }}
                  >
                    {card.h}
                  </div>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#5c4553", margin: 0 }}>
                    {card.p}
                  </p>
                  <button
                    onClick={handleUnlock}
                    style={{
                      marginTop: 16,
                      width: "100%",
                      padding: "14px 18px",
                      border: "none",
                      borderRadius: 99,
                      background: "linear-gradient(135deg,#A4688F 0%,#C29455 100%)",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 800,
                      cursor: "pointer",
                      boxShadow: "0 6px 18px rgba(70,41,63,.16)",
                    }}
                  >
                    Unlock Full Results And Get Your Recovery Plan
                  </button>
                </div>
              );
            })}
          </div>

          {/* Future-pace */}
          <div
            style={{
              marginTop: 22,
              background: "linear-gradient(160deg,#FBF3F7 0%,#F5EAD9 100%)",
              borderRadius: 16,
              padding: 22,
              border: "1px solid #EFDFE7",
            }}
          >
            <div
              style={{
                fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
                fontSize: 20,
                marginBottom: 10,
                color: "#46293F",
              }}
            >
              28 days from now:
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#5c4553", margin: 0 }}>
              You wake up before your alarm — actually rested. Coffee is a pleasure, not a defibrillator. The 3 p.m. wall doesn't hit. Someone leaves dishes in the sink and it's just… dishes. You know which of your symptoms are hormonal, what your labs mean, and exactly what to say at your next doctor's appointment. And the woman in the mirror looks familiar again. That's what the next 28 days are for.
            </p>
          </div>
        </div>
        )}

        <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, textAlign: "center", color: "#5c4553" }}>
          Based on your responses, we've developed your personalized{" "}
          <b>28-Day Reclamation Plan</b>.
        </p>

        {/* Benefits */}
        <div
          style={{
            marginTop: 24,
            background: "#fff",
            borderRadius: 20,
            padding: 22,
            boxShadow: "0 10px 30px rgba(70,41,63,.08)",
          }}
        >
          <div
            style={{
              fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
              fontSize: 22,
              marginBottom: 16,
              lineHeight: 1.25,
            }}
          >
            What you will get with your customized plan
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {BENEFITS.map((b) => (
              <li
                key={b}
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "#5c4553",
                  paddingLeft: 30,
                  position: "relative",
                  marginBottom: 12,
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
                {b}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleUnlock}
          style={{
            width: "100%",
            marginTop: 28,
            padding: 20,
            border: "none",
            borderRadius: 99,
            background: "linear-gradient(135deg,#D4AF37 0%,#F4D03F 100%)",
            color: "#2C3E50",
            fontSize: 20,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(70,41,63,.18)",
          }}
        >
          Unlock my full results
        </button>

        <p style={{ fontSize: 12.5, color: "#8a7085", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Informational only — not medical advice or diagnosis.
        </p>

        {isDesire && <MoreStories />}

        <div style={{ marginTop: 40 }}>
          <TrustFooter />
        </div>
      </div>
    </div>
  );
};

export default Results;

const MORE_STORIES: { initials: string; name: string; quote: string }[] = [
  {
    initials: "A",
    name: "Allison & Mike K.",
    quote:
      "We were polite and kind to each other but the spark was completely gone. I missed wanting him but I didn't know how to get it back without forcing it. The program helped me understand what was actually going on. My drive came back stronger than before and now I'm constantly reaching for him. It feels exciting in a way it hasn't in a long time.",
  },
  {
    initials: "M",
    name: "Marisol & Carlos V.",
    quote:
      "The guilt was honestly the hardest part. I felt like I was letting him down even though I still loved him. Once I understood it wasn't just me being broken, everything started shifting. The desire came back and it's been stronger than I thought it would be. I'm initiating more and our connection feels really good again.",
  },
  {
    initials: "P",
    name: "Priya & Raj M.",
    quote:
      "I really thought my sex drive was just gone for good. I loved my husband but I never thought about being close to him anymore. After going through everything the wanting returned — and it came back stronger than it was even in my thirties. I'm flirting with him again and reaching for him all the time. He keeps laughing and saying he's not mad about it.",
  },
  {
    initials: "J",
    name: "Jenna & Tom S.",
    quote:
      "I used to plan my nights so I could avoid any chance of intimacy because I just didn't feel it. The guilt was awful. Once I started the program things slowly changed. Now I'm the one who reaches for him and it actually feels good again. We're laughing more and being close feels natural instead of like something I have to get through.",
  },
];

const MoreStories: React.FC = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <div style={{ marginTop: 26 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "14px 18px",
          border: "1.5px solid #A4688F",
          borderRadius: 99,
          background: "transparent",
          color: "#46293F",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: ".02em",
        }}
      >
        {open ? "Hide stories ↑" : "Read more stories ↓"}
      </button>
      {open && (
        <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
          {MORE_STORIES.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 22,
                boxShadow: "0 10px 30px rgba(70,41,63,.08)",
                border: "1px solid #EFDFE7",
              }}
            >
              <div style={{ color: "#C29455", letterSpacing: 3, fontSize: 15, marginBottom: 10 }}>★★★★★</div>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "#46293F", margin: "0 0 14px", fontStyle: "italic" }}>
                "{t.quote}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "linear-gradient(140deg,#46293F 0%,#A4688F 100%)",
                    color: "#F5EAD9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ fontWeight: 700, color: "#46293F", fontSize: 14 }}>— {t.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FASCINATIONS: string[] = [
  'The two kinds of desire — and why "waiting to be in the mood" quietly fails after 40 (this one reframe changes everything about how intimacy starts)',
  "The responsive-desire switch: how wanting can arrive AFTER you begin — without pressure, without forcing anything",
  "Why your body stopped responding to the same touch — and the 15-minute practice that begins retraining it",
  "The hormone connected to desire that most doctors never test — and the exact words to request it at your next appointment",
  "Why orgasms change in perimenopause — the physiology, and what helps bring sensation and intensity back",
  "Why 9 p.m. is the worst possible time — and the timing shift that reignites more couples than any technique",
  "The comfort problem almost every woman hides — and the options that make touch feel good again (most under $20; your clinician can confirm what fits you)",
  "What to tell him: the three-sentence script that turns his confusion and hurt into your strongest ally",
  "The anticipation loop — how desire is actually built in the hours BEFORE the bedroom, and how to switch it back on",
  "The energy sequence that stops the day from taking everything before evening — because exhaustion is desire's #1 killer",
  "The mirror practice for feeling at home in your body again — lights on",
];

const DesireSalesSequence: React.FC<{ domLabel: string; onUnlock: () => void }> = ({ domLabel, onUnlock }) => {
  const cardBase: React.CSSProperties = {
    background: "#fff",
    borderRadius: 16,
    padding: 22,
    boxShadow: "0 10px 30px rgba(70,41,63,.08)",
    border: "1px solid #EFDFE7",
  };
  const headSerif: React.CSSProperties = {
    fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
    color: "#46293F",
    lineHeight: 1.25,
  };
  return (
    <div style={{ marginTop: 30 }}>
      {/* 1a. The turn */}
      <div style={cardBase}>
        <h2 style={{ ...headSerif, fontSize: 26, margin: "0 0 12px" }}>Here's what nobody has told you:</h2>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#5c4553", margin: 0 }}>
          The wanting didn't die. It's buried — under hormones nobody tested, exhaustion nobody sees, and discomfort nobody talks about. Your profile shows exactly what buried it. The plan digs it out — in order, starting with <b>{domLabel}</b>.
        </p>
      </div>

      {/* Testimonials */}
      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        {[
          {
            photo: couple1,
            name: "Dana & Greg R.",
            quote:
              "I felt so guilty for so long. I loved my husband but just didn't want him anymore and I couldn't figure out why. After going through the program the wanting slowly came back, and then it got really strong. Now I'm the one reaching for him and I honestly can't keep my hands off him most nights. It feels like something woke up in me.",
          },
          {
            photo: couple2,
            name: "Christine & Brian H.",
            quote:
              "Perimenopause made everything feel off. I had zero interest and I was starting to think maybe this was just how it was going to be. Working through the protocol changed that. My desire came back stronger than I expected. I'm initiating way more than I used to and my husband keeps saying he's not complaining but he's definitely surprised. Our marriage feels alive again.",
          },
        ].map((t) => (
          <div key={t.name} style={{ ...cardBase }}>
            <div style={{ color: "#C29455", letterSpacing: 3, fontSize: 15, marginBottom: 10 }}>★★★★★</div>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "#46293F", margin: "0 0 14px", fontStyle: "italic" }}>
              "{t.quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img
                src={t.photo}
                alt={t.name}
                loading="lazy"
                width={52}
                height={52}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #EFDFE7",
                  flexShrink: 0,
                }}
              />
              <div style={{ fontWeight: 700, color: "#46293F", fontSize: 14 }}>— {t.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 1b. Fascinations */}
      <div style={{ ...cardBase, marginTop: 18 }}>
        <h3 style={{ ...headSerif, fontSize: 22, margin: "0 0 14px" }}>
          Inside your plan — what you'll know and use in the first weeks:
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {FASCINATIONS.map((f, i) => (
            <li
              key={i}
              style={{
                fontSize: 15.5,
                lineHeight: 1.6,
                color: "#5c4553",
                paddingLeft: 28,
                position: "relative",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 8,
                  width: 10,
                  height: 10,
                  borderRadius: 99,
                  background: "linear-gradient(135deg,#A4688F 0%,#C29455 100%)",
                }}
              />
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={onUnlock}
          style={{
            marginTop: 18,
            width: "100%",
            padding: "14px 18px",
            border: "none",
            borderRadius: 99,
            background: "linear-gradient(135deg,#A4688F 0%,#C29455 100%)",
            color: "#fff",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(70,41,63,.16)",
          }}
        >
          Unlock Full Results And Get Your Recovery Plan
        </button>
      </div>

      {/* 1c. Stakes */}
      <div
        style={{
          marginTop: 18,
          background: "linear-gradient(160deg,#46293F 0%,#6B3F5C 100%)",
          borderRadius: 16,
          padding: 24,
          color: "#F5EAD9",
        }}
      >
        <h3 style={{ fontFamily: "'Iowan Old Style',Palatino,Georgia,serif", fontSize: 24, margin: "0 0 12px", lineHeight: 1.25 }}>
          This was never just about sex.
        </h3>
        <p style={{ fontSize: 16.5, lineHeight: 1.65, margin: 0, color: "#F3E3E9" }}>
          It's about the distance at the dinner table. The guilt when you turn away. The question you ask the mirror. Women don't do this plan for the bedroom — they do it to get THEMSELVES back. The bedroom follows.
        </p>
      </div>

      {/* 1d. Future-pace */}
      <div
        style={{
          marginTop: 18,
          background: "linear-gradient(160deg,#FBF3F7 0%,#F5EAD9 100%)",
          borderRadius: 16,
          padding: 22,
          border: "1px solid #EFDFE7",
        }}
      >
        <div style={{ ...headSerif, fontSize: 22, marginBottom: 10 }}>A few weeks from now:</div>
        <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "#5c4553", margin: 0 }}>
          You catch yourself thinking about him at three in the afternoon — and it surprises you. You reach for his hand first. Bedtime stops being something you time your way around. You feel it building hours before, the way it used to — because you finally know how it works now, in this body. And when he looks at you confused about what changed, you get to smile, because you know.
        </p>
      </div>

      {/* 1e. Testimonials — intentionally not rendered until released rows exist */}
    </div>
  );
};