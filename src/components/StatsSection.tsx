
import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: '15,000+',
      label: 'Women tracking perimenopause weight patterns',
      icon: '⚖️'
    },
    {
      number: '2.3M',
      label: 'Weight and lifestyle data points tracked monthly',
      icon: '📊'
    },
    {
      number: '78%',
      label: 'Find tracking helpful for healthcare discussions',
      icon: '📈'
    },
    {
      number: '4.5/5',
      label: 'Average rating for pattern tracking experience',
      icon: '⭐'
    }
  ];

  return (
    <section className="stats-section py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-headline font-bold text-2xl lg:text-3xl mb-3 fade-in-up">
            Trusted by Thousands for Perimenopause Weight Pattern Tracking
          </h2>
          <p className="text-lg opacity-90 fade-in-up">
            Join the community that's learning about their perimenopause journey through tracking
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {stats.map((stat, index) => (
            <div key={index} className="text-center fade-in-up">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold mb-1">{stat.number}</div>
              <div className="text-sm lg:text-base opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs opacity-75 max-w-2xl mx-auto">
            *Individual experiences may vary. These statistics represent user feedback and engagement metrics, not health outcomes. Always consult your healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
