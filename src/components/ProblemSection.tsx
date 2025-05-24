
import React from 'react';

const ProblemSection = () => {
  const problems = [
    {
      emoji: '⚖️',
      title: 'Sudden weight gain around your midsection',
      description: 'Despite eating the same and exercising, you\'re gaining weight - especially stubborn belly fat that won\'t budge'
    },
    {
      emoji: '🍽️',
      title: 'Increased cravings and appetite changes',
      description: 'Craving sugar and carbs like never before, feeling hungrier, and struggling with portion control'
    },
    {
      emoji: '🔥',
      title: 'Slower metabolism during perimenopause',
      description: 'Your body burns calories differently now - what used to work for weight loss doesn\'t work anymore'
    },
    {
      emoji: '💪',
      title: 'Muscle loss and body composition changes',
      description: 'Losing muscle mass while gaining fat, especially around your waist, hips, and arms'
    },
    {
      emoji: '😴',
      title: 'Sleep disruption affecting weight',
      description: 'Poor sleep from perimenopause symptoms disrupting hunger hormones and making weight loss harder'
    },
    {
      emoji: '😤',
      title: 'Stress and emotional eating patterns',
      description: 'Mood swings and stress leading to comfort eating and making it impossible to stick to healthy habits'
    }
  ];

  const triedList = [
    'Generic diets that don\'t account for hormonal changes during perimenopause',
    'Extreme calorie restriction that actually slows your metabolism further',
    'Exercise routines that worked before perimenopause but don\'t work now',
    'Blaming yourself for "lack of willpower" when it\'s actually hormonal'
  ];

  return (
    <section className="problem-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Frustrated by Unexplained Perimenopause Weight Gain?
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            You're not imagining it - perimenopause weight gain is real and affects 90% of women:
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
            You've probably tried everything for perimenopause weight loss:
          </h3>
          
          <ul className="tried-list space-y-3 mb-6 text-left max-w-lg mx-auto">
            {triedList.map((item, index) => (
              <li key={index} className="flex items-start text-warm-gray text-sm sm:text-base">
                <span className="mr-3 text-lg text-alert flex-shrink-0 mt-0.5">❌</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="problem-insight bg-accent p-6 rounded-xl">
            <p className="text-primary text-body-large font-medium leading-relaxed">
              <strong>The problem isn't your willpower - it's not understanding how your changing hormones affect weight gain and what specific patterns trigger YOUR weight gain.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
