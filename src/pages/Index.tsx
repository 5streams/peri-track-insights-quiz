
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeScreen from "../components/quiz/WelcomeScreen";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Navigate to the quiz page using React Router
    navigate("/quiz");
  };

  const testimonials = [
    {
      quote: "This quiz helped me understand my symptoms weren't just 'getting older.' I finally have clarity about what's happening in my body.",
      name: "Sarah M.",
      age: "46"
    },
    {
      quote: "I was struggling with sleep issues and mood changes. The assessment gave me the validation I needed and clear next steps.",
      name: "Jennifer L.",
      age: "43"
    },
    {
      quote: "After taking this quiz, I realized I wasn't alone. The personalized insights helped me have better conversations with my doctor.",
      name: "Michelle K.",
      age: "48"
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
          
          {/* Testimonials Section */}
          <section className="mt-16 mb-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#6b4e82] mb-4">
                What Women Are Saying
              </h2>
              <p className="text-lg text-[#8a6eaa]">
                Join thousands of women who've gained clarity about their symptoms
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-purple-200/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Quote className="h-6 w-6 text-[#8a6eaa]/50 flex-shrink-0 mt-1" />
                      <div className="ml-3">
                        <p className="text-gray-700 italic mb-4">
                          "{testimonial.quote}"
                        </p>
                        <div className="font-medium text-[#6b4e82]">
                          — {testimonial.name}, {testimonial.age}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
