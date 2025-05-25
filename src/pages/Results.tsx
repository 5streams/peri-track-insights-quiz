
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/results/LoadingSpinner";
import { calculateHormoneScores } from "@/utils/scoreCalculation";

// Import our components for the results page
import ResultsHeader from "@/components/results/ResultsHeader";
import PersonalizedAssessment from "@/components/results/PersonalizedAssessment";

// Add global styles for remaining components
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary: rgb(93 65 84 / var(--tw-text-opacity, 1));
    --warm-gray: #6B7280;
    --warm-gray-50: #F9FAFB;
  }
  /* Base styles */
  body {
    font-family: 'Raleway', sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  /* Color definitions */
  .text-primary { color: rgb(93 65 84 / var(--tw-text-opacity, 1)); }
  .text-warm-gray { color: #6B7280; }
  .bg-warm-gray-50 { background-color: #F9FAFB; }
  .from-\\[#f8f5ff\\] { --tw-gradient-from: #f8f5ff; --tw-gradient-to: rgba(248, 245, 255, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }

  /* Typography */
  .font-headline {
    font-family: 'Playfair Display', serif;
  }
  
  .font-sans {
    font-family: 'Raleway', sans-serif;
  }
  
  .text-body-regular {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .text-body-large {
    font-size: 1.125rem;
    line-height: 1.5;
  }
  
  /* Container */
  .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary {
    background-color: #8B5CF6;
    color: white;
    border: none;
  }

  .btn-primary:hover {
    background-color: #7C3AED;
    transform: translateY(-2px);
  }

  /* Sections */
  section {
    padding: 4rem 0;
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .text-purple-600 { color: #8B5CF6; }
  .bg-gray-50 { background-color: #F9FAFB; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .mb-8 { margin-bottom: 2rem; }
  .max-w-4xl { max-width: 56rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
  .rounded-xl { border-radius: 0.75rem; }
  .border-2 { border-width: 2px; }
  .border-white { border-color: white; }
  .inline-block { display: inline-block; }
  .leading-relaxed { line-height: 1.625; }
  .leading-tight { line-height: 1.25; }
  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }
  .text-sm { font-size: 0.875rem; }
  .text-lg { font-size: 1.125rem; }
  .text-3xl { font-size: 1.875rem; }
  .text-4xl { font-size: 2.25rem; }
  .text-5xl { font-size: 3rem; }
`;

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  // State management
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
  
  // Helper functions
  const getScoreCategory = React.useCallback((score: number) => {
    if (score <= 40) return "mild";
    if (score <= 70) return "moderate";
    return "severe";
  }, []);

  // Data loading effect
  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      const scores = calculateHormoneScores(parsedResults);
      setHormoneScores(scores);
    } else {
      navigate("/quiz");
    }
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    // Remove the delayed reveal and make everything visible immediately
    setIsLoaded(true);
  }, [navigate]);

  // Inject global styles
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.id = 'tryperitrack-styles';
    styleElement.textContent = globalStyles;
    
    // Add the style element to the head
    document.head.appendChild(styleElement);
    
    // Clean up the style element when the component unmounts
    return () => {
      const existingStyle = document.getElementById('tryperitrack-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  // Derived state
  const scoreCategory = React.useMemo(
    () => results ? getScoreCategory(hormoneScores.overall) : "mild",
    [results, hormoneScores.overall, getScoreCategory]
  );

  const capitalizedFirstName = React.useMemo(
    () => userInfo.firstName 
      ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)
      : "",
    [userInfo.firstName]
  );

  // Show loading state
  if (!results) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Results Section - More compact with reduced spacing */}
      <div className="w-full max-w-4xl mx-auto px-2 md:px-4 lg:px-6 pt-4">
        <div className="results-container all-visible">
          {/* Results Header with Score and User Name */}
          <div className="mb-4">
            <ResultsHeader 
              score={hormoneScores.overall} 
              firstName={capitalizedFirstName} 
              scoreCategory={scoreCategory}
              onStartTrial={() => {}}
            />
          </div>
          
          {/* Personalized Assessment */}
          <div className="mb-4">
            <PersonalizedAssessment
              scoreCategory={scoreCategory}
              firstName={capitalizedFirstName}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
