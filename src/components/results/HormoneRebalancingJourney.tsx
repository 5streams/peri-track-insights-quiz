
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const HormoneRebalancingJourney = () => {
  return (
    <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
      <CardHeader className="pb-4 border-b">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-4">
            <Sparkles className="h-5 w-5 text-[#5D4154]" />
          </div>
          YOUR COMPLETE HORMONE REBALANCING JOURNEY
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6 text-lg">
          Based on your specific pattern, we've created a personalized path forward that addresses both your physical symptoms and emotional well-being:
        </p>
        
        <div className="space-y-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#FFECD6]">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-bold text-lg mr-3">1</div>
              <h3 className="font-playfair text-xl font-semibold text-[#5D4154]">PHASE 1: UNDERSTANDING & VALIDATION (Days 1-21)</h3>
            </div>
            
            <div className="ml-14">
              <p className="mb-3">During this foundation-building phase, you'll:</p>
              <ul className="space-y-2 mb-4 pl-5">
                <li>Begin tracking your specific physical and emotional symptoms</li>
                <li>Identify patterns in your hormone fluctuations</li>
                <li>Discover connections between triggers and your responses</li>
                <li>Gain clarity about what's happening in your body and mind</li>
                <li>Start implementing initial relief strategies</li>
              </ul>
              
              <div className="bg-[#FFECD6]/20 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Emotional milestones typically experienced in this phase:</h4>
                <ul className="space-y-1 pl-5">
                  <li>Relief from finally understanding what's happening</li>
                  <li>Validation that your experiences are real and significant</li>
                  <li>Reduced anxiety about unpredictable symptoms</li>
                  <li>Hope as you begin to see patterns emerge</li>
                  <li>Empowerment through knowledge and awareness</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-[#FFECD6] pl-4 py-2 italic text-gray-600">
                "Just two weeks of tracking gave me such clarity. Understanding that my emotional sensitivity peaked at specific times helped me plan important conversations and reduce conflicts."
                <div className="text-right font-medium mt-2 text-gray-500">- Karen, 44</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#FFBF69]">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-[#FFBF69] flex items-center justify-center text-[#5D4154] font-bold text-lg mr-3">2</div>
              <h3 className="font-playfair text-xl font-semibold text-[#5D4154]">PHASE 2: CLARITY & INSIGHT (Days 21-35)</h3>
            </div>
            
            <div className="ml-14">
              <p className="mb-3">During this illuminating phase, you'll:</p>
              <ul className="space-y-2 mb-4 pl-5">
                <li>Complete comprehensive hormone testing</li>
                <li>Connect your lab results with your tracked symptoms</li>
                <li>Gain deeper insight into your unique hormone landscape</li>
                <li>Develop a personalized intervention strategy</li>
                <li>Build confidence in your understanding</li>
              </ul>
              
              <div className="bg-[#FFBF69]/20 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Emotional milestones typically experienced in this phase:</h4>
                <ul className="space-y-1 pl-5">
                  <li>Confidence from having objective data</li>
                  <li>Relief from having validation through testing</li>
                  <li>Clarity about the path forward</li>
                  <li>Reduced self-criticism as you understand biological factors</li>
                  <li>Increased sense of control and agency</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-[#FFBF69] pl-4 py-2 italic text-gray-600">
                "Getting my test results and seeing how they perfectly explained my symptoms was incredibly validating. After years of feeling dismissed, I finally had proof that what I was experiencing was real."
                <div className="text-right font-medium mt-2 text-gray-500">- Patricia, 47</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#A7C4A0]">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-[#A7C4A0] flex items-center justify-center text-[#5D4154] font-bold text-lg mr-3">3</div>
              <h3 className="font-playfair text-xl font-semibold text-[#5D4154]">PHASE 3: BALANCE & RENEWAL (Days 35+)</h3>
            </div>
            
            <div className="ml-14">
              <p className="mb-3">During this transformative phase, you'll:</p>
              <ul className="space-y-2 mb-4 pl-5">
                <li>Implement your personalized rebalancing protocol</li>
                <li>Apply targeted strategies during vulnerable times</li>
                <li>Refine your approach based on your unique responses</li>
                <li>Experience progressive symptom improvement</li>
                <li>Develop long-term hormone harmony strategies</li>
              </ul>
              
              <div className="bg-[#A7C4A0]/20 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">Emotional milestones typically experienced in this phase:</h4>
                <ul className="space-y-1 pl-5">
                  <li>Increased emotional stability and resilience</li>
                  <li>Return of joy and pleasure in daily activities</li>
                  <li>Renewed confidence in your body and mind</li>
                  <li>Improved relationships as emotional fluctuations stabilize</li>
                  <li>Sense of mastery over your perimenopause journey</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-[#A7C4A0] pl-4 py-2 italic text-gray-600">
                "Six weeks in, I had my first week without tears or anxiety in over a year. By three months, friends were commenting on how much more like 'myself' I seemed. I wasn't just managing symptoms—I was thriving again."
                <div className="text-right font-medium mt-2 text-gray-500">- Michelle, 48</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg hover:bg-[#A7C4A0]/20 transition-colors duration-300 transform hover:-translate-y-1">
            <div className="font-bold text-3xl text-[#5D4154] mb-1">62%</div>
            <p>reduction in sleep disturbances within 60 days</p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg hover:bg-[#A7C4A0]/20 transition-colors duration-300 transform hover:-translate-y-1">
            <div className="font-bold text-3xl text-[#5D4154] mb-1">57%</div>
            <p>improvement in energy levels within 45 days</p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg hover:bg-[#A7C4A0]/20 transition-colors duration-300 transform hover:-translate-y-1">
            <div className="font-bold text-3xl text-[#5D4154] mb-1">49%</div>
            <p>reduction in mood fluctuations within 90 days</p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg hover:bg-[#A7C4A0]/20 transition-colors duration-300 transform hover:-translate-y-1">
            <div className="font-bold text-3xl text-[#5D4154] mb-1">53%</div>
            <p>improvement in cognitive symptoms within 30 days</p>
          </div>
        </div>
        
        <p className="font-medium text-center mt-6 bg-[#FFECD6]/30 p-4 rounded-lg border border-[#FFECD6] animate-pulse-subtle">
          The key difference? Having precise data about their unique hormone patterns that allowed for targeted, personalized approaches rather than generic solutions.
        </p>
      </CardContent>
    </Card>
  );
};

export default HormoneRebalancingJourney;
