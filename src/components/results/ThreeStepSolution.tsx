
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Star } from "lucide-react";

const ThreeStepSolution: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "TRACK",
      description: "Identify your unique hormone patterns with our AI-powered system, revealing exactly when your levels fluctuate and what triggers changes."
    },
    {
      number: 2,
      title: "TEST",
      description: "Confirm your specific hormone levels (including those often missed in standard testing) with our comprehensive at-home testing."
    },
    {
      number: 3,
      title: "REBALANCE",
      description: "Follow your personalized protocol designed specifically for your hormone pattern, using nutrition, lifestyle, and targeted support."
    }
  ];

  return (
    <Card className="mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9B85]"></div>
      <CardHeader className="pb-4 border-b">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#FF9B85]/10 flex items-center justify-center mr-4">
            <Star className="h-5 w-5 text-[#5D4154]" />
          </div>
          YOUR 3-STEP PATH TO HORMONE BALANCE
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-[#5D4154] text-white flex items-center justify-center mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#5D4154] mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreeStepSolution;
