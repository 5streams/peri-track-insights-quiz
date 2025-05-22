
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, BarChart, Calendar, List } from "lucide-react";

const AppFeaturesShowcase: React.FC = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-[#9b87f5]" />,
      title: "Daily Tracking Made Simple",
      description: "Log your symptoms in just 30 seconds with our intuitive interface. Track everything from hot flashes to brain fog to mood changes.",
      color: "bg-[#F8F6FF]",
      border: "border-[#D6BCFA]"
    },
    {
      icon: <LineChart className="h-8 w-8 text-[#A7C4A0]" />,
      title: "See Your Patterns",
      description: "Visualize how your symptoms connect to your hormone fluctuations. Finally understand why you feel different at different times.",
      color: "bg-[#F1F8F0]",
      border: "border-[#A7C4A0]"
    },
    {
      icon: <BarChart className="h-8 w-8 text-[#FFECD6]" />,
      title: "Predict & Prepare",
      description: "Know in advance when you're likely to have difficult days. Plan important meetings and events around your hormone patterns.",
      color: "bg-[#FFFAF0]",
      border: "border-[#FFECD6]"
    },
    {
      icon: <List className="h-8 w-8 text-[#FFD6CC]" />,
      title: "Get Targeted Solutions",
      description: "Receive specific recommendations for foods, supplements, and lifestyle changes based on your unique symptom patterns.",
      color: "bg-[#FFF5F5]",
      border: "border-[#FFD6CC]"
    }
  ];

  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-[#5D4154] text-center mb-6">
          Everything You Get With Peritrack
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-demo ${feature.color} p-5 rounded-lg border ${feature.border}/50 flex flex-col`}
            >
              <div className="flex items-center justify-center h-32 bg-white/70 rounded-lg border border-gray-100 shadow-sm mb-4">
                <div className="p-3 rounded-full bg-white shadow-md">
                  {feature.icon}
                </div>
              </div>
              
              <div className="feature-description">
                <h3 className="font-semibold text-lg text-[#5D4154] mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-[#F9F5FF]/30 p-4 rounded-lg border border-[#9b87f5]/20 mt-6">
          <p className="text-center text-[#5D4154] font-medium">
            "87% of women report feeling more in control of their symptoms within the first 14 days of using Peritrack"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppFeaturesShowcase;
