
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Download, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatternVisualization from "@/components/insights/PatternVisualization";
import RecommendationsList from "@/components/insights/RecommendationsList";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const Insights = () => {
  const navigate = useNavigate();
  const [timeWindow, setTimeWindow] = useState(30); // Default to 30 days
  const { toast } = useToast();

  const handleTimeWindowChange = (days: number) => {
    setTimeWindow(days);
    toast({
      title: "Time window updated",
      description: `Showing data for the last ${days} days`,
      duration: 2000,
    });
  };

  // Determine which time window button should be active
  const getTimeWindowButtonClass = (days: number) => {
    return timeWindow === days 
      ? "h-8 bg-[#5D4154]/5 border-[#5D4154]/20" 
      : "h-8";
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] flex">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <button 
            onClick={() => navigate("/tracking")}
            className="flex items-center text-[#5D4154] font-medium hover:text-[#5D4154]/80 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Tracking
          </button>
          <h1 className="font-playfair text-xl font-bold text-[#5D4154] hidden md:block">Your Insights</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Insights Content */}
        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {/* Time Period Selector */}
          <div className="bg-white shadow-sm rounded-lg mb-6 p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#5D4154]" />
                <h2 className="font-medium text-[#5D4154]">
                  Last {timeWindow} days
                </h2>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={getTimeWindowButtonClass(7)}
                  onClick={() => handleTimeWindowChange(7)}
                >
                  Last 7 days
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={getTimeWindowButtonClass(30)}
                  onClick={() => handleTimeWindowChange(30)}
                >
                  Last 30 days
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={getTimeWindowButtonClass(90)}
                  onClick={() => handleTimeWindowChange(90)}
                >
                  Last 90 days
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8"
                  onClick={() => {
                    toast({
                      title: "Custom range",
                      description: "Custom date range selection coming soon!",
                      duration: 2000,
                    });
                  }}
                >
                  Custom
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Insights Dashboard */}
          <Tabs defaultValue="patterns" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patterns">Symptom Patterns</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="patterns" className="mt-0 space-y-6">
              {/* Symptom Timeline Pattern */}
              <Card className="border-none shadow-sm">
                <CardHeader className="bg-[#FFECD6]/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-playfair text-xl text-[#5D4154]">Symptom Patterns Over Time</CardTitle>
                    <div className="flex items-center text-xs bg-white rounded-full px-3 py-1 border border-gray-200">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>Updated today</span>
                    </div>
                  </div>
                  <CardDescription>
                    Visualizing your most reported symptoms across time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[350px]">
                    <PatternVisualization timeWindow={timeWindow} />
                  </div>
                  
                  <div className="mt-4 bg-[#5D4154]/5 p-4 rounded-lg">
                    <h3 className="font-medium text-[#5D4154] mb-2">Pattern Insight</h3>
                    <p className="text-gray-700 text-sm">
                      Your hot flashes and sleep disruptions appear most frequently in the week before your period. 
                      This pattern is typical of hormonal fluctuations during perimenopause, particularly when estrogen 
                      levels drop before menstruation.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Correlation Analysis */}
              <Card className="border-none shadow-sm">
                <CardHeader className="bg-[#FFECD6]/30">
                  <CardTitle className="font-playfair text-xl text-[#5D4154]">Symptom Correlations</CardTitle>
                  <CardDescription>
                    Understanding which symptoms tend to occur together
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h3 className="font-medium text-[#5D4154] mb-2">Primary Pattern Cluster</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="bg-[#FF9B85]/10 text-[#FF9B85] px-3 py-1 rounded-full text-sm">Hot Flashes</div>
                        <div className="bg-[#FF9B85]/10 text-[#FF9B85] px-3 py-1 rounded-full text-sm">Night Sweats</div>
                        <div className="bg-[#FF9B85]/10 text-[#FF9B85] px-3 py-1 rounded-full text-sm">Sleep Disruptions</div>
                      </div>
                      <p className="text-sm text-gray-600">
                        These symptoms show a 87% correlation - when one occurs, the others are likely to follow within 24 hours.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <h3 className="font-medium text-[#5D4154] mb-2">Secondary Pattern Cluster</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="bg-[#A7C4A0]/10 text-[#A7C4A0] px-3 py-1 rounded-full text-sm">Mood Changes</div>
                        <div className="bg-[#A7C4A0]/10 text-[#A7C4A0] px-3 py-1 rounded-full text-sm">Energy Fluctuations</div>
                        <div className="bg-[#A7C4A0]/10 text-[#A7C4A0] px-3 py-1 rounded-full text-sm">Brain Fog</div>
                      </div>
                      <p className="text-sm text-gray-600">
                        This cluster shows a 72% correlation and tends to occur 2-3 days after poor sleep episodes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="mt-0">
              <RecommendationsList />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Insights;
