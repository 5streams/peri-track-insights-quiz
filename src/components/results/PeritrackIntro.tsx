import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface PeritrackIntroProps {
  onStartTrial: () => void;
  firstName?: string;
}

const PeritrackIntro: React.FC<PeritrackIntroProps> = ({ onStartTrial, firstName = "" }) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('23:59:38');
  const navigate = useNavigate();

  useEffect(() => {
    // Set up countdown timer
    const interval = setInterval(() => {
      const [hours, minutes, seconds] = timeRemaining.split(':').map(Number);
      let newSeconds = seconds - 1;
      let newMinutes = minutes;
      let newHours = hours;
      
      if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
      }
      
      if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
      }
      
      if (newHours < 0) {
        newHours = 23;
      }
      
      setTimeRemaining(`${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleMonthlyTrial = () => {
    setIsMonthlyModalOpen(true);
  };
  
  const handleAnnualTrial = () => {
    setIsAnnualModalOpen(true);
  };
  
  const handleModalClose = (pricingPlan: "monthly" | "annual") => {
    setIsMonthlyModalOpen(false);
    setIsAnnualModalOpen(false);
    // Store the selected pricing plan
    localStorage.setItem("selectedPricingPlan", pricingPlan);
    // Continue with the onStartTrial callback
    onStartTrial();
  };

  const personalizedGreeting = firstName ? `${firstName}, ` : "";

  return (
    <Card className="mb-12 mt-8 reveal-section transform opacity-0 bg-slate-50 text-slate-800 overflow-hidden border border-slate-200 shadow-md">
      <CardContent className="p-6 md:p-8">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Peritrack Logo" className="h-36 w-auto mx-auto mb-3" />
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            <span className="text-slate-700">You've Taken the First Step...</span> <span className="text-indigo-600">Now It's Time to Take Control</span>
          </h2>
          
          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-slate-700">
            Introducing Peritrack™
          </h3>
          
          <p className="text-lg md:text-xl font-medium mb-6 text-slate-700">
            Your All-in-One Perimenopause Health Companion
          </p>
          
          <p className="text-lg mb-6 max-w-3xl mx-auto text-slate-600">
            Track your symptoms. Understand your hormones. Prepare for the week ahead — with confidence.
          </p>
        </div>
        
        <div className="bg-white/60 p-3 rounded-lg mb-8 inline-block mx-auto">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2 text-indigo-600" />
            <span className="text-sm">This offer expires in: </span>
            <span className="font-mono font-bold ml-2">{timeRemaining}</span>
          </div>
        </div>
        
        {/* Critical Crossroad Section */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-3 text-slate-700">
            🚨 You're At a Critical Crossroad
          </h3>
          <p className="mb-2">You've just uncovered key patterns in your body.</p>
          <p className="font-bold mb-2">Now what?</p>
          <p className="mb-3">
            Without the right tools, symptoms escalate. Doctors shrug. You're left piecing 
            together your health like a jigsaw puzzle — in the dark.
          </p>
          <p className="font-medium">
            Peritrack gives you the clarity, structure, and support you need.
          </p>
        </div>
        
        {/* Why Peritrack Exists */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-3 text-slate-700">
            🌿 Why Peritrack Exists
          </h3>
          <p className="mb-3">
            Perimenopause is a deeply misunderstood stage of life. It can affect your mind, your mood, 
            your sleep, your energy — and make you feel like a stranger in your own skin.
          </p>
          <p className="mb-3">
            Most apps don't support this transition. Most doctors don't explain it fully.
          </p>
          <p className="font-medium">
            Peritrack changes that. It's your daily guide, your insight engine, and your trusted 
            health companion built specifically for this chapter of your life.
          </p>
        </div>
        
        {/* What Peritrack Helps You Do */}
        <div className="mb-12">
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold text-slate-700">
              🔍 Here's What Peritrack Helps You Do
            </h3>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col">
              <div className="flex-grow">
                <h4 className="font-bold mb-3 text-slate-700">
                  1. Track Symptoms, Easily & Accurately
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                    <span>Log 30+ symptoms (hot flashes, brain fog, mood swings & more)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                    <span>See how symptoms shift week-by-week</span>
                  </li>
                </ul>
                <p className="italic text-slate-500 mt-2 text-sm mb-4">
                  Benefit: Stop guessing, see real patterns.
                </p>
              </div>
              <img src="/images/feature1.png" alt="Track Symptoms Feature Showcase" className="rounded-md w-full h-48 object-cover mt-auto" />
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col">
              <div className="flex-grow">
                <h4 className="font-bold mb-3 text-slate-700">
                  2. Know What's Coming Before It Hits
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                    <span>Predict hormone fluctuations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                    <span>Plan your week around your hormones</span>
                  </li>
                </ul>
                <p className="italic text-slate-500 mt-2 text-sm mb-4">
                  Benefit: Be prepared, not blindsided.
                </p>
              </div>
              <img src="/images/feature2.png" alt="Know What's Coming Feature Showcase" className="rounded-md w-full h-48 object-cover mt-auto" />
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col">
              <div className="flex-grow">
                <h4 className="font-bold mb-3 text-slate-700">
                  3. Get Lifestyle Recommendations
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">🥗</span>
                    <span>Foods that balance hormones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🏃‍♀️</span>
                    <span>Exercise types for your hormone profile</span>
                  </li>
                </ul>
                <p className="italic text-slate-500 mt-2 text-sm mb-4">
                  Benefit: A clear plan based on your needs.
                </p>
              </div>
              <img src="/images/feature3.png" alt="Lifestyle Recommendations Feature Showcase" className="rounded-md w-full h-48 object-cover mt-auto" />
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col">
              <div className="flex-grow">
                <h4 className="font-bold mb-3 text-slate-700">
                  4. Access Luna AI Hormone Coach
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                    <span>24/7 hormone guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                    <span>Personalized health coaching</span>
                  </li>
                </ul>
                <p className="italic text-slate-500 mt-2 text-sm mb-4">
                  Benefit: Support whenever you need it.
                </p>
              </div>
              <img src="/images/feature4.png" alt="Luna AI Coach Feature Showcase" className="rounded-md w-full h-48 object-cover mt-auto" />
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h4 className="font-bold mb-3 text-slate-700">
                5. Organize Lab Results
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                  <span>Upload & track test results</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                  <span>Get explanations in simple language</span>
                </li>
              </ul>
              <p className="italic text-slate-500 mt-2 text-sm">
                Benefit: Understand what's happening.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
              <h4 className="font-bold mb-3 text-slate-700">
                6. Be Prepared for Doctor Visits
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                  <span>Print-friendly symptom reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mt-1 mr-2 text-indigo-500" />
                  <span>Suggested questions to ask</span>
                </li>
              </ul>
              <p className="italic text-slate-500 mt-2 text-sm">
                Benefit: Become an informed patient.
              </p>
            </div>
          </div>
        </div>
        
        {/* Transformation Section */}
        <div className="mb-12 bg-slate-100/50 p-6 rounded-lg border border-slate-200">
          <h3 className="text-xl font-bold text-slate-700 mb-4 text-center">
            💡 The Real Transformation
          </h3>
          
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 text-left text-slate-700 font-semibold">Without Peritrack</th>
                  <th className="py-3 px-4 text-left text-slate-700 font-semibold">With Peritrack</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Waking up anxious and exhausted</td>
                  <td className="py-3 px-4 text-slate-700">Knowing it's progesterone — and how to fix it</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50/30">
                  <td className="py-3 px-4">Tracking symptoms on sticky notes</td>
                  <td className="py-3 px-4 text-slate-700">Digital dashboard with trends and predictions</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Trying random supplements</td>
                  <td className="py-3 px-4 text-slate-700">Clear, customized guidance that works</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50/30">
                  <td className="py-3 px-4">Crying after doctor visits</td>
                  <td className="py-3 px-4 text-slate-700">Walking in prepared and empowered</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Feeling alone</td>
                  <td className="py-3 px-4 text-slate-700">Being part of a hormone-savvy support circle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Membership Section */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-700 mb-5 text-center">
            🎁 Your Membership Options
          </h3>
          
          <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-sm border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-3 px-4 text-left text-slate-700 font-semibold">Feature</th>
                  <th className="py-3 px-4 text-center text-slate-700 font-semibold">Monthly</th>
                  <th className="py-3 px-4 text-center text-slate-700 font-semibold">Annual (Best Value)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Full symptom tracker</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50/30">
                  <td className="py-3 px-4">Future prediction engine</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Lab result analyzer</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50/30">
                  <td className="py-3 px-4">Luna AI hormone coach</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Personalized lifestyle recommendations</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50/30">
                  <td className="py-3 px-4">HRT education & support</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Doctor visit prep tools</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100 bg-slate-50/30">
                  <td className="py-3 px-4">Quarterly hormone Q&A sessions</td>
                  <td className="py-3 px-4 text-center">❌</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="py-3 px-4">Bonus educational guides</td>
                  <td className="py-3 px-4 text-center">✅</td>
                  <td className="py-3 px-4 text-center">✅</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 px-4 font-semibold">Cost</td>
                  <td className="py-3 px-4 text-center font-semibold">$9.99/month</td>
                  <td className="py-3 px-4 text-center font-semibold">$99/year (Save $20.88)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-center text-sm mb-4">Both plans include a 7-Day Free Trial.</p>
        </div>
        
        {/* Why Start Today Section */}
        <div className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-4 text-slate-700">
            🕒 Why You Need to Start Today
          </h3>
          <p className="mb-2">Waiting for clarity often means waiting in suffering.</p>
          <p className="mb-3">But you don't need to suffer to be taken seriously.</p>
          
          <p className="mb-3">With Peritrack:</p>
          <ul className="ml-6 mb-3 space-y-2 list-disc">
            <li>79% of users report better sleep in 2–3 weeks</li>
            <li>68% feel more emotionally stable within 30 days</li>
            <li>84% report feeling more confident at their next medical appointment</li>
          </ul>
        </div>
        
        {/* Trial Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
          {/* Monthly Option */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-all">
            <h3 className="font-semibold text-lg mb-2 text-slate-700">Monthly Plan</h3>
            <div className="text-2xl font-bold mb-3 text-slate-700">$9.99<span className="text-sm font-normal opacity-80">/month</span></div>
            
            <ul className="mb-5 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                <span className="text-sm">Full access to all features</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                <span className="text-sm">Unlimited symptom tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                <span className="text-sm">7-day free trial included</span>
              </li>
            </ul>
            
            <Button 
              onClick={handleMonthlyTrial}
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium transition-colors"
            >
              START MY FREE TRIAL
            </Button>
          </div>
          
          {/* Annual Option */}
          <div className="bg-white rounded-lg p-6 border-2 border-[#9b87f5] hover:shadow-md transition-all relative">
            <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-bl-lg font-bold">
              BEST VALUE
            </div>
            
            <h3 className="font-semibold text-lg mb-2 text-slate-700">Annual Plan</h3>
            <div className="text-2xl font-bold mb-3 text-slate-700">
              $99<span className="text-sm font-normal opacity-80">/year</span>
              <span className="text-sm text-[#9b87f5] font-semibold ml-2">Save $20.88</span>
            </div>
            
            <ul className="mb-5 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                <span className="text-sm">All features in monthly plan</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                <span className="text-sm">Save $20.88 compared to monthly</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                <span className="text-sm">7-day free trial included</span>
              </li>
            </ul>
            
            <Button 
              onClick={handleAnnualTrial}
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium"
            >
              START MY FREE TRIAL
            </Button>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">👉 Start Your Free 7-Day Trial Now</p>
          <p className="text-sm opacity-80">
            Just results, relief, and the roadmap you deserve.
          </p>
        </div>
      </CardContent>
      
      {/* Lead Capture Modals */}
      <LeadCaptureModal
        isOpen={isMonthlyModalOpen}
        onClose={() => handleModalClose("monthly")}
        pricingPlan="monthly"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={true}
      />
      
      <LeadCaptureModal
        isOpen={isAnnualModalOpen}
        onClose={() => handleModalClose("annual")}
        pricingPlan="annual"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={true}
      />
    </Card>
  );
};

export default PeritrackIntro;
