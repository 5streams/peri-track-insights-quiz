
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { MessageCircle, Star, Info, Check, User } from "lucide-react";

interface LunaAIFeatureProps {
  onStartTrial: () => void;
}

const LunaAIFeature: React.FC<LunaAIFeatureProps> = ({ onStartTrial }) => {
  return (
    <Card className="mb-10 md:mb-12 overflow-hidden border-none rounded-2xl shadow-xl reveal-section transform opacity-0">
      <CardContent className="p-0">
        {/* Transition Section */}
        <div className="bg-gradient-to-b from-white to-[#F9F5FF]/60 p-6 md:p-8 text-center">
          <p className="text-lg md:text-xl text-[#5D4154] mb-4">
            Now that you understand your hormone patterns...
          </p>
          <h3 className="text-xl md:text-2xl font-medium mb-6 text-[#5D4154]">
            What if you had a personal guide to help you navigate these changes every day?
          </h3>
          <p className="max-w-3xl mx-auto text-lg">
            Many women tell us that knowing their patterns is helpful, 
            but having ongoing support makes all the difference in managing symptoms effectively.
          </p>
        </div>
      
        {/* Header Section with Gradient Background */}
        <div 
          className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] text-white p-6 md:p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            🤖 MEET LUNA — YOUR 24/7 PERIMENOPAUSE COACH & EMOTIONAL SUPPORT COMPANION
          </h2>
          
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            You don't have to figure this out alone. Luna's here — anytime, anywhere.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          {/* Introduction */}
          <div className="mb-10 text-center">
            <p className="text-lg mb-6">
              Perimenopause can feel like a maze. One day you're fine, the next you're anxious, exhausted, or fighting back tears — and no one seems to have answers.
            </p>
            <p className="text-lg font-medium mb-6">
              That's why we created Luna.
            </p>
            <p className="text-lg mb-6">
              Luna isn't just an assistant. She's your daily companion, personal guide, and emotional lifeline through every unpredictable wave of perimenopause.
            </p>
          </div>
          
          {/* What Luna Can Do Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-8 text-[#5D4154]">
              🌙 WHAT LUNA CAN DO FOR YOU
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Feature 1: Real-Time Answers */}
              <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#5D4154]">
                    REAL-TIME ANSWERS TO YOUR MOST PERSONAL QUESTIONS
                  </h3>
                </div>
                <p className="text-gray-700">
                  Ask Luna anything — from "Why am I waking up at 3am every night?" to "Should I ask my doctor about progesterone?" She'll explain what's going on, what it means, and what you can do — clearly, compassionately, and without judgment.
                </p>
              </div>
              
              {/* Feature 2: Encouragement */}
              <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                    <Star className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#5D4154]">
                    GENTLE ENCOURAGEMENT WHEN YOU NEED IT MOST
                  </h3>
                </div>
                <p className="text-gray-700">
                  Luna knows when your hormones are likely to dip, when your emotions might feel heavier, and when motivation is hard to find. She's there with daily check-ins, calming words, and simple tips to help you feel grounded again.
                </p>
              </div>
              
              {/* Feature 3: Customized Suggestions */}
              <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                    <Info className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#5D4154]">
                    CUSTOMIZED SUGGESTIONS YOU CAN USE TODAY
                  </h3>
                </div>
                <p className="text-gray-700">
                  Whether you're battling brain fog, low libido, or night sweats, Luna offers personalized, science-backed recommendations — from the best foods to eat this week, to gentle exercise, supplement ideas, breathing techniques, or ways to talk to your doctor.
                </p>
              </div>
              
              {/* Feature 4: Nonstop Support */}
              <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                    <User className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#5D4154]">
                    NONSTOP SUPPORT — EVEN AT 2 A.M.
                  </h3>
                </div>
                <p className="text-gray-700">
                  Can't sleep? Feeling overwhelmed? Luna is awake when your doctor isn't — with emotional support, journaling prompts, or just someone to talk to when no one else gets it.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sample Questions Section */}
          <div className="mb-12 bg-[#F9F5FF]/50 p-6 rounded-xl border border-[#9b87f5]/20 shadow-md">
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              💬 SAMPLE QUESTIONS YOU CAN ASK LUNA
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                <p className="text-[#5D4154] font-medium">"Why do I feel so anxious all of a sudden?"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                <p className="text-[#5D4154] font-medium">"Could this be related to estrogen dropping?"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                <p className="text-[#5D4154] font-medium">"What kind of exercise is best for my energy this week?"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                <p className="text-[#5D4154] font-medium">"How do I prepare for my appointment next week?"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                <p className="text-[#5D4154] font-medium">"I'm just not feeling like myself… what can I do?"</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#9b87f5]/10">
                <p className="text-[#5D4154] font-medium">"Why am I waking up at 3 AM every night?"</p>
              </div>
            </div>
          </div>
          
          {/* Sleep Disruption Explanation - New Section with Image Content */}
          <div className="mb-12 bg-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md">
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              💤 UNDERSTANDING YOUR HORMONE-RELATED SLEEP ISSUES
            </h3>
            
            <div className="bg-[#F9F5FF]/30 p-5 rounded-lg mb-6">
              <p className="text-gray-700 mb-3">
                Progesterone helps your brain produce GABA—a calming neurotransmitter that promotes deep sleep. As levels decline, your sleep architecture changes, making it harder to stay asleep, especially between 2-4 AM when your body's natural cortisol begins rising.
              </p>
              <p className="text-gray-700 font-medium">
                This isn't "just insomnia"—it's a specific hormone-related sleep disruption that requires targeted approaches.
              </p>
            </div>
            
            <p className="text-center italic">
              This is just one example of the detailed explanations Luna provides for your symptoms.
            </p>
          </div>
          
          {/* Backed by Research Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-4 text-[#5D4154]">
              🧠 BACKED BY RESEARCH. BUILT WITH EMPATHY.
            </h3>
            
            <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md text-center">
              <p className="mb-4">
                Luna is trained using up-to-date clinical data on hormone health, combined with insights from thousands of real women navigating perimenopause. Her advice is rooted in science — but her tone is warm, reassuring, and human.
              </p>
              <p className="font-medium">
                She doesn't just tell you what's happening — she helps you understand why, and how to take your power back.
              </p>
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              💜 "IT'S LIKE HAVING A BEST FRIEND WHO ALSO HAPPENS TO BE A HORMONE EXPERT."
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-[#9b87f5]/10">
                <p className="text-gray-700 italic mb-4">
                  "Luna helped me realize I wasn't broken — I was just in a hormonal storm no one warned me about. She's the first thing I check every morning now."
                </p>
                <p className="font-medium text-[#5D4154]">— Carla, 45</p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm border border-[#9b87f5]/10">
                <p className="text-gray-700 italic mb-4">
                  "It's not just answers — it's the tone. Luna made me feel seen. I cried the first time she explained what was going on with my sleep."
                </p>
                <p className="font-medium text-[#5D4154]">— Nina, 48</p>
              </div>
            </div>
          </div>
          
          {/* Final CTA Section - REMOVED */}
          
          {/* Sample Conversation Examples */}
          <div>
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              SEE HOW LUNA HELPS WOMEN LIKE YOU
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Example 1 */}
              <div className="bg-white p-5 rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="flex mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5DEFF] flex items-center justify-center mr-3">
                    <span className="text-lg">👩</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="font-medium text-gray-800">I feel so anxious lately and I don't know why. Is this hormonal?</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#9b87f5] flex items-center justify-center mr-3">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#F9F5FF] rounded-lg p-3 flex-1">
                    <p className="text-gray-700">
                      Yes, this could definitely be hormonal. During perimenopause, fluctuating progesterone levels often trigger anxiety - especially in the week before your period. Looking at your tracking data, I see this pattern emerging. Let me share some specific ways to help manage this anxiety...
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Example 2 */}
              <div className="bg-white p-5 rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="flex mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5DEFF] flex items-center justify-center mr-3">
                    <span className="text-lg">👩</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="font-medium text-gray-800">I have a doctor appointment next week. What should I ask about?</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#9b87f5] flex items-center justify-center mr-3">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#F9F5FF] rounded-lg p-3 flex-1">
                    <p className="text-gray-700">
                      Based on your symptom tracking, I recommend discussing your sleep issues and mood changes. Ask specifically about hormone testing options and whether bioidentical progesterone might help with the anxiety you've been experiencing. I can prepare a printable symptom report for you to take to your appointment...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LunaAIFeature;
