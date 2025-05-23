
import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: '15,000+',
      label: 'Women tracking symptoms',
      icon: '👩‍⚕️'
    },
    {
      number: '89%',
      label: 'Report symptom improvement',
      icon: '📈'
    },
    {
      number: '2.3M',
      label: 'Symptoms tracked monthly',
      icon: '📊'
    },
    {
      number: '4.9/5',
      label: 'Average app rating',
      icon: '⭐'
    }
  ];

  return (
    <section className="stats-section py-12 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-headline font-bold text-2xl lg:text-3xl mb-3 fade-in-up">
            Trusted by Thousands of Women Worldwide
          </h2>
          <p className="text-lg opacity-90 fade-in-up">
            Join the community that's transforming perimenopause management
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
      </div>
    </section>
  );
};

export default StatsSection;
