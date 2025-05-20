
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { FileText } from "lucide-react";

interface KeyHormoneInsightsProps {
  primaryHormone: string;
}

const KeyHormoneInsights: React.FC<KeyHormoneInsightsProps> = ({
  primaryHormone
}) => {
  // Get content based on the primary hormone
  const getHormoneInsight = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          title: "TESTOSTERONE: YOUR KEY HORMONE INSIGHT",
          description: "What's Happening: Your symptoms suggest your testosterone levels have declined below optimal, which directly impacts:",
          impacts: [
            "Sexual desire and responsiveness",
            "Energy levels and endurance",
            "Motivation and drive",
            "Muscle tone and metabolism"
          ],
          explanation: "Contrary to common belief, testosterone is a critical hormone for women, producing about 50% of your libido drive, and maintaining energy, mood stability, and cognitive function.",
          insight: "Most standard hormone testing overlooks female testosterone levels entirely, leaving this critical imbalance unaddressed."
        };
      case "progesterone":
        return {
          title: "PROGESTERONE: YOUR KEY HORMONE INSIGHT",
          description: "What's Happening: Your symptoms suggest your progesterone levels have declined, which directly impacts:",
          impacts: [
            "Sleep quality and ability to stay asleep",
            "Anxiety levels, especially at night",
            "Stress resilience throughout the day",
            "Overall sense of calm and wellbeing"
          ],
          explanation: "Progesterone is your body's natural \"calming\" hormone, affecting GABA receptors in your brain similar to anti-anxiety medications, but without side effects when balanced naturally.",
          insight: "This decline often begins 5-10 years before actual menopause, explaining why you're experiencing these symptoms now."
        };
      case "estradiol":
        return {
          title: "ESTRADIOL: YOUR KEY HORMONE INSIGHT",
          description: "What's Happening: Your symptoms suggest your estradiol levels are fluctuating significantly, which directly impacts:",
          impacts: [
            "Temperature regulation (hot flashes)",
            "Mood stability and emotional wellbeing",
            "Cognitive function and memory",
            "Sleep patterns and quality"
          ],
          explanation: "Estradiol is your primary estrogen with over 400 functions throughout your body. During perimenopause, levels don't just decline - they fluctuate unpredictably, often causing more intense symptoms than constant low levels.",
          insight: "These fluctuations can occur years before your periods become irregular, which is why many women experience symptoms while still having regular cycles."
        };
      default:
        return {
          title: "YOUR KEY HORMONE INSIGHT",
          description: "What's Happening: Your symptoms suggest hormone fluctuations typical of perimenopause, which directly impact:",
          impacts: [
            "Physical wellbeing and comfort",
            "Emotional stability and mood",
            "Energy levels and sleep quality",
            "Overall sense of wellness"
          ],
          explanation: "Your hormones work together as an intricate system, with changes in one affecting all others. During perimenopause, this delicate balance begins shifting, often years before periods become irregular.",
          insight: "Understanding your unique hormone pattern is essential for finding effective, personalized solutions to your symptoms."
        };
    }
  };

  const content = getHormoneInsight();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
      <CardHeader className="pb-3 md:pb-4 border-b">
        <CardTitle className="font-playfair text-xl md:text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-3 md:mr-4">
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-[#5D4154]" />
          </div>
          <span className="leading-tight">{content.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <div className="mb-5 md:mb-6">
          <div className="w-full h-24 md:h-32 bg-[#FFECD6]/20 rounded-lg flex items-center justify-center mb-4">
            <p className="text-[#5D4154] font-medium text-sm">
              [Visualization of {primaryHormone} levels]
            </p>
          </div>
          
          <p className="text-base md:text-lg font-medium text-[#5D4154] mb-3 md:mb-4">
            {content.description}
          </p>
          
          <ul className="space-y-2 mb-5 md:mb-6">
            {content.impacts.map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#5D4154] mr-2 text-lg">•</span>
                <span className="text-sm md:text-base">{impact}</span>
              </li>
            ))}
          </ul>
          
          <p className="mb-4 text-sm md:text-base">
            {content.explanation}
          </p>
          
          <div className="bg-[#FFECD6]/30 p-3 md:p-4 rounded-lg">
            <p className="font-medium text-[#5D4154] text-sm md:text-base">
              {content.insight}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyHormoneInsights;
