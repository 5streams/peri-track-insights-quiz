
import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const SolutionSection = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  
  return (
    <section className="solution-section py-6 lg:py-8 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-4">
          <h2 className="font-headline font-bold text-h2 text-primary mb-2 fade-in-up">
            What if you could identify exactly what's causing YOUR perimenopause weight gain?
          </h2>
          <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
            Peritrack doesn't just track your weight - it connects your hormonal patterns, symptoms, and lifestyle factors to reveal YOUR unique weight gain triggers and create a personalized weight loss strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">📊</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Track Weight + Hormones + Lifestyle</h3>
            <p className="text-warm-gray">
              Connect your weight changes to hormone fluctuations, sleep, stress, food, and exercise to see the complete picture.
            </p>
          </div>

          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">🎯</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Discover YOUR Weight Gain Triggers</h3>
            <p className="text-warm-gray">
              Identify exactly which foods, stress patterns, or hormone phases trigger YOUR weight gain - not generic advice.
            </p>
          </div>

          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-alert rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">📉</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Get Your Personalized Weight Loss Plan</h3>
            <p className="text-warm-gray">
              Receive customized strategies that work WITH your hormones, not against them, for sustainable weight loss.
            </p>
          </div>
        </div>

        <div className="text-center fade-in-up">
          <CTAButton 
            size="large" 
            variant="primary" 
            className="mb-1"
            onClick={handleOpenSignupModal}
          >
            START MY WEIGHT LOSS TRACKING
          </CTAButton>
          <p className="text-sm text-warm-gray">
            7-day trial then only $12.95/month • Join thousands who've solved perimenopause weight gain
          </p>
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

export default SolutionSection;
