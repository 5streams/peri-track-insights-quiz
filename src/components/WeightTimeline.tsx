
import React from 'react';

const WeightTimeline = () => {
  return (
    <section className="py-12 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 fade-in-up">
            What Happens When You Understand YOUR Weight Patterns
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow text-center fade-in-up">
              <div className="text-3xl font-bold text-green-600 mb-2">Week 2-3</div>
              <h3 className="font-bold mb-2">Pattern Discovery</h3>
              <p className="text-gray-700">Identify which foods, sleep patterns, and stress triggers correlate with your weight changes</p>
              <div className="mt-4 text-sm text-green-700 bg-green-100 rounded p-2">
                "I finally saw the connection between my late-night snacking and weight gain patterns!"
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center fade-in-up">
              <div className="text-3xl font-bold text-green-600 mb-2">Week 4-6</div>
              <h3 className="font-bold mb-2">Strategic Adjustments</h3>
              <p className="text-gray-700">Make targeted changes based on YOUR data instead of generic advice</p>
              <div className="mt-4 text-sm text-green-700 bg-green-100 rounded p-2">
                "Timing my meals with my cycle made all the difference - no more guessing!"
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center fade-in-up">
              <div className="text-3xl font-bold text-green-600 mb-2">Month 2+</div>
              <h3 className="font-bold mb-2">Sustainable Results</h3>
              <p className="text-gray-700">Achieve lasting weight management by working WITH your hormonal patterns</p>
              <div className="mt-4 text-sm text-green-700 bg-green-100 rounded p-2">
                "For the first time in years, I feel in control of my weight again."
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-center fade-in-up">
            <h3 className="text-xl font-bold mb-2">Real Results from Real Women</h3>
            <p className="text-lg">
              73% of women see their first pattern insights within 2 weeks of consistent tracking
            </p>
            <p className="text-sm mt-2 opacity-90">
              *Based on user surveys of 847 women who tracked consistently for 30+ days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightTimeline;
