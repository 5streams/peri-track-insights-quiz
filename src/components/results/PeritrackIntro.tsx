
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface PeritrackIntroProps {
  onStartTrial: () => void;
}

const PeritrackIntro: React.FC<PeritrackIntroProps> = ({ onStartTrial }) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('23:59:38');
  const navigate = useNavigate();

  useEffect(() => {
    // Set up countdown timer
    const interval = setInterval(() => {
      const [hours, minutes, seconds] = timeRemaining.split(':').map(Number);
      let newSeconds = seconds - 1;
      let newMinutes = minutes;
      let newHours = hours;
      
      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }
      
      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }
      
      if (newHours < 0) {
        newHours = 23;
      }
      
      setTimeRemaining(`${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeRemaining]);

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
    // Continue with the onStartTrial callback
    onStartTrial();
  };

  return (
    <Card className="mb-8 reveal-section transform opacity-0 bg-[#5D4154] text-white overflow-hidden">
      <CardContent className="p-6 md:p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          INTRODUCING PERITRACK: PERIMENOPAUSE SUPPORT SYSTEM
        </h2>
        
        <p className="mb-6 max-w-3xl mx-auto">
          Based on feedback from thousands of women in perimenopause support communities, we've 
          created a platform designed to help you navigate this transition with confidence.
        </p>
        
        <div className="bg-white/10 p-3 rounded-lg mb-6 inline-block">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">This offer expires in: </span>
            <span className="font-mono font-bold ml-2">{timeRemaining}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Personalized Tracking & Insights */}
          <div className="bg-white/10 p-4 rounded-lg text-left">
            <h3 className="font-medium mb-3">Personalized Tracking & Insights</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Track numerous perimenopause symptoms</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Identify patterns in your symptoms</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Understand your personal health trends</span>
              </li>
            </ul>
          </div>
          
          {/* Lab Results Organization */}
          <div className="bg-white/10 p-4 rounded-lg text-left">
            <h3 className="font-medium mb-3">Lab Results Organization</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Upload bloodwork results for easy storage</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Learn about hormone tests & ranges</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Store your complete lab history</span>
              </li>
            </ul>
          </div>
          
          {/* Luna AI Support */}
          <div className="bg-white/10 p-4 rounded-lg text-left">
            <h3 className="font-medium mb-3">Luna AI Perimenopause Companion Support</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">AI companion with perimenopause info</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Guidance related to your symptoms</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Help preparing for healthcare visits</span>
              </li>
            </ul>
          </div>
          
          {/* Complete Support System */}
          <div className="bg-white/10 p-4 rounded-lg text-left">
            <h3 className="font-medium mb-3">Complete Support System</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Educational content about hormones</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Evidence-based symptom management</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">Connect with women having similar experiences</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Trial Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-6">
          {/* Monthly Option */}
          <div className="bg-white/10 rounded-lg p-5 hover:bg-white/20 transition-all">
            <h3 className="font-semibold text-lg mb-2">Monthly Plan</h3>
            <div className="text-2xl font-bold mb-3">$9.99<span className="text-sm font-normal opacity-80">/month</span></div>
            
            <ul className="mb-5 text-left">
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                <span className="text-sm">Full access to all features</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                <span className="text-sm">Unlimited symptom tracking</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                <span className="text-sm">Luna AI Perimenopause Companion support</span>
              </li>
            </ul>
            
            <Button 
              onClick={handleMonthlyTrial}
              variant="outline"
              className="w-full border-[#A7C4A0] text-white hover:bg-[#A7C4A0] hover:text-[#5D4154] transition-colors"
            >
              START MY FREE TRIAL NOW
            </Button>
          </div>
          
          {/* Annual Option */}
          <div className="bg-white/10 rounded-lg p-5 border-2 border-[#A7C4A0] hover:bg-white/20 transition-all relative">
            <div className="absolute top-0 right-0 bg-[#A7C4A0] text-[#5D4154] text-xs px-2 py-1 rounded-bl-lg font-bold">
              BEST VALUE
            </div>
            
            <h3 className="font-semibold text-lg mb-2">Annual Plan</h3>
            <div className="text-2xl font-bold mb-3">
              $99<span className="text-sm font-normal opacity-80">/year</span>
              <span className="text-sm text-[#A7C4A0] font-semibold ml-2">Save 20%</span>
            </div>
            
            <ul className="mb-5 text-left">
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                <span className="text-sm">All features in monthly plan</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                <span className="text-sm">Save 20% compared to monthly</span>
              </li>
              <li className="flex items-center gap-2 mb-2">
                <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                <span className="text-sm">Priority customer support</span>
              </li>
            </ul>
            
            <Button 
              onClick={handleAnnualTrial}
              className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-[#5D4154]"
            >
              START MY FREE TRIAL NOW
            </Button>
          </div>
        </div>
        
        <p className="text-lg font-semibold mb-2">START YOUR FREE 7-DAY TRIAL TODAY</p>
        
        <p className="text-sm opacity-80">
          Women with your hormone pattern who begin tracking now typically see initial improvement within 10-14 days.
        </p>
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

export default PeritrackIntro;
