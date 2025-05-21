
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmotionalSupportProps {
  scoreCategory: string;
  primarySymptoms: string[];
}

const EmotionalSupport: React.FC<EmotionalSupportProps> = ({ scoreCategory, primarySymptoms }) => {
  const hasSleepIssues = primarySymptoms.some(symptom => symptom.includes("Sleep"));
  const hasMoodIssues = primarySymptoms.some(symptom => symptom.includes("Mood"));
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] mb-6">
          PERIMENOPAUSE CONSIDERATIONS
        </h2>
        
        <div className="mb-6">
          <h3 className="font-medium text-[#5D4154] mb-3">
            <span className="text-lg">Many women report challenges in finding support.</span> According to surveys:
          </h3>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="h-7 w-7 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7 9 19l-5.5-5.5"/></svg>
              </div>
              <p className="text-gray-700">Many women feel their perimenopause symptoms aren't always fully addressed</p>
            </li>
            
            <li className="flex items-start">
              <div className="h-7 w-7 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7 9 19l-5.5-5.5"/></svg>
              </div>
              <p className="text-gray-700">Comprehensive hormone testing isn't always offered initially</p>
            </li>
            
            <li className="flex items-start">
              <div className="h-7 w-7 rounded-full bg-[#9b87f5]/20 text-[#9b87f5] flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7 9 19l-5.5-5.5"/></svg>
              </div>
              <p className="text-gray-700">Many women explore multiple approaches before finding what works for them</p>
            </li>
          </ul>
        </div>
        
        {/* Testimonials */}
        <div className="mb-6">
          <h3 className="font-medium text-[#5D4154] mb-3">From women's health forums:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <blockquote className="bg-[#F9F5FF]/30 p-4 rounded-lg italic text-gray-700 border border-[#9b87f5]/20">
              "I spent years wondering about my symptoms before learning about perimenopause. I wish I'd had more information sooner."
            </blockquote>
            
            <blockquote className="bg-[#F9F5FF]/30 p-4 rounded-lg italic text-gray-700 border border-[#9b87f5]/20">
              "Finding a healthcare provider who specialized in perimenopause made a significant difference in my understanding of my symptoms."
            </blockquote>
          </div>
        </div>
        
        {/* Personalized Support Section */}
        {(scoreCategory === "severe" || hasMoodIssues || hasSleepIssues) && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#5D4154] mb-4">YOU ARE NOT ALONE</h3>
            
            <p className="mb-4 text-gray-700">
              What you're experiencing {hasMoodIssues ? "emotionally " : ""}
              isn't unusual or "just in your head." In our community:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-xl font-bold text-[#9b87f5]">78%</div>
                <p className="text-sm text-gray-600">of women report feeling "not like themselves" during perimenopause</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-xl font-bold text-[#9b87f5]">82%</div>
                <p className="text-sm text-gray-600">describe periods of unexplainable sadness or irritability</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-xl font-bold text-[#9b87f5]">74%</div>
                <p className="text-sm text-gray-600">report feeling anxious without a clear cause</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-xl font-bold text-[#9b87f5]">68%</div>
                <p className="text-sm text-gray-600">describe feeling isolated or misunderstood</p>
              </div>
            </div>
            
            <p className="text-gray-700">
              These {hasMoodIssues ? "emotional " : ""}changes aren't a character flaw or mental health condition—they're 
              direct biological responses to changing hormone levels affecting your brain chemistry.
            </p>
          </div>
        )}
        
        {/* Sleep Focus Section */}
        {hasSleepIssues && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#5D4154] mb-4">SLEEP DISRUPTION FOCUS</h3>
            
            <p className="mb-4 text-gray-700">
              Your sleep difficulties appear to be a significant concern. This pattern of waking during 
              the night is strongly connected to changing progesterone levels.
            </p>
            
            <div className="bg-[#F9F5FF]/20 p-4 rounded-lg border border-[#9b87f5]/10 mb-4">
              <p className="text-gray-700">
                Progesterone helps your brain produce GABA—a calming neurotransmitter that promotes deep sleep. 
                As levels decline, your sleep architecture changes, making it harder to stay asleep, 
                especially between 2-4 AM when your body's natural cortisol begins rising.
              </p>
            </div>
            
            <p className="font-medium text-[#5D4154]">
              This isn't "just insomnia"—it's a specific hormone-related sleep disruption that 
              requires targeted approaches.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionalSupport;
