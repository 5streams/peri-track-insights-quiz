
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ConciseSolutionProps {
  primaryHormone: string;
}

const ConciseSolution: React.FC<ConciseSolutionProps> = ({ primaryHormone }) => {
  // Get hormone-specific improvement stats
  const getImprovementData = () => {
    switch (primaryHormone.toLowerCase()) {
      case "progesterone":
        return {
          sleep: "68%",
          anxiety: "72%",
          wellbeing: "64%",
          sleepWeeks: "4-8",
          anxietyWeeks: "5-7",
          wellbeingWeeks: "6-10"
        };
      case "estradiol":
        return {
          sleep: "65%",
          anxiety: "70%",
          wellbeing: "68%",
          sleepWeeks: "5-9",
          anxietyWeeks: "4-8",
          wellbeingWeeks: "6-9"
        };
      case "testosterone":
        return {
          sleep: "62%",
          anxiety: "66%",
          wellbeing: "70%",
          sleepWeeks: "6-10",
          anxietyWeeks: "5-9",
          wellbeingWeeks: "4-8"
        };
      default:
        return {
          sleep: "65%",
          anxiety: "70%",
          wellbeing: "67%",
          sleepWeeks: "5-9",
          anxietyWeeks: "5-8",
          wellbeingWeeks: "6-9"
        };
    }
  };
  
  const improvementData = getImprovementData();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300 border-t-4 border-[#A7C4A0]">
      <CardContent className="p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] mb-5">
          YOUR PERSONALIZED SOLUTION PATH
        </h2>
        
        <p className="text-base md:text-lg text-[#5D4154]/80 mb-4">
          Based on data from thousands of women with your exact hormone pattern:
        </p>
        
        <div className="bg-[#FDFCFB] border-2 border-[#E2D1C3]/30 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-center">
            <div className="flex-1 p-3 bg-[#5D4154]/5 rounded-lg">
              <div className="text-[#5D4154] font-bold mb-1">TRACK</div>
              <div className="text-sm text-gray-600">Identify your unique patterns</div>
            </div>
            <div className="hidden md:block text-[#5D4154] self-center">→</div>
            <div className="flex-1 p-3 bg-[#5D4154]/5 rounded-lg">
              <div className="text-[#5D4154] font-bold mb-1">TEST</div>
              <div className="text-sm text-gray-600">Confirm your exact hormone levels</div>
            </div>
            <div className="hidden md:block text-[#5D4154] self-center">→</div>
            <div className="flex-1 p-3 bg-[#5D4154]/5 rounded-lg">
              <div className="text-[#5D4154] font-bold mb-1">REBALANCE</div>
              <div className="text-sm text-gray-600">Implement your personalized protocol</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Our 3-step system designed specifically for your {primaryHormone.toLowerCase()} imbalance
          </p>
        </div>
        
        <p className="font-medium text-[#5D4154] mb-3">
          Women with your pattern typically experience:
        </p>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-[#A7C4A0]" />
            </div>
            <div className="ml-2">
              <p className="text-base text-gray-700">
                <span className="font-semibold">{improvementData.sleep}</span> improvement in sleep quality within <span className="font-semibold">{improvementData.sleepWeeks} weeks</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-[#A7C4A0]" />
            </div>
            <div className="ml-2">
              <p className="text-base text-gray-700">
                <span className="font-semibold">{improvementData.anxiety}</span> reduction in anxiety within <span className="font-semibold">{improvementData.anxietyWeeks} weeks</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle2 className="h-5 w-5 text-[#A7C4A0]" />
            </div>
            <div className="ml-2">
              <p className="text-base text-gray-700">
                <span className="font-semibold">{improvementData.wellbeing}</span> improvement in overall wellbeing within <span className="font-semibold">{improvementData.wellbeingWeeks} weeks</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConciseSolution;
