
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { BarChart } from "lucide-react";

interface HormoneAnalysisProps {
  score: number;
  phase: string;
  primarySymptoms: string[];
}

const HormoneAnalysis = ({ score, phase, primarySymptoms }: HormoneAnalysisProps) => {
  const getHormonePatternName = () => {
    if (phase === "Late") return "Declining Estrogen";
    if (phase === "Mid") return "Fluctuating Hormones";
    return "Early Transition";
  };
  
  const patternName = getHormonePatternName();
  
  return (
    <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FFECD6]"></div>
      <CardHeader className="pb-4 border-b bg-gradient-to-r from-[#FFECD6]/50 to-white">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-4">
            <BarChart className="h-5 w-5 text-[#5D4154]" />
          </div>
          YOUR COMPREHENSIVE HORMONE ANALYSIS
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6 text-lg">
          Based on your responses, you're experiencing what we call a "{patternName}" hormone pattern. This specific pattern affects both your physical symptoms and your emotional well-being.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-8 border-[#5D4154] flex items-center justify-center animate-pulse-gentle">
              <span className="text-3xl font-bold text-[#5D4154]">{score}/100</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#A7C4A0] text-white px-4 py-1 rounded-full text-sm">
              {phase} Phase
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="font-semibold text-xl mb-2">WHAT THIS MEANS FOR YOU PHYSICALLY:</h3>
              <p className="mb-3">Your hormone pattern explains:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>Why your {primarySymptoms[0].toLowerCase()} seems to intensify at certain times</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>How your {primarySymptoms[1].toLowerCase()} connects to your hormone fluctuations</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>When your {primarySymptoms[2].toLowerCase()} is most likely to occur</p>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-2">WHAT THIS MEANS FOR YOU EMOTIONALLY:</h3>
              <p className="mb-3">This same pattern explains:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>Why you might feel emotionally vulnerable at specific times</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>How your mood shifts connect to your hormone fluctuations</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>When you might experience heightened anxiety or emotional sensitivity</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                  <p>Why you might feel disconnected from yourself during certain phases</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="font-semibold text-xl text-[#5D4154] mb-4">YOUR HORMONAL JOURNEY:</h3>
          <p className="mb-6">Women with your specific pattern typically experience:</p>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="relative mr-6 flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-bold text-xl">1</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-6 md:h-12 bg-[#FFECD6]/70"></div>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#5D4154]">An initial phase of unpredictable fluctuations (where you likely are now)</h4>
                <p className="text-gray-600 mt-1">Characterized by more rapid changes in hormone levels and less predictable symptoms</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="relative mr-6 flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#FFBF69] flex items-center justify-center text-[#5D4154] font-bold text-xl">2</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-6 md:h-12 bg-[#FFBF69]/70"></div>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#5D4154]">A middle phase of increasing stability as patterns become more predictable</h4>
                <p className="text-gray-600 mt-1">As you learn your unique patterns, symptoms become more manageable through targeted approaches</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="relative mr-6 flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#A7C4A0] flex items-center justify-center text-[#5D4154] font-bold text-xl">3</div>
              </div>
              <div>
                <h4 className="font-medium text-lg text-[#5D4154]">A final phase of adaptation as your body adjusts to new hormone levels</h4>
                <p className="text-gray-600 mt-1">Your body finds a new equilibrium, and symptoms generally become less intense</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#FFECD6]/30 p-6 rounded-lg mb-6 border border-[#FFECD6]">
          <h3 className="font-semibold text-lg mb-4">SYMPTOM SEVERITY ANALYSIS:</h3>
          <p className="mb-4">Based on your responses, these symptoms are having the most significant impact on your quality of life:</p>
          
          <div className="space-y-6">
            {primarySymptoms.map((symptom, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">
                    {index + 1}. {symptom}
                  </h4>
                  <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    index === 0 ? "bg-[#FF9B85]" : index === 1 ? "bg-[#FFBF69]" : "bg-[#A7C4A0]"
                  }`}>
                    {index === 0 ? "Severe" : index === 1 ? "Moderate" : "Mild"} Impact
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className={`h-2.5 rounded-full ${
                    index === 0 ? "bg-[#FF9B85] w-[80%]" : index === 1 ? "bg-[#FFBF69] w-[60%]" : "bg-[#A7C4A0] w-[40%]"
                  }`}></div>
                </div>
                <p className="text-sm text-gray-600">
                  Connected to: {
                    index === 0 ? "Fluctuating estrogen levels" : 
                    index === 1 ? "Decreasing progesterone" : 
                    "Altered cortisol patterns"
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-lg font-medium text-[#5D4154]">
            With proper tracking and personalized support, the emotional challenges of this transition can be significantly reduced. Many women report not just coping, but actually thriving through this phase when they have the right tools and understanding.
          </p>
          
          <div className="mt-6 border-t border-gray-100 pt-6 italic text-gray-600">
            "Understanding my hormone pattern changed everything. Instead of feeling at the mercy of unpredictable emotions, I could see the patterns and prepare for more vulnerable times. That knowledge alone reduced my anxiety tremendously."
            <div className="text-right font-medium mt-2 text-gray-500">- Michelle, 45</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HormoneAnalysis;
