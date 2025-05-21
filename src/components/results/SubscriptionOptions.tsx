import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface SubscriptionOptionsProps {
  onStartTrial: () => void;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({ onStartTrial }) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  
  const handleMonthlyClick = () => {
    setIsMonthlyModalOpen(true);
  };
  
  const handleAnnualClick = () => {
    setIsAnnualModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsMonthlyModalOpen(false);
    setIsAnnualModalOpen(false);
    onStartTrial();
  };

  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] text-center mb-6">
          SUBSCRIPTION OPTIONS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Plan */}
          <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-[#F9F5FF]/50 to-white p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#5D4154]">MONTHLY SUBSCRIPTION</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-[#5D4154]">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            
            <div className="p-4">
              <p className="mb-4 text-gray-700">
                Access to all Peritrack features with the flexibility to cancel anytime.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Full access to all tracking features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Lab results organization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Luna AI companion access</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleMonthlyClick}
                variant="outline" 
                className="w-full border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/5"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>
          
          {/* Annual Plan */}
          <div className="border-2 border-[#9b87f5] rounded-xl overflow-hidden relative hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              BEST VALUE
            </div>
            
            <div className="bg-gradient-to-r from-[#F9F5FF]/70 to-white p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-[#5D4154]">ANNUAL SUBSCRIPTION</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-[#5D4154]">$99</span>
                <span className="text-gray-600">/year</span>
                <span className="ml-2 text-sm text-green-600 font-medium">SAVE $20.88!</span>
              </div>
            </div>
            
            <div className="p-4">
              <p className="mb-4 text-gray-700">
                Get 12 months for the price of 10. The most cost-effective option.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">All features in monthly plan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>BONUS:</strong> Quarterly educational Q&A sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><strong>SAVE $20.88</strong> compared to monthly billing</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleAnnualClick}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
        
        {/* User Quote */}
        <blockquote className="bg-[#F9F5FF]/30 p-4 rounded-lg italic text-gray-700 border border-[#9b87f5]/20 max-w-3xl mx-auto">
          "I've spent considerable time and resources trying to understand my symptoms. Having organized information and support would have been invaluable to me."
          <footer className="mt-2 text-right text-sm font-medium text-[#5D4154]">— Jennifer, 48</footer>
        </blockquote>
      </CardContent>
      
      {/* Lead Capture Modals */}
      <LeadCaptureModal
        isOpen={isMonthlyModalOpen}
        onClose={handleModalClose}
        pricingPlan="monthly"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
      />
      
      <LeadCaptureModal
        isOpen={isAnnualModalOpen}
        onClose={handleModalClose}
        pricingPlan="annual"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
      />
    </Card>
  );
};

export default SubscriptionOptions;
