
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
    <section className="final-cta-section py-3 bg-primary text-white">
      <div className="container mx-auto px-3 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline font-bold text-h2 mb-1.5 fade-in-up">
            Take Control of Your Perimenopause Journey
          </h2>
          
          <p className="text-body-large mb-1.5 leading-relaxed fade-in-up opacity-90">
            You don't have to navigate perimenopause alone. Join thousands of women who are tracking and understanding their symptoms through our comprehensive platform.
          </p>
          
          <div className="bg-white/10 p-2.5 rounded-lg mb-2.5 fade-in-up">
            <h3 className="font-headline text-lg mb-1">Comprehensive Tracking System</h3>
            <p className="text-sm mb-1.5">Everything you need to track, understand, and navigate your perimenopause experience</p>
            <div className="grid md:grid-cols-3 gap-1.5 text-sm">
              <div>
                <div className="text-secondary font-bold mb-0.5">Day 1-2</div>
                <div>Start tracking symptoms, meet Luna</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-0.5">Day 3-5</div>
                <div>Discover pattern insights and educational tips</div>
              </div>
              <div>
                <div className="text-secondary font-bold mb-0.5">Day 6-7</div>
                <div>Track patterns and explore lifestyle suggestions</div>
              </div>
            </div>
          </div>
          
          <CTAButton 
            size="medium" 
            variant="secondary" 
            className="mb-1 text-base px-6 py-2"
            onClick={handleOpenSignupModal}
          >
            START TRACKING TODAY
          </CTAButton>
          
          <p className="text-sm opacity-75 mb-1.5">
            7-day trial then only $12.95/month • Join thousands of women on their perimenopause journey
          </p>
          
          <div className="flex flex-wrap justify-center gap-1.5 text-sm opacity-75 fade-in-up">
            <div className="flex items-center">
              <span className="mr-1">🔒</span>
              Privacy Protected
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
              User Recommended
            </div>
          </div>
          
          <div className="mt-2 text-xs opacity-60">
            <p>*Individual experiences may vary. This app is for educational and tracking purposes. Always consult with healthcare professionals for medical advice.</p>
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
