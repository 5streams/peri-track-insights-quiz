
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

interface SuccessStoryProps {
  primaryHormone: string;
  symptoms: string[];
}

const SuccessStory: React.FC<SuccessStoryProps> = ({
  primaryHormone,
  symptoms
}) => {
  // Helper function to format symptoms for display
  const formatSymptom = (symptom: string) => {
    return symptom
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Changes|Symptoms/g, '')
      .trim().toLowerCase();
  };

  // Format the top symptom
  const primarySymptom = formatSymptom(symptoms[0]);

  // Get testimonial based on primary hormone and top symptom
  const getTestimonial = () => {
    // Try to match based on both hormone and top symptom
    if (primaryHormone.toLowerCase() === "testosterone" && 
        (primarySymptom.includes("libido") || primarySymptom.includes("sex") || primarySymptom.includes("desire"))) {
      return {
        quote: "For over a year, I had zero interest in intimacy and couldn't understand why. Doctors just suggested therapy. Through Peritrack, I discovered my testosterone had declined significantly. After following my personalized protocol for 8 weeks, my desire returned and my energy levels improved dramatically.",
        name: "Jennifer",
        age: 46,
        improvement: "78% improvement in libido, 65% increase in energy levels"
      };
    }
    else if (primaryHormone.toLowerCase() === "progesterone" && 
            (primarySymptom.includes("sleep") || primarySymptom.includes("insomnia") || primarySymptom.includes("wake"))) {
      return {
        quote: "I was waking up 4-5 times every night for months. I tried everything from melatonin to prescription sleep aids. Peritrack helped me understand my progesterone was declining and created a targeted approach. Within 6 weeks, I was sleeping through the night again for the first time in years.",
        name: "Michelle",
        age: 44,
        improvement: "82% reduction in night waking, 70% improvement in sleep quality"
      };
    }
    else if (primaryHormone.toLowerCase() === "estradiol" && 
            (primarySymptom.includes("hot") || primarySymptom.includes("flash") || primarySymptom.includes("sweat"))) {
      return {
        quote: "The hot flashes and mood swings were affecting every aspect of my life. My doctor just said it was 'normal aging' and offered antidepressants. With Peritrack, I learned my estradiol was fluctuating wildly. After implementing my personalized plan, my hot flashes decreased by 80% and my mood stabilized within just 2 months.",
        name: "Sarah",
        age: 48,
        improvement: "80% reduction in hot flashes, 75% improvement in mood stability"
      };
    }
    
    // If no specific match, use hormone-based testimonial
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          quote: "I kept telling my doctor something wasn't right - I had no motivation, my energy was gone, and I felt disconnected from myself. With Peritrack, I discovered my testosterone was much lower than optimal. Following my personalized protocol, I started feeling like myself again within 7 weeks. Now I have the energy to exercise regularly and my motivation has returned.",
          name: "Rachel",
          age: 47,
          improvement: "75% improvement in energy levels, 68% increase in motivation"
        };
      case "progesterone":
        return {
          quote: "My anxiety was through the roof, especially at night, and my sleep had completely fallen apart. Doctors just prescribed anti-anxiety medications. Peritrack helped me understand my progesterone was declining rapidly. With my personalized approach, I saw improvement within 5 weeks. I'm sleeping better and feeling calmer than I have in years.",
          name: "Catherine",
          age: 45,
          improvement: "72% reduction in anxiety, 68% improvement in sleep quality"
        };
      case "estradiol":
        return {
          quote: "The brain fog and mood swings came out of nowhere. I couldn't focus at work and my emotions were all over the place. Peritrack helped me see how my estradiol was fluctuating unpredictably. Within 6 weeks on my personalized protocol, my thinking cleared and my emotions stabilized. I feel in control again.",
          name: "Elizabeth",
          age: 49,
          improvement: "70% reduction in brain fog, 65% improvement in mood stability"
        };
      default:
        return {
          quote: "I had been struggling with multiple symptoms for years, visiting doctor after doctor with no answers. Peritrack helped me understand how my hormones were changing and gave me a clear plan. Within weeks of following my personalized protocol, I started feeling like myself again. Now I know exactly when to expect symptom changes and how to manage them effectively.",
          name: "Lisa",
          age: 45,
          improvement: "75% overall improvement in reported symptoms"
        };
    }
  };

  const testimonial = getTestimonial();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
      <CardHeader className="pb-3 md:pb-4 border-b">
        <CardTitle className="font-playfair text-xl md:text-2xl font-semibold text-[#5D4154] text-center">
          FROM STRUGGLING TO THRIVING
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
          <div className="w-full md:w-2/3">
            <div className="border-l-4 border-[#A7C4A0] pl-3 md:pl-4 py-2 italic text-[#5D4154]/90 mb-3 md:mb-4 text-sm md:text-base">
              "{testimonial.quote}"
              <div className="text-right font-medium mt-2 text-[#5D4154] text-sm md:text-base">
                — {testimonial.name}, {testimonial.age}, experienced similar symptoms to yours
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 bg-[#FFECD6]/20 p-3 md:p-4 rounded-lg">
            <h4 className="font-semibold text-[#5D4154] text-center mb-2 text-sm md:text-base">
              EXPECTED OUTCOMES
            </h4>
            <div className="flex flex-col gap-2">
              <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#A7C4A0] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs md:text-sm mt-1">
                  {testimonial.improvement.split(",")[0]}
                </p>
              </div>
              <div className="bg-white rounded-lg p-2 md:p-3 shadow-sm">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#A7C4A0] h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs md:text-sm mt-1">
                  {testimonial.improvement.split(",")[1]}
                </p>
              </div>
              <p className="text-xs text-center mt-1">
                Within 4-8 weeks of personalized protocol
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessStory;
