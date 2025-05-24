
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const ResultsTestimonialSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      age: 47,
      quote: "Finally, I understand what's happening to my body. Peritrack helped me identify that my anxiety spikes were directly related to my hormone fluctuations. Now I can prepare and manage them.",
      rating: 5
    },
    {
      name: "Jennifer L.",
      age: 52,
      quote: "My doctor was amazed by the detailed reports Peritrack generated. For the first time, I had real data to show what I was experiencing. It changed everything about my treatment.",
      rating: 5
    },
    {
      name: "Maria K.",
      age: 49,
      quote: "The sleep tracking feature was a game-changer. I learned my insomnia followed a pattern, and with Peritrack's recommendations, I'm sleeping through the night again.",
      rating: 5
    }
  ];

  return (
    <Card className="mb-8 reveal-section transform opacity-0 bg-gradient-to-br from-[#F9F5FF] to-white">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-6 text-center">
          Real Stories from Real Women
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-[#5D4154]">{testimonial.name}</p>
                <p className="text-sm text-gray-600">Age {testimonial.age}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-[#5D4154]">
            Join thousands of women who've transformed their perimenopause experience
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTestimonialSection;
