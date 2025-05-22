
import React from "react";
import { Button } from "@/components/ui/button";
import RevealSection from "@/components/ui/reveal-section";

interface AppShowcaseProps {
  onStartTrial: () => void;
}

const AppShowcase: React.FC<AppShowcaseProps> = ({ onStartTrial }) => {
  return (
    <div className="py-12 md:py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <RevealSection className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#5D4154] mb-3">
            Here's Exactly How Peritrack Works
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#7D6174]">
            Your simple 3-step path to understanding and managing your perimenopause symptoms
          </p>
        </RevealSection>
        
        {/* Step 1: Track Your Symptoms */}
        <RevealSection className="mb-16" delay={100}>
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
                <div className="rounded-md w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  Daily Tracking Interface
                </div>
                <p className="text-center text-sm text-gray-500 mt-2 italic">
                  Our simple daily tracking takes just seconds to complete
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
        
        {/* Step 2: Discover Your Patterns */}
        <RevealSection className="mb-16" delay={200}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="bg-[#F8F9FA] rounded-lg p-2 shadow-md">
                <div className="rounded-md w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  Pattern Visualization
                </div>
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
        </RevealSection>
        
        {/* Step 3: Get Personalized Solutions */}
        <RevealSection className="mb-16" delay={300}>
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
                <div className="rounded-md w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                  Personalized Recommendations
                </div>
                <p className="text-center text-sm text-gray-500 mt-2 italic">
                  Clear, actionable solutions based on your unique patterns
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
        
        {/* Results & Benefits Section */}
        <RevealSection className="mb-12" delay={400}>
          <h3 className="text-center text-xl font-playfair font-semibold text-[#5D4154] mb-8">
            What This Means For You
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                icon: <div className="text-[#9b87f5] text-3xl">💤</div>,
                title: "Better Sleep",
                stat: "78% of users report improved sleep quality within 30 days"
              },
              {
                icon: <div className="text-[#9b87f5] text-3xl">🧠</div>,
                title: "Mental Clarity",
                stat: "65% reduction in brain fog and focus issues"
              },
              {
                icon: <div className="text-3xl">😌</div>,
                title: "Mood Stability",
                stat: "71% report improved emotional balance"
              },
              {
                icon: <div className="text-[#9b87f5] text-3xl">🌡️</div>,
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
        </RevealSection>
        
        {/* Secondary CTA */}
        <RevealSection className="text-center mt-12 mb-4" delay={500}>
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
        </RevealSection>
      </div>
    </div>
  );
};

export default AppShowcase;
