
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";

const WarningTimeline: React.FC = () => {
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 border-t-4 border-red-500 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
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
          <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-lg">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-red-700 font-bold">WITHIN 3 MONTHS:</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <span>Your sleep disruptions will likely increase by <span className="font-semibold text-red-600">40-60%</span>, leading to chronic fatigue</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <span>Anxiety episodes typically intensify both in <span className="font-semibold text-red-600">frequency and duration</span></span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <span>Hot flashes often increase to <span className="font-semibold text-red-600">multiple times daily</span></span>
              </li>
            </ul>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-400 p-5 rounded-r-lg">
            <div className="flex items-center mb-3">
              <Clock className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-red-700 font-bold">WITHIN 6-12 MONTHS:</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <span>Your progesterone will likely decline another <span className="font-semibold text-red-600">15-25%</span>, creating a cascade effect</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <span>New symptoms commonly emerge, including <span className="font-semibold text-red-600">joint pain, weight changes, and brain fog</span></span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-red-500 text-xs font-bold">!</span>
                </div>
                <span>Quality of life scores typically drop by <span className="font-semibold text-red-600">30-45%</span> in untreated cases</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-red-100 p-5 rounded-lg border border-red-200">
          <p className="text-[#5D4154] font-medium mb-3">
            The medical system typically waits until symptoms become unbearable before intervention. By then, recovery takes significantly longer and often requires more intensive approaches.
          </p>
          <p className="text-red-700 font-bold text-lg md:text-xl text-center">
            The window for early intervention - which you're in right now - doesn't stay open forever.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WarningTimeline;
