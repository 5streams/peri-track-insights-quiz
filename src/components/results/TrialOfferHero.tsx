
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";
import { saveLead } from "@/utils/leadTracking";

interface TrialOfferHeroProps {
  firstName: string;
  scoreCategory: string;
  onStartTrial: () => void;
}

const TrialOfferHero: React.FC<TrialOfferHeroProps> = ({
  firstName,
  scoreCategory,
  onStartTrial
}) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  const [countdown, setCountdown] = useState('23:59:59');
  const [spotNumber] = useState(Math.floor(Math.random() * 50) + 140); // Random number between 140-190
  const [spotsRemaining] = useState(Math.floor(Math.random() * 20) + 35); // Random number between 35-55
  
  useEffect(() => {
    // Set up countdown timer
    const startCountdown = () => {
      // Get countdown end time (24 hours from now or from localStorage if exists)
      const countdownEndTimeStr = localStorage.getItem('countdownEndTime');
      const endTime = countdownEndTimeStr 
        ? parseInt(countdownEndTimeStr, 10)
        : new Date().getTime() + (24 * 60 * 60 * 1000);
      
      // Save end time to localStorage if not exists
      if (!countdownEndTimeStr) {
        localStorage.setItem('countdownEndTime', endTime.toString());
      }
      
      // Update countdown every second
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        // If countdown is finished, reset it
        if (distance < 0) {
          localStorage.removeItem('countdownEndTime');
          clearInterval(interval);
          startCountdown(); // Restart countdown
          return;
        }
        
        // Calculate hours, minutes, seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Format countdown string
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');
        
        setCountdown(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
      }, 1000);
      
      return () => clearInterval(interval);
    };
    
    startCountdown();
  }, []);
  
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
  
  // Determine key symptoms based on score category
  const getKeySymptoms = () => {
    switch (scoreCategory) {
      case "mild":
        return "mood changes & occasional hot flashes";
      case "moderate":
        return "sleep issues & hormone fluctuations";
      case "severe":
        return "intense symptoms & significant disruption";
      default:
        return "perimenopause symptoms";
    }
  };
  
  return (
    <div className="reveal-section transform opacity-0 mb-10">
      <Card className="border-none shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFECD6] p-6 md:p-10">
            <div className="text-center">
              <div className="bg-[#FF9B85] text-white px-4 py-1.5 rounded-full inline-block font-medium text-sm mb-4 animate-pulse-subtle">
                ⚡ EXCLUSIVE: Your Personalized Dashboard Is Ready
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
                {firstName ? `${firstName}, ` : ""}Your Custom Peritrack System Is Built & Waiting
              </h2>
              
              <p className="text-[#5D4154] mb-6 max-w-2xl mx-auto">
                Based on your assessment, we've pre-configured your personal tracking system with:
              </p>
            </div>
            
            <div className="max-w-xl mx-auto mb-8">
              <div className="space-y-2.5">
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-[#A7C4A0] text-lg font-bold mr-3">✓</span>
                  <div>
                    <strong>Your {scoreCategory.charAt(0).toUpperCase() + scoreCategory.slice(1)} Perimenopause Pattern</strong>
                    <span className="block text-sm text-gray-600">Pre-loaded for immediate tracking</span>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-[#A7C4A0] text-lg font-bold mr-3">✓</span>
                  <div>
                    <strong>Luna AI Tuned to Your Profile</strong>
                    <span className="block text-sm text-gray-600">Personalized responses for {getKeySymptoms()}</span>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-[#A7C4A0] text-lg font-bold mr-3">✓</span>
                  <div>
                    <strong>30-Day Symptom Predictions</strong>
                    <span className="block text-sm text-gray-600">Know your difficult days before they happen</span>
                  </div>
                </div>
                
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-[#A7C4A0] text-lg font-bold mr-3">✓</span>
                  <div>
                    <strong>Custom Doctor Reports</strong>
                    <span className="block text-sm text-gray-600">Professional summaries of your specific symptoms</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 max-w-xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Your personalized setup expires in:</div>
                    <div className="text-[#FF9B85] font-bold text-2xl">{countdown}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
                  <div className="text-center">
                    <div className="font-medium text-[#5D4154]">
                      {spotsRemaining} dashboard spots remaining this month
                    </div>
                    <div className="text-sm text-gray-600">
                      Your quiz reserved spot #{spotNumber}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <Button 
                onClick={handleAnnualTrial}
                className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-bold px-6 py-6 rounded-lg text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all mb-3"
              >
                CLAIM MY PERSONALIZED DASHBOARD - FREE
              </Button>
              <p className="text-sm text-gray-600">7-day free trial • No credit card required • Cancel anytime</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-[#5D4154] text-center mb-4">
                What's Ready in Your Dashboard <span className="text-[#FF9B85]">(Value: $197)</span>:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="bg-[#5D4154] text-white px-2 py-1 rounded inline-block mb-2">$47 Value</div>
                  <h4 className="font-medium text-[#5D4154] mb-1">Pre-loaded Analysis</h4>
                  <p className="text-sm text-gray-600">Your quiz responses analyzed and ready</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="bg-[#5D4154] text-white px-2 py-1 rounded inline-block mb-2">$67 Value</div>
                  <h4 className="font-medium text-[#5D4154] mb-1">Luna AI Configured</h4>
                  <p className="text-sm text-gray-600">AI coach tuned to your hormone pattern</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="bg-[#5D4154] text-white px-2 py-1 rounded inline-block mb-2">$43 Value</div>
                  <h4 className="font-medium text-[#5D4154] mb-1">30-Day Forecast</h4>
                  <p className="text-sm text-gray-600">Predict symptoms before they disrupt</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="bg-[#5D4154] text-white px-2 py-1 rounded inline-block mb-2">$40 Value</div>
                  <h4 className="font-medium text-[#5D4154] mb-1">Doctor Reports</h4>
                  <p className="text-sm text-gray-600">Professional summaries for visits</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
    </div>
  );
};

export default TrialOfferHero;
