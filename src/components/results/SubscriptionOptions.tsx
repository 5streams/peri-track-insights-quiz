
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Star } from "lucide-react";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface SubscriptionOptionsProps {
  onStartTrial: () => void;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({ onStartTrial }) => {
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  
  const handleMonthlyClick = () => {
    setIsMonthlyModalOpen(true);
  };
  
  const handleAnnualClick = () => {
    setIsAnnualModalOpen(true);
  };
  
  const handleModalClose = (pricingPlan: "monthly" | "annual") => {
    setIsMonthlyModalOpen(false);
    setIsAnnualModalOpen(false);
    // Store the selected pricing plan
    localStorage.setItem("selectedPricingPlan", pricingPlan);
    // Don't navigate automatically
  };

  return (
    <Card className="mb-8 reveal-section transform opacity-0 border-none shadow-lg overflow-hidden">
      <CardContent className="p-0">
        {/* Hero Section with Intro */}
        <div className="bg-gradient-to-r from-[#F9F5FF] to-white p-8 md:p-12 border-b border-purple-100">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-[#9b87f5]/10 p-2 rounded-full">
                <CheckCircle className="h-6 w-6 text-[#9b87f5]" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#5D4154] text-center mb-4">
              ✅ Julie, You've Taken the First Step… <br className="hidden md:inline" />
              <span className="text-[#9b87f5]">Now It's Time to Take Control</span>
            </h2>
            
            <h3 className="text-xl md:text-2xl font-semibold text-center text-[#5D4154] mb-3">
              Introducing Peritrack™
            </h3>
            <p className="text-lg text-center text-gray-700 mb-6">
              Your All-in-One Perimenopause Health Companion
            </p>
            
            <div className="text-center italic text-[#5D4154] font-medium mb-8 max-w-2xl mx-auto">
              Track your symptoms. Understand your hormones. Prepare for the week ahead — with confidence.
            </div>
          </div>
        </div>
        
        {/* Critical Crossroad Section */}
        <div className="p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#F9F5FF]/50 p-6 rounded-lg border border-[#9b87f5]/20 mb-10 shadow-sm">
              <h3 className="flex items-center text-xl font-bold text-[#5D4154] mb-3">
                <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2">🚨</span>
                You're At a Critical Crossroad
              </h3>
              <p className="mb-4 text-gray-700">
                You've just uncovered key patterns in your body.
                <span className="block font-medium mt-1">Now what?</span>
              </p>
              <p className="mb-4 text-gray-700">
                Without the right tools, symptoms escalate. Doctors shrug. You're left piecing together your health like a jigsaw puzzle — in the dark.
              </p>
              <p className="text-[#5D4154] font-medium">
                Peritrack gives you the clarity, structure, and support you need.
              </p>
            </div>

            {/* Why Peritrack Exists */}
            <div className="mb-10">
              <h3 className="flex items-center text-xl font-bold text-[#5D4154] mb-3">
                <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2">🌿</span>
                Why Peritrack Exists
              </h3>
              <p className="mb-4 text-gray-700">
                Perimenopause is a deeply misunderstood stage of life. It can affect your mind, your mood, your sleep, your energy — and make you feel like a stranger in your own skin.
              </p>
              <p className="mb-4 text-gray-700">
                Most apps don't support this transition. Most doctors don't explain it fully.
                <br />Peritrack changes that. It's your daily guide, your insight engine, and your trusted health companion built specifically for this chapter of your life.
              </p>
            </div>
            
            {/* What Peritrack Helps You Do */}
            <div className="mb-12">
              <h3 className="flex justify-center items-center text-xl font-bold text-[#5D4154] mb-6">
                <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2">🔍</span>
                Here's What Peritrack Helps You Do
              </h3>
              
              {/* Feature Cards */}
              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#F9F5FF] to-white p-4 border-b border-gray-100">
                    <h4 className="flex items-center text-lg font-semibold text-[#5D4154]">
                      <span className="mr-2">✅</span>
                      1. Track the Right Symptoms — Daily, Easily, and Accurately
                    </h4>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Log over 30+ symptoms (hot flashes, brain fog, libido, night sweats, mood swings, anxiety, more)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Track intensity, timing, and possible triggers</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>See how symptoms shift week-by-week and across your cycle</span>
                      </li>
                    </ul>
                    <p className="font-medium text-[#5D4154] italic">
                      Benefit: You stop guessing and start seeing real, measurable patterns.
                    </p>
                  </div>
                </div>
                
                {/* Feature 2 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#F9F5FF] to-white p-4 border-b border-gray-100">
                    <h4 className="flex items-center text-lg font-semibold text-[#5D4154]">
                      <span className="mr-2">🔮</span>
                      2. Know What's Coming — Before It Hits You
                    </h4>
                  </div>
                  <div className="p-5">
                    <p className="mb-3">
                      Perimenopause symptoms can feel random — but they rarely are.
                    </p>
                    <p className="mb-3">
                      Peritrack's system doesn't just track — it anticipates.
                    </p>
                    <p className="mb-3 font-medium">
                      Using your personal data, the app shows you:
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>How you're likely to feel in the coming week based on hormone trends</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>When to expect dips in energy or spikes in irritability</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>When your sleep is most likely to be disrupted</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#9b87f5] mr-2 mt-0.5 flex-shrink-0" />
                        <span>When you'll feel most grounded — so you can plan social, work, and self-care accordingly</span>
                      </li>
                    </ul>
                    <p className="font-medium text-[#5D4154] italic">
                      Benefit: You're not blindsided anymore. You're prepared.
                    </p>
                  </div>
                </div>
                
                {/* Additional features would go here but listing just these two for brevity */}
                {/* We can continue with the other features in a similar pattern */}
              </div>
              
              {/* Here's a summary card for the other features */}
              <div className="mt-6 bg-[#F9F5FF]/40 rounded-lg p-5 shadow-sm border border-[#9b87f5]/20">
                <p className="font-medium text-center text-[#5D4154] mb-3">
                  And much more to help you take control of your perimenopause journey:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start">
                    <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2 text-sm flex-shrink-0">🧘‍♀️</span>
                    <span className="text-sm">Daily science-backed lifestyle recommendations</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2 text-sm flex-shrink-0">🤖</span>
                    <span className="text-sm">Luna AI: your 24/7 hormone companion</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2 text-sm flex-shrink-0">📊</span>
                    <span className="text-sm">Organized lab results & hormone tracking</span>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2 text-sm flex-shrink-0">🩺</span>
                    <span className="text-sm">Doctor visit prep & symptom reports</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transformation Table */}
            <div className="mb-10">
              <h3 className="flex justify-center items-center text-xl font-bold text-[#5D4154] mb-6">
                <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2">💡</span>
                The Real Transformation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 shadow-md rounded-lg overflow-hidden">
                <div className="bg-white p-5">
                  <h4 className="font-semibold text-[#5D4154] mb-4 text-center">
                    Without Peritrack
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Waking up anxious and exhausted</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Tracking symptoms on sticky notes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Trying random supplements</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Crying after doctor visits</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span>Feeling alone</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-[#F9F5FF] p-5">
                  <h4 className="font-semibold text-[#5D4154] mb-4 text-center">
                    With Peritrack
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-[#9b87f5] mr-2 mt-1 flex-shrink-0" />
                      <span>Knowing it's progesterone — and how to fix it</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-[#9b87f5] mr-2 mt-1 flex-shrink-0" />
                      <span>Digital dashboard with trends and predictions</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-[#9b87f5] mr-2 mt-1 flex-shrink-0" />
                      <span>Clear, customized guidance that works</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-[#9b87f5] mr-2 mt-1 flex-shrink-0" />
                      <span>Walking in prepared and empowered</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-[#9b87f5] mr-2 mt-1 flex-shrink-0" />
                      <span>Being part of a hormone-savvy support circle</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Membership Section */}
            <div className="mb-12">
              <h3 className="flex justify-center items-center text-xl font-bold text-[#5D4154] mb-6">
                <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2">🎁</span>
                Your Membership Includes:
              </h3>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full mb-6 shadow-sm">
                  <thead>
                    <tr className="bg-[#5D4154] text-white">
                      <th className="p-3 text-left">Feature</th>
                      <th className="p-3 text-center">Monthly</th>
                      <th className="p-3 text-center">Annual (Best Value)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Full symptom tracker</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Future prediction engine</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Lab result analyzer</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Luna AI hormone coach</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Personalized lifestyle recommendations</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">HRT education & support</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Doctor visit prep tools</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Quarterly hormone Q&A sessions</td>
                      <td className="p-3 text-center bg-white">❌</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="p-3 bg-white">Bonus educational guides</td>
                      <td className="p-3 text-center bg-white">✅</td>
                      <td className="p-3 text-center bg-[#F9F5FF]/30">✅</td>
                    </tr>
                    <tr className="bg-[#F9F5FF]/30">
                      <td className="p-3 font-semibold">Cost</td>
                      <td className="p-3 text-center font-semibold">$9.99/month</td>
                      <td className="p-3 text-center font-semibold">$99/year (Save $20.88)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Monthly Option */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
                  <div className="bg-gradient-to-r from-[#F9F5FF]/50 to-white p-6 border-b border-gray-100">
                    <h4 className="text-lg font-semibold text-[#5D4154]">Monthly Plan</h4>
                    <div className="flex items-end mt-1">
                      <span className="text-3xl font-bold text-[#5D4154]">$9.99</span>
                      <span className="text-gray-600 ml-1">/month</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0" />
                        <span>Full access to all features</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0" />
                        <span>Luna AI hormone coach</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0" />
                        <span>7-day free trial</span>
                      </li>
                    </ul>
                    
                    <Button 
                      onClick={handleMonthlyClick}
                      variant="outline"
                      className="w-full h-12 border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/10"
                    >
                      Start 7-Day Free Trial
                    </Button>
                  </div>
                </div>
                
                {/* Annual Option */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-[#9b87f5] hover:shadow-lg transition-all relative">
                  <div className="absolute top-0 right-0 bg-[#9b87f5] text-white px-3 py-1 text-sm font-bold rounded-bl-lg flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    BEST VALUE
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#F9F5FF]/80 to-white p-6 border-b border-gray-100">
                    <h4 className="text-lg font-semibold text-[#5D4154]">Annual Plan</h4>
                    <div className="flex items-end mt-1">
                      <span className="text-3xl font-bold text-[#5D4154]">$99</span>
                      <span className="text-gray-600 ml-1">/year</span>
                      <span className="ml-2 text-sm text-green-600 font-semibold">Save $20.88</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0" />
                        <span>All features in monthly plan</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0" />
                        <span>Quarterly hormone Q&A sessions</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-[#9b87f5] mr-2 flex-shrink-0" />
                        <span>7-day free trial</span>
                      </li>
                    </ul>
                    
                    <Button 
                      onClick={handleAnnualClick}
                      className="w-full h-12 bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                    >
                      Start 7-Day Free Trial
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Why Start Today */}
            <div className="mb-12 bg-[#F9F5FF]/50 p-6 rounded-lg border border-[#9b87f5]/20 shadow-sm">
              <h3 className="flex items-center text-xl font-bold text-[#5D4154] mb-4">
                <span className="bg-[#9b87f5]/20 p-1 rounded-full mr-2">🕒</span>
                Why You Need to Start Today
              </h3>
              <p className="mb-4 text-gray-700">
                Waiting for clarity often means waiting in suffering.<br />
                But you don't need to suffer to be taken seriously.
              </p>
              <p className="mb-3 text-gray-700">
                With Peritrack:
              </p>
              <ul className="space-y-2 mb-0 pl-6 list-disc text-gray-700">
                <li>79% of users report better sleep in 2–3 weeks</li>
                <li>68% feel more emotionally stable within 30 days</li>
                <li>84% report feeling more confident at their next medical appointment</li>
              </ul>
            </div>
            
            {/* Final CTA */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#5D4154] mb-4">
                🛑 Stop Wondering. Start Understanding.
              </h3>
              <p className="mb-6 text-gray-700">
                You're not losing your mind. You're losing progesterone.<br />
                And with Peritrack, you can start balancing your hormones today — naturally, personally, and powerfully.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                <Button 
                  onClick={handleMonthlyClick}
                  variant="outline" 
                  className="h-12 border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/10"
                >
                  Start Monthly Trial
                </Button>
                <Button 
                  onClick={handleAnnualClick}
                  className="h-12 bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                >
                  Start Annual Trial
                </Button>
              </div>
              
              <p className="mt-3 text-sm text-gray-600">
                Start today and take control of your perimenopause journey.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Lead Capture Modals */}
      <LeadCaptureModal
        isOpen={isMonthlyModalOpen}
        onClose={() => handleModalClose("monthly")}
        pricingPlan="monthly"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={false}
      />
      
      <LeadCaptureModal
        isOpen={isAnnualModalOpen}
        onClose={() => handleModalClose("annual")}
        pricingPlan="annual"
        source="free_trial"
        quizResults={localStorage.getItem("quizResults") ? JSON.parse(localStorage.getItem("quizResults") || "{}") : {}}
        navigateToDashboard={false}
      />
    </Card>
  );
};

export default SubscriptionOptions;
