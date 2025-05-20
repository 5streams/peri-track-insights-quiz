
import React from "react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent
} from "@/components/ui/chart";

interface PremiumVisualizationProps {
  primaryHormone: string;
  symptoms: string[];
}

const PremiumVisualization: React.FC<PremiumVisualizationProps> = ({ 
  primaryHormone,
  symptoms 
}) => {
  // Generate data based on the primary hormone
  const generateData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Base patterns for different hormones
    const patterns = {
      estradiol: [85, 72, 88, 65, 78, 60, 72, 55, 65, 45, 60, 40],
      progesterone: [90, 82, 75, 68, 62, 55, 48, 42, 36, 30, 25, 20],
      testosterone: [85, 80, 78, 75, 72, 68, 65, 60, 57, 54, 50, 47]
    };
    
    // Select the pattern based on primary hormone
    const pattern = patterns[primaryHormone.toLowerCase() as keyof typeof patterns] || patterns.progesterone;
    
    // Generate data points
    return Array.from({ length: 12 }, (_, i) => ({
      month: months[i],
      [primaryHormone]: pattern[i],
      optimalUpper: 85,
      optimalLower: 65,
      criticalThreshold: 40
    }));
  };

  const data = generateData();
  
  // Get hormone color
  const getHormoneColor = (hormone: string) => {
    switch (hormone.toLowerCase()) {
      case "estradiol": return "#F472B6"; // Pink
      case "progesterone": return "#60A5FA"; // Blue
      case "testosterone": return "#10B981"; // Green
      default: return "#94A3B8"; // Gray
    }
  };
  
  // Config for chart
  const config = {
    [primaryHormone]: { 
      color: getHormoneColor(primaryHormone),
      label: primaryHormone
    },
    optimalZone: {
      color: "rgba(167, 196, 160, 0.15)",
      label: "Optimal Zone"
    },
    criticalThreshold: {
      color: "#EF4444",
      label: "Critical Threshold"
    }
  };

  // Find current position (for annotation)
  const currentPosition = primaryHormone.toLowerCase() === "progesterone" ? 8 : 
                         primaryHormone.toLowerCase() === "estradiol" ? 9 : 7;

  return (
    <Card className="mb-6 md:mb-8 overflow-hidden reveal-section transform opacity-0 hover:shadow-lg transition-all duration-300 bg-white border-t-4 border-[#5D4154]">
      <CardContent className="p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154]/90 mb-5">
          HIGH-VALUE HORMONE INSIGHT
        </h2>
        
        <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4 mb-5 shadow-sm">
          <div className="h-64 md:h-72">
            <ChartContainer className="h-full w-full" config={config}>
              <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 5, bottom: 20 }}>
                  <defs>
                    <linearGradient id="optimalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#A7C4A0" stopOpacity={0.2}/>
                      <stop offset="100%" stopColor="#A7C4A0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10, fill: '#5D4154' }}
                    label={{ value: 'Perimenopause Timeline', position: 'bottom', offset: -5, fill: '#5D4154', fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fontSize: 10, fill: '#5D4154' }}
                    label={{ value: 'Hormone Level', angle: -90, position: 'left', offset: -15, fill: '#5D4154', fontSize: 12 }}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  
                  {/* Optimal zone */}
                  <Area 
                    type="monotone"
                    dataKey="optimalUpper"
                    stroke="none"
                    fill="url(#optimalGradient)"
                    fillOpacity={0.8}
                    activeDot={false}
                    isAnimationActive={false}
                    stackId="2"
                    baseValue={65}
                  />
                  
                  {/* Reference lines */}
                  <ReferenceLine y={85} stroke="#A7C4A0" strokeDasharray="3 3" label={{ value: "Optimal Upper", position: "right", fill: "#A7C4A0", fontSize: 10 }} />
                  <ReferenceLine y={65} stroke="#A7C4A0" strokeDasharray="3 3" label={{ value: "Optimal Lower", position: "right", fill: "#A7C4A0", fontSize: 10 }} />
                  <ReferenceLine y={40} stroke="#EF4444" strokeDasharray="3 3" label={{ value: "Critical Threshold", position: "right", fill: "#EF4444", fontSize: 10 }} />
                  
                  {/* Current position */}
                  <ReferenceLine x={data[currentPosition].month} stroke="#5D4154" label={{ value: "You Are Here", position: "top", fill: "#5D4154", fontSize: 10 }} />
                  
                  {/* Main hormone line */}
                  <Line 
                    type="monotone" 
                    dataKey={primaryHormone} 
                    stroke={getHormoneColor(primaryHormone)} 
                    strokeWidth={3} 
                    dot={{ strokeWidth: 2, r: 4, fill: 'white' }} 
                    activeDot={{ r: 6, stroke: '#5D4154' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="px-2 py-3">
            <p className="text-sm text-[#5D4154] font-medium">
              This premium medical-grade visualization shows your specific hormone pattern:
            </p>
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="mr-2 text-[#5D4154]">•</span>
                Your {primaryHormone.toLowerCase()} levels are {primaryHormone.toLowerCase() === "progesterone" ? "declining" : primaryHormone.toLowerCase() === "estradiol" ? "fluctuating significantly" : "changing"} over time
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#5D4154]">•</span>
                You're currently {primaryHormone.toLowerCase() === "progesterone" || primaryHormone.toLowerCase() === "testosterone" ? "below" : "approaching"} the critical threshold where symptoms intensify
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-[#5D4154]">•</span>
                The optimal hormone range is highlighted for comparison
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-[#F9F5FF] p-4 rounded-lg border border-[#5D4154]/10">
          <p className="text-base text-[#5D4154] font-medium mb-2">
            Your {primaryHormone.toLowerCase() === "progesterone" ? "declining progesterone" : 
                   primaryHormone.toLowerCase() === "estradiol" ? "fluctuating estradiol" : 
                   primaryHormone.toLowerCase() === "testosterone" ? "decreasing testosterone" : 
                   "hormone imbalance"} is directly impacting:
          </p>
          <ul className="space-y-1">
            {symptoms.slice(0, 3).map((symptom, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="text-[#5D4154] mr-2">•</span> 
                {symptom === "hot flashes" ? "Temperature regulation and comfort" : 
                 symptom === "mood swings" ? "Emotional stability and mood balance" : 
                 symptom === "sleep issues" ? "Sleep quality and ability to stay asleep" :
                 symptom === "anxiety" ? "Anxiety levels, especially at night" :
                 symptom === "brain fog" ? "Mental clarity and cognitive function" :
                 symptom === "fatigue" ? "Energy levels throughout the day" :
                 symptom === "weight gain" ? "Metabolism and weight management" :
                 symptom}
              </li>
            ))}
          </ul>
          
          <p className="mt-3 text-base text-[#5D4154]">
            This imbalance begins 5-10 years before menopause, explaining why standard approaches often fail.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumVisualization;
