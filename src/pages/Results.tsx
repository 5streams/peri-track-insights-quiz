
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
import ResultsStatsSection from "@/components/results/ResultsStatsSection";
import ResultsProblemSection from "@/components/results/ResultsProblemSection";
import ResultsSolutionSection from "@/components/results/ResultsSolutionSection";
import ResultsComparisonSection from "@/components/results/ResultsComparisonSection";
import ResultsTestimonialSection from "@/components/results/ResultsTestimonialSection";
import PerimenopauseExplanation from "@/components/results/PerimenopauseExplanation";
import PeritrackIntro from "@/components/results/PeritrackIntro";
import LunaAIFeature from "@/components/results/LunaAIFeature";
import SimplePricingSection from "@/components/results/SimplePricingSection";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Get score category
  const getScoreCategory = (score: number) => {
    if (score <= 40) return "mild";
    if (score <= 70) return "moderate";
    return "severe";
  };
  
  useEffect(() => {
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

    // Force all sections to be revealed if they don't animate properly
    setTimeout(() => {
      document.querySelectorAll('.reveal-section').forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
      setIsLoaded(true);
    }, 300);
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
  
  // Add a class to ensure all elements are visible even if animations fail
  const containerClass = isLoaded ? "results-container all-visible" : "results-container";
  
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#F9F5FF]/20 to-white py-6 md:py-8 px-4 md:px-6 lg:px-8"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%235D4154\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3C/svg%3E')",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className={containerClass}>
          {/* Results Header with Score and User Name - Force visibility */}
          <div className="revealed mb-6">
            <ResultsHeader 
              score={hormoneScores.overall} 
              firstName={capitalizedFirstName} 
              scoreCategory={scoreCategory}
              onStartTrial={handleTrialCTA}
            />
          </div>
          
          {/* Personalized Assessment - Force visibility */}
          <div className="revealed mb-6">
            <PersonalizedAssessment
              scoreCategory={scoreCategory}
              firstName={capitalizedFirstName}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>
          
          {/* Hormone Insights - Force visibility */}
          <div className="revealed mb-6">
            <HormoneInsights 
              scores={hormoneScores}
              scoreCategory={scoreCategory}
            />
          </div>
          
          {/* NEW SECTIONS FROM TRYPERITRACK - Added after hormone insights */}
          
          {/* Stats Section */}
          <div className="revealed mb-6">
            <ResultsStatsSection />
          </div>
          
          {/* Problem Section */}
          <div className="revealed mb-6">
            <ResultsProblemSection />
          </div>
          
          {/* Solution Section */}
          <div className="revealed mb-6">
            <ResultsSolutionSection />
          </div>
          
          {/* Comparison Section */}
          <div className="revealed mb-6">
            <ResultsComparisonSection />
          </div>
          
          {/* Testimonial Section */}
          <div className="revealed mb-6">
            <ResultsTestimonialSection />
          </div>
          
          {/* END NEW SECTIONS */}
          
          {/* Peritrack Intro - Main call to action - Force visibility */}
          <div className="revealed mb-6">
            <PeritrackIntro
              onStartTrial={handleTrialCTA}
              firstName={capitalizedFirstName}
            />
          </div>
          
          {/* Luna AI Feature with smoother transition */}
          <div className="revealed mb-6">
            <LunaAIFeature onStartTrial={handleTrialCTA} />
          </div>
          
          {/* Simple Pricing Section at the very bottom */}
          <div className="revealed mb-6">
            <SimplePricingSection onStartTrial={handleTrialCTA} />
          </div>
          
          {/* Perimenopause Explanation */}
          <div className="revealed mb-6">
            <PerimenopauseExplanation scoreCategory={scoreCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
