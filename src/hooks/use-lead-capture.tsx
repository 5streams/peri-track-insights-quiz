
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
    console.log("Opening lead modal with:", { source, plan, data });
    setCaptureSource(source);
    setSelectedPlan(plan || null);
    setQuizData(data);
    setIsModalOpen(true);
  };
  
  const closeLeadModal = () => {
    console.log("Closing lead modal");
    setIsModalOpen(false);
  };
  
  const submitLeadData = (firstName: string, email: string, additionalNotes?: string) => {
    console.log("Submitting lead data:", { firstName, email, captureSource, selectedPlan, quizData });
    try {
      const lead = saveLead(
        firstName,
        email,
        captureSource,
        selectedPlan,
        quizData,
        additionalNotes
      );
      console.log("Lead saved successfully:", lead);
      return lead;
    } catch (error) {
      console.error("Failed to save lead:", error);
      throw error;
    }
  };
  
  return {
    isModalOpen,
    selectedPlan,
    captureSource,
    quizData,
    openLeadModal,
    closeLeadModal,
    submitLeadData
  };
}
