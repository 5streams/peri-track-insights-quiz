
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
    <section className="hero-section bg-hero-gradient py-6 lg:py-8 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="hero-content fade-in-up">
            <h1 className="font-headline font-bold text-h1 text-primary mb-4 leading-tight">
              The Perimenopause Tracker That Actually Helps You Feel Better
            </h1>
            
            <p className="text-body-large text-warm-gray font-medium mb-4 leading-relaxed">
              Track your symptoms, get personalized relief strategies, and receive daily coaching tips based on YOUR unique patterns. Finally, a system that helps you manage perimenopause instead of just tracking it.
            </p>
            
            <p className="text-body-regular text-warm-gray mb-6 leading-relaxed">
              Stop suffering through unpredictable symptoms. Peritrack combines intelligent tracking with personalized coaching to help you find real relief from hot flashes, mood swings, sleep issues, and PMS.
            </p>
            
            <div className="social-proof-mini bg-white p-3 lg:p-4 rounded-xl mb-6 shadow-lg border border-gray-100">
              <span className="font-semibold text-primary text-body-regular block">
                Join 15,000+ women who've found symptom relief through smart tracking and personalized coaching.
              </span>
            </div>
            
            <div className="cta-container">
              <CTAButton 
                size="large" 
                variant="primary"
                className="w-full lg:w-auto mb-2"
                onClick={handleOpenSignupModal}
              >
                START YOUR FREE 7-DAY TRIAL
              </CTAButton>
              <p className="text-sm text-warm-gray text-center lg:text-left">
                No credit card required • Get relief strategies in 24 hours • Works on all devices
              </p>
            </div>
          </div>
          
          <div className="hero-visual fade-in-up text-center">
            <div className="relative inline-block animate-float">
              <img 
                src="/images/daily-check-in.png" 
                alt="PeriTrack Daily Check-In Interface" 
                className="w-auto h-auto max-w-full max-h-[600px] rounded-[3rem] shadow-2xl mx-auto"
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
