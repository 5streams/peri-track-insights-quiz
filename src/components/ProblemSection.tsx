
import React from 'react';

const ProblemSection = () => {
  const problems = [
    {
      emoji: '🔥',
      title: 'Hot flashes that come out of nowhere',
      description: 'Embarrassing moments during meetings, social events, or important conversations'
    },
    {
      emoji: '😴',
      title: 'Sleepless nights leaving you exhausted',
      description: 'Waking up at 3 AM, unable to get back to sleep, affecting your entire next day'
    },
    {
      emoji: '😢',
      title: 'PMS symptoms that seem worse than ever',
      description: 'Mood swings, bloating, and irritability that disrupt your relationships'
    },
    {
      emoji: '🧠',
      title: 'Brain fog when you need to think clearly',
      description: 'Forgetting words, losing focus during important tasks, feeling "not sharp"'
    },
    {
      emoji: '😤',
      title: 'Mood swings affecting your relationships',
      description: 'Snapping at loved ones, feeling emotional without reason, straining connections'
    },
    {
      emoji: '💪',
      title: 'Energy crashes ruining your plans',
      description: 'Feeling exhausted when you want to be active, missing out on life'
    }
  ];

  const triedList = [
    'Generic supplements that don\'t help',
    'One-size-fits-all advice from websites',
    'Random tips from friends that don\'t work for you',
    'Hoping symptoms will just disappear'
  ];

  return (
    <section className="problem-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Tired of Symptoms Controlling Your Life?
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            Every day feels like a guessing game:
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
            You've probably tried everything:
          </h3>
          
          <ul className="tried-list space-y-2 mb-6">
            {triedList.map((item, index) => (
              <li key={index} className="flex items-center justify-center text-warm-gray">
                <span className="mr-3 text-lg">❌</span>
                {item}
              </li>
            ))}
          </ul>
          
          <div className="problem-insight bg-accent p-6 rounded-xl">
            <p className="text-primary text-body-large font-medium leading-relaxed">
              <strong>The problem isn't the symptoms themselves - it's not knowing what triggers them or how to stop them.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
