
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { getDynamicContent } from "@/utils/scoreCalculation";
import { Badge } from "@/components/ui/badge";

interface ResultsHeaderProps {
  score: number;
  firstName: string;
  scoreCategory: string;
  onStartTrial: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  score, 
  firstName, 
  scoreCategory,
  onStartTrial 
}) => {
  // Capitalize first letter of firstName
  const capitalizedFirstName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "";
  const scoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate the score fill on component mount
    if (scoreRef.current) {
      setTimeout(() => {
        if (scoreRef.current) {
          scoreRef.current.style.width = `${Math.max(5, score)}%`;
        }
      }, 300);
    }
  }, [score]);
  
  // Get color based on score category
  const getScoreColor = () => {
    switch (scoreCategory) {
      case "mild": return "text-green-600";
      case "moderate": return "text-amber-600";
      case "severe": return "text-rose-600";
      default: return "text-[#5D4154]";
    }
  };
  
  // Get meter fill color
  const getMeterFillColor = () => {
    switch (scoreCategory) {
      case "mild": return "bg-green-500";
      case "moderate": return "bg-amber-500";
      case "severe": return "bg-rose-500";
      default: return "bg-[#5D4154]";
    }
  };

  return (
    <header className="text-center pt-6 pb-12">
      <div className="decorative-backdrop"></div>
      
      <h1 className="assessment-heading text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-[#5D4154] mb-8">
        {capitalizedFirstName ? `${capitalizedFirstName}, ` : ""}We've Analyzed Your Answers
        <span className="block mt-2 font-raleway font-medium text-xl md:text-2xl text-[#5D4154]/90">
          Your Personal Perimenopause Assessment
        </span>
      </h1>
      
      <div className="relative max-w-2xl mx-auto mb-10">
        <div className="score-label-container mb-3 flex items-center justify-center">
          <h2 className="text-xl md:text-2xl font-medium text-[#5D4154] inline-block relative">
            PERIMENOPAUSE SCORE:
            <Badge 
              variant="outline" 
              className={`score-indicator ml-3 px-4 py-1.5 text-lg md:text-xl ${getScoreColor()} border-2`}
            >
              {score}/100
            </Badge>
          </h2>
        </div>
        
        <div className="score-meter relative h-12 bg-gray-100 border border-gray-200 rounded-full w-full mb-7 shadow-inner overflow-hidden">
          <div 
            ref={scoreRef}
            className={`score-fill absolute left-0 top-0 h-full rounded-full transition-all duration-1500 ease-out w-0 ${getMeterFillColor()}`}
          />
          
          <div className="score-labels absolute w-full top-0 h-full flex items-center">
            <div className="relative w-full px-6">
              <div className="absolute left-[20%] top-1/2 -translate-y-1/2 bg-green-500 px-3 py-1 rounded-md text-white font-medium shadow-md transform -translate-x-1/2">Mild</div>
              <div className="absolute left-[55%] top-1/2 -translate-y-1/2 bg-amber-500 px-3 py-1 rounded-md text-white font-medium shadow-md transform -translate-x-1/2">Moderate</div>
              <div className="absolute left-[85%] top-1/2 -translate-y-1/2 bg-rose-500 px-3 py-1 rounded-md text-white font-medium shadow-md transform -translate-x-1/2">Severe</div>
            </div>
          </div>
        </div>
        
        <div className="score-description text-center mb-6">
          <p className={`inline-block py-1.5 px-4 rounded-lg shadow-sm font-medium ${
            scoreCategory === "mild" ? "bg-green-50 text-green-700 border border-green-200" :
            scoreCategory === "moderate" ? "bg-amber-50 text-amber-700 border border-amber-200" :
            "bg-rose-50 text-rose-700 border border-rose-200"
          }`}>
            {scoreCategory === "mild" ? "Early Stage Symptoms" :
            scoreCategory === "moderate" ? "Moderate Perimenopause Signs" :
            "Advanced Hormonal Changes"}
          </p>
        </div>
      </div>
      
      {/* Immediate CTA for high-intent users */}
      {scoreCategory === "severe" && (
        <Button 
          onClick={onStartTrial}
          className="cta-button bg-gradient-to-r from-[#9b87f5] to-[#8B5CF6] hover:from-[#8B5CF6]/95 hover:to-[#8B5CF6] text-white font-semibold px-8 py-6 rounded-lg shadow-lg mb-8 text-lg transition-all duration-300"
        >
          Take Action Now - Start Free Trial
        </Button>
      )}
    </header>
  );
};

export default ResultsHeader;
