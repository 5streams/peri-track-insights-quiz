
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface OfferSectionProps {
  scoreCategory: string;
  primaryHormone: string;
  symptoms: string[];
}

const OfferSection: React.FC<OfferSectionProps> = ({
  scoreCategory,
  primaryHormone,
  symptoms
}) => {
  const navigate = useNavigate();
  
  // Get headline based on score category
  const getHeadline = () => {
    switch (scoreCategory) {
      case "minimal":
        return "Maintain Your Hormone Health with Peritrack";
      case "early":
        return "Your Personalized Early Intervention Plan";
      case "moderate":
        return "Your Personalized Hormone Balancing Solution";
      case "significant":
        return "Your Comprehensive Hormone Balancing Solution";
      default:
        return "Your Personalized Hormone Support Plan";
    }
  };
  
  // Get offer items based on score category
  const getOfferItems = () => {
    switch (scoreCategory) {
      case "minimal":
        return [
          {
            title: "Baseline Hormone Tracking",
            description: "Establish your personal patterns while you're feeling well",
            value: 49
          },
          {
            title: "Early Detection System",
            description: "Identify subtle changes before they become noticeable",
            value: 67
          },
          {
            title: "Preventative Protocol",
            description: "Personalized recommendations to maintain hormone balance",
            value: 59
          },
          {
            title: "Luna AI Support",
            description: "24/7 guidance on hormone health questions",
            value: 79
          }
        ];
      case "early":
        return [
          {
            title: "Personal Hormone Pattern Analysis",
            description: "Understanding your specific early-stage changes",
            value: 79
          },
          {
            title: "Early Intervention Protocol",
            description: "Targeted recommendations for your exact symptoms",
            value: 89
          },
          {
            title: "Pattern Detection Technology",
            description: "Identify your unique triggers and optimal timing",
            value: 67
          },
          {
            title: "Luna AI Support",
            description: "24/7 guidance through your transition",
            value: 79
          },
          {
            title: "BONUS: \"Optimal Intervention Guide\"",
            description: "Specific to your pattern",
            value: 47
          }
        ];
      case "moderate":
        return [
          {
            title: "Comprehensive Three-Hormone Analysis",
            description: "Understanding your unique pattern",
            value: 97
          },
          {
            title: "Personalized Symptom-Specific Protocol",
            description: "Targeted recommendations for your exact symptoms",
            value: 89
          },
          {
            title: "AI-Powered Pattern Recognition",
            description: "Identify your unique triggers and optimal intervention timing",
            value: 79
          },
          {
            title: "Luna AI Support",
            description: "24/7 guidance for symptom management",
            value: 79
          },
          {
            title: "BONUS: \"Rapid Relief Protocol\"",
            description: "For your specific symptoms",
            value: 47
          }
        ];
      case "significant":
        return [
          {
            title: "Advanced Three-Hormone Analysis",
            description: "Deep understanding of your complex pattern",
            value: 127
          },
          {
            title: "Personalized Relief Protocol",
            description: "Targeted recommendations for your specific symptoms",
            value: 97
          },
          {
            title: "AI-Powered Pattern Recognition",
            description: "Identify your unique triggers and optimal intervention timing",
            value: 79
          },
          {
            title: "Priority Luna AI Support",
            description: "24/7 guidance for immediate symptom management",
            value: 89
          },
          {
            title: "Lab Interpretation Tools",
            description: "Understand what tests to request and what results mean",
            value: 67
          },
          {
            title: "BONUS: \"Emergency Relief Protocol\"",
            description: "For your most severe symptoms",
            value: 57
          }
        ];
      default:
        return [
          {
            title: "Hormone Pattern Analysis",
            description: "Understanding your unique pattern",
            value: 97
          },
          {
            title: "Personalized Protocol",
            description: "Targeted recommendations for your symptoms",
            value: 89
          },
          {
            title: "Pattern Recognition",
            description: "Identify your triggers and optimal timing",
            value: 79
          },
          {
            title: "Luna AI Support",
            description: "24/7 guidance and support",
            value: 79
          }
        ];
    }
  };
  
  // Calculate total value
  const totalValue = getOfferItems().reduce((sum, item) => sum + item.value, 0);
  
  // Handle start trial
  const handleStartTrial = () => {
    // Set trial start date
    localStorage.setItem("trialStartDate", new Date().toString());
    // Navigate to dashboard
    navigate("/dashboard");
  };
  
  // Get the urgency element for significant symptoms
  const getUrgencyElement = () => {
    if (scoreCategory === "significant") {
      return (
        <div className="urgency-element bg-[#5D4154]/5 p-4 rounded-lg mb-5 text-center">
          <p className="text-[#5D4154] font-medium">
            Women with your exact hormone pattern who begin tracking now typically see initial improvements within 14-21 days. Don't wait for symptoms to worsen further.
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Get time frame based on primary hormone and score category
  const getTimeframe = () => {
    if (scoreCategory === "minimal") return null;
    
    const baseFrames = {
      progesterone: "14-21",
      estradiol: "16-24",
      testosterone: "12-18"
    };
    
    return baseFrames[primaryHormone.toLowerCase() as keyof typeof baseFrames] || "14-21";
  };

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 border-t-4 border-[#A7C4A0] bg-gradient-to-br from-[#FFECD6]/60 to-white hover:shadow-xl transition-all duration-300">
      <CardContent className="p-5 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-center text-[#5D4154] mb-6">
          {getHeadline()}
        </h3>
        
        <div className="max-w-xl mx-auto">
          <div className="offer-details bg-white p-5 rounded-lg border border-gray-200 mb-6">
            <h4 className="font-bold text-[#5D4154] mb-4">Your 7-Day Free Trial Includes:</h4>
            
            <ul className="space-y-4">
              {getOfferItems().map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#A7C4A0]/20 flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-[#A7C4A0]" />
                  </div>
                  <div className="ml-3">
                    <p className="text-[#5D4154] font-medium">{item.title}</p>
                    <p className="text-gray-500 text-sm">
                      {item.description} <span className="line-through">${item.value} value</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="value-highlight bg-[#5D4154]/5 p-4 rounded-lg mt-5 text-center">
              <p className="font-semibold text-[#5D4154]">
                TOTAL VALUE: <span className="line-through">${totalValue}</span> - <span className="text-lg font-bold">YOURS FREE</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                For 7 days, then just $14/month if you choose to continue
              </p>
            </div>
          </div>
          
          {getUrgencyElement()}
          
          <div className="cta-container text-center mb-5">
            <Button 
              onClick={handleStartTrial}
              className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 w-full md:w-auto text-base md:text-lg"
            >
              START MY FREE TRIAL{scoreCategory === "significant" ? " NOW" : ""}
            </Button>
            
            <p className="no-card text-sm text-gray-600 mt-3">
              No credit card required. Cancel anytime.
            </p>
          </div>
          
          {getTimeframe() && (
            <p className="text-center text-base text-[#5D4154]">
              Women with your {scoreCategory === "early" ? "exact early-stage pattern" : "hormone pattern"} typically see initial improvement within {getTimeframe()} days.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferSection;
