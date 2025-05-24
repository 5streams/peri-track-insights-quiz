
import React, { useState } from 'react';
import { Button } from './ui/button';
import TrialSignupModal from './TrialSignupModal';

const EnhancedFinalCTA = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 fade-in-up">
            Stop Guessing. Start Understanding. See Results.
          </h2>
          
          <p className="text-xl mb-8 fade-in-up">
            Every day you wait is another day of frustrating weight management. 
            Join the thousands of women who've discovered their personal patterns.
          </p>
          
          <div className="bg-white/20 rounded-lg p-6 mb-8 fade-in-up">
            <h3 className="text-2xl font-bold mb-4">Start Your 7-Day Free Trial</h3>
            <p className="text-lg mb-4">See your first weight pattern insights within 2 weeks</p>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Discover YOUR weight gain triggers</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Understand which strategies work for YOUR body</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Create a sustainable, personalized approach</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>Stop wasting time on generic advice</span>
              </li>
            </ul>
            <p className="text-lg font-bold">$0 for 7 days, then just $12.95/month</p>
          </div>
          
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 text-xl font-bold rounded-lg mb-4 fade-in-up"
            onClick={handleOpenSignupModal}
          >
            START MY PATTERN DISCOVERY
          </Button>
          
          <p className="mt-4 text-sm fade-in-up">
            No credit card required • Cancel anytime • See results or get your money back
          </p>
          
          <div className="mt-6 flex justify-center items-center space-x-8 text-sm fade-in-up">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span>847 women started tracking this week</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              <span>Limited spots for personalized onboarding</span>
            </div>
          </div>
        </div>
      </div>

      <TrialSignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
        pageSource="weight-gain-tracker"
      />
    </section>
  );
};

export default EnhancedFinalCTA;
