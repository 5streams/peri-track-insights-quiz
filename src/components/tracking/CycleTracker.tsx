
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, Calendar as CalendarIcon, Save, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CycleTrackerProps {
  selectedDate: Date;
}

const CycleTracker: React.FC<CycleTrackerProps> = ({ selectedDate }) => {
  const [flowIntensity, setFlowIntensity] = useState<number[]>([0]);
  const [cycleDayType, setCycleDayType] = useState<string | null>(null);
  const { toast } = useToast();

  // Load existing data when the selected date changes
  useEffect(() => {
    loadCycleData();
  }, [selectedDate]);

  const loadCycleData = () => {
    try {
      const existingData = localStorage.getItem("cycleData");
      if (!existingData) return;
      
      const cycleHistory = JSON.parse(existingData);
      const dateData = cycleHistory.find(
        (item: any) => new Date(item.date).toDateString() === selectedDate.toDateString()
      );
      
      if (dateData) {
        setCycleDayType(dateData.cycleDayType);
        setFlowIntensity([dateData.flowIntensity || 0]);
      } else {
        // Reset form if no data exists for this date
        setCycleDayType(null);
        setFlowIntensity([0]);
      }
    } catch (error) {
      console.error("Error loading cycle data:", error);
    }
  };

  const cycleOptions = [
    { value: "period", label: "Period", color: "bg-[#FF9B85]" },
    { value: "spotting", label: "Spotting", color: "bg-[#FF9B85]/30" },
    { value: "ovulation", label: "Ovulation", color: "bg-[#A7C4A0]" },
    { value: "fertile", label: "Fertile Window", color: "bg-[#A7C4A0]/30" },
    { value: "none", label: "No Bleeding", color: "bg-gray-200" },
  ];

  const getFlowLabel = (intensity: number) => {
    if (intensity === 0) return "None";
    if (intensity === 1) return "Very Light";
    if (intensity === 2) return "Light";
    if (intensity === 3) return "Medium";
    if (intensity === 4) return "Heavy";
    return "Very Heavy";
  };

  const handleSaveCycleData = () => {
    try {
      // Create a cycle data object
      const cycleData = {
        date: selectedDate.toISOString(),
        cycleDayType: cycleDayType,
        flowIntensity: flowIntensity[0]
      };
      
      // Save to localStorage
      const existingData = localStorage.getItem("cycleData");
      const cycleHistory = existingData ? JSON.parse(existingData) : [];
      
      // Remove any existing entry for this date
      const filteredHistory = cycleHistory.filter(
        (item: any) => new Date(item.date).toDateString() !== selectedDate.toDateString()
      );
      
      localStorage.setItem(
        "cycleData", 
        JSON.stringify([...filteredHistory, cycleData])
      );
      
      toast({
        title: "Cycle data saved",
        description: "Your cycle information has been updated.",
        action: <Check className="h-4 w-4 text-green-500" />
      });
    } catch (error) {
      console.error("Error saving cycle data:", error);
      toast({
        title: "Error saving data",
        description: "There was a problem saving your cycle data.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-white shadow-sm border-none">
      <CardHeader className="bg-[#FFECD6]/30 pb-4">
        <CardTitle className="font-playfair text-xl text-[#5D4154] flex items-center justify-between">
          <span>Cycle Tracking</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Info className="h-4 w-4 text-[#5D4154]/70" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Tracking your cycle alongside your symptoms helps identify hormone pattern connections. 
                  Even during perimenopause when cycles become irregular, this data is valuable.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="mb-6">
          <h3 className="text-[#5D4154] font-medium mb-3">Cycle Day Type</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {cycleOptions.map(option => (
              <Button
                key={option.value}
                variant="outline"
                className={`border-2 justify-start ${
                  cycleDayType === option.value 
                    ? "border-[#5D4154]" 
                    : "border-gray-200"
                }`}
                onClick={() => setCycleDayType(option.value)}
              >
                <div className={`w-3 h-3 rounded-full ${option.color} mr-2`}></div>
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {(cycleDayType === "period" || cycleDayType === "spotting") && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#5D4154] font-medium">Flow Intensity</h3>
              <Badge variant="outline" className="bg-[#FF9B85]/10 text-[#FF9B85] border-[#FF9B85]/20">
                {getFlowLabel(flowIntensity[0])}
              </Badge>
            </div>
            
            <Slider
              defaultValue={[0]}
              max={5}
              step={1}
              value={flowIntensity}
              onValueChange={setFlowIntensity}
              className="mb-2"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>None</span>
              <span>Light</span>
              <span>Medium</span>
              <span>Heavy</span>
              <span>Very Heavy</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
          
          <Button
            onClick={handleSaveCycleData}
            className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white gap-2"
          >
            <Save className="h-4 w-4" />
            Save Cycle Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CycleTracker;
