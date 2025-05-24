
import React from 'react';

const WeightPatternTestimonials = () => {
  const testimonials = [
    {
      quote: "After tracking for 6 weeks, I discovered that my weight stayed stable when I ate protein within 2 hours of waking and avoided sugar during week 3 of my cycle. I've maintained my goal weight for 4 months now - the longest I've gone without weight gain since perimenopause started.",
      name: "Sarah M.",
      age: 47,
      context: "Maintained goal weight for 4 months through pattern tracking"
    },
    {
      quote: "The tracking showed me that stress eating was my biggest trigger, especially during certain hormone phases. By addressing the stress patterns first, weight management became so much easier. I feel in control of my body again.",
      name: "Jennifer L.",
      age: 44,
      context: "Overcame stress eating patterns for easier weight management"
    },
    {
      quote: "I thought I needed to exercise more, but tracking revealed that overexercising during low-energy phases was actually causing weight gain. Now I match my activity to my energy patterns and my weight has stabilized beautifully.",
      name: "Michelle R.", 
      age: 49,
      context: "Achieved weight stability by optimizing exercise timing"
    }
  ];

  return (
    <section className="weight-testimonials-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
              Real Women, Real Weight Management Success Through Pattern Discovery
            </h2>
            <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
              See how women are using PeriTrack's pattern analysis to identify what actually drives their weight changes and develop strategies that work with their bodies, not against them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-accent to-white p-6 rounded-2xl shadow-lg fade-in-up">
                <div className="mb-4">
                  <div className="text-primary text-3xl mb-2">"</div>
                  <p className="text-warm-gray italic leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-medium text-primary">
                    — {testimonial.name}, {testimonial.age}
                  </p>
                  <p className="text-sm text-secondary font-medium">
                    {testimonial.context}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    *Individual results vary. Always consult your healthcare provider.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 fade-in-up">
            <h4 className="font-semibold text-primary mb-3 text-center">Why Pattern-Based Weight Management Works</h4>
            <p className="text-warm-gray text-center leading-relaxed mb-4">
              These results come from understanding personal patterns rather than following generic advice. 
              PeriTrack helps you discover what specifically affects YOUR weight during perimenopause, leading to sustainable management strategies that work with your unique hormonal patterns.
            </p>
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Important:</strong> Individual results vary and depend on consistent tracking, lifestyle factors, and personal health conditions. 
              These testimonials reflect individual experiences with pattern-based approaches. Always consult your healthcare provider for personalized weight management guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightPatternTestimonials;
