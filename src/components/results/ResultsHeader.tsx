
import React from "react";
import { Button } from "@/components/ui/button";
import { getDynamicContent } from "@/utils/scoreCalculation";

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
    <header className="text-center pt-4 pb-10 reveal-section transform opacity-0">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5D4154] mb-6">
        YOUR PERSONALIZED PERIMENOPAUSE ASSESSMENT
      </h1>
      
      <div className="relative max-w-2xl mx-auto mb-8">
        <h2 className="text-xl md:text-2xl font-medium text-[#5D4154] mb-3">
          PERIMENOPAUSE SCORE: 
          <span className={`${getScoreColor()} font-bold ml-2`}>{score}/100</span>
        </h2>
        
        <div className="score-meter relative h-10 bg-gray-100 border border-gray-200 rounded-full w-full mb-5">
          <div 
            className={`score-fill absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${getMeterFillColor()}`} 
            style={{ width: `${Math.max(5, score)}%` }} 
          />
          
          <div className="score-labels absolute w-full flex justify-between px-3 text-xs font-medium text-white top-1/2 transform -translate-y-1/2">
            <div className="absolute left-[20%] bg-green-500 px-2 py-0.5 rounded-md opacity-90">Mild</div>
            <div className="absolute left-[55%] bg-amber-500 px-2 py-0.5 rounded-md opacity-90">Moderate</div>
            <div className="absolute left-[85%] bg-rose-500 px-2 py-0.5 rounded-md opacity-90">Severe</div>
          </div>
        </div>
      </div>
      
      {/* Immediate CTA for high-intent users */}
      {scoreCategory === "severe" && (
        <Button 
          onClick={onStartTrial}
          className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white font-semibold px-8 py-6 rounded-lg shadow-lg mb-8 text-lg"
        >
          Take Action Now - Start Free Trial
        </Button>
      )}
    </header>
  );
};

export default ResultsHeader;
