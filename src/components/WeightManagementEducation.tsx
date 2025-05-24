
import React from 'react';

const WeightManagementEducation = () => {
  return (
    <section className="weight-education-section py-12 lg:py-16 bg-gradient-to-br from-[#f8f5ff] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
              Understanding Perimenopause Weight Management
            </h2>
            <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
              Research indicates that 60-90% of women experience weight changes during perimenopause. 
              Our tracking system helps you understand patterns and support informed healthcare discussions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg fade-in-up">
              <h3 className="font-headline text-xl text-primary mb-4">What Research Shows</h3>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Hormonal changes during perimenopause may affect metabolism and fat distribution</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Sleep disruption and stress may influence weight patterns during this transition</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Individual responses to dietary and lifestyle factors can vary significantly</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Tracking patterns may help inform evidence-based management approaches</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg fade-in-up">
              <h3 className="font-headline text-xl text-primary mb-4">How PeriTrack Helps</h3>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Monitor factors that research suggests may influence perimenopause weight patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Identify potential correlations between lifestyle choices and weight changes</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Create comprehensive data to support weight management discussions with your healthcare provider</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Understand patterns that may inform evidence-based approaches to perimenopause weight management</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 fade-in-up">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              <strong>Educational Purpose:</strong> Individual experiences vary. This information is for educational purposes and pattern tracking only. 
              Always consult your healthcare provider for personalized weight management guidance. Results are not guaranteed and may differ between individuals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightManagementEducation;
