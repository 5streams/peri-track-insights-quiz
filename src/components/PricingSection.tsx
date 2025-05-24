
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const PricingSection = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <section className="pricing-section py-12 lg:py-16 bg-accent">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Start Your Journey to Symptom Relief
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            Try Peritrack risk-free for 7 days. No credit card required.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="pricing-card bg-white p-6 lg:p-8 rounded-2xl shadow-xl text-center fade-in-up border-2 border-primary">
            <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              🔥 MOST POPULAR
            </div>
            
            <div className="mb-6">
              <div className="text-sm font-semibold text-secondary mb-1 uppercase tracking-wide">
                Free Trial
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                7 Days Free
              </div>
              <div className="text-warm-gray">
                Then $9.99/month • Cancel anytime
              </div>
            </div>

            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-warm-gray">Unlimited symptom tracking</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-warm-gray">AI pattern recognition & insights</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-warm-gray">24/7 access to Luna AI coach</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-warm-gray">Personalized relief strategies</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-warm-gray">Symptom predictions & alerts</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-warm-gray">Works on all devices</span>
              </div>
            </div>

            <CTAButton 
              size="large" 
              variant="primary" 
              className="w-full mb-3"
              onClick={handleOpenSignupModal}
            >
              START YOUR FREE TRIAL
            </CTAButton>
            
            <p className="text-xs text-warm-gray mb-4">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>

            {/* Secondary CTA */}
            <div className="border-t pt-4">
              <p className="text-sm text-red-600 font-medium mb-2">⏰ Limited spots available this week</p>
              <CTAButton 
                size="medium" 
                variant="urgent"
                className="w-full"
                onClick={handleOpenSignupModal}
              >
                SECURE MY SPOT NOW
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 fade-in-up">
          <div className="bg-white p-4 rounded-xl inline-block shadow-lg">
            <p className="text-primary font-medium">
              <span className="font-bold">Money-Back Guarantee:</span> If you don't see improvement in your symptoms within 30 days, we'll refund every penny.
            </p>
          </div>
        </div>
      </div>

      {/* Trial Signup Modal */}
      <TrialSignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
        pageSource="weight-gain-tracker"
      />
    </section>
  );
};

export default PricingSection;
