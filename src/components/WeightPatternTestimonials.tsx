
import React from 'react';

const WeightPatternTestimonials = () => {
  const testimonials = [
    {
      quote: "Tracking helped me understand my weight patterns and have better conversations with my doctor about management strategies. The data showed connections I never would have noticed on my own.",
      name: "Sarah M.",
      age: 47,
      context: "Tracked patterns for 3 months"
    },
    {
      quote: "I finally understood which foods seemed to correlate with my weight changes during perimenopause. This information was invaluable when discussing nutrition strategies with my healthcare provider.",
      name: "Jennifer L.",
      age: 44,
      context: "Used food and weight correlation tracking"
    },
    {
      quote: "The insights helped my doctor and I develop a personalized approach to managing my perimenopause weight concerns. Having actual data made such a difference in our discussions.",
      name: "Michelle R.", 
      age: 49,
      context: "Generated healthcare reports"
    }
  ];

  return (
    <section className="weight-testimonials-section py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
              Supporting Weight Management Discussions Through Pattern Tracking
            </h2>
            <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
              See how women are using pattern tracking to have more informed conversations with their healthcare providers about perimenopause weight management.
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
                  <p className="text-sm text-warm-gray">
                    {testimonial.context}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 fade-in-up">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              <strong>Testimonial Disclaimer:</strong> These testimonials reflect individual experiences with pattern tracking and healthcare discussions. 
              Results vary between individuals. Tracking tools are for educational purposes and to support healthcare conversations, not to diagnose or treat conditions. 
              Always consult your healthcare provider for personalized medical advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightPatternTestimonials;
