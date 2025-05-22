
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface FinalCTASectionProps {
  spotNumber: number;
  onStartTrial: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ spotNumber, onStartTrial }) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  
  const handleMonthlyTrial = () => {
    setIsMonthlyModalOpen(true);
  };
  
  const handleAnnualTrial = () => {
    setIsAnnualModalOpen(true);
  };
  
  const handleModalClose = (pricingPlan: "monthly" | "annual") => {
    setIsMonthlyModalOpen(false);
    setIsAnnualModalOpen(false);
    
    // Store the selected pricing plan
    localStorage.setItem("selectedPricingPlan", pricingPlan);
    onStartTrial();
  };
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0 border-none shadow-lg">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFECD6] p-6 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-3">
            Your Personalized Dashboard Expires Soon
          </h2>
          <p className="text-gray-700 mb-8">
            Don't lose your spot #{spotNumber} - claim your pre-built system now
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            {/* Monthly Option */}
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
              <h3 className="font-semibold text-[#5D4154] text-lg mb-2">Monthly Plan</h3>
              <div className="text-2xl font-bold text-[#5D4154] mb-3">$9.99<span className="text-sm font-normal text-gray-500">/month</span></div>
              
              <ul className="mb-5 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#A7C4A0] font-bold">✓</span>
                  <span className="text-sm">Full access to all features</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A7C4A0] font-bold">✓</span>
                  <span className="text-sm">Luna AI hormone coach</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A7C4A0] font-bold">✓</span>
                  <span className="text-sm">7-day free trial</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleMonthlyTrial}
                variant="outline"
                className="w-full border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/10 py-5 font-medium"
              >
                START 7-DAY FREE TRIAL
              </Button>
            </div>
            
            {/* Annual Option */}
            <div className="bg-white rounded-lg shadow-md p-5 border-2 border-[#A7C4A0] relative">
              <Badge className="absolute -top-3 right-5 bg-[#A7C4A0]">
                BEST VALUE
              </Badge>
              
              <h3 className="font-semibold text-[#5D4154] text-lg mb-2">Annual Plan</h3>
              <div className="text-2xl font-bold text-[#5D4154] mb-3">
                $99<span className="text-sm font-normal text-gray-500">/year</span>
                <span className="text-sm text-green-600 font-semibold ml-2">Save $20.88</span>
              </div>
              
              <ul className="mb-5 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#A7C4A0] font-bold">✓</span>
                  <span className="text-sm">All features in monthly plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A7C4A0] font-bold">✓</span>
                  <span className="text-sm">Quarterly hormone Q&A sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A7C4A0] font-bold">✓</span>
                  <span className="text-sm">7-day free trial</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleAnnualTrial}
                className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white py-5 font-medium"
              >
                START 7-DAY FREE TRIAL
              </Button>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600">
            No-risk trial - keep all reports even if you cancel
          </p>
        </div>
      </CardContent>
      
      {/* Lead Capture Modals */}
      <LeadCaptureModal
        isOpen={isMonthlyModalOpen}
        onClose={() => handleModalClose("monthly")}
        pricingPlan="monthly"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={true}
      />
      
      <LeadCaptureModal
        isOpen={isAnnualModalOpen}
        onClose={() => handleModalClose("annual")}
        pricingPlan="annual"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={true}
      />
    </Card>
  );
};

export default FinalCTASection;
