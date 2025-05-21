
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/results/LoadingSpinner";
import { calculateHormoneScores } from "@/utils/scoreCalculation";

// Import our components for the results page
import ResultsHeader from "@/components/results/ResultsHeader";
import PersonalizedAssessment from "@/components/results/PersonalizedAssessment";
import HormoneInsights from "@/components/results/HormoneInsights";
import PerimenopauseExplanation from "@/components/results/PerimenopauseExplanation";
import EmotionalSupport from "@/components/results/EmotionalSupport";
import SubscriptionOptions from "@/components/results/SubscriptionOptions";
import PeritrackIntro from "@/components/results/PeritrackIntro";
import LunaAIFeature from "@/components/results/LunaAIFeature";

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const [hormoneScores, setHormoneScores] = useState({
    overall: 0,
    estrogen: 0,
    progesterone: 0,
    testosterone: 0,
    primaryHormone: "estrogen",
    primarySymptoms: [] as string[]
  });
  const navigate = useNavigate();
  
  // Get score category
  const getScoreCategory = (score: number) => {
    if (score <= 40) return "mild";
    if (score <= 70) return "moderate";
    return "severe";
  };
  
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
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      
      // Calculate hormone scores based on quiz responses
      const scores = calculateHormoneScores(parsedResults);
      setHormoneScores(scores);
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
  
  if (!results) {
    return <LoadingSpinner />;
  }

  const scoreCategory = getScoreCategory(hormoneScores.overall);
  
  // Start trial function - modified to not navigate automatically
  const handleTrialCTA = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // We'll handle navigation in the LeadCaptureModal if needed
  };
  
  // Ensure firstName is capitalized
  const capitalizedFirstName = userInfo.firstName 
    ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)
    : "";
  
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#F9F5FF]/20 to-white py-6 md:py-8 px-4 md:px-6 lg:px-8"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%235D4154\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3C/svg%3E')",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="results-container">
          {/* Results Header with Score and User Name */}
          <ResultsHeader 
            score={hormoneScores.overall} 
            firstName={capitalizedFirstName} 
            scoreCategory={scoreCategory}
            onStartTrial={handleTrialCTA}
          />
          
          {/* Personalized Assessment */}
          <PersonalizedAssessment
            scoreCategory={scoreCategory}
            firstName={capitalizedFirstName}
            primarySymptoms={hormoneScores.primarySymptoms}
          />
          
          {/* Perimenopause Explanation */}
          <PerimenopauseExplanation scoreCategory={scoreCategory} />
          
          {/* Hormone Insights */}
          <HormoneInsights 
            scores={hormoneScores}
            scoreCategory={scoreCategory}
          />
          
          {/* Emotional Support */}
          <EmotionalSupport
            scoreCategory={scoreCategory}
            primarySymptoms={hormoneScores.primarySymptoms}
          />
          
          {/* Peritrack Intro - Main call to action */}
          <PeritrackIntro
            onStartTrial={handleTrialCTA}
            firstName={capitalizedFirstName}
          />
          
          {/* Luna AI Feature - Only showing once as part of PeritrackIntro */}
          
          {/* Back to Quiz Button */}
          <div className="text-center mb-12 mt-10">
            <Button 
              variant="outline" 
              onClick={() => navigate("/quiz")}
              className="flex items-center gap-2 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Retake Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
