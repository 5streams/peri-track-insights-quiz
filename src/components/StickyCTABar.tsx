
import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';
import { X } from 'lucide-react';

const StickyCTABar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px down
      setIsVisible(window.scrollY > 500 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white p-4 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <p className="font-semibold text-sm md:text-base">
              🔥 Don't miss out! Join 15,000+ women tracking their weight patterns
            </p>
            <p className="text-xs opacity-90">7-day free trial • $9.99/month after</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <CTAButton 
              size="small" 
              variant="secondary"
              onClick={handleOpenSignupModal}
            >
              START FREE TRIAL
            </CTAButton>
            
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <TrialSignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
        pageSource="weight-gain-tracker"
      />
    </>
  );
};

export default StickyCTABar;
