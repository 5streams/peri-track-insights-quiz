
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Guarantee: React.FC = () => {
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300 bg-[#5D4154]/5">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center mb-4">
          <Shield className="h-6 w-6 text-[#A7C4A0] mr-2" />
          <h3 className="text-xl md:text-2xl font-bold text-[#5D4154]">
            Our Promise to You
          </h3>
        </div>
        
        <p className="text-[#5D4154] mb-3">
          If you don't gain valuable insights about your hormone pattern within your first 7 days, 
          simply let us know and we'll extend your free trial by another full week.
        </p>
        
        <p className="text-[#5D4154]">
          And if you decide to continue after your trial, you're protected by our 30-day money-back guarantee - 
          if you don't see significant improvement in your symptoms within your first month, we'll refund every penny.
        </p>
      </CardContent>
    </Card>
  );
};

export default Guarantee;
