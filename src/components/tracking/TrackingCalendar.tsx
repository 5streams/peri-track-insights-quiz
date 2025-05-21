
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { addDays } from "date-fns";

interface TrackingCalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

const TrackingCalendar: React.FC<TrackingCalendarProps> = ({ selectedDate, onDateChange, onClose }) => {
  const tomorrow = addDays(new Date(), 1);
  
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-md p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[#5D4154] font-medium">Select Date</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) onDateChange(date);
          onClose();
        }}
        disabled={(date) => date >= tomorrow}
        className="rounded-md border"
      />
    </div>
  );
};

export default TrackingCalendar;
