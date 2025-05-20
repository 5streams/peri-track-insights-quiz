
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { BarChart } from "lucide-react";

interface PersonalizedHormoneAssessmentProps {
  firstName: string;
  primaryHormone: string;
  symptoms: string[];
  score: number;
}

const PersonalizedHormoneAssessment: React.FC<PersonalizedHormoneAssessmentProps> = ({
  firstName,
  primaryHormone,
  symptoms,
  score
}) => {
  // Helper function to format symptoms for display
  const formatSymptom = (symptom: string) => {
    return symptom
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Changes|Symptoms/g, '')
      .trim();
  };

  // Determine content based on primary hormone
  const getAssessmentContent = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          title: `${firstName}, Your Unique Hormone Profile`,
          description: `Based on your responses, we've identified a specific hormone pattern that explains the exact symptoms you reported. Your testosterone levels appear to be declining, which directly relates to your described experiences.`,
          statistic: "This pattern affects 68% of women during perimenopause, yet is frequently overlooked by standard healthcare approaches."
        };
      case "progesterone":
        return {
          title: `${firstName}, Your Unique Hormone Profile`,
          description: `Based on your responses, we've identified a specific hormone pattern that explains the exact symptoms you reported. Your progesterone levels appear to be declining, which directly relates to your described experiences.`,
          statistic: "This pattern affects 72% of women during perimenopause, often years before other symptoms appear."
        };
      case "estradiol":
        return {
          title: `${firstName}, Your Unique Hormone Profile`,
          description: `Based on your responses, we've identified a specific hormone pattern that explains the exact symptoms you reported. Your estradiol levels appear to be fluctuating significantly, which directly relates to your described experiences.`,
          statistic: "This pattern is experienced by 65% of women during perimenopause and can begin several years before actual menopause."
        };
      default:
        return {
          title: `${firstName}, Your Unique Hormone Profile`,
          description: `Based on your responses, we've identified a specific hormone pattern that explains the exact symptoms you reported. Your hormones are showing changes typical of perimenopause.`,
          statistic: "Your pattern is shared by thousands of women in the perimenopause transition phase."
        };
    }
  };

  const content = getAssessmentContent();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform transition-all duration-300 shadow-md hover:shadow-lg">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#5D4154]"></div>
      <CardHeader className="pb-3 md:pb-4 border-b bg-gradient-to-r from-[#FFECD6]/50 to-white">
        <CardTitle className="font-playfair text-xl md:text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 md:mr-4">
            <BarChart className="h-4 w-4 md:h-5 md:w-5 text-[#5D4154]" />
          </div>
          <span className="leading-tight">PERSONALIZED HORMONE ASSESSMENT</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#5D4154] mb-3 md:mb-4">
          {content.title}
        </h3>
        <p className="text-base md:text-lg mb-4 md:mb-5">
          {content.description}
        </p>
        
        <div className="bg-[#FFECD6]/20 p-4 md:p-5 rounded-lg mb-4 md:mb-5">
          <h4 className="font-semibold text-[#5D4154] mb-2">Your Reported Symptoms:</h4>
          <ul className="space-y-2 md:space-y-3">
            {symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#5D4154] font-bold mr-2">•</span>
                <span className="text-sm md:text-base">
                  <span className="font-medium">{formatSymptom(symptom)}</span>
                  {index === 0 && ' - occurring frequently and affecting your daily life'}
                  {index === 1 && ' - causing noticeable changes in your wellbeing'}
                  {index === 2 && ' - impacting your quality of life'}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-[#FFECD6]/30 p-3 md:p-4 rounded-lg">
          <p className="text-[#5D4154] font-medium text-sm md:text-base">
            What you're experiencing isn't "just aging" or "all in your head." These are real biological responses to specific hormone changes happening in your body right now.
          </p>
          <p className="text-[#5D4154] font-medium text-sm md:text-base mt-2">
            {content.statistic}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedHormoneAssessment;
