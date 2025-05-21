
import React, { useState } from "react";
import { Plus, X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SymptomSelectorProps {
  category?: string;
  selectedSymptoms: string[];
  setSelectedSymptoms: (symptoms: string[]) => void;
  expanded?: boolean;
}

interface SymptomCategory {
  [key: string]: string[];
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({
  category, 
  selectedSymptoms, 
  setSelectedSymptoms,
  expanded = false
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(expanded);
  
  // Common symptoms by category
  const symptomCategories: SymptomCategory = {
    physical: [
      "Hot Flashes", 
      "Night Sweats", 
      "Vaginal Dryness/Discomfort", 
      "Joint Pain", 
      "Muscle Pain", 
      "Weight Changes", 
      "Headaches", 
      "Migraines",
      "Heart Palpitations",
      "Dizziness",
      "Irregular Periods"
    ],
    emotional: [
      "Mood Swings", 
      "Anxiety", 
      "Irritability", 
      "Depression", 
      "Brain Fog", 
      "Memory Issues",
      "Difficulty Concentrating", 
      "Overwhelm",
      "Emotional Sensitivity"
    ],
    sleep: [
      "Sleep Disruptions", 
      "Fatigue", 
      "Energy Fluctuations", 
      "Insomnia", 
      "Early Waking",
      "Night Sweats", 
      "Restless Sleep"
    ]
  };
  
  // Default to showing a mix of common symptoms if no category is specified
  const defaultSymptoms = [
    "Hot Flashes/Night Sweats", 
    "Sleep Disruptions", 
    "Mood Changes", 
    "Irregular Periods",
    "Brain Fog/Cognitive Changes", 
    "Fatigue/Energy Fluctuations", 
    "Vaginal Dryness/Discomfort",
    "Joint/Muscle Pain", 
    "Weight Changes", 
    "Headaches/Migraines"
  ];
  
  // Determine which symptoms to display based on category
  const getDisplaySymptoms = () => {
    if (category && symptomCategories[category]) {
      return symptomCategories[category];
    }
    return defaultSymptoms;
  };
  
  const displaySymptoms = getDisplaySymptoms();
  const displayCount = showAll ? displaySymptoms.length : Math.min(4, displaySymptoms.length);
  
  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };
  
  // Filter symptoms if search term is entered
  const filteredSymptoms = displaySymptoms.filter(symptom => 
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display a grid or list based on expanded state
  return (
    <div>
      {expanded && (
        <div className="mb-3">
          <Input 
            type="search"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-200"
          />
        </div>
      )}
    
      {selectedSymptoms.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedSymptoms.map(symptom => (
            <Badge 
              key={symptom} 
              variant="outline"
              className="bg-[#5D4154]/5 text-[#5D4154] hover:bg-[#5D4154]/10 cursor-pointer"
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    
      <div className={`${expanded ? 'grid grid-cols-1 sm:grid-cols-2' : 'grid grid-cols-2'} gap-2`}>
        {filteredSymptoms.slice(0, displayCount).map((symptom, index) => {
          const isSelected = selectedSymptoms.includes(symptom);
          
          return (
            <button 
              key={index}
              className={`text-left py-2 px-3 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors ${
                isSelected ? 'border-[#A7C4A0] bg-[#A7C4A0]/10' : 'border-gray-200'
              }`}
              onClick={() => toggleSymptom(symptom)}
            >
              <span className="text-sm">{symptom}</span>
              {isSelected ? (
                <Check className="h-4 w-4 text-[#A7C4A0]" />
              ) : (
                <Plus className="h-4 w-4 text-gray-400" />
              )}
            </button>
          );
        })}
      </div>
      
      {!showAll && displaySymptoms.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-xs text-[#5D4154] hover:bg-[#5D4154]/5 w-full"
          onClick={() => setShowAll(true)}
        >
          Show all symptoms <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      )}
      
      {showAll && !expanded && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-xs text-[#5D4154] hover:bg-[#5D4154]/5 w-full"
          onClick={() => setShowAll(false)}
        >
          Show fewer <ChevronUp className="h-3 w-3 ml-1" />
        </Button>
      )}
      
      {expanded && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-xs border-dashed border-[#5D4154]/30 text-[#5D4154] hover:bg-[#5D4154]/5"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add custom symptom
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Add Custom Symptom</h4>
              <Input 
                placeholder="Enter symptom name" 
                className="border-gray-200"
              />
              <Button 
                size="sm"
                className="w-full bg-[#5D4154] hover:bg-[#5D4154]/90 mt-2"
              >
                Add Symptom
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default SymptomSelector;
