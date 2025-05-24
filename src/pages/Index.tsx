
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeScreen from "../components/quiz/WelcomeScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Navigate to the quiz page using React Router
    navigate("/quiz");
  };

  const symptoms = [
    "Having trouble sleeping even when you're exhausted?",
    "Experiencing mood swings that seem to come out of nowhere?",
    "Noticing weight changes despite no changes to diet or exercise?",
    "Feeling foggy-headed or having trouble concentrating?",
    "Experiencing hot flashes or night sweats?",
    "Noticing changes in your menstrual cycle?"
  ];

  const assessmentSteps = [
    {
      number: "1",
      title: "Identify Symptoms",
      description: "Tell us which symptoms you're experiencing"
    },
    {
      number: "2", 
      title: "AI Analysis",
      description: "Our technology identifies hormone patterns"
    },
    {
      number: "3",
      title: "Get Insights", 
      description: "Discover which symptoms are perimenopause-related"
    }
  ];

  const testimonials = [
    {
      quote: "I thought I was just stressed, but the assessment showed my symptoms were classic perimenopause. What a relief to finally know!",
      name: "Jennifer",
      age: "44"
    },
    {
      quote: "For months I wondered if something was wrong with me. This quiz confirmed my symptoms were perimenopause and helped me talk to my doctor.",
      name: "Karen",
      age: "45"
    },
    {
      quote: "I couldn't understand my sudden memory issues and mood changes. This assessment identified them as perimenopause, not just 'getting older.'",
      name: "Patricia",
      age: "43"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-purple-100/40 to-white min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <header className="flex justify-between items-center mb-4">
          <div className="logo">
            <img src="/images/logo.png" alt="Peritrack Logo" className="h-16 w-auto" />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/quiz" className="text-[#6b4e82] hover:text-[#8a6eaa] font-medium">Quiz</Link></li>
              <li><Link to="/tryperitracker" className="text-[#6b4e82] hover:text-[#8a6eaa] font-medium bg-purple-100/30 px-3 py-1 rounded-md">Try Peritrack</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-4">
          <WelcomeScreen onStart={handleStartQuiz} />
          
          {/* Symptoms Section */}
          <section className="mt-12 mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#6b4e82] mb-6">
                ARE THESE YOUR SYMPTOMS?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm border-l-4 border-[#8a6eaa] p-4 rounded-r-lg shadow-sm">
                  <p className="text-gray-700 text-lg">
                    {symptom}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button 
                onClick={handleStartQuiz}
                size="lg" 
                className="bg-[#6b4e82] hover:bg-[#8a6eaa] text-white px-8 py-4 text-lg transition-colors"
              >
                Find Out If It's Perimenopause
              </Button>
            </div>
          </section>

          {/* How Our Assessment Works Section */}
          <section className="mt-16 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#6b4e82] mb-4">
                HOW OUR ASSESSMENT WORKS
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-12">
              {assessmentSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6b4e82] text-white rounded-full text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="mt-16 mb-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#6b4e82] mb-4">
                WOMEN WHO FOUND ANSWERS
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm border-purple-200/50 p-6 rounded-lg shadow-lg">
                  <p className="text-gray-700 italic text-lg mb-4">
                    "{testimonial.quote}"
                  </p>
                  <div className="font-medium text-[#6b4e82]">
                    — {testimonial.name}, {testimonial.age}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-[#6b4e82] text-white text-center py-12 mt-12 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                STOP WONDERING AND START KNOWING
              </h2>
              <p className="text-lg mb-6">
                In just 2 minutes, get clarity on whether your symptoms
              </p>
              <Button 
                onClick={handleStartQuiz}
                size="lg" 
                className="bg-white text-[#6b4e82] hover:bg-gray-100 px-8 py-4 text-lg transition-colors"
              >
                Take The FREE Perimenopause Quiz
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
