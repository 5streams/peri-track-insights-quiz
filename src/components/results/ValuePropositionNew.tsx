
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, CheckCircle } from "lucide-react";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface ValuePropositionNewProps {
  firstName: string;
  onStartTrial: () => void;
}

const ValuePropositionNew: React.FC<ValuePropositionNewProps> = ({ firstName, onStartTrial }) => {
  const navigate = useNavigate();
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const [isAnnualModalOpen, setIsAnnualModalOpen] = useState(false);
  
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
    onStartTrial();
  };

  return (
    <Card className="mb-8 reveal-section transform opacity-0 border-none shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-3">
            ✅ {firstName}, You've Taken the First Step… Now It's Time to Take Control
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-[#5D4154] mb-2">
            Introducing Peritrack™
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            Your All-in-One Perimenopause Health Companion
          </p>
          <p className="text-gray-600 italic">
            Track your symptoms. Understand your hormones. Prepare for the week ahead — with confidence.
          </p>
        </div>

        {/* Critical Crossroad Section */}
        <div className="mb-10 bg-[#F9F5FF]/50 p-6 rounded-lg border border-[#9b87f5]/20">
          <h3 className="text-xl font-bold text-[#5D4154] mb-3">
            🚨 You're At a Critical Crossroad
          </h3>
          <p className="mb-3 text-gray-700">
            You've just uncovered key patterns in your body.
            <br />Now what?
          </p>
          <p className="mb-3 text-gray-700">
            Without the right tools, symptoms escalate. Doctors shrug. You're left piecing together your health like a jigsaw puzzle — in the dark.
          </p>
          <p className="text-gray-700 font-medium">
            Peritrack gives you the clarity, structure, and support you need.
          </p>
        </div>

        {/* Why Peritrack Exists */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#5D4154] mb-3">
            🌿 Why Peritrack Exists
          </h3>
          <p className="mb-3 text-gray-700">
            Perimenopause is a deeply misunderstood stage of life. It can affect your mind, your mood, your sleep, your energy — and make you feel like a stranger in your own skin.
          </p>
          <p className="mb-3 text-gray-700">
            Most apps don't support this transition. Most doctors don't explain it fully.
            <br />Peritrack changes that. It's your daily guide, your insight engine, and your trusted health companion built specifically for this chapter of your life.
          </p>
        </div>
        
        {/* What Peritrack Helps You Do */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#5D4154] mb-5 text-center">
            🔍 Here's What Peritrack Helps You Do
          </h3>
          
          {/* Feature 1 */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              ✅ 1. Track the Right Symptoms — Daily, Easily, and Accurately
            </h4>
            <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
              <li>Log over 30+ symptoms (hot flashes, brain fog, libido, night sweats, mood swings, anxiety, more)</li>
              <li>Track intensity, timing, and possible triggers</li>
              <li>See how symptoms shift week-by-week and across your cycle</li>
            </ul>
            <p className="font-medium text-[#5D4154] italic">
              Benefit: You stop guessing and start seeing real, measurable patterns.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              🔮 2. Know What's Coming — Before It Hits You
            </h4>
            <p className="mb-3 text-gray-700">
              Perimenopause symptoms can feel random — but they rarely are.
            </p>
            <p className="mb-3 text-gray-700">
              Peritrack's system doesn't just track — it anticipates.
            </p>
            <p className="mb-3 text-gray-700">
              Using your personal data, the app shows you:
            </p>
            <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
              <li>How you're likely to feel in the coming week based on hormone trends</li>
              <li>When to expect dips in energy or spikes in irritability</li>
              <li>When your sleep is most likely to be disrupted</li>
              <li>When you'll feel most grounded — so you can plan social, work, and self-care accordingly</li>
            </ul>
            <p className="font-medium text-[#5D4154] italic">
              Benefit: You're not blindsided anymore. You're prepared.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              🧘‍♀️ 3. Get Daily Lifestyle Recommendations — Backed by Real Hormone Science
            </h4>
            <p className="mb-3 text-gray-700">
              Stop scrolling forums. Start getting guidance that's personal, evidence-based, and action-ready.
            </p>
            <p className="mb-3 text-gray-700">
              Every week, Peritrack recommends:
            </p>
            <ul className="space-y-2 mb-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">🥗</span>
                <span>Foods that help balance your hormones (e.g., phytoestrogens, magnesium-rich foods)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏃‍♀️</span>
                <span>Exercise types based on your hormone profile (e.g., strength vs. low-impact)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💊</span>
                <span>Supplement guidance with references and educational insights</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🧘</span>
                <span>Meditation and stress tools to help regulate cortisol</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💉</span>
                <span>Hormone Replacement Therapy (HRT) guidance based on your pattern — so you know what to ask if you're considering it</span>
              </li>
            </ul>
            <p className="font-medium text-[#5D4154] italic">
              Benefit: You stop relying on trial-and-error and start feeling better with a clear plan.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              🤖 4. Access Luna — Your 24/7 AI Hormone Companion
            </h4>
            <p className="mb-3 text-gray-700">
              Luna is your private support system for when you're overwhelmed, curious, or just need fast answers.
            </p>
            <p className="mb-3 text-gray-700">
              With Luna, you can:
            </p>
            <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
              <li>Ask anything about your symptoms — and get medically informed guidance</li>
              <li>Learn what labs mean and what questions to ask your doctor</li>
              <li>Get personalized, day-by-day health coaching</li>
              <li>Feel heard, understood, and never judged</li>
            </ul>
          </div>
          
          {/* Feature 5 */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              📊 5. Organize Your Hormones and Lab Results — Once and For All
            </h4>
            <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
              <li>Upload your test results (bloodwork, saliva, DUTCH, etc.)</li>
              <li>Automatically categorize by hormone and date</li>
              <li>Get explanations in simple language</li>
              <li>Track changes over time — with charts and notes</li>
            </ul>
            <p className="font-medium text-[#5D4154] italic">
              Benefit: No more wondering what "low estrogen" means — you'll know exactly what's happening and what it affects.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              🩺 6. Walk Into Every Doctor Visit Prepared
            </h4>
            <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
              <li>Print-friendly reports for doctors</li>
              <li>Full symptom + hormone summary</li>
              <li>Suggested questions to ask</li>
              <li>Insights you won't get from a 7-minute appointment</li>
            </ul>
            <p className="font-medium text-[#5D4154] italic">
              Benefit: You become the most informed patient in the room — and finally feel respected, seen, and supported.
            </p>
          </div>
          
          {/* Feature 7 */}
          <div className="mb-8 pb-6">
            <h4 className="text-lg font-semibold text-[#5D4154] mb-3">
              🤝 7. You're Not Just Using an App — You're Getting Real Support
            </h4>
            <p className="mb-3 text-gray-700">
              This is more than a tracker. It's a system for getting your life back.
            </p>
            <p className="mb-3 text-gray-700">
              Inside Peritrack, you'll also get:
            </p>
            <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
              <li>Educational guides (HRT, bioidenticals, supplements, nutrition, cycle syncing)</li>
              <li>Exclusive bonus sessions on hormonal balance and symptom relief</li>
              <li>Optional access to advanced hormone testing partnerships</li>
              <li>A community of women like you who are done being dismissed</li>
            </ul>
          </div>
        </div>
        
        {/* Transformation Table */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-[#5D4154] mb-5 text-center">
            💡 The Real Transformation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold text-[#5D4154] mb-3 text-center">Without Peritrack</h4>
              <ul className="space-y-3 text-gray-700">
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
            
            <div className="bg-[#F9F5FF]/50 p-4 rounded-lg border border-[#9b87f5]/20">
              <h4 className="font-semibold text-[#5D4154] mb-3 text-center">With Peritrack</h4>
              <ul className="space-y-3 text-gray-700">
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
          <h3 className="text-xl font-bold text-[#5D4154] mb-5 text-center">
            🎁 Your Membership Includes:
          </h3>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full mb-4">
              <thead>
                <tr className="bg-[#5D4154] text-white">
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-center">Monthly</th>
                  <th className="p-3 text-center">Annual (Best Value)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Full symptom tracker</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3">Future prediction engine</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Lab result analyzer</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3">Luna AI hormone coach</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Personalized lifestyle recommendations</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3">HRT education & support</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Doctor visit prep tools</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3">Quarterly hormone Q&A sessions</td>
                  <td className="p-3 text-center">❌</td>
                  <td className="p-3 text-center">✅</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Bonus educational guides</td>
                  <td className="p-3 text-center">✅</td>
                  <td className="p-3 text-center">✅</td>
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
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all">
              <h4 className="font-semibold text-[#5D4154] text-lg mb-2">Monthly Plan</h4>
              <div className="text-2xl font-bold text-[#5D4154] mb-3">$9.99<span className="text-sm font-normal text-gray-500">/month</span></div>
              
              <ul className="mb-5 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Full access to all features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Luna AI hormone coach</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">7-day free trial</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleMonthlyTrial}
                variant="outline"
                className="w-full border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/10"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
            
            {/* Annual Option */}
            <div className="bg-white rounded-lg shadow-md p-5 border-2 border-[#9b87f5] hover:shadow-lg transition-all relative">
              <div className="absolute top-0 right-0 bg-[#9b87f5] text-white text-xs px-2 py-1 rounded-bl-lg font-medium">
                BEST VALUE
              </div>
              
              <h4 className="font-semibold text-[#5D4154] text-lg mb-2">Annual Plan</h4>
              <div className="text-2xl font-bold text-[#5D4154] mb-3">
                $99<span className="text-sm font-normal text-gray-500">/year</span>
                <span className="text-sm text-green-600 font-semibold ml-2">Save $20.88</span>
              </div>
              
              <ul className="mb-5 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">All features in monthly plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">Quarterly hormone Q&A sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#9b87f5] flex-shrink-0" />
                  <span className="text-sm">7-day free trial</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleAnnualTrial}
                className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
              >
                Start 7-Day Free Trial
              </Button>
            </div>
          </div>
        </div>
        
        {/* Why Start Today */}
        <div className="mb-12 bg-[#F9F5FF]/50 p-6 rounded-lg border border-[#9b87f5]/20">
          <h3 className="text-xl font-bold text-[#5D4154] mb-3">
            🕒 Why You Need to Start Today
          </h3>
          <p className="mb-3 text-gray-700">
            Waiting for clarity often means waiting in suffering.<br />
            But you don't need to suffer to be taken seriously.
          </p>
          <p className="mb-3 text-gray-700">
            With Peritrack:
          </p>
          <ul className="space-y-2 mb-3 ml-6 list-disc text-gray-700">
            <li>79% of users report better sleep in 2–3 weeks</li>
            <li>68% feel more emotionally stable within 30 days</li>
            <li>84% report feeling more confident at their next medical appointment</li>
          </ul>
        </div>
        
        {/* Final CTA */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-[#5D4154] mb-3">
            🛑 Stop Wondering. Start Understanding.
          </h3>
          <p className="mb-5 text-gray-700">
            You're not losing your mind. You're losing progesterone.<br />
            And with Peritrack, you can start balancing your hormones today — naturally, personally, and powerfully.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Button 
              onClick={handleMonthlyTrial}
              variant="outline" 
              className="border-[#9b87f5] text-[#5D4154] hover:bg-[#9b87f5]/10"
            >
              Start Monthly Trial
            </Button>
            <Button 
              onClick={handleAnnualTrial}
              className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
            >
              Start Annual Trial
            </Button>
          </div>
          
          <p className="mt-3 text-sm text-gray-600">
            Start today and take control of your perimenopause journey.
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

export default ValuePropositionNew;
