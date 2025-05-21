import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import HormoneVisualization from "./HormoneVisualization";
import { Progress } from "@/components/ui/progress";

interface ResultsSummaryProps {
  score: number;
  scoreCategory: string;
  primaryHormone: string;
  secondaryHormones: string[];
  symptoms: string[];
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  score,
  scoreCategory,
  primaryHormone,
  secondaryHormones,
  symptoms
}) => {
  // Format the symptom names for display
  const formatSymptoms = (symptoms: string[]) => {
    return symptoms.map(symptom => {
      return symptom
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/Changes|Symptoms/g, '')
        .trim();
    });
  };
  
  const formattedSymptoms = formatSymptoms(symptoms);
  
  // Get headline based on score category
  const getHeadline = () => {
    switch (scoreCategory) {
      case "minimal":
        return "Good News: You're Showing Minimal Signs of Perimenopause";
      case "early":
        return "You're in Early Perimenopause Transition";
      case "moderate":
        return "We've Identified Your Specific Hormone Pattern";
      case "significant":
        return "We've Identified Your Significant Hormone Imbalance Pattern";
      default:
        return "We've Analyzed Your Hormone Pattern";
    }
  };
  
  // Get description text based on score category
  const getDescription = () => {
    const symptomsText = formattedSymptoms.length > 0 ? 
      formattedSymptoms.slice(0, 3).join(", ").replace(/,([^,]*)$/, ' and$1') : 
      "your reported symptoms";
    
    switch (scoreCategory) {
      case "minimal":
        return "Based on your responses, you're currently experiencing few or no perimenopause symptoms. Your hormone patterns appear well-balanced with no significant imbalances detected.";
      case "early":
        return `Based on your responses, you're experiencing early hormone shifts that explain your reported symptoms of ${symptomsText}.`;
      case "moderate":
        return `Based on your detailed responses, you're experiencing a clear perimenopause pattern that explains your reported symptoms of ${symptomsText}.`;
      case "significant":
        return `Based on your detailed responses, you're experiencing a substantial hormone imbalance that directly explains your reported symptoms of ${symptomsText}.`;
      default:
        return `Based on your responses, we've analyzed your hormone pattern in relation to your reported symptoms of ${symptomsText}.`;
    }
  };
  
  // Get symptom severity data
  const getSymptomSeverity = (index: number) => {
    const baseScores = {
      minimal: [20, 15, 10],
      early: [45, 40, 30],
      moderate: [65, 60, 50],
      significant: [85, 75, 70]
    };
    
    const category = scoreCategory as keyof typeof baseScores;
    const baseScore = baseScores[category]?.[index] || 50;
    
    // Add some randomization but keep within reasonable range
    const variance = Math.floor(Math.random() * 11) - 5; // -5 to +5
    return Math.min(95, Math.max(15, baseScore + variance));
  };
  
  // Get hormone explanation texts based on score category and primary hormone
  const getHormoneText = (hormone: string) => {
    const decline = scoreCategory === "minimal" ? "0-10%" : 
                  scoreCategory === "early" ? "15-20%" :
                  scoreCategory === "moderate" ? "30-40%" : "45-55%";
                  
    const fluctuation = scoreCategory === "minimal" ? "normal fluctuations" : 
                      scoreCategory === "early" ? "mild fluctuations" :
                      scoreCategory === "moderate" ? "notable fluctuations" : "pronounced fluctuations";
                      
    const decrease = scoreCategory === "minimal" ? "0-10%" : 
                   scoreCategory === "early" ? "10-15%" :
                   scoreCategory === "moderate" ? "25-35%" : "40-50%";
                   
    switch (hormone.toLowerCase()) {
      case "progesterone":
        return scoreCategory === "minimal" ? 
          "Healthy levels supporting sleep and mood" : 
          `${scoreCategory === "minimal" ? "Normal" : scoreCategory === "early" ? "Early" : scoreCategory === "moderate" ? "Moderate" : "Significant"} decline (${decline}) ${scoreCategory !== "minimal" ? "affecting sleep and mood" : ""}`;
      case "estradiol":
        return scoreCategory === "minimal" ? 
          "Within optimal range with normal fluctuations" : 
          `${fluctuation} ${scoreCategory !== "minimal" ? "affecting temperature regulation and mood stability" : ""}`;
      case "testosterone":
        return scoreCategory === "minimal" ? 
          "Balanced levels supporting energy and vitality" : 
          `${scoreCategory === "minimal" ? "Normal" : scoreCategory === "early" ? "Slight" : scoreCategory === "moderate" ? "Notable" : "Substantial"} decrease (${decrease}) ${scoreCategory !== "minimal" ? "affecting energy and motivation" : ""}`;
      default:
        return "Normal hormone levels";
    }
  };

  // Validation message for significant symptoms
  const validationMessage = scoreCategory === "significant" ? (
    <div className="bg-[#5D4154]/5 p-4 rounded-lg mb-5 text-center">
      <p className="text-[#5D4154] font-medium">
        What you're experiencing isn't "just aging," "just stress," or "all in your head" - 
        it's a real biological response to significant hormone changes happening in your body right now.
      </p>
    </div>
  ) : null;

  // Conclusion text based on score category
  const getConclusionText = () => {
    switch (scoreCategory) {
      case "minimal":
        return "This balanced hormone profile explains why you're feeling generally well without significant symptoms.";
      case "early":
        return "This early-stage pattern is why you're noticing subtle changes while still feeling generally well most days.";
      case "moderate":
        return "This specific three-hormone imbalance explains why you're experiencing your particular symptom cluster and why generic approaches may provide limited relief.";
      case "significant":
        return "This specific three-hormone imbalance explains why your symptoms feel so intense and why standard approaches have provided limited relief.";
      default:
        return "This hormone pattern explains your current symptoms and experiences.";
    }
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-[#5D4154] mb-4">
          {getHeadline()}
        </h3>
        
        <p className="text-base md:text-lg text-[#5D4154]/80 mb-5">
          {getDescription()}
        </p>
        
        {validationMessage}
        
        {/* Symptom Severity Section */}
        {scoreCategory !== "minimal" && (
          <div className="mb-6">
            <h4 className="font-semibold text-[#5D4154] mb-3">YOUR PRIMARY CONCERNS:</h4>
            <div className="space-y-4">
              {formattedSymptoms.slice(0, 3).map((symptom, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-[#5D4154]">{symptom}</span>
                    <span className="text-sm font-medium text-gray-500">
                      {getSymptomSeverity(index)}/100
                    </span>
                  </div>
                  <Progress 
                    value={getSymptomSeverity(index)} 
                    className="h-2" 
                    style={{
                      background: "#e5e7eb", 
                      "--tw-progress-primary": `${index === 0 ? "#FF9B85" : index === 1 ? "#F9C784" : "#A7C4A0"}`
                    } as any}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="hormone-status">
          <div className="w-full h-48 md:h-64 bg-white rounded-lg mb-4">
            <HormoneVisualization 
              primaryHormone={primaryHormone} 
              secondaryHormones={secondaryHormones}
              scoreCategory={scoreCategory}
            />
          </div>
          
          <div className="hormone-explanation bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-[#5D4154] mb-3">
              {scoreCategory === "minimal" ? "Your Current Hormone Balance:" : "Your Three-Hormone Pattern:"}
            </h4>
            
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="font-medium text-[#5D4154] mr-1">Progesterone:</span>
                <span className="text-gray-700">{getHormoneText("progesterone")}</span>
              </li>
              
              <li className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-pink-500 mr-2"></div>
                <span className="font-medium text-[#5D4154] mr-1">Estradiol:</span>
                <span className="text-gray-700">{getHormoneText("estradiol")}</span>
              </li>
              
              <li className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="font-medium text-[#5D4154] mr-1">Testosterone:</span>
                <span className="text-gray-700">{getHormoneText("testosterone")}</span>
              </li>
            </ul>
            
            <p className="mt-4 font-medium text-[#5D4154]">
              {getConclusionText()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsSummary;
