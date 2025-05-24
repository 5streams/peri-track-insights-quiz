
import React, { useState, useEffect } from 'react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "PeriTrack predicted my perimenopause hot flash symptoms 2 hours before they hit. I was able to prepare and they were so much more manageable!",
      author: "Sarah M.",
      age: "Age 47",
      location: "California",
      benefit: "Perimenopause symptom prediction"
    },
    {
      text: "Finally, an app that understands perimenopause symptoms aren't just about periods. The mood tracking and insights have been life-changing for managing my perimenopause symptoms.",
      author: "Jennifer K.",
      age: "Age 51",
      location: "Texas",
      benefit: "Comprehensive perimenopause tracking"
    },
    {
      text: "Luna's daily tips are so spot-on for my specific perimenopause symptoms. It's like having a personal coach who knows exactly what I'm going through.",
      author: "Maria L.",
      age: "Age 49",
      location: "New York",
      benefit: "AI perimenopause coaching"
    },
    {
      text: "I've tried 5 different apps for perimenopause symptoms. PeriTrack is the only one that actually helped me feel better, not just track symptoms.",
      author: "Amanda R.",
      age: "Age 45",
      location: "Florida",
      benefit: "Real perimenopause relief"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonial-carousel py-12 lg:py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-headline font-bold text-2xl lg:text-3xl mb-3 fade-in-up">
            Real Perimenopause Symptom Stories, Real Relief
          </h2>
          <p className="text-lg opacity-90 fade-in-up">
            See how PeriTrack is changing perimenopause symptom experiences every day
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
                    <div className="text-6xl mb-4 opacity-50">"</div>
                    <p className="text-lg lg:text-xl mb-6 leading-relaxed">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <div>
                        <div className="font-semibold text-lg">{testimonial.author}</div>
                        <div className="text-sm opacity-75">{testimonial.age} • {testimonial.location}</div>
                      </div>
                      <div className="bg-secondary px-3 py-1 rounded-full text-xs">
                        {testimonial.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
