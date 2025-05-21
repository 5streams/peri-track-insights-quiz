
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle } from "lucide-react";
import { getDynamicContent } from "@/utils/scoreCalculation";

interface FreeTrialProps {
  onStartTrial: () => void;
  primaryHormone: string;
  scoreCategory: string;
}

const FreeTrial: React.FC<FreeTrialProps> = ({ onStartTrial, primaryHormone, scoreCategory }) => {
  const [timeRemaining, setTimeRemaining] = useState({ hours: 24, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Create a countdown timer for urgency
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        if (totalSeconds <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return { hours, minutes, seconds };
      });
    }, 1000);
    
    // Clean up timer
    return () => clearInterval(timer);
  }, []);
  
  // Format time as HH:MM:SS
  const formatTime = () => {
    const { hours, minutes, seconds } = timeRemaining;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get timeframe based on primary hormone
  const getTimeframe = () => {
    switch (primaryHormone) {
      case "progesterone": return "14-21";
      case "estrogen": return "16-24";
      case "testosterone": return "12-18";
      default: return "14-21";
    }
  };
  
  // Get dynamic content based on score category
  const { ctaText } = getDynamicContent(scoreCategory);

  return (
    <Card className="mb-8 reveal-section transform opacity-0 border-none overflow-hidden bg-gradient-to-br from-[#5D4154] to-[#7E69AB] text-white shadow-xl">
      <CardContent className="p-6 md:p-8">
        <h2 className="font-playfair text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
          INTRODUCING PERITRACK: PERIMENOPAUSE SUPPORT SYSTEM
        </h2>
        
        <p className="text-center text-base md:text-lg mb-4 max-w-3xl mx-auto">
          Based on feedback from thousands of women in perimenopause support communities, 
          we've created a platform designed to help you navigate this transition with confidence.
        </p>
        
        <div className="bg-white/10 rounded-lg p-3 mb-5 text-center">
          <p className="font-medium flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2 inline-block" />
            This offer expires in: <span className="font-mono ml-2 font-bold">{formatTime()}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
            <h3 className="font-semibold text-lg mb-3">Personalized Tracking & Insights</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Track numerous perimenopause symptoms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Identify patterns in your symptoms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Understand your personal health trends</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
            <h3 className="font-semibold text-lg mb-3">Lab Results Organization</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Upload bloodwork results for easy storage</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Learn about hormone tests & ranges</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Store your complete lab history</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
            <h3 className="font-semibold text-lg mb-3">Luna AI Support</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">AI companion with perimenopause info</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Guidance related to your symptoms</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Help preparing for healthcare visits</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
            <h3 className="font-semibold text-lg mb-3">Complete Support System</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Educational content about hormones</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Evidence-based symptom management</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Connect with women having similar experiences</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-6">START YOUR FREE 7-DAY TRIAL TODAY</h3>
          
          <div className="mb-8">
            <Button 
              onClick={onStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-semibold py-3 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              START MY FREE TRIAL NOW
            </Button>
            
            <p className="mt-3 text-white/80">
              {ctaText} No credit card required.
            </p>
          </div>
          
          <p className="text-center text-sm md:text-base max-w-xl mx-auto">
            Women with your hormone pattern who begin tracking now typically see initial improvement within {getTimeframe()} days.
          </p>
          
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-sm">
              <strong>BONUS RESOURCES INCLUDED:</strong> "Perimenopause Information Guide", "Symptom Management Information", 
              and "Lab Testing Information"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTrial;
