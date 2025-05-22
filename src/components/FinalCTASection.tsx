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
    <section className="final-cta-section py-10 lg:py-12 bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline font-bold text-h2 mb-3 fade-in-up">
            Stop Letting Symptoms Control Your Life
          </h2>
          
          <p className="text-body-large mb-5 leading-relaxed fade-in-up opacity-90">
            You don't have to suffer through unpredictable hot flashes, sleepless nights, and mood swings. 
            Join 15,000+ women who've found relief through smart tracking and personalized coaching.
          </p>
          
          <div className="bg-white/10 p-5 rounded-2xl mb-5 fade-in-up">
            <h3 className="font-headline text-xl mb-2">What you'll get in your first week:</h3>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-secondary font-bold mb-1">Day 1-2</div>
                <div>Start tracking symptoms, meet Luna</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-1">Day 3-5</div>
                <div>First pattern insights and personalized tips</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-1">Day 6-7</div>
                <div>Symptom predictions and relief strategies</div>
              </div>
            </div>
          </div>
          
          <CTAButton 
            size="large" 
            variant="secondary" 
            className="mb-2 text-lg px-10 py-4"
            onClick={handleOpenSignupModal}
          >
            START YOUR FREE 7-DAY TRIAL
          </CTAButton>
          
          <p className="text-sm opacity-75 mb-4">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm opacity-75 fade-in-up">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              HIPAA Compliant
            </div>
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              iOS & Android
            </div>
            <div className="flex items-center">
              <span className="mr-2">⭐</span>
              4.9/5 Rating
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏆</span>
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
