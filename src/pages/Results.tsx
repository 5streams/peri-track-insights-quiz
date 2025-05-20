
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle, ChevronDown, TestTube, FileText, Microscope } from "lucide-react";
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
    symptoms: false,
    future: false,
    hormone: false,
    tracking: false,
    labTesting: false,
  });
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
        backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%235D4154' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E"),
        backgroundAttachment: "fixed"
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section - Personalized Greeting and Validation */}
        <Card className="mb-8 overflow-hidden reveal-section animate-slide-up shadow-lg border-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5D4154] via-[#A7C4A0] to-[#FFECD6]"></div>
          <CardHeader className="pb-4 bg-gradient-to-r from-[#5D4154]/5 to-white">
            <CardTitle className="font-playfair text-3xl md:text-4xl font-bold text-[#5D4154] animate-fade-in">
              {userInfo.firstName}, Your Perimenopause Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg font-medium text-[#5D4154]">
              Your responses reveal significant hormone changes that explain many of your symptoms.
            </p>
            <p className="text-gray-600 mt-4">
              Based on your assessment, we've identified several key insights about your hormonal transition that can help you take control of your symptoms.
            </p>
          </CardContent>
        </Card>
        
        {/* What Your Body Is Trying To Tell You */}
        <Card className="mb-8 overflow-hidden reveal-section transform hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#5D4154]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group">
              <div className="h-8 w-8 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 group-hover:bg-[#5D4154]/20 transition-colors">
                <span className="text-[#5D4154]">1</span>
              </div>
              What Your Body Is Trying To Tell You
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Based on our AI analysis of your responses, we've identified a concerning pattern in your symptoms:</p>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>Your sleep disruptions aren't just "bad sleep" - they're a direct result of declining progesterone affecting your brain's sleep centers</p>
              </li>
              <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>The brain fog and memory issues you reported aren't "just aging" - they're caused by estrogen fluctuations affecting neurotransmitter function</p>
              </li>
              <li className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                <div className="h-6 w-6 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-sm flex-shrink-0 mt-1 mr-3">
                  •
                </div>
                <p>Your mood changes aren't "all in your head" - they're real biological responses to hormone shifts affecting your brain chemistry</p>
              </li>
            </ul>
            
            <div className="text-[#5D4154] font-medium border-l-4 border-[#5D4154] pl-4 py-2 bg-[#FFECD6]/50 rounded-r-md animate-pulse-subtle">
              <p>What's particularly concerning is seeing <span className="font-bold italic">{results.primarySymptoms[0].toLowerCase()}</span> and <span className="font-bold italic">{results.primarySymptoms[1].toLowerCase()}</span> occurring together. This combination suggests you're experiencing what we call <span className="font-bold">{patternName}</span> - a hormone pattern that typically intensifies over time without proper management.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Your Hormone Profile & Analysis */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FFECD6]"></div>
          <CardHeader className="pb-4 border-b bg-gradient-to-r from-[#FFECD6]/50 to-white">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('hormone')}>
              <div className="h-8 w-8 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 group-hover:bg-[#5D4154]/20 transition-colors">
                <span className="text-[#5D4154]">2</span>
              </div>
              Your Personal Hormone Assessment
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.hormone ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.hormone ? 'max-h-[1500px]' : 'max-h-24'}`}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="relative">
                <div className="w-36 h-36 rounded-full border-8 border-[#5D4154] flex items-center justify-center animate-pulse-gentle">
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
                
                <h3 className="font-semibold text-xl mt-4 mb-2">PRIMARY HORMONE PATTERN: <span className="text-[#5D4154]">{patternName}</span></h3>
                <p>
                  Your symptoms suggest you're experiencing:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Fluctuating rather than steadily declining estrogen levels</li>
                  <li>Early-stage progesterone decline</li>
                  <li>Potential stress hormone (cortisol) elevation</li>
                </ul>
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
          </CardContent>
        </Card>
        
        {/* Lab Testing Section */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#A7C4A0]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('labTesting')}>
              <div className="h-8 w-8 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-3 group-hover:bg-[#A7C4A0]/20 transition-colors">
                <TestTube className="h-4 w-4 text-[#5D4154]" />
              </div>
              Understanding Your Hormones: The Missing Piece
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.labTesting ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.labTesting ? 'max-h-[3000px]' : 'max-h-24'}`}>
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
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF9B85]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('future')}>
              <div className="h-8 w-8 rounded-full bg-[#FF9B85]/10 flex items-center justify-center mr-3 group-hover:bg-[#FF9B85]/20 transition-colors">
                <span className="text-[#5D4154]">3</span>
              </div>
              What Happens Next Without Intervention
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.future ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.future ? 'max-h-[1000px]' : 'max-h-24'}`}>
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
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#A7C4A0]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group">
              <div className="h-8 w-8 rounded-full bg-[#A7C4A0]/10 flex items-center justify-center mr-3 group-hover:bg-[#A7C4A0]/20 transition-colors">
                <span className="text-[#5D4154]">4</span>
              </div>
              Your Perimenopause Management Path
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">While these changes are concerning, there's significant reason for optimism. Women with your exact symptom profile who implemented proper tracking and management reported:</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
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
            
            <p>The key difference? Having precise data about their unique hormone patterns that allowed for targeted, personalized approaches rather than generic solutions.</p>
          </CardContent>
        </Card>
        
        {/* Why Tracking Is Essential */}
        <Card className="mb-8 overflow-hidden reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#5D4154]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] flex items-center group cursor-pointer" onClick={() => toggleSection('tracking')}>
              <div className="h-8 w-8 rounded-full bg-[#5D4154]/10 flex items-center justify-center mr-3 group-hover:bg-[#5D4154]/20 transition-colors">
                <span className="text-[#5D4154]">5</span>
              </div>
              Why Your Symptoms Require Precision Tracking
              <ChevronDown className={`ml-auto h-5 w-5 transition-transform duration-300 ${visibleSections.tracking ? 'rotate-180' : ''}`} />
            </CardTitle>
          </CardHeader>
          <CardContent className={`pt-6 overflow-hidden transition-all duration-500 ${visibleSections.tracking ? 'max-h-[1000px]' : 'max-h-24'}`}>
            <p className="mb-4">Your specific hormone pattern makes standard approaches insufficient for three critical reasons:</p>
            
            <div className="space-y-6 mb-6">
              <div className="border-l-4 border-[#5D4154] pl-4 py-3 bg-gradient-to-r from-white to-gray-50 rounded-r shadow-sm transform hover:translate-x-1 transition-transform duration-300">
                <h3 className="font-semibold mb-1 text-[#5D4154]">1. FLUCTUATING HORMONES</h3>
                <p>Your responses suggest your hormones aren't simply declining - they're fluctuating unpredictably. Without day-to-day tracking, it's impossible to identify your unique patterns and intervention windows.</p>
              </div>
              
              <div className="border-l-4 border-[#5D4154] pl-4 py-3 bg-gradient-to-r from-white to-gray-50 rounded-r shadow-sm transform hover:translate-x-1 transition-transform duration-300">
                <h3 className="font-semibold mb-1 text-[#5D4154]">2. COMPLEX SYMPTOM INTERACTIONS</h3>
                <p>The way your {results.primarySymptoms[0].toLowerCase()}, {results.primarySymptoms[1].toLowerCase()}, and {results.primarySymptoms[2].toLowerCase()} interact creates feedback loops that can either improve or worsen your experience. Only consistent tracking can untangle these relationships.</p>
              </div>
              
              <div className="border-l-4 border-[#5D4154] pl-4 py-3 bg-gradient-to-r from-white to-gray-50 rounded-r shadow-sm transform hover:translate-x-1 transition-transform duration-300">
                <h3 className="font-semibold mb-1 text-[#5D4154]">3. RAPIDLY EVOLVING PATTERN</h3>
                <p>Your hormone pattern typically changes significantly over 3-6 month periods. What works today may need adjustment in just weeks. Without ongoing data, you'll constantly be playing catch-up with your symptoms.</p>
              </div>
            </div>
            
            <p className="font-medium text-center mt-6 bg-[#FFECD6]/30 p-4 rounded-lg border border-[#FFECD6] animate-pulse-subtle">Women with your exact profile who implemented precision tracking reported feeling "back in control" within just 2-3 weeks of beginning their tracking journey.</p>
          </CardContent>
        </Card>
        
        {/* Peritrack Solution Presentation */}
        <Card className="bg-gradient-to-br from-[#5D4154] to-[#5D4154]/90 text-white mb-8 reveal-section transform translate-y-4 opacity-0 shadow-xl">
          <CardHeader className="pb-4 border-b border-white/20">
            <CardTitle className="font-playfair text-2xl font-semibold">
              Introducing Your Personalized Perimenopause Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">Based on your assessment results, I've created a customized tracking and management system designed specifically for your {patternName} hormone profile.</p>
            
            <div className="bg-white/10 p-6 rounded-lg mb-6 backdrop-blur-sm">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <span className="h-8 w-8 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center mr-2 text-sm">
                  ✓
                </span>
                PERITRACK PREMIUM gives you:
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-[#A7C4A0] transition-colors">AI-POWERED HORMONE PATTERN RECOGNITION</h4>
                    <p className="text-white/80">Our system detects subtle hormone patterns that even doctors might miss, giving you unprecedented insight into your changing body.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-[#A7C4A0] transition-colors">PERSONALIZED SYMPTOM-TRIGGER IDENTIFICATION</h4>
                    <p className="text-white/80">Discover exactly which foods, activities, and stressors are amplifying your symptoms during hormonal fluctuations.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-[#A7C4A0] transition-colors">PRECISION INTERVENTION TIMING</h4>
                    <p className="text-white/80">Receive alerts for the optimal times to implement specific interventions based on your unique hormone patterns.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-[#A7C4A0] transition-colors">SYMPTOM PREDICTION & PREPARATION</h4>
                    <p className="text-white/80">Get advance notice of likely symptom intensification days, allowing you to prepare and adapt.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 group hover:bg-white/5 p-3 rounded-lg transition-colors">
                  <div className="h-10 w-10 rounded-full bg-[#A7C4A0] text-white flex items-center justify-center text-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 group-hover:text-[#A7C4A0] transition-colors">LAB RESULT INTERPRETATION</h4>
                    <p className="text-white/80">Upload hormone test results for clear, plain-language explanations of what they mean for your specific symptoms.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="font-medium text-center text-lg animate-pulse-gentle p-3 border border-white/20 rounded-lg">This isn't a generic approach to perimenopause - it's a precision-targeted system designed specifically for your {patternName} hormone profile.</p>
          </CardContent>
        </Card>
        
        {/* Testimonials */}
        <Card className="mb-8 reveal-section transform translate-y-4 opacity-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FFECD6]"></div>
          <CardHeader className="pb-4 border-b">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154] text-center">
              Women Like You Who Found Relief
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-[#FFECD6]/50 rounded-lg p-5 bg-gradient-to-br from-white to-[#FFECD6]/10 hover:shadow-md transition-all transform hover:-translate-y-1">
                <div className="relative mb-4">
                  <div className="absolute -top-2 -left-2 text-4xl text-[#FFECD6]">"</div>
                  <p className="italic text-gray-600 pt-4 pl-4">
                    For two years, doctors told me my symptoms were 'just stress' or 'part of getting older.' Within three weeks of using Peritrack, I identified clear patterns between my diet and sleep disruptions. I'm finally sleeping through the night again, and my energy has returned.
                  </p>
                  <div className="absolute -bottom-2 -right-2 text-4xl text-[#FFECD6]">"</div>
                </div>
                <div className="flex items-center pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-semibold">
                    JM
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-[#5D4154]">Jennifer M.</p>
                    <p className="text-sm text-gray-500">46, {patternName} profile</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#FFECD6]/50 rounded-lg p-5 bg-gradient-to-br from-white to-[#FFECD6]/10 hover:shadow-md transition-all transform hover:-translate-y-1">
                <div className="relative mb-4">
                  <div className="absolute -top-2 -left-2 text-4xl text-[#FFECD6]">"</div>
                  <p className="italic text-gray-600 pt-4 pl-4">
                    The brain fog was affecting my career. I was forgetting important details and losing confidence. Peritrack helped me identify exactly when my cognitive symptoms peak, and now I schedule my most demanding work around my hormone patterns. My last performance review was the best in years.
                  </p>
                  <div className="absolute -bottom-2 -right-2 text-4xl text-[#FFECD6]">"</div>
                </div>
                <div className="flex items-center pt-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFECD6] flex items-center justify-center text-[#5D4154] font-semibold">
                    KL
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-[#5D4154]">Karen L.</p>
                    <p className="text-sm text-gray-500">44, {patternName} profile</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Limited-Time Offer & Guarantee */}
        <Card className="mb-8 reveal-section transform translate-y-4 opacity-0">
          <CardHeader className="bg-gradient-to-r from-[#FFECD6] to-[#FFECD6]/30 pb-4">
            <CardTitle className="font-playfair text-2xl font-semibold text-[#5D4154]">
              Your Path Forward Begins Today
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-6">Because you've completed our comprehensive assessment, I'd like to extend a special offer:</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: "0.1s"}}>
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span className="font-medium">7-DAY FREE TRIAL of Peritrack Premium</span>
                  </li>
                  <li className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: "0.2s"}}>
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>Full access to all features during your trial</span>
                  </li>
                  <li className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: "0.3s"}}>
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>No credit card required to start</span>
                  </li>
                  <li className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: "0.4s"}}>
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>Then just $14/month to continue if you love it</span>
                  </li>
                  <li className="flex items-center space-x-2 animate-fade-in" style={{animationDelay: "0.5s"}}>
                    <div className="h-5 w-5 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white text-xs">✓</div>
                    <span>30-day money-back guarantee after billing begins</span>
                  </li>
                </ul>
                
                <p className="text-gray-700 text-sm">
                  This offer is specifically for women with your hormone pattern, as our data shows you're likely to experience significant benefits from our tracking system.
                </p>
                
                <div className="mt-4 p-4 bg-[#FFECD6]/50 rounded-lg border border-[#FFECD6]">
                  <p className="font-medium">Our Guarantee:</p>
                  <p>If you don't gain meaningful insights about your hormone patterns within 30 days after your trial, we'll refund your subscription – no questions asked.</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#5D4154] to-[#5D4154]/90 text-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-playfair text-xl font-semibold">Limited-Time Offer</h3>
                  <div className="flex items-center space-x-2 animate-pulse">
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
                
                <Button className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white py-6 text-lg shadow-lg transform hover:scale-105 transition-all">
                  Start My Free 7-Day Trial
                </Button>
                
                <p className="text-center text-sm mt-4">No credit card required</p>
                <p className="text-center text-xs mt-2">100% satisfaction guaranteed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Why This Matters Now */}
        <Card className="mb-8 reveal-section transform translate-y-4 opacity-0">
          <CardHeader className="bg-gradient-to-r from-[#5D4154] to-[#5D4154]/90 text-white">
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
            
            <p className="text-lg font-medium text-center mb-8 p-3 bg-[#FFECD6]/20 rounded-lg border border-[#FFECD6]/30">
              Your perimenopause journey may last 4-7 years. The approach you choose now will significantly impact your day-to-day quality of life throughout this transition.
            </p>
            
            <div className="text-center">
              <Button className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white px-8 py-6 text-lg mx-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Start My Free Trial Now
              </Button>
              
              <p className="mt-3">Your personalized dashboard is waiting for you.</p>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-[#5D4154]/10 flex items-center justify-center text-[#5D4154] text-2xl font-semibold mr-4">
                  JM
                </div>
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
            className="flex items-center gap-2 hover:bg-[#5D4154]/5 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retake Assessment
          </Button>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-[#FFECD6] text-[#5D4154] px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
            HIPAA Compliant
          </div>
          <div className="bg-[#FFECD6] text-[#5D4154] px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
            256-bit Encryption
          </div>
          <div className="bg-[#FFECD6] text-[#5D4154] px-4 py-2 rounded-full text-xs font-medium transition-transform hover:scale-105">
            Medically Reviewed
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
