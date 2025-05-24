
import React from 'react';

const BeforeAfterMindset = () => {
  return (
    <section className="py-12 bg-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 fade-in-up">
            Your Weight Management Journey: Before vs. After Tracking
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-100 p-6 rounded-lg fade-in-up">
              <h3 className="font-bold text-red-800 mb-4 text-center">😰 BEFORE Pattern Understanding</h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Trying random diets and hoping something works</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Frustrated by weight gain despite "doing everything right"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Feeling like your body is working against you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Confused by conflicting advice from different sources</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Gaining weight and not understanding why</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Blaming yourself for "lack of willpower"</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-100 p-6 rounded-lg fade-in-up">
              <h3 className="font-bold text-green-800 mb-4 text-center">🌟 AFTER Pattern Understanding</h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Know exactly what foods work for YOUR body</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Understand when to time exercise for best results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Manage stress patterns that affect your weight</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Work WITH your hormonal cycles, not against them</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Feel confident and in control of your weight</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Make decisions based on YOUR data, not guesswork</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 bg-white rounded-xl p-6 shadow-lg fade-in-up">
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 mb-4">The Transformation Is Real</h3>
              <p className="text-gray-700 max-w-3xl mx-auto">
                "I went from feeling completely lost and frustrated with my weight to having a clear, 
                data-driven plan that actually works. The difference isn't just in my weight - 
                it's in my confidence and peace of mind." 
                <span className="text-purple-600 font-medium">— Jennifer, 45</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterMindset;
