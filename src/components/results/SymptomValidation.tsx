
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Heart } from "lucide-react";

interface SymptomValidationProps {
  symptoms: string[];
}

const SymptomValidation = ({ symptoms }: SymptomValidationProps) => {
  return (
    <Card className="mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#5D4154]"></div>
      <CardHeader className="pb-4 border-b">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-4">
            <Heart className="h-5 w-5 text-[#5D4154]" />
          </div>
          THE SYMPTOMS YOU'VE BEEN EXPERIENCING
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6">You described experiencing {symptoms[0].toLowerCase()}, {symptoms[1].toLowerCase()}, and {symptoms[2].toLowerCase()}. These experiences are shared by thousands of women with your hormone pattern.</p>
        
        <div className="space-y-8 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FF9B85]">
            <h3 className="font-playfair text-xl font-semibold text-[#5D4154] mb-3">"I FEEL LIKE I'M LOSING MY MIND"</h3>
            <p className="mb-3">
              Your report of brain fog, forgetfulness, and difficulty concentrating isn't uncommon—78% of women with your hormone pattern report similar cognitive changes. These symptoms often lead to questioning your competence and worrying about your mental health.
            </p>
            <p className="font-medium text-[#5D4154]">
              This isn't cognitive decline or early dementia. It's a direct result of hormone fluctuations affecting neurotransmitter function in your brain.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FFBF69]">
            <h3 className="font-playfair text-xl font-semibold text-[#5D4154] mb-3">"I DON'T RECOGNIZE MYSELF ANYMORE"</h3>
            <p className="mb-3">
              The mood changes, emotional sensitivity, and irritability you described are experienced by 82% of women with your hormone pattern. The feeling that your emotions are unpredictable or out of proportion can be deeply unsettling.
            </p>
            <p className="font-medium text-[#5D4154]">
              These emotional shifts aren't a personality change—they're biological responses to changing hormone levels affecting your brain chemistry.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#A7C4A0]">
            <h3 className="font-playfair text-xl font-semibold text-[#5D4154] mb-3">"I'M EXHAUSTED BUT CAN'T SLEEP"</h3>
            <p className="mb-3">
              Your sleep disruptions and resulting fatigue align exactly with what 76% of women with your hormone pattern experience. Waking up at 3 AM with your mind racing, or lying awake despite physical exhaustion, can feel isolating and frustrating.
            </p>
            <p className="font-medium text-[#5D4154]">
              This isn't insomnia as most people understand it—it's a specific disruption in sleep architecture caused by changing progesterone levels.
            </p>
          </div>
        </div>
        
        <div className="text-center font-medium text-lg text-[#5D4154] bg-[#FFECD6]/30 p-4 rounded-lg animate-pulse-subtle">
          You're not imagining these changes. You're not overreacting. And most importantly, you're not alone.
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomValidation;
