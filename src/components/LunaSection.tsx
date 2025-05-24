
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const LunaSection = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  
  const chatMessages = [
    {
      user: true,
      message: "I've been gaining weight during perimenopause and nothing seems to work. Can you help me understand what's happening?"
    },
    {
      user: false,
      message: "I see you've been tracking your weight patterns for 3 weeks. Based on your data, I notice your weight fluctuates most during the luteal phase of your cycle. This is very common during perimenopause due to hormonal changes."
    },
    {
      user: false,
      message: "Your tracking shows weight increases correlate with: 1. Sleep disruption (less than 6 hours), 2. Higher stress days, 3. Certain foods that may trigger inflammation. Want me to show you the specific patterns I've identified?"
    },
    {
      user: true,
      message: "Yes! I had no idea there were patterns. What should I focus on first?"
    },
    {
      user: false,
      message: "Based on your data, improving sleep quality shows the strongest correlation with weight stability. I've created a personalized plan: prioritize 7+ hours sleep, track which foods correlate with your best weeks, and monitor stress during high-fluctuation days."
    },
    {
      user: true,
      message: "This is exactly what I needed! How do you track all these connections?"
    },
    {
      user: false,
      message: "I analyze your daily inputs - weight, sleep, food, stress, cycle phase - and identify correlations over time. This data helps you understand what factors support your weight management goals during perimenopause."
    }
  ];

  return (
    <section className="luna-section py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="luna-content fade-in-up">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4">
              Meet Luna: Your Personal Perimenopause Weight Management Coach
            </h2>
            
            <p className="text-body-large text-warm-gray mb-4 leading-relaxed">
              Luna analyzes your unique patterns to help you understand what factors influence your weight during perimenopause and creates personalized strategies for better management.
            </p>
            
            <div className="luna-features space-y-3 mb-5">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Identifies Weight Patterns</h4>
                  <p className="text-warm-gray text-sm">Tracks correlations between sleep, stress, food, and weight changes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Personalized Weight Strategies</h4>
                  <p className="text-warm-gray text-sm">Creates custom plans based on your specific patterns and triggers</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Weekly Progress Insights</h4>
                  <p className="text-warm-gray text-sm">Shows what's working and adjusts recommendations for better results</p>
                </div>
              </div>
            </div>
            
            <CTAButton 
              size="medium" 
              variant="primary"
              onClick={handleOpenSignupModal}
            >
              START TRACKING MY PATTERNS
            </CTAButton>
            <p className="text-xs text-center lg:text-left mt-1 text-warm-gray">
              7-day trial then only $12.95/month
            </p>
          </div>
          
          <div className="luna-chat fade-in-up">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-primary text-white p-3 flex items-center">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-semibold">Luna</h4>
                  <p className="text-xs opacity-75">Your Weight Management Coach</p>
                </div>
                <div className="ml-auto flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs">Online</span>
                </div>
              </div>
              
              <div className="p-3 max-h-80 overflow-y-auto space-y-3">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm leading-relaxed ${
                        msg.user 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-warm-gray'
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t bg-gray-50">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask about my weight patterns..."
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    disabled
                  />
                  <button className="bg-secondary text-white px-3 py-2 rounded-lg text-sm font-medium">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trial Signup Modal */}
      <TrialSignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
      />
    </section>
  );
};

export default LunaSection;
