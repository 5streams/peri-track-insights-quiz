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
  .from-\[#f8f5ff\] { --tw-gradient-from: #f8f5ff; --tw-gradient-to: rgba(248, 245, 255, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }

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
  
  /* Grid and Flex utilities */
  .grid { display: grid; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .gap-6 { gap: 1.5rem; }
  .min-h-\[60vh\] { min-height: 60vh; }
  .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
  .to-white { --tw-gradient-to: #ffffff; }
  .bg-white { background-color: #ffffff; }
  .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .rounded-full { border-radius: 9999px; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-5 { margin-bottom: 1.25rem; }
  .p-3 { padding: 0.75rem; }
  .-space-x-2 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(-0.5rem * var(--tw-space-x-reverse)); margin-left: calc(-0.5rem * calc(1 - var(--tw-space-x-reverse))); }
  .mr-3 { margin-right: 0.75rem; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .border-2 { border-width: 2px; }
  .border-white { border-color: white; }
  
  /* Modal styles */
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .bg-black { background-color: #000; }
  .bg-opacity-50 { --tw-bg-opacity: 0.5; }
  .z-50 { z-index: 50; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .p-4 { padding: 1rem; }
  .relative { position: relative; }
  .bg-white { background-color: #fff; }
  .rounded-lg { border-radius: 0.5rem; }
  .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  .max-w-md { max-width: 28rem; }
  .w-full { width: 100%; }
  .p-6 { padding: 1.5rem; }
  .text-2xl { font-size: 1.5rem; }
  .font-bold { font-weight: 700; }
  .mb-4 { margin-bottom: 1rem; }
  .text-gray-700 { color: #4B5563; }
  .mb-6 { margin-bottom: 1.5rem; }
  .space-y-4 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(1rem * var(--tw-space-y-reverse)); }
  .w-full { width: 100%; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .border { border-width: 1px; }
  .border-gray-300 { --tw-border-opacity: 1; border-color: rgb(209 213 219 / var(--tw-border-opacity)); }
  .rounded { border-radius: 0.25rem; }
  .mt-4 { margin-top: 1rem; }
  .text-center { text-align: center; }
  .text-sm { font-size: 0.875rem; }
  .text-gray-500 { color: #6B7280; }
  .mt-2 { margin-top: 0.5rem; }
  .text-indigo-600 { color: #4F46E5; }
  .hover\:text-indigo-500:hover { color: #6366F1; }
  .focus\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
  .focus\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
  .focus\:ring-indigo-500:focus { --tw-ring-opacity: 1; --tw-ring-color: rgb(99 102 241 / var(--tw-ring-opacity)); }
  .focus\:ring-offset-2:focus { --tw-ring-offset-width: 2px; }
  .sm\:flex { display: flex; }
  .sm\:items-start { align-items: flex-start; }
  .sm\:justify-between { justify-content: space-between; }
  .sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0px * var(--tw-space-y-reverse)); }
  .sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(1rem * var(--tw-space-x-reverse)); margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse))); }
  .sm\:text-left { text-align: left; }
  .sm\:text-sm { font-size: 0.875rem; }
  
  /* Responsive utilities */
  @media (min-width: 768px) {
    .md\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  }
  
  @media (min-width: 1024px) {
    .lg\:px-8 { padding-left: 2rem; padding-right: 2rem; }
    .lg\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .lg\:text-4xl { font-size: 2.25rem; }
  }
  
  @media (min-width: 1280px) {
    .xl\:text-5xl { font-size: 3rem; }
  }
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
      {/* Results Section - Keep constrained */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="results-container all-visible">
          {/* Results Header with Score and User Name */}
          <div className="mb-12">
            <ResultsHeader 
              score={hormoneScores.overall} 
              firstName={capitalizedFirstName} 
              scoreCategory={scoreCategory}
              onStartTrial={handleOpenSignupModal}
            />
          </div>
          
          {/* Personalized Assessment */}
          <div className="mb-12">
            <PersonalizedAssessment
              scoreCategory={scoreCategory}
              firstName={capitalizedFirstName}
              primarySymptoms={hormoneScores.primarySymptoms}
            />
          </div>
          
          {/* Hormone Insights */}
          <div className="mb-12">
            <HormoneInsights 
              scores={hormoneScores}
              scoreCategory={scoreCategory}
            />
          </div>
        </div>
      </div>

      {/* TryPeriTrack Content - Full Width Sections */}
      <div className="flex-grow w-full">
        <HeroSection />

        <div className="w-full bg-white">
          <StatsSection />
        </div>

        <div className="w-full bg-gray-50">
          <ProblemSection />
        </div>

        <div className="w-full bg-white">
          <SolutionSection />
        </div>

        <div className="w-full bg-gray-50">
          <WhyChooseUsSection />
        </div>

        <div id="features" className="w-full bg-white py-12">
          <FeaturesSection />
        </div>

        <div className="w-full bg-gray-50">
          <ComparisonSection />
        </div>

        <div id="how-it-works" className="w-full bg-white py-12">
          <HowItWorksSection />
        </div>

        <div className="w-full bg-gray-50">
          <LunaSection />
        </div>

        <div className="w-full bg-white">
          <TestimonialCarousel />
        </div>

        <div className="w-full bg-gray-50">
          <SocialProofSection />
        </div>

        <div id="pricing" className="w-full bg-white py-12">
          <PricingSection />
        </div>

        <div id="faq" className="w-full bg-gray-50 py-12">
          <FAQSection />
        </div>

        <div className="w-full bg-white">
          <FinalCTASection />
        </div>

        <div className="w-full bg-gray-50">
          <TrustFooter />
        </div>
        
        <TrialSignupModal 
          isOpen={isSignupModalOpen}
          onClose={handleCloseSignupModal}
        />
      </div>
    </div>
  );
};

export default Results;
