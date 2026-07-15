import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { getQuizState, setQuizState, trackEvent } from "@/lib/quizState";

const QuizEmail: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [variant, setVariant] = useState<"symptoms" | "desire">("symptoms");

  useEffect(() => {
    const s = getQuizState();
    if (!s.answers || !s.answers.length) {
      navigate("/quiz", { replace: true });
      return;
    }
    if (s.email) setEmail(s.email);
    if (s.quizVariant === "desire") setVariant("desire");
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
      setErr("Enter a valid email to see your results.");
      return;
    }
    setBusy(true);
    setQuizState({ email: v });
    await trackEvent("email", { email: v });
    await trackEvent("email_submitted");
    navigate("/trial-price");
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: 440, margin: "0 auto", padding: "60px 24px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div
            style={{
              width: 62,
              height: 62,
              margin: "0 auto",
              borderRadius: "50%",
              background: "linear-gradient(140deg,#46293F 0%,#6B3F5C 60%,#A4688F 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#EBD9BC",
              fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
              fontSize: 26,
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(70,41,63,.22)",
            }}
          >
            BHA
          </div>
        </div>

        <h1
          style={{
            fontFamily: "'Iowan Old Style',Palatino,Georgia,serif",
            fontSize: 30,
            lineHeight: 1.2,
            color: "#46293F",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {variant === "desire" ? "Your Desire Profile is ready." : "Where should we send your full Perimenopause Profile?"}
        </h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "#5c4553", textAlign: "center", margin: "0 0 22px" }}>
            {variant === "desire"
              ? "Your full profile — your #1 suppressor, your hormonal stage, and the first practice from your plan — sent to your inbox."
              : "Your complete breakdown — all five systems, your stage, and your #1 driver — plus your personalized next steps."}
        </p>

        <form onSubmit={submit}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr("");
            }}
            placeholder="Your best email"
            autoComplete="email"
            required
            style={{
              width: "100%",
              padding: "17px 18px",
              borderRadius: 18,
              border: "1.5px solid #F3E3E9",
              fontSize: 16,
              color: "#46293F",
              background: "#fff",
              outline: err ? "2px solid #B04A4A" : "none",
              boxSizing: "border-box",
            }}
          />
          {err && <div style={{ color: "#B04A4A", fontSize: 13, marginTop: 6 }}>{err}</div>}

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              background: "#F9F0F4",
              border: "1.5px solid #F3E3E9",
              borderRadius: 14,
              padding: "14px 16px",
              marginTop: 18,
              color: "#6E5665",
              fontSize: 13.5,
              lineHeight: 1.55,
            }}
          >
            <Lock size={18} color="#7E9B84" style={{ flexShrink: 0, marginTop: 1 }} />
            <span>
              Your information is 100% secure with us, and we promise not to use it for spamming purposes.
            </span>
          </div>

          <button
            type="submit"
            disabled={busy}
            style={{
              width: "100%",
              padding: 18,
              border: "none",
              borderRadius: 99,
              background: "#46293F",
              color: "#fff",
              fontSize: 17,
              fontWeight: 700,
              cursor: busy ? "wait" : "pointer",
              marginTop: 26,
              boxShadow: "0 10px 30px rgba(70,41,63,.18)",
            }}
          >
            {busy ? "Loading…" : "Explore results"}
          </button>
        </form>
      </div>
    </div>
  );
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(160deg,#EFDFE7 0%,#F9F0F4 45%,#F5EAD9 100%)",
  fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
};

export default QuizEmail;