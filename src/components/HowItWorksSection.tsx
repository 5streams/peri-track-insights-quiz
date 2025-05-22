import React, { useState } from 'react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const HowItWorksSection = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };
  
  const steps = [
    {
      number: '01',
      title: 'Track Your Symptoms',
      description: 'Log your symptoms in seconds with our intuitive interface. Track hot flashes, sleep, mood, energy, and more.',
      time: '2 minutes daily'
    },
    {
      number: '02',
      title: 'Discover Your Patterns',
      description: 'Our AI analyzes your data to identify triggers, predict symptoms, and understand your unique cycles.',
      time: 'Insights in 24 hours'
    },
    {
      number: '03',
      title: 'Get Personalized Relief',
      description: 'Receive customized strategies, tips, and support from Luna, your AI perimenopause coach.',
      time: 'Ongoing support'
    }
  ];

  return (
    <section className="how-it-works-section py-12 lg:py-16 bg-accent">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            How Peritrack Works
          </h2>
          <p className="text-body-large text-warm-gray max-w-2xl mx-auto fade-in-up">
            Simple, science-backed approach to understanding and managing your perimenopause symptoms.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10 stagger-children">
          {steps.map((step, index) => (
            <div key={index} className="step-card relative fade-in-up">
              <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
                <div className="step-number absolute -top-3 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                
                <div className="pt-6">
                  <h3 className="font-headline text-xl text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-warm-gray mb-3 leading-relaxed">
                    {step.description}
                  </p>
                  <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {step.time}
                  </span>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-secondary"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-secondary border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center fade-in-up">
          <CTAButton 
            size="large" 
            variant="primary" 
            className="mb-3"
            onClick={handleOpenSignupModal}
          >
            START TRACKING TODAY
          </CTAButton>
          <p className="text-sm text-warm-gray">
            See your first insights within 24 hours
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

export default HowItWorksSection;
