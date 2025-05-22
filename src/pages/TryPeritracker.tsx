
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AppShowcase from "../components/results/AppShowcase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TryPeritracker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleStartTrial = () => {
    // Navigate to quiz 
    navigate("/quiz");
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
              <li><Link to="/" className="text-[#6b4e82] hover:text-[#8a6eaa] font-medium">Home</Link></li>
              <li><Link to="/quiz" className="text-[#6b4e82] hover:text-[#8a6eaa] font-medium">Quiz</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <div className="py-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#5D4154] mb-4 font-playfair">
              The Perimenopause Tracker That Actually Helps You Feel Better
            </h1>
            <p className="text-lg md:text-xl text-[#6D6875] max-w-3xl mx-auto mb-8">
              Track your symptoms, get personalized relief strategies, and receive daily coaching tips based on YOUR unique patterns.
            </p>
            <Button
              onClick={handleStartTrial}
              className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 text-base md:text-lg"
            >
              START YOUR FREE 7-DAY TRIAL
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              No credit card required • Cancel anytime
            </p>
          </div>
          
          {/* App Showcase Section */}
          <AppShowcase onStartTrial={handleStartTrial} />
          
          {/* Final CTA */}
          <div className="text-center my-16 bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4 font-playfair">
              Ready to Take Control of Your Perimenopause Journey?
            </h2>
            <p className="text-lg text-[#6D6875] max-w-2xl mx-auto mb-8">
              Join thousands of women who have transformed their perimenopause experience with Peritrack.
            </p>
            <Button
              onClick={handleStartTrial}
              className="bg-[#F97316] hover:bg-[#F97316]/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 text-base md:text-lg"
            >
              START YOUR FREE 7-DAY TRIAL
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TryPeritracker;
