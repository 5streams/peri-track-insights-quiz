
import React from "react";
import { Button } from "@/components/ui/button";
import { useLeadCapture } from "@/hooks/use-lead-capture";

interface SubscriptionOptionsProps {
  onStartTrial: () => void;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({ onStartTrial }) => {
  const { openLeadModal } = useLeadCapture();
  
  const handleStartTrial = () => {
    console.log("Start trial button clicked in SubscriptionOptions");
    onStartTrial();
  };

  return (
    <div className="my-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
          Start Your Perimenopause Journey Today
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of women who have taken control of their perimenopause symptoms with our comprehensive tracking and support system.
        </p>
      </div>
      
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#5D4154] p-4 text-white text-center">
          <h3 className="font-bold text-xl">7-Day Free Trial</h3>
          <p className="text-white/80">Try Peritrack risk-free</p>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#5D4154] font-medium">Monthly Plan</span>
            <span className="font-bold text-[#5D4154]">$9.99/month</span>
          </div>
          
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Full access to the Peritrack app</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Personalized symptom tracking</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">AI-powered insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Luna AI companion</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-700">Cancel anytime</span>
            </li>
          </ul>
          
          <Button 
            onClick={handleStartTrial}
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6] transition-colors"
          >
            Start Free Trial Now
          </Button>
          
          <p className="text-xs text-center mt-4 text-gray-500">
            No credit card required. After the trial, continue for $9.99/month or cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOptions;
