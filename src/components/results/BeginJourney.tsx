
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeginJourneyProps {
  firstName: string;
}

const BeginJourney = ({ firstName }: BeginJourneyProps) => {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Card className="bg-gradient-to-br from-[#5D4154] to-[#5D4154]/90 text-white mb-8 reveal-section transform translate-y-4 opacity-0 shadow-xl">
      <CardHeader className="pb-4 border-b border-white/20">
        <CardTitle className="font-playfair text-2xl font-semibold text-center">
          BEGIN YOUR JOURNEY TO BALANCE AND RENEWAL
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6 text-lg text-center">
          {firstName}, you've already taken the most important step—seeking to understand what's happening in your body and mind.
        </p>
        
        <p className="mb-6 text-center">
          Your personalized dashboard is ready to guide you through every step of your hormone rebalancing journey. Your free 7-day trial gives you complete access to:
        </p>
        
        <div className="bg-white/10 p-6 rounded-lg mb-8 backdrop-blur-sm">
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
              <span>Daily tracking tools designed for your specific symptoms</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
              <span>AI-powered pattern recognition to identify your unique fluctuations</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
              <span>Personalized insights connecting your physical and emotional experiences</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
              <span>Supportive guidance for both symptom management and emotional well-being</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
              <span>Complete educational resources to deepen your understanding</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
              <span>Tools to prepare for productive healthcare conversations</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-sm mb-4">No credit card required—experience the full platform with our complete support.</p>
          <Button 
            onClick={handleStartTrial}
            className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            START MY FREE 7-DAY TRIAL
          </Button>
        </div>
        
        <div className="text-center">
          <p className="font-medium text-lg mb-4">You don't have to navigate this journey alone.</p>
          <p className="mb-6">
            Join our community of over 30,000 women who have transformed their perimenopause experience from confusion and frustration to understanding and empowerment.
          </p>
          
          <div className="border-l-4 border-[#A7C4A0] pl-4 py-2 italic text-white/90 text-left max-w-2xl mx-auto">
            "Starting Peritrack was the moment everything changed for me. For the first time, I felt truly understood and supported. The combination of tracking, insights, and education helped me reclaim not just my physical health, but my emotional well-being."
            <div className="text-right font-medium mt-2 text-white/80">- Rebecca, 46</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-white/20 pt-6">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
            HIPAA Compliant
          </div>
          <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
            256-bit Encryption
          </div>
          <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
            Medically Reviewed
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BeginJourney;
