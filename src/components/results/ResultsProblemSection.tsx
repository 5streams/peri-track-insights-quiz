
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const ResultsProblemSection: React.FC = () => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0 bg-gradient-to-br from-red-50 to-white border-l-4 border-red-400">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154]">
            The Problem Most Women Face
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-[#5D4154] mb-4">Without Proper Tracking:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✗</span>
                <span>Symptoms feel random and unpredictable</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✗</span>
                <span>Doctors dismiss concerns or offer generic solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✗</span>
                <span>You try random supplements without seeing results</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">✗</span>
                <span>Emotional symptoms leave you feeling isolated</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-[#5D4154] mb-4">The Real Cost:</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-gray-700 mb-3">
                Without understanding your unique patterns, you're left guessing about your health, 
                feeling frustrated, and potentially missing years of feeling your best.
              </p>
              <p className="font-semibold text-[#5D4154]">
                The average woman spends 2-3 years struggling before finding effective solutions.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsProblemSection;
