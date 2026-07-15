
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Calculating from "./pages/Calculating";
import QuizEmail from "./pages/QuizEmail";
import TrialPrice from "./pages/TrialPrice";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import TryPage from "./pages/try";
import PerimenopauseWeightGainTracker from "./pages/PerimenopauseWeightGainTracker";
import PerimenopauseInsomnia from "./pages/PerimenopauseInsomnia";
import AdminLeads from "./pages/AdminLeads";
import Admin4 from "./pages/Admin4";
import UpsellPage from "./pages/UpsellPage";
import ConfirmPage from "./pages/ConfirmPage";
import AccountPage from "./pages/AccountPage";
import PerimenopauseTest from "./pages/landers/PerimenopauseTest";
import PerimenopauseQuiz from "./pages/landers/PerimenopauseQuiz";
import PerimenopauseSymptoms from "./pages/landers/PerimenopauseSymptoms";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Contact from "./pages/legal/Contact";
import MedicalDisclaimer from "./pages/legal/MedicalDisclaimer";
import "./App.css";

const SUPABASE_URL = "https://bjwrfmoivnttemjydvyz.supabase.co";

function getSessionId(): string {
  try {
    let sid = localStorage.getItem("mm_session_id");
    if (!sid) {
      sid = (crypto.randomUUID?.() ?? String(Date.now()) + Math.random().toString(36).slice(2));
      localStorage.setItem("mm_session_id", sid);
    }
    return sid;
  } catch {
    return String(Date.now());
  }
}

function TrafficTracker() {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/admin")) return;
    try {
      if (sessionStorage.getItem("mm_landing_tracked") === "1") return;
      const params = new URLSearchParams(location.search);
      fetch(`${SUPABASE_URL}/functions/v1/track-event`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: getSessionId(),
          event: "landing",
          traffic_source: params.get("utm_source") || null,
          utm_medium: params.get("utm_medium") || null,
          utm_campaign: params.get("utm_campaign") || null,
          utm_content: params.get("utm_content") || null,
          utm_term: params.get("utm_term") || null,
          gclid: params.get("gclid") || null,
          referrer: document.referrer || null,
          landing_page: path + location.search,
        }),
      }).catch(() => {});
      sessionStorage.setItem("mm_landing_tracked", "1");
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

function AdminNoIndex() {
  const location = useLocation();
  useEffect(() => {
    const isAdmin = location.pathname.startsWith("/admin");
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"][data-admin="1"]');
    if (isAdmin) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "robots");
        meta.setAttribute("data-admin", "1");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", "noindex, nofollow");
    } else if (meta) {
      meta.remove();
    }
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <TrafficTracker />
      <AdminNoIndex />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/perimenopause-test" element={<PerimenopauseTest />} />
        <Route path="/perimenopause-quiz" element={<PerimenopauseQuiz />} />
        <Route path="/perimenopause-symptoms" element={<PerimenopauseSymptoms />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/calculating" element={<Calculating />} />
        <Route path="/quiz-email" element={<QuizEmail />} />
        <Route path="/trial-price" element={<TrialPrice />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/admin4" element={<Admin4 />} />
        <Route path="/try" element={<TryPage />} />
        <Route path="/try-tracker" element={<TryPage />} /> {/* Add redirect for alternate URL */}
        <Route path="/perimenopause-weight-gain-tracker" element={<PerimenopauseWeightGainTracker />} />
        <Route path="/perimenopause-insomnia" element={<PerimenopauseInsomnia />} />
        <Route path="/paywall" element={<Navigate to="/trial-price" replace />} />
        <Route path="/upsell" element={<UpsellPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/medical-disclaimer" element={<MedicalDisclaimer />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
