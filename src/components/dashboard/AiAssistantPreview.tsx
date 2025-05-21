
import React from "react";
import { MessageSquare, ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface AiAssistantPreviewProps {
  firstName: string;
}

const AiAssistantPreview = ({ firstName }: AiAssistantPreviewProps) => {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardHeader className="bg-[#5D4154]/10 pb-4 flex flex-row justify-between items-center">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <MessageSquare className="h-5 w-5 mr-2 text-[#5D4154]" />
          Luna AI Assistant
        </CardTitle>
        <span className="text-xs bg-[#A7C4A0] text-white px-2 py-1 rounded-full">Available 24/7</span>
      </CardHeader>
      <CardContent className="pt-6 pb-4">
        <div className="flex items-start mb-6">
          <div className="h-8 w-8 rounded-full bg-[#5D4154] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
            <div className="h-4 w-4 bg-[#FFECD6] rounded-full" />
          </div>
          <div className="bg-[#FFECD6]/30 rounded-lg p-4 max-w-[80%]">
            <p className="text-[#5D4154] mb-2">
              Hello {firstName}, I'm Luna, your personal perimenopause assistant. How can I help you today?
            </p>
            <p className="text-[#5D4154] text-sm">
              I can analyze your symptom patterns, answer questions about hormones, or suggest personalized remedies.
            </p>
          </div>
        </div>

        {/* Example conversation to show Luna's capabilities */}
        <div className="flex items-end justify-end mb-6">
          <div className="bg-[#5D4154]/5 rounded-lg p-4 max-w-[80%] mr-3">
            <p className="text-[#5D4154]">
              Why am I having trouble sleeping lately?
            </p>
          </div>
          <div className="h-8 w-8 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mt-1 flex-shrink-0">
            <span className="text-sm text-[#5D4154] font-medium">{firstName.charAt(0)}</span>
          </div>
        </div>
        
        <div className="flex items-start mb-6">
          <div className="h-8 w-8 rounded-full bg-[#5D4154] flex items-center justify-center mr-3 mt-1 flex-shrink-0">
            <div className="h-4 w-4 bg-[#FFECD6] rounded-full" />
          </div>
          <div className="bg-[#FFECD6]/30 rounded-lg p-4 max-w-[80%]">
            <p className="text-[#5D4154] mb-2">
              Based on your recent tracking, I've noticed your sleep disruption correlates with your progesterone fluctuations.
            </p>
            <p className="text-[#5D4154] text-sm mb-2">
              Progesterone helps regulate sleep, and its decline during perimenopause often affects sleep quality. Your pattern shows this typically happens mid-cycle.
            </p>
            <div className="bg-white p-3 rounded border border-[#5D4154]/10 text-sm">
              <p className="font-medium text-[#5D4154] mb-1">Personalized recommendation:</p>
              <p className="text-[#5D4154]/80">Try taking magnesium glycinate (200-300mg) 1 hour before bed on those days when sleep is most disrupted.</p>
            </div>
          </div>
        </div>

        <h4 className="text-sm font-medium text-[#5D4154] mb-2">Ask Luna about:</h4>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            "My symptom patterns", 
            "Hormone fluctuations",
            "Sleep optimization", 
            "Mood changes",
            "Hot flash remedies",
            "Brain fog solutions"
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
      
      <CardFooter className="border-t border-gray-100 pt-4 flex flex-col space-y-3">
        <div className="w-full relative bg-white rounded-full border border-gray-200">
          <input 
            type="text" 
            placeholder="Ask Luna anything..." 
            className="w-full py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-1 focus:ring-[#5D4154]/30"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5D4154] p-1">
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <Button className="w-full bg-[#5D4154] hover:bg-[#5D4154]/90">
          Chat with Luna <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiAssistantPreview;
