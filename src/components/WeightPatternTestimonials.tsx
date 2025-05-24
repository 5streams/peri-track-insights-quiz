
import React from 'react';

const WeightPatternTestimonials = () => {
  const testimonials = [
    {
      quote: "After 3 months of tracking, I identified that poor sleep was directly impacting my weight patterns. I focused on sleep hygiene and saw a 12-pound change over 4 months. The data helped me understand what my body needed.",
      name: "Sarah M.",
      age: 47,
      context: "Lost 12 lbs by tracking sleep-weight patterns"
    },
    {
      quote: "PeriTrack showed me that certain foods triggered weight gain during specific cycle phases. By adjusting my eating patterns based on the data, I've maintained a stable weight for 6 months - something I couldn't achieve before.",
      name: "Jennifer L.",
      age: 44,
      context: "Achieved weight stability through food pattern tracking"
    },
    {
      quote: "The weekly insights helped me understand that stress was sabotaging my weight management. By tracking and addressing stress patterns, I've been able to manage my weight more effectively than ever during perimenopause.",
      name: "Michelle R.", 
      age: 49,
      context: "Managed weight by identifying stress triggers"
    }
  ];

  return (
    <section className="weight-testimonials-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
              Real Women, Real Weight Management Success Through Pattern Tracking
            </h2>
            <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
              See how women are using PeriTrack's pattern analysis to identify what works for their bodies and achieve sustainable weight management during perimenopause.
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
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6 fade-in-up">
            <h4 className="font-semibold text-primary mb-3 text-center">Why Pattern-Based Weight Management Works</h4>
            <p className="text-warm-gray text-center leading-relaxed mb-4">
              These results come from understanding personal patterns rather than following generic advice. 
              PeriTrack helps you discover what specifically affects YOUR weight during perimenopause, leading to more sustainable management strategies.
            </p>
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Testimonial Disclaimer:</strong> Individual results vary and depend on consistent tracking, lifestyle factors, and personal health conditions. 
              These testimonials reflect individual experiences with pattern-based approaches. Always consult your healthcare provider for personalized weight management guidance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightPatternTestimonials;
