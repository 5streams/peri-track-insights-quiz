
import React from 'react';

const ProblemSection = () => {
  const problems = [
    {
      emoji: '⚖️',
      title: 'Weight changes around your midsection',
      description: 'Many women notice weight distribution changes during perimenopause, especially around the midsection area'
    },
    {
      emoji: '🍽️',
      title: 'Changes in appetite and cravings',
      description: 'Fluctuating hormones may influence appetite patterns and food cravings during this life stage'
    },
    {
      emoji: '🔥',
      title: 'Metabolic changes during perimenopause',
      description: 'Your body\'s metabolism may change during perimenopause - tracking can help identify these patterns'
    },
    {
      emoji: '💪',
      title: 'Body composition changes',
      description: 'Many women notice changes in muscle mass and body composition during the perimenopause transition'
    },
    {
      emoji: '😴',
      title: 'Sleep patterns affecting daily life',
      description: 'Poor sleep from perimenopause symptoms may influence various aspects of health and wellbeing'
    },
    {
      emoji: '😤',
      title: 'Stress and emotional patterns',
      description: 'Mood changes and stress during perimenopause may affect eating habits and lifestyle choices'
    }
  ];

  const challengesList = [
    'Difficulty understanding which changes are related to perimenopause',
    'Lack of clear patterns in symptoms and weight fluctuations',
    'Generic advice that doesn\'t account for individual experiences',
    'Feeling overwhelmed by all the changes happening at once'
  ];

  return (
    <section className="problem-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Understanding Perimenopause Weight Pattern Changes
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            Many women experience various changes during perimenopause that can be confusing:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 stagger-children">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="problem-card bg-feature-gradient p-6 rounded-2xl border-l-4 border-alert shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up"
            >
              <div className="text-4xl mb-4 block">{problem.emoji}</div>
              <h3 className="font-headline text-xl text-primary mb-3 leading-tight">
                {problem.title}
              </h3>
              <p className="text-warm-gray leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="problem-conclusion text-center max-w-2xl mx-auto fade-in-up">
          <h3 className="font-headline text-2xl text-primary mb-6">
            Common challenges women face during perimenopause:
          </h3>
          
          <ul className="tried-list space-y-3 mb-6 text-left max-w-lg mx-auto">
            {challengesList.map((item, index) => (
              <li key={index} className="flex items-start text-warm-gray text-sm sm:text-base">
                <span className="mr-3 text-lg text-alert flex-shrink-0 mt-0.5">•</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="problem-insight bg-accent p-6 rounded-xl">
            <p className="text-primary text-body-large font-medium leading-relaxed">
              <strong>Understanding your patterns through tracking can provide valuable insights to discuss with your healthcare provider.</strong>
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-3xl mx-auto">
          <p className="text-sm text-gray-600 text-center">
            <strong>Medical Disclaimer:</strong> The information provided is for educational purposes only and should not replace professional medical advice. Individual experiences vary. Always consult with your healthcare provider before making health-related decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
