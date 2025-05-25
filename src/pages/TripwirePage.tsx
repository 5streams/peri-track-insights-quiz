
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TripwirePage = () => {
  const [userData, setUserData] = useState({
    name: "Beautiful Sister",
    score: "64",
    scoreLevel: "moderate",
    symptoms: "vasomotor symptoms, sleep disturbances, and mood fluctuations",
    email: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get('name') || 'Beautiful Sister';
    const userScore = urlParams.get('score') || '64';
    const userEmail = urlParams.get('email') || '';
    const symptoms = urlParams.get('symptoms') || 'vasomotor,sleep,mood';
    
    // Determine score level
    function getScoreLevel(score: number) {
      if (score < 40) return 'mild';
      if (score < 70) return 'moderate';
      return 'severe';
    }
    
    // Convert symptoms to readable format
    function formatSymptoms(symptomsString: string) {
      const symptomMap: Record<string, string> = {
        'vasomotor': 'vasomotor symptoms',
        'sleep': 'sleep disturbances',
        'mood': 'mood fluctuations',
        'cognitive': 'brain fog',
        'physical': 'physical changes',
        'sexual': 'intimacy issues'
      };
      
      const symptomArray = symptomsString.split(',');
      const formatted = symptomArray.map(s => symptomMap[s.trim()] || s.trim());
      
      if (formatted.length === 1) return formatted[0];
      if (formatted.length === 2) return formatted.join(' and ');
      return formatted.slice(0, -1).join(', ') + ', and ' + formatted[formatted.length - 1];
    }
    
    const scoreLevel = getScoreLevel(parseInt(userScore));
    const formattedSymptoms = formatSymptoms(symptoms);
    
    setUserData({
      name: userName,
      score: userScore,
      scoreLevel,
      symptoms: formattedSymptoms,
      email: userEmail
    });
  }, []);

  const getScoreMessage = () => {
    switch (userData.scoreLevel) {
      case 'mild':
        return "Your mild symptoms are actually a blessing - you caught this early! With the right intervention, you can prevent escalation completely.";
      case 'moderate':
        return "You're at the tipping point where symptoms either stabilize with the right intervention... or spiral into severe territory.";
      case 'severe':
        return "Your severe symptoms need immediate intervention. But don't worry - even severe cases can see dramatic improvement in 72 hours with the right protocol.";
      default:
        return "";
    }
  };

  const getUrgencyText = () => {
    switch (userData.scoreLevel) {
      case 'mild':
        return '7-day';
      case 'moderate':
        return '72-hour';
      case 'severe':
        return 'IMMEDIATE';
      default:
        return '72-hour';
    }
  };

  const getScoreColorClass = () => {
    switch (userData.scoreLevel) {
      case 'mild':
        return 'border-l-4 border-green-500 bg-green-50';
      case 'moderate':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'severe':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return 'border-l-4 border-yellow-500 bg-yellow-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/results")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Dynamic Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {userData.name}, Your Assessment Reveals Something Critical...
          </h1>

          {/* Score Information */}
          <div className={`p-6 rounded-lg mb-8 ${getScoreColorClass()}`}>
            <p className="text-2xl text-gray-800 mb-4">
              Your <strong>{userData.scoreLevel}</strong> perimenopause score of <strong>{userData.score}/100</strong> puts you in a critical zone.
            </p>
            
            <p className="text-xl text-gray-700 mb-4">
              Those <strong>{userData.symptoms}</strong> you're experiencing right now? They're warning signals that your hormones are collapsing.
            </p>

            <div className="bg-white/60 p-4 rounded">
              <p className="text-lg text-gray-700">
                {getScoreMessage()}
              </p>
            </div>
          </div>

          {/* Personal Story Adaptation */}
          <div className="mb-8">
            <p className="text-xl text-gray-700 mb-4">
              My perimenopause assessment score? <strong>66/100</strong> - almost identical to yours at <strong>{userData.score}/100</strong>.
            </p>
            
            <p className="text-lg text-gray-600">
              I know exactly what you're going through because I've been there. The sleepless nights, the mood swings, the feeling like your body is betraying you...
            </p>
          </div>

          {/* Urgency Messaging */}
          <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              You Need <span className="text-red-600">{getUrgencyText()}</span> Intervention
            </h2>
            <p className="text-lg text-purple-800">
              Based on your score, waiting is not an option. Every day you delay treatment, your symptoms can intensify and become harder to reverse.
            </p>
          </div>

          {/* Offer Section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Get Your Personalized 3-Week Recovery Protocol
            </h2>
            <p className="text-xl mb-6">
              Based on your specific symptoms and score of {userData.score}/100, get the exact protocol that saved my marriage and my sanity.
            </p>
            
            <div className="bg-white text-gray-900 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">Just $7</div>
              <div className="text-sm text-gray-600 line-through">Regular Price: $97</div>
              <div className="text-lg font-semibold">Special Assessment Price</div>
            </div>

            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-8 py-4 rounded-full"
            >
              Get My Personal Protocol - $7
            </Button>
            
            <p className="text-sm mt-4 opacity-90">
              Instant access • 60-day money-back guarantee • Secure checkout
            </p>
          </div>

          {/* What's Included */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">🎯 Your Specific Protocol</h4>
                <p className="text-gray-600">
                  Custom plan based on your {userData.scoreLevel} symptoms and score of {userData.score}/100
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">⚡ {getUrgencyText()} Action Plan</h4>
                <p className="text-gray-600">
                  Immediate steps to start reversing your symptoms within days
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">📱 Tracking Tools</h4>
                <p className="text-gray-600">
                  Simple daily trackers to monitor your progress and recovery
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-3">💊 Supplement Guide</h4>
                <p className="text-gray-600">
                  Exact supplements that target your specific symptom pattern
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripwirePage;
