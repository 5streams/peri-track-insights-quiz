
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-4">
        Perimenopause Symptoms Quiz: Discover What's Really Happening to Your Body
      </h1>
      
      <p className="text-lg md:text-xl mb-6">
        Take this 2-minute assessment to understand your symptoms
      </p>
      
      <p className="mb-8 text-gray-600">
        7 out of 10 women experience perimenopause symptoms for 4-10 years before menopause begins. Most don't recognize what's happening.
      </p>
      
      <Button 
        onClick={onStart} 
        size="lg" 
        className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white px-8 py-6 text-lg"
      >
        Start My Free Assessment
      </Button>
      
      <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#A7C4A0]" />
          <span className="text-sm">30,000+ women assessed</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#A7C4A0]" />
          <span className="text-sm">Medically reviewed</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#A7C4A0]" />
          <span className="text-sm">100% Private</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
