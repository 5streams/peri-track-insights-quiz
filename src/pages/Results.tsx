
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
import ResultsSummary from "@/components/results/ResultsSummary";

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
  const [loading, setLoading] = useState(true);
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
      return;
    }
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Set loading to false once data is loaded
    setLoading(false);
  }, [navigate]);
  
  if (loading || !results) {
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
    : "Julie"; // Default name if none found
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5FF]/20 to-white py-6 md:py-8 px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="results-container">
          {/* Results Header with Score and User Name */}
          <div className="mb-8">
            <ResultsHeader 
              score={hormoneScores.overall} 
              firstName={capitalizedFirstName} 
              scoreCategory={scoreCategory}
              onStartTrial={handleTrialCTA}
            />
            
            {/* Results Summary Component with Hormone Visualization */}
            <ResultsSummary
              score={hormoneScores.overall}
              scoreCategory={scoreCategory}
              primaryHormone={hormoneScores.primaryHormone}
              secondaryHormones={["estrogen", "testosterone"].filter(h => h !== hormoneScores.primaryHormone)}
              symptoms={hormoneScores.primarySymptoms}
            />
          </div>
          
          {/* Personalized Assessment */}
          <div className="mb-8">
            <PersonalizedAssessment
              scoreCategory={scoreCategory}
              firstName={capitalizedFirstName}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>
          
          {/* Perimenopause Explanation */}
          <div className="mb-8">
            <PerimenopauseExplanation scoreCategory={scoreCategory} />
          </div>
          
          {/* Hormone Insights */}
          <div className="mb-8">
            <HormoneInsights 
              scores={hormoneScores}
              scoreCategory={scoreCategory}
            />
          </div>
          
          {/* Emotional Support */}
          <div className="mb-8">
            <EmotionalSupport
              scoreCategory={scoreCategory}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>
          
          {/* Use the subscription options component */}
          <div className="mb-8">
            <SubscriptionOptions
              onStartTrial={handleTrialCTA}
            />
          </div>
          
          {/* Back to Quiz Button */}
          <div className="text-center mb-8 mt-10">
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
    </div>
  );
};

export default Results;
