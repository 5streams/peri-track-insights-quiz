
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Star } from "lucide-react";

interface ThreeStepSolutionProps {
  primaryHormone: string;
  symptoms: string[];
}

const ThreeStepSolution: React.FC<ThreeStepSolutionProps> = ({
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

  // Format the top symptoms
  const topSymptoms = symptoms.slice(0, 2).map(formatSymptom);

  // Get personalized step content based on primary hormone
  const getPersonalizedSteps = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          tracking: {
            title: "PRECISION TRACKING",
            description: "Track your unique patterns using our AI-powered system.",
            focus: [
              `${topSymptoms[0]} patterns and triggers`,
              `${topSymptoms[1]} timing and severity`,
              "Energy fluctuations throughout your cycle",
              "Activities and foods that boost your testosterone"
            ],
            outcome: "You'll discover exactly when your testosterone levels change most significantly, allowing for precisely timed interventions."
          },
          testing: {
            title: "COMPREHENSIVE TESTING",
            description: "Confirm your complete hormone profile with testing designed for your pattern.",
            panel: [
              "Free and total testosterone levels",
              "Estradiol levels and pattern identification",
              "DHEA and other androgen precursors",
              "Key metabolism markers often missed in standard testing"
            ],
            outcome: "This creates your complete hormone blueprint, revealing the exact imbalances causing your symptoms."
          },
          rebalancing: {
            title: "PERSONALIZED REBALANCING",
            description: "Follow your custom protocol designed for your specific pattern:",
            protocol: [
              "Targeted nutritional support for testosterone production",
              "Precise timing of interventions based on your unique patterns",
              `Specific lifestyle adjustments that improve ${topSymptoms[0].toLowerCase()}`,
              "Natural approaches to optimize energy and libido",
              "Guidance for discussing evidence-based options with your provider"
            ],
            timeline: "Women with your exact hormone pattern typically see improvement in energy and libido within 3-6 weeks when following their personalized protocol."
          }
        };
      case "progesterone":
        return {
          tracking: {
            title: "PRECISION TRACKING",
            description: "Track your unique patterns using our AI-powered system.",
            focus: [
              `${topSymptoms[0]} patterns and triggers`,
              `${topSymptoms[1]} timing and severity`,
              "Sleep-wake cycles and disruption patterns",
              "Stress triggers that deplete your progesterone"
            ],
            outcome: "You'll discover exactly when your progesterone levels change most significantly, allowing for precisely timed interventions."
          },
          testing: {
            title: "COMPREHENSIVE TESTING",
            description: "Confirm your complete hormone profile with testing designed for your pattern.",
            panel: [
              "Progesterone levels throughout your cycle",
              "Estradiol-to-progesterone ratio",
              "Cortisol patterns affecting your sleep",
              "Neurotransmitter precursors often overlooked in testing"
            ],
            outcome: "This creates your complete hormone blueprint, revealing the exact imbalances causing your symptoms."
          },
          rebalancing: {
            title: "PERSONALIZED REBALANCING",
            description: "Follow your custom protocol designed for your specific pattern:",
            protocol: [
              "Targeted nutritional support for progesterone production",
              "Precise timing of interventions based on your unique patterns",
              `Specific lifestyle adjustments that improve ${topSymptoms[0].toLowerCase()}`,
              "Natural approaches to enhance sleep and reduce anxiety",
              "Guidance for discussing evidence-based options with your provider"
            ],
            timeline: "Women with your exact hormone pattern typically see improvement in sleep quality and anxiety within 2-4 weeks when following their personalized protocol."
          }
        };
      case "estradiol":
        return {
          tracking: {
            title: "PRECISION TRACKING",
            description: "Track your unique patterns using our AI-powered system.",
            focus: [
              `${topSymptoms[0]} patterns and triggers`,
              `${topSymptoms[1]} timing and severity`,
              "Vasomotor symptom frequency and intensity",
              "Activities and foods that stabilize your estrogen"
            ],
            outcome: "You'll discover exactly when your estradiol fluctuations are most significant, allowing for precisely timed interventions."
          },
          testing: {
            title: "COMPREHENSIVE TESTING",
            description: "Confirm your complete hormone profile with testing designed for your pattern.",
            panel: [
              "Estradiol levels and fluctuation patterns",
              "Estrogen metabolites and pathway efficiency",
              "Progesterone-to-estradiol ratio",
              "Inflammatory markers often linked to estrogen symptoms"
            ],
            outcome: "This creates your complete hormone blueprint, revealing the exact imbalances causing your symptoms."
          },
          rebalancing: {
            title: "PERSONALIZED REBALANCING",
            description: "Follow your custom protocol designed for your specific pattern:",
            protocol: [
              "Targeted nutritional support for estrogen stability",
              "Precise timing of interventions based on your unique patterns",
              `Specific lifestyle adjustments that reduce ${topSymptoms[0].toLowerCase()}`,
              "Natural approaches to smooth estrogen fluctuations",
              "Guidance for discussing evidence-based options with your provider"
            ],
            timeline: "Women with your exact hormone pattern typically see improvement in hot flashes and mood stability within 3-5 weeks when following their personalized protocol."
          }
        };
      default:
        return {
          tracking: {
            title: "PRECISION TRACKING",
            description: "Track your unique patterns using our AI-powered system.",
            focus: [
              `${topSymptoms[0]} patterns and triggers`,
              `${topSymptoms[1]} timing and severity`,
              "Symptom correlations throughout your cycle",
              "Activities and foods that affect your hormones"
            ],
            outcome: "You'll discover exactly when your hormone changes are most significant, allowing for precisely timed interventions."
          },
          testing: {
            title: "COMPREHENSIVE TESTING",
            description: "Confirm your complete hormone profile with testing designed for your pattern.",
            panel: [
              "Estradiol, progesterone and testosterone levels",
              "Key hormone ratios and metabolites",
              "Supporting hormones that affect your symptoms",
              "Markers often missed in standard hormone testing"
            ],
            outcome: "This creates your complete hormone blueprint, revealing the exact imbalances causing your symptoms."
          },
          rebalancing: {
            title: "PERSONALIZED REBALANCING",
            description: "Follow your custom protocol designed for your specific pattern:",
            protocol: [
              "Targeted nutritional support for hormone balance",
              "Precise timing of interventions based on your unique patterns",
              `Specific lifestyle adjustments that improve ${topSymptoms[0].toLowerCase()}`,
              "Natural approaches to hormone optimization",
              "Guidance for discussing evidence-based options with your provider"
            ],
            timeline: "Women with your exact hormone pattern typically see noticeable improvement in symptoms within 3-6 weeks when following their personalized protocol."
          }
        };
    }
  };

  const steps = getPersonalizedSteps();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9B85]"></div>
      <CardHeader className="pb-3 md:pb-4 border-b">
        <CardTitle className="font-playfair text-xl md:text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[#FF9B85]/10 flex items-center justify-center mr-3 md:mr-4">
            <Star className="h-4 w-4 md:h-5 md:w-5 text-[#5D4154]" />
          </div>
          <span className="leading-tight">YOUR PERSONALIZED PATH TO HORMONE BALANCE</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <p className="text-base md:text-lg mb-4 md:mb-5">
          Your 3-Step Journey to Resolving {topSymptoms.join(" and ")}:
        </p>
        
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 lg:gap-6">
          {/* Step 1: Tracking */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 md:p-5 border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-[#5D4154] text-white flex items-center justify-center mb-3 md:mb-4 text-lg font-bold">
              1
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#5D4154] mb-2 md:mb-3">
              {steps.tracking.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-3">
              {steps.tracking.description}
            </p>
            
            <p className="text-sm md:text-base font-medium mb-2">For your specific profile, we'll focus on:</p>
            <ul className="space-y-1 md:space-y-2 mb-3 md:mb-4">
              {steps.tracking.focus.map((item, index) => (
                <li key={index} className="flex items-start text-xs md:text-sm">
                  <span className="text-[#5D4154] mr-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-xs md:text-sm text-[#5D4154] italic">
              {steps.tracking.outcome}
            </p>
          </div>
          
          {/* Step 2: Testing */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 md:p-5 border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-[#5D4154] text-white flex items-center justify-center mb-3 md:mb-4 text-lg font-bold">
              2
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#5D4154] mb-2 md:mb-3">
              {steps.testing.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-3">
              {steps.testing.description}
            </p>
            
            <p className="text-sm md:text-base font-medium mb-2">Your testing panel will include:</p>
            <ul className="space-y-1 md:space-y-2 mb-3 md:mb-4">
              {steps.testing.panel.map((item, index) => (
                <li key={index} className="flex items-start text-xs md:text-sm">
                  <span className="text-[#5D4154] mr-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-xs md:text-sm text-[#5D4154] italic">
              {steps.testing.outcome}
            </p>
          </div>
          
          {/* Step 3: Rebalancing */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 md:p-5 border border-gray-100">
            <div className="h-10 w-10 rounded-full bg-[#5D4154] text-white flex items-center justify-center mb-3 md:mb-4 text-lg font-bold">
              3
            </div>
            <h3 className="text-lg md:text-xl font-bold text-[#5D4154] mb-2 md:mb-3">
              {steps.rebalancing.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-3">
              {steps.rebalancing.description}
            </p>
            
            <ul className="space-y-1 md:space-y-2 mb-3 md:mb-4">
              {steps.rebalancing.protocol.map((item, index) => (
                <li key={index} className="flex items-start text-xs md:text-sm">
                  <span className="text-[#5D4154] mr-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <p className="text-xs md:text-sm text-[#5D4154] italic">
              {steps.rebalancing.timeline}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreeStepSolution;
