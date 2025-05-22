
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface LunaAIDeepDiveProps {
  scoreCategory: string;
  primaryHormone: string;
}

const LunaAIDeepDive: React.FC<LunaAIDeepDiveProps> = ({ 
  scoreCategory,
  primaryHormone
}) => {
  // Determine the specific conversation based on score category
  const getConversation = () => {
    switch(scoreCategory) {
      case "mild":
        return {
          question1: "I've been feeling more anxious lately, especially in the evenings. Is this related to perimenopause?",
          answer1: "Based on your mild perimenopause pattern, this evening anxiety is likely related to subtle progesterone changes that are already occurring. Progesterone has a calming effect on the brain, and even small decreases can trigger anxiety, particularly in the evening when cortisol should naturally be decreasing.",
          question2: "Should I start tracking my symptoms even though they're mild?",
          answer2: "Yes! Early tracking is incredibly valuable. By capturing your pattern now, you'll establish your baseline and be able to identify changes much earlier. Women who start tracking in the mild phase typically gain better control of their symptoms and make smoother transitions through perimenopause."
        };
      case "moderate":
        return {
          question1: "I'm waking up at 3am every night and can't get back to sleep. Is this normal?",
          answer1: "Based on your moderate perimenopause pattern, this is very common. Your progesterone levels are declining, which affects GABA production in your brain - the neurotransmitter that keeps you asleep. In our tracking database, 78% of women with your pattern experience this exact same 3am wakeup issue.",
          question2: "Should I ask my doctor about hormone testing?",
          answer2: "Yes! With your moderate symptom pattern, I recommend asking about estradiol, progesterone, and FSH testing. Most traditional doctors only check FSH, but your symptoms strongly suggest fluctuating estrogen with low progesterone. I've prepared a list of specific questions you can take to your appointment to ensure you get the right tests."
        };
      case "severe":
        return {
          question1: "My mood swings are affecting my relationships. Some days I feel fine and the next day I'm overwhelmed by emotions. Why is this happening?",
          answer1: "Your severe pattern shows classic signs of significant estrogen fluctuations. When estrogen drops rapidly, it directly impacts serotonin production in your brain, which controls mood. What you're experiencing isn't random or a character flaw - it's a biological response to these hormonal shifts. 82% of women with your pattern report these exact same rapid mood changes.",
          question2: "My doctor just told me to 'wait it out' - is there really nothing I can do?",
          answer2: "Many doctors unfortunately aren't trained in managing perimenopause symptoms. With your severe pattern, there are several evidence-based approaches worth considering. Based on your specific symptoms, I can help you prepare a detailed report for your next appointment that explains exactly what's happening hormonally and the treatment options supported by current research."
        };
      default:
        return {
          question1: "I'm waking up at 3am every night and can't get back to sleep. Is this normal?",
          answer1: "Based on your perimenopause pattern, this is very common. Your progesterone levels are likely declining, which affects GABA production in your brain - the neurotransmitter that keeps you asleep.",
          question2: "Should I ask my doctor about hormone testing?",
          answer2: "Yes! Based on your symptoms, I recommend asking about estradiol, progesterone, and FSH testing. I've prepared a list of specific questions you can take to your appointment."
        };
    }
  };

  const conversation = getConversation();
  
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-6">
          <MessageCircle className="h-6 w-6 text-[#9b87f5] mr-2" />
          <h2 className="text-2xl font-bold text-[#5D4154]">Meet Luna: Your 24/7 Perimenopause Coach</h2>
        </div>
        
        <div className="bg-[#F9F5FF]/50 p-4 md:p-6 rounded-lg mb-6 border border-[#D6BCFA]/20">
          <div className="chat-message user bg-white p-3 rounded-lg shadow-sm mb-4 ml-auto max-w-[80%]">
            <p className="text-[#5D4154]">{conversation.question1}</p>
          </div>
          
          <div className="chat-message luna bg-[#F8F6FF] p-3 rounded-lg border border-[#9b87f5]/20 shadow-sm mb-4 max-w-[80%]">
            <p className="text-[#5D4154]">{conversation.answer1}</p>
          </div>
          
          <div className="chat-message user bg-white p-3 rounded-lg shadow-sm mb-4 ml-auto max-w-[80%]">
            <p className="text-[#5D4154]">{conversation.question2}</p>
          </div>
          
          <div className="chat-message luna bg-[#F8F6FF] p-3 rounded-lg border border-[#9b87f5]/20 shadow-sm max-w-[80%]">
            <p className="text-[#5D4154]">{conversation.answer2}</p>
          </div>
        </div>
        
        <div className="luna-features">
          <h3 className="font-semibold text-[#5D4154] mb-3 text-center">What Luna Can Do For You:</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Answer any perimenopause question, day or night",
              "Explain your symptoms in simple terms",
              "Suggest specific foods, exercises, and supplements for your pattern",
              "Help you prepare for doctor appointments",
              "Provide emotional support when you need it most",
              "Track your progress and celebrate improvements"
            ].map((feature, index) => (
              <div key={index} className="flex items-start p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                <span className="text-[#A7C4A0] font-bold mr-2">✓</span>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LunaAIDeepDive;
