
import React, { useState } from "react";
import { Calendar, Check, Plus, Smile, Frown, Meh } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DailyCheckInCard = () => {
  const [checkInDone, setCheckInDone] = useState(false);
  
  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleQuickCheckIn = () => {
    setCheckInDone(true);
    // In a real app, this would save to a backend
  };

  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader className="bg-[#FFECD6]/30 pb-4">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <Calendar className="h-5 w-5 mr-2 text-[#5D4154]" />
          Daily Check-In
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {checkInDone ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-[#A7C4A0]" />
            </div>
            <h3 className="font-playfair text-lg font-medium text-[#5D4154] mb-2">
              You're all checked in for today!
            </h3>
            <p className="text-gray-600 mb-6">
              Come back tomorrow to continue tracking your journey.
            </p>
            <Button
              variant="outline"
              onClick={() => setCheckInDone(false)}
              className="border-[#5D4154]/20 text-[#5D4154]"
            >
              Update Today's Entry
            </Button>
          </div>
        ) : (
          <>
            <p className="text-[#5D4154] font-medium mb-1">{formattedDate}</p>
            <p className="text-gray-600 mb-5">
              How are you feeling today? Take a moment to check in.
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#5D4154] mb-2">How's your mood?</h3>
              <div className="flex gap-3">
                <button className="flex-1 py-3 border border-gray-200 rounded-lg flex flex-col items-center hover:bg-[#A7C4A0]/10 transition-colors">
                  <Smile className="h-6 w-6 text-[#A7C4A0] mb-1" />
                  <span className="text-sm">Good</span>
                </button>
                <button className="flex-1 py-3 border border-gray-200 rounded-lg flex flex-col items-center hover:bg-[#FFBF69]/10 transition-colors">
                  <Meh className="h-6 w-6 text-[#FFBF69] mb-1" />
                  <span className="text-sm">Okay</span>
                </button>
                <button className="flex-1 py-3 border border-gray-200 rounded-lg flex flex-col items-center hover:bg-[#FF9B85]/10 transition-colors">
                  <Frown className="h-6 w-6 text-[#FF9B85] mb-1" />
                  <span className="text-sm">Not Great</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#5D4154] mb-2">Common symptoms</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Sleep issues", "Mood changes", "Brain fog", "Low energy"].map((symptom, index) => (
                  <button 
                    key={index}
                    className="text-left py-2 px-3 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="text-sm">{symptom}</span>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90"
                onClick={handleQuickCheckIn}
              >
                Quick Check-In
              </Button>
              <Button variant="outline" className="flex-1 border-[#5D4154]/20 text-[#5D4154]">
                Full Entry
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyCheckInCard;
