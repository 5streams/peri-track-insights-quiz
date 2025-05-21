
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ThumbsUp, ThumbsDown, Clock, Bookmark } from "lucide-react";

const RecommendationsList = () => {
  const categories = ["All", "Nutrition", "Movement", "Sleep", "Stress", "Environment"];
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-xs md:text-sm">{category}</TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-0 space-y-4">
            {/* For brevity we'll show the same recommendations for all tabs */}
            <Card className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-[#5D4154]/5 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-[#A7C4A0]/10 text-[#A7C4A0] border-[#A7C4A0]/20">
                    Sleep Support
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-[#5D4154] text-lg mb-1">
                  Optimize Your Bedroom Temperature
                </h3>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Takes 10 minutes to implement</span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Keep your bedroom between 65-68°F (18-20°C) at night. Studies show this temperature range promotes 
                  deeper sleep and can reduce night sweats, which your tracking shows occur 3-4 times weekly.
                </p>
                
                <div className="bg-[#FFECD6]/20 p-3 rounded-lg mb-4 text-sm">
                  <p className="text-[#5D4154]/80 font-medium">Why this works for you:</p>
                  <p className="text-gray-600">
                    Your symptoms show strong correlation between room temperature and sleep quality. 
                    Your hot flashes predominantly occur at night, and temperature regulation can help manage them.
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ThumbsUp className="h-3 w-3" /> Helpful
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ThumbsDown className="h-3 w-3" /> Not Helpful
                    </Button>
                  </div>
                  <Button size="sm" className="h-8 bg-[#5D4154] hover:bg-[#5D4154]/90 gap-1">
                    <Heart className="h-3 w-3" /> Save
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-[#5D4154]/5 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-[#FF9B85]/10 text-[#FF9B85] border-[#FF9B85]/20">
                    Hot Flash Relief
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-[#5D4154] text-lg mb-1">
                  Paced Breathing Technique
                </h3>
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>2 minutes at onset of hot flash</span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  When you feel a hot flash beginning, practice slow, deep breathing: inhale for 5 seconds, hold for 2 seconds, 
                  exhale for 5 seconds. Continue for 2 minutes. This activates your parasympathetic nervous system, which can reduce 
                  hot flash intensity.
                </p>
                
                <div className="bg-[#FFECD6]/20 p-3 rounded-lg mb-4 text-sm">
                  <p className="text-[#5D4154]/80 font-medium">Why this works for you:</p>
                  <p className="text-gray-600">
                    Your tracking shows hot flashes are most intense when you're experiencing stress or anxiety. 
                    This technique addresses both the hot flash itself and the anxiety component.
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ThumbsUp className="h-3 w-3" /> Helpful
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ThumbsDown className="h-3 w-3" /> Not Helpful
                    </Button>
                  </div>
                  <Button size="sm" className="h-8 bg-[#5D4154] hover:bg-[#5D4154]/90 gap-1">
                    <Heart className="h-3 w-3" /> Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-[#FFECD6]/30 p-4 rounded-lg text-center">
        <h3 className="font-medium text-[#5D4154] mb-2">Want more personalized recommendations?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Continue tracking your symptoms daily to receive increasingly accurate and personalized solutions.
        </p>
        <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90">
          View Premium Recommendations
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsList;
