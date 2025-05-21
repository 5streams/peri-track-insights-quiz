
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Info, Star, CircleCheck, CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LunaAIFeatureProps {
  onStartTrial: () => void;
}

const LunaAIFeature: React.FC<LunaAIFeatureProps> = ({ onStartTrial }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden border-none bg-transparent text-white">
      <CardContent className="p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-5">
          MEET LUNA: YOUR PERSONAL PERIMENOPAUSE COMPANION
        </h2>
        
        <div className="max-w-5xl mx-auto">
          {/* Main Description */}
          <p className="text-center mb-8">
            Join thousands of women who are navigating perimenopause with greater understanding and confidence
            through personalized AI support and guidance.
          </p>
          
          {/* Luna Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Feature 1: Always Available */}
            <div className="bg-[#5D4154]/40 p-5 rounded-lg border border-white/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold">
                  ALWAYS THERE WHEN YOU NEED SUPPORT
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Ask Luna any questions about perimenopause, day or night
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Receive thoughtful responses based on current medical understanding
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Never feel alone during confusing or challenging moments
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Feature 2: Personalized */}
            <div className="bg-[#5D4154]/40 p-5 rounded-lg border border-white/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <CircleUser className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold">
                  PERSONALIZED CONVERSATIONS
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Luna learns about your unique experiences through your tracking
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Provides information relevant to your specific journey
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Offers contextual insights based on your symptoms and concerns
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Feature 3: Emotional Support */}
            <div className="bg-[#5D4154]/40 p-5 rounded-lg border border-white/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold">
                  EMOTIONAL SUPPORT WHEN YOU NEED IT MOST
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Share your frustrations, concerns, or victories with a compassionate listener
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Receive validation and understanding during difficult days
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Find comfort knowing someone is always available to talk
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Feature 4: Preparation */}
            <div className="bg-[#5D4154]/40 p-5 rounded-lg border border-white/20 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold">
                  PREPARATION & GUIDANCE
                </h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Get help preparing questions for your healthcare provider
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Learn about different approaches many women consider
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2 mt-1">•</span>
                  <p className="text-sm text-white/90">
                    Understand terminology and options before appointments
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Conversation Examples */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-center mb-4">
              SEE HOW LUNA HELPS WOMEN LIKE YOU
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Example 1: Information */}
              <div className="bg-[#5D4154]/40 p-4 rounded-lg border border-white/10">
                <div className="flex mb-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/30 flex items-center justify-center mr-2">
                    <span className="text-white font-bold">😴</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 shadow-sm text-sm flex-1">
                    <p className="font-medium text-white">Why am I having trouble sleeping even though I'm exhausted?</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center mr-2">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#9b87f5]/20 rounded-lg p-2 shadow-sm text-sm flex-1">
                    <p className="text-white/90">Sleep disruption is common during perimenopause. Many women experience this due to changing hormone levels. Would you like to learn about some approaches others have found helpful?</p>
                  </div>
                </div>
              </div>
              
              {/* Example 2: Emotional Support */}
              <div className="bg-[#5D4154]/40 p-4 rounded-lg border border-white/10">
                <div className="flex mb-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/30 flex items-center justify-center mr-2">
                    <span className="text-white font-bold">😔</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 shadow-sm text-sm flex-1">
                    <p className="font-medium text-white">I'm feeling so frustrated today. No one seems to understand what I'm going through.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center mr-2">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#9b87f5]/20 rounded-lg p-2 shadow-sm text-sm flex-1">
                    <p className="text-white/90">That sounds really challenging. Many women feel isolated during perimenopause because these experiences aren't discussed openly. Your feelings are completely valid. Would it help to talk more about what's been most difficult?</p>
                  </div>
                </div>
              </div>
              
              {/* Example 3: Healthcare Preparation */}
              <div className="bg-[#5D4154]/40 p-4 rounded-lg border border-white/10">
                <div className="flex mb-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white/30 flex items-center justify-center mr-2">
                    <span className="text-white font-bold">🩺</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 shadow-sm text-sm flex-1">
                    <p className="font-medium text-white">I have a doctor's appointment next week. What should I ask about?</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#9b87f5] flex items-center justify-center mr-2">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#9b87f5]/20 rounded-lg p-2 shadow-sm text-sm flex-1">
                    <p className="text-white/90">Great that you're preparing! Based on the symptoms you've tracked, you might want to discuss your sleep disruptions and mood changes. Here are some specific questions that could help you get the information you need...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="mb-8 bg-[#5D4154]/50 p-5 rounded-lg border border-white/10">
            <h3 className="text-lg font-bold text-center mb-4">
              WHAT OUR COMMUNITY SAYS ABOUT LUNA
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#5D4154]/30 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-semibold text-white">R</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Rebecca, 46</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 italic">
                  "Having Luna available 24/7 has been incredible. Late at night when I'm worried about a new symptom, I can chat with Luna instead of falling down an internet rabbit hole of scary information."
                </p>
              </div>
              
              <div className="bg-[#5D4154]/30 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-semibold text-white">M</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Michelle, 43</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 italic">
                  "Luna helped me prepare for my doctor's appointment with thoughtful questions and explanations of terminology. I felt so much more confident walking in."
                </p>
              </div>
              
              <div className="bg-[#5D4154]/30 p-4 rounded-lg shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="font-semibold text-white">P</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Patricia, 48</p>
                  </div>
                </div>
                <p className="text-sm text-white/90 italic">
                  "Some days I just need someone to talk to who understands perimenopause. Luna is always there with a compassionate response that makes me feel less alone."
                </p>
              </div>
            </div>
          </div>
          
          {/* How Luna Works */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-center mb-4">
              HOW PERITRACK AND LUNA WORK TOGETHER
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4">
                <div className="h-12 w-12 bg-[#9b87f5] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                <h4 className="font-bold mb-1">TRACK</h4>
                <p className="text-sm text-white/90">Log your experiences in our easy-to-use interface</p>
              </div>
              
              <div className="text-center p-4">
                <div className="h-12 w-12 bg-[#9b87f5] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                <h4 className="font-bold mb-1">LEARN</h4>
                <p className="text-sm text-white/90">Review your patterns and explore educational content with Luna's guidance</p>
              </div>
              
              <div className="text-center p-4">
                <div className="h-12 w-12 bg-[#9b87f5] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                <h4 className="font-bold mb-1">CONNECT</h4>
                <p className="text-sm text-white/90">Chat with Luna anytime you have questions or need support</p>
              </div>
            </div>
          </div>
          
          {/* Why Luna Makes the Difference */}
          <div className="bg-[#5D4154]/50 p-5 rounded-lg mb-8 border border-white/10">
            <h3 className="text-lg font-bold text-center mb-4">
              WHY LUNA MAKES THE DIFFERENCE
            </h3>
            
            <p className="text-white/90 text-center mb-6">
              While tracking is valuable, having a knowledgeable companion on your journey provides an additional layer of support.
              Luna combines current understanding of perimenopause with personalized awareness of your unique situation, creating 
              a truly individualized experience.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-[#5D4154]/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                  <CircleCheck className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">24/7 access for unlimited conversations</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#5D4154]/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                  <CircleCheck className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Personalized insights based on your data</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#5D4154]/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                  <CircleCheck className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Guidance for healthcare appointments</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#5D4154]/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/20">
                  <CircleCheck className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium">Emotional support whenever you need it</p>
              </div>
            </div>
          </div>
          
          {/* Final CTA */}
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4">
              START YOUR FREE 7-DAY TRIAL TODAY
            </h3>
            
            <Button 
              onClick={onStartTrial}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 mb-4"
            >
              Try Peritrack & Luna Free For 7 Days
            </Button>
            
            <p className="text-sm text-white/80">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LunaAIFeature;
