import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Clock, CheckCircle, Users, Award, Lock, ShieldCheck, Star } from "lucide-react";
import { useLeadCapture } from "@/hooks/use-lead-capture";
import LeadCaptureModal from "@/components/leads/LeadCaptureModal";

const ComprehensiveTestingOffer: React.FC = () => {
  const [spotsRemaining, setSpotsRemaining] = useState(47);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 27 });
  const { isModalOpen, openLeadModal, closeLeadModal } = useLeadCapture();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleOrderNow = () => {
    // Create mock quiz results for hormone testing lead
    const testingQuizResults = {
      source: "HORMONE_TESTING_OFFER",
      phase: "Comprehensive Testing",
      score: 100,
      page_source: 'results_page',
      timestamp: new Date().toISOString(),
      interest: "comprehensive_hormone_testing"
    };
    
    openLeadModal('quiz_results', undefined, testingQuizResults);
  };

  return (
    <div className="space-y-8 mt-8">
      {/* Headline Section */}
      <div className="text-center bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-l-2 border-red-400">
        <h2 className="font-headline text-2xl lg:text-3xl font-bold text-red-700 mb-3">
          Your Assessment Results May Indicate Serious Hormone Imbalances That Require Immediate Testing
        </h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          The symptoms you reported could signal significant hormonal changes that need professional evaluation. 
          Don't wait - get the definitive answers you need with comprehensive perimenopause hormone testing.
        </p>
      </div>

      {/* Results Amplification */}
      <Card className="border-l-2 border-red-500">
        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-bold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-red-500" size={24} />
            Based on Your Assessment, Here's What Concerns Us:
          </h3>
          
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-red-700 text-lg mb-4">🚨 Critical Warning Signs You Reported:</h4>
            <ul className="space-y-3 text-gray-700 text-base">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 text-lg">•</span>
                <span><strong>Severe sleep disruptions</strong> (often indicate dropping progesterone)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 text-lg">•</span>
                <span><strong>Unexplained mood changes</strong> (possible estrogen fluctuations)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 text-lg">•</span>
                <span><strong>Brain fog episodes</strong> (linked to testosterone deficiency)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 text-lg">•</span>
                <span><strong>Weight gain despite no diet changes</strong> (thyroid/insulin resistance)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 text-lg">•</span>
                <span><strong>Energy crashes</strong> (potential adrenal dysfunction)</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-800 text-lg mb-3">Why These Symptoms Are Red Flags:</h4>
            <p className="text-gray-700 text-base">
              Your combination of symptoms suggests multiple hormone systems may be failing simultaneously. 
              Without proper testing, you're operating blind while your body sends increasingly urgent distress signals.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-orange-500">
        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-bold text-gray-800 mb-4">
            What Happens When Hormone Imbalances Go Untested:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-3 text-base">🔴 Cardiovascular Risk:</h4>
              <p className="text-gray-700 text-base">
                Declining estrogen significantly increases heart disease risk. Women who don't address hormone changes have 40% higher cardiovascular events.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-3 text-base">🔴 Bone Density Loss:</h4>
              <p className="text-gray-700 text-base">
                Untested hormone deficiencies can cause rapid bone loss. Some women lose 20% of bone density in the first 5 years of perimenopause.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-3 text-base">🔴 Cognitive Decline:</h4>
              <p className="text-gray-700 text-base">
                Brain fog isn't just inconvenience - it can indicate declining neuroprotective hormones that affect long-term cognitive health.
              </p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-3 text-base">🔴 Mental Health Crisis:</h4>
              <p className="text-gray-700 text-base">
                Undiagnosed hormone imbalances are linked to increased anxiety, depression, and even suicidal ideation in perimenopausal women.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-yellow-500">
        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-bold text-gray-800 mb-4">
            Why "Normal" Lab Results Are Dangerous
          </h3>
          
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-yellow-800 mb-3 text-base">❌ Standard Testing Misses 70% of Perimenopause Issues:</h4>
            <ul className="space-y-3 text-gray-700 text-base">
              <li>• Most doctors only test FSH and estradiol</li>
              <li>• They use "normal ranges" based on ALL women, not your age group</li>
              <li>• They don't test at optimal cycle timing</li>
              <li>• They miss crucial hormone ratios and patterns</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-3 text-base">❌ "You're Fine" When You're Not:</h4>
            <ul className="space-y-3 text-gray-700 text-base">
              <li>• Reference ranges are based on sick populations</li>
              <li>• "Normal" doesn't mean "optimal" for symptom relief</li>
              <li>• Many doctors dismiss perimenopause symptoms as "just aging"</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* New Value Proposition Section */}
      <Card className="border-l-2 border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-8">
          <h2 className="font-headline text-2xl lg:text-3xl font-bold text-blue-800 mb-6 text-center">
            It's Time To Take Action And Get To The Bottom Of Whats Going On With Your Body. Get Bloodwork To Find Out Exactly What's Going On!
          </h2>
          
          <div className="mb-6">
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Getting your bloodwork isn't just about numbers on a page. It's about finally having the roadmap to feeling like yourself again.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Your Personalized Treatment Roadmap</h3>
              <p className="text-gray-700 mb-3"><strong>Instead of guessing what might help,</strong> you'll get specific recommendations based on YOUR exact hormone levels:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Exact supplements that work for your deficiencies</li>
                <li>• Bioidentical hormone therapy recommendations (if needed)</li>
                <li>• Lifestyle changes that target your specific imbalances</li>
                <li>• Timing guidance for maximum effectiveness</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Stop Wasting Money on Things That Don't Work</h3>
              <p className="text-gray-700 mb-3"><strong>No more trial and error.</strong> Your results show exactly what your body needs:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Know which supplements are useless for YOU</li>
                <li>• Understand why previous treatments failed</li>
                <li>• Get targeted solutions that actually work</li>
                <li>• Save hundreds on ineffective products</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
              <div className="text-3xl mb-3">🩺</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Become Your Own Health Advocate</h3>
              <p className="text-gray-700 mb-3"><strong>Never be dismissed by doctors again.</strong> Armed with comprehensive data:</p>
              <ul className="space-y-2 text-gray-700">
                <li>• Show doctors exactly what's wrong</li>
                <li>• Request specific treatments with confidence</li>
                <li>• Get taken seriously at medical appointments</li>
                <li>• Make informed decisions about your health</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg text-gray-800 mb-3">Fast-Track Your Recovery</h3>
              <p className="text-gray-700 mb-3"><strong>Start feeling better in weeks, not years:</strong></p>
              <ul className="space-y-2 text-gray-700">
                <li>• Target the root cause immediately</li>
                <li>• Skip months of unsuccessful treatments</li>
                <li>• Get relief from your worst symptoms first</li>
                <li>• Monitor progress with follow-up testing</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
            <h3 className="font-semibold text-xl text-gray-800 mb-4 text-center">🌟 The Bottom Line: Transform From Confused to Confident</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-3">Before Your Results:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>❌ Trying random supplements hoping something works</li>
                  <li>❌ Doctors saying "you're fine" when you feel terrible</li>
                  <li>❌ Wondering if you're going crazy</li>
                  <li>❌ Symptoms getting worse with no plan</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-3">After Your Results:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Exact treatment plan based on YOUR data</li>
                  <li>✅ Confidence in every health decision</li>
                  <li>✅ Clear understanding of what's happening</li>
                  <li>✅ Targeted solutions that actually work</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">📋 Real Example: What Your Results Look Like</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-800 mb-3">Sarah's Results Revealed:</p>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li><strong>Progesterone:</strong> 67% below optimal (explaining her insomnia)</li>
                <li><strong>Testosterone:</strong> 43% below optimal (explaining brain fog and low energy)</li>
                <li><strong>Cortisol:</strong> 3x higher than normal (explaining anxiety and weight gain)</li>
                <li><strong>Thyroid:</strong> T3 conversion issues (explaining metabolism problems)</li>
              </ul>
              <p className="text-gray-700 mb-3"><strong>Her Personalized Plan:</strong> Specific progesterone support, adaptogenic herbs for cortisol, T3 support nutrients, and stress management protocol.</p>
              <p className="text-green-700 font-semibold"><strong>Results in 6 weeks:</strong> Sleeping 7+ hours nightly, lost 12 pounds, energy back to normal, anxiety 80% improved.</p>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
            <h3 className="font-semibold text-lg text-red-700 mb-3">⚡ Why Waiting Even One More Month Costs You</h3>
            <p className="text-gray-700 mb-3">Every month you delay testing is another month of:</p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• Wasting money on supplements that might be wrong for your body</li>
              <li>• Symptoms potentially getting worse</li>
              <li>• Missing the optimal intervention window</li>
              <li>• Living with preventable suffering</li>
            </ul>
            <p className="font-semibold text-red-700">Your comprehensive hormone roadmap is waiting. Get the answers you deserve.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-green-500 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="font-headline text-3xl font-bold text-green-700 mb-4">
              Complete Perimenopause Hormone Assessment - $199
            </h3>
            <p className="text-xl text-gray-600 mb-4">🧪 What's Included (Value: $800+ at traditional labs):</p>
            
            {/* BBB Customer Review Ratings */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-headline text-lg font-bold text-gray-800 mb-3">
                Customer Review Ratings
              </h4>
              
              <div className="flex justify-center items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                ))}
                <span className="text-2xl font-bold text-gray-800 ml-2">4.8</span>
              </div>
              
              <p className="text-base text-gray-700 font-medium">
                Average of 1,047 Customer Reviews
              </p>
            </div>
            
            {/* Add the 4-step process */}
            <div className="bg-green-100 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-2">1</div>
                  <p className="text-sm font-semibold text-green-800">Order Lab Testing</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-2">2</div>
                  <p className="text-sm font-semibold text-green-800">Visit Your Nearest Lab</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-2">3</div>
                  <p className="text-sm font-semibold text-green-800">Results Get Sent To Us</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-2">4</div>
                  <p className="text-sm font-semibold text-green-800">You Get A Full Evaluation!</p>
                </div>
              </div>
              <p className="text-center text-green-700 font-bold mt-3">No Doctor Needed!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-3">Essential Hormones Tested:</h4>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Estradiol (E2) - Multiple measurements</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Progesterone - Cycle-specific timing</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Testosterone (Free & Total)</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />DHEA-S - Adrenal function</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Cortisol (4-point) - Stress response</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Thyroid Panel (TSH, T3, T4, rT3)</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Insulin & Glucose - Metabolic health</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-lg mb-3">Advanced Analysis:</h4>
              <ul className="space-y-3 text-gray-700 mb-4 text-base">
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Hormone ratios and patterns</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Age-specific optimal ranges</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Symptom correlation mapping</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Personalized recommendations</li>
              </ul>

              <h4 className="font-semibold text-gray-800 text-lg mb-3">Professional Interpretation:</h4>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Detailed results explanation</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Specific treatment suggestions</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" size={16} />Lifestyle optimization plan</li>
              </ul>
            </div>
          </div>

          {/* Add CTA Button with Security Seals */}
          <div className="mt-8 text-center">
            {/* Security Seals */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <ShieldCheck className="text-green-600 mr-2" size={20} />
                <span className="text-sm font-semibold text-gray-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <Lock className="text-blue-600 mr-2" size={20} />
                <span className="text-sm font-semibold text-gray-700">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                <Shield className="text-purple-600 mr-2" size={20} />
                <span className="text-sm font-semibold text-gray-700">Secure Payment</span>
              </div>
            </div>
            
            <Button 
              onClick={handleOrderNow}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-lg text-xl transform hover:scale-105 transition-all duration-200"
            >
              Order Bloodwork
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-purple-500 bg-purple-50">
        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-bold text-purple-800 mb-4 flex items-center">
            <Clock className="mr-2" size={24} />
            Why You Need to Test NOW:
          </h3>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2 text-base">Time Remaining</h4>
                <div className="text-lg font-bold text-purple-800">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2 text-base">Spots Remaining</h4>
                <div className="text-lg font-bold text-red-600">{spotsRemaining}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2 text-base">Success Rate</h4>
                <div className="text-lg font-bold text-green-600">96%</div>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-gray-700 text-base">
            <p><strong>Your Symptoms Are Escalating:</strong> Based on your assessment, your hormone disruption appears to be accelerating. Waiting 6-12 months could mean missing critical intervention windows.</p>
            <p><strong>Early Intervention = Better Outcomes:</strong> Women who test and address hormones in early perimenopause have 60% better symptom management long-term.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-blue-500">
        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 text-blue-500" size={24} />
            What Women Discovered Through Testing:
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3 italic text-base">
                "My doctor said my hormones were 'normal' but I felt terrible. This comprehensive panel showed my progesterone was nearly non-existent and my cortisol was dangerously high. Finally got the answers I needed!"
              </p>
              <p className="font-semibold text-blue-700 text-base">- Sarah, 44</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3 italic text-base">
                "I was told my symptoms were 'just stress.' The testing revealed severe estrogen dominance and insulin resistance. Now I have a real treatment plan that's working."
              </p>
              <p className="font-semibold text-blue-700 text-base">- Jennifer, 47</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-3 italic text-base">
                "Three doctors dismissed my concerns. This panel showed exactly what was wrong and gave me the data to advocate for proper treatment."
              </p>
              <p className="font-semibold text-blue-700 text-base">- Michelle, 45</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-green-500 bg-green-50">
        <CardContent className="p-6">
          <h3 className="font-headline text-xl font-bold text-green-800 mb-4 flex items-center">
            <Shield className="mr-2" size={24} />
            Complete Satisfaction Guarantee
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-700 mb-3 text-base">🛡️ If Your Results Don't Provide Clear Answers:</h4>
              <ul className="space-y-3 text-gray-700 text-base">
                <li>• Full refund within 30 days</li>
                <li>• Free consultation with hormone specialist</li>
                <li>• Additional testing at no cost if needed</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-700 mb-3 text-base">What You Risk by NOT Testing:</h4>
              <ul className="space-y-3 text-gray-700 text-base">
                <li>• Continued symptom escalation</li>
                <li>• Missed treatment opportunities</li>
                <li>• Long-term health consequences</li>
                <li>• Years of unnecessary suffering</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-red-500 bg-gradient-to-br from-red-50 to-orange-50">
        <CardContent className="p-6 text-center">
          <h3 className="font-headline text-2xl font-bold text-red-700 mb-4">
            Don't Let Another Month Pass Without Answers
          </h3>
          
          <p className="text-lg text-gray-700 mb-4">
            Your body is sending clear warning signals. Your assessment results indicate hormone disruption that needs immediate evaluation.
          </p>

          <div className="bg-white p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-800 mb-3 text-base">Consider This:</h4>
            <div className="grid md:grid-cols-2 gap-3 text-gray-700 text-base">
              <p>• How much have you already spent on supplements that don't work?</p>
              <p>• How many doctor visits have left you with no answers?</p>
              <p>• What's the cost of another year of sleepless nights and mood swings?</p>
              <p>• How much is your peace of mind worth?</p>
            </div>
          </div>

          <p className="text-lg font-semibold text-purple-700 mb-4">
            For less than one month of random supplements, you can have complete hormone clarity.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-8 text-center">
          <h3 className="font-headline text-3xl font-bold text-purple-800 mb-4">
            Order Your Comprehensive Hormone Assessment
          </h3>
          
          <div className="text-5xl font-bold text-green-600 mb-4">$199</div>
          <p className="text-xl text-gray-600 mb-6">Complete Perimenopause Testing Panel</p>

          {/* Security Seals for Final CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <ShieldCheck className="text-green-600 mr-2" size={20} />
              <span className="text-sm font-semibold text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Lock className="text-blue-600 mr-2" size={20} />
              <span className="text-sm font-semibold text-gray-700">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Shield className="text-purple-600 mr-2" size={20} />
              <span className="text-sm font-semibold text-gray-700">Secure Payment</span>
            </div>
          </div>

          <Button 
            onClick={handleOrderNow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-lg md:text-xl mb-6 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto max-w-full break-words hyphens-auto"
          >
            Order Bloodwork Now!
          </Button>

          <div className="grid md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-4">
            <div>
              <p className="flex items-center text-gray-700 text-base"><CheckCircle className="text-green-500 mr-2" size={16} />12 Critical Hormones Tested</p>
              <p className="flex items-center text-gray-700 text-base"><CheckCircle className="text-green-500 mr-2" size={16} />Professional Interpretation Included</p>
              <p className="flex items-center text-gray-700 text-base"><CheckCircle className="text-green-500 mr-2" size={16} />Personalized Treatment Recommendations</p>
            </div>
            <div>
              <p className="flex items-center text-gray-700 text-base"><CheckCircle className="text-green-500 mr-2" size={16} />Same-Day Lab Appointments Available</p>
              <p className="flex items-center text-gray-700 text-base"><CheckCircle className="text-green-500 mr-2" size={16} />Results in 3-5 Business Days</p>
              <p className="flex items-center text-gray-700 text-base"><CheckCircle className="text-green-500 mr-2" size={16} />30-Day Money-Back Guarantee</p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 text-base text-gray-600">
            <span className="flex items-center"><Shield className="mr-1" size={16} />Secure checkout</span>
            <span className="flex items-center"><Award className="mr-1" size={16} />HSA/FSA eligible</span>
            <span>Free shipping</span>
          </div>
        </CardContent>
      </Card>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={closeLeadModal}
        source="quiz_results"
        quizResults={{
          source: "HORMONE_TESTING_OFFER",
          phase: "Comprehensive Testing",
          score: 100,
          page_source: 'results_page',
          timestamp: new Date().toISOString(),
          interest: "comprehensive_hormone_testing"
        }}
      />
    </div>
  );
};

export default ComprehensiveTestingOffer;
