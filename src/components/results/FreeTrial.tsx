
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface FreeTrialProps {
  onStartTrial: () => void;
  primaryHormone: string;
  scoreCategory: string;
}

const FreeTrial: React.FC<FreeTrialProps> = ({ onStartTrial, primaryHormone, scoreCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleStartTrial = () => {
    setIsModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    // Continue with the onStartTrial callback
    onStartTrial();
  };
  
  return (
    <Card className="mb-8 bg-gradient-to-r from-[#F9F5FF] to-white reveal-section transform opacity-0">
      <CardContent className="p-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
            Start Your 7-Day Free Trial Today
          </h2>
          
          <p className="mb-6 text-gray-700 max-w-xl mx-auto">
            Track your symptoms, understand your hormones, and regain control with our comprehensive perimenopause management platform.
          </p>
          
          <Button 
            onClick={handleStartTrial}
            size="lg"
            className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white px-8 py-6 text-lg rounded-lg shadow-md"
          >
            Start Your Free Trial
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </CardContent>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={true}
      />
    </Card>
  );
};

export default FreeTrial;
