
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Import components
import ResultsHeader from "@/components/results/ResultsHeader";
import SymptomValidation from "@/components/results/SymptomValidation";
import EmotionHormoneConnection from "@/components/results/EmotionHormoneConnection";
import HormoneAnalysis from "@/components/results/HormoneAnalysis";
import LabTestingSection from "@/components/results/LabTestingSection";
import FutureWithoutIntervention from "@/components/results/FutureWithoutIntervention";
import HormoneRebalancingJourney from "@/components/results/HormoneRebalancingJourney";
import BeginJourney from "@/components/results/BeginJourney";
import LoadingSpinner from "@/components/results/LoadingSpinner";

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reveal sections as user scrolls
    const revealSections = () => {
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll('.reveal-section');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('revealed');
        }
      });
    };

    // Retrieve results and user info from localStorage
    const storedResults = localStorage.getItem("quizResults");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no results, redirect to quiz
      navigate("/quiz");
    }
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Add scroll event listener for animations
    window.addEventListener('scroll', revealSections);
    // Trigger once on load
    setTimeout(revealSections, 300);

    return () => {
      window.removeEventListener('scroll', revealSections);
    };
  }, [navigate]);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  if (!results) {
    return <LoadingSpinner />;
  }
  
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#FFECD6]/30 to-white py-8 px-4 md:px-8"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%235D4154\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3C/svg%3E')",
        backgroundAttachment: "fixed"
      }}
      ref={mainContentRef}
    >
      <div className="max-w-4xl mx-auto">
        {/* Emotional Validation Header */}
        <ResultsHeader firstName={userInfo.firstName} />
        
        {/* "You're Not Alone" Symptom Validation */}
        <SymptomValidation symptoms={results.primarySymptoms} />
        
        {/* The Emotional Impact of Hormone Changes */}
        <EmotionHormoneConnection />
        
        {/* Comprehensive Hormone Analysis with Emotional Context */}
        <HormoneAnalysis 
          score={results.score} 
          phase={results.phase} 
          primarySymptoms={results.primarySymptoms}
        />
        
        {/* Lab Testing Section */}
        <LabTestingSection />
        
        {/* What Happens Next Without Intervention */}
        <FutureWithoutIntervention firstName={userInfo.firstName} />
        
        {/* Your Complete Hormone Rebalancing Journey */}
        <HormoneRebalancingJourney />
        
        {/* Begin Your Healing Journey */}
        <BeginJourney firstName={userInfo.firstName} />
        
        {/* Back to Quiz Button */}
        <div className="text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/quiz")}
            className="flex items-center gap-2 hover:bg-[#5D4154]/5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
