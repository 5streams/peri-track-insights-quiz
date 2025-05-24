
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ResultsSolutionSection: React.FC = () => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0 bg-gradient-to-br from-green-50 to-white border-l-4 border-green-400">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-6">
          The Peritrack Solution
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-[#5D4154] mb-4">Smart Symptom Tracking:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Track 30+ symptoms in under 30 seconds daily</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>AI identifies patterns your doctor might miss</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Predict symptom flare-ups before they happen</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Generate professional reports for doctor visits</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#5D4154] mb-4">Personalized Relief:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Custom nutrition recommendations for your symptoms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Exercise plans adapted to your hormone cycle</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>24/7 Luna AI coach for instant support</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Evidence-based strategies that actually work</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-lg font-semibold text-[#5D4154] mb-2">
            The Result: From Chaos to Control
          </p>
          <p className="text-gray-700">
            Instead of feeling like a victim of unpredictable symptoms, you become the expert on your own body. 
            You'll know what's coming, why it's happening, and exactly what to do about it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSolutionSection;
