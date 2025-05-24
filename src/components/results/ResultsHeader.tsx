
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

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
  const getScoreColor = (category: string) => {
    switch (category) {
      case "mild":
        return "text-yellow-600";
      case "moderate":
        return "text-orange-600";
      case "severe":
        return "text-red-600";
      default:
        return "text-purple-600";
    }
  };

  const getScoreDescription = (category: string) => {
    switch (category) {
      case "mild":
        return "Early Perimenopause Indicators";
      case "moderate":
        return "Moderate Hormone Disruption";
      case "severe":
        return "Significant Hormone Imbalance";
      default:
        return "Hormone Assessment Complete";
    }
  };

  return (
    <Card className="mb-6 bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500">
      <CardContent className="p-8">
        <div className="text-center">
          <h1 className="font-headline text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
            {firstName ? `${firstName}, Your` : "Your"} Perimenopause Assessment Results
          </h1>
          
          <div className="mb-6">
            <div className={`text-6xl lg:text-7xl font-bold ${getScoreColor(scoreCategory)} mb-3`}>
              {score}%
            </div>
            <p className="text-2xl lg:text-3xl font-semibold text-gray-700">
              {getScoreDescription(scoreCategory)}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
              Based on your responses, our analysis indicates you're experiencing symptoms 
              consistent with {scoreCategory} perimenopause changes. This assessment will help 
              you understand what's happening in your body and what steps you can take.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsHeader;
