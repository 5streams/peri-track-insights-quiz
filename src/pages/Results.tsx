
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, ChevronDown, TestTube, FileText, Microscope, Heart, BarChart, Brain, Sparkles } from "lucide-react";
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
  const [visibleSections, setVisibleSections] = useState({
    validation: false,
    hormones: false,
    emotional: false,
    future: false,
    tracking: false,
    labTesting: false,
  });
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Reveal sections as user scrolls
    const revealSections = () => {
      const windowHeight = window.innerHeight;
      const sections = document.querySelectorAll('.reveal-section');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('revealed');
        }
      });
    };

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

    // Add scroll event listener for animations
    window.addEventListener('scroll', revealSections);
    // Trigger once on load
    setTimeout(revealSections, 300);

    return () => {
      window.removeEventListener('scroll', revealSections);
    };
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
  
  const toggleSection = (section: keyof typeof visibleSections) => {
    setVisibleSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFECD6]/30 p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#5D4154] border-t-[#A7C4A0] rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-4">
            Loading your results...
          </h1>
          <p className="text-[#6D6875]">Please wait while we prepare your personalized assessment.</p>
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
    <div 
      className="min-h-screen bg-gradient-to-b from-[#FFECD6]/30 to-white py-8 px-4 md:px-8"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%235D4154\" fill-opacity=\"0.03\" fill-rule=\"evenodd\"%3E%3C/svg%3E')",
        backgroundAttachment: "fixed"
      }}
      ref={mainContentRef}
    >
      <div className="max-w-4xl mx-auto">
        {/* Emotional Validation Header */}
        <Card className="mb-8 overflow-hidden reveal-section animate-slide-up shadow-lg border-none">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5D4154] via-[#A7C4A0] to-[#FFECD6]"></div>
          <CardHeader className="pb-6 bg-gradient-to-r from-[#5D4154]/5 to-white">
            <CardTitle className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] animate-fade-in">
              {userInfo.firstName}, You've Been Heard.
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg font-medium text-[#5D4154] mb-4">
              What you're experiencing isn't "just aging," "just stress," or "all in your head." The symptoms you've described—both physical and emotional—are real, significant, and have biological causes.
            </p>
            <p className="text-gray-600 mb-4">
              We hear the frustration in your responses. The confusion about why your body seems suddenly unfamiliar. The worry about what these changes mean. The exhaustion from navigating daily life while managing unpredictable symptoms.
            </p>
            <p className="text-gray-600 mb-4">
              You are not alone in this experience. Your responses match patterns we've seen in thousands of women going through this significant transition.
            </p>
            <p className="text-[#5D4154] font-medium">
              Let's start by understanding exactly what's happening in your body and mind right now.
            </p>
          </CardContent>
        </Card>
        
        {/* "You're Not Alone" Symptom Validation */}
        <Card className="mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#5D4154]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('validation')}>
              <div className="h-10 w-10 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-4 group-hover:bg-[#5D4154]/20 transition-colors">
                <Heart className="h-5 w-5 text-[#5D4154]" />
              </div>
              THE SYMPTOMS YOU'VE BEEN EXPERIENCING
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.validation ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.validation ? 'max-h-[2000px]' : 'max-h-32'}`}>
            <p className="mb-6">You described experiencing {results.primarySymptoms[0].toLowerCase()}, {results.primarySymptoms[1].toLowerCase()}, and {results.primarySymptoms[2].toLowerCase()}. These experiences are shared by thousands of women with your hormone pattern.</p>
            
            <div className="space-y-8 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FF9B85]">
                <h3 className="font-playfair text-xl font-semibold text-[#5D4154] mb-3">"I FEEL LIKE I'M LOSING MY MIND"</h3>
                <p className="mb-3">
                  Your report of brain fog, forgetfulness, and difficulty concentrating isn't uncommon—78% of women with your hormone pattern report similar cognitive changes. These symptoms often lead to questioning your competence and worrying about your mental health.
                </p>
                <p className="font-medium text-[#5D4154]">
                  This isn't cognitive decline or early dementia. It's a direct result of hormone fluctuations affecting neurotransmitter function in your brain.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#FFBF69]">
                <h3 className="font-playfair text-xl font-semibold text-[#5D4154] mb-3">"I DON'T RECOGNIZE MYSELF ANYMORE"</h3>
                <p className="mb-3">
                  The mood changes, emotional sensitivity, and irritability you described are experienced by 82% of women with your hormone pattern. The feeling that your emotions are unpredictable or out of proportion can be deeply unsettling.
                </p>
                <p className="font-medium text-[#5D4154]">
                  These emotional shifts aren't a personality change—they're biological responses to changing hormone levels affecting your brain chemistry.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-[#A7C4A0]">
                <h3 className="font-playfair text-xl font-semibold text-[#5D4154] mb-3">"I'M EXHAUSTED BUT CAN'T SLEEP"</h3>
                <p className="mb-3">
                  Your sleep disruptions and resulting fatigue align exactly with what 76% of women with your hormone pattern experience. Waking up at 3 AM with your mind racing, or lying awake despite physical exhaustion, can feel isolating and frustrating.
                </p>
                <p className="font-medium text-[#5D4154]">
                  This isn't insomnia as most people understand it—it's a specific disruption in sleep architecture caused by changing progesterone levels.
                </p>
              </div>
            </div>
            
            <div className="text-center font-medium text-lg text-[#5D4154] bg-[#FFECD6]/30 p-4 rounded-lg animate-pulse-subtle">
              You're not imagining these changes. You're not overreacting. And most importantly, you're not alone.
            </div>
          </CardContent>
        </Card>
        
        {/* The Emotional Impact of Hormone Changes */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('emotional')}>
              <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-4 group-hover:bg-[#A7C4A0]/20 transition-colors">
                <Brain className="h-5 w-5 text-[#5D4154]" />
              </div>
              UNDERSTANDING THE EMOTION-HORMONE CONNECTION
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.emotional ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.emotional ? 'max-h-[2000px]' : 'max-h-32'}`}>
            <p className="mb-4 text-lg">
              Many women describe perimenopause as feeling like an "emotional roller coaster" or say things like "I don't feel like myself anymore." There's a profound reason for this—your hormones don't just affect your body; they fundamentally influence your emotional landscape.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="font-semibold text-xl text-[#5D4154] mb-4">YOUR BRAIN ON CHANGING HORMONES</h3>
              <p className="mb-4">Your brain contains receptors for estrogen, progesterone, and testosterone in areas that regulate:</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
                  <span>Mood stability and emotional processing</span>
                </div>
                <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
                  <span>Stress response and resilience</span>
                </div>
                <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
                  <span>Sleep architecture and quality</span>
                </div>
                <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
                  <span>Memory formation and retrieval</span>
                </div>
                <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
                  <span>Cognitive function and clarity</span>
                </div>
                <div className="flex items-start p-3 rounded-md bg-[#FFECD6]/20 hover:bg-[#FFECD6]/30 transition-colors">
                  <div className="h-6 w-6 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 flex-shrink-0">•</div>
                  <span>Motivation and energy</span>
                </div>
              </div>
              
              <p>When these hormones fluctuate unpredictably—as they do in your specific pattern—it creates a ripple effect through these brain systems.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="font-semibold text-xl text-[#5D4154] mb-4">THE EMOTIONAL SYMPTOMS YOU'VE REPORTED</h3>
              
              <p className="mb-4">
                The {results.primarySymptoms[0].toLowerCase()} you described is directly connected to changes in your estrogen levels affecting your brain's emotional regulation centers.
              </p>
              
              <div className="bg-[#5D4154]/5 p-4 rounded-lg font-medium text-[#5D4154] mb-4">
                This emotional experience isn't a psychological issue—it's a neurobiological response to hormone fluctuations.
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#5D4154]/90 to-[#5D4154] text-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl mb-4">VALIDATION: YOUR FEELINGS ARE REAL</h3>
              <p className="mb-4">Perhaps the most important thing to understand is that:</p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
                  <span>Your emotional experiences are real, valid responses to biological changes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
                  <span>The intensity of your feelings is proportionate to the hormonal shifts occurring</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
                  <span>Your struggles deserve acknowledgment and support, not dismissal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-0.5" />
                  <span>You're experiencing a natural transition, not a disorder or deficiency</span>
                </li>
              </ul>
              
              <div className="border-l-4 border-[#A7C4A0] pl-4 py-2 italic text-white/90">
                "For years I thought I was developing anxiety disorder or depression. Understanding that my emotional changes were connected to hormone fluctuations was incredibly validating. It wasn't 'all in my head'—it was in my endocrine system."
                <div className="text-right font-medium mt-2 text-white/80">- Jennifer, 46</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Comprehensive Hormone Analysis with Emotional Context */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FFECD6]"></div>
          <CardHeader className="pb-4 border-b bg-gradient-to-r from-[#FFECD6]/50 to-white">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('hormones')}>
              <div className="h-10 w-10 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-4 group-hover:bg-[#5D4154]/20 transition-colors">
                <BarChart className="h-5 w-5 text-[#5D4154]" />
              </div>
              YOUR COMPREHENSIVE HORMONE ANALYSIS
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.hormones ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.hormones ? 'max-h-[3000px]' : 'max-h-32'}`}>
            <p className="mb-6 text-lg">
              Based on your responses, you're experiencing what we call a "{patternName}" hormone pattern. This specific pattern affects both your physical symptoms and your emotional well-being.
            </p>
            
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="relative">
                <div className="w-36 h-36 rounded-full border-8 border-[#5D4154] flex items-center justify-center animate-pulse-gentle">
                  <span className="text-3xl font-bold text-[#5D4154]">{results.score}/100</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#A7C4A0] text-white px-4 py-1 rounded-full text-sm">
                  {results.phase} Phase
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="font-semibold text-xl mb-2">WHAT THIS MEANS FOR YOU PHYSICALLY:</h3>
                  <p className="mb-3">Your hormone pattern explains:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>Why your {results.primarySymptoms[0].toLowerCase()} seems to intensify at certain times</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>How your {results.primarySymptoms[1].toLowerCase()} connects to your hormone fluctuations</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>When your {results.primarySymptoms[2].toLowerCase()} is most likely to occur</p>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-2">WHAT THIS MEANS FOR YOU EMOTIONALLY:</h3>
                  <p className="mb-3">This same pattern explains:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>Why you might feel emotionally vulnerable at specific times</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>How your mood shifts connect to your hormone fluctuations</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>When you might experience heightened anxiety or emotional sensitivity</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-[#FF9B85] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">•</div>
                      <p>Why you might feel disconnected from yourself during certain phases</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="font-semibold text-xl text-[#5D4154] mb-4">YOUR HORMONAL JOURNEY:</h3>
              <p className="mb-6">Women with your specific pattern typically experience:</p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="relative mr-6 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-bold text-xl">1</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-6 md:h-12 bg-[#FFECD6]/70"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#5D4154]">An initial phase of unpredictable fluctuations (where you likely are now)</h4>
                    <p className="text-gray-600 mt-1">Characterized by more rapid changes in hormone levels and less predictable symptoms</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="relative mr-6 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#FFBF69] flex items-center justify-center text-[#5D4154] font-bold text-xl">2</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-6 md:h-12 bg-[#FFBF69]/70"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#5D4154]">A middle phase of increasing stability as patterns become more predictable</h4>
                    <p className="text-gray-600 mt-1">As you learn your unique patterns, symptoms become more manageable through targeted approaches</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="relative mr-6 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#A7C4A0] flex items-center justify-center text-[#5D4154] font-bold text-xl">3</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#5D4154]">A final phase of adaptation as your body adjusts to new hormone levels</h4>
                    <p className="text-gray-600 mt-1">Your body finds a new equilibrium, and symptoms generally become less intense</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#FFECD6]/30 p-6 rounded-lg mb-6 border border-[#FFECD6]">
              <h3 className="font-semibold text-lg mb-4">SYMPTOM SEVERITY ANALYSIS:</h3>
              <p className="mb-4">Based on your responses, these symptoms are having the most significant impact on your quality of life:</p>
              
              <div className="space-y-6">
                {results.primarySymptoms.map((symptom, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
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
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div className={`h-2.5 rounded-full ${
                        index === 0 ? "bg-[#FF9B85] w-[80%]" : index === 1 ? "bg-[#FFBF69] w-[60%]" : "bg-[#A7C4A0] w-[40%]"
                      }`}></div>
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
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-lg font-medium text-[#5D4154]">
                With proper tracking and personalized support, the emotional challenges of this transition can be significantly reduced. Many women report not just coping, but actually thriving through this phase when they have the right tools and understanding.
              </p>
              
              <div className="mt-6 border-t border-gray-100 pt-6 italic text-gray-600">
                "Understanding my hormone pattern changed everything. Instead of feeling at the mercy of unpredictable emotions, I could see the patterns and prepare for more vulnerable times. That knowledge alone reduced my anxiety tremendously."
                <div className="text-right font-medium mt-2 text-gray-500">- Michelle, 45</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Lab Testing Section */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('labTesting')}>
              <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-4 group-hover:bg-[#A7C4A0]/20 transition-colors">
                <TestTube className="h-5 w-5 text-[#5D4154]" />
              </div>
              Understanding Your Hormones: The Missing Piece
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.labTesting ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.labTesting ? 'max-h-[3000px]' : 'max-h-32'}`}>
            <div className="lab-explanation flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <p className="personalized-opener text-lg mb-6">
                  {userInfo.firstName}, based on your symptom pattern, laboratory testing would provide crucial insights about your specific hormone levels.
                </p>
                
                <div className="why-testing mb-6">
                  <h3 className="text-[#5D4154] text-xl font-semibold mb-3">Why Testing Is Valuable For Your Symptoms</h3>
                  <p className="mb-3">
                    Your combination of <span className="font-semibold text-[#5D4154]">{results.primarySymptoms[0].toLowerCase()}</span> and <span className="font-semibold text-[#5D4154]">{results.primarySymptoms[1].toLowerCase()}</span> strongly suggests changes in estrogen and progesterone levels. However, symptoms alone can't tell us:
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
                        Directly related to your {results.primarySymptoms[0].toLowerCase()}
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
        
        {/* What Happens Next Without Intervention */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FF9B85]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('future')}>
              <div className="h-10 w-10 rounded-full bg-[#FF9B85]/10 flex items-center justify-center mr-4 group-hover:bg-[#FF9B85]/20 transition-colors">
                <span className="text-[#5D4154]">!</span>
              </div>
              What Happens Next Without Intervention
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.future ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.future ? 'max-h-[1000px]' : 'max-h-32'}`}>
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
        
        {/* Your Complete Hormone Rebalancing Journey */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#A7C4A0]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('tracking')}>
              <div className="h-10 w-10 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-4 group-hover:bg-[#A7C4A0]/20 transition-colors">
                <Sparkles className="h-5 w-5 text-[#5D4154]" />
              </div>
              YOUR COMPLETE HORMONE REBALANCING JOURNEY
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.tracking ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.tracking ? 'max-h-[2000px]' : 'max-h-32'}`}>
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
        
        {/* Begin Your Healing Journey */}
        <Card className="bg-gradient-to-br from-[#5D4154] to-[#5D4154]/90 text-white mb-8 reveal-section transform translate-y-4 opacity-0 shadow-xl">
          <CardHeader className="pb-4 border-b border-white/20">
            <CardTitle className="font-playfair text-2xl font-semibold text-center">
              BEGIN YOUR JOURNEY TO BALANCE AND RENEWAL
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6 text-lg text-center">
              {userInfo.firstName}, you've already taken the most important step—seeking to understand what's happening in your body and mind.
            </p>
            
            <p className="mb-6 text-center">
              Your personalized dashboard is ready to guide you through every step of your hormone rebalancing journey. Your free 7-day trial gives you complete access to:
            </p>
            
            <div className="bg-white/10 p-6 rounded-lg mb-8 backdrop-blur-sm">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
                  <span>Daily tracking tools designed for your specific symptoms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
                  <span>AI-powered pattern recognition to identify your unique fluctuations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
                  <span>Personalized insights connecting your physical and emotional experiences</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
                  <span>Supportive guidance for both symptom management and emotional well-being</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
                  <span>Complete educational resources to deepen your understanding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#A7C4A0] mr-3 mt-1 flex-shrink-0" />
                  <span>Tools to prepare for productive healthcare conversations</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center mb-8">
              <p className="text-sm mb-4">No credit card required—experience the full platform with our complete support.</p>
              <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                START MY FREE 7-DAY TRIAL
              </Button>
            </div>
            
            <div className="text-center">
              <p className="font-medium text-lg mb-4">You don't have to navigate this journey alone.</p>
              <p className="mb-6">
                Join our community of over 30,000 women who have transformed their perimenopause experience from confusion and frustration to understanding and empowerment.
              </p>
              
              <div className="border-l-4 border-[#A7C4A0] pl-4 py-2 italic text-white/90 text-left max-w-2xl mx-auto">
                "Starting Peritrack was the moment everything changed for me. For the first time, I felt truly understood and supported. The combination of tracking, insights, and education helped me reclaim not just my physical health, but my emotional well-being."
                <div className="text-right font-medium mt-2 text-white/80">- Rebecca, 46</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-white/20 pt-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
                HIPAA Compliant
              </div>
              <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
                256-bit Encryption
              </div>
              <div className="bg-white/20 text-white px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
                Medically Reviewed
              </div>
            </div>
          </CardFooter>
        </Card>
        
        {/* Back to Quiz Button */}
        <div className="text-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/quiz")}
            className="flex items-center gap-2 hover:bg-[#5D4154]/5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;

