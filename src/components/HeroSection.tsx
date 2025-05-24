
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
              Perimenopause Weight Tracking System
            </div>
            
            <h1 className="font-headline font-bold text-3xl lg:text-4xl xl:text-5xl text-primary mb-4 leading-tight">
              Track Perimenopause Weight Patterns and Understand Your Body's Changes
            </h1>
            
            <p className="text-lg text-warm-gray font-medium mb-3 leading-relaxed">
              Monitor your weight, hormones, and lifestyle factors to identify patterns during perimenopause. Educational tracking tools to help you understand your body's changes and discuss findings with your healthcare provider.
            </p>
            
            <p className="text-body-regular text-warm-gray mb-4 leading-relaxed">
              Perimenopause brings changes to your body - tracking these patterns can provide valuable insights to share with your doctor for personalized guidance.
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
                  Join thousands of women tracking their perimenopause patterns.
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
                START TRACKING MY PATTERNS
              </CTAButton>
              <p className="text-sm text-warm-gray text-center sm:text-left">
                7-day free trial then only $9.99/month
              </p>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-gray-600">
                <strong>Important:</strong> This is a tracking and educational tool. Results may vary. Always consult your healthcare provider before making changes to your health routine. Individual experiences may differ.
              </p>
            </div>
          </div>
          
          <div className="hero-visual fade-in-up text-center mt-4 lg:mt-0">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f1eaff] rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#e5f8e2] rounded-full -z-10"></div>
              <img 
                src="/images/daily-check-in.png" 
                alt="PeriTrack Weight Tracking Interface" 
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
