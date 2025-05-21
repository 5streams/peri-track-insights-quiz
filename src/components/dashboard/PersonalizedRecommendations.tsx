
import React, { useState } from "react";
import { Calendar, Info, CheckCircle, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PersonalizedRecommendationsProps {
  firstName: string;
  currentWeek?: number;
  currentPhase?: string;
}

const PersonalizedRecommendations = ({ 
  firstName,
  currentWeek = 2, 
  currentPhase = "Follicular" 
}: PersonalizedRecommendationsProps) => {
  const [savedRecommendation, setSavedRecommendation] = useState(false);
  const [markedAsTried, setMarkedAsTried] = useState(false);
  const [helpfulRating, setHelpfulRating] = useState<string | null>(null);
  
  // Weekly recommendations based on cycle phase
  const weeklyRecommendations = {
    energy: "Increased energy levels",
    sleep: "Potential sleep disruptions",
    cognitive: "Improved cognitive function"
  };

  // Timing-specific recommendations
  const timingRecommendations = [
    "Time demanding mental tasks for Tuesday-Thursday when your focus tends to peak",
    "Prepare for possible sleep disruptions by having your sleep support routine ready",
    "Consider reducing caffeine after 12pm as you're more sensitive during this phase"
  ];

  // Get today's date and calculate the week range
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const weekRange = `${formatDate(weekStart)}-${formatDate(weekEnd)}`;

  const handleSaveRecommendation = () => {
    setSavedRecommendation(true);
    // In a real app, this would save to the user's profile
  };

  const handleMarkAsTried = () => {
    setMarkedAsTried(true);
    // In a real app, this would record in the user's history
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="bg-[#A7C4A0]/10 pb-4">
        <CardTitle className="font-playfair flex items-center text-xl text-[#5D4154]">
          <Calendar className="h-5 w-5 mr-2 text-[#5D4154]" />
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Pattern Detection Card */}
        <div className="mb-6 border border-[#5D4154]/10 rounded-lg overflow-hidden">
          <div className="bg-[#5D4154]/5 p-4 border-b border-[#5D4154]/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#5D4154]">Sleep Disruption Pattern Detected</h3>
              <span className="text-xs text-gray-500">Based on recent tracking</span>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-[#5D4154] mb-4">
              We've noticed you consistently report sleep issues during week {currentWeek} of your cycle.
            </p>
            
            <div className="bg-[#FFECD6]/30 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-[#5D4154] mb-2">Personalized Recommendation:</h4>
              <p className="text-[#5D4154]/90 mb-3">
                Consider taking magnesium glycinate (200-300mg) before bed during this phase of your cycle. 
                Many women with similar patterns find it helps with sleep quality during estrogen fluctuations.
              </p>
              
              <div className="border-t border-[#5D4154]/10 pt-3 mt-3">
                <h5 className="font-medium text-sm text-[#5D4154] mb-1">Timing:</h5>
                <p className="text-sm text-[#5D4154]/80 mb-3">
                  Recommended for: {weekRange} (Week {currentWeek} of your cycle)
                </p>
                
                <h5 className="font-medium text-sm text-[#5D4154] mb-1">Why This Works:</h5>
                <p className="text-sm text-[#5D4154]/80">
                  Magnesium supports GABA production, which can compensate for the declining progesterone 
                  that typically affects sleep during this phase.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Button 
                variant={savedRecommendation ? "outline" : "default"}
                className={savedRecommendation ? "border-[#5D4154]/30 text-[#5D4154]" : "bg-[#5D4154] hover:bg-[#5D4154]/90"} 
                onClick={handleSaveRecommendation}
              >
                {savedRecommendation ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  "Save This Recommendation"
                )}
              </Button>
              
              <Button 
                variant="outline" 
                className="border-[#5D4154]/20 text-[#5D4154]"
                disabled={markedAsTried}
                onClick={handleMarkAsTried}
              >
                {markedAsTried ? "Marked as Tried" : "Mark as Tried"}
              </Button>
            </div>
            
            {markedAsTried && !helpfulRating && (
              <div className="bg-[#F9F5FF] p-3 rounded-lg mb-4">
                <p className="text-sm font-medium text-[#5D4154] mb-2">Was this recommendation helpful?</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#A7C4A0] text-[#A7C4A0] hover:bg-[#A7C4A0]/10"
                    onClick={() => setHelpfulRating("helpful")}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Yes, it helped
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#FF9B85] text-[#FF9B85] hover:bg-[#FF9B85]/10"
                    onClick={() => setHelpfulRating("not-helpful")}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    No, it didn't
                  </Button>
                </div>
              </div>
            )}
            
            {helpfulRating && (
              <div className="bg-[#F9F5FF] p-3 rounded-lg mb-4">
                <p className="text-sm text-[#5D4154]">
                  {helpfulRating === "helpful" 
                    ? "Thank you! We'll use this feedback to improve your future recommendations." 
                    : "We're sorry this didn't help. We'll refine your recommendations based on this feedback."}
                </p>
              </div>
            )}
            
            <div className="bg-[#5D4154]/5 p-3 rounded-lg text-xs text-[#5D4154]/70 flex items-start">
              <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
              <p>
                <span className="font-medium">IMPORTANT:</span> This is a personalized suggestion based on your reported patterns. 
                Always consult with your healthcare provider before starting any new supplement or protocol.
              </p>
            </div>
          </div>
        </div>
        
        {/* Weekly Recommendations */}
        <div className="mb-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[#5D4154]">
              This Week: {weekRange} (Week {currentWeek})
            </h3>
          </div>
          
          <div className="bg-white border border-[#5D4154]/10 rounded-lg p-4 mb-4">
            <p className="text-sm text-[#5D4154] mb-3">Based on your tracking patterns, this week you might experience:</p>
            
            <ul className="space-y-2 mb-4">
              {Object.entries(weeklyRecommendations).map(([key, value]) => (
                <li key={key} className="flex items-start text-sm">
                  <span className="text-[#5D4154] mr-2">•</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium text-sm text-[#5D4154] mb-2">RECOMMENDED THIS WEEK:</h4>
            <ul className="space-y-2 mb-3">
              {timingRecommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="text-[#5D4154] mr-2">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              variant="ghost" 
              className="text-xs text-[#5D4154] hover:bg-[#5D4154]/5 mt-1"
            >
              View All Week {currentWeek} Recommendations <Star className="h-3 w-3 ml-1" />
            </Button>
          </div>
          
          <div className="text-xs text-[#5D4154]/70 flex items-start mt-2">
            <Info className="h-4 w-4 mr-2 flex-shrink-0" />
            <p>
              MEDICAL NOTICE: This information is for educational purposes only and not intended 
              as medical advice. Always consult with your healthcare provider before making changes 
              to your health regimen.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;
