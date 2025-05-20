
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
