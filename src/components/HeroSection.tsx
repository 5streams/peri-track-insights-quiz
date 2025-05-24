
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
    <section className="hero-section bg-gradient-to-br from-[#f8f5ff] to-white py-8 min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="hero-content fade-in-up">
            <div className="bg-white inline-block px-3 py-1 rounded-full text-sm font-medium text-[#9b87f5] mb-3 shadow-sm">
              #1 Perimenopause Weight Loss Tracker
            </div>
            
            <h1 className="font-headline font-bold text-3xl lg:text-4xl xl:text-5xl text-primary mb-4 leading-tight">
              Finally Understand Why Perimenopause Causes Weight Gain - And How to Lose It
            </h1>
            
            <p className="text-lg text-warm-gray font-medium mb-3 leading-relaxed">
              Track your hormones, metabolism, and weight patterns to discover YOUR unique perimenopause weight loss formula. Stop struggling with unexplained weight gain and start losing weight the smart way.
            </p>
            
            <p className="text-body-regular text-warm-gray mb-4 leading-relaxed">
              Perimenopause weight gain isn't your fault - but now you can track exactly what's causing it and create a personalized weight loss plan that actually works with your changing hormones.
            </p>
            
            <div className="social-proof-mini bg-white p-3 rounded-xl mb-5 shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                      👩
                    </div>
                  ))}
                </div>
                <span className="font-semibold text-primary text-body-regular">
                  Join 15,000+ women who've cracked the code on perimenopause weight loss through smart tracking.
                </span>
              </div>
            </div>
            
            <div className="cta-container">
              <CTAButton 
                size="large" 
                variant="primary"
                className="w-full sm:w-auto mb-1"
                onClick={handleOpenSignupModal}
              >
                START TRACKING MY WEIGHT LOSS
              </CTAButton>
              <p className="text-sm text-warm-gray text-center sm:text-left">
                7-day free trial then only $9.99/month
              </p>
            </div>
          </div>
          
          <div className="hero-visual fade-in-up text-center mt-4 lg:mt-0">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f1eaff] rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#e5f8e2] rounded-full -z-10"></div>
              <img 
                src="/images/daily-check-in.png" 
                alt="PeriTrack Weight Loss Tracking Interface" 
                className="w-auto h-auto max-w-full max-h-[550px] rounded-[2rem] shadow-xl mx-auto relative z-10"
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
