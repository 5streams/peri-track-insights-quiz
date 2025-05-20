
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

interface SuccessStoryProps {
  primaryHormone: string;
}

const SuccessStory: React.FC<SuccessStoryProps> = ({
  primaryHormone
}) => {
  // Get testimonial based on primary hormone
  const getTestimonial = () => {
    switch (primaryHormone.toLowerCase()) {
      case "testosterone":
        return {
          quote: "For over a year, I had zero interest in intimacy and couldn't understand why. Doctors just suggested therapy. Through Peritrack, I discovered my testosterone had declined significantly. After following my personalized protocol for 8 weeks, my desire returned and my energy levels improved dramatically.",
          name: "Jennifer",
          age: 46
        };
      case "progesterone":
        return {
          quote: "I was waking up 4-5 times every night for months. I tried everything from melatonin to prescription sleep aids. Peritrack helped me understand my progesterone was declining and created a targeted approach. Within 6 weeks, I was sleeping through the night again for the first time in years.",
          name: "Michelle",
          age: 44
        };
      case "estradiol":
        return {
          quote: "The hot flashes and mood swings were affecting every aspect of my life. My doctor just said it was 'normal aging' and offered antidepressants. With Peritrack, I learned my estradiol was fluctuating wildly. After implementing my personalized plan, my hot flashes decreased by 80% and my mood stabilized within just 2 months.",
          name: "Sarah",
          age: 48
        };
      default:
        return {
          quote: "I had been struggling with multiple symptoms for years, visiting doctor after doctor with no answers. Peritrack helped me understand how my hormones were changing and gave me a clear plan. Within weeks of following my personalized protocol, I started feeling like myself again.",
          name: "Lisa",
          age: 45
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
        <div className="border-l-4 border-[#A7C4A0] pl-3 md:pl-4 py-2 italic text-[#5D4154]/90 mb-3 md:mb-4 text-sm md:text-base">
          "{testimonial.quote}"
          <div className="text-right font-medium mt-2 text-[#5D4154] text-sm md:text-base">
            — {testimonial.name}, {testimonial.age}, experienced similar symptoms to yours
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessStory;
