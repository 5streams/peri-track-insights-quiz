
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Zap } from "lucide-react";

interface ScienceExplanationProps {
  primaryHormone: string;
  symptoms: string[];
}

const ScienceExplanation: React.FC<ScienceExplanationProps> = ({
  primaryHormone,
  symptoms
}) => {
  // Helper function to format symptoms for display
  const formatSymptom = (symptom: string) => {
    return symptom
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Changes|Symptoms/g, '')
      .trim();
  };

  // Get symptom explanation based on hormone and symptom
  const getSymptomExplanation = (symptom: string, index: number) => {
    // Format the symptom for matching
    const formattedSymptom = symptom.toLowerCase();
    
    // Match specific symptoms with explanations
    if (formattedSymptom.includes('sleep') || formattedSymptom.includes('insomnia')) {
      return {
        title: formatSymptom(symptom),
        cause: "This is caused by declining progesterone affecting GABA receptors in your brain's sleep centers.",
        explanation: "Progesterone enhances activity of GABA, your primary calming neurotransmitter. As levels decline, your brain becomes more easily aroused during sleep cycles, especially during the early morning hours.",
        timing: "That's why you may find yourself waking between 2-4 AM, when cortisol begins rising but without sufficient progesterone to buffer its effects."
      };
    }
    else if (formattedSymptom.includes('hot') || formattedSymptom.includes('flash') || formattedSymptom.includes('sweat')) {
      return {
        title: formatSymptom(symptom),
        cause: "This is primarily driven by fluctuating estradiol affecting your hypothalamus, your brain's temperature regulation center.",
        explanation: "Your hypothalamus contains estrogen receptors that help maintain your body's temperature set-point. Sudden drops in estrogen confuse this system, triggering inappropriate cooling responses.",
        timing: "This explains why hot flashes often seem to appear randomly - they're actually tied to specific points in your fluctuating estrogen cycle."
      };
    }
    else if (formattedSymptom.includes('mood') || formattedSymptom.includes('anxiety') || formattedSymptom.includes('irritab')) {
      return {
        title: formatSymptom(symptom),
        cause: "This results from the combined effect of hormone fluctuations on neurotransmitter production and receptor sensitivity.",
        explanation: "Estrogen enhances serotonin and dopamine activity, while progesterone affects GABA receptors. As both fluctuate unpredictably, your brain chemistry changes rapidly, causing mood shifts.",
        timing: "You may notice these changes are more pronounced at specific times in your cycle or under certain conditions - this is directly tied to your hormone patterns."
      };
    }
    else if (formattedSymptom.includes('libido') || formattedSymptom.includes('sex')) {
      return {
        title: formatSymptom(symptom),
        cause: "This is caused by declining testosterone combined with changes in estrogen, affecting both physical response and psychological desire.",
        explanation: "Testosterone drives approximately 50% of female libido and enhances physical sensitivity. Estrogen maintains vaginal tissue health and blood flow. Both are required for normal sexual response.",
        timing: "Changes often occur gradually but can accelerate during certain phases of perimenopause, explaining why this symptom seems to worsen over time."
      };
    }
    else if (formattedSymptom.includes('fog') || formattedSymptom.includes('memory') || formattedSymptom.includes('focus')) {
      return {
        title: formatSymptom(symptom),
        cause: "This is caused by fluctuating estrogen levels affecting neurotransmitter function and glucose metabolism in your brain.",
        explanation: "Estrogen enhances acetylcholine (memory neurotransmitter) and improves how your brain uses glucose for energy. When levels fluctuate, these processes become less efficient.",
        timing: "Many women notice these symptoms worsen during specific points in their cycle when estrogen drops rapidly."
      };
    }
    else if (formattedSymptom.includes('fatigue') || formattedSymptom.includes('energy')) {
      return {
        title: formatSymptom(symptom),
        cause: "This is caused by multiple hormone factors: declining testosterone affecting metabolism, progesterone disrupting sleep quality, and estrogen changes affecting cellular energy production.",
        explanation: "These hormones work together to maintain energy at the cellular level. Changes in any of them can disrupt mitochondrial function and how your body produces and uses energy.",
        timing: "Fatigue often worsens in a cyclical pattern that correlates with your unique hormone fluctuations throughout the month."
      };
    }
    else {
      // Default explanations for other symptoms
      const defaultExplanations = [
        {
          title: formatSymptom(symptom),
          cause: `This is directly linked to your ${primaryHormone} changes affecting related body systems.`,
          explanation: "The specific hormone pattern revealed in your assessment disrupts normal function in ways that create this symptom.",
          timing: "Many women with your hormone pattern report similar experiences with timing that matches your hormone fluctuations."
        },
        {
          title: formatSymptom(symptom),
          cause: `This symptom emerges from the interaction between changing ${primaryHormone} levels and related hormone systems.`,
          explanation: "Your body's normal regulatory mechanisms are being disrupted by specific hormone changes identified in your assessment.",
          timing: "The pattern and timing of this symptom provide important clues about your unique hormone fluctuations."
        },
        {
          title: formatSymptom(symptom),
          cause: "This symptom results from complex hormone interactions affecting multiple body systems simultaneously.",
          explanation: "When key hormones change, as identified in your assessment, they create cascading effects throughout your body.",
          timing: "Tracking this symptom carefully can reveal important patterns about your hormone fluctuations."
        }
      ];
      
      return defaultExplanations[index % defaultExplanations.length];
    }
  };

  // Get explanations for reported symptoms
  const symptomExplanations = symptoms.slice(0, 3).map((symptom, index) => 
    getSymptomExplanation(symptom, index)
  );

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9B85]"></div>
      <CardHeader className="pb-3 md:pb-4 border-b">
        <CardTitle className="font-playfair text-xl md:text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#FF9B85]/10 flex items-center justify-center mr-3 md:mr-4">
            <Zap className="h-4 w-4 md:h-5 md:w-5 text-[#5D4154]" />
          </div>
          <span className="leading-tight">THE SCIENCE BEHIND YOUR SYMPTOMS</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <p className="text-base md:text-lg mb-4 md:mb-5">
          Your symptoms have clear biological causes that explain why traditional approaches often fall short:
        </p>
        
        <div className="space-y-4 md:space-y-5">
          {symptomExplanations.map((explanation, index) => (
            <div key={index} className="bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-l-[#5D4154] hover:shadow-md transition-shadow">
              <h4 className="font-playfair text-lg md:text-xl font-semibold text-[#5D4154] mb-2 md:mb-3">
                {explanation.title}
              </h4>
              
              <p className="text-sm md:text-base mb-2 md:mb-3 font-medium">
                {explanation.cause}
              </p>
              
              <div className="w-full h-12 md:h-16 bg-[#FFECD6]/20 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                <p className="text-[#5D4154] text-xs md:text-sm text-center p-2">
                  [Visual representation of how {primaryHormone} affects this symptom]
                </p>
              </div>
              
              <p className="text-sm md:text-base mb-2 md:mb-3">
                {explanation.explanation}
              </p>
              
              <p className="text-sm md:text-base text-[#5D4154] font-medium">
                {explanation.timing}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 md:mt-5 p-3 md:p-4 bg-[#FFECD6]/30 rounded-lg">
          <p className="text-sm md:text-base text-[#5D4154] font-medium">
            Unlike generic information you may have found elsewhere, this explanation is specifically tailored to your unique hormone pattern and reported experiences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceExplanation;
