
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";
import HormoneVisualization from "./HormoneVisualization";

interface CompleteHormonePictureProps {
  primaryHormone: string;
  secondaryHormones: string[];
}

const CompleteHormonePicture: React.FC<CompleteHormonePictureProps> = ({
  primaryHormone,
  secondaryHormones
}) => {
  // Get hormone status content
  const getHormoneStatus = (hormone: string) => {
    switch (hormone.toLowerCase()) {
      case "testosterone":
        return {
          title: "TESTOSTERONE STATUS:",
          primary: "Your testosterone appears to be below optimal levels, contributing to your reported energy, motivation and libido changes.",
          secondary: "Your testosterone is showing signs of decline, which is common during perimenopause but often overlooked.",
          percentage: "60-70%",
          status: "BEGINNING TO DECLINE",
          affect: "energy and resilience",
          contributes: "fatigue and motivation issues"
        };
      case "progesterone":
        return {
          title: "PROGESTERONE STATUS:",
          primary: "Your progesterone is showing significant decline, reducing your natural calming and sleep-promoting mechanisms.",
          secondary: "Your progesterone levels appear to be decreasing faster than expected, which explains your sensitivity to stress and sleep disruptions.",
          percentage: "40-50%",
          status: "SIGNIFICANTLY DECLINING",
          affect: "sleep and anxiety",
          contributes: "stress resilience and sleep quality"
        };
      case "estradiol":
        return {
          title: "ESTRADIOL STATUS:",
          primary: "Your estradiol is showing the classic \"fluctuating\" pattern of perimenopause, creating unpredictable symptom windows.",
          secondary: "Your estradiol appears to be fluctuating significantly, which explains why your symptoms seem to come and go unpredictably.",
          percentage: "Fluctuating 50-90%",
          status: "FLUCTUATING UNPREDICTABLY",
          affect: "brain fog and mood",
          contributes: "emotional stability and cognitive clarity"
        };
      default:
        return {
          title: "HORMONE STATUS:",
          primary: "This hormone is showing changes typical of perimenopause.",
          secondary: "Changes in this hormone are contributing to your symptom pattern.",
          percentage: "60-70%",
          status: "CHANGING",
          affect: "overall wellbeing",
          contributes: "various symptoms"
        };
    }
  };

  // Get interaction content based on primary hormone
  const getInteractionContent = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return "This interrelated system explains why addressing testosterone alone isn't enough - the balance between all three hormones is crucial for complete symptom relief.";
      case "progesterone":
        return "This interrelated system explains why addressing progesterone alone isn't enough - the balance between all three hormones is crucial for complete symptom relief.";
      case "estradiol":
        return "This interrelated system explains why addressing estradiol alone isn't enough - the balance between all three hormones is crucial for complete symptom relief.";
      default:
        return "This interrelated system explains why addressing a single hormone isn't enough - the balance between all three hormones is crucial for complete symptom relief.";
    }
  };

  // Get primary hormone status
  const primaryStatus = getHormoneStatus(primaryHormone);
  
  // Get secondary hormone statuses
  const secondaryStatuses = secondaryHormones.map(hormone => getHormoneStatus(hormone));
  
  // Get warning timeline content
  const getWarningContent = () => {
    switch (primaryHormone.toLowerCase()) {
      case "progesterone":
        return {
          shortTerm: "Sleep disruptions typically intensify by 35-45%",
          longTerm: "Anxiety episodes increase in both frequency and intensity",
          newSymptom: "hot flashes and joint discomfort"
        };
      case "estradiol":
        return {
          shortTerm: "Mood swings typically increase in frequency by 40-50%",
          longTerm: "Hot flashes often begin or intensify significantly",
          newSymptom: "sleep disruptions and vaginal dryness"
        };
      case "testosterone":
        return {
          shortTerm: "Energy levels typically decrease by an additional 30-40%",
          longTerm: "Mental clarity and focus continue to deteriorate",
          newSymptom: "muscle loss and increased body fat"
        };
      default:
        return {
          shortTerm: "Existing symptoms typically intensify by 30-40%",
          longTerm: "New symptoms often emerge within 6-12 months",
          newSymptom: "additional hormone-related symptoms"
        };
    }
  };
  
  const warningContent = getWarningContent();

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
        <p className="mb-4 text-base md:text-lg">
          Your assessment reveals a specific hormone pattern we see in many women in early-to-mid perimenopause:
        </p>
        
        <div className="w-full h-48 md:h-64 bg-white rounded-lg mb-5">
          <HormoneVisualization 
            primaryHormone={primaryHormone} 
            secondaryHormones={secondaryHormones} 
          />
        </div>
        
        <div className="space-y-4 md:space-y-5 mb-5 md:mb-6">
          {/* Primary Hormone Status */}
          <div className="bg-[#A7C4A0]/10 p-3 md:p-4 rounded-lg">
            <h4 className="font-semibold text-[#5D4154] mb-2">{primaryStatus.title}</h4>
            <div className="flex items-center mb-2">
              <span className="bg-[#5D4154] text-white text-xs px-2 py-0.5 rounded">
                {primaryStatus.status}
              </span>
              <span className="ml-2 text-sm text-[#5D4154]">
                Now approximately {primaryStatus.percentage} of optimal levels
              </span>
            </div>
            <p className="text-sm md:text-base">{primaryStatus.primary}</p>
            <p className="text-sm md:text-base mt-2">
              This is your primary hormone imbalance driving your most noticeable symptoms.
            </p>
          </div>
          
          {/* Secondary Hormone Statuses */}
          {secondaryStatuses.map((status, index) => (
            <div key={index} className="bg-white border border-gray-200 p-3 md:p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-[#5D4154] mb-2">{status.title}</h4>
              <div className="flex items-center mb-2">
                <span className="bg-[#5D4154]/10 text-[#5D4154] text-xs px-2 py-0.5 rounded">
                  {status.status}
                </span>
              </div>
              <p className="text-sm md:text-base">{status.secondary}</p>
              <p className="text-sm md:text-base mt-2">
                This interacts with your {primaryHormone} by {
                  index === 0 ? "amplifying or moderating its effects depending on your cycle phase." 
                  : "affecting receptor sensitivity and cellular response patterns."
                }
              </p>
            </div>
          ))}
        </div>
        
        {/* Warning Timeline Section */}
        <div className="mb-5 p-3 md:p-4 rounded-lg bg-[#FFECD6]/30 border-l-4 border-[#FF9B85]">
          <h4 className="font-semibold text-[#5D4154] mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 text-[#FF9B85] mr-2" />
            <span>WHAT HAPPENS NEXT WITHOUT INTERVENTION</span>
          </h4>
          
          <div className="mt-3 space-y-3">
            <div>
              <p className="font-medium text-[#5D4154]">WITHIN 3 MONTHS:</p>
              <ul className="mt-1 space-y-1">
                <li className="text-sm md:text-base flex items-start">
                  <span className="text-[#FF9B85] mr-2">•</span>
                  <span>{warningContent.shortTerm}</span>
                </li>
                <li className="text-sm md:text-base flex items-start">
                  <span className="text-[#FF9B85] mr-2">•</span>
                  <span>{warningContent.longTerm}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium text-[#5D4154]">WITHIN 6-12 MONTHS:</p>
              <ul className="mt-1 space-y-1">
                <li className="text-sm md:text-base flex items-start">
                  <span className="text-[#FF9B85] mr-2">•</span>
                  <span>New symptoms emerge, particularly {warningContent.newSymptom}</span>
                </li>
                <li className="text-sm md:text-base flex items-start">
                  <span className="text-[#FF9B85] mr-2">•</span>
                  <span>Existing symptoms typically create significant quality of life impact</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-3 pt-3 border-t border-[#FFECD6]">
              <p className="font-medium text-[#5D4154] text-sm">
                THE CRITICAL INSIGHT: You're in the "Early Intervention Window" - the optimal time to address these changes before they intensify significantly.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#FFECD6]/30 p-3 md:p-4 rounded-lg">
          <p className="font-medium text-[#5D4154] text-sm md:text-base">
            {getInteractionContent()}
          </p>
          <p className="font-medium text-[#5D4154] text-sm md:text-base mt-2">
            This is why tracking your complete hormone patterns is essential for finding effective solutions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompleteHormonePicture;
