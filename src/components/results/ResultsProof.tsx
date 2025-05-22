
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";

interface ResultsProofProps {
  scoreCategory: string;
}

const ResultsProof: React.FC<ResultsProofProps> = ({ scoreCategory }) => {
  // Get stats based on score category
  const getStats = () => {
    switch(scoreCategory) {
      case "mild":
        return [
          { number: "92%", text: "Better symptom awareness" },
          { number: "85%", text: "Earlier intervention" },
          { number: "89%", text: "Feel more prepared" }
        ];
      case "moderate":
        return [
          { number: "87%", text: "Better sleep within 30 days" },
          { number: "76%", text: "Reduced mood swings" },
          { number: "82%", text: "Feel more in control" }
        ];
      case "severe":
        return [
          { number: "91%", text: "Better doctor communication" },
          { number: "84%", text: "Reduced symptom severity" },
          { number: "88%", text: "Improved quality of life" }
        ];
      default:
        return [
          { number: "87%", text: "Better sleep within 30 days" },
          { number: "76%", text: "Reduced mood swings" },
          { number: "82%", text: "Feel more in control" }
        ];
    }
  };
  
  // Get testimonials based on score category
  const getTestimonials = () => {
    switch(scoreCategory) {
      case "mild":
        return [
          {
            quote: "Even though my symptoms were mild, Peritrack helped me understand what was happening in my body. I'm so grateful I started tracking early - I feel prepared for whatever comes next.",
            name: "Sarah, 42, Early Perimenopause Pattern"
          },
          {
            quote: "I wasn't sure if my symptoms were even related to hormones, but Luna helped me connect the dots. Now I understand why I sometimes feel anxious for 'no reason' - it's my hormones!",
            name: "Lisa, 41, Similar Pattern to Yours"
          }
        ];
      case "moderate":
        return [
          {
            quote: "Within 2 weeks of using Peritrack, I identified that my insomnia peaked after stressful work events. Understanding this pattern helped me prepare and manage it so much better.",
            name: "Jennifer, 45, Moderate Perimenopause Pattern"
          },
          {
            quote: "Luna helped me realize my mood swings weren't random - they followed a specific hormone pattern. Now I can prepare for vulnerable days and my relationships have improved dramatically.",
            name: "Michelle, 47, Similar Pattern to Yours"
          }
        ];
      case "severe":
        return [
          {
            quote: "After months of feeling like I was losing my mind, Peritrack helped me prove to my doctor that my symptoms were real. I finally got proper treatment and feel like myself again.",
            name: "Karen, 49, Advanced Perimenopause Pattern"
          },
          {
            quote: "I was having 15+ hot flashes a day and couldn't function. Luna helped me identify my specific triggers and create an action plan. Within weeks, my hot flashes reduced by 70%.",
            name: "Patricia, 50, Similar Pattern to Yours"
          }
        ];
      default:
        return [
          {
            quote: "Within 2 weeks of using Peritrack, I identified that my insomnia peaked after stressful work events. Understanding this pattern helped me prepare and manage it so much better.",
            name: "Jennifer, 45, Moderate Perimenopause Pattern"
          },
          {
            quote: "Luna helped me realize my mood swings weren't random - they followed a specific hormone pattern. Now I can prepare for vulnerable days and my relationships have improved dramatically.",
            name: "Michelle, 47, Similar Pattern to Yours"
          }
        ];
    }
  };
  
  const stats = getStats();
  const testimonials = getTestimonials();

  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-6">
          <BarChart className="h-6 w-6 text-[#A7C4A0] mr-2" />
          <h2 className="text-2xl font-bold text-[#5D4154]">What Women With Your Pattern Experience</h2>
        </div>
        
        <div className="success-stats grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="stat bg-[#F8F6FF]/70 p-4 rounded-lg border border-[#D6BCFA]/30 text-center">
              <span className="number block text-2xl font-bold text-[#9b87f5] mb-1">{stat.number}</span>
              <p className="text-sm text-[#5D4154]">{stat.text}</p>
            </div>
          ))}
        </div>
        
        <div className="testimonials grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
              <span className="text-[#5D4154] font-medium text-sm">- {testimonial.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsProof;
