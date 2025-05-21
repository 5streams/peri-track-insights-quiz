
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PerimenopauseExplanationProps {
  scoreCategory: string;
}

const PerimenopauseExplanation: React.FC<PerimenopauseExplanationProps> = ({ scoreCategory }) => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] mb-4">
          WHAT IS PERIMENOPAUSE?
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="flex-1">
            <p className="mb-4 text-gray-700">
              Perimenopause is the transitional phase before menopause when hormones can fluctuate. 
              While menopause itself is defined as 12 months without a period, 
              <strong className="text-[#5D4154]"> perimenopause typically lasts several years</strong> and 
              may involve various symptoms that are sometimes overlooked.
            </p>
            
            <p className="text-gray-700">
              Hormone levels during this time may not simply decline but can fluctuate, potentially 
              creating symptoms that come and go. This fluctuation pattern explains why your symptoms 
              might feel unpredictable or cyclical.
            </p>
          </div>
          
          <div className="flex-1 bg-[#F9F5FF]/30 p-5 rounded-lg border border-[#9b87f5]/20">
            <h3 className="font-medium text-[#5D4154] mb-3">Key Facts About Perimenopause</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#9b87f5] text-white flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                  ✓
                </div>
                <p className="text-gray-700">Can begin up to <strong>10 years before menopause</strong>, sometimes starting in late 30s or early 40s</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#9b87f5] text-white flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                  ✓
                </div>
                <p className="text-gray-700">Symptoms often <strong>fluctuate in intensity</strong> rather than remaining constant</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#9b87f5] text-white flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                  ✓
                </div>
                <p className="text-gray-700"><strong>Standard blood tests</strong> might not catch hormone fluctuations if taken on a "good day"</p>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-[#9b87f5] text-white flex items-center justify-center flex-shrink-0 mt-0.5 mr-2 text-xs font-bold">
                  ✓
                </div>
                <p className="text-gray-700">The experience varies widely—some women have <strong>minimal symptoms</strong> while others experience <strong>significant disruption</strong></p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="font-medium text-[#5D4154] mb-3">Common Challenges During This Transition</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-medium text-[#5D4154] mb-2">Medical Recognition</h4>
              <p className="text-sm text-gray-600">Many women report that their perimenopause symptoms aren't always fully recognized or addressed in routine medical visits</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-medium text-[#5D4154] mb-2">Testing Limitations</h4>
              <p className="text-sm text-gray-600">Standard hormone testing may not capture fluctuations that occur throughout the month or from day to day</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-medium text-[#5D4154] mb-2">Finding What Works</h4>
              <p className="text-sm text-gray-600">Many women need to try multiple approaches before finding effective management strategies for their unique symptoms</p>
            </div>
          </div>
        </div>
        
        {scoreCategory !== "mild" && (
          <blockquote className="mt-6 pt-4 border-t border-gray-100 italic text-gray-600">
            "I spent years wondering about my symptoms before learning about perimenopause. 
            I wish I'd had more information sooner."
            <footer className="mt-2 text-right text-sm font-medium text-[#5D4154]">— Sarah, 47</footer>
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
};

export default PerimenopauseExplanation;
