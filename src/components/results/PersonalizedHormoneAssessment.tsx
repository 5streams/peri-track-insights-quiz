
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
  // Determine content based on primary hormone
  const getAssessmentContent = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          title: `${firstName}, Your Hormone Assessment Results`,
          description: `Your responses indicate a likely testosterone deficiency, which directly explains your reported decreased libido, low energy, and reduced motivation.`,
          statistic: "This pattern is common during perimenopause, affecting 68% of women, yet is frequently overlooked by standard healthcare approaches."
        };
      case "progesterone":
        return {
          title: `${firstName}, Your Hormone Assessment Results`,
          description: `Your responses indicate declining progesterone levels, which directly explains your reported sleep disruptions, nighttime anxiety, and morning fatigue.`,
          statistic: "This pattern affects 72% of women during perimenopause, often years before other symptoms appear."
        };
      case "estradiol":
        return {
          title: `${firstName}, Your Hormone Assessment Results`,
          description: `Your responses indicate fluctuating estradiol levels, which directly explains your reported hot flashes, mood swings, and brain fog.`,
          statistic: "This pattern is experienced by 65% of women during perimenopause and can begin several years before actual menopause."
        };
      default:
        return {
          title: `${firstName}, Your Hormone Assessment Results`,
          description: `Your responses indicate hormone fluctuations typical of perimenopause, which directly relates to your reported symptoms.`,
          statistic: "Your pattern is shared by thousands of women in the perimenopause transition phase."
        };
    }
  };

  const content = getAssessmentContent();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
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
        <p className="text-base md:text-lg mb-3 md:mb-4">
          {content.description}
        </p>
        <div className="bg-[#FFECD6]/30 p-3 md:p-4 rounded-lg">
          <p className="text-[#5D4154] font-medium text-sm md:text-base">
            {content.statistic}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedHormoneAssessment;
