
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
    <section className="hero-section bg-gradient-to-br from-primary/5 to-secondary/10 py-12 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="hero-content">
            <h1 className="font-headline font-bold text-h1 text-primary mb-6 fade-in-up">
              Finally Understand Why You're Gaining Weight During Perimenopause
            </h1>
            
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded fade-in-up">
              <p className="text-lg text-gray-800 leading-relaxed">
                <strong>Frustrated by unexplained weight gain during perimenopause?</strong> You're not alone. 
                68% of women gain 10+ pounds during perimenopause despite eating the same and exercising regularly.
              </p>
            </div>
            
            <p className="text-body-large text-warm-gray mb-6 fade-in-up">
              The problem isn't willpower - it's not understanding how your changing hormones affect weight patterns. 
              Our tracking system helps you identify what's actually driving YOUR weight changes so you can work WITH your body, not against it.
            </p>
            
            <div className="hero-benefits mb-8 fade-in-up">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-warm-gray">Discover your personal weight gain triggers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-warm-gray">Understand which strategies work for YOUR body</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-warm-gray">Time your actions with your hormonal cycles</span>
                </div>
              </div>
            </div>
            
            <div className="hero-cta space-y-4 fade-in-up">
              <CTAButton 
                size="large" 
                variant="secondary"
                onClick={handleOpenSignupModal}
              >
                START DISCOVERING MY WEIGHT PATTERNS
              </CTAButton>
              <p className="text-sm text-center lg:text-left text-warm-gray">
                7-day free trial • No credit card required • Join 847 women tracking this week
              </p>
            </div>
          </div>
          
          <div className="hero-image relative fade-in-up">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=600&fit=crop&auto=format" 
                alt="Woman tracking her perimenopause patterns for weight management"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Pattern Discovered!</span>
              </div>
              <p className="text-xs text-gray-600">
                "Sleep quality directly affects my weight stability. Best results when I get 7+ hours!"
              </p>
            </div>
          </div>
        </div>
      </div>

      <TrialSignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
      />
    </section>
  );
};

export default HeroSection;
