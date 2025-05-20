
import React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RecentSymptomsSummary = () => {
  // Mock data for calendar
  const currentDate = new Date();
  const month = currentDate.toLocaleDateString('en-US', { month: 'long' });
  
  // Create past 14 days for display
  const pastTwoWeeks = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 13 + i);
    
    // Random symptom intensity for demo
    const hasPhysicalSymptoms = Math.random() > 0.5;
    const hasEmotionalSymptoms = Math.random() > 0.6;
    const physicalIntensity = hasPhysicalSymptoms ? Math.floor(Math.random() * 3) + 1 : 0;
    const emotionalIntensity = hasEmotionalSymptoms ? Math.floor(Math.random() * 3) + 1 : 0;
    
    return {
      date: date.getDate(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: date.toDateString() === new Date().toDateString(),
      physicalIntensity,
      emotionalIntensity,
      hasData: hasPhysicalSymptoms || hasEmotionalSymptoms
    };
  });

  return (
    <Card className="border-none shadow-md h-full">
      <CardHeader className="bg-[#A7C4A0]/10 pb-4">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <Calendar className="h-5 w-5 mr-2 text-[#5D4154]" />
          Recent Symptoms
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-[#5D4154]" />
          </button>
          <h3 className="font-medium text-[#5D4154]">{month}</h3>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight className="h-5 w-5 text-[#5D4154]" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="text-xs font-medium text-gray-500">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {pastTwoWeeks.map((day, i) => (
            <div 
              key={i}
              className={`relative aspect-square rounded-md flex flex-col items-center justify-center ${
                day.isToday ? 'bg-[#5D4154]/10' : ''
              } ${day.hasData ? 'cursor-pointer hover:bg-gray-100' : ''}`}
            >
              <span className={`text-sm ${day.isToday ? 'font-bold text-[#5D4154]' : ''}`}>
                {day.date}
              </span>
              
              {/* Physical symptom indicator */}
              {day.physicalIntensity > 0 && (
                <div className={`mt-1 h-1.5 w-1.5 rounded-full ${
                  day.physicalIntensity === 1 ? 'bg-[#A7C4A0]/60' :
                  day.physicalIntensity === 2 ? 'bg-[#A7C4A0]/80' : 
                  'bg-[#A7C4A0]'
                }`}></div>
              )}
              
              {/* Emotional symptom indicator */}
              {day.emotionalIntensity > 0 && (
                <div className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                  day.emotionalIntensity === 1 ? 'bg-[#FF9B85]/60' :
                  day.emotionalIntensity === 2 ? 'bg-[#FF9B85]/80' : 
                  'bg-[#FF9B85]'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-5 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center">
            <span className="inline-block h-3 w-3 rounded-full bg-[#A7C4A0] mr-2"></span>
            <span className="text-gray-600">Physical</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block h-3 w-3 rounded-full bg-[#FF9B85] mr-2"></span>
            <span className="text-gray-600">Emotional</span>
          </div>
        </div>

        <div className="mt-5 bg-[#FFECD6]/20 p-3 rounded-lg text-center">
          <p className="text-sm text-[#5D4154]">
            Track consistently for more accurate pattern detection.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSymptomsSummary;
