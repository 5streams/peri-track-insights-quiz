
import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const loadingSteps = [
    "Analyzing your quiz responses...",
    "Calculating your hormone patterns...",
    "Identifying your symptom triggers...",
    "Generating personalized insights...",
    "Preparing your comprehensive assessment...",
    "Finalizing your results..."
  ];

  useEffect(() => {
    // Progress bar animation
    const timer = setTimeout(() => {
      setProgress(oldProgress => {
        const newProgress = Math.min(oldProgress + 1, 100);
        return newProgress;
      });
    }, 50);

    // Steps animation
    const stepTimer = setInterval(() => {
      setCurrentStep(prevStep => {
        // Hold on the last step when complete
        if (prevStep >= loadingSteps.length - 1) {
          clearInterval(stepTimer);
          return loadingSteps.length - 1;
        }
        return prevStep + 1;
      });
    }, 2500); // Change message every 2.5 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md w-full">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute">
            <Loader className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
          <div className="bg-white rounded-full h-20 w-20 flex items-center justify-center shadow-sm">
            <div className="text-purple-600 font-bold text-xl">
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
        
        <h1 className="font-playfair text-2xl font-semibold text-slate-800 mb-2">
          Creating Your Personalized Results
        </h1>
        
        <p className="text-slate-600 font-medium mb-5 animate-pulse">
          {loadingSteps[currentStep]}
        </p>
        
        <Progress value={progress} className="h-2 bg-slate-200 mb-6">
          <div
            className="h-full bg-purple-600"
            style={{ width: `${progress}%` }}
          ></div>
        </Progress>
        
        <p className="text-slate-500 text-sm">
          Your comprehensive hormone assessment is being prepared based on your unique quiz answers.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
