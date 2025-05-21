
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, Award, Clock, Star, ArrowRight, LockKeyhole } from "lucide-react";

interface ValuePropositionProps {
  primarySymptom: string;
  secondarySymptoms: string[];
}

const ValueProposition: React.FC<ValuePropositionProps> = ({ 
  primarySymptom, 
  secondarySymptoms = [] 
}) => {
  const navigate = useNavigate();
  const [spotsRemaining] = useState(13);
  
  // Format symptom for display
  const formatSymptom = (symptom: string) => {
    return symptom
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/Changes|Symptoms/g, '')
      .trim();
  };
  
  const formattedPrimary = formatSymptom(primarySymptom);
  const formattedSecondary = secondarySymptoms.slice(0, 2).map(formatSymptom);
  
  // Calculate the total value of all features
  const featuresValues = [97, 129, 89, 79, 119, 69];
  const totalValue = featuresValues.reduce((sum, val) => sum + val, 0);
  
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300 border-none bg-gradient-to-br from-[#FDFCFB] to-[#E2D1C3]/60">
      <CardContent className="p-5 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#5D4154] mb-5 font-playfair">
          INTRODUCING PERITRACK PREMIUM
        </h2>
        
        <p className="text-center text-[#5D4154] font-medium mb-6">
          The Complete Solution for Your Hormone Pattern
        </p>

        <p className="mb-8 text-[#5D4154]/80 text-center">
          After analyzing your assessment, we've created a personalized hormone management system 
          specifically designed for YOUR unique pattern. Here's exactly what you'll get for just $9.99/month:
        </p>
        
        {/* Feature Sections */}
        <div className="space-y-8 mb-8">
          {/* Tracking System */}
          <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                <div className="text-[#A7C4A0]">🔍</div>
              </div>
              <h3 className="font-bold text-lg text-[#5D4154]">
                PERSONALIZED HORMONE TRACKING SYSTEM <span className="text-[#A7C4A0]">($97 VALUE)</span>
              </h3>
            </div>
            
            <p className="text-[#5D4154]/80 mb-3">
              Unlike generic health trackers, your Peritrack dashboard is specifically calibrated to your 
              hormone pattern, focusing on:
            </p>
            
            <ul className="space-y-2 mb-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Custom-designed tracking for your {formattedPrimary}, 
                  {formattedSecondary[0] || "mood changes"}, and {formattedSecondary[1] || "energy levels"}
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Hormone pattern analysis that identifies your unique fluctuation signature
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  AI-powered trigger identification that spots patterns you'd never notice manually
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Precision timing detection that reveals exactly when your hormones shift
                </p>
              </li>
            </ul>
            
            <div className="bg-[#FFECD6]/30 p-3 rounded-lg border border-[#FFECD6]/50 italic text-sm text-[#5D4154]/80">
              "Peritrack's custom tracking identified the exact foods and timing that were triggering my 
              symptoms—something no doctor found in 3 years of appointments." —Sarah, 46
            </div>
          </div>
          
          {/* Luna AI */}
          <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                <div className="text-[#A7C4A0]">🧠</div>
              </div>
              <h3 className="font-bold text-lg text-[#5D4154]">
                LUNA AI HORMONE SUPPORT COMPANION <span className="text-[#A7C4A0]">($129 VALUE)</span>
              </h3>
            </div>
            
            <p className="text-[#5D4154]/80 mb-3">
              Your 24/7 personal hormone guide with unlimited access:
            </p>
            
            <ul className="space-y-2 mb-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Trained specifically on YOUR hormone pattern and symptoms
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Available anytime—especially during those 3 AM anxiety moments
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Provides evidence-based guidance for your exact symptom profile
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <ArrowRight className="h-4 w-4 text-[#A7C4A0]" />
                </div>
                <p className="ml-2 text-sm text-[#5D4154]/80">
                  Remembers your entire symptom history and what works for YOU
                </p>
              </li>
            </ul>
            
            <div className="bg-[#FFECD6]/30 p-3 rounded-lg border border-[#FFECD6]/50 italic text-sm text-[#5D4154]/80">
              "Having Luna available day and night completely changed my perimenopause experience. 
              After months of feeling dismissed by doctors, I finally had someone who truly understood 
              what I was going through and offered guidance that actually worked." —Jennifer, 45
            </div>
          </div>
          
          {/* Collapsible Features - Show First 2, Hide Rest */}
          <details className="group">
            <summary className="cursor-pointer list-none flex justify-center mb-2">
              <span className="text-[#A7C4A0] font-medium flex items-center">
                Show More Features 
                <span className="ml-1 group-open:rotate-180 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </span>
            </summary>
            
            <div className="space-y-6">
              {/* Analytics */}
              <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                    <div className="text-[#A7C4A0]">📊</div>
                  </div>
                  <h3 className="font-bold text-lg text-[#5D4154]">
                    PRECISION HORMONE ANALYTICS <span className="text-[#A7C4A0]">($89 VALUE)</span>
                  </h3>
                </div>
                
                <p className="text-[#5D4154]/80 mb-3">
                  Advanced pattern recognition that reveals what's really happening in your body:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Weekly Hormone Pattern Reports</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Symptom Correlation Analysis</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Intervention Effectiveness Tracking</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Personalized Hormone Timeline</p>
                  </div>
                </div>
              </div>
              
              {/* Lab Interpretation */}
              <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                    <div className="text-[#A7C4A0]">🔬</div>
                  </div>
                  <h3 className="font-bold text-lg text-[#5D4154]">
                    LAB INTERPRETATION SYSTEM <span className="text-[#A7C4A0]">($79 VALUE)</span>
                  </h3>
                </div>
                
                <p className="text-[#5D4154]/80 mb-3">
                  Makes sense of your hormone testing with personalized insights:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Upload lab results for instant interpretation</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Compare YOUR labs to optimal ranges</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Identify overlooked imbalances</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Generate specific recommendations</p>
                  </div>
                </div>
              </div>
              
              {/* Protocol System */}
              <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                    <div className="text-[#A7C4A0]">📋</div>
                  </div>
                  <h3 className="font-bold text-lg text-[#5D4154]">
                    PERSONALIZED PROTOCOL SYSTEM <span className="text-[#A7C4A0]">($119 VALUE)</span>
                  </h3>
                </div>
                
                <p className="text-[#5D4154]/80 mb-3">
                  Your complete, customized hormone balancing approach:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Custom Nutrition Plan</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Supplement Recommendations</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Lifestyle Modifications</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Exercise Protocol</p>
                  </div>
                </div>
              </div>
              
              {/* Healthcare Tools */}
              <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                    <div className="text-[#A7C4A0]">⚕️</div>
                  </div>
                  <h3 className="font-bold text-lg text-[#5D4154]">
                    HEALTHCARE PARTNERSHIP TOOLS <span className="text-[#A7C4A0]">($69 VALUE)</span>
                  </h3>
                </div>
                
                <p className="text-[#5D4154]/80 mb-3">
                  Tools to make your doctor visits more productive:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Doctor Visit Preparation Guides</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Customized Lab Request Templates</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Symptom Documentation</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Treatment Response Tracking</p>
                  </div>
                </div>
              </div>
              
              {/* Continuous Support */}
              <div className="p-5 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="bg-[#A7C4A0]/20 p-2 rounded-full mr-3">
                    <div className="text-[#A7C4A0]">🔄</div>
                  </div>
                  <h3 className="font-bold text-lg text-[#5D4154]">
                    CONTINUOUS SUPPORT SYSTEM
                  </h3>
                </div>
                
                <p className="text-[#5D4154]/80 mb-3">
                  Your subscription includes:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Weekly Insights tailored to your pattern</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Bi-weekly Protocol Updates</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Monthly Progress Assessments</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-4 w-4 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5D4154]/80">Regular New Feature Access</p>
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
        
        {/* Value Summary */}
        <div className="bg-[#5D4154] text-white p-5 rounded-lg text-center mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
            <div>
              <p className="text-white/80 mb-1">TOTAL VALUE:</p>
              <p className="text-xl font-bold line-through opacity-80">${totalValue}+</p>
            </div>
            <div className="bg-white/20 h-10 w-0.5 hidden md:block"></div>
            <div>
              <p className="text-white/80 mb-1">YOUR PRICE:</p>
              <p className="text-xl font-bold">JUST $9.99/MONTH</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-white/80">
            That's less than $0.33 per day for a complete solution to your {formattedPrimary}, {formattedSecondary[0] || "mood changes"}, and {formattedSecondary[1] || "energy levels"}.
          </p>
          <p className="mt-2 text-sm text-white/80">
            Or think of it this way: about the cost of one coffee a week to potentially transform your sleep, energy, mood, and overall quality of life.
          </p>
        </div>
        
        {/* Enhanced Trial Offer */}
        <div className="bg-white p-6 rounded-lg border-2 border-[#A7C4A0] mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-center text-[#5D4154] mb-4">
            START YOUR TRANSFORMATION TODAY
          </h3>
          
          <p className="text-center font-medium mb-4 text-[#5D4154]">
            Begin with a COMPLETELY FREE 7-DAY TRIAL that includes:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5D4154]/80">Full access to your personalized hormone dashboard</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5D4154]/80">Unlimited conversations with Luna, your AI support companion</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5D4154]/80">Complete hormone pattern analysis and insights</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#5D4154]/80">Custom tracking system for your specific symptoms</p>
            </div>
          </div>
          
          <div className="bg-[#FFECD6]/30 p-4 rounded-lg mb-6">
            <p className="font-medium text-[#5D4154] mb-3">
              PLUS THESE SPECIAL BONUSES (FREE WITH YOUR TRIAL):
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 text-[#A7C4A0]">🎁</div>
                <div className="ml-2">
                  <p className="font-medium text-[#5D4154]">
                    "{formattedPrimary.toUpperCase()} RAPID RELIEF PROTOCOL" <span className="text-[#A7C4A0]">($47 VALUE)</span>
                  </p>
                  <p className="text-sm text-[#5D4154]/80">
                    A specialized action plan designed for your specific hormone pattern that delivers first results in as little as 3-5 days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 text-[#A7C4A0]">🎁</div>
                <div className="ml-2">
                  <p className="font-medium text-[#5D4154]">
                    "HORMONE BALANCE MASTERCLASS" <span className="text-[#A7C4A0]">($37 VALUE)</span>
                  </p>
                  <p className="text-sm text-[#5D4154]/80">
                    A comprehensive video guide to understanding and managing your specific hormone pattern.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-0.5 text-[#A7C4A0]">🎁</div>
                <div className="ml-2">
                  <p className="font-medium text-[#5D4154]">
                    "DOCTOR DISCUSSION GUIDE" <span className="text-[#A7C4A0]">($29 VALUE)</span>
                  </p>
                  <p className="text-sm text-[#5D4154]/80">
                    A customized resource to help you have productive conversations with healthcare providers about your symptoms.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-5">
            <Button
              onClick={handleStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-bold py-3 px-8 md:px-12 rounded-full text-lg shadow-lg transform transition-transform hover:scale-105"
            >
              START MY FREE TRIAL NOW
            </Button>
            
            <p className="mt-3 text-sm text-[#5D4154]/70">
              No credit card required to start • No obligation to continue • Cancel with one click anytime
            </p>
          </div>
          
          <div className="text-center text-sm text-[#5D4154]/80">
            <p className="mb-2">
              After your free 7-day trial, continue with full access for just $9.99/month.
            </p>
            <p className="mb-4">
              That's less than the cost of:<br />
              • A single bottle of basic supplements<br />
              • One co-pay for a doctor visit<br />
              • Two premium coffees
            </p>
            <div className="bg-[#5D4154]/5 p-3 rounded-lg mb-4">
              <p className="font-medium text-[#5D4154]">
                RISK-FREE GUARANTEE:
              </p>
              <p className="text-[#5D4154]/80">
                If you don't experience meaningful insights and support within your first 30 days as a paid member, 
                we'll refund your subscription fee—no questions asked.
              </p>
            </div>
            <p className="font-medium text-[#5D4154]">
              JOIN OVER 30,000 WOMEN WHO'VE TRANSFORMED THEIR PERIMENOPAUSE EXPERIENCE
            </p>
          </div>
        </div>
        
        {/* Before/After Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center text-[#5D4154] mb-4">
            IMAGINE YOUR LIFE 30 DAYS FROM NOW
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-5 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                WITHOUT PERITRACK:
              </h4>
              <ul className="space-y-2">
                {[
                  `Still struggling with unpredictable ${formattedPrimary.toLowerCase()} disrupting your days`,
                  `Continuing to experience ${formattedSecondary[0]?.toLowerCase() || "symptoms"} with no clear solution`,
                  "Feeling frustrated by the lack of answers from standard approaches",
                  "Watching as symptoms potentially worsen over time",
                  "Spending money on generic solutions that don't address YOUR specific pattern",
                  "Feeling increasingly alone in your perimenopause journey"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5 text-red-500">•</div>
                    <p className="ml-2 text-sm text-gray-600">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#A7C4A0]/10 p-5 rounded-lg">
              <h4 className="font-bold text-[#5D4154] mb-3 flex items-center">
                WITH PERITRACK:
              </h4>
              <ul className="space-y-2">
                {[
                  "Understanding exactly why your symptoms occur and how to address them",
                  "Having a clear, personalized plan that targets YOUR unique hormone pattern",
                  "Experiencing initial improvements in your most bothersome symptoms",
                  "Feeling supported 24/7 by Luna, who truly understands your experience",
                  "Saving money by focusing only on interventions that work for YOUR body",
                  "Joining a community of women who share your experience",
                  "Reclaiming control of your body, mind, and quality of life"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5 text-[#A7C4A0]">•</div>
                    <p className="ml-2 text-sm text-[#5D4154]/80">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="mt-4 text-center text-[#5D4154]/80 italic">
            The choice is yours. But remember: women with your exact hormone pattern who delay intervention 
            typically experience a 30-45% increase in symptom severity within just 3-6 months.
          </p>
          <p className="mt-2 text-center font-medium text-[#5D4154]">
            Why struggle unnecessarily when your personalized solution is ready right now?
          </p>
        </div>
        
        {/* Final CTA with Urgency */}
        <div className="bg-[#5D4154] text-white p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">
            SPECIAL LIMITED-TIME OFFER
          </h3>
          
          <p className="mb-4">
            The next 50 women who start their free trial today also receive:
          </p>
          
          <div className="space-y-3 mb-5">
            <div className="flex items-start">
              <LockKeyhole className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-left">
                <span className="font-medium">LIFETIME ACCESS</span> to our "Perimenopause Survival Blueprint" library ($67 value)
              </p>
            </div>
            <div className="flex items-start">
              <LockKeyhole className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-left">
                <span className="font-medium">PREMIUM ACCESS</span> to our monthly expert Q&A sessions ($19/month value)
              </p>
            </div>
            <div className="flex items-start">
              <LockKeyhole className="h-5 w-5 text-[#A7C4A0] mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-left">
                <span className="font-medium">PRIORITY ONBOARDING</span> with a personalized welcome session ($45 value)
              </p>
            </div>
          </div>
          
          <div className="mb-5">
            <div className="inline-block bg-white/20 px-4 py-2 rounded-lg mb-2">
              <Clock className="h-5 w-5 inline-block mr-2 mb-0.5" />
              <span className="font-medium">Only {spotsRemaining} spots remaining today!</span>
            </div>
          </div>
          
          <Button
            onClick={handleStartTrial}
            className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform hover:scale-105 mb-4"
          >
            CLAIM MY FREE TRIAL NOW
          </Button>
          
          <p className="text-sm text-white/80">
            No risk. No obligation. Just the support and solutions you deserve.
          </p>
          
          <div className="flex justify-center gap-3 mt-4">
            <div className="text-xs bg-white/10 px-2 py-1 rounded">HIPAA Compliant</div>
            <div className="text-xs bg-white/10 px-2 py-1 rounded">256-bit Encryption</div>
            <div className="text-xs bg-white/10 px-2 py-1 rounded">Medically Reviewed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValueProposition;

