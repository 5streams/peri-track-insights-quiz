
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeScreen from "../components/quiz/WelcomeScreen";

const Index = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Navigate to the quiz page using React Router
    navigate("/quiz");
  };

  const handleLearnMore = () => {
    // Navigate to the Peritrack info page using React Router
    navigate("/tryperitracker");
  };

  return (
    <div className="bg-gradient-to-b from-purple-100/40 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
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

        <main className="mt-16">
          <WelcomeScreen onStart={handleStartQuiz} />
          
          <div className="text-center mt-12 space-y-6">
            <button 
              onClick={handleLearnMore}
              className="inline-block bg-[#a68bc7] hover:bg-[#8a6eaa] text-white px-8 py-4 text-lg rounded-md shadow-md transition-colors"
            >
              Learn More About Peritrack
            </button>
            
            <p className="text-[#6b4e82] max-w-md mx-auto">
              Visit our sales page to learn about the full features of Peritrack and how it can help with your perimenopause journey.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
