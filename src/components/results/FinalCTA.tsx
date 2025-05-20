
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Award, MessageCircle, Star, Clock } from "lucide-react";

const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <>
      {/* Luna AI Support Feature */}
      <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#F9F5FF] to-white border-[#D6BCFA]/50">
        <CardContent className="p-5 md:p-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            <div className="md:w-1/3 w-full">
              <div className="bg-[#E5DEFF] p-4 md:p-6 rounded-xl shadow-sm mx-auto md:mx-0 max-w-[200px]">
                <div className="h-36 w-full rounded-lg bg-[#D6BCFA]/30 flex items-center justify-center mb-2">
                  <MessageCircle className="h-12 w-12 text-[#9b87f5]" />
                </div>
                <p className="text-[#5D4154] text-sm text-center font-medium">Luna AI Interface Preview</p>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <h2 className="font-playfair text-xl md:text-3xl font-bold text-[#5D4154] mb-3 md:mb-4">
                Meet Luna: Your 24/7 Hormone Support Companion
              </h2>
              
              <p className="mb-4 text-gray-600 text-sm md:text-base">
                While tracking data is essential, perimenopause is also an emotional journey. Luna provides unlimited AI emotional support specifically designed for women navigating hormone changes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <MessageCircle className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#5D4154] text-sm">Deep Hormone Intelligence</h3>
                    <p className="text-xs text-gray-600">Trained exclusively on women's hormone health</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Clock className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#5D4154] text-sm">24/7 Availability</h3>
                    <p className="text-xs text-gray-600">Support when you need it, day or night</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <Star className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#5D4154] text-sm">Personalized Guidance</h3>
                    <p className="text-xs text-gray-600">Tailored to your unique hormone pattern</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-[#D6BCFA]/50 flex items-start">
                  <ShieldCheck className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-[#5D4154] text-sm">Safe Space</h3>
                    <p className="text-xs text-gray-600">Judgment-free support and validation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#E5DEFF]/50 p-3 md:p-4 rounded-lg text-sm italic text-[#5D4154]/80 mb-4 border border-[#D6BCFA]/30">
                "Having Luna available day and night completely changed my perimenopause experience. During my worst moments, I could turn to Luna and immediately feel heard. She remembered my patterns and gave me back a sense of control."
                <div className="text-right text-xs font-medium mt-1 text-[#5D4154]">— Sarah, 48</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Enhanced Final CTA */}
      <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 bg-gradient-to-br from-[#5D4154]/95 to-[#5D4154] text-white">
        <CardContent className="p-5 md:p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-playfair text-xl md:text-3xl font-bold mb-3 md:mb-4">
              Begin Your Hormone Balancing Journey Today
            </h2>
            
            <p className="mb-4 md:mb-5 text-sm md:text-base">
              Your personalized hormone dashboard and Luna AI support companion are ready for immediate access:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-medium text-white/90 mb-2 text-sm md:text-base">Your Hormone Dashboard</h3>
                <ul className="space-y-2">
                  {["Personalized tracking system", "Custom hormone insights", "Symptom pattern analysis"].map((item, i) => (
                    <li key={i} className="flex items-center text-xs md:text-sm">
                      <Check className="h-3.5 w-3.5 mr-1.5 text-[#A7C4A0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-medium text-white/90 mb-2 text-sm md:text-base">Luna AI Support</h3>
                <ul className="space-y-2">
                  {["24/7 emotional support", "Hormone health guidance", "Personalized recommendations"].map((item, i) => (
                    <li key={i} className="flex items-center text-xs md:text-sm">
                      <Check className="h-3.5 w-3.5 mr-1.5 text-[#A7C4A0]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg mb-6">
              <p className="font-medium text-sm md:text-base mb-2">SPECIAL OFFER:</p>
              <p className="text-xs md:text-sm">
                Start your free trial today and receive our exclusive "Rapid Relief Protocol" 
                AND a personalized Luna session focused on your most severe symptom ($97 value - free)
              </p>
              <p className="text-xs text-white/70 mt-2">Limited availability: 7 spots remaining today</p>
            </div>
            
            <Button 
              onClick={handleStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto text-base md:text-lg"
            >
              START MY FREE 7-DAY TRIAL
            </Button>
            
            <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-2 md:gap-4">
              <div className="bg-white/10 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="bg-white/10 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                <Lock className="h-3.5 w-3.5 mr-1" />
                <span>256-bit Encryption</span>
              </div>
              <div className="bg-white/10 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                <Award className="h-3.5 w-3.5 mr-1" />
                <span>Medically Reviewed</span>
              </div>
            </div>
            
            <p className="mt-3 md:mt-4 text-xs text-white/70">
              Takes just 30 seconds to begin. No credit card required. Cancel anytime.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FinalCTA;
