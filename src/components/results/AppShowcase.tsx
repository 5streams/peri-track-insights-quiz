
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Moon, Thermometer } from "lucide-react";

interface AppShowcaseProps {
  onStartTrial: () => void;
}

const AppShowcase: React.FC<AppShowcaseProps> = ({ onStartTrial }) => {
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  // Add animation observer for reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div 
      ref={showcaseRef} 
      className="py-12 md:py-16 bg-white border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 reveal-section transform opacity-0">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#5D4154] mb-3">
            Here's Exactly How Peritrack Works
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#7D6174]">
            Your simple 3-step path to understanding and managing your perimenopause symptoms
          </p>
        </div>
        
        {/* Step 1: Track Your Symptoms */}
        <div className="mb-16 reveal-section transform opacity-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#5D4154] text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  1
                </div>
                <h3 className="font-playfair text-xl font-semibold text-[#5D4154]">
                  Easy Daily Tracking
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Quickly log your symptoms, mood, and energy levels in just 30 seconds a day.
                Our intuitive tracking system makes it simple to maintain consistency.
              </p>
              
              <ul className="space-y-2 mb-4">
                {["Track physical, emotional, and cognitive symptoms", 
                  "Monitor sleep quality and energy fluctuations", 
                  "Record potential triggers like food, stress, and exercise"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#A7C4A0] mr-2 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="bg-[#F8F9FA] rounded-lg p-2 shadow-md">
                <img 
                  src="/tracking-interface-mockup.png" 
                  alt="Peritrack symptom tracking interface" 
                  className="rounded-md w-full"
                  onError={(e) => {
                    // Fallback for missing image
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Daily+Tracking+Interface";
                  }}
                />
                <p className="text-center text-sm text-gray-500 mt-2 italic">
                  Our simple daily tracking takes just seconds to complete
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 2: Discover Your Patterns */}
        <div className="mb-16 reveal-section transform opacity-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-[#F8F9FA] rounded-lg p-2 shadow-md">
                <img 
                  src="/pattern-visualization-mockup.png" 
                  alt="Hormone pattern visualization" 
                  className="rounded-md w-full"
                  onError={(e) => {
                    // Fallback for missing image
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Pattern+Visualization";
                  }}
                />
                <p className="text-center text-sm text-gray-500 mt-2 italic">
                  Discover exactly what's happening in your body and why
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#5D4154] text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  2
                </div>
                <h3 className="font-playfair text-xl font-semibold text-[#5D4154]">
                  See Your Unique Hormone Patterns
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Our AI-powered analysis reveals connections between your symptoms, 
                hormone fluctuations, and triggers that even doctors might miss.
              </p>
              
              <ul className="space-y-2 mb-4">
                {["Visualize symptom patterns across your cycle", 
                  "Identify specific triggers causing your symptoms", 
                  "Understand your unique hormone fluctuations"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#A7C4A0] mr-2 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Step 3: Get Personalized Solutions */}
        <div className="mb-16 reveal-section transform opacity-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 bg-[#5D4154] text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
                  3
                </div>
                <h3 className="font-playfair text-xl font-semibold text-[#5D4154]">
                  Receive Personalized Relief Recommendations
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4">
                Get specific, actionable recommendations tailored to your unique symptoms 
                and patterns, helping you find relief and regain control.
              </p>
              
              <ul className="space-y-2 mb-4">
                {["Targeted nutrition suggestions for your symptoms", 
                  "Specific exercise and movement recommendations", 
                  "Stress management and sleep optimization techniques",
                  "Timing guidance for maximum effectiveness"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#A7C4A0] mr-2 text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="bg-[#F8F9FA] rounded-lg p-2 shadow-md">
                <img 
                  src="/recommendations-mockup.png" 
                  alt="Personalized recommendations screen" 
                  className="rounded-md w-full"
                  onError={(e) => {
                    // Fallback for missing image
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Personalized+Recommendations";
                  }}
                />
                <p className="text-center text-sm text-gray-500 mt-2 italic">
                  Clear, actionable solutions based on your unique patterns
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results & Benefits Section */}
        <div className="mb-12 reveal-section transform opacity-0">
          <h3 className="text-center text-xl font-playfair font-semibold text-[#5D4154] mb-8">
            What This Means For You
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: <Moon className="h-8 w-8 text-[#9b87f5]" />,
                title: "Better Sleep",
                stat: "78% of users report improved sleep quality within 30 days"
              },
              {
                icon: <Brain className="h-8 w-8 text-[#9b87f5]" />,
                title: "Mental Clarity",
                stat: "65% reduction in brain fog and focus issues"
              },
              {
                icon: <div className="text-3xl">😌</div>,
                title: "Mood Stability",
                stat: "71% report improved emotional balance"
              },
              {
                icon: <Thermometer className="h-8 w-8 text-[#9b87f5]" />,
                title: "Fewer Hot Flashes",
                stat: "63% decrease in hot flash frequency and intensity"
              }
            ].map((result, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-2">{result.icon}</div>
                  <h4 className="font-semibold mb-2 text-[#5D4154]">{result.title}</h4>
                  <p className="text-sm text-gray-600">{result.stat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Secondary CTA */}
        <div className="text-center mt-12 mb-4 reveal-section transform opacity-0">
          <h3 className="text-xl md:text-2xl font-playfair font-semibold text-[#5D4154] mb-3">
            Ready to Take Control of Your Perimenopause Symptoms?
          </h3>
          <p className="mb-6 text-[#7D6174]">
            Join thousands of women who've transformed their perimenopause experience
          </p>
          
          <Button 
            onClick={onStartTrial}
            className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 text-base md:text-lg"
          >
            Start Your Free Trial Today
          </Button>
          
          <p className="text-sm text-gray-500 mt-3">
            No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
