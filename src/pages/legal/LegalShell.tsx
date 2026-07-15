import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

interface Props {
  title: string;
  description: string;
  heading: string;
  children: React.ReactNode;
}

const LegalShell: React.FC<Props> = ({ title, description, heading, children }) => {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
  }, [title, description]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg,#F9F0F4 0%,#FDFAFB 60%,#F5EAD9 100%)",
        fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
        color: "#46293F",
        padding: "48px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <Link
          to="/"
          style={{ color: "#A4688F", textDecoration: "none", fontWeight: 600, fontSize: 14 }}
        >
          ← Back to PeriTrack
        </Link>
        <h1
          style={{
            fontFamily: "'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif",
            fontSize: 40,
            lineHeight: 1.15,
            margin: "20px 0 28px",
            fontWeight: 600,
          }}
        >
          {heading}
        </h1>
        <div
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: "#3B2334",
          }}
          className="legal-body"
        >
          {children}
        </div>
        <hr style={{ margin: "48px 0 24px", border: "none", borderTop: "1px solid #EBD9BC" }} />
        <footer style={{ fontSize: 14, color: "#6E5665", display: "flex", flexWrap: "wrap", gap: 16 }}>
          <Link to="/privacy" style={{ color: "#6E5665" }}>Privacy</Link>
          <Link to="/terms" style={{ color: "#6E5665" }}>Terms</Link>
          <Link to="/contact" style={{ color: "#6E5665" }}>Contact</Link>
          <Link to="/medical-disclaimer" style={{ color: "#6E5665" }}>Medical Disclaimer</Link>
          <span style={{ marginLeft: "auto" }}>© PeriTrack</span>
        </footer>
      </div>
      <style>{`
        .legal-body h2 { font-family:'Iowan Old Style',Palatino,Georgia,serif; font-size:24px; margin:32px 0 12px; font-weight:600; }
        .legal-body h3 { font-size:18px; margin:24px 0 8px; font-weight:700; }
        .legal-body p  { margin:0 0 14px; }
        .legal-body ul { margin:0 0 14px 22px; }
        .legal-body li { margin-bottom:6px; }
        .legal-body a  { color:#A4688F; }
        .legal-body .placeholder { background:#F3E3E9; padding:2px 6px; border-radius:4px; font-weight:600; }
      `}</style>
    </div>
  );
};

export default LegalShell;