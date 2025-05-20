
import React from "react";
import { BarChart, ArrowRight, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HormonePatternInsights = () => {
  // This would normally come from user data
  const hasEnoughData = false;
  
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-[#5D4154]/10 pb-4">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <BarChart className="h-5 w-5 mr-2 text-[#5D4154]" />
          Hormone Pattern Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {hasEnoughData ? (
          // Content when user has enough data for insights
          <>
            <p>Real pattern data would show here</p>
          </>
        ) : (
          // Not enough data state
          <div className="text-center py-4">
            <div className="mx-auto w-16 h-16 border-2 border-dashed border-[#5D4154]/20 rounded-full flex items-center justify-center mb-4">
              <Info className="h-8 w-8 text-[#5D4154]/30" />
            </div>
            <h3 className="font-playfair text-lg font-medium text-[#5D4154] mb-2">
              Insights In Progress
            </h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              We need a few more days of tracking to reveal your unique hormone patterns. Here's what your insights could look like:
            </p>
            
            <div className="relative mt-8 mb-8">
              <div className="h-[150px] w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#FFECD6]/30 to-[#A7C4A0]/30 p-4 relative">
                {/* Sample pattern visualization */}
                <svg className="w-full h-full">
                  <path 
                    d="M0,100 Q50,20 100,60 T200,80 T300,40 T400,90" 
                    fill="none" 
                    stroke="#5D4154" 
                    strokeWidth="2" 
                    strokeOpacity="0.3"
                  />
                  <path 
                    d="M0,120 Q50,70 100,90 T200,60 T300,80 T400,50" 
                    fill="none" 
                    stroke="#A7C4A0" 
                    strokeWidth="2"
                    strokeOpacity="0.3"
                  />
                  <path 
                    d="M0,60 Q50,100 100,80 T200,110 T300,60 T400,70" 
                    fill="none" 
                    stroke="#FF9B85" 
                    strokeWidth="2"
                    strokeOpacity="0.3"
                  />
                </svg>
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                  <div className="bg-white/80 px-4 py-2 rounded-lg shadow-sm">
                    <p className="text-sm font-medium text-[#5D4154]">More tracking needed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90">
                Track Today's Symptoms
              </Button>
              <Button variant="outline" className="border-[#5D4154]/20 text-[#5D4154]">
                Learn About Hormone Patterns
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="text-[#5D4154] font-medium mb-3">Quick Pattern Facts</h3>
          
          <div className="space-y-3">
            <div className="bg-[#FFECD6]/20 p-4 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Did you know?</span> Symptoms that seem unrelated are often connected through the same hormone pathways.
              </p>
            </div>
            <div className="bg-[#A7C4A0]/10 p-4 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Tracking tip:</span> The more consistently you track, the more accurate your pattern detection will be.
              </p>
            </div>
          </div>
          
          <div className="mt-5 text-center">
            <Button variant="ghost" className="text-[#5D4154] hover:bg-[#5D4154]/5">
              View all insights <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HormonePatternInsights;
