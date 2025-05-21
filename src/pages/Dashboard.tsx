
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Calendar, BarChart, TestTube, HelpCircle, User, MessageSquare, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import DailyCheckInCard from "@/components/dashboard/DailyCheckInCard";
import WelcomeModule from "@/components/dashboard/WelcomeModule";
import HormonePatternInsights from "@/components/dashboard/HormonePatternInsights";
import RecentSymptomsSummary from "@/components/dashboard/RecentSymptomsSummary";
import AiAssistantPreview from "@/components/dashboard/AiAssistantPreview";
import PersonalizedRecommendations from "@/components/dashboard/PersonalizedRecommendations";
import { Toaster } from "@/components/ui/toaster";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({ firstName: "Sarah", email: "" });
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const navigate = useNavigate();

  // Initialize app data
  useEffect(() => {
    // Initialize user data if not present
    if (!localStorage.getItem("userInfo")) {
      localStorage.setItem("userInfo", JSON.stringify({
        firstName: "Sarah",
        email: "sarah@example.com",
        dateJoined: new Date().toISOString()
      }));
    }
    
    // Initialize trial start date if not present
    if (!localStorage.getItem("trialStartDate")) {
      localStorage.setItem("trialStartDate", Date.now().toString());
    }
  }, []);

  // This would fetch user data in a real application
  useEffect(() => {
    // Load user data
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    
    // Calculate trial days remaining
    const startDate = new Date(parseInt(localStorage.getItem("trialStartDate") || Date.now().toString()));
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setTrialDaysLeft(Math.max(0, 7 - daysPassed));
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F5] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-100">
          <h1 className="font-playfair text-2xl font-bold text-[#5D4154]">Peritrack</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#FFECD6]/30 rounded-lg text-[#5D4154] font-medium">
                <BarChart className="h-5 w-5" />
                Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D6875] hover:bg-[#FFECD6]/20 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/tracking");
                }}
              >
                <Calendar className="h-5 w-5" />
                Track
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D6875] hover:bg-[#FFECD6]/20 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/insights");
                }}
              >
                <BarChart className="h-5 w-5" />
                Insights
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D6875] hover:bg-[#FFECD6]/20 transition-colors">
                <TestTube className="h-5 w-5" />
                Labs
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D6875] hover:bg-[#FFECD6]/20 transition-colors">
                <MessageSquare className="h-5 w-5" />
                Assistant
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6D6875] hover:bg-[#FFECD6]/20 transition-colors">
                <BookOpen className="h-5 w-5" />
                Learn
              </a>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="px-4">
              <div className="bg-[#5D4154]/10 rounded-lg p-4">
                <p className="text-sm text-[#5D4154]">Trial Status</p>
                <p className="font-medium text-[#5D4154]">{trialDaysLeft} days remaining</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#A7C4A0] h-2 rounded-full" 
                    style={{ width: `${(trialDaysLeft / 7) * 100}%` }}
                  ></div>
                </div>
                <Button className="w-full mt-4 bg-[#5D4154] hover:bg-[#5D4154]/90">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="md:hidden">
            <h1 className="font-playfair text-xl font-bold text-[#5D4154]">Peritrack</h1>
          </div>
          <div className="md:hidden"></div> {/* Spacer for mobile */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-[#6D6875]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF9B85] rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <HelpCircle className="h-5 w-5 text-[#6D6875]" />
            </button>
            <div className="h-9 w-9 rounded-full bg-[#A7C4A0] flex items-center justify-center text-white font-medium">
              {userInfo.firstName?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around z-20">
          <a href="#" className="flex-1 flex flex-col items-center py-3 text-[#5D4154]">
            <BarChart className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a 
            href="#" 
            className="flex-1 flex flex-col items-center py-3 text-[#6D6875]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/tracking");
            }}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs mt-1">Track</span>
          </a>
          <a 
            href="#" 
            className="flex-1 flex flex-col items-center py-3 text-[#6D6875]"
            onClick={(e) => {
              e.preventDefault();
              navigate("/insights");
            }}
          >
            <BarChart className="h-6 w-6" />
            <span className="text-xs mt-1">Insights</span>
          </a>
          <a href="#" className="flex-1 flex flex-col items-center py-3 text-[#6D6875]">
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Chat</span>
          </a>
          <a href="#" className="flex-1 flex flex-col items-center py-3 text-[#6D6875]">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Account</span>
          </a>
        </div>

        {/* Main Dashboard Content */}
        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {/* Welcome Module */}
          <WelcomeModule 
            firstName={userInfo.firstName} 
            trialDaysLeft={trialDaysLeft} 
          />

          <div className="mt-6">
            <PersonalizedRecommendations firstName={userInfo.firstName} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <DailyCheckInCard />
            <RecentSymptomsSummary />
          </div>

          <div className="mt-6">
            <HormonePatternInsights />
          </div>

          <div className="mt-6">
            <AiAssistantPreview firstName={userInfo.firstName} />
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              onClick={() => navigate("/tracking")}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 gap-2"
            >
              <Calendar className="h-4 w-4" />
              Go to Full Tracking
            </Button>
            <p className="mt-2 text-sm text-gray-500">
              Track your symptoms, cycle, and more in detail
            </p>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
