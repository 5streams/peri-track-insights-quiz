
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ResultsStatsSection: React.FC = () => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0 bg-gradient-to-br from-[#F9F5FF] to-white">
      <CardContent className="p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
            Join Thousands of Women Who've Transformed Their Perimenopause Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real results from women who've taken control of their symptoms with smart tracking and personalized guidance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-[#9b87f5] mb-2">15,000+</div>
            <div className="text-lg font-semibold text-[#5D4154] mb-2">Women Helped</div>
            <p className="text-gray-600 text-sm">Successfully managing their perimenopause symptoms</p>
          </div>
          
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-[#9b87f5] mb-2">78%</div>
            <div className="text-lg font-semibold text-[#5D4154] mb-2">Better Sleep</div>
            <p className="text-gray-600 text-sm">Report improved sleep quality within 30 days</p>
          </div>
          
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-[#9b87f5] mb-2">71%</div>
            <div className="text-lg font-semibold text-[#5D4154] mb-2">Mood Stability</div>
            <p className="text-gray-600 text-sm">Experience improved emotional balance</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsStatsSection;
