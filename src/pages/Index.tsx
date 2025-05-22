import React from "react";
import { Link } from "react-router-dom";
import WelcomeScreen from "../components/quiz/WelcomeScreen";

const Index = () => {
  const handleStartQuiz = () => {
    // Navigate to the quiz page
    window.location.href = "/quiz";
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
              <li><Link to="/tryperitracker" className="text-[#6b4e82] hover:text-[#8a6eaa] font-medium">Try Peritrack</Link></li>
            </ul>
          </nav>
        </header>

        <main className="mt-16">
          <WelcomeScreen onStart={handleStartQuiz} />
          
          <div className="text-center mt-12">
            <Link 
              to="/tryperitracker" 
              className="inline-block bg-[#a68bc7] hover:bg-[#8a6eaa] text-white px-8 py-4 text-lg rounded-md shadow-md transition-colors"
            >
              Learn More About Peritrack
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
