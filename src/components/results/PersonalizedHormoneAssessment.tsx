
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";

interface PersonalizedHormoneAssessmentProps {
  firstName: string;
  primaryHormone: string;
  symptoms: string[];
  score: number;
}

const PersonalizedHormoneAssessment: React.FC<PersonalizedHormoneAssessmentProps> = ({ 
  firstName, 
  primaryHormone,
  symptoms 
}) => {
  // Capitalize first letter of firstName
  const capitalizedFirstName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "";
  
  // Get percentage based on primary hormone
  const getPercentage = () => {
    switch(primaryHormone.toLowerCase()) {
      case "progesterone": return "72%";
      case "estradiol": return "68%";
      case "testosterone": return "65%";
      default: return "70%";
    }
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300 bg-white border-t-4 border-[#5D4154]">
      <CardContent className="p-5 md:p-8">
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-4 tracking-tight">
          PERSONALIZED HORMONE ASSESSMENT
        </h1>
        
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154]/90 mb-3">
          {capitalizedFirstName}, We've Identified Your Hormone Pattern
        </h2>
        
        <p className="text-lg text-gray-700 mb-4">
          Based on your responses, your {primaryHormone.toLowerCase()} levels are {primaryHormone.toLowerCase() === "estradiol" ? "fluctuating" : "declining"} 
          {primaryHormone.toLowerCase() === "progesterone" ? " while estrogen fluctuates," : primaryHormone.toLowerCase() === "estradiol" ? " significantly," : ","} 
          creating an imbalance that directly explains your specific symptoms.
        </p>
        
        <p className="text-lg text-gray-700 mb-3 font-medium">
          This pattern affects {getPercentage()} of women during perimenopause and is frequently missed by standard testing.
        </p>
        
        <div className="bg-[#F9F5FF] p-4 rounded-lg mt-6 border border-[#5D4154]/10">
          <p className="text-base text-[#5D4154] font-medium">
            Your {primaryHormone.toLowerCase() === "progesterone" ? "declining progesterone" : 
                   primaryHormone.toLowerCase() === "estradiol" ? "fluctuating estradiol" : 
                   primaryHormone.toLowerCase() === "testosterone" ? "decreasing testosterone" : 
                   "hormone imbalance"} is directly impacting:
          </p>
          <ul className="mt-2 space-y-1">
            {symptoms.slice(0, 3).map((symptom, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="text-[#5D4154] mr-2">•</span> 
                {symptom === "hot flashes" ? "Temperature regulation and comfort" : 
                 symptom === "mood swings" ? "Emotional stability and mood balance" : 
                 symptom === "sleep issues" ? "Sleep quality and ability to stay asleep" :
                 symptom === "anxiety" ? "Anxiety levels, especially at night" :
                 symptom === "brain fog" ? "Mental clarity and cognitive function" :
                 symptom === "fatigue" ? "Energy levels throughout the day" :
                 symptom === "weight gain" ? "Metabolism and weight management" :
                 symptom}
              </li>
            ))}
          </ul>
          
          <p className="mt-3 text-base text-[#5D4154]">
            This imbalance begins 5-10 years before menopause, explaining why standard approaches often fail.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedHormoneAssessment;
