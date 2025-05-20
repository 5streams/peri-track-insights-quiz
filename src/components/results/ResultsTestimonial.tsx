
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface ResultsTestimonialProps {
  scoreCategory: string;
  primaryHormone: string;
  symptoms: string[];
}

const ResultsTestimonial: React.FC<ResultsTestimonialProps> = ({
  scoreCategory,
  primaryHormone,
  symptoms = []
}) => {
  // Format the symptom names for display
  const formatSymptom = (symptom: string) => {
    return symptom
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Changes|Symptoms/g, '')
      .trim().toLowerCase();
  };

  // Get a formatted list of symptoms
  const formattedSymptoms = symptoms.map(s => formatSymptom(s));
  
  // Get testimonial based on score category and primary hormone 
  const getTestimonial = () => {
    // Check for score category first
    switch (scoreCategory) {
      case "minimal":
        return {
          quote: "I started using Peritrack when I was feeling well, just to track my baseline. Six months later, it detected subtle changes in my sleep patterns before I even noticed them. The early intervention recommendations helped me maintain my energy and wellbeing while friends my age began struggling with symptoms.",
          name: "Sarah",
          age: "42"
        };
      case "early":
        return {
          quote: "I started with mild symptoms just like yours. Peritrack helped me understand my early hormone changes and implement simple interventions at precisely the right times. My friends who ignored their early symptoms ended up with much more severe issues, while mine actually improved. The early intervention made all the difference.",
          name: "Jennifer",
          age: "44"
        };
    }
    
    // For moderate and significant, check hormone and symptoms
    const hasHotFlashes = formattedSymptoms.some(s => s.includes('hot flash') || s.includes('vasomotor'));
    const hasSleepIssues = formattedSymptoms.some(s => s.includes('sleep') || s.includes('insomnia') || s.includes('waking'));
    const hasMoodIssues = formattedSymptoms.some(s => s.includes('mood') || s.includes('anxiety') || s.includes('depression'));
    const hasFatigue = formattedSymptoms.some(s => s.includes('fatigue') || s.includes('energy') || s.includes('tired'));
    
    // Try to match based on hormone and top symptoms
    if (primaryHormone.toLowerCase() === "progesterone" && hasSleepIssues) {
      return scoreCategory === "significant" ?
        {
          quote: "I was exactly where you are now - severe symptoms that were affecting my sleep and every aspect of my life. After trying everything, Peritrack helped me understand my specific progesterone imbalance. Within 3 weeks of following my personalized protocol, I started sleeping through the night again. By 2 months, I felt like a completely different person. I only wish I'd found this sooner and avoided months of unnecessary suffering.",
          name: "Michelle",
          age: "46"
        } :
        {
          quote: "I had the same sleep problems you're describing and the same hormone pattern. After months of trying random supplements and approaches, Peritrack helped me understand exactly what was happening with my progesterone levels. Following my personalized protocol, I saw improvement within 3 weeks. By 8 weeks, I was sleeping through the night again and feeling like myself. It was like getting my life back.",
          name: "Catherine",
          age: "45"
        };
    }
    else if (primaryHormone.toLowerCase() === "estradiol" && hasHotFlashes) {
      return scoreCategory === "significant" ?
        {
          quote: "I was exactly where you are now - hot flashes so intense they were disrupting everything. After trying everything, Peritrack helped me understand my fluctuating estradiol pattern. Within 3 weeks of following my personalized protocol, my hot flashes reduced by about 60%. By 8 weeks, they were 80% better and much more predictable. I only wish I'd found this sooner and avoided months of unnecessary suffering.",
          name: "Elizabeth",
          age: "48"
        } :
        {
          quote: "I had the exact same hot flash pattern you're describing. After trying everything, Peritrack helped me understand how my fluctuating estradiol was triggering these temperature changes. Following my personalized protocol, I saw improvement within 3 weeks. By 8 weeks, my hot flashes had decreased by about 70% and became much more manageable. It was life-changing.",
          name: "Jennifer",
          age: "47"
        };
    }
    else if (primaryHormone.toLowerCase() === "testosterone" && hasFatigue) {
      return scoreCategory === "significant" ?
        {
          quote: "I was exactly where you are now - the fatigue was so severe I could barely function. After getting nowhere with doctors, Peritrack helped me understand my testosterone decline. Within 3 weeks of following my personalized protocol, my energy started returning. By 2 months, I felt like a completely different person. I wish I'd found this years earlier instead of being told it was 'just aging'.",
          name: "Rebecca",
          age: "49"
        } :
        {
          quote: "I had the same energy issues you're describing and the same hormone pattern. After getting nowhere with standard approaches, Peritrack helped me understand my testosterone imbalance. Following my personalized protocol, I saw improvement within 2-3 weeks. By 8 weeks, my energy and motivation had returned. It was like getting my life back.",
          name: "Michelle",
          age: "49"
        };
    }
    
    // Default testimonials based on score category
    return scoreCategory === "significant" ?
      {
        quote: "I was exactly where you are now - severe symptoms that were affecting every aspect of my life. After trying everything, Peritrack helped me understand my specific hormone imbalance. Within 3 weeks of following my personalized protocol, I noticed significant improvement. By 2 months, I felt like a completely different person. I only wish I'd found this sooner and avoided months of unnecessary suffering.",
        name: "Michelle",
        age: "46"
      } :
      {
        quote: "I had the same symptoms you're describing and the same hormone pattern. After months of trying random supplements and approaches, Peritrack helped me understand exactly what was happening in my body. Following my personalized protocol, I saw improvement within 3 weeks. By 8 weeks, I was sleeping through the night again and feeling like myself. It was like getting my life back.",
        name: "Catherine",
        age: "45"
      };
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
              — {testimonial.name}, {testimonial.age}{scoreCategory !== "minimal" ? `, experienced ${scoreCategory === "early" ? "similar early symptoms" : "the same hormone pattern you're showing"}` : ""}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTestimonial;
