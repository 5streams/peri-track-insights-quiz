
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
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-4">
        <header className="flex justify-between items-center mb-4">
          <div className="logo">
            <img src="/images/logo.png" alt="Peritrack Logo" className="h-16 w-auto" />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/quiz" className="text-purple-700 hover:text-purple-800 font-medium">Quiz</Link></li>
              <li><Link to="/tryperitracker" className="text-white hover:text-purple-50 font-medium bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">Try Peritrack</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-4">
          <WelcomeScreen onStart={handleStartQuiz} />
          
          {/* Symptoms Section */}
          <section className="mt-16 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
                ARE THESE YOUR SYMPTOMS?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {symptoms.map((symptom, index) => (
                <div key={index} className="bg-white border-l-4 border-purple-400 p-6 rounded-r-xl shadow-lg hover:shadow-xl transition-shadow">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {symptom}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button 
                onClick={handleStartQuiz}
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Find Out If It's Perimenopause
              </Button>
            </div>
          </section>

          {/* How Our Assessment Works Section */}
          <section className="mt-20 mb-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
                HOW OUR ASSESSMENT WORKS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our scientifically-backed assessment uses advanced algorithms to analyze your symptoms
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {assessmentSteps.map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full text-2xl font-bold mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-purple-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="mt-20 mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
                WOMEN WHO FOUND ANSWERS
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join thousands of women who've gained clarity about their health
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border border-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-purple-400 text-4xl mb-4">"</div>
                  <p className="text-gray-700 italic text-lg mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="font-semibold text-purple-800 text-lg">
                    — {testimonial.name}, {testimonial.age}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-16 rounded-2xl shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                STOP WONDERING AND START KNOWING
              </h2>
              <p className="text-xl mb-8 opacity-90">
                In just 2 minutes, get clarity on whether your symptoms are perimenopause-related
              </p>
              <Button 
                onClick={handleStartQuiz}
                size="lg" 
                className="bg-white text-purple-700 hover:bg-gray-50 px-10 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
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
