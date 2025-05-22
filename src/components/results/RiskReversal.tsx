
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield } from "lucide-react";

const RiskReversal: React.FC = () => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-7 w-7 text-[#A7C4A0] mr-2" />
          <h3 className="text-xl font-bold text-[#5D4154]">ZERO RISK TRIAL</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0" />
            <span className="text-gray-700">No credit card required for 7-day trial</span>
          </div>
          
          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0" />
            <span className="text-gray-700">One-click cancellation anytime</span>
          </div>
          
          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0" />
            <span className="text-gray-700">30-day money-back guarantee after trial</span>
          </div>
          
          <div className="flex items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0" />
            <span className="text-gray-700">Keep all reports even if you cancel</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskReversal;
