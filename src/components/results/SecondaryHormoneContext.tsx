
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface SecondaryHormoneContextProps {
  primaryHormone: string;
}

const SecondaryHormoneContext: React.FC<SecondaryHormoneContextProps> = ({
  primaryHormone
}) => {
  // Get content based on primary hormone
  const getSecondaryContent = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          points: [
            "Estradiol fluctuations can amplify testosterone's effects on libido",
            "Progesterone levels affect how testosterone is utilized in your body",
            "Cortisol (stress hormone) can block testosterone utilization"
          ]
        };
      case "progesterone":
        return {
          points: [
            "Estradiol fluctuations can counteract progesterone's calming effects",
            "Testosterone interacts with progesterone to affect energy and mood",
            "Thyroid hormone imbalances can magnify progesterone deficiency symptoms"
          ]
        };
      case "estradiol":
        return {
          points: [
            "Progesterone decline amplifies the effects of estradiol fluctuations",
            "Testosterone levels influence how estradiol affects your brain",
            "Adrenal hormone changes can increase sensitivity to estradiol shifts"
          ]
        };
      default:
        return {
          points: [
            "Each hormone influences and is influenced by all others",
            "Lifestyle factors affect how your hormones interact",
            "Individual sensitivity to hormone changes varies significantly"
          ]
        };
    }
  };

  const content = getSecondaryContent();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FFECD6]"></div>
      <CardHeader className="pb-3 md:pb-4 border-b">
        <CardTitle className="font-playfair text-xl md:text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#FFECD6]/20 flex items-center justify-center mr-3 md:mr-4">
            <Check className="h-4 w-4 md:h-5 md:w-5 text-[#5D4154]" />
          </div>
          <span className="leading-tight">YOUR COMPLETE HORMONE PICTURE</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <p className="mb-4 md:mb-6 text-base md:text-lg">
          While your symptoms strongly indicate {primaryHormone} changes, hormones work as a system:
        </p>
        
        <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
          {content.points.map((point, index) => (
            <div key={index} className="flex items-start">
              <div className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mr-2 md:mr-3 mt-0.5 flex-shrink-0">
                <Check className="h-3 w-3 md:h-4 md:w-4 text-[#5D4154]" />
              </div>
              <p className="text-sm md:text-base">{point}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-[#FFECD6]/30 p-3 md:p-4 rounded-lg">
          <p className="font-medium text-[#5D4154] text-sm md:text-base">
            This is why tracking your complete hormone patterns is essential for finding effective solutions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecondaryHormoneContext;
