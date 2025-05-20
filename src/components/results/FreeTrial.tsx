
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

const FreeTrial: React.FC = () => {
  const navigate = useNavigate();
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
  
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  const benefits = [
    {
      title: "Complete Hormone Pattern Analysis",
      description: "Understand your unique hormone balance and how it affects your symptoms",
      value: 97
    },
    {
      title: "Personalized Symptom-Relief Protocol",
      description: "Specific recommendations tailored to your most bothersome symptoms",
      value: 89
    },
    {
      title: "Luna AI 24/7 Support",
      description: "Your personal hormone coach to answer questions anytime, day or night",
      value: 79
    },
    {
      title: "Rapid Relief Protocol",
      description: "Immediate action steps for your most pressing symptoms",
      value: 47
    }
  ];
  
  // Calculate total value
  const totalValue = benefits.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#5D4154] to-[#5D4154]/90 text-white shadow-xl border-none">
      <CardContent className="p-5 md:p-8">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center mb-2 md:mb-3">
          Your Personalized Relief Plan Is Ready
        </h2>
        
        <div className="bg-white/10 rounded-lg p-3 mb-5 text-center">
          <p className="font-medium flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2 inline-block" />
            This offer expires in: <span className="font-mono ml-2 font-bold">{formatTime()}</span>
          </p>
        </div>
        
        <p className="text-center text-base md:text-lg mb-5 md:mb-6">
          Start your <strong>7-Day FREE Trial</strong> and unlock your complete hormone solution:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 md:mb-7">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors border border-white/5">
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#A7C4A0] mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm md:text-base">{benefit.title}</h3>
                <p className="text-white/80 text-xs md:text-sm mt-1">{benefit.description}</p>
                <p className="text-[#A7C4A0] text-xs md:text-sm mt-1">${benefit.value} value</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/20 p-4 rounded-lg text-center mb-6">
          <p className="font-medium">
            Total Value: <span className="line-through opacity-70">${totalValue}</span>
            <span className="text-xl md:text-2xl font-bold ml-2">FREE</span>
          </p>
          <p className="text-sm text-white/80 mt-1">Then just $14/month if you choose to continue</p>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={handleStartTrial}
            className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-semibold py-3 px-6 md:px-8 rounded-full text-base md:text-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto"
          >
            START MY FREE TRIAL NOW
          </Button>
          
          <div className="mt-4 text-center">
            <p className="text-xs md:text-sm text-white/80 font-bold">
              Just 30 seconds to begin. No credit card required.
            </p>
            <p className="mt-2 text-xs text-white/60">
              79% of women see noticeable improvement within 16-24 days
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTrial;
