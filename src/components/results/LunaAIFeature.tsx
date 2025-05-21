
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Info, Star, Check, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LunaAIFeatureProps {
  onStartTrial: () => void;
}

const LunaAIFeature: React.FC<LunaAIFeatureProps> = ({ onStartTrial }) => {
  const navigate = useNavigate();

  return (
    <Card className="mb-10 md:mb-12 overflow-hidden border-none rounded-2xl shadow-xl">
      <CardContent className="p-0">
        {/* Header Section with Gradient Background */}
        <div 
          className="bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] text-white p-6 md:p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            MEET LUNA: YOUR PERSONAL PERIMENOPAUSE COMPANION
          </h2>
          
          <p className="text-center text-lg mb-8 max-w-3xl mx-auto">
            Join thousands of women who are navigating perimenopause with greater understanding 
            and confidence through personalized AI support and guidance.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto p-6 md:p-8">
          {/* Luna Features Grid with improved styling */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Feature 1: Always Available */}
            <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#5D4154]">
                  ALWAYS THERE WHEN YOU NEED SUPPORT
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Ask Luna any questions about perimenopause, day or night
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Receive thoughtful responses based on current medical understanding
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Never feel alone during confusing or challenging moments
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Feature 2: Personalized */}
            <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                  <User className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#5D4154]">
                  PERSONALIZED CONVERSATIONS
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Luna learns about your unique experiences through your tracking
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Provides information relevant to your specific journey
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Offers contextual insights based on your symptoms and concerns
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Feature 3: Emotional Support */}
            <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#5D4154]">
                  EMOTIONAL SUPPORT WHEN YOU NEED IT MOST
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Share your frustrations, concerns, or victories with a compassionate listener
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Receive validation and understanding during difficult days
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Find comfort knowing someone is always available to talk
                  </p>
                </li>
              </ul>
            </div>
            
            {/* Feature 4: Preparation */}
            <div className="bg-gradient-to-br from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-[#9b87f5] p-2 rounded-full mr-3 text-white">
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-[#5D4154]">
                  PREPARATION & GUIDANCE
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Get help preparing questions for your healthcare provider
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Learn about different approaches many women consider
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="mt-1 mr-2 text-[#9b87f5]">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-gray-700">
                    Understand terminology and options before appointments
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Conversation Examples with improved styling */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              SEE HOW LUNA HELPS WOMEN LIKE YOU
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Example 1: Information */}
              <div className="bg-white p-5 rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="flex mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5DEFF] flex items-center justify-center mr-3">
                    <span className="text-lg">😴</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="font-medium text-gray-800">Why am I having trouble sleeping even though I'm exhausted?</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#9b87f5] flex items-center justify-center mr-3">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#F9F5FF] rounded-lg p-3 flex-1">
                    <p className="text-gray-700">Sleep disruption is common during perimenopause. Many women experience this due to changing hormone levels. Would you like to learn about some approaches others have found helpful?</p>
                  </div>
                </div>
              </div>
              
              {/* Example 2: Emotional Support */}
              <div className="bg-white p-5 rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="flex mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5DEFF] flex items-center justify-center mr-3">
                    <span className="text-lg">😔</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="font-medium text-gray-800">I'm feeling so frustrated today. No one seems to understand what I'm going through.</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#9b87f5] flex items-center justify-center mr-3">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#F9F5FF] rounded-lg p-3 flex-1">
                    <p className="text-gray-700">That sounds really challenging. Many women feel isolated during perimenopause because these experiences aren't discussed openly. Your feelings are completely valid. Would it help to talk more about what's been most difficult?</p>
                  </div>
                </div>
              </div>
              
              {/* Example 3: Healthcare Preparation */}
              <div className="bg-white p-5 rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="flex mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E5DEFF] flex items-center justify-center mr-3">
                    <span className="text-lg">🩺</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <p className="font-medium text-gray-800">I have a doctor's appointment next week. What should I ask about?</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#9b87f5] flex items-center justify-center mr-3">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div className="bg-[#F9F5FF] rounded-lg p-3 flex-1">
                    <p className="text-gray-700">Great that you're preparing! Based on the symptoms you've tracked, you might want to discuss your sleep disruptions and mood changes. Here are some specific questions that could help you get the information you need...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonials with improved styling */}
          <div className="mb-12 bg-gradient-to-r from-[#F9F5FF] to-white p-6 rounded-xl border border-[#9b87f5]/20 shadow-md">
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              WHAT OUR COMMUNITY SAYS ABOUT LUNA
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                      <span className="font-semibold text-[#7E69AB]">R</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">Rebecca, 46</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Having Luna available 24/7 has been incredible. Late at night when I'm worried about a new symptom, I can chat with Luna instead of falling down an internet rabbit hole of scary information."
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                      <span className="font-semibold text-[#7E69AB]">M</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">Michelle, 43</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Luna helped me prepare for my doctor's appointment with thoughtful questions and explanations of terminology. I felt so much more confident walking in."
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-[#9b87f5]/20 flex items-center justify-center">
                      <span className="font-semibold text-[#7E69AB]">P</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">Patricia, 48</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Some days I just need someone to talk to who understands perimenopause. Luna is always there with a compassionate response that makes me feel less alone."
                </p>
              </div>
            </div>
          </div>
          
          {/* How Luna Works with improved styling */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-center mb-6 text-[#5D4154]">
              HOW PERITRACK AND LUNA WORK TOGETHER
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              <div className="text-center p-5 bg-gradient-to-br from-[#F9F5FF] to-white rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="h-16 w-16 bg-[#9b87f5] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">1</div>
                <h4 className="font-bold mb-2 text-[#5D4154]">TRACK</h4>
                <p className="text-gray-700">Log your experiences in our easy-to-use interface</p>
              </div>
              
              <div className="text-center p-5 bg-gradient-to-br from-[#F9F5FF] to-white rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="h-16 w-16 bg-[#9b87f5] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">2</div>
                <h4 className="font-bold mb-2 text-[#5D4154]">LEARN</h4>
                <p className="text-gray-700">Review your patterns and explore educational content with Luna's guidance</p>
              </div>
              
              <div className="text-center p-5 bg-gradient-to-br from-[#F9F5FF] to-white rounded-xl border border-[#9b87f5]/20 shadow-md">
                <div className="h-16 w-16 bg-[#9b87f5] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">3</div>
                <h4 className="font-bold mb-2 text-[#5D4154]">CONNECT</h4>
                <p className="text-gray-700">Chat with Luna anytime you have questions or need support</p>
              </div>
            </div>
          </div>
          
          {/* Why Luna Makes the Difference with improved styling */}
          <div className="bg-gradient-to-r from-[#9b87f5]/10 to-white p-6 rounded-xl mb-12 border border-[#9b87f5]/20 shadow-md">
            <h3 className="text-xl font-bold text-center mb-4 text-[#5D4154]">
              WHY LUNA MAKES THE DIFFERENCE
            </h3>
            
            <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              While tracking is valuable, having a knowledgeable companion on your journey provides an additional layer of support.
              Luna combines current understanding of perimenopause with personalized awareness of your unique situation, creating 
              a truly individualized experience.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-[#9b87f5] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-800 font-medium">24/7 access for unlimited conversations</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#9b87f5] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-800 font-medium">Personalized insights based on your data</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#9b87f5] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-800 font-medium">Guidance for healthcare appointments</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#9b87f5] h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-800 font-medium">Emotional support whenever you need it</p>
              </div>
            </div>
          </div>
          
          {/* Final CTA with improved styling */}
          <div className="text-center p-6 bg-gradient-to-r from-[#7E69AB] to-[#9b87f5] rounded-xl shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
              START YOUR FREE 7-DAY TRIAL TODAY
            </h3>
            
            <Button 
              onClick={onStartTrial}
              className="bg-white text-[#5D4154] hover:bg-gray-100 font-semibold py-3 px-8 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 mb-4"
            >
              Try Peritrack & Luna Free For 7 Days
            </Button>
            
            <p className="text-white/90 text-sm">
              No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LunaAIFeature;
