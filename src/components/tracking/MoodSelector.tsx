
import React from "react";
import { Smile, Frown, Meh } from "lucide-react";

interface MoodSelectorProps {
  selectedMood: string | null;
  setSelectedMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => {
  const moods = [
    { id: "good", label: "Good", icon: Smile, color: "text-[#A7C4A0]", bgColor: "bg-[#A7C4A0]/10", borderColor: "border-[#A7C4A0]" },
    { id: "okay", label: "Okay", icon: Meh, color: "text-[#FFBF69]", bgColor: "bg-[#FFBF69]/10", borderColor: "border-[#FFBF69]" },
    { id: "notGreat", label: "Not Great", icon: Frown, color: "text-[#FF9B85]", bgColor: "bg-[#FF9B85]/10", borderColor: "border-[#FF9B85]" },
  ];

  return (
    <div className="flex gap-3">
      {moods.map((mood) => {
        const Icon = mood.icon;
        const isSelected = selectedMood === mood.id;
        
        return (
          <button
            key={mood.id}
            className={`flex-1 py-3 border rounded-lg flex flex-col items-center transition-colors ${
              isSelected 
                ? `border-2 ${mood.borderColor} ${mood.bgColor}` 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedMood(mood.id)}
            type="button"
          >
            <Icon className={`h-6 w-6 ${mood.color} mb-1`} />
            <span className="text-sm">{mood.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
