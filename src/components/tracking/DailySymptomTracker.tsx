
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Save, Brain, Activity, Moon } from "lucide-react";
import MoodSelector from "@/components/tracking/MoodSelector";
import SymptomSelector from "@/components/tracking/SymptomSelector";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface DailySymptomTrackerProps {
  selectedDate: Date;
}

const DailySymptomTracker: React.FC<DailySymptomTrackerProps> = ({ selectedDate }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [physicalSymptoms, setPhysicalSymptoms] = useState<string[]>([]);
  const [emotionalSymptoms, setEmotionalSymptoms] = useState<string[]>([]);
  const [sleepSymptoms, setSleepSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState("physical");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Load existing data when the selected date changes
  useEffect(() => {
    loadTrackingData();
  }, [selectedDate]);

  const loadTrackingData = () => {
    try {
      const existingData = localStorage.getItem("trackingData");
      if (!existingData) return;
      
      const trackingHistory = JSON.parse(existingData);
      const dateData = trackingHistory.find(
        (item: any) => new Date(item.date).toDateString() === selectedDate.toDateString()
      );
      
      if (dateData) {
        setSelectedMood(dateData.mood);
        setPhysicalSymptoms(dateData.symptoms.physical || []);
        setEmotionalSymptoms(dateData.symptoms.emotional || []);
        setSleepSymptoms(dateData.symptoms.sleep || []);
        setNotes(dateData.notes || "");
      } else {
        // Reset form if no data exists for this date
        setSelectedMood(null);
        setPhysicalSymptoms([]);
        setEmotionalSymptoms([]);
        setSleepSymptoms([]);
        setNotes("");
      }
    } catch (error) {
      console.error("Error loading tracking data:", error);
    }
  };

  const handleSaveTracking = () => {
    try {
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
      
      // Save to localStorage
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
    } catch (error) {
      console.error("Error saving tracking data:", error);
      toast({
        title: "Error saving data",
        description: "There was a problem saving your tracking data.",
        variant: "destructive"
      });
    }
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
        
        {/* Simplified Mobile-Friendly Tab Navigation */}
        <div className="mb-6">
          <div className={`grid ${isMobile ? 'grid-cols-3 gap-1' : 'grid-cols-3 gap-2'} mb-4`}>
            <Button
              variant={activeTab === "physical" ? "default" : "outline"}
              className={`${activeTab === "physical" ? "bg-[#5D4154] text-white" : "text-[#5D4154] border-[#5D4154]/20"} flex items-center justify-center gap-1 h-auto py-2 transition-colors`}
              onClick={() => setActiveTab("physical")}
            >
              <Activity className="h-4 w-4" />
              {isMobile ? "" : "Physical"}
            </Button>
            
            <Button
              variant={activeTab === "emotional" ? "default" : "outline"}
              className={`${activeTab === "emotional" ? "bg-[#5D4154] text-white" : "text-[#5D4154] border-[#5D4154]/20"} flex items-center justify-center gap-1 h-auto py-2 transition-colors`}
              onClick={() => setActiveTab("emotional")}
            >
              <Brain className="h-4 w-4" />
              {isMobile ? "" : "Emotional"}
            </Button>
            
            <Button
              variant={activeTab === "sleep" ? "default" : "outline"}
              className={`${activeTab === "sleep" ? "bg-[#5D4154] text-white" : "text-[#5D4154] border-[#5D4154]/20"} flex items-center justify-center gap-1 h-auto py-2 transition-colors`}
              onClick={() => setActiveTab("sleep")}
            >
              <Moon className="h-4 w-4" />
              {isMobile ? "" : "Sleep"}
            </Button>
          </div>
          
          {/* Tab Labels (Mobile Only) */}
          {isMobile && (
            <div className="text-center text-sm font-medium text-[#5D4154] mb-3">
              {activeTab === "physical" && "Physical Symptoms"}
              {activeTab === "emotional" && "Emotional & Cognitive"}
              {activeTab === "sleep" && "Sleep & Energy"}
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "physical" && (
            <SymptomSelector 
              category="physical"
              selectedSymptoms={physicalSymptoms} 
              setSelectedSymptoms={setPhysicalSymptoms} 
              expanded={true} 
            />
          )}
          
          {activeTab === "emotional" && (
            <SymptomSelector 
              category="emotional"
              selectedSymptoms={emotionalSymptoms} 
              setSelectedSymptoms={setEmotionalSymptoms} 
              expanded={true} 
            />
          )}
          
          {activeTab === "sleep" && (
            <SymptomSelector 
              category="sleep"
              selectedSymptoms={sleepSymptoms} 
              setSelectedSymptoms={setSleepSymptoms} 
              expanded={true} 
            />
          )}
        </div>
        
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
