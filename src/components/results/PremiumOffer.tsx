
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle } from "lucide-react";

interface PremiumOfferProps {
  primaryHormone: string;
}

const PremiumOffer: React.FC<PremiumOfferProps> = ({ primaryHormone }) => {
  const navigate = useNavigate();
  
  // Get hormone-specific timeframe
  const getTimeframe = () => {
    switch (primaryHormone.toLowerCase()) {
      case "progesterone": return "14-21";
      case "estradiol": return "16-24";
      case "testosterone": return "12-18";
      default: return "14-21";
    }
  };
  
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 border-t-4 border-[#A7C4A0] bg-gradient-to-br from-[#FFECD6]/60 to-white hover:shadow-xl transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-center text-[#5D4154] mb-5">
          YOUR FREE 7-DAY TRIAL INCLUDES:
        </h2>
        
        <div className="max-w-xl mx-auto">
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-[#A7C4A0]" />
              </div>
              <div className="ml-3">
                <p className="text-[#5D4154] font-medium">Complete Hormone Pattern Analysis</p>
                <p className="text-gray-500 text-sm"><span className="line-through">$97 value</span></p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-[#A7C4A0]" />
              </div>
              <div className="ml-3">
                <p className="text-[#5D4154] font-medium">Personalized Tracking System</p>
                <p className="text-gray-500 text-sm"><span className="line-through">$49 value</span></p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-[#A7C4A0]" />
              </div>
              <div className="ml-3">
                <p className="text-[#5D4154] font-medium">24/7 Luna AI Support</p>
                <p className="text-gray-500 text-sm"><span className="line-through">$79 value</span></p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mt-1">
                <CheckCircle className="h-4 w-4 text-[#A7C4A0]" />
              </div>
              <div className="ml-3">
                <p className="text-[#5D4154] font-medium">BONUS: "Rapid Relief Protocol" for your specific pattern</p>
                <p className="text-gray-500 text-sm"><span className="line-through">$47 value</span></p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#5D4154]/5 p-4 rounded-lg mb-6 text-center">
            <p className="font-semibold text-[#5D4154]">
              TOTAL VALUE: <span className="line-through">$272</span> - <span className="text-lg font-bold">YOURS FREE</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              No credit card required. Cancel anytime.
            </p>
          </div>
          
          <div className="text-center mb-5">
            <Button 
              onClick={handleStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto text-base md:text-lg"
            >
              START MY FREE TRIAL NOW
            </Button>
          </div>
          
          <p className="text-center text-base text-[#5D4154]">
            Women with your hormone pattern who begin tracking now typically see initial improvement within {getTimeframe()} days.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumOffer;
