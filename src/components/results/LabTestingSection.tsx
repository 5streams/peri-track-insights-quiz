
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { TestTube, FileText, Microscope, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LabTestingSection = () => {
  return (
    <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
      <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
      <CardHeader className="pb-4 border-b">
        <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-4">
            <TestTube className="h-5 w-5 text-[#5D4154]" />
          </div>
          Understanding Your Hormones: The Missing Piece
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="lab-explanation flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <p className="personalized-opener text-lg mb-6">
              Based on your symptom pattern, laboratory testing would provide crucial insights about your specific hormone levels.
            </p>
            
            <div className="why-testing mb-6">
              <h3 className="text-[#5D4154] text-xl font-semibold mb-3">Why Testing Is Valuable For Your Symptoms</h3>
              <p className="mb-3">
                Your combination of symptoms strongly suggests changes in estrogen and progesterone levels. However, symptoms alone can't tell us:
              </p>
              
              <ul className="space-y-2 pl-5 mb-4">
                <li className="relative pl-2">
                  <span className="font-semibold">Exactly where your hormone levels stand</span> relative to optimal ranges
                </li>
                <li className="relative pl-2">
                  <span className="font-semibold">Which specific hormones</span> are most affected in your unique situation
                </li>
                <li className="relative pl-2">
                  <span className="font-semibold">How your hormones are balancing</span> with each other (the ratios often matter more than absolute levels)
                </li>
              </ul>
              
              <p className="text-[#5D4154] italic">
                For women with your symptom profile, we typically see one of three distinct hormone patterns—each requiring a different approach for symptom relief.
              </p>
            </div>
            
            <div className="recommended-tests">
              <h3 className="text-[#5D4154] text-xl font-semibold mb-3">Recommended Testing For Your Profile</h3>
              <p className="mb-4">Based on your responses, these specific hormone tests would provide the most valuable insights:</p>
              
              <div className="test-recommendations space-y-4">
                <div className="test-item bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#5D4154] mr-3" />
                    <span className="test-name font-semibold text-[#5D4154]">Estradiol (E2)</span>
                  </div>
                  <span className="test-relevance text-gray-600 mt-1 block pl-8">
                    Directly related to your primary symptoms
                  </span>
                </div>
                
                <div className="test-item bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#5D4154] mr-3" />
                    <span className="test-name font-semibold text-[#5D4154]">Progesterone</span>
                  </div>
                  <span className="test-relevance text-gray-600 mt-1 block pl-8">
                    Connected to your sleep disruption and mood changes
                  </span>
                </div>
                
                <div className="test-item bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#5D4154] mr-3" />
                    <span className="test-name font-semibold text-[#5D4154]">FSH (Follicle Stimulating Hormone)</span>
                  </div>
                  <span className="test-relevance text-gray-600 mt-1 block pl-8">
                    Indicates where you are in the perimenopause transition
                  </span>
                </div>
                
                <div className="test-item bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#5D4154] mr-3" />
                    <span className="test-name font-semibold text-[#5D4154]">Testosterone</span>
                  </div>
                  <span className="test-relevance text-gray-600 mt-1 block pl-8">
                    Important for understanding energy levels and libido changes
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 md:max-w-[40%]">
            <div className="visualization-container bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-center text-[#5D4154] font-semibold mb-6">Why Testing Makes a Difference</h3>
              
              <div className="before-testing mb-8">
                <h4 className="text-center font-medium mb-3">With Symptoms Alone</h4>
                <div className="blurry-hormone-chart h-32 relative rounded-lg bg-gradient-to-r from-[#e9e3ee] to-[#FFECD6] overflow-hidden mb-2">
                  <div className="absolute inset-0 backdrop-blur-[3px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#5D4154]/40 text-lg font-semibold">Unclear Pattern</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600">Uncertain which hormones to address</p>
              </div>
              
              <div className="after-testing">
                <h4 className="text-center font-medium mb-3">With Lab Testing + Peritrack</h4>
                <div className="clear-hormone-chart h-32 relative rounded-lg bg-gradient-to-r from-[#A7C4A0]/40 to-[#FFECD6] overflow-hidden mb-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Microscope className="h-8 w-8 text-[#5D4154] mb-2" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#A7C4A0]/30 to-transparent"></div>
                </div>
                <p className="text-center text-sm text-gray-600">Clear path to symptom relief</p>
              </div>
            </div>
            
            <div className="testing-testimonial mt-6 bg-[#FFECD6]/50 p-5 rounded-lg border border-[#FFECD6] relative">
              <div className="absolute -top-3 -left-3 text-4xl text-[#5D4154]/20">"</div>
              <blockquote className="relative z-10 pt-2 pl-2 italic text-[#5D4154]">
                After years of being told my labs were 'normal,' Peritrack helped me understand that my estrogen and progesterone were actually way out of balance for MY body. Finally having this clarity changed everything.
                <cite className="block text-right font-medium mt-3 not-italic">— Rebecca, 46</cite>
              </blockquote>
              <div className="absolute -bottom-3 -right-3 text-4xl text-[#5D4154]/20">"</div>
            </div>
          </div>
        </div>
        
        <div className="lab-interpretation-explainer mt-8 pt-8 border-t border-[#FFECD6]">
          <h3 className="text-xl font-semibold text-[#5D4154] mb-4">How Peritrack Makes Your Lab Results Actually Useful</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="interpretation-challenges bg-white p-5 rounded-lg shadow-sm">
              <h4 className="font-semibold text-[#FF9B85] mb-3 flex items-center">
                <span className="inline-block h-6 w-6 rounded-full bg-[#FF9B85] text-white text-xs flex items-center justify-center mr-2">!</span>
                The Problem With Standard Lab Results:
              </h4>
              <ul className="space-y-2 pl-4">
                <li className="relative ml-4">Confusing reference ranges that don't account for perimenopause</li>
                <li className="relative ml-4">No connection between your numbers and your symptoms</li>
                <li className="relative ml-4">Difficult to understand what actions to take based on results</li>
                <li className="relative ml-4">No tracking of how your levels change over time</li>
              </ul>
            </div>
            
            <div className="peritrack-difference bg-white p-5 rounded-lg shadow-sm">
              <h4 className="font-semibold text-[#A7C4A0] mb-3 flex items-center">
                <span className="inline-block h-6 w-6 rounded-full bg-[#A7C4A0] text-white text-xs flex items-center justify-center mr-2">✓</span>
                With Peritrack Premium, You'll Get:
              </h4>
              <ul className="benefit-list space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="benefit-title font-semibold block text-[#5D4154]">Plain-Language Interpretation</span>
                    <span className="benefit-description text-sm text-gray-600">Your lab results explained in clear, simple terms—not medical jargon</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="benefit-title font-semibold block text-[#5D4154]">Symptom-Hormone Connections</span>
                    <span className="benefit-description text-sm text-gray-600">See exactly how your lab values connect to the symptoms you're experiencing</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="benefit-title font-semibold block text-[#5D4154]">Personalized Action Plan</span>
                    <span className="benefit-description text-sm text-gray-600">Get specific recommendations based on your unique hormone profile</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <span className="benefit-title font-semibold block text-[#5D4154]">Tracking Over Time</span>
                    <span className="benefit-description text-sm text-gray-600">Monitor how your hormone levels change and correlate with symptom improvements</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lab-testing-options mt-8">
          <h3 className="text-xl font-semibold text-[#5D4154] mb-4">Two Ways to Get the Insights You Need:</h3>
          
          <div className="testing-paths grid md:grid-cols-2 gap-6">
            <div className="path-option bg-white p-6 rounded-lg shadow-md border border-[#FFECD6]/30 hover:shadow-lg transition-all duration-300">
              <h4 className="font-semibold text-lg text-[#5D4154] mb-3">Option 1: Work With Your Doctor</h4>
              <p className="mb-3">Request these specific tests at your next appointment</p>
              <ul className="space-y-2 pl-5 mb-6">
                <li>Upload your results to Peritrack for interpretation</li>
                <li>We'll translate the medical jargon into actionable insights</li>
                <li>Track changes over time as you implement solutions</li>
              </ul>
              <div className="option-cta mt-auto">
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
            </div>
            
            <div className="path-option bg-white p-6 rounded-lg shadow-md border-2 border-[#A7C4A0] hover:shadow-lg transition-all duration-300 relative">
              <div className="absolute -top-3 right-4 bg-[#A7C4A0] text-white px-3 py-1 rounded-full text-sm font-medium">
                Recommended
              </div>
              <h4 className="font-semibold text-lg text-[#5D4154] mb-3">Option 2: At-Home Testing Kit</h4>
              <p className="mb-3">Simple, convenient testing without a doctor's visit</p>
              <ul className="space-y-2 pl-5 mb-6">
                <li>Complete hormone panel specifically for perimenopause</li>
                <li>Simple at-home collection, no appointment needed</li>
                <li>Results automatically integrated with your Peritrack dashboard</li>
                <li>Personalized interpretation and recommendations</li>
              </ul>
              <div className="pricing-note mb-4 bg-[#FFECD6]/30 p-2 rounded text-center">
                <p className="text-sm">Testing kits start at $129 (HSA/FSA eligible)</p>
              </div>
              <div className="option-cta">
                <Button className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/80">Learn About Testing Options</Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lab-cta-section mt-8 bg-gradient-to-r from-[#5D4154] to-[#5D4154]/90 text-white p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-3 text-white">Get the Complete Picture of Your Hormonal Health</h3>
          <p className="mb-6">Start your free 7-day trial of Peritrack to unlock your personalized testing recommendations and result interpretation tools.</p>
          <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-semibold py-2 px-6 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            START MY FREE TRIAL
          </Button>
          <p className="text-sm mt-3 text-white/80">You can explore testing options after creating your free account</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LabTestingSection;
