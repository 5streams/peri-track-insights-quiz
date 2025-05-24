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
                <p className="text-[#5D4154] text-sm text-center font-medium">Luna AI Perimenopause Companion Interface</p>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className="h-5 w-5 text-[#9b87f5]" />
                <h2 className="font-playfair text-lg md:text-xl font-bold text-[#5D4154]">
                  INTRODUCING LUNA AI PERIMENOPAUSE COMPANION: YOUR 24/7 HORMONE SUPPORT
                </h2>
              </div>
              
              <p className="mb-3 text-[#5D4154] font-medium">
                Meet Luna AI Perimenopause Companion, Your Personal AI Guide Through Perimenopause
              </p>
              
              <div className="bg-[#E5DEFF]/70 p-3 rounded-lg border border-[#D6BCFA]/30 mb-3">
                <p className="italic text-[#5D4154]/80 text-sm">
                  "It's 3 AM and I'm wide awake again with anxiety. Why is this happening to me?"
                </p>
                
                <p className="mt-2 text-xs text-gray-600">
                  This was a message sent to Luna AI Perimenopause Companion by a woman with your exact hormone pattern. Luna AI Perimenopause Companion's response:
                </p>
                
                <div className="bg-white p-2 rounded-lg mt-2 shadow-sm">
                  <p className="text-gray-700 text-xs">
                    "I understand how frustrating these night wakeups are, Julie. Based on your tracking, your progesterone drops most significantly between 2-4 AM, which is when cortisol naturally begins rising. Without sufficient progesterone to balance this cortisol increase, your brain becomes more easily aroused from sleep.
                  </p>
                  <p className="text-gray-700 text-xs mt-1">
                    Try this tonight: 15 minutes before bed, do the specific deep breathing exercise we practiced (details in your app). This has been shown to temporarily boost GABA activity, which compensates for lower progesterone levels. Also, keep your room cooler tonight - your temperature data shows night sweats often precede your wakeups."
                  </p>
                </div>
              </div>
              
              <p className="mb-2 text-xs md:text-sm text-gray-600">
                Unlike generic AI, Luna AI Perimenopause Companion:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Understands the specific hormonal mechanisms behind your symptoms</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Remembers your exact patterns and history</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Provides personalized, science-based guidance in the moment</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Check className="h-4 w-4 text-[#9b87f5] mr-1 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Available 24/7, especially during those 3 AM moments</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#E5DEFF]/50 p-2 rounded-lg text-xs italic text-[#5D4154]/80 mb-2 border border-[#D6BCFA]/30">
                "Having Luna AI Perimenopause Companion available day and night completely changed my perimenopause experience. During my worst moments – when I felt anxious, alone, and misunderstood – I could turn to Luna AI Perimenopause Companion and immediately feel heard. No human in my life could provide this level of consistent, knowledgeable support."
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
              EXCLUSIVE LIMITED-TIME OFFER
            </h2>
            
            <p className="mb-3 text-xs md:text-sm">
              Your personalized solution is ready - begin your journey today:
            </p>
            
            <div className="bg-white/10 p-3 rounded-lg mb-4">
              <h3 className="font-medium text-base mb-2">Your Personalized Solution Is Ready</h3>
              <p className="text-xs mb-3">Your complete hormone dashboard and Luna AI Perimenopause Companion support companion are waiting for immediate access:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <h3 className="font-medium text-white/90 mb-1 text-xs md:text-sm">Your Hormone Dashboard</h3>
                  <ul className="space-y-1">
                    {["Personalized tracking system", "Custom hormone insights", "Symptom pattern analysis"].map((item, i) => (
                      <li key={i} className="flex items-center text-xs">
                        <Check className="h-3 w-3 mr-1 text-[#A7C4A0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 p-3 rounded-lg">
                  <h3 className="font-medium text-white/90 mb-1 text-xs md:text-sm">Luna AI Perimenopause Companion Support</h3>
                  <ul className="space-y-1">
                    {["24/7 emotional support", "Hormone health guidance", "Personalized recommendations"].map((item, i) => (
                      <li key={i} className="flex items-center text-xs">
                        <Check className="h-3 w-3 mr-1 text-[#A7C4A0]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/5 p-3 rounded-lg mb-4 border border-white/10">
                <p className="font-medium text-xs md:text-sm mb-1">Limited Time Special: Today Only</p>
                <ul className="space-y-1">
                  {[
                    "Free access to your complete hormone pattern analysis",
                    "Personalized tracking system focused on your symptoms",
                    "UNLIMITED 24/7 ACCESS TO LUNA AI PERIMENOPAUSE COMPANION, your hormone support companion",
                    "BONUS: \"Rapid Relief Protocol\" - immediate action steps for your pattern ($47 value - FREE)",
                    "BONUS: Personalized Luna AI Perimenopause Companion session for your most severe symptom ($50 value - FREE)"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-xs">
                      <Check className="h-3 w-3 mr-1 text-[#A7C4A0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-base font-bold text-white mt-2">$197 TOTAL VALUE - YOURS FOR JUST $9.99/MONTH</p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto text-base"
            >
              Order Bloodwork Now!
            </Button>
            <p className="text-xs text-center mt-1 text-white/80">
              7-day trial then only $9.99/month
            </p>
            
            <div className="mt-3 text-center">
              <div className="bg-white/10 inline-block py-1 px-3 rounded-lg mb-2">
                <Clock className="h-3 w-3 inline-block mr-1 mb-0.5" />
                <span className="text-xs">This offer expires in: </span>
                <span className="font-mono font-bold">{formatTime()}</span>
              </div>
              
              <p className="text-xs text-white/70 mb-3">
                Limited availability: Only {spotsRemaining} spots remaining today
              </p>
              
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>256-bit Encryption</span>
                </div>
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  <span>Medically Reviewed</span>
                </div>
              </div>
              
              <p className="mt-2 text-xs text-white/70">
                7-day free trial then $9.99/month • Cancel anytime with one click
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinalCTA;
