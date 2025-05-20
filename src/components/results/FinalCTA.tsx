
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
      <CardContent className="p-5 md:p-8 text-center">
        <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#5D4154] mb-3 md:mb-4">
          Begin Your Hormone Balancing Journey
        </h2>
        
        <p className="mb-5 md:mb-6 text-gray-600 text-sm md:text-base">
          Join over 30,000 women who've found clarity and relief through personalized tracking.
        </p>
        
        <Button 
          onClick={handleStartTrial}
          className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full shadow-md w-full md:w-auto"
        >
          START MY FREE 7-DAY TRIAL
        </Button>
        
        <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
          <div className="bg-gray-100 text-[#5D4154] px-2 md:px-3 py-1 rounded-full text-xs font-medium">
            HIPAA Compliant
          </div>
          <div className="bg-gray-100 text-[#5D4154] px-2 md:px-3 py-1 rounded-full text-xs font-medium">
            256-bit Encryption
          </div>
          <div className="bg-gray-100 text-[#5D4154] px-2 md:px-3 py-1 rounded-full text-xs font-medium">
            Medically Reviewed
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalCTA;
