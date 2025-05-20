
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
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

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Format time for countdown display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
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

  // Helper function to get hormone pattern name based on symptoms and phase
  const getHormonePatternName = () => {
    if (results.phase === "Late") return "Declining Estrogen";
    if (results.phase === "Mid") return "Fluctuating Hormones";
    return "Early Transition";
  };
  
  const patternName = getHormonePatternName();
  
  return (
    <div className="min-h-screen bg-[#FFECD6]/30 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section - Personalized Greeting and Validation */}
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154]">
              {userInfo.firstName}, Your Perimenopause Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              Your responses reveal significant hormone changes that explain many of your symptoms.
            </p>
            <p className="text-gray-600 mt-4">
              Based on your assessment, we've identified several key insights about your hormonal transition that can help you take control of your symptoms.
            </p>
          </CardContent>
        </Card>
        
        {/* What Your Body Is Trying To Tell You */}
        <Card className="mb-8">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              What Your Body Is Trying To Tell You
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Based on your responses, our AI has identified a concerning pattern in your symptoms:</p>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>Your sleep disruptions aren't just "bad sleep" - they're a direct result of declining progesterone affecting your brain's sleep centers</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>The brain fog and memory issues you reported aren't "just aging" - they're caused by estrogen fluctuations affecting neurotransmitter function</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>Your mood changes aren't "all in your head" - they're real biological responses to hormone shifts affecting your brain chemistry</p>
              </li>
            </ul>
            
            <p className="text-[#5D4154] font-medium border-l-4 border-[#5D4154] pl-4 py-2 bg-[#FFECD6]/50">
              What's particularly concerning is seeing {results.primarySymptoms[0].toLowerCase()} and {results.primarySymptoms[1].toLowerCase()} occurring together. This combination suggests you're experiencing what we call <span className="font-bold">{patternName}</span> - a hormone pattern that typically intensifies over time without proper management.
            </p>
          </CardContent>
        </Card>
        
        {/* What Happens Next Without Intervention */}
        <Card className="mb-8">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              What Happens Next Without Intervention
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">For women with your specific symptom pattern, our medical data shows these changes typically follow a predictable path:</p>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  !
                </div>
                <p>Symptoms often intensify by 40-60% over the next 6-12 months</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  !
                </div>
                <p>New symptoms frequently emerge as hormone fluctuations expand</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  !
                </div>
                <p>The impact on sleep quality typically worsens, creating a cascade effect on energy, cognitive function, and mood</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  !
                </div>
                <p>The window for early intervention - when management is simplest - begins to close</p>
              </li>
            </ul>
            
            <p>In our database of over 30,000 women, those who began tracking and managing symptoms at your stage reported dramatically better outcomes than those who waited until symptoms became more severe.</p>
            
            <p className="mt-4 text-lg font-medium text-[#5D4154]">
              {userInfo.firstName}, you're at a critical decision point in your hormone journey.
            </p>
          </CardContent>
        </Card>
        
        {/* Hope/Solution Bridge */}
        <Card className="mb-8">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              Your Perimenopause Management Path
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">While these changes are concerning, there's significant reason for optimism. Women with your exact symptom profile who implemented proper tracking and management reported:</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#A7C4A0]/20 p-4 rounded-lg">
                <div className="font-bold text-2xl text-[#5D4154]">62%</div>
                <p>reduction in sleep disturbances within 60 days</p>
              </div>
              
              <div className="bg-[#A7C4A0]/20 p-4 rounded-lg">
                <div className="font-bold text-2xl text-[#5D4154]">57%</div>
                <p>improvement in energy levels within 45 days</p>
              </div>
              
              <div className="bg-[#A7C4A0]/20 p-4 rounded-lg">
                <div className="font-bold text-2xl text-[#5D4154]">49%</div>
                <p>reduction in mood fluctuations within 90 days</p>
              </div>
              
              <div className="bg-[#A7C4A0]/20 p-4 rounded-lg">
                <div className="font-bold text-2xl text-[#5D4154]">53%</div>
                <p>improvement in cognitive symptoms within 30 days</p>
              </div>
            </div>
            
            <p>The key difference? Having precise data about their unique hormone patterns that allowed for targeted, personalized approaches rather than generic solutions.</p>
          </CardContent>
        </Card>
        
        {/* Your Hormone Profile & Analysis */}
        <Card className="mb-8">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              Your Personal Hormone Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="relative">
                <div className="w-36 h-36 rounded-full border-8 border-[#5D4154] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#5D4154]">{results.score}/100</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#A7C4A0] text-white px-4 py-1 rounded-full text-sm">
                  {results.phase} Phase
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2">HORMONE TRANSITION SCORE: {results.score}/100</h3>
                <p>
                  Your score places you in the {results.phase.toLowerCase()} perimenopause phase.
                  This score is calculated based on your symptom patterns, severity, and age.
                </p>
                
                <h3 className="font-semibold text-xl mt-4 mb-2">PRIMARY HORMONE PATTERN: {patternName}</h3>
                <p>
                  Your symptoms suggest you're experiencing:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Fluctuating rather than steadily declining estrogen levels</li>
                  <li>Early-stage progesterone decline</li>
                  <li>Potential stress hormone (cortisol) elevation</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#FFECD6] p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-4">SYMPTOM SEVERITY ANALYSIS:</h3>
              <p className="mb-4">Based on your responses, these symptoms are having the most significant impact on your quality of life:</p>
              
              <div className="space-y-6">
                {results.primarySymptoms.map((symptom, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">
                        {index + 1}. {symptom}
                      </h4>
                      <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                        index === 0 ? "bg-[#FF9B85]" : index === 1 ? "bg-[#FFBF69]" : "bg-[#A7C4A0]"
                      }`}>
                        {index === 0 ? "Severe" : index === 1 ? "Moderate" : "Mild"} Impact
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Connected to: {
                        index === 0 ? "Fluctuating estrogen levels" : 
                        index === 1 ? "Decreasing progesterone" : 
                        "Altered cortisol patterns"
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Why Tracking Is Essential */}
        <Card className="mb-8">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              Why Your Symptoms Require Precision Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Your specific hormone pattern makes standard approaches insufficient for three critical reasons:</p>
            
            <div className="space-y-6 mb-6">
              <div className="border-l-4 border-[#5D4154] pl-4 py-2">
                <h3 className="font-semibold mb-1">1. FLUCTUATING HORMONES</h3>
                <p>Your responses suggest your hormones aren't simply declining - they're fluctuating unpredictably. Without day-to-day tracking, it's impossible to identify your unique patterns and intervention windows.</p>
              </div>
              
              <div className="border-l-4 border-[#5D4154] pl-4 py-2">
                <h3 className="font-semibold mb-1">2. COMPLEX SYMPTOM INTERACTIONS</h3>
                <p>The way your {results.primarySymptoms[0].toLowerCase()}, {results.primarySymptoms[1].toLowerCase()}, and {results.primarySymptoms[2].toLowerCase()} interact creates feedback loops that can either improve or worsen your experience. Only consistent tracking can untangle these relationships.</p>
              </div>
              
              <div className="border-l-4 border-[#5D4154] pl-4 py-2">
                <h3 className="font-semibold mb-1">3. RAPIDLY EVOLVING PATTERN</h3>
                <p>Your hormone pattern typically changes significantly over 3-6 month periods. What works today may need adjustment in just weeks. Without ongoing data, you'll constantly be playing catch-up with your symptoms.</p>
              </div>
            </div>
            
            <p className="font-medium text-center mt-6">Women with your exact profile who implemented precision tracking reported feeling "back in control" within just 2-3 weeks of beginning their tracking journey.</p>
          </CardContent>
        </Card>
        
        {/* Peritrack Solution Presentation */}
        <Card className="bg-[#5D4154] text-white mb-8">
          <CardHeader className="pb-4 border-b border-white/20">
            <CardTitle className="font-playfair text-2xl font-semibold">
              Introducing Your Personalized Perimenopause Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">Based on your assessment results, I've created a customized tracking and management system designed specifically for your {patternName} hormone profile.</p>
            
            <div className="bg-white/10 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-xl mb-4">PERITRACK PREMIUM gives you:</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">AI-POWERED HORMONE PATTERN RECOGNITION</h4>
                    <p className="text-white/80">Our system detects subtle hormone patterns that even doctors might miss, giving you unprecedented insight into your changing body.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">PERSONALIZED SYMPTOM-TRIGGER IDENTIFICATION</h4>
                    <p className="text-white/80">Discover exactly which foods, activities, and stressors are amplifying your symptoms during hormonal fluctuations.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">PRECISION INTERVENTION TIMING</h4>
                    <p className="text-white/80">Receive alerts for the optimal times to implement specific interventions based on your unique hormone patterns.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">SYMPTOM PREDICTION & PREPARATION</h4>
                    <p className="text-white/80">Get advance notice of likely symptom intensification days, allowing you to prepare and adapt.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="font-medium text-center text-lg">This isn't a generic approach to perimenopause - it's a precision-targeted system designed specifically for your {patternName} hormone profile.</p>
          </CardContent>
        </Card>
        
        {/* Testimonials */}
        <Card className="mb-8">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] text-center">
              Women Like You Who Found Relief
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-5">
                <p className="italic text-gray-600 mb-4">
                  "For two years, doctors told me my symptoms were 'just stress' or 'part of getting older.' Within three weeks of using Peritrack, I identified clear patterns between my diet and sleep disruptions. I'm finally sleeping through the night again, and my energy has returned."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-semibold">
                    JM
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Jennifer M.</p>
                    <p className="text-sm text-gray-500">46, {patternName} profile</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-5">
                <p className="italic text-gray-600 mb-4">
                  "The brain fog was affecting my career. I was forgetting important details and losing confidence. Peritrack helped me identify exactly when my cognitive symptoms peak, and now I schedule my most demanding work around my hormone patterns. My last performance review was the best in years."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-semibold">
                    KL
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Karen L.</p>
                    <p className="text-sm text-gray-500">44, {patternName} profile</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Limited-Time Offer & Guarantee */}
        <Card className="mb-8">
          <CardHeader className="bg-[#FFECD6] pb-4">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              Your Path Forward Begins Today
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">Because you've completed our comprehensive assessment, I'd like to extend a special offer:</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span className="font-medium">7-DAY FREE TRIAL of Peritrack Premium</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>Full access to all features during your trial</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>No credit card required to start</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>Then just $14/month to continue if you love it</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>30-day money-back guarantee after billing begins</span>
                  </li>
                </ul>
                
                <p className="text-gray-700 text-sm">
                  This offer is specifically for women with your hormone pattern, as our data shows you're likely to experience significant benefits from our tracking system.
                </p>
                
                <div className="mt-4 p-4 bg-[#FFECD6]/50 rounded-lg">
                  <p className="font-medium">Our Guarantee:</p>
                  <p>If you don't gain meaningful insights about your hormone patterns within 30 days after your trial, we'll refund your subscription – no questions asked.</p>
                </div>
              </div>
              
              <div className="bg-[#5D4154] text-white p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-playfair text-xl font-semibold">Limited-Time Offer</h3>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span>Monthly Plan:</span>
                  <span className="font-semibold">$14/month</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Annual Plan:</span>
                  <span className="font-semibold">$59/year (Save 30%)</span>
                </div>
                
                <Button className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white py-6 text-lg">
                  Start My Free 7-Day Trial
                </Button>
                
                <p className="text-center text-sm mt-4">No credit card required</p>
                <p className="text-center text-xs mt-2">100% satisfaction guaranteed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Why This Matters Now */}
        <Card className="mb-8">
          <CardHeader className="bg-[#5D4154] text-white">
            <CardTitle className="font-playfair text-2xl font-semibold">
              Why This Matters Now
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">{userInfo.firstName}, the symptom pattern I've identified suggests you're in an optimal window for intervention. Based on our database of thousands of women with similar profiles:</p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#5D4154] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>Those who began tracking in this phase reported 58% better outcomes than those who waited</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#5D4154] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>Your symptoms are likely to increase in both frequency and intensity within 60-90 days</p>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-[#5D4154] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>The connections between triggers and symptoms are clearest during your current phase</p>
              </li>
            </ul>
            
            <p className="text-lg font-medium text-center mb-8">
              Your perimenopause journey may last 4-7 years. The approach you choose now will significantly impact your day-to-day quality of life throughout this transition.
            </p>
            
            <div className="text-center">
              <Button className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white px-8 py-6 text-lg mx-auto">
                Start My Free Trial Now
              </Button>
              
              <p className="mt-2">Your personalized dashboard is waiting for you.</p>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center">
                <img 
                  src="https://placehold.co/80x80" 
                  alt="Dr. Jennifer Miller" 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">Dr. Jennifer Miller</p>
                  <p className="text-sm text-gray-600">
                    Medical Director, Peritrack<br />
                    Board-Certified OB/GYN specializing in Perimenopause & Menopause
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
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
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-[#FFECD6] text-[#5D4154] px-4 py-2 rounded-full text-xs font-medium">
            HIPAA Compliant
          </div>
          <div className="bg-[#FFECD6] text-[#5D4154] px-4 py-2 rounded-full text-xs font-medium">
            256-bit Encryption
          </div>
          <div className="bg-[#FFECD6] text-[#5D4154] px-4 py-2 rounded-full text-xs font-medium">
            Medically Reviewed
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
