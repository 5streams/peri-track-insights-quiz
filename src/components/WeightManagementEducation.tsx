import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const WeightManagementEducation = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-3xl lg:text-4xl text-primary mb-6 fade-in-up">
            What Happens When You Understand YOUR Weight Patterns
          </h2>
          
          <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
            Imagine a life where you're not constantly battling your body. Instead, you're working WITH it.
          </p>
          
          <div className="grid lg:grid-cols-3 gap-8 mt-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center fade-in-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-headline text-xl text-primary mb-2">
                Pinpoint Weight Triggers
              </h3>
              <p className="text-warm-gray">
                Identify the specific factors (sleep, stress, diet) that cause YOUR weight to fluctuate.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center fade-in-up">
              <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.63 0 8.567 3.01 9.964 7.183a1.012 1.012 0 010 .639c-1.387 4.802-5.324 7.813-9.964 7.813C7.36 19.5 3.423 16.489 2.036 12.322z" />
                </svg>
              </div>
              <h3 className="font-headline text-xl text-primary mb-2">
                Personalized Insights
              </h3>
              <p className="text-warm-gray">
                Move beyond generic advice. Discover which strategies are most effective for YOUR unique body.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center fade-in-up">
              <div className="w-16 h-16 rounded-full bg-alert/10 text-alert mx-auto flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.06H4.5a2.25 2.25 0 00-2.25 2.25v1.507a8.967 8.967 0 002.433 5.914l.446.447a3 3 0 012.032 2.032l.447.446A8.967 8.967 0 006 18.939V20.25a2.25 2.25 0 002.25 2.25h1.5a8.967 8.967 0 005.974-2.433l.447-.446a3 3 0 012.032-2.032l.446-.447A8.967 8.967 0 0018 20.25V18.939a2.25 2.25 0 00-2.25-2.25h-1.5a8.967 8.967 0 00-5.974 2.433l-.447.446a3 3 0 01-2.032 2.032l-.446.447A8.967 8.967 0 0012 20.25V6.042z" />
                </svg>
              </div>
              <h3 className="font-headline text-xl text-primary mb-2">
                Take Control of Your Health
              </h3>
              <p className="text-warm-gray">
                Arm yourself with data to have informed conversations with your doctor and make confident decisions.
              </p>
            </div>
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

export default WeightManagementEducation;
