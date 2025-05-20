
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Brain, CheckCircle } from "lucide-react";

const EmotionHormoneConnection = () => {
  return (
    <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
      <CardHeader className="pb-4 border-b">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-4">
            <Brain className="h-5 w-5 text-[#5D4154]" />
          </div>
          UNDERSTANDING THE EMOTION-HORMONE CONNECTION
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4 text-lg">
          Many women describe perimenopause as feeling like an "emotional roller coaster" or say things like "I don't feel like myself anymore." There's a profound reason for this—your hormones don't just affect your body; they fundamentally influence your emotional landscape.
        </p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="font-semibold text-xl text-[#5D4154] mb-4">YOUR BRAIN ON CHANGING HORMONES</h3>
          <p className="mb-4">Your brain contains receptors for estrogen, progesterone, and testosterone in areas that regulate:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
              <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
              <span>Mood stability and emotional processing</span>
            </div>
            <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
              <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
              <span>Stress response and resilience</span>
            </div>
            <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
              <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
              <span>Sleep architecture and quality</span>
            </div>
            <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
              <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
              <span>Memory formation and retrieval</span>
            </div>
            <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
              <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
              <span>Cognitive function and clarity</span>
            </div>
            <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
              <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
              <span>Motivation and energy</span>
            </div>
          </div>
          
          <p>When these hormones fluctuate unpredictably—as they do in your specific pattern—it creates a ripple effect through these brain systems.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h3 className="font-semibold text-xl text-[#5D4154] mb-4">THE EMOTIONAL SYMPTOMS YOU'VE REPORTED</h3>
          
          <p className="mb-4">
            The emotional changes you described are directly connected to changes in your estrogen levels affecting your brain's emotional regulation centers.
          </p>
          
          <div className="bg-[#5D4154]/5 p-4 rounded-lg font-medium text-[#5D4154] mb-4">
            This emotional experience isn't a psychological issue—it's a neurobiological response to hormone fluctuations.
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#5D4154]/90 to-[#5D4154] text-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-xl mb-4">VALIDATION: YOUR FEELINGS ARE REAL</h3>
          <p className="mb-4">Perhaps the most important thing to understand is that:</p>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
              <span>Your emotional experiences are real, valid responses to biological changes</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
              <span>The intensity of your feelings is proportionate to the hormonal shifts occurring</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
              <span>Your struggles deserve acknowledgment and support, not dismissal</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
              <span>You're experiencing a natural transition, not a disorder or deficiency</span>
            </li>
          </ul>
          
          <div className="border-l-4 border-[#A7C4A0] pl-4 py-2 italic text-white/90">
            "For years I thought I was developing anxiety disorder or depression. Understanding that my emotional changes were connected to hormone fluctuations was incredibly validating. It wasn't 'all in my head'—it was in my endocrine system."
            <div className="text-right font-medium mt-2 text-white/80">- Jennifer, 46</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionHormoneConnection;
