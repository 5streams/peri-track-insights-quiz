
import React from "react";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface AiAssistantPreviewProps {
  firstName: string;
}

const AiAssistantPreview = ({ firstName }: AiAssistantPreviewProps) => {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-[#5D4154]/10 pb-4">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <MessageSquare className="h-5 w-5 mr-2 text-[#5D4154]" />
          Luna AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start mb-6">
          <div className="h-8 w-8 rounded-full bg-[#5D4154] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
            <div className="h-4 w-4 bg-[#FFECD6] rounded-full" />
          </div>
          <div className="bg-[#FFECD6]/30 rounded-lg p-4 max-w-[80%]">
            <p className="text-[#5D4154]">
              Hello {firstName}, I'm Luna, your personal perimenopause assistant. How can I help you today?
            </p>
          </div>
        </div>

        <h4 className="text-sm font-medium text-[#5D4154] mb-2">Ask Luna about:</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            "My symptom patterns", 
            "Hormone fluctuations",
            "Sleep optimization", 
            "Mood changes"
          ].map((topic, index) => (
            <button
              key={index}
              className="text-left text-sm bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-100 pt-4">
        <Button className="w-full bg-[#5D4154] hover:bg-[#5D4154]/90">
          Chat with Luna <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiAssistantPreview;
