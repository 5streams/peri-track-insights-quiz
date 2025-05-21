
import { useState } from "react";
import { saveLead, Lead } from "@/utils/leadTracking";

export function useLeadCapture() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);
  const [captureSource, setCaptureSource] = useState<'quiz_results' | 'free_trial'>('free_trial');
  const [quizData, setQuizData] = useState<any>(null);
  
  const openLeadModal = (
    source: 'quiz_results' | 'free_trial', 
    plan?: 'monthly' | 'annual',
    data?: any
  ) => {
    setCaptureSource(source);
    setSelectedPlan(plan || null);
    setQuizData(data);
    setIsModalOpen(true);
  };
  
  const closeLeadModal = () => {
    setIsModalOpen(false);
  };
  
  return {
    isModalOpen,
    selectedPlan,
    captureSource,
    quizData,
    openLeadModal,
    closeLeadModal
  };
}
