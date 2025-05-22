
import React from 'react';

const SocialProofSection = () => {
  const testimonials = [
    {
      name: "Sarah M.",
      age: 47,
      text: "I finally understand my hot flashes! Luna predicted exactly when they'd happen and gave me techniques that actually work. I haven't had a surprise hot flash in weeks.",
      result: "Reduced hot flashes by 80%",
      timeframe: "in 3 weeks"
    },
    {
      name: "Jennifer L.",
      age: 52,
      text: "The sleep tracking changed everything. I discovered that my evening routine was actually making my insomnia worse. Now I sleep through the night most nights.",
      result: "7+ hours sleep nightly",
      timeframe: "after 2 weeks"
    },
    {
      name: "Maria C.",
      age: 45,
      text: "Luna is like having a perimenopause expert in my pocket. She remembers everything and gives advice that's specific to my patterns. Game changer!",
      result: "Better mood & energy",
      timeframe: "in 10 days"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Women using Peritrack" },
    { number: "78%", label: "Report symptom improvement" },
    { number: "4.9/5", label: "App store rating" },
    { number: "24hrs", label: "Average time to first insight" }
  ];

  return (
    <section className="social-proof-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Real Women, Real Results
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            Join thousands of women who've transformed their perimenopause experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger-children">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card text-center fade-in-up">
              <div className="bg-accent p-4 rounded-2xl">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-warm-gray font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 stagger-children">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-gray-50 p-6 rounded-2xl shadow-lg fade-in-up">
              <div className="mb-4">
                <div className="flex text-secondary text-xl mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-warm-gray leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-warm-gray">Age {testimonial.age}</div>
                  </div>
                </div>
                
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <div className="text-sm font-medium text-primary">
                    {testimonial.result}
                  </div>
                  <div className="text-xs text-warm-gray">
                    {testimonial.timeframe}
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

export default SocialProofSection;
