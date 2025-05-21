
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

interface PeritrackIntroProps {
  onStartTrial: () => void;
}

const PeritrackIntro: React.FC<PeritrackIntroProps> = ({ onStartTrial }) => {
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

  return (
    <Card className="mb-8 reveal-section transform opacity-0 bg-[#5D4154] text-white overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
          You've Taken the First Step… Now It's Time to Take Control
        </h2>
        
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-center">
          Introducing Peritrack™
        </h3>
        
        <p className="text-lg md:text-xl font-medium mb-6 text-center">
          Your All-in-One Perimenopause Health Companion
        </p>
        
        <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
          Track your symptoms. Understand your hormones. Prepare for the week ahead — with confidence.
        </p>
        
        <div className="bg-white/10 p-3 rounded-lg mb-8 inline-block mx-auto">
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">This offer expires in: </span>
            <span className="font-mono font-bold ml-2">{timeRemaining}</span>
          </div>
        </div>
        
        {/* Critical Crossroad Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <span className="mr-2">🚨</span> You're At a Critical Crossroad
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
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <span className="mr-2">🌿</span> Why Peritrack Exists
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
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🔍</span> Here's What Peritrack Helps You Do
          </h3>
          
          {/* Feature 1 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>1. Track the Right Symptoms — Daily, Easily, and Accurately</span>
            </h4>
            <ul className="ml-6 mb-3 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Log over 30+ symptoms (hot flashes, brain fog, libido, night sweats, mood swings, anxiety, more)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Track intensity, timing, and possible triggers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>See how symptoms shift week-by-week and across your cycle</span>
              </li>
            </ul>
            <p className="italic ml-6">Benefit: You stop guessing and start seeing real, measurable patterns.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>2. Know What's Coming — Before It Hits You</span>
            </h4>
            <p className="ml-6 mb-2">Perimenopause symptoms can feel random — but they rarely are.</p>
            <p className="ml-6 mb-2">Peritrack's system doesn't just track — it anticipates.</p>
            <p className="ml-6 mb-2">Using your personal data, the app shows you:</p>
            <ul className="ml-6 mb-3 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>How you're likely to feel in the coming week based on hormone trends</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>When to expect dips in energy or spikes in irritability</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>When your sleep is most likely to be disrupted</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>When you'll feel most grounded — so you can plan social, work, and self-care accordingly</span>
              </li>
            </ul>
            <p className="italic ml-6">Benefit: You're not blindsided anymore. You're prepared.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>3. Get Daily Lifestyle Recommendations — Backed by Real Hormone Science</span>
            </h4>
            <p className="ml-6 mb-2">Stop scrolling forums. Start getting guidance that's personal, evidence-based, and action-ready.</p>
            <p className="ml-6 mb-2">Every week, Peritrack recommends:</p>
            <ul className="ml-6 mb-3 space-y-1">
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
            <p className="italic ml-6">Benefit: You stop relying on trial-and-error and start feeling better with a clear plan.</p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>4. Access Luna — Your 24/7 AI Hormone Companion</span>
            </h4>
            <p className="ml-6 mb-2">Luna is your private support system for when you're overwhelmed, curious, or just need fast answers.</p>
            <p className="ml-6 mb-2">With Luna, you can:</p>
            <ul className="ml-6 mb-3 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ask anything about your symptoms — and get medically informed guidance</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Learn what labs mean and what questions to ask your doctor</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Get personalized, day-by-day health coaching</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Feel heard, understood, and never judged</span>
              </li>
            </ul>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>5. Organize Your Hormones and Lab Results — Once and For All</span>
            </h4>
            <ul className="ml-6 mb-3 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Upload your test results (bloodwork, saliva, DUTCH, etc.)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Automatically categorize by hormone and date</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Get explanations in simple language</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Track changes over time — with charts and notes</span>
              </li>
            </ul>
            <p className="italic ml-6">Benefit: No more wondering what "low estrogen" means — you'll know exactly what's happening and what it affects.</p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>6. Walk Into Every Doctor Visit Prepared</span>
            </h4>
            <ul className="ml-6 mb-3 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Print-friendly reports for doctors</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Full symptom + hormone summary</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Suggested questions to ask</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Insights you won't get from a 7-minute appointment</span>
              </li>
            </ul>
            <p className="italic ml-6">Benefit: You become the most informed patient in the room — and finally feel respected, seen, and supported.</p>
          </div>
          
          {/* Feature 7 */}
          <div className="bg-white/10 p-4 rounded-lg mb-4">
            <h4 className="font-bold mb-2 flex items-start">
              <Check className="h-4 w-4 mt-1 mr-2 text-[#A7C4A0]" />
              <span>7. You're Not Just Using an App — You're Getting Real Support</span>
            </h4>
            <p className="ml-6 mb-2">This is more than a tracker. It's a system for getting your life back.</p>
            <p className="ml-6 mb-2">Inside Peritrack, you'll also get:</p>
            <ul className="ml-6 mb-3 space-y-1">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Educational guides (HRT, bioidenticals, supplements, nutrition, cycle syncing)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Exclusive bonus sessions on hormonal balance and symptom relief</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Optional access to advanced hormone testing partnerships</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>A community of women like you who are done being dismissed</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Transformation Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">💡</span> The Real Transformation
          </h3>
          
          <div className="bg-white/10 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-white/20">
                <tr>
                  <th className="py-2 px-4 text-left">Without Peritrack</th>
                  <th className="py-2 px-4 text-left">With Peritrack</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Waking up anxious and exhausted</td>
                  <td className="py-2 px-4">Knowing it's progesterone — and how to fix it</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Tracking symptoms on sticky notes</td>
                  <td className="py-2 px-4">Digital dashboard with trends and predictions</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Trying random supplements</td>
                  <td className="py-2 px-4">Clear, customized guidance that works</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Crying after doctor visits</td>
                  <td className="py-2 px-4">Walking in prepared and empowered</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Feeling alone</td>
                  <td className="py-2 px-4">Being part of a hormone-savvy support circle</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Membership Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🎁</span> Your Membership Includes:
          </h3>
          
          <div className="bg-white/10 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-white/20">
                <tr>
                  <th className="py-2 px-4 text-left">Feature</th>
                  <th className="py-2 px-4 text-center">Monthly</th>
                  <th className="py-2 px-4 text-center">Annual (Best Value)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Full symptom tracker</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Future prediction engine</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Lab result analyzer</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Luna AI hormone coach</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Personalized lifestyle recommendations</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">HRT education & support</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Doctor visit prep tools</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Quarterly hormone Q&A sessions</td>
                  <td className="py-2 px-4 text-center">❌</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Bonus educational guides</td>
                  <td className="py-2 px-4 text-center">✅</td>
                  <td className="py-2 px-4 text-center">✅</td>
                </tr>
                <tr className="border-t border-white/10">
                  <td className="py-2 px-4">Cost</td>
                  <td className="py-2 px-4 text-center">$9.99/month</td>
                  <td className="py-2 px-4 text-center">$99/year (Save $20.88)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-center text-sm mb-4">Both plans include a 7-Day Free Trial — no credit card required.</p>
        </div>
        
        {/* Why Start Today Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🕒</span> Why You Need to Start Today
          </h3>
          <p className="mb-2">Waiting for clarity often means waiting in suffering.</p>
          <p className="mb-3">But you don't need to suffer to be taken seriously.</p>
          
          <p className="mb-3">With Peritrack:</p>
          <ul className="ml-6 mb-3 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>79% of users report better sleep in 2–3 weeks</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>68% feel more emotionally stable within 30 days</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>84% report feeling more confident at their next medical appointment</span>
            </li>
          </ul>
        </div>
        
        {/* Final CTA Section */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-bold mb-3 flex items-center justify-center">
            <span className="mr-2">🛑</span> Stop Wondering. Start Understanding.
          </h3>
          <p className="mb-2">You're not losing your mind. You're losing progesterone.</p>
          <p className="mb-4">And with Peritrack, you can start balancing your hormones today — naturally, personally, and powerfully.</p>
          
          {/* Trial Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto mb-6">
            {/* Monthly Option */}
            <div className="bg-white/10 rounded-lg p-5 hover:bg-white/20 transition-all">
              <h3 className="font-semibold text-lg mb-2">Monthly Plan</h3>
              <div className="text-2xl font-bold mb-3">$9.99<span className="text-sm font-normal opacity-80">/month</span></div>
              
              <ul className="mb-5 text-left">
                <li className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                  <span className="text-sm">Full access to all features</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                  <span className="text-sm">Unlimited symptom tracking</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                  <span className="text-sm">Luna AI Perimenopause Companion support</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleMonthlyTrial}
                variant="outline"
                className="w-full border-[#A7C4A0] text-white hover:bg-[#A7C4A0] hover:text-[#5D4154] transition-colors"
              >
                START MY FREE TRIAL NOW
              </Button>
            </div>
            
            {/* Annual Option */}
            <div className="bg-white/10 rounded-lg p-5 border-2 border-[#A7C4A0] hover:bg-white/20 transition-all relative">
              <div className="absolute top-0 right-0 bg-[#A7C4A0] text-[#5D4154] text-xs px-2 py-1 rounded-bl-lg font-bold">
                BEST VALUE
              </div>
              
              <h3 className="font-semibold text-lg mb-2">Annual Plan</h3>
              <div className="text-2xl font-bold mb-3">
                $99<span className="text-sm font-normal opacity-80">/year</span>
                <span className="text-sm text-[#A7C4A0] font-semibold ml-2">Save $20.88</span>
              </div>
              
              <ul className="mb-5 text-left">
                <li className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                  <span className="text-sm">All features in monthly plan</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                  <span className="text-sm">Save $20.88 compared to monthly</span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <Check className="h-4 w-4 text-[#A7C4A0] flex-shrink-0" />
                  <span className="text-sm">Priority customer support</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleAnnualTrial}
                className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/80 text-[#5D4154]"
              >
                START MY FREE TRIAL NOW
              </Button>
            </div>
          </div>
          
          <p className="text-lg font-semibold mb-2">👉 Start Your Free 7-Day Trial Now</p>
          <p className="text-sm opacity-80">
            No credit card. No risk. Just results, relief, and the roadmap you deserve.
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
