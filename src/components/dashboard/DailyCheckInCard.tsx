
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Check, Plus, Smile, Frown, Meh, Calendar as CalendarIcon, Clock, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SymptomSelector from "@/components/tracking/SymptomSelector";
import MoodSelector from "@/components/tracking/MoodSelector";

const DailyCheckInCard = () => {
  const [checkInDone, setCheckInDone] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isFullEntryOpen, setIsFullEntryOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const timeOfDay = () => {
    const hour = today.getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };
  
  const greetingMessage = () => {
    const greeting = `Good ${timeOfDay()}!`;
    return greeting;
  };

  const handleQuickCheckIn = () => {
    if (!selectedMood) {
      toast({
        title: "Mood selection required",
        description: "Please select how you're feeling today before submitting",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save the check-in data to a backend
    setCheckInDone(true);
    toast({
      title: "Check-in complete!",
      description: `You've logged ${selectedSymptoms.length} symptoms today. Keep it up!`,
    });
  };

  const handleOpenFullEntry = () => {
    // Instead of opening the dialog, navigate to the tracking page
    navigate("/tracking");
  };

  const handleFullEntrySubmit = () => {
    // In a real app, this would save the comprehensive check-in data
    setCheckInDone(true);
    setIsFullEntryOpen(false);
    toast({
      title: "Comprehensive check-in complete!",
      description: "Your detailed symptom data has been recorded.",
    });
  };

  const handleUpdateEntry = () => {
    // Navigate to the tracking page for updates
    navigate("/tracking");
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
              Your tracking streak: <span className="font-medium">3 days</span>. Come back tomorrow to continue.
            </p>
            <p className="text-sm bg-[#FFECD6]/30 p-3 rounded-lg mb-6">
              <span className="font-medium">Insight:</span> We've noticed you've reported sleep issues 3 times this week, which often happens during this phase of your cycle.
            </p>
            <Button
              variant="outline"
              onClick={handleUpdateEntry}
              className="border-[#5D4154]/20 text-[#5D4154]"
            >
              Update Today's Entry
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-[#5D4154] font-medium mb-1">{formattedDate}</p>
                <p className="text-gray-600">
                  {greetingMessage()} How are you feeling today?
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#FFECD6]/50 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-[#5D4154]/70" />
              </div>
            </div>

            <div className="mb-5">
              <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-medium text-[#5D4154] mb-2">Common symptoms</h3>
              <SymptomSelector 
                selectedSymptoms={selectedSymptoms} 
                setSelectedSymptoms={setSelectedSymptoms} 
              />
            </div>

            <div className="mb-5">
              <h3 className="text-sm font-medium text-[#5D4154] mb-2">Notes (optional)</h3>
              <Textarea 
                placeholder="Anything else you'd like to note about today..." 
                className="resize-none border-gray-200"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90"
                onClick={handleQuickCheckIn}
              >
                Quick Check-In
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-[#5D4154]/20 text-[#5D4154]"
                onClick={handleOpenFullEntry}
              >
                Full Entry
              </Button>
            </div>
            
            <div className="mt-4 text-xs text-[#5D4154]/60 flex items-start">
              <Info className="h-3.5 w-3.5 mr-1 flex-shrink-0 mt-0.5" />
              <p>Your daily check-ins help power your personalized hormone insights</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyCheckInCard;
