
import React from 'react';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: '🧬',
      title: 'Science-Informed Perimenopause Tracking',
      description: 'Our tracking system is designed around current understanding of how hormonal changes may affect metabolism, appetite, and body composition during perimenopause.',
      highlight: 'Evidence-based'
    },
    {
      icon: '⚖️',
      title: 'Personalized Pattern Recognition',
      description: 'Every insight is based on your specific tracking data, helping you understand your unique patterns rather than generic information.',
      highlight: 'Individual focus'
    },
    {
      icon: '📈',
      title: 'Real-Time Pattern Insights',
      description: 'See how your daily choices may connect to your weight patterns, helping you identify potential correlations to discuss with your doctor.',
      highlight: 'Immediate feedback'
    },
    {
      icon: '👩‍⚕️',
      title: 'Healthcare Discussion Support',
      description: 'Generate comprehensive reports from your tracking data to facilitate more informed conversations with your healthcare provider.',
      highlight: 'Doctor-friendly'
    }
  ];

  return (
    <section className="why-choose-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Why Thousands Choose PeriTrack for Pattern Tracking
          </h2>
          <p className="text-body-large text-warm-gray max-w-2xl mx-auto fade-in-up">
            We're not just another tracking app. We're your comprehensive perimenopause pattern monitoring system.
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

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-3xl mx-auto">
          <p className="text-sm text-gray-600 text-center">
            <strong>Educational Tool:</strong> Individual results and experiences may vary. This tracking system is designed for educational purposes and to support healthcare discussions. Always consult your healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
