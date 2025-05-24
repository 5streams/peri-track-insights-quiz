
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

// Import TryPeriTrack components
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
import TrialSignupModal from "@/components/TrialSignupModal";
import StatsSection from "@/components/StatsSection";
import ComparisonSection from "@/components/ComparisonSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";

// Add global styles for TryPeriTrack components
const globalStyles = `
  /* Base styles */
  body {
    font-family: 'Raleway', sans-serif;
    color: #333;
    line-height: 1.6;
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
  .md\:px-6 { @media (min-width: 768px) { padding-left: 1.5rem; padding-right: 1.5rem; } }
  .lg\:px-8 { @media (min-width: 1024px) { padding-left: 2rem; padding-right: 2rem; } }
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
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Helper functions
  const getScoreCategory = React.useCallback((score: number) => {
    if (score <= 40) return "mild";
    if (score <= 70) return "moderate";
    return "severe";
  }, []);

  // Handlers
  const handleTrialCTA = React.useCallback(() => {
    localStorage.setItem("trialStartDate", new Date().toString());
  }, []);

  const handleOpenSignupModal = React.useCallback(() => {
    setIsSignupModalOpen(true);
  }, []);

  const handleCloseSignupModal = React.useCallback(() => {
    setIsSignupModalOpen(false);
  }, []);

  const handleCTAClick = React.useCallback((e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLElement;
    console.log('CTA clicked:', {
      button_location: button.closest('section')?.className || 'unknown',
      button_text: button.textContent?.trim(),
      lead_to: 'TrialSignupModal'
    });
  }, []);

  const handleHashNavigation = React.useCallback(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
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

    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal-section').forEach((el) => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
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

  // Scroll and animation effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((el) => observer.observe(el));

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, [handleHashNavigation]);

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

  const containerClass = isLoaded ? "results-container all-visible" : "results-container";

  // Show loading state
  if (!results) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Results Section */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className={containerClass}>
          {/* Results Header with Score and User Name - Force visibility */}
          <div className="revealed mb-12">
            <ResultsHeader 
              score={hormoneScores.overall} 
              firstName={capitalizedFirstName} 
              scoreCategory={scoreCategory}
              onStartTrial={handleOpenSignupModal}
            />
          </div>
          
          {/* Personalized Assessment - Force visibility */}
          <div className="revealed mb-12">
            <PersonalizedAssessment
              scoreCategory={scoreCategory}
              firstName={capitalizedFirstName}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>
          
          {/* Hormone Insights - Force visibility */}
          <div className="revealed mb-12">
            <HormoneInsights 
              scores={hormoneScores}
              scoreCategory={scoreCategory}
            />
          </div>
        </div>
      </div>

      {/* TryPeriTrack Content - Full Width Sections */}
      <div className="flex-grow w-full">
        {/* Hero Section - Full Width */}
        <div className="w-full">
          <HeroSection />
        </div>

        {/* Other Sections with Full Width Backgrounds */}
        <div className="w-full bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <StatsSection />
          </div>
        </div>

        <div className="w-full bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <ProblemSection />
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <SolutionSection />
          </div>
        </div>

        <div className="w-full bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <WhyChooseUsSection />
          </div>
        </div>

        <div id="features" className="w-full bg-white py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FeaturesSection />
          </div>
        </div>

        <div className="w-full bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <ComparisonSection />
          </div>
        </div>

        <div id="how-it-works" className="w-full bg-white py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <HowItWorksSection />
          </div>
        </div>

        <div className="w-full bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <LunaSection />
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <TestimonialCarousel />
          </div>
        </div>

        <div className="w-full bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <SocialProofSection />
          </div>
        </div>

        <div id="pricing" className="w-full bg-white py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <PricingSection />
          </div>
        </div>

        <div id="faq" className="w-full bg-gray-50 py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <FAQSection />
          </div>
        </div>

        <div className="w-full bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <FinalCTASection />
          </div>
        </div>

        <div className="w-full bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
            <TrustFooter />
          </div>
        </div>
        
        {/* Global Trial Signup Modal that can be triggered from anywhere */}
        <TrialSignupModal 
          isOpen={isSignupModalOpen}
          onClose={handleCloseSignupModal}
        />
      </div>
    </div>
  );
};

export default Results;
