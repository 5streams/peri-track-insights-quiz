import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import EmailCollection from "@/components/quiz/EmailCollection";
import { toast } from "@/hooks/use-toast";
import { quizQuestions } from "@/data/quizQuestions";
import { calculateResults } from "@/utils/quizUtils";
import ProgressBar from "@/components/quiz/ProgressBar";
import { supabase } from "@/lib/supabaseClient";
import { saveLead } from "@/utils/leadTracking";

const Quiz = () => {
  // Starting with 1 instead of 0 to skip welcome screen
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null); // To store user ID from Supabase
  
  // Remove localStorage for progress and answers
  useEffect(() => {
    // Optional: If you want to re-fetch progress if a user revisits,
    // this would require more complex logic to check Supabase for incomplete quizzes.
    // For now, starting fresh each time unless a full submission occurs.
  }, []);

  // Remove localStorage saving for answers
  useEffect(() => {
    // localStorage.setItem("quizProgress", currentStep.toString());
    // localStorage.setItem("quizAnswers", JSON.stringify(answers));
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
    if (currentQuestion && !answers[currentQuestion.id]) {
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
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Minimum is now 1, not 0
  };
  
  const handleSubmit = async (firstName: string, email: string) => {
    setIsLoading(true);

    try {
      // 1. Save Lead and User information (this also creates/updates the user)
      // The quizResults are passed to saveLead, which will handle saving them to quiz_submissions
      const calculatedQuizResults = calculateResults(answers);
      const lead = await saveLead(
        firstName,
        email,
        "quiz_results",
        undefined, // No pricing tier selected at this point
        calculatedQuizResults, 
        "Lead captured from quiz completion."
      );

      if (!lead || !lead.user_id) {
        toast({
          title: "Error Saving Progress",
          description: "Could not get user information to save answers. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      const currentUserId = lead.user_id;
      setUserId(currentUserId); // Store user ID

      // 2. Save individual quiz answers to Supabase
      const answerPromises = Object.entries(answers).map(([questionId, answer]) => {
        const answerArray = Array.isArray(answer) ? answer : [answer];
        return supabase.from('quiz_answers').insert({
          user_id: currentUserId,
          question_id: questionId,
          answer: answerArray,
        });
      });

      const responses = await Promise.all(answerPromises);
      const anyError = responses.some(res => res.error);

      if (anyError) {
        console.error("Some quiz answers failed to save:", responses.map(r => r.error).filter(Boolean));
        toast({
          title: "Partial Save Error",
          description: "Some of your answers might not have been saved. Please check your results.",
          variant: "default",
        });
        // Continue, as lead and overall submission are likely saved.
      }

      // Store results in localStorage for the results page (can be refactored later)
      localStorage.setItem("quizResults", JSON.stringify(calculatedQuizResults));
      localStorage.setItem("userInfo", JSON.stringify({ firstName, email, userId: currentUserId }));

      // Clear local quiz state (answers, currentStep) as it's now submitted
      // localStorage.removeItem("quizProgress"); // Already removed effect that sets this
      // localStorage.removeItem("quizAnswers"); // Already removed effect that sets this
      setAnswers({}); // Reset local answers state
      // setCurrentStep(1); // Reset step if you want quiz to be fully resettable locally

      toast({
        title: "Quiz Submitted!",
        description: "Your results are being processed.",
      });

      navigate("/results");

    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast({
        title: "Submission Error",
        description: (error as Error).message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate progress percentage for the progress bar
  const totalSteps = quizQuestions.length + 1; // questions + email (no welcome)
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="min-h-screen bg-[#FFECD6]/30 py-8 px-4 md:px-8 lg:px-0">
      <div className="max-w-2xl mx-auto">
        <ProgressBar progress={progressPercentage} />
        
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mt-4">
          {currentStep <= quizQuestions.length ? (
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
        
        {currentStep <= quizQuestions.length && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Question {currentStep} of {quizQuestions.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
