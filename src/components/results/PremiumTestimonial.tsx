
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Quote } from "lucide-react";

interface PremiumTestimonialProps {
  primaryHormone: string;
  symptoms?: string[];
}

const PremiumTestimonial: React.FC<PremiumTestimonialProps> = ({ primaryHormone, symptoms = [] }) => {
  // Get hormone-specific testimonial based on hormone and symptom patterns
  const getTestimonial = () => {
    const symptomsLower = symptoms.map(s => s.toLowerCase());
    const hasHotFlashes = symptomsLower.some(s => s.includes('hot flash') || s.includes('vasomotor'));
    const hasSleepIssues = symptomsLower.some(s => s.includes('sleep') || s.includes('insomnia') || s.includes('waking'));
    const hasMoodIssues = symptomsLower.some(s => s.includes('mood') || s.includes('anxiety') || s.includes('depression'));
    const hasFatigue = symptomsLower.some(s => s.includes('fatigue') || s.includes('energy') || s.includes('tired'));
    const hasBrainFog = symptomsLower.some(s => s.includes('brain fog') || s.includes('cognitive') || s.includes('memory'));
    
    switch (primaryHormone.toLowerCase()) {
      case "progesterone":
        // Customize progesterone testimonial based on symptoms
        if (hasSleepIssues) {
          return {
            quote: "I suffered with these exact sleep issues for over a year. Doctors told me everything was 'normal.' Peritrack helped me understand my progesterone decline and create a targeted approach. Within 6 weeks, I was sleeping through the night again and feeling like myself for the first time in years.",
            name: "Catherine",
            age: "45"
          };
        } else if (hasMoodIssues) {
          return {
            quote: "The anxiety and mood changes were making me feel like I was losing my mind. Every doctor dismissed it as 'just stress.' Peritrack finally helped me understand how my declining progesterone was affecting my brain chemistry. After following my personalized plan for 7 weeks, the difference is remarkable.",
            name: "Jennifer",
            age: "47"
          };
        } else {
          return {
            quote: "I suffered with these exact symptoms for over a year. Doctors told me everything was 'normal.' Peritrack helped me understand my progesterone decline and create a targeted approach. Within 6 weeks, I was feeling like myself for the first time in years.",
            name: "Sarah",
            age: "46"
          };
        }
        
      case "estradiol":
        // Customize estradiol testimonial based on symptoms
        if (hasHotFlashes) {
          return {
            quote: "The hot flashes were making me dread evenings and disrupting my sleep. Every doctor just said to 'wait it out.' Peritrack helped me understand how my fluctuating estradiol was triggering these temperature changes. After following my personalized plan for 7 weeks, the hot flashes reduced by about 70% and became much more manageable.",
            name: "Jennifer",
            age: "47"
          };
        } else if (hasMoodIssues) {
          return {
            quote: "The mood swings were so unpredictable that my family started walking on eggshells around me. My doctor just suggested antidepressants. Peritrack helped me see how my fluctuating estradiol was directly affecting my serotonin levels. Within 8 weeks of following my personalized protocol, I felt emotionally balanced again.",
            name: "Michelle",
            age: "45"
          };
        } else {
          return {
            quote: "The unpredictable symptoms were making me feel like I was losing control. Every doctor dismissed it as 'just perimenopause.' Peritrack finally helped me understand how my fluctuating estradiol was triggering these symptoms. After following my personalized plan for 7 weeks, the difference is remarkable.",
            name: "Jennifer",
            age: "47"
          };
        }
        
      case "testosterone":
        // Customize testosterone testimonial based on symptoms
        if (hasFatigue) {
          return {
            quote: "The fatigue was so severe I had to reduce my hours at work. My doctor just suggested 'getting more rest.' Peritrack helped me understand my testosterone imbalance and build a plan. Within 2 months, my energy and motivation returned. I'm back to full capacity at work and home.",
            name: "Michelle",
            age: "49"
          };
        } else if (hasBrainFog) {
          return {
            quote: "The brain fog and difficulty concentrating were affecting my work performance and confidence. My doctor said it was 'just aging.' Peritrack helped me connect these symptoms to my declining testosterone levels. After 8 weeks following my personalized protocol, my mental clarity and focus returned.",
            name: "Rebecca",
            age: "48"
          };
        } else {
          return {
            quote: "The fatigue and brain fog were so severe I had to reduce my hours at work. My doctor just suggested antidepressants. Peritrack helped me understand my testosterone imbalance and build a plan. Within 2 months, my energy and focus returned. I'm back to full capacity at work and home.",
            name: "Michelle",
            age: "49"
          };
        }
        
      default:
        return {
          quote: "I suffered with these exact symptoms for over a year. Doctors told me everything was 'normal.' Peritrack helped me understand my hormone imbalance and create a targeted approach. Within 6 weeks, I was feeling like myself for the first time in years.",
          name: "Sarah",
          age: "46"
        };
    }
  };
  
  const testimonial = getTestimonial();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3]/30">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Quote className="h-8 w-8 text-[#5D4154]/30" />
          </div>
          <div className="ml-3">
            <p className="text-gray-700 italic">
              "{testimonial.quote}"
            </p>
            <p className="mt-3 font-medium text-[#5D4154]">
              — {testimonial.name}, {testimonial.age}, experienced the same hormone pattern you're showing
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumTestimonial;
