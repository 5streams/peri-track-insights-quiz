
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import AdminLeads from "./pages/AdminLeads";
import LeadCaptureModal from "./components/leads/LeadCaptureModal";
import { useLeadCapture } from "./hooks/use-lead-capture";
import "./App.css";

// Wrap the app with LeadCaptureProvider
const AppWithLeadCapture = () => {
  const { 
    isModalOpen, 
    closeLeadModal, 
    selectedPlan, 
    captureSource, 
    quizData
  } = useLeadCapture();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      
      {/* Global Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={closeLeadModal}
        pricingPlan={selectedPlan}
        source={captureSource}
        quizResults={quizData}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWithLeadCapture />
    </Router>
  );
}

export default App;
