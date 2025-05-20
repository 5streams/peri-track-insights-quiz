
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingSpinner from "@/components/results/LoadingSpinner";
import { mapSymptomsToPrimaryHormone } from "@/utils/hormoneMapping";

// Import our components
import PersonalizedHormoneAssessment from "@/components/results/PersonalizedHormoneAssessment";
import KeyHormoneInsights from "@/components/results/KeyHormoneInsights";
import CompleteHormonePicture from "@/components/results/CompleteHormonePicture";
import ThreeStepSolution from "@/components/results/ThreeStepSolution";
import FreeTrial from "@/components/results/FreeTrial";
import SuccessStory from "@/components/results/SuccessStory";
import FinalCTA from "@/components/results/FinalCTA";
import ScienceExplanation from "@/components/results/ScienceExplanation";
import EmotionHormoneConnection from "@/components/results/EmotionHormoneConnection";
import SymptomValidation from "@/components/results/SymptomValidation";
import SymptomHormoneVisualization from "@/components/results/SymptomHormoneVisualization";
import WarningTimeline from "@/components/results/WarningTimeline";
import TransformationJourney from "@/components/results/TransformationJourney";
import RiskReversal from "@/components/results/RiskReversal";

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const [primaryHormone, setPrimaryHormone] = useState("estradiol");
  const [secondaryHormones, setSecondaryHormones] = useState<string[]>(["progesterone", "testosterone"]);
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
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      
      // Determine primary hormone based on symptoms
      const hormone = mapSymptomsToPrimaryHormone(parsedResults.primarySymptoms);
      setPrimaryHormone(hormone);
      
      // Set secondary hormones (all except primary)
      const allHormones = ["estradiol", "progesterone", "testosterone"];
      setSecondaryHormones(allHormones.filter(h => h !== hormone));
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
  
  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#FFECD6]/30 to-white py-6 md:py-8 px-4 md:px-6 lg:px-8"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%235D4154\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3C/svg%3E')",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Section 1: Personalized Hormone Assessment */}
        <PersonalizedHormoneAssessment 
          firstName={userInfo.firstName}
          primaryHormone={primaryHormone}
          symptoms={results.primarySymptoms}
          score={results.score}
        />
        
        {/* Section 2: Key Hormone Insights */}
        <KeyHormoneInsights primaryHormone={primaryHormone} />
        
        {/* Symptom Validation Section */}
        <SymptomValidation symptoms={results.primarySymptoms} />
        
        {/* NEW: Warning Timeline Section */}
        <WarningTimeline />
        
        {/* Emotion-Hormone Connection */}
        <EmotionHormoneConnection />
        
        {/* Add Symptom-Specific Hormone Visualizations */}
        <div className="mb-8 reveal-section transform translate-y-4 opacity-0">
          <div className="bg-white rounded-lg shadow p-6 border-t-4 border-[#5D4154]">
            <h3 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-4">
              YOUR SYMPTOM-HORMONE CONNECTIONS
            </h3>
            <p className="mb-6">
              These visualizations show exactly how your fluctuating hormone levels connect to your specific symptoms:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {results.primarySymptoms.map((symptom, index) => (
                <SymptomHormoneVisualization 
                  key={index}
                  symptom={symptom}
                  primaryHormone={index === 0 ? primaryHormone : secondaryHormones[index % 2]}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* NEW: Transformation Journey Section */}
        <TransformationJourney />
        
        {/* Science Behind Your Symptoms */}
        <ScienceExplanation 
          primaryHormone={primaryHormone}
          symptoms={results.primarySymptoms}
        />
        
        {/* Complete Hormone Picture */}
        <CompleteHormonePicture 
          primaryHormone={primaryHormone}
          secondaryHormones={secondaryHormones}
        />
        
        {/* 3-Step Solution */}
        <ThreeStepSolution primaryHormone={primaryHormone} symptoms={results.primarySymptoms} />
        
        {/* Free Trial CTA */}
        <FreeTrial />
        
        {/* NEW: Risk Reversal Section */}
        <RiskReversal />
        
        {/* Success Story */}
        <SuccessStory primaryHormone={primaryHormone} symptoms={results.primarySymptoms} />
        
        {/* Final CTA */}
        <FinalCTA />
        
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
