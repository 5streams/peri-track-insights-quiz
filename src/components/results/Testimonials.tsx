
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsProps {
  scoreCategory: string;
  primarySymptom: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ scoreCategory, primarySymptom }) => {
  // Select testimonials based on primary symptom
  const getTestimonials = () => {
    if (primarySymptom.includes("Sleep")) {
      return [
        {
          quote: "After months of disrupted sleep, I finally started tracking my symptoms and realized there were patterns. With the right support, my sleep improved within weeks.",
          name: "Rebecca",
          age: 46
        },
        {
          quote: "Understanding the connection between my progesterone levels and sleep was life-changing. I went from waking up 5 times a night to sleeping through most nights.",
          name: "Michelle",
          age: 48
        }
      ];
    } else if (primarySymptom.includes("Mood")) {
      return [
        {
          quote: "The mood swings were making me feel like I was losing my mind until I realized it was hormone-related. Having this validation and tracking has made such a difference.",
          name: "Jennifer",
          age: 43
        },
        {
          quote: "Understanding my hormone pattern changed everything. Instead of feeling at the mercy of unpredictable emotions, I could see the patterns and prepare for more vulnerable times.",
          name: "Sarah",
          age: 45
        }
      ];
    } else {
      return [
        {
          quote: "Finding support and validation during perimenopause has been incredibly important for my wellbeing. I finally feel understood and have tools to manage my symptoms.",
          name: "Elizabeth",
          age: 47
        },
        {
          quote: "Having all my lab results in one place helped me have more productive conversations with my healthcare provider about my symptoms.",
          name: "Rebecca",
          age: 46
        }
      ];
    }
  };
  
  const testimonials = getTestimonials();
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] text-center mb-8">
          WOMEN LIKE YOU SHARE THEIR EXPERIENCES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-br from-[#F9F5FF]/40 to-white p-6 rounded-xl border border-[#9b87f5]/20 relative"
            >
              <div className="absolute -top-4 left-8 h-8 w-8 bg-[#9b87f5] text-white flex items-center justify-center rounded-full">
                "
              </div>
              <blockquote className="pt-4 italic text-gray-700">
                {testimonial.quote}
                <footer className="mt-4 text-right">
                  <span className="font-medium text-[#5D4154]">{testimonial.name}, {testimonial.age}</span>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
        
        {scoreCategory === "severe" && (
          <div className="p-4 bg-[#F9F5FF]/20 rounded-lg border border-[#9b87f5]/20 mt-6">
            <p className="text-center text-gray-700 font-medium">
              79% of women with severe symptoms report noticeable improvement within 16-24 days
              of starting a structured tracking and support program.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Testimonials;
