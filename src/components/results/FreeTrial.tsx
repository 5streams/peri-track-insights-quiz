
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";
import { useLeadCapture } from "@/hooks/use-lead-capture"; // Add this import
import { CheckCircle } from "lucide-react";

interface FreeTrialProps {
  onStartTrial: () => void;
  primaryHormone: string;
  scoreCategory: string;
}

const FreeTrial: React.FC<FreeTrialProps> = ({ onStartTrial, primaryHormone, scoreCategory }) => {
  const { openLeadModal } = useLeadCapture(); // Use the hook instead of local state
  const navigate = useNavigate();
  
  const handleMonthlyTrial = () => {
    // Open lead capture modal with monthly plan
    console.log("Starting monthly trial");
    openLeadModal('free_trial', 'monthly', localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {});
  };
  
  const handleAnnualTrial = () => {
    // Open lead capture modal with annual plan
    console.log("Starting annual trial");
    openLeadModal('free_trial', 'annual', localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {});
  };
  
  return (
    <Card className="mb-8 bg-gradient-to-r from-[#F9F5FF] to-white">
      <CardContent className="p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
            Start Your 7-Day Free Trial Today
          </h2>
          
          <p className="mb-6 text-gray-700 max-w-xl mx-auto">
            Track your symptoms, understand your hormones, and regain control with our comprehensive perimenopause management platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {/* Monthly Option */}
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all">
              <h3 className="font-semibold text-[#5D4154] text-lg mb-2">Monthly Plan</h3>
              <div className="text-2xl font-bold text-[#5D4154] mb-3">$9.99<span className="text-sm font-normal text-gray-500">/month</span></div>
              
              <ul className="mb-5 text-left">
                <li className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Full access to all features</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Unlimited symptom tracking</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Luna AI Perimenopause Companion support</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleMonthlyTrial}
                variant="outline"
                className="w-full border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/10"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
            
            {/* Annual Option */}
            <div className="bg-white rounded-lg shadow-md p-5 border-2 border-[#9b87f5] hover:shadow-lg transition-all relative">
              <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-bl-lg font-medium">
                BEST VALUE
              </div>
              
              <h3 className="font-semibold text-[#5D4154] text-lg mb-2">Annual Plan</h3>
              <div className="text-2xl font-bold text-[#5D4154] mb-3">
                $99<span className="text-sm font-normal text-gray-500">/year</span>
                <span className="text-sm text-green-600 font-semibold ml-2">Save 20%</span>
              </div>
              
              <ul className="mb-5 text-left">
                <li className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">All features in monthly plan</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Save 20% compared to monthly</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Priority customer support</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleAnnualTrial}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTrial;
