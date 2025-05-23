
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Award, MessageCircle, Star, Clock, Check } from "lucide-react";

const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const [spotsRemaining, setSpotsRemaining] = useState(7);
  
  useEffect(() => {
    // Create a countdown timer
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
  
  const handleStartTrial = () => {
    // Decrease available spots for scarcity
    if (spotsRemaining > 1) {
      setSpotsRemaining(prev => prev - 1);
    }
    
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <>
      {/* Luna AI Support Feature - Enhanced */}
      <Card className="mb-6 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#F9F5FF] to-white border-[#D6BCFA]/50">
        <CardContent className="p-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="md:w-1/3 w-full">
              <div className="bg-[#E5DEFF] p-3 rounded-xl shadow-sm mx-auto md:mx-0 max-w-[200px] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-bl-lg">PREVIEW</div>
                <div className="h-32 w-full rounded-lg bg-[#D6BCFA]/30 flex items-center justify-center mb-2 shadow-inner">
                  <MessageCircle className="h-12 w-12 text-[#9b87f5] animate-pulse" />
                </div>
                <p className="text-[#5D4154] text-sm text-center font-medium">Luna AI Educational Assistant Interface</p>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className="h-5 w-5 text-[#9b87f5]" />
                <h2 className="font-playfair text-lg md:text-xl font-bold text-[#5D4154]">
                  INTRODUCING LUNA AI: YOUR EDUCATIONAL COMPANION
                </h2>
              </div>
              
              <p className="mb-3 text-[#5D4154] font-medium">
                Meet Luna AI, Your Personal Educational Guide for Perimenopause Information
              </p>
              
              <div className="bg-[#E5DEFF]/70 p-3 rounded-lg border border-[#D6BCFA]/30 mb-3">
                <p className="italic text-[#5D4154]/80 text-sm">
                  "It's 3 AM and I'm experiencing anxiety. Can you help me understand what might be happening?"
                </p>
                
                <p className="mt-2 text-xs text-gray-600">
                  This was a message sent to Luna AI by a woman tracking similar patterns. Luna AI's educational response:
                </p>
                
                <div className="bg-white p-2 rounded-lg mt-2 shadow-sm">
                  <p className="text-gray-700 text-xs">
                    "I understand how concerning these moments can be. Based on common perimenopause patterns, hormonal fluctuations can affect sleep and mood, particularly during early morning hours when cortisol levels naturally begin to rise.
                  </p>
                  <p className="text-gray-700 text-xs mt-1">
                    Consider tracking this pattern and discussing it with your healthcare provider. Many women find that gentle breathing exercises before bed can be helpful. Also, keeping your room cooler may support better sleep comfort."
                  </p>
                </div>
              </div>
              
              <p className="mb-2 text-xs md:text-sm text-gray-600">
                Luna AI provides educational information and support:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Educational information about perimenopause</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Remembers your tracking patterns</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Provides lifestyle suggestions and educational content</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Available 24/7 for educational support</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#E5DEFF]/50 p-2 rounded-lg text-xs italic text-[#5D4154]/80 mb-2 border border-[#D6BCFA]/30">
                "Having Luna AI available for educational support has been invaluable. During challenging moments, I can get reliable information and feel more informed about my perimenopause experience."
                <div className="text-right text-xs font-medium mt-1 text-[#5D4154]">— Sarah, 48</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Enhanced Final CTA with Limited Time Offer */}
      <Card className="mb-4 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#5D4154]/95 to-[#5D4154] text-white">
        <CardContent className="p-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-playfair text-xl md:text-2xl font-bold mb-2">
              LIMITED-TIME TRIAL OFFER
            </h2>
            
            <p className="mb-3 text-xs md:text-sm">
              Your personalized tracking solution is ready - begin your journey today:
            </p>
            
            <div className="bg-white/10 p-3 rounded-lg mb-4">
              <h3 className="font-medium text-base mb-2">Your Personalized Tracking Solution Is Ready</h3>
              <p className="text-xs mb-3">Your complete tracking dashboard and Luna AI educational companion are waiting for immediate access:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <h3 className="font-medium text-white/90 mb-1 text-xs md:text-sm">Your Tracking Dashboard</h3>
                  <ul className="space-y-1">
                    {["Personalized tracking system", "Pattern insights", "Symptom monitoring"].map((item, i) => (
                      <li key={i} className="flex items-center text-xs">
                        <Check className="h-3 w-3 mr-1 text-[#A7C4A0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <h3 className="font-medium text-white/90 mb-1 text-xs md:text-sm">Luna AI Educational Support</h3>
                  <ul className="space-y-1">
                    {["24/7 educational assistance", "Lifestyle suggestions", "Personalized information"].map((item, i) => (
                      <li key={i} className="flex items-center text-xs">
                        <Check className="h-3 w-3 mr-1 text-[#A7C4A0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/5 p-3 rounded-lg mb-4 border border-white/10">
                <p className="font-medium text-xs md:text-sm mb-1">Trial Special: Today Only</p>
                <ul className="space-y-1">
                  {[
                    "Access to your tracking dashboard",
                    "Personalized tracking system",
                    "24/7 ACCESS TO LUNA AI educational assistant",
                    "Educational content tailored to your tracking patterns",
                    "Lifestyle suggestions based on your experience"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-xs">
                      <Check className="h-3 w-3 mr-1 text-[#A7C4A0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base font-bold text-white mt-2">COMPREHENSIVE VALUE - YOURS FOR JUST $12.95/MONTH</p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto text-base"
            >
              CLAIM MY FREE TRIAL NOW
            </Button>
            <p className="text-xs text-center mt-1 text-white/80">
              7-day trial then only $12.95/month
            </p>
            
            <div className="mt-3 text-center">
              <div className="bg-white/10 inline-block py-1 px-3 rounded-lg mb-2">
                <Clock className="h-3 w-3 inline-block mr-1 mb-0.5" />
                <span className="text-xs">Trial offer expires in: </span>
                <span className="font-mono font-bold">{formatTime()}</span>
              </div>
              
              <p className="text-xs text-white/70 mb-3">
                Limited availability: Only {spotsRemaining} trial spots remaining today
              </p>
              
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  <span>Privacy Protected</span>
                </div>
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Secure Platform</span>
                </div>
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  <span>Educational Content</span>
                </div>
              </div>
              
              <p className="mt-2 text-xs text-white/70">
                7-day free trial then $12.95/month • Cancel anytime with one click
              </p>
              
              <p className="mt-2 text-xs text-white/60">
                *Individual experiences may vary. This app is for educational and tracking purposes. Always consult with healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinalCTA;
