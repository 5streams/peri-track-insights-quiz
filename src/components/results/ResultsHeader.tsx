
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
      case "mild": return "text-[#9b87f5]";
      case "moderate": return "text-[#7E69AB]";
      case "severe": return "text-[#5D4154]";
      default: return "text-[#6E59A5]";
    }
  };
  
  // Get meter fill color
  const getMeterFillColor = () => {
    switch (scoreCategory) {
      case "mild": return "bg-[#D6BCFA]";
      case "moderate": return "bg-[#9b87f5]";
      case "severe": return "bg-[#7E69AB]";
      default: return "bg-[#9b87f5]";
    }
  };

  return (
    <header className="text-center pt-4 pb-6 reveal-section transform opacity-0 heading-container">
      <div className="decorative-backdrop"></div>
      
      <h1 className="assessment-heading text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-[#5D4154] mb-6">
        {capitalizedFirstName ? `${capitalizedFirstName}, ` : ""}We've Analyzed Your Answers
        <span className="block mt-2 font-raleway font-medium text-xl md:text-2xl text-[#6E59A5]">
          Your Personal Perimenopause Assessment
        </span>
      </h1>
      
      <div className="relative max-w-2xl mx-auto mb-6">
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
        
        <div className="score-meter relative h-12 bg-[#E5DEFF] border border-[#D6BCFA] rounded-full w-full mb-5 shadow-inner overflow-hidden">
          <div 
            ref={scoreRef}
            className={`score-fill absolute left-0 top-0 h-full rounded-full transition-all duration-1500 ease-out w-0 ${getMeterFillColor()}`}
          />
          
          <div className="score-labels absolute w-full top-0 h-full flex items-center">
            <div className="relative w-full px-6">
              <div className="absolute left-[20%] top-1/2 -translate-y-1/2 bg-[#D6BCFA] px-3 py-1 rounded-md text-[#5D4154] font-medium shadow-md transform -translate-x-1/2">Mild</div>
              <div className="absolute left-[55%] top-1/2 -translate-y-1/2 bg-[#9b87f5] px-3 py-1 rounded-md text-white font-medium shadow-md transform -translate-x-1/2">Moderate</div>
              <div className="absolute left-[85%] top-1/2 -translate-y-1/2 bg-[#7E69AB] px-3 py-1 rounded-md text-white font-medium shadow-md transform -translate-x-1/2">Severe</div>
            </div>
          </div>
        </div>
        
        <div className="score-description text-center mb-4">
          <p className={`inline-block py-1.5 px-4 rounded-lg shadow-sm font-medium ${
            scoreCategory === "mild" ? "bg-[#E5DEFF] text-[#7E69AB] border border-[#D6BCFA]" :
            scoreCategory === "moderate" ? "bg-[#9b87f5]/10 text-[#6E59A5] border border-[#9b87f5]" :
            "bg-[#7E69AB]/10 text-[#5D4154] border border-[#7E69AB]"
          }`}>
            {scoreCategory === "mild" ? "Early Stage Symptoms" :
            scoreCategory === "moderate" ? "Moderate Perimenopause Signs" :
            "Advanced Hormonal Changes"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ResultsHeader;
