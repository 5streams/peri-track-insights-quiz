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
    <section className="hero-section bg-hero-gradient py-12 lg:py-16 min-h-[70vh] flex items-center">
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
          
          <div className="hero-visual fade-in-up lg:order-last order-first text-center">
            <div className="relative inline-block animate-float">
              <div className="w-80 h-96 lg:w-96 lg:h-[480px] bg-gradient-to-br from-primary to-secondary rounded-[3rem] shadow-2xl mx-auto relative overflow-hidden">
                <div className="absolute inset-4 bg-white rounded-[2.5rem] flex flex-col">
                  <div className="bg-primary text-white p-4 rounded-t-[2.5rem] text-center">
                    <h3 className="font-semibold text-lg">Peritrack</h3>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                        <span className="text-sm font-medium">🔥 Hot Flash</span>
                        <span className="text-xs bg-alert text-white px-2 py-1 rounded">Severe</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">😴 Sleep Quality</span>
                        <span className="text-xs bg-secondary text-white px-2 py-1 rounded">Poor</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium">😢 Mood</span>
                        <span className="text-xs bg-warm-gray text-white px-2 py-1 rounded">Low</span>
                      </div>
                      <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">L</div>
                          <div>
                            <p className="text-xs text-primary font-medium">Luna suggests:</p>
                            <p className="text-xs text-warm-gray mt-1">"Try cooling breathing for hot flashes - breathe in for 4, hold for 4, out for 6."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default HeroSection;
