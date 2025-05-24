
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
      title: 'Track Your Weight + Factors',
      description: 'Log your weight, hormones, sleep, stress, food, and exercise daily to see how everything connects to weight changes.',
      time: '2 minutes daily',
      image: '/images/Per1.jpg',
      alt: 'Woman using the Peritrack app to log weight and hormone data'
    },
    {
      number: '02',
      title: 'Discover Your Weight Gain Patterns',
      description: 'Our AI analyzes your data to identify exactly what triggers YOUR weight gain and when you lose weight most easily.',
      time: 'Insights in 7-14 days',
      image: '/images/peri2.jpg',
      alt: 'Data visualization showing weight gain patterns and triggers'
    },
    {
      number: '03',
      title: 'Get Your Personal Weight Loss Plan',
      description: 'Receive customized strategies that work with your hormones, metabolism, and lifestyle for sustainable weight loss.',
      time: 'Ongoing optimization',
      image: '/images/per3.jpg',
      alt: 'Woman celebrating weight loss success with personalized plan'
    }
  ];

  return (
    <section className="how-it-works-section py-12 lg:py-16 bg-accent">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            How Peritrack Solves Perimenopause Weight Gain
          </h2>
          <p className="text-body-large text-warm-gray max-w-2xl mx-auto fade-in-up">
            Simple, science-backed approach to understanding and reversing perimenopause weight gain.
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
                  <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {step.time}
                  </span>
                  
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.alt}
                      className="w-full h-auto"
                    />
                  </div>
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
            START MY WEIGHT LOSS JOURNEY
          </CTAButton>
          <p className="text-sm text-warm-gray">
            See your first weight loss insights within 2 weeks
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
