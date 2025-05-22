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
      message: "I'm having terrible hot flashes at work. What can I do?"
    },
    {
      user: false,
      message: "I see you've been tracking hot flashes for 2 weeks. Based on your patterns, they seem to happen most between 2-4 PM. Here are 3 strategies that work for your symptom profile:"
    },
    {
      user: false,
      message: "1. Cooling breathwork: 4-4-6 breathing (in for 4, hold 4, out for 6)\n2. Keep a cooling towel at your desk\n3. Your triggers show stress + afternoon coffee might be contributing"
    },
    {
      user: true,
      message: "That's so specific to me! How did you know about the coffee?"
    },
    {
      user: false,
      message: "I noticed in your tracking that hot flashes increased 60-90 minutes after you logged coffee consumption. Your body might be more sensitive to caffeine during perimenopause. Want to try cutting it after 12 PM for a week?"
    }
  ];

  return (
    <section className="luna-section py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="luna-content fade-in-up">
            <h2 className="font-headline font-bold text-h2 text-primary mb-6">
              Meet Luna: Your Personal Perimenopause Coach
            </h2>
            
            <p className="text-body-large text-warm-gray mb-6 leading-relaxed">
              Luna isn't just another chatbot. She's your perimenopause expert who knows your unique patterns, triggers, and what actually works for YOUR body.
            </p>
            
            <div className="luna-features space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Knows Your History</h4>
                  <p className="text-warm-gray text-sm">Remembers every symptom, trigger, and what's worked for you</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">24/7 Available</h4>
                  <p className="text-warm-gray text-sm">Get support during 3 AM symptoms or sudden questions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Evidence-Based</h4>
                  <p className="text-warm-gray text-sm">Recommendations based on latest perimenopause research</p>
                </div>
              </div>
            </div>
            
            <CTAButton 
              size="medium" 
              variant="primary"
              onClick={handleOpenSignupModal}
            >
              CHAT WITH LUNA NOW
            </CTAButton>
          </div>
          
          <div className="luna-chat fade-in-up">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-primary text-white p-4 flex items-center">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-semibold">Luna</h4>
                  <p className="text-xs opacity-75">Your Perimenopause Coach</p>
                </div>
                <div className="ml-auto flex space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs">Online</span>
                </div>
              </div>
              
              <div className="p-4 max-h-96 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed ${
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
              
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Ask Luna anything..."
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                    disabled
                  />
                  <button className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium">
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
