
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

interface CondensedSocialProofProps {
  scoreCategory: string;
}

const CondensedSocialProof: React.FC<CondensedSocialProofProps> = ({ scoreCategory }) => {
  // Get testimonial based on score category
  const getTestimonial = () => {
    switch (scoreCategory) {
      case "mild":
        return {
          quote: "I tried the free trial just to see if tracking would help with my occasional sleep issues. Now I can predict my hot flashes before they happen and avoid my triggers!",
          name: "Jessica",
          age: 42,
          pattern: "Mild Perimenopause Pattern"
        };
      case "moderate":
        return {
          quote: "I tried the free trial just to see... ended up staying for 8 months. The prediction feature alone saved my marriage - I could warn my husband about my difficult hormone days!",
          name: "Jennifer",
          age: 45,
          pattern: "Moderate Perimenopause Pattern"
        };
      case "severe":
        return {
          quote: "After months of suffering with intense symptoms, I found Peritrack. The doctor report feature helped me FINALLY get proper treatment. My quality of life has completely changed.",
          name: "Michelle",
          age: 48,
          pattern: "Severe Perimenopause Pattern"
        };
      default:
        return {
          quote: "I tried the free trial just to see... ended up staying for 8 months. The prediction feature alone saved my marriage - I could warn my husband about my difficult hormone days!",
          name: "Jennifer",
          age: 45,
          pattern: "Moderate Perimenopause Pattern"
        };
    }
  };

  const testimonial = getTestimonial();
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-center text-[#5D4154] mb-4">Women with Your Pattern Say:</h3>
        
        <div className="bg-[#F8F6FF] p-5 rounded-lg border border-[#9b87f5]/20 mb-4 relative">
          <div className="absolute -top-3 -left-3 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
            <UserCircle className="h-8 w-8 text-[#9b87f5]" />
          </div>
          
          <blockquote className="text-gray-700 italic mb-4">
            "{testimonial.quote}"
          </blockquote>
          
          <div className="text-right text-[#5D4154] font-medium">
            - {testimonial.name}, {testimonial.age}, <span className="text-[#9b87f5]">{testimonial.pattern}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
          <div className="py-2 px-4 bg-[#F9F5FF] rounded-lg">
            <strong className="block text-[#5D4154]">847 women</strong>
            <span className="text-sm text-gray-600">started their trial this week</span>
          </div>
          
          <div className="py-2 px-4 bg-[#F9F5FF] rounded-lg">
            <strong className="block text-[#5D4154]">94%</strong>
            <span className="text-sm text-gray-600">continue past free trial</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CondensedSocialProof;
