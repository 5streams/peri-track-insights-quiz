
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center max-w-3xl mx-auto py-8">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-4">
        Perimenopause Symptoms Quiz: Discover What's Really Happening to Your Body
      </h1>
      
      <p className="text-lg md:text-xl mb-4 text-[#7E69AB]">
        Take this 2-minute assessment to understand your symptoms
      </p>
      
      <p className="mb-6 text-[#6E59A5]">
        7 out of 10 women experience perimenopause symptoms for 4-10 years before menopause begins. Most don't recognize what's happening.
      </p>
      
      <Button 
        onClick={onStart} 
        size="lg" 
        className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg transition-colors mb-6"
      >
        Start My Free Assessment
      </Button>
      
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#7E69AB]" />
          <span className="text-sm text-[#6E59A5]">30,000+ women assessed</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#7E69AB]" />
          <span className="text-sm text-[#6E59A5]">Medically reviewed</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-[#7E69AB]" />
          <span className="text-sm text-[#6E59A5]">100% Private</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
