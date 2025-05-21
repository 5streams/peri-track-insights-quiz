
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Save } from "lucide-react";
import MoodSelector from "@/components/tracking/MoodSelector";
import SymptomSelector from "@/components/tracking/SymptomSelector";
import { useToast } from "@/hooks/use-toast";

interface DailySymptomTrackerProps {
  selectedDate: Date;
}

const DailySymptomTracker: React.FC<DailySymptomTrackerProps> = ({ selectedDate }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [physicalSymptoms, setPhysicalSymptoms] = useState<string[]>([]);
  const [emotionalSymptoms, setEmotionalSymptoms] = useState<string[]>([]);
  const [sleepSymptoms, setSleepSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSaveTracking = () => {
    // In a real app, this would save to a database
    // Could use localStorage for a demo version
    
    // Create a tracking object
    const trackingData = {
      date: selectedDate.toISOString(),
      mood: selectedMood,
      symptoms: {
        physical: physicalSymptoms,
        emotional: emotionalSymptoms,
        sleep: sleepSymptoms
      },
      notes
    };
    
    // Save to localStorage as demonstration
    const existingData = localStorage.getItem("trackingData");
    const trackingHistory = existingData ? JSON.parse(existingData) : [];
    
    // Remove any existing entry for this date
    const filteredHistory = trackingHistory.filter(
      (item: any) => new Date(item.date).toDateString() !== selectedDate.toDateString()
    );
    
    // Add the new entry
    localStorage.setItem(
      "trackingData", 
      JSON.stringify([...filteredHistory, trackingData])
    );
    
    toast({
      title: "Tracking saved",
      description: "Your symptom data has been saved successfully.",
      action: <Check className="h-4 w-4 text-green-500" />
    });
  };

  return (
    <Card className="bg-white shadow-sm border-none">
      <CardHeader className="bg-[#FFECD6]/30 pb-4">
        <CardTitle className="font-playfair text-xl text-[#5D4154] flex items-center">
          Daily Symptom Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="mb-6">
          <h3 className="text-[#5D4154] font-medium mb-3">How are you feeling today?</h3>
          <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
        </div>
        
        <Tabs defaultValue="physical" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="physical" className="text-xs sm:text-sm">Physical Symptoms</TabsTrigger>
            <TabsTrigger value="emotional" className="text-xs sm:text-sm">Emotional & Cognitive</TabsTrigger>
            <TabsTrigger value="sleep" className="text-xs sm:text-sm">Sleep & Energy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="physical" className="mt-0">
            <SymptomSelector 
              category="physical"
              selectedSymptoms={physicalSymptoms} 
              setSelectedSymptoms={setPhysicalSymptoms} 
              expanded={true} 
            />
          </TabsContent>
          
          <TabsContent value="emotional" className="mt-0">
            <SymptomSelector 
              category="emotional"
              selectedSymptoms={emotionalSymptoms} 
              setSelectedSymptoms={setEmotionalSymptoms} 
              expanded={true} 
            />
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-0">
            <SymptomSelector 
              category="sleep"
              selectedSymptoms={sleepSymptoms} 
              setSelectedSymptoms={setSleepSymptoms} 
              expanded={true} 
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <h3 className="text-[#5D4154] font-medium mb-3">Journal Notes</h3>
          <Textarea
            placeholder="Record any additional thoughts, observations, or details about your day..."
            className="min-h-[120px] border-gray-200"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={handleSaveTracking}
          className="w-full mt-6 bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Tracking Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailySymptomTracker;
