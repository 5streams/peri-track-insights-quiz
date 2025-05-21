
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getDynamicContent } from "@/utils/scoreCalculation";

interface PersonalizedAssessmentProps {
  scoreCategory: string;
  firstName: string;
  primarySymptoms: string[];
}

const PersonalizedAssessment: React.FC<PersonalizedAssessmentProps> = ({ 
  scoreCategory, 
  firstName,
  primarySymptoms
}) => {
  const { greeting, validation } = getDynamicContent(scoreCategory, firstName);
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0 border-t-4 border-[#9b87f5]">
      <CardContent className="p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-4">
          {firstName ? `${firstName}, your assessment suggests you may be experiencing perimenopause.` : 
          "Your assessment suggests you may be experiencing perimenopause."}
        </h3>
        
        <p className="mb-6 text-gray-700">
          {greeting}
        </p>
        
        <div className="bg-[#F9F5FF]/30 p-4 rounded-lg border border-[#9b87f5]/20 mb-4">
          <p className="text-[#5D4154] font-medium">
            {validation}
          </p>
        </div>
        
        <p className="mb-6 text-gray-700">
          Many women go years without realizing their symptoms could be related to hormonal changes 
          that often begin several years before menopause. You're not alone in seeking answers.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h4 className="font-medium text-[#5D4154] mb-2">Your Primary Symptom Concerns:</h4>
            <ul className="space-y-2">
              {primarySymptoms.slice(0, 3).map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 font-bold">
                    {index + 1}
                  </div>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-[#5D4154] mb-2">Impact on Quality of Life:</h4>
            <div className={`p-3 rounded-lg border ${
              scoreCategory === "mild" ? "bg-green-50 border-green-200" :
              scoreCategory === "moderate" ? "bg-amber-50 border-amber-200" :
              "bg-rose-50 border-rose-200"
            }`}>
              <p className={`font-medium ${
                scoreCategory === "mild" ? "text-green-700" :
                scoreCategory === "moderate" ? "text-amber-700" :
                "text-rose-700"
              }`}>
                {scoreCategory === "mild" ? "Early Stage Impact" :
                 scoreCategory === "moderate" ? "Moderate Daily Impact" :
                 "Significant Impact on Daily Life"}
              </p>
              <p className="text-sm mt-1 text-gray-600">
                {scoreCategory === "mild" ? 
                  "Your symptoms are beginning to appear but aren't significantly disrupting your daily activities or well-being yet." :
                 scoreCategory === "moderate" ? 
                  "Your symptoms are regularly affecting your comfort and daily activities, though you're still able to manage." :
                  "Your symptoms are substantially impacting your daily activities, emotional well-being, and quality of life."
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedAssessment;
