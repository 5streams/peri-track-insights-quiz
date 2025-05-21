
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Award } from "lucide-react";

const TransformationJourney: React.FC = () => {
  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 border-t-4 border-[#A7C4A0]">
      <CardContent className="p-5 md:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="h-7 w-7 text-[#A7C4A0]" />
          <h2 className="font-playfair text-xl md:text-2xl font-bold text-[#5D4154]">
            YOUR POTENTIAL JOURNEY
          </h2>
        </div>
        
        <p className="mb-6 text-[#5D4154] font-medium text-base md:text-lg">
          What Women Using Our System Have Reported
        </p>
        
        <p className="mb-6 text-gray-600">
          Based on feedback from women using our tracking system:
        </p>
        
        <div className="space-y-6 mb-6">
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">SLEEP IMPROVEMENTS</h3>
            <p className="text-gray-600">
              Many women report gradual improvements in their sleep patterns when they understand their hormone fluctuations and make appropriate adjustments to their routines.
            </p>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "I've noticed improvements in my sleep quality since learning about my hormone patterns" —Michelle
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">ANXIETY MANAGEMENT</h3>
            <p className="text-gray-600">
              Understanding the connection between hormones and anxiety helps many women develop more effective coping strategies during challenging days.
            </p>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "Learning about the hormone-anxiety connection has helped me develop better strategies" —Jennifer
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">EMOTIONAL AWARENESS</h3>
            <p className="text-gray-600">
              Tracking symptoms and understanding their connection to hormonal changes can provide valuable context for emotional experiences.
            </p>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "Understanding the 'why' behind my mood changes has been helpful" —Catherine
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">ENERGY MANAGEMENT</h3>
            <p className="text-gray-600">
              Recognizing patterns in energy levels helps women plan activities around their natural hormonal rhythms, potentially leading to better energy management.
            </p>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "I've learned to adjust my schedule based on my energy patterns" —Sarah
            </p>
          </div>
          
          <div className="bg-[#A7C4A0]/10 p-4 rounded-lg border border-[#A7C4A0]/30">
            <h3 className="text-[#5D4154] font-bold mb-2">COGNITIVE CLARITY</h3>
            <p className="text-gray-600">
              Women often report that understanding the hormonal influences on cognition helps them adjust expectations and implement supportive strategies when needed.
            </p>
            <p className="italic text-gray-600 border-l-4 border-[#A7C4A0]/30 pl-3 mt-2">
              "I've developed strategies for the days when brain fog is more likely" —Lisa
            </p>
          </div>
        </div>
        
        <div className="bg-[#FFECD6]/30 p-4 rounded-lg">
          <p className="text-[#5D4154] text-lg font-medium mb-2">
            Imagine having a better understanding of your body's patterns...
          </p>
          <p className="text-[#5D4154] text-lg font-medium mb-2">
            Imagine having tools and insights to help manage your symptoms...
          </p>
          <p className="text-[#5D4154] text-lg font-medium mb-2">
            Imagine feeling more prepared for hormonal fluctuations...
          </p>
          <p className="text-[#5D4154] text-lg font-medium mt-4">
            With knowledge and the right tools, you can work toward better managing perimenopause symptoms and improving your quality of life.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformationJourney;
