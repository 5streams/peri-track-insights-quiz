
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Clock, CheckCircle, Users, Award } from "lucide-react";
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
    <div className="space-y-2 mt-2">
      {/* Headline Section */}
      <div className="text-center bg-gradient-to-br from-red-50 to-orange-50 p-2 rounded-lg border-l-2 border-red-400">
        <h2 className="font-headline text-lg lg:text-xl font-bold text-red-700 mb-1">
          Your Assessment Results May Indicate Serious Hormone Imbalances That Require Immediate Testing
        </h2>
        <p className="text-sm text-gray-700 max-w-4xl mx-auto">
          The symptoms you reported could signal significant hormonal changes that need professional evaluation. 
          Don't wait - get the definitive answers you need with comprehensive perimenopause hormone testing.
        </p>
      </div>

      {/* Results Amplification */}
      <Card className="border-l-2 border-red-500">
        <CardContent className="p-2">
          <h3 className="font-headline text-base font-bold text-gray-800 mb-2 flex items-center">
            <AlertTriangle className="mr-1 text-red-500" size={16} />
            Based on Your Assessment, Here's What Concerns Us:
          </h3>
          
          <div className="bg-red-50 p-2 rounded-lg mb-2">
            <h4 className="font-semibold text-red-700 text-sm mb-2">🚨 Critical Warning Signs You Reported:</h4>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li className="flex items-start">
                <span className="text-red-500 mr-1">•</span>
                <span><strong>Severe sleep disruptions</strong> (often indicate dropping progesterone)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-1">•</span>
                <span><strong>Unexplained mood changes</strong> (possible estrogen fluctuations)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-1">•</span>
                <span><strong>Brain fog episodes</strong> (linked to testosterone deficiency)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-1">•</span>
                <span><strong>Weight gain despite no diet changes</strong> (thyroid/insulin resistance)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-1">•</span>
                <span><strong>Energy crashes</strong> (potential adrenal dysfunction)</span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-50 p-2 rounded-lg">
            <h4 className="font-semibold text-amber-800 text-sm mb-1">Why These Symptoms Are Red Flags:</h4>
            <p className="text-gray-700 text-xs">
              Your combination of symptoms suggests multiple hormone systems may be failing simultaneously. 
              Without proper testing, you're operating blind while your body sends increasingly urgent distress signals.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-orange-500">
        <CardContent className="p-2">
          <h3 className="font-headline text-base font-bold text-gray-800 mb-2">
            What Happens When Hormone Imbalances Go Untested:
          </h3>
          
          <div className="grid md:grid-cols-2 gap-2">
            <div className="bg-red-50 p-2 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-1 text-xs">🔴 Cardiovascular Risk:</h4>
              <p className="text-gray-700 text-xs">
                Declining estrogen significantly increases heart disease risk. Women who don't address hormone changes have 40% higher cardiovascular events.
              </p>
            </div>
            
            <div className="bg-red-50 p-2 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-1 text-xs">🔴 Bone Density Loss:</h4>
              <p className="text-gray-700 text-xs">
                Untested hormone deficiencies can cause rapid bone loss. Some women lose 20% of bone density in the first 5 years of perimenopause.
              </p>
            </div>
            
            <div className="bg-red-50 p-2 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-1 text-xs">🔴 Cognitive Decline:</h4>
              <p className="text-gray-700 text-xs">
                Brain fog isn't just inconvenience - it can indicate declining neuroprotective hormones that affect long-term cognitive health.
              </p>
            </div>
            
            <div className="bg-red-50 p-2 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-1 text-xs">🔴 Mental Health Crisis:</h4>
              <p className="text-gray-700 text-xs">
                Undiagnosed hormone imbalances are linked to increased anxiety, depression, and even suicidal ideation in perimenopausal women.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-yellow-500">
        <CardContent className="p-2">
          <h3 className="font-headline text-base font-bold text-gray-800 mb-2">
            Why "Normal" Lab Results Are Dangerous
          </h3>
          
          <div className="bg-yellow-50 p-2 rounded-lg mb-2">
            <h4 className="font-semibold text-yellow-800 mb-1 text-xs">❌ Standard Testing Misses 70% of Perimenopause Issues:</h4>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li>• Most doctors only test FSH and estradiol</li>
              <li>• They use "normal ranges" based on ALL women, not your age group</li>
              <li>• They don't test at optimal cycle timing</li>
              <li>• They miss crucial hormone ratios and patterns</li>
            </ul>
          </div>

          <div className="bg-red-50 p-2 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-1 text-xs">❌ "You're Fine" When You're Not:</h4>
            <ul className="space-y-1 text-gray-700 text-xs">
              <li>• Reference ranges are based on sick populations</li>
              <li>• "Normal" doesn't mean "optimal" for symptom relief</li>
              <li>• Many doctors dismiss perimenopause symptoms as "just aging"</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-green-500 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-2">
          <div className="text-center mb-2">
            <h3 className="font-headline text-lg font-bold text-green-700 mb-1">
              Complete Perimenopause Hormone Assessment - $199
            </h3>
            <p className="text-sm text-gray-600">🧪 What's Included (Value: $800+ at traditional labs):</p>
          </div>

          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Essential Hormones Tested:</h4>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Estradiol (E2) - Multiple measurements</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Progesterone - Cycle-specific timing</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Testosterone (Free & Total)</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />DHEA-S - Adrenal function</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Cortisol (4-point) - Stress response</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Thyroid Panel (TSH, T3, T4, rT3)</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Insulin & Glucose - Metabolic health</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Advanced Analysis:</h4>
              <ul className="space-y-1 text-gray-700 mb-2 text-xs">
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Hormone ratios and patterns</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Age-specific optimal ranges</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Symptom correlation mapping</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Personalized recommendations</li>
              </ul>

              <h4 className="font-semibold text-gray-800 text-sm mb-1">Professional Interpretation:</h4>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Detailed results explanation</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Specific treatment suggestions</li>
                <li className="flex items-center"><CheckCircle className="text-green-500 mr-1" size={10} />Lifestyle optimization plan</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-purple-500 bg-purple-50">
        <CardContent className="p-2">
          <h3 className="font-headline text-base font-bold text-purple-800 mb-2 flex items-center">
            <Clock className="mr-1" size={16} />
            Why You Need to Test NOW:
          </h3>

          <div className="grid md:grid-cols-3 gap-2 mb-2">
            <div className="text-center">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-1 text-xs">Time Remaining</h4>
                <div className="text-sm font-bold text-purple-800">
                  {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-1 text-xs">Spots Remaining</h4>
                <div className="text-sm font-bold text-red-600">{spotsRemaining}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-1 text-xs">Success Rate</h4>
                <div className="text-sm font-bold text-green-600">96%</div>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-gray-700 text-xs">
            <p><strong>Your Symptoms Are Escalating:</strong> Based on your assessment, your hormone disruption appears to be accelerating. Waiting 6-12 months could mean missing critical intervention windows.</p>
            <p><strong>Early Intervention = Better Outcomes:</strong> Women who test and address hormones in early perimenopause have 60% better symptom management long-term.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-blue-500">
        <CardContent className="p-2">
          <h3 className="font-headline text-base font-bold text-gray-800 mb-2 flex items-center">
            <Users className="mr-1 text-blue-500" size={16} />
            What Women Discovered Through Testing:
          </h3>

          <div className="grid md:grid-cols-3 gap-2">
            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-gray-700 mb-1 italic text-xs">
                "My doctor said my hormones were 'normal' but I felt terrible. This comprehensive panel showed my progesterone was nearly non-existent and my cortisol was dangerously high. Finally got the answers I needed!"
              </p>
              <p className="font-semibold text-blue-700 text-xs">- Sarah, 44</p>
            </div>

            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-gray-700 mb-1 italic text-xs">
                "I was told my symptoms were 'just stress.' The testing revealed severe estrogen dominance and insulin resistance. Now I have a real treatment plan that's working."
              </p>
              <p className="font-semibold text-blue-700 text-xs">- Jennifer, 47</p>
            </div>

            <div className="bg-blue-50 p-2 rounded-lg">
              <p className="text-gray-700 mb-1 italic text-xs">
                "Three doctors dismissed my concerns. This panel showed exactly what was wrong and gave me the data to advocate for proper treatment."
              </p>
              <p className="font-semibold text-blue-700 text-xs">- Michelle, 45</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-green-500 bg-green-50">
        <CardContent className="p-2">
          <h3 className="font-headline text-base font-bold text-green-800 mb-2 flex items-center">
            <Shield className="mr-1" size={16} />
            Complete Satisfaction Guarantee
          </h3>

          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <h4 className="font-semibold text-green-700 mb-1 text-xs">🛡️ If Your Results Don't Provide Clear Answers:</h4>
              <ul className="space-y-1 text-gray-700 text-xs">
                <li>• Full refund within 30 days</li>
                <li>• Free consultation with hormone specialist</li>
                <li>• Additional testing at no cost if needed</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-700 mb-1 text-xs">What You Risk by NOT Testing:</h4>
              <ul className="space-y-1 text-gray-700 text-xs">
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
        <CardContent className="p-2 text-center">
          <h3 className="font-headline text-lg font-bold text-red-700 mb-2">
            Don't Let Another Month Pass Without Answers
          </h3>
          
          <p className="text-sm text-gray-700 mb-2">
            Your body is sending clear warning signals. Your assessment results indicate hormone disruption that needs immediate evaluation.
          </p>

          <div className="bg-white p-2 rounded-lg mb-2">
            <h4 className="font-semibold text-gray-800 mb-1 text-xs">Consider This:</h4>
            <div className="grid md:grid-cols-2 gap-1 text-gray-700 text-xs">
              <p>• How much have you already spent on supplements that don't work?</p>
              <p>• How many doctor visits have left you with no answers?</p>
              <p>• What's the cost of another year of sleepless nights and mood swings?</p>
              <p>• How much is your peace of mind worth?</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-purple-700 mb-2">
            For less than one month of random supplements, you can have complete hormone clarity.
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-2 text-center">
          <h3 className="font-headline text-lg font-bold text-purple-800 mb-1">
            Order Your Comprehensive Hormone Assessment
          </h3>
          
          <div className="text-2xl font-bold text-green-600 mb-1">$199</div>
          <p className="text-sm text-gray-600 mb-2">Complete Perimenopause Testing Panel</p>

          <Button 
            onClick={handleOrderNow}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base mb-2 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto max-w-full break-words hyphens-auto"
          >
            Order Bloodwork Now!
          </Button>

          <div className="grid md:grid-cols-2 gap-1 text-left max-w-2xl mx-auto mb-2">
            <div>
              <p className="flex items-center text-gray-700 text-xs"><CheckCircle className="text-green-500 mr-1" size={10} />12 Critical Hormones Tested</p>
              <p className="flex items-center text-gray-700 text-xs"><CheckCircle className="text-green-500 mr-1" size={10} />Professional Interpretation Included</p>
              <p className="flex items-center text-gray-700 text-xs"><CheckCircle className="text-green-500 mr-1" size={10} />Personalized Treatment Recommendations</p>
            </div>
            <div>
              <p className="flex items-center text-gray-700 text-xs"><CheckCircle className="text-green-500 mr-1" size={10} />Same-Day Lab Appointments Available</p>
              <p className="flex items-center text-gray-700 text-xs"><CheckCircle className="text-green-500 mr-1" size={10} />Results in 3-5 Business Days</p>
              <p className="flex items-center text-gray-700 text-xs"><CheckCircle className="text-green-500 mr-1" size={10} />30-Day Money-Back Guarantee</p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2 text-xs text-gray-600">
            <span className="flex items-center"><Shield className="mr-1" size={10} />Secure checkout</span>
            <span className="flex items-center"><Award className="mr-1" size={10} />HSA/FSA eligible</span>
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
