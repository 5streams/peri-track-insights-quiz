
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const RiskReversal: React.FC = () => {
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#FFECD6]/50 to-white hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-[#5D4154]/10 p-2 rounded-full">
            <ShieldCheck className="h-7 w-7 text-[#5D4154]" />
          </div>
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#5D4154]">
            OUR GUARANTEE TO YOU
          </h2>
        </div>
        
        <p className="mb-4 text-[#5D4154] font-medium text-base md:text-lg">
          The Peritrack Peace of Mind Promise
        </p>
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 mb-5">
          <div className="flex items-start space-x-3 mb-4">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="text-gray-700">
              If your personalized dashboard and Luna AI support don't deliver valuable insights in your first 7 days, simply contact us and we'll extend your free trial by another full week.
            </p>
          </div>
          
          <div className="flex items-start space-x-3 mb-4">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="text-gray-700">
              And if you decide to continue after your trial ($14/month), you're protected by our 30-day money-back guarantee – if you don't see significant improvement in your symptoms within your first month, we'll refund every penny.
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="h-3 w-3 text-[#A7C4A0]" />
            </div>
            <p className="font-medium text-[#5D4154]">
              There's absolutely nothing to lose, and restful nights, anxiety-free days, and your overall wellbeing to regain.
            </p>
          </div>
        </div>
        
        <div className="text-center bg-[#FFECD6]/30 p-4 rounded-lg">
          <p className="text-lg font-medium text-[#5D4154]">
            Over 30,000 women with your hormone pattern have already transformed their perimenopause experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReversal;
