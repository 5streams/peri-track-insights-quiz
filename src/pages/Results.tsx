
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve results and user info from localStorage
    const storedResults = localStorage.getItem("quizResults");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no results, redirect to quiz
      navigate("/quiz");
    }
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [navigate]);
  
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFECD6]/30 p-4">
        <div className="text-center">
          <h1 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-4">
            Loading your results...
          </h1>
          <p>Please wait while we prepare your personalized assessment.</p>
        </div>
      </div>
    );
  }
  
  // Helper function to get severity text
  const getSeverityText = (score: number) => {
    if (score >= 70) return "High";
    if (score >= 40) return "Moderate";
    return "Mild";
  };
  
  return (
    <div className="min-h-screen bg-[#FFECD6]/30 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] mb-4">
            Hello, {userInfo.firstName}
          </h1>
          
          <p className="text-lg mb-4">
            Thank you for completing your perimenopause assessment. Based on your responses, we've identified several key insights about your hormonal transition.
          </p>
          
          <p className="text-gray-600">
            Your assessment reveals that you are experiencing symptoms consistent with the {results.phase.toLowerCase()} phase of perimenopause.
          </p>
        </section>
        
        {/* Hormone Transition Score Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-full border-8 border-[#5D4154] flex items-center justify-center">
                <span className="text-3xl font-bold text-[#5D4154]">{results.score}/100</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#A7C4A0] text-white px-4 py-1 rounded-full text-sm">
                {results.phase} Phase
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-2">
                Your Hormone Transition Score
              </h2>
              
              <p>
                This score represents where you are in your perimenopause transition based on your symptom profile and age factors. Women in the {results.phase.toLowerCase()} phase typically experience {getSeverityText(results.score).toLowerCase()}-intensity symptoms that may require targeted management strategies.
              </p>
            </div>
          </div>
        </section>
        
        {/* Primary Symptom Clusters */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-6">
            Your Primary Symptom Clusters
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {results.primarySymptoms.map((symptom, index) => (
              <div 
                key={index} 
                className="border rounded-xl p-4 relative"
              >
                <div className="absolute -top-3 left-4 bg-[#FFECD6] px-3 py-1 text-[#5D4154] text-sm font-medium rounded-full">
                  {getSeverityText(results.score)}
                </div>
                <h3 className="font-playfair text-xl font-semibold mt-2 mb-3">
                  {symptom}
                </h3>
                <p className="text-sm text-gray-600">
                  {index === 0 ? (
                    "These symptoms are common during perimenopause as estrogen levels begin to fluctuate."
                  ) : (
                    <span className="blur-sm">
                      Details about your specific pattern and management strategies available in your full assessment.
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Hormone Pattern Analysis - Gated */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-10">
            <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white px-8 py-6 text-lg">
              Unlock Your Full Analysis
            </Button>
          </div>
          
          <h2 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-6">
            Your Hormone Pattern Analysis
          </h2>
          
          <div className="flex items-center space-x-8">
            <div className="w-24 h-24 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <h3 className="font-playfair text-xl font-semibold mb-2">Likely Hormone Pattern</h3>
              <p className="text-gray-600">
                Based on your symptom profile, you appear to be experiencing...
              </p>
            </div>
          </div>
        </section>
        
        {/* Personalized Recommendations */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-6">
            Your Personalized Recommendations
          </h2>
          
          <div className="space-y-4">
            {results.recommendedActions.map((action, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p>{action}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg blur-sm">
            <h3 className="font-semibold">Premium Recommendations:</h3>
            <ul className="mt-2 space-y-2">
              <li>Personalized supplement protocol based on your symptoms</li>
              <li>Specific lifestyle modifications for your hormone pattern</li>
              <li>Tailored nutrition plan to support hormone balance</li>
            </ul>
          </div>
        </section>
        
        {/* Premium Offer Section */}
        <section className="bg-[#5D4154] text-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-4">
            Unlock Your Complete Perimenopause Assessment
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4">
                Get a detailed analysis of your symptoms, personalized recommendations, and ongoing support through your perimenopause journey.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center">✓</div>
                  <span>Detailed hormone pattern analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center">✓</div>
                  <span>Personalized symptom management plan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center">✓</div>
                  <span>Weekly symptom tracking tools</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center">✓</div>
                  <span>Expert guidance and resources</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white text-[#5D4154] p-6 rounded-xl">
              <h3 className="font-playfair text-xl font-semibold mb-4">
                Start Your Free 7-Day Trial
              </h3>
              
              <div className="flex justify-between mb-2">
                <span>Monthly Plan:</span>
                <span className="font-semibold">$14/month</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Annual Plan:</span>
                <span className="font-semibold">$59/year (Save 30%)</span>
              </div>
              
              <Button className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white py-6 text-lg">
                Start My Free Trial
              </Button>
              
              <p className="text-center text-sm mt-4">No credit card required</p>
              <p className="text-center text-xs mt-2">100% satisfaction guaranteed</p>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-6 text-center">
            Women Like You Are Finding Relief
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-semibold">
                  JM
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Jennifer M.</p>
                  <p className="text-sm text-gray-500">Age 47</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "After years of unpredictable symptoms, Peritrack finally helped me understand what was happening. The personalized recommendations made such a difference in my sleep and mood swings."
              </p>
            </div>
            
            <div className="border rounded-lg p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-semibold">
                  SK
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Sarah K.</p>
                  <p className="text-sm text-gray-500">Age 42</p>
                </div>
              </div>
              <p className="italic text-gray-600">
                "I thought I was too young for perimenopause, but my assessment showed I was in the early phase. The tracking tools have helped me identify triggers and manage my symptoms effectively."
              </p>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#5D4154] mb-4">
            Take Control of Your Perimenopause Journey
          </h2>
          
          <p className="mb-8">
            Join thousands of women who have found clarity and relief with personalized tracking and guidance.
          </p>
          
          <Button className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white px-8 py-6 text-lg mx-auto">
            Start My Free 7-Day Trial
          </Button>
          
          <p className="text-sm text-gray-500 mt-3">
            Then just $14/month if I love it
          </p>
        </section>
        
        {/* Back to Quiz Button */}
        <div className="text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/quiz")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
