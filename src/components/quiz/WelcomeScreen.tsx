
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center max-w-3xl mx-auto py-4">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-purple-800 mb-3">
        Perimenopause Symptoms Quiz: Discover What's Really Happening to Your Body
      </h1>
      
      <p className="text-lg md:text-xl mb-3 text-purple-700">
        Take this 2-minute assessment to understand your symptoms
      </p>
      
      <p className="mb-5 text-purple-700">
        7 out of 10 women experience perimenopause symptoms for 4-10 years before menopause begins. Most don't recognize what's happening.
      </p>
      
      <Button 
        onClick={onStart} 
        size="lg" 
        className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-5 text-lg transition-colors mb-5"
      >
        Start My Free Assessment
      </Button>
      
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Check className="h-4 w-4 text-purple-700" />
          <span className="text-sm text-purple-700">30,000+ women assessed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="h-4 w-4 text-purple-700" />
          <span className="text-sm text-purple-700">Medically reviewed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="h-4 w-4 text-purple-700" />
          <span className="text-sm text-purple-700">100% Private</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
