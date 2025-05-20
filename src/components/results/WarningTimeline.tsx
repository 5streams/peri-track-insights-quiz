
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Clock } from "lucide-react";

const WarningTimeline: React.FC = () => {
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 border-t-4 border-red-500">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-7 w-7 text-red-500" />
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-red-600">
            WARNING: YOUR HORMONE DECLINE TIMELINE
          </h2>
        </div>
        
        <p className="mb-4 text-[#5D4154] font-medium text-base md:text-lg">
          What Happens Next Without Intervention
        </p>
        
        <p className="mb-4 text-gray-600">
          Based on data from thousands of women with your exact hormone pattern, here's what typically occurs:
        </p>
        
        <div className="space-y-6 mb-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <h3 className="text-red-700 font-bold mb-2">WITHIN 3 MONTHS:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Your sleep disruptions will likely increase by 40-60%, leading to chronic fatigue</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Anxiety episodes typically intensify both in frequency and duration</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Hot flashes often increase to multiple times daily</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <h3 className="text-red-700 font-bold mb-2">WITHIN 6-12 MONTHS:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Your progesterone will likely decline another 15-25%, creating a cascade effect</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>New symptoms commonly emerge, including joint pain, weight changes, and brain fog</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Quality of life scores typically drop by 30-45% in untreated cases</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-100 p-4 rounded-lg border border-red-200">
          <p className="text-[#5D4154] font-medium mb-2">
            The medical system typically waits until symptoms become unbearable before intervention. By then, recovery takes significantly longer and often requires more intensive approaches.
          </p>
          <p className="text-red-700 font-bold">
            The window for early intervention - which you're in right now - doesn't stay open forever.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningTimeline;
