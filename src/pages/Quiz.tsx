
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WelcomeScreen from "@/components/quiz/WelcomeScreen";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import EmailCollection from "@/components/quiz/EmailCollection";
import { toast } from "@/hooks/use-toast";
import { quizQuestions } from "@/data/quizQuestions";
import { calculateResults } from "@/utils/quizUtils";
import ProgressBar from "@/components/quiz/ProgressBar";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Load saved progress from localStorage if available
  useEffect(() => {
    const savedProgress = localStorage.getItem("quizProgress");
    const savedAnswers = localStorage.getItem("quizAnswers");
    
    if (savedProgress) {
      setCurrentStep(parseInt(savedProgress));
    }
    
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quizProgress", currentStep.toString());
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
  }, [currentStep, answers]);
  
  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };
  
  const handleNext = () => {
    const currentQuestion = quizQuestions[currentStep - 1];
    
    // Validate if an answer is required
    if (currentStep > 0 && currentQuestion && !answers[currentQuestion.id]) {
      toast({
        title: "Please answer the question",
        description: "We need your response to provide accurate results.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsLoading(false);
    }, 400);
  };
  
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = (firstName: string, email: string) => {
    setIsLoading(true);
    
    // Save user info along with answers
    const userInfo = {
      firstName,
      email,
      answers,
    };
    
    // Calculate quiz results
    const results = calculateResults(answers);
    
    // Store results and user info
    localStorage.setItem("quizResults", JSON.stringify(results));
    localStorage.setItem("userInfo", JSON.stringify({ firstName, email }));
    
    // Clear progress data
    localStorage.removeItem("quizProgress");
    
    // Navigate to results page
    setTimeout(() => {
      navigate("/results");
      setIsLoading(false);
    }, 800);
  };
  
  // Calculate progress percentage for the progress bar
  const totalSteps = quizQuestions.length + 2; // questions + welcome + email
  const progressPercentage = Math.round((currentStep / (totalSteps - 1)) * 100);
  
  return (
    <div className="min-h-screen bg-[#FFECD6]/30 py-8 px-4 md:px-8 lg:px-0">
      <div className="max-w-2xl mx-auto">
        {currentStep > 0 && (
          <ProgressBar progress={progressPercentage} />
        )}
        
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mt-4">
          {currentStep === 0 ? (
            <WelcomeScreen onStart={handleNext} />
          ) : currentStep <= quizQuestions.length ? (
            <QuizQuestion
              question={quizQuestions[currentStep - 1]}
              answer={answers[quizQuestions[currentStep - 1].id]}
              onChange={handleAnswerChange}
              onNext={handleNext}
              onBack={handleBack}
              isLoading={isLoading}
            />
          ) : (
            <EmailCollection onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </div>
        
        {currentStep > 0 && currentStep <= quizQuestions.length && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Question {currentStep} of {quizQuestions.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
