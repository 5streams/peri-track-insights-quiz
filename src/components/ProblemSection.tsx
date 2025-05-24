
import React from 'react';

const ProblemSection = () => {
  const problems = [
    {
      emoji: '🔥',
      title: 'Hot flashes - the most common perimenopause symptom',
      description: 'Embarrassing moments during meetings, social events, or important conversations that disrupt your daily life'
    },
    {
      emoji: '😴',
      title: 'Sleep disruption - a debilitating perimenopause symptom',
      description: 'Waking up at 3 AM unable to get back to sleep, this perimenopause symptom affects your entire next day'
    },
    {
      emoji: '😢',
      title: 'Mood changes - an overwhelming perimenopause symptom',
      description: 'Mood swings, irritability, and emotional changes that strain relationships and affect your well-being'
    },
    {
      emoji: '🧠',
      title: 'Brain fog - a frustrating perimenopause symptom',
      description: 'Forgetting words, losing focus during important tasks, feeling "not sharp" when you need clarity most'
    },
    {
      emoji: '😤',
      title: 'Increased PMS - a worsening perimenopause symptom',
      description: 'Bloating, breast tenderness, and emotional sensitivity that seems worse than ever before'
    },
    {
      emoji: '💪',
      title: 'Energy crashes - an exhausting perimenopause symptom',
      description: 'Feeling drained when you want to be active, missing out on life due to fatigue'
    }
  ];

  const triedList = [
    'Generic supplements that don\'t address your specific perimenopause symptoms',
    'One-size-fits-all advice that ignores your unique perimenopause symptom pattern',
    'Random tips from friends whose perimenopause symptoms are different from yours',
    'Hoping your perimenopause symptoms will just disappear on their own'
  ];

  return (
    <section className="problem-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Tired of Perimenopause Symptoms Controlling Your Life?
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            Every day with perimenopause symptoms feels like a guessing game:
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
            You've probably tried everything for your perimenopause symptoms:
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
              <strong>The problem isn't the perimenopause symptoms themselves - it's not knowing what triggers them or how to manage them effectively.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
