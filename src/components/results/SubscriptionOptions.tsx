
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";
import PatternVisualization from "@/components/insights/PatternVisualization";

interface SubscriptionOptionsProps {
  onStartTrial: () => void;
}

const SubscriptionOptions: React.FC<SubscriptionOptionsProps> = ({ onStartTrial }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const handleStartTrial = (plan: 'monthly' | 'annual') => {
    setSelectedPlan(plan);
    onStartTrial();
    setIsModalOpen(true);
  };

  return (
    <section className="py-8 md:py-12 reveal-section transform opacity-0 transition-all duration-500">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
            ✅ Julie, You've Taken the First Step… Now It's Time to Take Control
          </h2>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-[#5D4154]">
              Introducing Peritrack™
            </h3>
            <p className="text-lg text-[#5D4154]/80 mb-3">
              Your All-in-One Perimenopause Health Companion
            </p>
            <p className="text-[#5D4154]/90 max-w-2xl mx-auto">
              Track your symptoms. Understand your hormones. Prepare for the week ahead — with confidence.
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="bg-[#5D4154]/5 p-5 md:p-8 rounded-lg mb-12">
            <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-3">
              🚨 You're At a Critical Crossroad
            </h3>
            <p className="text-[#5D4154]/80">
              You've just uncovered key patterns in your body.
              Now what?
            </p>
            <p className="text-[#5D4154]/80 mt-4">
              Without the right tools, symptoms escalate. Doctors shrug. You're left piecing together your health like a jigsaw puzzle — in the dark.
            </p>
            <p className="text-[#5D4154]/90 font-medium mt-4">
              Peritrack gives you the clarity, structure, and support you need.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-6">
              🌿 Why Peritrack Exists
            </h3>
            <p className="text-[#5D4154]/80 mb-4">
              Perimenopause is a deeply misunderstood stage of life. It can affect your mind, your mood, your sleep, your energy — and make you feel like a stranger in your own skin.
            </p>
            <p className="text-[#5D4154]/80 mb-4">
              Most apps don't support this transition. Most doctors don't explain it fully.
              Peritrack changes that. It's your daily guide, your insight engine, and your trusted health companion built specifically for this chapter of your life.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-6">
              🔍 Here's What Peritrack Helps You Do
            </h3>

            {/* Feature 1: Track Symptoms */}
            <Card className="mb-10 overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#5D4154]/5 to-[#9b87f5]/10 p-6">
                <h4 className="text-lg font-semibold text-[#5D4154]">
                  ✅ 1. Track the Right Symptoms — Daily, Easily, and Accurately
                </h4>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Log over 30+ symptoms (hot flashes, brain fog, libido, night sweats, mood swings, anxiety, more)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Track intensity, timing, and possible triggers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>See how symptoms shift week-by-week and across your cycle</span>
                  </li>
                </ul>
                
                {/* Visualization Chart */}
                <div className="mt-6 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h5 className="text-base font-medium text-[#5D4154] mb-3">
                    Get insights on when symptoms occur during your cycle
                  </h5>
                  <div className="h-64 mb-3">
                    <PatternVisualization timeWindow={30} />
                  </div>
                  <p className="text-sm text-[#5D4154]/80 text-center">
                    Visualize patterns and connections between symptoms over time
                  </p>
                </div>
                
                <p className="mt-6 font-medium text-[#5D4154]">
                  Benefit: You stop guessing and start seeing real, measurable patterns.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2: Know What's Coming */}
            <Card className="mb-10 overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#5D4154]/5 p-6">
                <h4 className="text-lg font-semibold text-[#5D4154]">
                  🔮 2. Know What's Coming — Before It Hits You
                </h4>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4 text-[#5D4154]/80">
                  Perimenopause symptoms can feel random — but they rarely are.
                </p>
                <p className="mb-4 text-[#5D4154]/80">
                  Peritrack's system doesn't just track — it anticipates.
                </p>
                <p className="mb-4 text-[#5D4154]/80">
                  Using your personal data, the app shows you:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>How you're likely to feel in the coming week based on hormone trends</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>When to expect dips in energy or spikes in irritability</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>When your sleep is most likely to be disrupted</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>When you'll feel most grounded — so you can plan social, work, and self-care accordingly</span>
                  </li>
                </ul>
                <p className="font-medium text-[#5D4154]">
                  Benefit: You're not blindsided anymore. You're prepared.
                </p>
              </CardContent>
            </Card>

            {/* Remaining features (3-7) */}
            {/* Feature 3: Daily Lifestyle Recommendations */}
            <Card className="mb-10 overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-[#5D4154]/5 to-[#9b87f5]/10 p-6">
                <h4 className="text-lg font-semibold text-[#5D4154]">
                  🧘‍♀️ 3. Get Daily Lifestyle Recommendations — Backed by Real Hormone Science
                </h4>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4 text-[#5D4154]/80">
                  Stop scrolling forums. Start getting guidance that's personal, evidence-based, and action-ready.
                </p>
                <p className="mb-4 text-[#5D4154]/80">
                  Every week, Peritrack recommends:
                </p>
                <ul className="space-y-2 mb-6">
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
                <p className="font-medium text-[#5D4154]">
                  Benefit: You stop relying on trial-and-error and start feeling better with a clear plan.
                </p>
              </CardContent>
            </Card>

            {/* Condensing remaining features for brevity - you can expand these in a similar fashion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Feature 4: Luna AI */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#5D4154]/5 p-5">
                  <h4 className="text-lg font-semibold text-[#5D4154]">
                    🤖 4. Access Luna — Your 24/7 AI Hormone Companion
                  </h4>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="mb-3 text-[#5D4154]/80">
                    Luna is your private support system for when you're overwhelmed, curious, or just need fast answers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Ask anything about your symptoms</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Learn what labs mean</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Get personalized coaching</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Feel heard and understood</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Feature 5: Lab Results */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-[#5D4154]/5 to-[#9b87f5]/10 p-5">
                  <h4 className="text-lg font-semibold text-[#5D4154]">
                    📊 5. Organize Your Hormones and Lab Results
                  </h4>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Upload your test results</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Categorize by hormone and date</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Get simple explanations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Track changes over time</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-[#5D4154]">
                    Benefit: No more wondering what "low estrogen" means
                  </p>
                </CardContent>
              </Card>

              {/* Feature 6: Doctor Visit Prep */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-[#9b87f5]/10 to-[#5D4154]/5 p-5">
                  <h4 className="text-lg font-semibold text-[#5D4154]">
                    🩺 6. Walk Into Every Doctor Visit Prepared
                  </h4>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Print-friendly reports for doctors</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Full symptom + hormone summary</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Suggested questions to ask</span>
                    </li>
                  </ul>
                  <p className="mt-3 text-sm font-medium text-[#5D4154]">
                    Benefit: Become the most informed patient
                  </p>
                </CardContent>
              </Card>

              {/* Feature 7: Support */}
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="bg-gradient-to-r from-[#5D4154]/5 to-[#9b87f5]/10 p-5">
                  <h4 className="text-lg font-semibold text-[#5D4154]">
                    🤝 7. You're Not Just Using an App — You're Getting Real Support
                  </h4>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="mb-3 text-[#5D4154]/80">
                    This is more than a tracker. It's a system for getting your life back.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Educational guides</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Bonus sessions on hormonal balance</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Advanced hormone testing partnerships</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Real Transformation */}
          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-6">
              💡 The Real Transformation
            </h3>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="p-5">
                  <h4 className="text-base font-medium text-[#5D4154] mb-4">Without Peritrack</h4>
                  <ul className="space-y-3">
                    <li className="text-[#5D4154]/80">Waking up anxious and exhausted</li>
                    <li className="text-[#5D4154]/80">Tracking symptoms on sticky notes</li>
                    <li className="text-[#5D4154]/80">Trying random supplements</li>
                    <li className="text-[#5D4154]/80">Crying after doctor visits</li>
                    <li className="text-[#5D4154]/80">Feeling alone</li>
                  </ul>
                </div>
                <div className="p-5 bg-[#F9F5FF]/30">
                  <h4 className="text-base font-medium text-[#5D4154] mb-4">With Peritrack</h4>
                  <ul className="space-y-3">
                    <li className="text-[#5D4154]/90 font-medium">Knowing it's progesterone — and how to fix it</li>
                    <li className="text-[#5D4154]/90 font-medium">Digital dashboard with trends and predictions</li>
                    <li className="text-[#5D4154]/90 font-medium">Clear, customized guidance that works</li>
                    <li className="text-[#5D4154]/90 font-medium">Walking in prepared and empowered</li>
                    <li className="text-[#5D4154]/90 font-medium">Being part of a hormone-savvy support circle</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-10">
            <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-6 text-center">
              🎁 Your Membership Includes:
            </h3>

            <Tabs defaultValue="annual" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (Best Value)</TabsTrigger>
              </TabsList>

              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                <div className="p-6 border-b border-gray-200 bg-[#F9F5FF]/20">
                  <div className="grid grid-cols-8 gap-2">
                    <div className="col-span-4">
                      <h4 className="font-medium text-[#5D4154]">Feature</h4>
                    </div>
                    <div className="col-span-2 text-center">
                      <h4 className="font-medium text-[#5D4154]">Monthly</h4>
                    </div>
                    <div className="col-span-2 text-center">
                      <h4 className="font-medium text-[#5D4154]">Annual (Best Value)</h4>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {[
                    "Full symptom tracker",
                    "Future prediction engine",
                    "Lab result analyzer",
                    "Luna AI hormone coach",
                    "Personalized lifestyle recommendations",
                    "HRT education & support",
                    "Doctor visit prep tools"
                  ].map((feature, index) => (
                    <div key={index} className="p-4">
                      <div className="grid grid-cols-8 gap-2 items-center">
                        <div className="col-span-4">
                          <span className="text-[#5D4154]/90">{feature}</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        </div>
                        <div className="col-span-2 text-center">
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Special feature for annual only */}
                  <div className="p-4 bg-[#F9F5FF]/20">
                    <div className="grid grid-cols-8 gap-2 items-center">
                      <div className="col-span-4">
                        <span className="text-[#5D4154]/90 font-medium">Quarterly hormone Q&A sessions</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="inline-block w-5 h-px bg-gray-300"></span>
                      </div>
                      <div className="col-span-2 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-8 gap-2 items-center">
                      <div className="col-span-4">
                        <span className="text-[#5D4154]/90">Bonus educational guides</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </div>
                      <div className="col-span-2 text-center">
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Cost row */}
                  <div className="p-5 bg-[#F9F5FF]/30">
                    <div className="grid grid-cols-8 gap-2 items-center">
                      <div className="col-span-4">
                        <span className="text-[#5D4154] font-semibold">Cost</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="font-bold text-[#5D4154]">$9.99/month</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="font-bold text-[#5D4154]">$99/year</span>
                        <div className="text-xs text-green-600 mt-1">Save $20.88</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action buttons */}
              <TabsContent value="monthly" className="mt-8">
                <Button 
                  onClick={() => handleStartTrial('monthly')} 
                  className="w-full max-w-sm mx-auto flex items-center justify-center py-6 text-lg bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                >
                  Start 7-Day Free Trial
                </Button>
                <p className="text-center text-sm text-[#5D4154]/70 mt-3">
                  No credit card required to start your trial
                </p>
              </TabsContent>
              
              <TabsContent value="annual" className="mt-8">
                <Button 
                  onClick={() => handleStartTrial('annual')} 
                  className="w-full max-w-sm mx-auto flex items-center justify-center py-6 text-lg bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                >
                  Start 7-Day Free Trial
                </Button>
                <p className="text-center text-sm text-[#5D4154]/70 mt-3">
                  No credit card required to start your trial
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Final sections */}
          <div className="mb-10">
            <div className="bg-[#5D4154]/5 p-5 md:p-8 rounded-lg mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-3">
                🕒 Why You Need to Start Today
              </h3>
              <p className="text-[#5D4154]/80 mb-4">
                Waiting for clarity often means waiting in suffering.
                But you don't need to suffer to be taken seriously.
              </p>
              <p className="text-[#5D4154]/80">
                With Peritrack:
              </p>
              <ul className="space-y-2 mt-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>79% of users report better sleep in 2–3 weeks</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>68% feel more emotionally stable within 30 days</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>84% report feeling more confident at their next medical appointment</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-[#5D4154] mb-3">
                🛑 Stop Wondering. Start Understanding.
              </h3>
              <p className="text-[#5D4154]/80 mb-5">
                You're not losing your mind. You're losing progesterone.
                <br />And with Peritrack, you can start balancing your hormones today — naturally, personally, and powerfully.
              </p>
              
              <Button 
                onClick={() => handleStartTrial('annual')}
                className="bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white py-4 px-6 text-lg"
              >
                👉 Start Your Free 7-Day Trial Now
              </Button>
              <p className="text-center text-sm text-[#5D4154]/70 mt-3">
                No credit card. No risk.
                <br />Just results, relief, and the roadmap you deserve.
              </p>
            </div>
          </div>
        </div>

        <LeadCaptureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pricingPlan={selectedPlan}
          source="free_trial"
        />
      </div>
    </section>
  );
};

export default SubscriptionOptions;
