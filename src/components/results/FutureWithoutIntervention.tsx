
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface FutureWithoutInterventionProps {
  firstName: string;
}

const FutureWithoutIntervention = ({ firstName }: FutureWithoutInterventionProps) => {
  return (
    <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9B85]"></div>
      <CardHeader className="pb-4 border-b">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#FF9B85]/10 flex items-center justify-center mr-4">
            <span className="text-[#5D4154]">!</span>
          </div>
          What Happens Next Without Intervention
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-4">For women with your specific symptom pattern, our medical data shows these changes typically follow a predictable path:</p>
        
        <ul className="space-y-4 mb-6">
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
              !
            </div>
            <p>Symptoms often intensify by 40-60% over the next 6-12 months</p>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
              !
            </div>
            <p>New symptoms frequently emerge as hormone fluctuations expand</p>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
              !
            </div>
            <p>The impact on sleep quality typically worsens, creating a cascade effect on energy, cognitive function, and mood</p>
          </li>
          <li className="flex items-start">
            <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
              !
            </div>
            <p>The window for early intervention - when management is simplest - begins to close</p>
          </li>
        </ul>
        
        <p>In our database of over 30,000 women, those who began tracking and managing symptoms at your stage reported dramatically better outcomes than those who waited until symptoms became more severe.</p>
        
        <p className="mt-4 text-lg font-medium text-[#5D4154]">
          {firstName}, you're at a critical decision point in your hormone journey.
        </p>
      </CardContent>
    </Card>
  );
};

export default FutureWithoutIntervention;
