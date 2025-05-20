
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface ResultsTestimonialProps {
  scoreCategory: string;
  primaryHormone: string;
  symptoms: string[];
  testimonialPosition?: "top" | "bottom";
}

const ResultsTestimonial: React.FC<ResultsTestimonialProps> = ({
  scoreCategory,
  primaryHormone,
  symptoms = [],
  testimonialPosition = "top"
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
  
  // Get testimonial based on score category, primary hormone, and position 
  const getTestimonial = () => {
    // Check for testimonial position first - show different testimonials at top vs bottom
    if (testimonialPosition === "bottom") {
      // Bottom testimonials focus more on the app experience/outcomes
      switch (scoreCategory) {
        case "minimal":
          return {
            quote: "Peritrack helped me understand my hormones before I had any major symptoms. When my friends started dealing with hot flashes and insomnia in their mid-40s, I was prepared with a personalized plan that prevented me from experiencing the same struggles. The peace of mind alone is worth it.",
            name: "Michelle",
            age: "46",
            specific: "proactive approach"
          };
        case "early":
          return {
            quote: "The personalized tracking made all the difference for me. Within weeks, I could see exactly how my hormones were affecting my sleep and mood. The AI actually noticed patterns I never would have connected myself. Having 24/7 support means I'm never left wondering what's happening or what to do next.",
            name: "Rebecca",
            age: "43",
            specific: "AI pattern detection"
          };
        case "moderate":
          return {
            quote: "Before Peritrack, I tried everything - expensive supplements, diet changes - but nothing worked consistently. The app showed me that timing was everything with my hormone fluctuations. Now I know exactly when to implement specific strategies. My hot flashes have decreased by 70% and my sleep is finally back to normal.",
            name: "Elizabeth",
            age: "48",
            specific: "personalized timing"
          };
        case "significant":
          return {
            quote: "After struggling for almost 2 years, I was desperate for relief. Within 3 weeks of using my Peritrack plan, my night sweats decreased from 5-6 times per night to just once. By 8 weeks, my energy was back and I felt like myself again. My doctor was amazed at the improvement and asked what I was doing differently.",
            name: "Patricia",
            age: "51",
            specific: "dramatic symptom reduction"
          };
      }
    }
    
    // Top testimonials are more focused on emotional journey and specific symptoms
    // For minimal and early, check by score category first
    switch (scoreCategory) {
      case "minimal":
        return {
          quote: "I started using Peritrack when I was feeling well, just to track my baseline. Six months later, it detected subtle changes in my sleep patterns before I even noticed them. The early intervention recommendations helped me maintain my energy and wellbeing while friends my age began struggling with symptoms.",
          name: "Sarah",
          age: "42",
          specific: "early detection"
        };
      case "early":
        return {
          quote: "I started with mild symptoms just like yours. Peritrack helped me understand my early hormone changes and implement simple interventions at precisely the right times. My friends who ignored their early symptoms ended up with much more severe issues, while mine actually improved. The early intervention made all the difference.",
          name: "Jennifer",
          age: "44",
          specific: "early intervention"
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
          quote: "I was exactly where you are now - severe sleep problems that were affecting every aspect of my life. After trying everything, Peritrack helped me understand my specific progesterone imbalance. Within 3 weeks of following my personalized protocol, I started sleeping through the night again. By 2 months, I felt like a completely different person.",
          name: "Michelle",
          age: "46",
          specific: "sleep improvement"
        } :
        {
          quote: "I had the same sleep problems you're describing and the same hormone pattern. After months of trying random supplements and approaches, Peritrack helped me understand exactly what was happening with my progesterone levels. Following my personalized protocol, I saw improvement within 3 weeks. By 8 weeks, I was sleeping through the night again.",
          name: "Catherine",
          age: "45",
          specific: "sleep improvement"
        };
    }
    else if (primaryHormone.toLowerCase() === "estradiol" && hasHotFlashes) {
      return scoreCategory === "significant" ?
        {
          quote: "I was exactly where you are now - hot flashes so intense they were disrupting everything. After trying everything, Peritrack helped me understand my fluctuating estradiol pattern. Within 3 weeks of following my personalized protocol, my hot flashes reduced by about 60%. By 8 weeks, they were 80% better and much more predictable.",
          name: "Elizabeth",
          age: "48",
          specific: "hot flash reduction"
        } :
        {
          quote: "I had the exact same hot flash pattern you're describing. After trying everything, Peritrack helped me understand how my fluctuating estradiol was triggering these temperature changes. Following my personalized protocol, I saw improvement within 3 weeks. By 8 weeks, my hot flashes had decreased by about 70%.",
          name: "Jennifer",
          age: "47",
          specific: "hot flash reduction"
        };
    }
    else if (primaryHormone.toLowerCase() === "testosterone" && hasFatigue) {
      return scoreCategory === "significant" ?
        {
          quote: "I was exactly where you are now - the fatigue was so severe I could barely function. After getting nowhere with doctors, Peritrack helped me understand my testosterone decline. Within 3 weeks of following my personalized protocol, my energy started returning. By 2 months, I felt like a completely different person.",
          name: "Rebecca",
          age: "49",
          specific: "energy improvement"
        } :
        {
          quote: "I had the same energy issues you're describing and the same hormone pattern. After getting nowhere with standard approaches, Peritrack helped me understand my testosterone imbalance. Following my personalized protocol, I saw improvement within 2-3 weeks. By 8 weeks, my energy and motivation had returned.",
          name: "Michelle",
          age: "49",
          specific: "energy improvement"
        };
    }
    else if (hasMoodIssues) {
      return scoreCategory === "significant" ?
        {
          quote: "My mood swings were affecting my work and relationships. Doctors just offered antidepressants, but I knew it was hormone-related. Peritrack was the first solution that actually mapped my mood changes to my hormone patterns. Within 3 weeks on my personalized protocol, I felt significantly more stable. My family noticed the difference immediately.",
          name: "Angela",
          age: "45",
          specific: "mood stability"
        } :
        {
          quote: "The anxiety and irritability were making me feel like I was losing myself. Peritrack showed me exactly how my changing hormones were affecting my mood, and gave me specific interventions timed to my cycle. Within just 2 weeks, I noticed myself feeling calmer and more in control.",
          name: "Stephanie",
          age: "43",
          specific: "reduced anxiety"
        };
    }
    
    // Default testimonials based on score category
    return scoreCategory === "significant" ?
      {
        quote: "I was exactly where you are now - severe symptoms that were affecting every aspect of my life. After trying everything, Peritrack helped me understand my specific hormone imbalance. Within 3 weeks of following my personalized protocol, I noticed significant improvement. By 2 months, I felt like a completely different person.",
        name: "Michelle",
        age: "46",
        specific: "overall improvement"
      } :
      {
        quote: "I had the same symptoms you're describing and the same hormone pattern. After months of trying random supplements and approaches, Peritrack helped me understand exactly what was happening in my body. Following my personalized protocol, I saw improvement within 3 weeks. By 8 weeks, I was feeling like myself again.",
        name: "Catherine",
        age: "45",
        specific: "symptom reduction"
      };
  };
  
  const testimonial = getTestimonial();

  // If we're only showing one testimonial, don't show the bottom one
  if (testimonialPosition === "bottom" && scoreCategory === "minimal") {
    return null;
  }

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
            <p className="mt-3 font-medium text-[#5D4154] flex items-center justify-between">
              <span>— {testimonial.name}, {testimonial.age}{scoreCategory !== "minimal" ? `, experienced ${scoreCategory === "early" ? "similar early symptoms" : testimonial.specific}` : ""}</span>
              {testimonialPosition === "bottom" && (
                <span className="text-xs bg-[#5D4154]/10 text-[#5D4154] px-2 py-1 rounded-full">Verified User</span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTestimonial;
