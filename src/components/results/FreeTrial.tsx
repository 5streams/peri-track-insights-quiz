
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const FreeTrial: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };
  
  const benefits = [
    "Complete access to all tracking tools",
    "Personalized hormone insights",
    "AI symptom analysis",
    "No credit card required"
  ];

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#5D4154] to-[#5D4154]/90 text-white shadow-xl">
      <CardContent className="p-5 md:p-8">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
          Start Your Free 7-Day Trial
        </h2>
        
        <p className="text-center text-base md:text-lg mb-5 md:mb-6">
          Your personalized hormone dashboard is ready with specific insights for your unique pattern.
        </p>
        
        <div className="max-w-md mx-auto mb-6 md:mb-8">
          <ul className="space-y-2 md:space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-[#A7C4A0] mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handleStartTrial}
            className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-semibold py-3 px-6 md:px-8 rounded-full text-base md:text-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto"
          >
            BEGIN MY FREE TRIAL
          </Button>
          
          <p className="mt-4 text-sm text-white/80">
            Takes just 30 seconds to begin. No credit card required.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTrial;
