
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface ResultsHeaderProps {
  firstName: string;
}

const ResultsHeader = ({ firstName }: ResultsHeaderProps) => {
  return (
    <Card className="mb-8 overflow-hidden reveal-section animate-slide-up shadow-lg border-none">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5D4154] via-[#A7C4A0] to-[#FFECD6]"></div>
      <CardHeader className="pb-6 bg-gradient-to-r from-[#5D4154]/5 to-white">
        <CardTitle className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] animate-fade-in">
          {firstName}, You've Been Heard.
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-lg font-medium text-[#5D4154] mb-4">
          What you're experiencing isn't "just aging," "just stress," or "all in your head." The symptoms you've described—both physical and emotional—are real, significant, and have biological causes.
        </p>
        <p className="text-gray-600 mb-4">
          We hear the frustration in your responses. The confusion about why your body seems suddenly unfamiliar. The worry about what these changes mean. The exhaustion from navigating daily life while managing unpredictable symptoms.
        </p>
        <p className="text-gray-600 mb-4">
          You are not alone in this experience. Your responses match patterns we've seen in thousands of women going through this significant transition.
        </p>
        <p className="text-[#5D4154] font-medium">
          Let's start by understanding exactly what's happening in your body and mind right now.
        </p>
      </CardContent>
    </Card>
  );
};

export default ResultsHeader;
