
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Quote } from "lucide-react";

interface PremiumTestimonialProps {
  primaryHormone: string;
}

const PremiumTestimonial: React.FC<PremiumTestimonialProps> = ({ primaryHormone }) => {
  // Get hormone-specific testimonial
  const getTestimonial = () => {
    switch (primaryHormone.toLowerCase()) {
      case "progesterone":
        return {
          quote: "I suffered with these exact symptoms for over a year. Doctors told me everything was 'normal.' Peritrack helped me understand my progesterone decline and create a targeted approach. Within 6 weeks, I was sleeping through the night again and feeling like myself for the first time in years.",
          name: "Catherine",
          age: "45"
        };
      case "estradiol":
        return {
          quote: "The mood swings and hot flashes were making me feel like I was losing control. Every doctor dismissed it as 'just stress.' Peritrack finally helped me understand how my fluctuating estrogen was triggering these symptoms. After following my personalized plan for 7 weeks, the difference is remarkable.",
          name: "Jennifer",
          age: "47"
        };
      case "testosterone":
        return {
          quote: "The fatigue and brain fog were so severe I had to reduce my hours at work. My doctor just suggested antidepressants. Peritrack helped me understand my testosterone imbalance and build a plan. Within 2 months, my energy and focus returned. I'm back to full capacity at work and home.",
          name: "Michelle",
          age: "49"
        };
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
