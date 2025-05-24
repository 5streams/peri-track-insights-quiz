
import React from 'react';

const WeightPainAmplification = () => {
  return (
    <section className="py-12 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 fade-in-up">
            Why Traditional Weight Management Fails During Perimenopause
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow fade-in-up">
              <h3 className="font-bold text-red-600 mb-4">What You've Probably Tried:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>❌ Calorie counting that worked before perimenopause</li>
                <li>❌ Exercise routines that used to help you lose weight</li>
                <li>❌ Generic diet plans that don't account for hormonal changes</li>
                <li>❌ Restricting foods without understanding YOUR triggers</li>
                <li>❌ Following advice that works for "most women"</li>
                <li>❌ Trying supplement after supplement with no clear plan</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow fade-in-up">
              <h3 className="font-bold text-green-600 mb-4">Why Pattern Tracking Works:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Identifies YOUR specific weight gain triggers</li>
                <li>✓ Times strategies with YOUR hormonal cycles</li>
                <li>✓ Reveals what actually works for YOUR body</li>
                <li>✓ Creates sustainable, personalized approaches</li>
                <li>✓ Shows you when to make changes for maximum impact</li>
                <li>✓ Eliminates guesswork with data-driven insights</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 bg-white/50 rounded-lg p-4 max-w-2xl mx-auto fade-in-up">
              <strong>The truth:</strong> Generic advice fails because every woman's hormone patterns are different. 
              What triggers weight gain for one woman might not affect you at all. 
              The key is discovering YOUR unique patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightPainAmplification;
