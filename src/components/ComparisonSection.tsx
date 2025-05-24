
import React from 'react';
import { Check, X } from 'lucide-react';

const ComparisonSection = () => {
  const features = [
    {
      feature: 'AI-powered perimenopause symptom pattern recognition',
      peritrack: true,
      others: false
    },
    {
      feature: 'Personalized perimenopause symptom relief strategies',
      peritrack: true,
      others: false
    },
    {
      feature: '24/7 AI coach for perimenopause symptoms',
      peritrack: true,
      others: false
    },
    {
      feature: 'Perimenopause symptom prediction alerts',
      peritrack: true,
      others: false
    },
    {
      feature: 'Basic perimenopause symptom tracking',
      peritrack: true,
      others: true
    },
    {
      feature: 'Generic health tips (not perimenopause-specific)',
      peritrack: false,
      others: true
    }
  ];

  return (
    <section className="comparison-section py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Why PeriTrack vs. Other Perimenopause Symptom Apps?
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            See how we compare to generic period and perimenopause symptom tracking apps
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden fade-in-up">
            <div className="grid grid-cols-3 bg-primary text-white p-4">
              <div className="text-left">
                <h3 className="font-semibold">Perimenopause Symptom Features</h3>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">PeriTrack</h3>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Other Apps</h3>
              </div>
            </div>
            
            {features.map((item, index) => (
              <div key={index} className={`grid grid-cols-3 p-4 border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="text-warm-gray font-medium">
                  {item.feature}
                </div>
                <div className="text-center">
                  {item.peritrack ? (
                    <Check className="w-6 h-6 text-secondary mx-auto" />
                  ) : (
                    <X className="w-6 h-6 text-gray-300 mx-auto" />
                  )}
                </div>
                <div className="text-center">
                  {item.others ? (
                    <Check className="w-6 h-6 text-gray-400 mx-auto" />
                  ) : (
                    <X className="w-6 h-6 text-gray-300 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
