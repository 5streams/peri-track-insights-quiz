
import React from "react";
import { MessageSquare, SendHorizonal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AiAssistantPreviewProps {
  firstName: string;
}

const AiAssistantPreview = ({ firstName }: AiAssistantPreviewProps) => {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-[#FFECD6]/40 pb-4">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <MessageSquare className="h-5 w-5 mr-2 text-[#5D4154]" />
          Talk to Your PeriAssistant
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-[#5D4154]/5 rounded-lg p-4 mb-4 max-w-[80%]">
          <p className="text-[#5D4154]">
            Hello {firstName}! I'm your PeriAssistant. I can help answer questions about your symptoms, hormone patterns, and perimenopause journey. What would you like to know today?
          </p>
        </div>
        
        <div className="space-y-3 py-2">
          <p className="text-sm text-[#5D4154] font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            <button className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-50 transition-colors">
              Why am I having trouble sleeping?
            </button>
            <button className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-50 transition-colors">
              What causes brain fog?
            </button>
            <button className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm hover:bg-gray-50 transition-colors">
              When will I get my next period?
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Ask anything about your symptoms or hormones..."
            className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D4154]/20"
          />
          <Button size="icon" className="rounded-full bg-[#5D4154] hover:bg-[#5D4154]/90">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AiAssistantPreview;
