import React, { useEffect, useState } from "react";
import Lander from "./Lander";

// Paid traffic (Google Ads etc.) skips the sales page and goes straight to
// the quiz so we actually capture answers. Organic visitors still see home.
const Index: React.FC = () => {
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isPaid =
        params.has("gclid") ||
        params.has("gbraid") ||
        params.has("wbraid") ||
        params.has("fbclid") ||
        params.has("msclkid") ||
        !!params.get("utm_source") ||
        params.get("utm_medium") === "paid" ||
        params.get("utm_medium") === "cpc";
      if (isPaid) {
        setRedirecting(true);
        window.location.replace("/quiz" + window.location.search);
      }
    } catch {
      // ignore
    }
  }, []);

  if (redirecting) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(160deg,#EFDFE7 0%,#F9F0F4 45%,#F5EAD9 100%)",
          fontFamily:
            "'Karla','Avenir Next','Segoe UI',system-ui,sans-serif",
          color: "#46293F",
          fontSize: 16,
        }}
      >
        Loading your assessment…
      </div>
    );
  }

  return (
    <Lander
      metaTitle="Perimenopause Symptoms Tracker — Understand & Manage Your Hormonal Health | PeriTrack"
      metaDescription="Track and understand your perimenopause symptoms with AI-powered insights. Personalized relief strategies for hot flashes, sleep, mood, and more."
    />
  );
};

export default Index;