
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const HeroSection = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <section className="hero-section bg-hero-gradient py-2 lg:py-3 min-h-[45vh] flex items-center">
      <div className="container mx-auto px-3">
        <div className="grid lg:grid-cols-2 gap-3 items-center">
          <div className="hero-content fade-in-up">
            <h1 className="font-headline font-bold text-h1 text-primary mb-1.5 leading-tight">
              Track Your Perimenopause Journey with Confidence
            </h1>
            
            <p className="text-body-large text-warm-gray font-medium mb-1.5 leading-relaxed">
              Monitor your symptoms, discover patterns, and get personalized insights based on your unique experience. A comprehensive system designed to help you better understand your perimenopause journey.
            </p>
            
            <p className="text-body-regular text-warm-gray mb-2 leading-relaxed">
              Navigate perimenopause with better understanding. Peritrack combines smart tracking with educational content to help you stay informed about hot flashes, mood changes, sleep patterns, and cycle changes.
            </p>
            
            <div className="social-proof-mini bg-white p-1.5 rounded-lg mb-2 shadow-lg border border-gray-100">
              <span className="font-semibold text-primary text-body-regular block">
                Join thousands of women tracking their perimenopause experience with our comprehensive platform.
              </span>
            </div>
            
            <div className="cta-container">
              <CTAButton 
                size="medium" 
                variant="primary"
                className="w-full lg:w-auto mb-1"
                onClick={handleOpenSignupModal}
              >
                START YOUR FREE TRIAL
              </CTAButton>
              <p className="text-sm text-warm-gray text-center lg:text-left">
                Free 7 day trial then $12.95 a month • Join thousands of women on their perimenopause journey
              </p>
            </div>
          </div>
          
          <div className="hero-visual fade-in-up text-center">
            <div className="relative inline-block animate-float">
              <img 
                src="/images/daily-check-in.png" 
                alt="PeriTrack Daily Check-In Interface" 
                className="w-auto h-auto max-w-full max-h-[400px] rounded-lg shadow-xl mx-auto"
              />
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

export default HeroSection;
