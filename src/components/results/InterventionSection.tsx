
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Check } from "lucide-react";

interface InterventionSectionProps {
  scoreCategory: string;
  symptoms: string[];
}

const InterventionSection: React.FC<InterventionSectionProps> = ({
  scoreCategory,
  symptoms
}) => {
  // Format the symptom names for display
  const formatSymptoms = (symptoms: string[]) => {
    return symptoms.map(symptom => {
      return symptom
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/Changes|Symptoms/g, '')
        .trim();
    });
  };
  
  const formattedSymptoms = formatSymptoms(symptoms).slice(0, 3);
  
  // Get headline based on score category
  const getHeadline = () => {
    switch (scoreCategory) {
      case "minimal":
        return "Why Monitoring Matters Now";
      case "early":
        return "The Critical Early Intervention Window";
      case "moderate":
        return "Your Critical Decision Point";
      case "significant":
        return "Your Urgent Opportunity for Relief";
      default:
        return "Your Hormone Health Opportunity";
    }
  };
  
  // Get intro text based on score category
  const getIntroText = () => {
    switch (scoreCategory) {
      case "minimal":
        return "While you're currently in good hormone balance, perimenopause typically begins between ages 40-44, often with subtle changes before noticeable symptoms appear.";
      case "early":
        return "You're currently in what research identifies as the \"Optimal Intervention Window\" – when addressing hormone changes is simplest and most effective.";
      case "moderate":
        return "You're at an important crossroads in your perimenopause journey where the right approach can significantly improve your quality of life.";
      case "significant":
        return "Your current symptoms indicate you're experiencing significant hormone disruption that requires prompt, targeted attention.";
      default:
        return "Understanding and addressing your hormone health now can significantly impact your wellbeing.";
    }
  };
  
  // Get the alert box title based on score category
  const getAlertTitle = () => {
    switch (scoreCategory) {
      case "minimal":
        return "Important Health Consideration";
      case "early":
        return "Why Acting Now Matters";
      case "moderate":
        return "What Happens Without Intervention";
      case "significant":
        return "Critical Hormone Support Needed";
      default:
        return "Important Information";
    }
  };
  
  // Get alert box content based on score category
  const getAlertContent = () => {
    switch (scoreCategory) {
      case "minimal":
        return "75% of women experience their first perimenopause symptoms between ages 40-45, but most don't recognize them until they become more severe 2-3 years later. Early detection enables much easier management.";
      case "early":
        return "Without appropriate support, your current symptoms typically increase in both frequency and intensity over the next 6-18 months as hormone fluctuations become more pronounced. Women who wait until symptoms become more severe typically require more intensive interventions and experience a significantly longer recovery period.";
      case "moderate":
        return (
          <>
            <p className="mb-2">Women with your exact hormone pattern who don't implement appropriate support typically experience:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>40-60% increase in symptom severity over the next 6-12 months</li>
              <li>New symptoms emerging as hormone imbalances expand</li>
              <li>Increasingly disrupted sleep, mood, and energy patterns</li>
              <li>Potentially years of unnecessary discomfort before reaching stability</li>
            </ul>
          </>
        );
      case "significant":
        return (
          <>
            <p className="mb-2">Without appropriate intervention, women with your exact hormone pattern typically experience:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Further intensification of current symptoms over the next 3-6 months</li>
              <li>Additional symptoms emerging as hormone imbalances cascade</li>
              <li>Increasingly compromised quality of life and daily functioning</li>
              <li>Potentially years of unnecessary suffering before reaching hormonal stability</li>
            </ul>
            <p className="mt-2 text-sm">The medical system often fails women by waiting until symptoms become debilitating before taking hormone imbalances seriously.</p>
          </>
        );
      default:
        return "Understanding and addressing your hormone health now can make a significant difference in your wellbeing over the coming months and years.";
    }
  };
  
  // Get positive outcomes based on score category
  const getPositiveOutcomes = () => {
    const introText = scoreCategory === "minimal" 
      ? "Studies show that women who begin tracking before significant symptoms appear experience:" 
      : scoreCategory === "significant"
        ? "The crucial good news: Even with your current symptom severity, women with your exact hormone pattern who implement personalized tracking and targeted support typically experience:"
        : `The good news: Women with your exact ${scoreCategory === "early" ? "early-stage pattern" : "hormone pattern"} who implement personalized tracking and support typically experience:`;
      
    const outcomes = scoreCategory === "minimal" 
      ? [
          "78% less severe symptoms throughout their transition",
          "82% better sleep quality during perimenopause",
          "75% lower incidence of mood disruptions"
        ]
      : scoreCategory === "early"
        ? [
            "85% reduction in symptom progression over 12 months",
            "73% improvement in current mild symptoms within 4-6 weeks",
            "79% report maintaining high quality of life throughout their transition"
          ]
        : scoreCategory === "moderate"
          ? [
              `68% improvement in ${formattedSymptoms[0] || "primary symptoms"} within 4-6 weeks`,
              `65% reduction in ${formattedSymptoms[1] || "secondary symptoms"} within 5-8 weeks`,
              "70% report feeling \"back to themselves\" within 6-10 weeks"
            ]
          : [
              "Initial symptom relief beginning within 14-21 days",
              `65% improvement in ${formattedSymptoms[0] || "primary symptoms"} within 4-6 weeks`,
              `60% reduction in ${formattedSymptoms[1] || "secondary symptoms"} within 5-8 weeks`,
              "72% report significant quality of life improvement within 8-12 weeks"
            ];
            
    return (
      <>
        <p className="mb-3">{introText}</p>
        <ul className="space-y-2">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </>
    );
  };
  
  // Get conclusion text based on score category
  const getConclusionText = () => {
    switch (scoreCategory) {
      case "minimal":
        return "While you're feeling good now, establishing your baseline and identifying subtle shifts early gives you a significant advantage for maintaining your wellbeing.";
      case "early":
        return "Your current position gives you a significant advantage for a smoother perimenopause journey if addressed promptly and appropriately.";
      case "moderate":
        return "Your current symptoms are addressable with the right approach tailored to your specific hormone pattern.";
      case "significant":
        return "Your current situation is addressable with the right approach specifically tailored to your unique hormone pattern.";
      default:
        return "Taking action now can help you maintain or improve your hormone health and overall wellbeing.";
    }
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-[#5D4154] mb-4">
          {getHeadline()}
        </h3>
        
        <p className="text-base md:text-lg text-[#5D4154]/80 mb-5">
          {getIntroText()}
        </p>
        
        <div className="alert-box bg-[#5D4154]/5 p-4 md:p-5 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-[#5D4154] mr-2" />
            <h4 className="font-semibold text-[#5D4154]">{getAlertTitle()}</h4>
          </div>
          
          <div className="text-[#5D4154]/90">
            {getAlertContent()}
          </div>
        </div>
        
        <div className="positive-outcomes mb-5">
          {getPositiveOutcomes()}
        </div>
        
        <p className="font-medium text-[#5D4154]">
          {getConclusionText()}
        </p>
      </CardContent>
    </Card>
  );
};

export default InterventionSection;
