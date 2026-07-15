import React from "react";
import { Link } from "react-router-dom";

const linkStyle: React.CSSProperties = {
  color: "#6E5665",
  textDecoration: "none",
  fontSize: 13,
};

const MiniLegalFooter: React.FC = () => (
  <footer
    style={{
      marginTop: 48,
      padding: "20px 16px",
      textAlign: "center",
      fontFamily: "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
      color: "#6E5665",
      fontSize: 12.5,
      borderTop: "1px solid rgba(70,41,63,.08)",
    }}
  >
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 8 }}>
      <Link to="/privacy" style={linkStyle}>Privacy</Link>
      <Link to="/terms" style={linkStyle}>Terms</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
      <Link to="/medical-disclaimer" style={linkStyle}>Medical Disclaimer</Link>
    </div>
    <div>© PeriTrack · This assessment is for informational purposes only and is not medical advice.</div>
  </footer>
);

export default MiniLegalFooter;