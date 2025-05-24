
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
      message: "I've gained 15 pounds in 6 months and nothing I used to do for weight loss is working anymore. Can you help me understand what's changed?"
    },
    {
      user: false,
      message: "I see you've been tracking for 4 weeks now. Your data shows interesting patterns - your weight fluctuates most during weeks when you get less than 6 hours of sleep. This is common during perimenopause when falling progesterone affects both sleep and metabolism."
    },
    {
      user: false,
      message: "Looking at your food and weight correlations, I notice you maintain stable weight when you eat protein within 2 hours of waking, and weight tends to increase during weeks with high processed carbs during your luteal phase. Your body is responding differently to timing and food types now."
    },
    {
      user: true,
      message: "That makes so much sense! What should I focus on first to start managing this weight gain?"
    },
    {
      user: false,
      message: "Based on your strongest correlations: 1) Prioritize 7+ hours of sleep - this shows the biggest impact on your weight stability, 2) Focus on protein timing in the morning, 3) Reduce processed carbs during luteal phase. These changes work WITH your hormonal patterns instead of against them."
    },
    {
      user: true,
      message: "Will this actually help me lose the weight I've gained?"
    },
    {
      user: false,
      message: "Your tracking data suggests these strategies should support weight management. Sarah with similar patterns lost 12 pounds in 4 months focusing on sleep, and Jennifer achieved stable weight by adjusting food timing. Each person's patterns are unique, which is why tracking YOUR specific correlations is so powerful."
    }
  ];

  return (
    <section className="luna-section py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="luna-content fade-in-up">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4">
              Meet Luna: Your Personal Weight Management Coach for Perimenopause
            </h2>
            
            <p className="text-body-large text-warm-gray mb-4 leading-relaxed">
              Luna analyzes your unique weight patterns during perimenopause and creates personalized strategies to help you manage weight changes based on YOUR specific data and correlations.
            </p>
            
            <div className="luna-features space-y-3 mb-5">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Identifies Your Weight Patterns</h4>
                  <p className="text-warm-gray text-sm">Tracks correlations between sleep, stress, food, hormones and weight changes to find what affects YOUR body</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Personalized Weight Management Strategies</h4>
                  <p className="text-warm-gray text-sm">Creates custom plans based on what actually works for weight management in your specific situation</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Weekly Progress Insights</h4>
                  <p className="text-warm-gray text-sm">Shows which strategies are supporting your weight goals and adjusts recommendations for better results</p>
                </div>
              </div>
            </div>
            
            <CTAButton 
              size="medium" 
              variant="primary"
              onClick={handleOpenSignupModal}
            >
              START TRACKING MY WEIGHT PATTERNS
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
