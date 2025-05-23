
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
            What if you could predict and prevent your worst symptoms?
          </h2>
          <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
            Peritrack doesn't just track your symptoms - it learns your unique patterns and gives you personalized strategies to feel better before symptoms strike.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">📊</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Smart Pattern Recognition</h3>
            <p className="text-warm-gray">
              Our AI identifies your unique symptom patterns, triggers, and cycles so you know what to expect and when.
            </p>
          </div>

          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">🎯</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Personalized Relief Strategies</h3>
            <p className="text-warm-gray">
              Get targeted recommendations based on YOUR data - not generic advice that might not work for you.
            </p>
          </div>

          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-alert rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">🤖</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">24/7 AI Coach Luna</h3>
            <p className="text-warm-gray">
              Your personal perimenopause coach available anytime to answer questions and provide support.
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
            DISCOVER YOUR PATTERNS TODAY
          </CTAButton>
          <p className="text-sm text-warm-gray">
            7-day trial then only $12.95/month • Join thousands of women who've transformed their perimenopause experience
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
