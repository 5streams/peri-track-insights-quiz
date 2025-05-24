
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
    <div className="bg-[#F5E6D3] min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-8">
          <div className="logo">
            <img src="/images/logo.png" alt="Peritrack Logo" className="h-12 w-auto" />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/quiz" className="text-[#6B4E7A] hover:text-[#6B4E7A]/80 font-medium">Quiz</Link></li>
              <li><Link to="/tryperitracker" className="bg-[#6B4E7A] hover:bg-[#6B4E7A]/90 text-white px-6 py-2 rounded-lg transition-colors">Try Peritrack</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <WelcomeScreen onStart={handleStartQuiz} />
          
          {/* Symptoms Section */}
          <section className="mt-8 mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4E7A] mb-4">
                Do These Sound Familiar?
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                These common experiences might be signs of perimenopause
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {symptoms.map((symptom, index) => (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-all duration-200 border-0">
                  <CardContent className="p-6">
                    <p className="text-[#4A4A4A] text-lg">
                      {symptom}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                onClick={handleStartQuiz}
                size="lg" 
                className="bg-[#6B4E7A] hover:bg-[#6B4E7A]/90 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors shadow-md"
              >
                Take the Assessment
              </Button>
            </div>
          </section>

          {/* How Our Assessment Works Section */}
          <section className="mt-20 mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4E7A] mb-4">
                How It Works
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                A simple 3-step process to understand your symptoms
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-12">
                {assessmentSteps.map((step, index) => (
                  <Card key={index} className="text-center bg-white shadow-sm hover:shadow-md transition-all duration-200 border-0">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#6B4E7A] text-white rounded-full text-xl font-bold mb-6">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-bold text-[#6B4E7A] mb-4">
                        {step.title}
                      </h3>
                      <p className="text-[#4A4A4A] text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="mt-20 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4E7A] mb-4">
                What Women Are Saying
              </h2>
              <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                Real stories from women who found clarity
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-all duration-200 border-0">
                  <CardContent className="p-8">
                    <div className="text-[#6B4E7A]/30 text-3xl mb-4">"</div>
                    <p className="text-[#4A4A4A] text-lg mb-6 leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="font-semibold text-[#6B4E7A]">
                      — {testimonial.name}, {testimonial.age}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-[#6B4E7A] text-white shadow-lg border-0">
              <CardContent className="text-center py-16 px-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Get Clarity in 2 Minutes
                </h2>
                <p className="text-xl mb-8 text-white/90">
                  Take our free assessment and understand what's happening to your body
                </p>
                <Button 
                  onClick={handleStartQuiz}
                  size="lg" 
                  className="bg-white text-[#6B4E7A] hover:bg-white/90 px-8 py-4 text-lg font-medium rounded-lg transition-colors shadow-md"
                >
                  Start Your Free Assessment
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
