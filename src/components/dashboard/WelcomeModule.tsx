
import React from "react";
import { Button } from "@/components/ui/button";

interface WelcomeModuleProps {
  firstName: string;
  trialDaysLeft: number;
}

const WelcomeModule = ({ firstName, trialDaysLeft }: WelcomeModuleProps) => {
  // Format today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="bg-[#FFECD6]/30 rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h1 className="font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-1">
            Welcome back, {firstName}
          </h1>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        
        {trialDaysLeft > 0 ? (
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-lg shadow-sm flex items-center text-sm">
            <div className="mr-4">
              <p className="font-medium text-[#5D4154]">Free Trial</p>
              <p className="text-gray-600">{trialDaysLeft} days remaining</p>
            </div>
            <Button 
              size="sm"
              className="bg-[#5D4154] hover:bg-[#5D4154]/90 whitespace-nowrap"
            >
              Upgrade Now
            </Button>
          </div>
        ) : null}
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-white rounded-lg shadow-sm flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mr-4">
            <div className="h-5 w-5 bg-[#A7C4A0] rounded-full" />
          </div>
          <div>
            <h3 className="font-medium text-[#5D4154]">Today's Check-In</h3>
            <p className="text-sm text-gray-600">Track your symptoms</p>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-sm flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#FF9B85]/20 flex items-center justify-center mr-4">
            <div className="h-5 w-5 bg-[#FF9B85] rounded-full" />
          </div>
          <div>
            <h3 className="font-medium text-[#5D4154]">Hormone Insights</h3>
            <p className="text-sm text-gray-600">View your patterns</p>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-sm flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#5D4154]/20 flex items-center justify-center mr-4">
            <div className="h-5 w-5 bg-[#FFECD6] rounded-full" />
          </div>
          <div>
            <h3 className="font-medium text-[#5D4154]">Luna AI</h3>
            <p className="text-sm text-gray-600">Get support & guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModule;
