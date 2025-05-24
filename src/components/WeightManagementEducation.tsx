
import React from 'react';

const WeightManagementEducation = () => {
  return (
    <section className="weight-education-section py-12 lg:py-16 bg-gradient-to-br from-[#f8f5ff] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
              How PeriTrack Helps You Manage Perimenopause Weight Changes
            </h2>
            <p className="text-body-large text-warm-gray max-w-3xl mx-auto fade-in-up">
              Research shows 60-90% of women experience weight changes during perimenopause. 
              PeriTrack's pattern-tracking system helps you identify what factors influence your weight and develop personalized management strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg fade-in-up">
              <h3 className="font-headline text-xl text-primary mb-4">Pattern Discovery for Weight Management</h3>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Sleep-Weight Correlations:</strong> Track how sleep quality affects your weight patterns and metabolism</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Food Pattern Analysis:</strong> Identify which foods correlate with weight stability during hormonal fluctuations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Stress Impact Tracking:</strong> Monitor how stress levels influence your weight management efforts</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Cycle Phase Insights:</strong> Understand weight fluctuations based on hormonal cycle changes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg fade-in-up">
              <h3 className="font-headline text-xl text-primary mb-4">Weekly Progress & Personalized Strategies</h3>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Weekly Pattern Reports:</strong> See which strategies worked best for your weight management goals</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Customized Recommendations:</strong> Get personalized suggestions based on your unique patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Progress Tracking:</strong> Monitor which lifestyle changes support your weight management during perimenopause</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Healthcare Support:</strong> Generate comprehensive reports to discuss evidence-based weight management with your provider</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 rounded-xl p-6 fade-in-up">
            <h4 className="font-semibold text-primary mb-3 text-center">The PeriTrack Weight Management Advantage</h4>
            <p className="text-warm-gray text-center leading-relaxed mb-4">
              Unlike generic weight loss apps, PeriTrack understands that perimenopause weight changes are driven by hormonal fluctuations. 
              Our system helps you identify your personal patterns and develop strategies that work with your changing body, not against it.
            </p>
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              <strong>Individual Results Vary:</strong> This system helps you understand patterns and correlations. 
              Always consult your healthcare provider for personalized weight management guidance. Results depend on individual factors and consistent tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightManagementEducation;
