
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const FinalCTASection = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <section className="final-cta-section py-6 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline font-bold text-h2 mb-2 fade-in-up">
            Stop Letting Perimenopause Weight Gain Control Your Life
          </h2>
          
          <p className="text-body-large mb-3 leading-relaxed fade-in-up opacity-90">
            You don't have to accept unexplained weight gain as "just part of aging." 
            Join 15,000+ women who've discovered their personal weight loss formula through smart tracking.
          </p>
          
          <div className="bg-white/10 p-4 rounded-2xl mb-3 fade-in-up">
            <h3 className="font-headline text-xl mb-1">Complete Weight Loss Tracking System</h3>
            <p className="text-base mb-2">Everything you need to understand, predict, and reverse perimenopause weight gain</p>
            <div className="grid md:grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-secondary font-bold mb-1">Week 1-2</div>
                <div>Start tracking patterns, identify triggers</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-1">Week 3-4</div>
                <div>First weight loss insights and strategies</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-1">Week 5+</div>
                <div>Personalized weight loss plan in action</div>
              </div>
            </div>
          </div>
          
          <CTAButton 
            size="large" 
            variant="secondary" 
            className="mb-1 text-lg px-10 py-3"
            onClick={handleOpenSignupModal}
          >
            START MY WEIGHT LOSS TRACKING
          </CTAButton>
          
          <p className="text-sm opacity-75 mb-2">
            7-day trial then only $12.95/month • Join thousands who've solved perimenopause weight gain
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm opacity-75 fade-in-up">
            <div className="flex items-center">
              <span className="mr-1">🔒</span>
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <span className="mr-1">📱</span>
              iOS & Android
            </div>
            <div className="flex items-center">
              <span className="mr-1">⭐</span>
              4.9/5 Rating
            </div>
            <div className="flex items-center">
              <span className="mr-1">🏆</span>
              Award-Winning
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

export default FinalCTASection;
