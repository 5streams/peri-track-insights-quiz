
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";
import TryPeriTrack from "./pages/tryperitrack";
import AdminLeads from "./pages/AdminLeads"; // Add this new import
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/admin/leads" element={<AdminLeads />} />
        <Route path="/tryperitracker" element={<TryPeritracker />} /> {/* Add new route */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/tryperitrack" element={<TryPeriTrack />} />
      </Routes>
    </Router>
  );
}

export default App;
