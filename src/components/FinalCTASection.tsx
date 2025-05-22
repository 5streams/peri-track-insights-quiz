
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
    <section className="final-cta-section py-8 lg:py-10 bg-primary text-white">
      <div className="container mx-auto px-4 lg:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline font-bold text-h2 mb-2 fade-in-up">
            Stop Letting Symptoms Control Your Life
          </h2>
          
          <p className="text-body-large mb-4 leading-relaxed fade-in-up opacity-90">
            You don't have to suffer through unpredictable hot flashes, sleepless nights, and mood swings. 
            Join 15,000+ women who've found relief through smart tracking and personalized coaching.
          </p>
          
          <div className="bg-white/10 p-4 rounded-2xl mb-4 fade-in-up">
            <h3 className="font-headline text-xl mb-2">Complete Symptom Relief System</h3>
            <p className="text-base mb-3">Everything you need to understand, predict, and manage your symptoms</p>
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
            className="mb-1 text-lg px-10 py-4"
            onClick={handleOpenSignupModal}
          >
            DISCOVER YOUR PATTERNS TODAY
          </CTAButton>
          
          <p className="text-sm opacity-75 mb-3">
            7-day trial then only $12.95/month • Join thousands of women who've transformed their perimenopause experience
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
