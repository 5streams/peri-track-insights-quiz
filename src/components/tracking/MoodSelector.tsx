
import React from "react";
import { Smile, Frown, Meh } from "lucide-react";

interface MoodSelectorProps {
  selectedMood: string | null;
  setSelectedMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => {
  const moods = [
    { id: "good", label: "Good", icon: Smile, color: "text-[#A7C4A0]", bgHover: "hover:bg-[#A7C4A0]/10" },
    { id: "okay", label: "Okay", icon: Meh, color: "text-[#FFBF69]", bgHover: "hover:bg-[#FFBF69]/10" },
    { id: "notGreat", label: "Not Great", icon: Frown, color: "text-[#FF9B85]", bgHover: "hover:bg-[#FF9B85]/10" },
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
              mood.bgHover
            } ${
              isSelected 
                ? `border-2 border-${mood.color.replace('text-', '')} bg-${mood.color.replace('text-', '')}/10` 
                : 'border-gray-200'
            }`}
            onClick={() => setSelectedMood(mood.id)}
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
