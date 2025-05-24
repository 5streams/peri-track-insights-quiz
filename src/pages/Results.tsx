
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LoadingSpinner from "@/components/results/LoadingSpinner";
import { calculateHormoneScores } from "@/utils/scoreCalculation";

interface QuizResults {
  score: number;
  phase: string;
  primarySymptoms: string[];
  recommendedActions: string[];
}

const Results = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", email: "" });
  const [hormoneScores, setHormoneScores] = useState({
    overall: 0,
    estrogen: 0,
    progesterone: 0,
    testosterone: 0,
    primaryHormone: "estrogen",
    primarySymptoms: [] as string[]
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedResults = localStorage.getItem("quizResults");
    const storedUserInfo = localStorage.getItem("userInfo");
    
    if (storedResults) {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
      
      const scores = calculateHormoneScores(parsedResults);
      setHormoneScores(scores);
    } else {
      navigate("/quiz");
    }
    
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [navigate]);
  
  if (!results) {
    return <LoadingSpinner />;
  }

  const capitalizedFirstName = userInfo.firstName 
    ? userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)
    : "We";

  const handleStartTrial = () => {
    localStorage.setItem("trialStartDate", new Date().toString());
    navigate("/tryperitrack");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Personalized Validation Header */}
      <section className="bg-gradient-to-br from-[#6B4E7A] to-[#8B5A9B] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {capitalizedFirstName}, We've Analyzed Your Answers
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">
              PERIMENOPAUSE SCORE: <span className="text-[#FFD700]">{hormoneScores.overall}/100</span>
            </h2>
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-4 w-80 rounded-full relative">
                <div 
                  className="absolute top-0 w-3 h-4 bg-white rounded-full transition-all duration-1000"
                  style={{ left: `${Math.max(5, hormoneScores.overall * 0.8)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-lg">
              {hormoneScores.overall >= 70 
                ? "Your symptoms indicate significant perimenopause changes that deserve immediate attention."
                : hormoneScores.overall >= 40
                ? "Your symptoms show moderate perimenopause patterns that should be monitored closely."
                : "You're showing early perimenopause signs - perfect timing for proactive management."
              }
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hormone Assessment Results */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#6B4E7A] text-center mb-8">
              YOUR HORMONE ASSESSMENT RESULTS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-l-4 border-red-400">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-600 mb-3">ESTROGEN: FLUCTUATING</h3>
                  <div className="text-2xl font-bold text-red-600 mb-2">Score: {hormoneScores.estrogen}/100</div>
                  <p className="text-gray-700">
                    Your estrogen levels are fluctuating wildly, explaining your brain fog, mood swings, and sleep disruptions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-orange-400">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-3">PROGESTERONE: DECLINING</h3>
                  <div className="text-2xl font-bold text-orange-600 mb-2">Score: {hormoneScores.progesterone}/100</div>
                  <p className="text-gray-700">
                    Your progesterone has dropped significantly, directly causing your anxiety and sleep issues.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-yellow-400">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-yellow-600 mb-3">TESTOSTERONE: SUBOPTIMAL</h3>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">Score: {hormoneScores.testosterone}/100</div>
                  <p className="text-gray-700">
                    Your testosterone decline explains your fatigue, decreased motivation, and energy crashes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pain Amplification Section */}
      <section className="py-12 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-8">
              ⚠️ WARNING: WHAT HAPPENS NEXT WITHOUT ACTION
            </h2>
            
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Women with your exact hormone pattern typically experience:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-bold text-red-600 text-lg mb-4">WITHIN 3 MONTHS:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Sleep disruptions increase by 40-60%</li>
                    <li>• Brain fog affects work performance</li>
                    <li>• Mood swings strain relationships</li>
                    <li>• Energy levels continue declining</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 text-lg mb-4">WITHIN 6-12 MONTHS:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• New symptoms emerge and compound</li>
                    <li>• Quality of life significantly impacted</li>
                    <li>• Interventions become more complex</li>
                    <li>• Recovery takes much longer</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-red-100 rounded-lg">
                <p className="text-lg font-semibold text-red-800">
                  The most concerning finding: You're displaying the exact early pattern we see in women who go on to experience the most severe perimenopause transitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Hope & Solution Bridge */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-8">
              BUT HERE'S THE AMAZING NEWS...
            </h2>
            
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Women with your EXACT pattern who found their personal relief formula reported:
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h4 className="font-bold text-green-600 text-lg mb-4">WITHIN 2-3 WEEKS:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 68% improvement in sleep quality</li>
                    <li>• 72% reduction in anxiety episodes</li>
                    <li>• 61% decrease in brain fog incidents</li>
                    <li>• 70% improvement in energy levels</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-green-600 text-lg mb-4">THE SECRET:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• They identified their unique trigger patterns</li>
                    <li>• They timed interventions with their cycles</li>
                    <li>• They stopped wasting time on generic solutions</li>
                    <li>• They found their personal relief formula</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Tracking-to-Relief Connection */}
      <section className="py-12 bg-[#6B4E7A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              HERE'S HOW TRACKING LEADS TO RAPID RELIEF
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-4">DECODE YOUR BODY'S MESSAGES</h3>
                <p>Your symptoms aren't random. Track for just 2 weeks and discover the hidden patterns your body has been trying to tell you.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-4">FIND YOUR PERSONAL TRIGGERS</h3>
                <p>Discover exactly what foods, activities, and timing patterns are making YOUR symptoms worse - and eliminate them.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-4">GET TARGETED RELIEF</h3>
                <p>Apply interventions at exactly the right times in your cycle when they'll be most effective for YOUR body.</p>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">THE RESULT:</h3>
              <p className="text-xl mb-6">
                Instead of trying random solutions for months, you find YOUR relief pattern in weeks.
              </p>
              <p className="text-lg opacity-90">
                "I spent 6 months trying random supplements. After 2 weeks of tracking with Peritrack, I found my exact trigger pattern and my sleep improved 70% almost immediately." —Jennifer, 45
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Powerful CTA Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              YOUR PERSONAL RELIEF PATTERN IS WAITING
            </h2>
            
            <p className="text-xl mb-8">
              Don't spend another month wondering what will work. Start discovering YOUR unique pattern today.
            </p>
            
            <div className="bg-white/20 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4">START YOUR FREE 7-DAY TRIAL</h3>
              <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                <li>✓ Personalized tracking focused on YOUR symptoms</li>
                <li>✓ AI pattern recognition within days</li>
                <li>✓ Luna AI support companion 24/7</li>
                <li>✓ Lab results interpretation</li>
                <li>✓ Your personal relief protocol</li>
              </ul>
              <p className="text-lg font-bold">$0 for 7 days, then just $9.99/month</p>
            </div>
            
            <Button 
              onClick={handleStartTrial}
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-12 py-6 text-xl font-bold rounded-lg shadow-lg transform transition hover:scale-105"
            >
              FIND MY RELIEF PATTERN NOW
            </Button>
            
            <p className="mt-4 text-sm opacity-90">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
