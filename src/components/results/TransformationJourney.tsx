
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Award } from "lucide-react";

const TransformationJourney: React.FC = () => {
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 border-t-4 border-[#A7C4A0]">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="h-7 w-7 text-[#A7C4A0]" />
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#5D4154]">
            YOUR TRANSFORMATION JOURNEY
          </h2>
        </div>
        
        <p className="mb-6 text-[#5D4154] font-medium text-base md:text-lg">
          The Peritrack Promise: What Women With Your Pattern Experience
        </p>
        
        <p className="mb-6 text-gray-600">
          Based on data from women with your exact hormone pattern using our system:
        </p>
        
        <div className="space-y-6 mb-6">
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">SLEEP TRANSFORMATION: 68% improvement in sleep quality within 4-8 weeks</h3>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "I went from waking 4-5 times a night to sleeping 7+ hours uninterrupted" —Michelle, 46
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">ANXIETY RELIEF: 72% reduction in anxiety episodes within 5-7 weeks</h3>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "The constant worry and racing thoughts that plagued me for months just...faded" —Jennifer, 44
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">EMOTIONAL STABILITY: 64% improvement in mood regulation within 6-9 weeks</h3>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "My husband said it was like having the old me back" —Catherine, 45
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">ENERGY RESTORATION: 70% improvement in daily energy levels within 4-6 weeks</h3>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "I can make it through the entire day without that crushing fatigue" —Sarah, 48
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">COGNITIVE CLARITY: 61% reduction in brain fog incidents within 5-8 weeks</h3>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "I can finally trust my brain again at work" —Lisa, 47
            </p>
          </div>
        </div>
        
        <div className="bg-[#FFECD6]/30 p-4 rounded-lg">
          <p className="text-[#5D4154] text-lg font-medium mb-2">
            Imagine waking up feeling truly rested...
          </p>
          <p className="text-[#5D4154] text-lg font-medium mb-2">
            Imagine getting through your day without anxiety overwhelming you...
          </p>
          <p className="text-[#5D4154] text-lg font-medium mb-2">
            Imagine having the energy to enjoy your life again...
          </p>
          <p className="text-[#5D4154] text-lg font-medium mt-4">
            This isn't just possible - it's the expected outcome when you understand and address your unique hormone pattern.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformationJourney;
