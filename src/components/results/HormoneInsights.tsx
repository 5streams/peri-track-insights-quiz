
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getHormoneExplanation, getSymptomExplanation, symptomCategories } from "@/utils/scoreCalculation";

interface HormoneInsightsProps {
  scores: {
    overall: number;
    estrogen: number;
    progesterone: number;
    testosterone: number;
    primaryHormone: string;
    primarySymptoms: string[];
  };
  scoreCategory: string;
}

const HormoneInsights: React.FC<HormoneInsightsProps> = ({ scores, scoreCategory }) => {
  const { estrogen, progesterone, testosterone, primarySymptoms } = scores;
  
  // Helper to get hormone display name
  const getHormoneDisplayName = (hormone: string) => {
    return hormone.charAt(0).toUpperCase() + hormone.slice(1);
  };
  
  // Helper to get score severity category
  const getHormoneScoreCategory = (score: number) => {
    if (score <= 40) return "mild";
    if (score <= 70) return "moderate";
    return "severe";
  };
  
  // Helper to get color based on score
  const getScoreColor = (score: number) => {
    const category = getHormoneScoreCategory(score);
    switch (category) {
      case "mild": return "text-green-600";
      case "moderate": return "text-amber-600";
      case "severe": return "text-rose-600";
      default: return "text-[#5D4154]";
    }
  };
  
  // Get hormone symptoms
  const getHormoneSymptoms = (hormone: string) => {
    return primarySymptoms.filter((symptom, index) => {
      // For simplicity, we'll associate symptoms to hormones in a basic way
      // In a real app, this would be more sophisticated based on quiz answers
      if (hormone === "estrogen" && (index === 0 || index === 3)) return true;
      if (hormone === "progesterone" && (index === 1)) return true; 
      if (hormone === "testosterone" && (index === 2)) return true;
      return false;
    }).slice(0, 3);
  };
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0 border-t-4 border-[#5D4154]">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5D4154] mb-6">
          YOUR HORMONE ASSESSMENT
        </h2>
        
        {/* Hormone patterns description */}
        <div className="bg-white p-4 rounded-lg mb-8 border border-gray-200 shadow-sm">
          <h4 className="text-base md:text-lg font-bold text-[#5D4154] mb-3">Your Three-Hormone Pattern:</h4>
          
          <div className="space-y-3">
            {/* Hormone indicators with clear visual separation */}
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0 bg-[#F472B6]"></div>
              <div>
                <span className="font-medium text-[#5D4154] text-lg md:text-xl">Estrogen:</span>{" "}
                <span className="text-gray-700 text-base md:text-lg">
                  {getHormoneScoreCategory(estrogen) === "mild" ? "Within optimal range with normal fluctuations" : 
                   getHormoneScoreCategory(estrogen) === "moderate" ? "Notable fluctuations affecting temperature regulation and mood stability" : 
                   "Pronounced fluctuations affecting temperature regulation and mood stability"}
                </span>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0 bg-[#60A5FA]"></div>
              <div>
                <span className="font-medium text-[#5D4154] text-lg md:text-xl">Progesterone:</span>{" "}
                <span className="text-gray-700 text-base md:text-lg">
                  {getHormoneScoreCategory(progesterone) === "mild" ? "Healthy levels supporting sleep and mood" : 
                   getHormoneScoreCategory(progesterone) === "moderate" ? "Moderate decline (30-40%) affecting sleep and mood" : 
                   "Significant decline (45-55%) affecting sleep and mood"}
                </span>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0 bg-[#10B981]"></div>
              <div>
                <span className="font-medium text-[#5D4154] text-lg md:text-xl">Testosterone:</span>{" "}
                <span className="text-gray-700 text-base md:text-lg">
                  {getHormoneScoreCategory(testosterone) === "mild" ? "Balanced levels supporting energy and vitality" : 
                   getHormoneScoreCategory(testosterone) === "moderate" ? "Notable decrease (25-35%) affecting energy and motivation" : 
                   "Substantial decrease (40-50%) affecting energy and motivation"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-base md:text-lg text-[#5D4154] font-medium">
              {scoreCategory === "mild" ? "You are showing minimal perimenopause symptoms with hormone levels in optimal ranges." :
               scoreCategory === "moderate" ? "This specific pattern explains why you're experiencing your particular symptom cluster." :
               "This pattern explains why your symptoms feel so intense and why generic approaches may not work."}
            </p>
          </div>
        </div>
        
        {/* Estrogen Section */}
        <div className="mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-[#5D4154] mb-3 flex items-center">
            ESTROGEN ASSESSMENT: 
            <span className={`ml-2 ${getScoreColor(estrogen)} text-lg md:text-xl`}>
              {estrogen <= 40 ? "EARLY CHANGES" : 
               estrogen <= 70 ? "MODERATE FLUCTUATIONS" : 
               "SIGNIFICANT FLUCTUATIONS"} [{estrogen}/100]
            </span>
          </h3>
          
          <div className="bg-gradient-to-r from-[#F472B6]/5 to-white p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-lg md:text-xl">
              {getHormoneExplanation("estrogen", getHormoneScoreCategory(estrogen))}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-[#5D4154] mb-2 text-lg md:text-xl">
              This could potentially relate to your reported symptoms:
            </h4>
            <ul className="space-y-3">
              {getHormoneSymptoms("estrogen").map((symptom, index) => (
                <li key={index} className="flex items-start bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="h-5 w-5 rounded-full bg-[#F472B6]/20 text-[#F472B6] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-bold text-xs">
                    •
                  </div>
                  <div>
                    <strong className="text-[#5D4154] text-lg md:text-xl">{symptom}</strong>
                    <p className="text-gray-600 mt-1 text-base md:text-lg">
                      {getSymptomExplanation(symptom, "estrogen")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Progesterone Section */}
        <div className="mb-12">
          <h3 className="text-xl md:text-2xl font-semibold text-[#5D4154] mb-3 flex items-center">
            PROGESTERONE ASSESSMENT: 
            <span className={`ml-2 ${getScoreColor(progesterone)} text-lg md:text-xl`}>
              {progesterone <= 40 ? "EARLY CHANGES" : 
               progesterone <= 70 ? "MODERATE CHANGES" : 
               "SIGNIFICANT CHANGES"} [{progesterone}/100]
            </span>
          </h3>
          
          <div className="bg-gradient-to-r from-[#60A5FA]/5 to-white p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-lg md:text-xl">
              {getHormoneExplanation("progesterone", getHormoneScoreCategory(progesterone))}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-[#5D4154] mb-2 text-lg md:text-xl">
              This could potentially relate to your reported symptoms:
            </h4>
            <ul className="space-y-3">
              {getHormoneSymptoms("progesterone").map((symptom, index) => (
                <li key={index} className="flex items-start bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="h-5 w-5 rounded-full bg-[#60A5FA]/20 text-[#60A5FA] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-bold text-xs">
                    •
                  </div>
                  <div>
                    <strong className="text-[#5D4154] text-lg md:text-xl">{symptom}</strong>
                    <p className="text-gray-600 mt-1 text-base md:text-lg">
                      {getSymptomExplanation(symptom, "progesterone")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Testosterone Section */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-semibold text-[#5D4154] mb-3 flex items-center">
            TESTOSTERONE ASSESSMENT: 
            <span className={`ml-2 ${getScoreColor(testosterone)} text-lg md:text-xl`}>
              {testosterone <= 40 ? "EARLY CHANGES" : 
               testosterone <= 70 ? "MODERATE CHANGES" : 
               "SIGNIFICANT CHANGES"} [{testosterone}/100]
            </span>
          </h3>
          
          <div className="bg-gradient-to-r from-[#10B981]/5 to-white p-4 rounded-lg mb-4">
            <p className="text-gray-700 text-lg md:text-xl">
              {getHormoneExplanation("testosterone", getHormoneScoreCategory(testosterone))}
            </p>
          </div>
          
          <div className="mb-6">
            <h4 className="font-medium text-[#5D4154] mb-2 text-lg md:text-xl">
              This could potentially relate to your reported symptoms:
            </h4>
            <ul className="space-y-3">
              {getHormoneSymptoms("testosterone").map((symptom, index) => (
                <li key={index} className="flex items-start bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="h-5 w-5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-bold text-xs">
                    •
                  </div>
                  <div>
                    <strong className="text-[#5D4154] text-lg md:text-xl">{symptom}</strong>
                    <p className="text-gray-600 mt-1 text-base md:text-lg">
                      {getSymptomExplanation(symptom, "testosterone")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HormoneInsights;
