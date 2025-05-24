
import React from "react";
import { getDynamicContent } from "@/utils/scoreCalculation";

interface PersonalizedAssessmentProps {
  scoreCategory: string;
  firstName: string;
  primarySymptoms: string[];
}

const PersonalizedAssessment: React.FC<PersonalizedAssessmentProps> = ({ 
  scoreCategory, 
  firstName, 
  primarySymptoms 
}) => {
  const capitalizedFirstName = firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "";
  const content = getDynamicContent(scoreCategory, capitalizedFirstName);

  return (
    <section className="reveal-section transform opacity-0 py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#f8f5ff] to-white rounded-xl shadow-lg border-2 border-white p-8 md:p-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary mb-8 leading-tight">
            {capitalizedFirstName ? `${capitalizedFirstName}, ` : ""}your assessment suggests you may be experiencing perimenopause.
          </h2>
          
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl text-warm-gray leading-relaxed">
              {content.greeting}
            </p>
            
            <div className="bg-white/60 rounded-lg p-6 border border-purple-100">
              <p className="text-xl md:text-2xl text-[#7E69AB] font-medium leading-relaxed">
                {content.validation}
              </p>
            </div>
            
            <div className="bg-white/60 rounded-lg p-6 border border-purple-100">
              <p className="text-xl md:text-2xl text-[#6E59A5] leading-relaxed">
                {content.ctaText}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
                Your Primary Symptom Concerns:
              </h3>
              <div className="space-y-4">
                {primarySymptoms.map((symptom, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1 flex-shrink-0 text-lg">
                      {index + 1}
                    </div>
                    <span className="text-2xl md:text-3xl text-warm-gray font-medium leading-relaxed">
                      {symptom}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedAssessment;
