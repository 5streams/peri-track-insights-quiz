
import React from "react";

interface ScoreMeterProps {
  score: number;
  firstName: string;
  scoreCategory: string;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ score, firstName, scoreCategory }) => {
  // Determine the color for the score display based on category
  const getScoreColor = () => {
    switch (scoreCategory) {
      case "minimal": return "text-green-700";
      case "early": return "text-yellow-700";
      case "moderate": return "text-orange-700";
      case "significant": return "text-red-700";
      default: return "text-gray-800";
    }
  };
  
  // Determine the fill color for the meter based on category
  const getMeterFillColor = () => {
    switch (scoreCategory) {
      case "minimal": return "bg-green-600";
      case "early": return "bg-yellow-600";
      case "moderate": return "bg-orange-600";
      case "significant": return "bg-red-600";
      default: return "bg-indigo-600";
    }
  };
  
  return (
    <div className="score-display">
      <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-3">
        {firstName ? firstName : "Your"} Perimenopause Score: 
        <span className={`${getScoreColor()} font-bold ml-2`}>{score}/100</span>
      </h2>
      
      <div className="score-meter relative h-8 bg-gray-200 rounded-full w-full max-w-xl mx-auto mb-4">
        <div 
          className={`score-fill absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${getMeterFillColor()}`} 
          style={{ width: `${Math.max(5, score)}%` }} 
        />
        
        <div 
          className="score-marker absolute top-0 w-4 h-8 bg-white border-2 border-gray-700 rounded-full transform -translate-x-1/2"
          style={{ left: `${score}%` }}
        />
        
        <div className="score-labels absolute w-full flex justify-between top-9 px-2 text-xs font-medium text-gray-700">
          <span className="absolute" style={{ left: "10%" }}>Early</span>
          <span className="absolute" style={{ left: "40%" }}>Mid</span>
          <span className="absolute" style={{ left: "75%" }}>Late</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;
