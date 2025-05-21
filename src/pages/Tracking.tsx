
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar as CalendarIcon, BarChart, ArrowLeft, ArrowRight } from "lucide-react";
import { format, subDays, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import DailySymptomTracker from "@/components/tracking/DailySymptomTracker";
import CycleTracker from "@/components/tracking/CycleTracker";
import TrackingCalendar from "@/components/tracking/TrackingCalendar";
import { Toaster } from "@/components/ui/toaster";

const Tracking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  // Format for consistent date comparison
  const formatDateForComparison = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const goToPreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const goToNextDay = () => {
    const tomorrow = addDays(new Date(), 1);
    // Don't allow selecting future dates
    if (formatDateForComparison(selectedDate) < formatDateForComparison(tomorrow)) {
      setSelectedDate(prev => addDays(prev, 1));
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return formatDateForComparison(date) === formatDateForComparison(today);
  };
  
  const isFutureDate = (date: Date) => {
    const tomorrow = addDays(new Date(), 1);
    return formatDateForComparison(date) >= formatDateForComparison(tomorrow);
  };

  const formattedDate = format(selectedDate, "EEEE, MMMM d, yyyy");
  
  return (
    <div className="min-h-screen bg-[#F9F7F5] flex">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-[#5D4154] font-medium hover:text-[#5D4154]/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Dashboard
          </button>
          <h1 className="font-playfair text-xl font-bold text-[#5D4154] hidden md:block">Symptom Tracking</h1>
          <div></div>
        </header>

        {/* Main Tracking Content */}
        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {/* Date Selection */}
          <div className="bg-white shadow-sm rounded-lg mb-6 p-4">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={goToPreviousDay}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 text-[#5D4154]" />
              </button>
              
              <button 
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarIcon className="h-5 w-5 text-[#5D4154]" />
                <span className="font-medium text-[#5D4154]">{formattedDate}</span>
                {isToday(selectedDate) && (
                  <span className="bg-[#A7C4A0]/20 text-[#A7C4A0] text-xs font-medium px-2 py-1 rounded">Today</span>
                )}
              </button>
              
              <button 
                onClick={goToNextDay}
                className={`p-2 rounded-full ${isFutureDate(selectedDate) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 text-[#5D4154]'}`}
                disabled={isFutureDate(selectedDate)}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            {showCalendar && (
              <div className="mt-4">
                <TrackingCalendar 
                  selectedDate={selectedDate} 
                  onDateChange={setSelectedDate} 
                  onClose={() => setShowCalendar(false)}
                />
              </div>
            )}
          </div>
          
          {/* Symptom Tracker */}
          <DailySymptomTracker selectedDate={selectedDate} />
          
          {/* Cycle Tracker */}
          <div className="mt-6">
            <CycleTracker selectedDate={selectedDate} />
          </div>
          
          {/* View Insights Button */}
          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate("/insights")}
              className="bg-[#5D4154] hover:bg-[#5D4154]/90 gap-2"
            >
              <BarChart className="h-4 w-4" />
              View Your Insights
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              See patterns and receive personalized recommendations
            </p>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Tracking;
