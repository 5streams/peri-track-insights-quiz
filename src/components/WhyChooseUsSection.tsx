
import React from 'react';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: '🧠',
      title: 'Science-Backed Perimenopause Symptom Analysis',
      description: 'Our AI analyzes 50+ perimenopause symptom patterns using medical research to provide accurate insights for your unique experience.',
      highlight: 'Evidence-based'
    },
    {
      icon: '🎯',
      title: 'Personalized Perimenopause Symptom Relief',
      description: 'Every recommendation is tailored to your specific perimenopause symptoms, lifestyle, and hormonal patterns for maximum effectiveness.',
      highlight: 'Custom solutions'
    },
    {
      icon: '⚡',
      title: 'Instant Perimenopause Symptom Management',
      description: 'Get immediate, actionable tips when perimenopause symptoms strike - from hot flashes to mood changes - not generic advice.',
      highlight: 'Real-time help'
    },
    {
      icon: '🤝',
      title: 'Expert-Designed Perimenopause Care',
      description: 'Created with reproductive health specialists and validated by thousands of women experiencing perimenopause symptoms.',
      highlight: 'Medical expertise'
    }
  ];

  return (
    <section className="why-choose-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Why 15,000+ Women Choose PeriTrack for Perimenopause Symptoms
          </h2>
          <p className="text-body-large text-warm-gray max-w-2xl mx-auto fade-in-up">
            We're not just another period app. We're your comprehensive perimenopause symptom management system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 stagger-children">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card bg-accent p-6 rounded-2xl fade-in-up">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{reason.icon}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-headline text-xl text-primary mr-3">{reason.title}</h3>
                    <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                      {reason.highlight}
                    </span>
                  </div>
                  <p className="text-warm-gray leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
