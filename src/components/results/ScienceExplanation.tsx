
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
        cause: "Sleep changes during perimenopause are commonly associated with declining progesterone, which may affect GABA activity in the brain.",
        explanation: "Progesterone naturally supports GABA function, your primary calming neurotransmitter. As levels fluctuate, your brain may become more easily aroused during sleep cycles.",
        timing: "Many women notice sleep disruptions particularly between 2-4 AM, when cortisol naturally begins rising."
      };
    }
    else if (formattedSymptom.includes('hot') || formattedSymptom.includes('flash') || formattedSymptom.includes('sweat')) {
      return {
        title: formatSymptom(symptom),
        cause: "Hot flashes are commonly linked to fluctuating estradiol levels affecting the hypothalamus, your brain's temperature regulation center.",
        explanation: "The hypothalamus contains estrogen receptors that help maintain your body's temperature set-point. Hormonal fluctuations may affect this system.",
        timing: "Hot flashes often vary in timing and may correspond to specific points in your hormonal fluctuations."
      };
    }
    else if (formattedSymptom.includes('mood') || formattedSymptom.includes('anxiety') || formattedSymptom.includes('irritab')) {
      return {
        title: formatSymptom(symptom),
        cause: "Mood changes during perimenopause may result from hormonal fluctuations affecting neurotransmitter activity.",
        explanation: "Estrogen and progesterone interact with various neurotransmitter systems. As these hormones fluctuate, mood patterns may change.",
        timing: "You may notice mood variations at specific times that correspond to your unique hormonal patterns."
      };
    }
    else {
      // Default explanations for other symptoms
      const defaultExplanations = [
        {
          title: formatSymptom(symptom),
          cause: `This symptom is commonly associated with ${primaryHormone} fluctuations affecting related body systems.`,
          explanation: "Hormonal changes during perimenopause can affect various body systems in interconnected ways.",
          timing: "Tracking this symptom may help reveal patterns related to your unique hormonal fluctuations."
        }
      ];
      
      return defaultExplanations[0];
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
          <span className="leading-tight">UNDERSTANDING YOUR SYMPTOMS</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <p className="text-base md:text-lg mb-4 md:mb-5">
          Your symptoms have common patterns that educational tracking can help you understand:
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
                  [Educational visualization of how {primaryHormone} may relate to this symptom]
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
            This educational content is specifically tailored to your reported experiences for better understanding of perimenopause patterns.
          </p>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p>*This information is for educational purposes only. Individual experiences may vary. Always consult with healthcare professionals for medical advice.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceExplanation;
