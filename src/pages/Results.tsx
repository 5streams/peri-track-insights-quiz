
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

// Import ALL components from the tryperitrack page
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import LunaSection from "@/components/LunaSection";
import SocialProofSection from "@/components/SocialProofSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import TrustFooter from "@/components/TrustFooter";
import ComparisonSection from "@/components/ComparisonSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";

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

    setIsLoaded(true);
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
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5FF]/20 to-white">
      {/* RESULTS SECTION - Your Personal Assessment */}
      <div className="w-full max-w-4xl mx-auto py-6 md:py-8 px-4 md:px-6 lg:px-8">
        {/* Results Header with Score and User Name */}
        <div className="mb-6">
          <ResultsHeader 
            score={hormoneScores.overall} 
            firstName={capitalizedFirstName} 
            scoreCategory={scoreCategory}
            onStartTrial={handleTrialCTA}
          />
        </div>
        
        {/* Personalized Assessment */}
        <div className="mb-6">
          <PersonalizedAssessment
            scoreCategory={scoreCategory}
            firstName={capitalizedFirstName}
            primarySymptoms={hormoneScores.primarySymptoms}
          />
        </div>
        
        {/* Hormone Insights */}
        <div className="mb-8">
          <HormoneInsights 
            scores={hormoneScores}
            scoreCategory={scoreCategory}
          />
        </div>
      </div>

      {/* SEPARATOR - Visual break between assessment and product info */}
      <div className="w-full bg-primary/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Now that you understand your symptoms...
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Discover how PeriTrack can help you manage and predict your perimenopause journey
          </p>
        </div>
      </div>

      {/* FULL TRYPERITRACK PAGE CONTENT */}
      <div className="w-full">
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <SolutionSection />
        <WhyChooseUsSection />
        <FeaturesSection />
        <ComparisonSection />
        <HowItWorksSection />
        <LunaSection />
        <TestimonialCarousel />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
        <TrustFooter />
      </div>
    </div>
  );
};

export default Results;
