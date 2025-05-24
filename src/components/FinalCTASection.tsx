
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
            Start Understanding Your Perimenopause Weight Patterns Today
          </h2>
          
          <p className="text-body-large mb-3 leading-relaxed fade-in-up opacity-90">
            You don't have to navigate perimenopause changes alone. 
            Join thousands of women who are learning about their patterns through smart tracking.
          </p>
          
          <div className="bg-white/10 p-4 rounded-2xl mb-3 fade-in-up">
            <h3 className="font-headline text-xl mb-1">Complete Pattern Tracking System</h3>
            <p className="text-base mb-2">Everything you need to monitor, understand, and discuss perimenopause weight patterns</p>
            <div className="grid md:grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-secondary font-bold mb-1">Week 1-2</div>
                <div>Start tracking patterns, build baseline data</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-1">Week 3-4</div>
                <div>Begin identifying potential connections</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-1">Week 5+</div>
                <div>Develop comprehensive insights for healthcare discussions</div>
              </div>
            </div>
          </div>
          
          <CTAButton 
            size="large" 
            variant="secondary" 
            className="mb-1 text-lg px-10 py-3"
            onClick={handleOpenSignupModal}
          >
            START MY PATTERN TRACKING
          </CTAButton>
          
          <p className="text-sm opacity-75 mb-2">
            7-day trial then only $12.95/month • Join thousands tracking their perimenopause journey
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
              4.5/5 Rating
            </div>
            <div className="flex items-center">
              <span className="mr-1">📋</span>
              Healthcare Reports
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/10 rounded-lg">
            <p className="text-xs opacity-90">
              <strong>Important Disclaimer:</strong> This is an educational tracking tool only. Results may vary. Individual experiences differ. Always consult your healthcare provider before making health-related decisions. Not intended to diagnose, treat, cure, or prevent any condition.
            </p>
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
