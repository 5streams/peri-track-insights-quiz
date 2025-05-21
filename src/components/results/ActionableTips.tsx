
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface ActionableTipsProps {
  primaryHormone: string;
  symptoms: string[];
  scoreCategory: string;
}

const ActionableTips: React.FC<ActionableTipsProps> = ({
  primaryHormone,
  symptoms = [],
  scoreCategory
}) => {
  // Skip for minimal symptoms
  if (scoreCategory === "minimal") {
    return null;
  }
  
  // Format the symptom names for display
  const formatSymptom = (symptom: string) => {
    return symptom
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Changes|Symptoms/g, '')
      .trim().toLowerCase();
  };

  // Get top symptoms
  const formattedSymptoms = symptoms.map(s => formatSymptom(s)).slice(0, 3);
  
  // Define tips based on common symptoms
  const getTipsForSymptom = (symptom: string) => {
    const symptomLower = symptom.toLowerCase();
    
    if (symptomLower.includes('hot flash') || symptomLower.includes('flush') || symptomLower.includes('vasomotor')) {
      return {
        title: "Quick Relief for Hot Flashes",
        tip: "Wear lightweight, breathable layers and keep a small portable fan nearby. Avoid triggers like spicy foods, alcohol, and caffeine, especially in the evening.",
        timing: "Implement during times when hot flashes are most frequent (often late afternoon and evening)."
      };
    }
    
    if (symptomLower.includes('sleep') || symptomLower.includes('insomnia') || symptomLower.includes('waking')) {
      return {
        title: "Better Sleep Tonight",
        tip: "Lower your bedroom temperature to 65-68°F, avoid screens 1 hour before bed, and try a 5-minute deep breathing exercise when you lay down.",
        timing: "Begin your sleep routine 90 minutes before your target bedtime."
      };
    }
    
    if (symptomLower.includes('mood') || symptomLower.includes('anxiety') || symptomLower.includes('depression') || symptomLower.includes('irritable')) {
      return {
        title: "Stabilize Your Mood",
        tip: "Practice a 2-minute breathing exercise: inhale for 4 counts, hold for 7, exhale for 8. This activates your parasympathetic nervous system to reduce anxiety.",
        timing: "Use this technique at the first sign of mood change, and proactively during known trigger times."
      };
    }
    
    if (symptomLower.includes('fatigue') || symptomLower.includes('energy') || symptomLower.includes('tired')) {
      return {
        title: "Boost Your Energy",
        tip: "Take a 10-minute walk outdoors to naturally raise your energy levels. Morning light exposure also helps regulate your circadian rhythm for better sleep.",
        timing: "Most effective when done within 1 hour of waking, and again during afternoon energy dips."
      };
    }
    
    if (symptomLower.includes('brain fog') || symptomLower.includes('memory') || symptomLower.includes('focus') || symptomLower.includes('cognitive')) {
      return {
        title: "Clear Brain Fog",
        tip: "Try alternating mental tasks with brief physical movement. Even 60 seconds of movement increases blood flow to the brain, improving focus and cognition.",
        timing: "Implement this technique every 25-30 minutes during concentrated work periods."
      };
    }
    
    if (symptomLower.includes('menstrual') || symptomLower.includes('period') || symptomLower.includes('bleeding')) {
      return {
        title: "Manage Period Changes",
        tip: "Track your cycle, even when irregular, and keep supplies with you at all times. Consider iron-rich foods if experiencing heavier periods.",
        timing: "Prepare supplies 3-5 days before your expected period, even if your cycle has been unpredictable."
      };
    }
    
    // Default tip based on hormone
    if (primaryHormone.toLowerCase() === "estradiol") {
      return {
        title: "Support Estrogen Balance",
        tip: "Include 1-2 servings of phytoestrogen foods like flaxseeds, legumes or soy in your daily diet. Many women report symptom improvement within 14-21 days.",
        timing: "Most effective when consumed consistently throughout your cycle, not just during specific phases."
      };
    } else if (primaryHormone.toLowerCase() === "progesterone") {
      return {
        title: "Support Progesterone Levels",
        tip: "Manage stress with a 5-minute daily meditation. High cortisol from chronic stress can further decrease progesterone levels.",
        timing: "Most beneficial when practiced daily, with additional sessions during high-stress periods."
      };
    } else {
      return {
        title: "Support Hormone Balance",
        tip: "Aim for 7-8 hours of quality sleep, which is essential for optimal hormone production. Create a consistent sleep schedule, even on weekends.",
        timing: "Maintain the same sleep and wake times every day, even on weekends if possible."
      };
    }
  };
  
  // Get 3 unique tips based on user's symptoms and primary hormone
  const getTips = () => {
    const tips: {title: string, tip: string, timing: string}[] = [];
    
    // First try to get tips for their actual symptoms
    for (let symptom of formattedSymptoms) {
      const tipObj = getTipsForSymptom(symptom);
      
      // Check if we already have this tip
      if (tips.findIndex(t => t.title === tipObj.title) === -1) {
        tips.push(tipObj);
        
        // If we have 3 tips, we're done
        if (tips.length === 3) break;
      }
    }
    
    // If we don't have enough tips, add default based on hormone
    if (tips.length < 3) {
      const defaultTip = getTipsForSymptom(primaryHormone);
      if (tips.findIndex(t => t.title === defaultTip.title) === -1) {
        tips.push(defaultTip);
      }
    }
    
    // Add generic tips if still needed
    const genericTips = [
      {
        title: "Manage Stress",
        tip: "Practice 5 minutes of deep breathing or meditation daily to reduce cortisol, which can worsen perimenopause symptoms.",
        timing: "Most effective when done first thing in the morning and during stressful moments throughout the day."
      },
      {
        title: "Support Your Body",
        tip: "Stay hydrated with 8-10 glasses of water daily and limit alcohol, which can trigger hot flashes and disrupt sleep.",
        timing: "Spread water intake throughout the day, with extra hydration during exercise and hot weather."
      },
      {
        title: "Gentle Movement",
        tip: "Even 15 minutes of walking, yoga, or stretching can improve mood, sleep, and energy levels during perimenopause.",
        timing: "Can be done anytime, but particularly effective during periods of low energy or mood changes."
      }
    ];
    
    let i = 0;
    while (tips.length < 3 && i < genericTips.length) {
      if (tips.findIndex(t => t.title === genericTips[i].title) === -1) {
        tips.push(genericTips[i]);
      }
      i++;
    }
    
    return tips;
  };
  
  const tips = getTips();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-[#5D4154] mb-4">
          3 Steps to Start Feeling Better Today
        </h3>
        
        <p className="text-[#5D4154]/80 mb-5">
          While your complete personalized plan will provide comprehensive relief, here are three simple steps you can take <strong>right now</strong> to begin addressing your symptoms:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="bg-[#FFECD6]/20 p-4 rounded-lg border border-[#FFECD6] hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-[#5D4154] mb-2">{index + 1}. {tip.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{tip.tip}</p>
              <p className="text-xs font-medium text-[#5D4154] mt-2 border-t border-[#FFECD6] pt-2">
                <span className="font-semibold">Timing:</span> {tip.timing}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center bg-[#5D4154]/5 p-4 rounded-lg">
          <p className="text-[#5D4154] font-medium mb-2">
            Want faster, personalized relief? Your complete hormone balancing plan is waiting for you.
          </p>
          <div className="flex items-start mt-3 text-xs text-[#5D4154]/80 bg-white p-3 rounded border border-[#5D4154]/10">
            <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
            <p>
              MEDICAL NOTICE: These suggestions are based on your reported symptoms and common approaches for women with similar patterns. 
              They are for educational purposes only and not intended as medical advice. Always consult with your healthcare provider 
              before making changes to your health regimen.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionableTips;
