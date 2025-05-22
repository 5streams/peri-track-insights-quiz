
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { ShieldCheck, Check } from "lucide-react";

interface RiskReversalProps {
  firstName: string;
  scoreCategory: string;
  onStartTrial: () => void;
}

const RiskReversal: React.FC<RiskReversalProps> = ({ 
  firstName,
  scoreCategory,
  onStartTrial 
}) => {
  const capitalizedFirstName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "";
  
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#F9F5FF]/50 to-white hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#5D4154] mb-4">
          Now That You Know What's Happening... What's Next?
        </h2>
        
        <p className="mb-4 text-gray-700">
          {capitalizedFirstName ? `${capitalizedFirstName}, u` : "U"}nderstanding your {scoreCategory} perimenopause score is the first step. But knowing you're in perimenopause and actually managing it successfully are two very different things.
        </p>
        
        <div className="mb-5">
          <p className="mb-3 text-gray-700">Here's what most women do after getting their results:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="text-gray-700">They try random supplements</p>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="text-gray-700">Search endless forums for answers</p>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                <Check className="h-3.5 w-3.5" />
              </div>
              <p className="text-gray-700">Hope their symptoms will just get better on their own</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-[#F9F5FF]/80 p-4 rounded-lg mb-5 border border-[#9b87f5]/20">
          <p className="font-medium text-[#5D4154] mb-2">Here's what happens instead:</p>
          <p className="text-gray-700">
            Symptoms often intensify and become more unpredictable. Without tracking patterns or understanding triggers, women spend years feeling confused and out of control.
          </p>
          <p className="mt-3 font-medium text-[#5D4154]">
            But it doesn't have to be this way.
          </p>
        </div>
        
        <h3 className="text-xl font-semibold text-[#5D4154] mb-3">
          What If You Could Take Control Instead?
        </h3>
        
        <p className="mb-3 text-gray-700">
          What if, instead of guessing and struggling, you had a personal system that helped you:
        </p>
        
        <ul className="space-y-3 mb-5">
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="text-gray-700">
              Predict when symptoms will spike so you can prepare instead of being blindsided
            </p>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="text-gray-700">
              Identify your specific triggers and learn exactly what makes you feel better or worse
            </p>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="text-gray-700">
              Track your progress and see real improvements over time
            </p>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="text-gray-700">
              Get instant support from someone who truly understands what you're going through
            </p>
          </li>
        </ul>
        
        <p className="text-center font-medium text-[#5D4154] mb-4">
          This is exactly why we created Peritrack and Luna.
        </p>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-medium text-[#5D4154] mb-3">Your Assessment Revealed the Problem. We Provide the Solution.</h3>
          <p className="text-gray-700 mb-3">
            You don't have to navigate this 4-7 year journey alone, wondering what's normal and what's not. You deserve tools that help you understand your unique patterns and support that's available exactly when you need it.
          </p>
          <p className="font-medium text-[#5D4154]">
            Let us show you how Peritrack and Luna can transform your perimenopause experience from confusion and frustration into clarity and control.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReversal;
