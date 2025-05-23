
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface SimplePricingSectionProps {
  onStartTrial: () => void;
}

const SimplePricingSection: React.FC<SimplePricingSectionProps> = ({ onStartTrial }) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  
  const handleMonthlyClick = () => {
    setIsMonthlyModalOpen(true);
    onStartTrial();
  };
  
  const handleAnnualClick = () => {
    setIsAnnualModalOpen(true);
    onStartTrial();
  };
  
  const handleModalClose = (pricingPlan: "monthly" | "annual") => {
    setIsMonthlyModalOpen(false);
    setIsAnnualModalOpen(false);
    // Store the selected pricing plan
    localStorage.setItem("selectedPricingPlan", pricingPlan);
  };
  
  return (
    <Card className="mb-4 p-0 overflow-hidden border-none shadow-lg reveal-section transform opacity-0">
      <div className="max-w-4xl mx-auto p-2.5">
        <h2 className="text-xl font-bold text-center text-[#5D4154] mb-2">
          Start Your Free 7-Day Trial Now
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-3">
          {/* Monthly Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
            <div className="p-2.5">
              <h3 className="text-lg font-bold text-[#5D4154] mb-1.5">Monthly Plan</h3>
              <div className="flex items-baseline mb-1.5">
                <span className="text-2xl font-bold text-[#5D4154]">$12.95</span>
                <span className="text-gray-600 ml-1">/month</span>
              </div>
              
              <ul className="space-y-0.5 mb-2.5">
                <li className="flex items-start">
                  <Check className="h-3 w-3 text-[#9b87f5] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Access to all tracking features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-3 w-3 text-[#9b87f5] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Unlimited symptom monitoring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-3 w-3 text-[#9b87f5] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">7-day free trial included</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleMonthlyClick}
                className="w-full h-9 bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white uppercase text-sm"
              >
                Start My Free Trial
              </Button>
              <p className="text-xs text-center mt-1 text-gray-500">
                7-day trial then only $12.95/month
              </p>
            </div>
          </div>
          
          {/* Annual Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#9b87f5] relative">
            <div className="absolute top-0 right-0 bg-[#9b87f5] text-white px-2 py-0.5 text-xs font-bold">
              BEST VALUE
            </div>
            
            <div className="p-2.5">
              <h3 className="text-lg font-bold text-[#5D4154] mb-1.5">Annual Plan</h3>
              <div className="flex items-baseline mb-1">
                <span className="text-2xl font-bold text-[#5D4154]">$99</span>
                <span className="text-gray-600 ml-1">/year</span>
              </div>
              <p className="text-[#9b87f5] mb-1.5 text-sm">Save $56.40</p>
              
              <ul className="space-y-0.5 mb-2.5">
                <li className="flex items-start">
                  <Check className="h-3 w-3 text-[#9b87f5] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">All features in monthly plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-3 w-3 text-[#9b87f5] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Save $56.40 compared to monthly</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-3 w-3 text-[#9b87f5] mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">7-day free trial included</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleAnnualClick}
                className="w-full h-9 bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white uppercase text-sm"
              >
                Start My Free Trial
              </Button>
              <p className="text-xs text-center mt-1 text-white bg-[#9b87f5]/80 py-0.5">
                7-day trial then only $99/year
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm">👉 Start Your Free 7-Day Trial Now</p>
          <p className="text-gray-600 mt-0.5 text-sm">Educational tracking and insights for your perimenopause journey.</p>
        </div>
        
        <div className="mt-2 text-xs text-center text-gray-500">
          <p>*Individual experiences may vary. This app is for educational and tracking purposes. Always consult with healthcare professionals for medical advice.</p>
        </div>
      </div>
      
      {/* Lead Capture Modals */}
      <LeadCaptureModal
        isOpen={isMonthlyModalOpen}
        onClose={() => handleModalClose("monthly")}
        pricingPlan="monthly"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={false}
      />
      
      <LeadCaptureModal
        isOpen={isAnnualModalOpen}
        onClose={() => handleModalClose("annual")}
        pricingPlan="annual"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={false}
      />
    </Card>
  );
};

export default SimplePricingSection;
