
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🔥',
      title: 'Hot Flash Relief',
      description: 'Track frequency, intensity, and triggers. Get cooling techniques and prevention strategies.',
      benefits: ['Predict timing within 2-hour windows', 'Personalized cooling techniques', 'Trigger identification']
    },
    {
      icon: '😴',
      title: 'Sleep Optimization',
      description: 'Monitor sleep quality and get personalized recommendations for better rest.',
      benefits: ['Sleep pattern analysis', 'Bedtime routine suggestions', 'Environment optimization tips']
    },
    {
      icon: '🧠',
      title: 'Mood & Mental Clarity',
      description: 'Track emotional patterns and get strategies for better mental well-being.',
      benefits: ['Mood pattern insights', 'Stress management techniques', 'Focus improvement tips']
    },
    {
      icon: '💪',
      title: 'Energy Management',
      description: 'Understand your energy cycles and optimize your daily schedule.',
      benefits: ['Energy level predictions', 'Activity scheduling help', 'Fatigue prevention strategies']
    },
    {
      icon: '🩸',
      title: 'Period Tracking Plus',
      description: 'Advanced menstrual tracking with perimenopause-specific insights.',
      benefits: ['Irregular cycle analysis', 'Flow prediction', 'Hormone fluctuation insights']
    }
  ];

  return (
    <section className="features-section py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline font-bold text-h2 text-primary mb-6 fade-in-up">
            Complete Symptom Relief System
          </h2>
          <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
            Everything you need to understand, predict, and manage your perimenopause symptoms in one intelligent app.
          </p>
        </div>

        <div className="space-y-12 stagger-children">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`feature-row flex flex-col lg:flex-row items-center gap-12 fade-in-up ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="feature-content flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-headline text-2xl text-primary">{feature.title}</h3>
                </div>
                
                <p className="text-body-regular text-warm-gray mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-warm-gray">
                      <span className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="feature-visual flex-1 max-w-md">
                <div className="bg-feature-gradient p-8 rounded-2xl shadow-lg">
                  <div className="bg-white p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg">{feature.icon}</span>
                      <span className="text-xs bg-secondary text-white px-2 py-1 rounded">
                        {feature.title}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${Math.random() * 60 + 40}%` }}
                        ></div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.random() * 60 + 40}%` }}
                        ></div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-alert rounded-full"
                          style={{ width: `${Math.random() * 60 + 40}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
