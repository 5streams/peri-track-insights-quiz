
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
    <section className="solution-section py-4 lg:py-5 bg-gray-50">
      <div className="container mx-auto px-3">
        <div className="text-center mb-3">
          <h2 className="font-headline font-bold text-h2 text-primary mb-1 fade-in-up">
            Better understand your perimenopause patterns
          </h2>
          <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
            Peritrack helps you track your symptoms and discover patterns through intelligent monitoring and educational insights tailored to your experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-3 mb-4">
          <div className="solution-card bg-white p-3 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-lg text-white">📊</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Smart Pattern Recognition</h3>
            <p className="text-warm-gray">
              Our system helps identify your unique symptom patterns and cycles so you can better understand what to expect.
            </p>
          </div>

          <div className="solution-card bg-white p-3 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-lg text-white">🎯</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Personalized Insights</h3>
            <p className="text-warm-gray">
              Get educational content and lifestyle suggestions based on your data - information tailored to your experience.
            </p>
          </div>

          <div className="solution-card bg-white p-3 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-10 h-10 bg-alert rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-lg text-white">🤖</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">AI Assistant Luna</h3>
            <p className="text-warm-gray">
              Your educational perimenopause companion available anytime to provide information and support.
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
            START TRACKING TODAY
          </CTAButton>
          <p className="text-sm text-warm-gray">
            7-day trial then only $12.95/month • Join thousands of women on their perimenopause journey
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
