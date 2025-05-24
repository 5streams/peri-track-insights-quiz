
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
            What if you could track and understand your perimenopause weight patterns?
          </h2>
          <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
            Peritrack helps you monitor your weight changes alongside hormonal patterns, symptoms, and lifestyle factors to identify connections and create insights for healthcare discussions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">📊</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Track Weight + Hormones + Lifestyle</h3>
            <p className="text-warm-gray">
              Monitor your weight changes alongside hormone fluctuations, sleep, stress, food, and exercise to see potential connections.
            </p>
          </div>

          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">🎯</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Identify YOUR Personal Patterns</h3>
            <p className="text-warm-gray">
              Discover which factors may be connected to your weight changes - creating personalized insights rather than generic information.
            </p>
          </div>

          <div className="solution-card bg-white p-4 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 fade-in-up">
            <div className="w-12 h-12 bg-alert rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl text-white">📋</span>
            </div>
            <h3 className="font-headline text-xl text-primary mb-1">Share Insights with Your Doctor</h3>
            <p className="text-warm-gray">
              Create comprehensive reports from your tracking data to have more informed discussions with your healthcare provider.
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
            START TRACKING MY PATTERNS
          </CTAButton>
          <p className="text-sm text-warm-gray">
            7-day trial then only $12.95/month • Educational tracking for informed discussions
          </p>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
          <p className="text-xs text-gray-600 text-center">
            <strong>Important:</strong> Results may vary between individuals. This tool is for educational and tracking purposes only. Please consult your healthcare provider for personalized medical advice and before making any health-related changes.
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
