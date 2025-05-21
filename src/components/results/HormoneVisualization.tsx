
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface HormoneVisualizationProps {
  primaryHormone: string;
  secondaryHormones: string[];
  scoreCategory?: string;
}

const HormoneVisualization: React.FC<HormoneVisualizationProps> = ({ 
  primaryHormone, 
  secondaryHormones,
  scoreCategory = "moderate" // Default value to ensure backward compatibility
}) => {
  // Generate example data based on the primary hormone and score category
  const generateData = () => {
    // Example data showing hormone levels over time (perimenopause period)
    // This could be customized based on the user's specific profile
    const allHormones = [primaryHormone, ...secondaryHormones];
    
    // Base patterns for different hormones - making them more distinct
    const patterns = {
      estradiol: [85, 72, 88, 65, 78, 60, 72, 55, 65, 45, 60, 40],
      progesterone: [90, 82, 75, 68, 62, 55, 48, 42, 36, 30, 25, 20],
      testosterone: [85, 80, 78, 75, 72, 68, 65, 60, 57, 54, 50, 47]
    };
    
    // Adjust patterns based on score category
    const adjustPatternForScoreCategory = (basePattern: number[]) => {
      switch(scoreCategory) {
        case "minimal":
          // Minimal symptoms: higher levels, more stable
          return basePattern.map(val => Math.min(100, val + 15));
        case "early":
          // Early symptoms: slightly lower levels
          return basePattern.map(val => Math.min(100, val + 5));
        case "moderate":
          // Moderate symptoms: use base pattern
          return basePattern;
        case "significant":
          // Significant symptoms: lower levels, more dramatic drops
          return basePattern.map(val => Math.max(0, val - 10));
        default:
          return basePattern;
      }
    };
    
    // Months for better context
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Generate data points
    return Array.from({ length: 12 }, (_, i) => {
      const dataPoint: any = { 
        month: months[i],
        label: `Month ${i+1}`
      };
      
      allHormones.forEach(hormone => {
        const basePattern = patterns[hormone.toLowerCase() as keyof typeof patterns] || patterns.estradiol;
        const adjustedPattern = adjustPatternForScoreCategory(basePattern);
        
        // Make primary hormone more pronounced in the visualization
        const multiplier = hormone.toLowerCase() === primaryHormone.toLowerCase() ? 1 : 0.9;
        
        // Add some randomness to make it look more natural but less extreme than before
        const randomFactor = hormone.toLowerCase() === primaryHormone.toLowerCase() 
          ? Math.random() * 6 - 3 
          : Math.random() * 4 - 2;
        
        dataPoint[hormone] = Math.max(0, Math.min(100, adjustedPattern[i] * multiplier + randomFactor));
        
        // Add projection data for future months
        if (i >= 9) {
          const projectionFactor = hormone.toLowerCase() === "progesterone" ? 0.85 : 
                                   hormone.toLowerCase() === "estradiol" ? (1 + (Math.random() * 0.4) - 0.2) : 0.92;
          
          dataPoint[`${hormone}Projection`] = dataPoint[hormone] * projectionFactor;
        }
      });
      
      // Add optimal zone indicators - adjust based on score category
      const optimalAdjustment = scoreCategory === "minimal" ? 0 :
                               scoreCategory === "early" ? -5 :
                               scoreCategory === "moderate" ? -10 :
                               -15;
                               
      dataPoint.optimalUpper = 85 + optimalAdjustment;
      dataPoint.optimalLower = 65 + optimalAdjustment;
      
      // Add critical threshold - adjust based on score category
      dataPoint.criticalThreshold = 40 + (scoreCategory === "significant" ? -5 : 0);
      
      // Add intervention projections for the primary hormone
      if (i >= 9) {
        dataPoint[`${primaryHormone}Intervention`] = 
          patterns[primaryHormone.toLowerCase() as keyof typeof patterns][i-3] * 0.8;
      }
      
      return dataPoint;
    });
  };

  const data = generateData();

  // Define colors for each hormone
  const getHormoneColor = (hormone: string) => {
    switch (hormone.toLowerCase()) {
      case "estradiol": return "#F472B6"; // Pink
      case "progesterone": return "#60A5FA"; // Blue
      case "testosterone": return "#10B981"; // Green
      default: return "#94A3B8"; // Gray
    }
  };

  // Label formatting
  const getHormoneLabel = (hormone: string) => {
    switch (hormone.toLowerCase()) {
      case "estradiol": return "Estradiol";
      case "progesterone": return "Progesterone";
      case "testosterone": return "Testosterone";
      default: return hormone;
    }
  };

  const config = {
    [primaryHormone]: { 
      color: getHormoneColor(primaryHormone),
      label: getHormoneLabel(primaryHormone)
    },
    [`${primaryHormone}Projection`]: {
      color: `${getHormoneColor(primaryHormone)}80`,
      label: `${getHormoneLabel(primaryHormone)} (Projected)`
    },
    [`${primaryHormone}Intervention`]: {
      color: `${getHormoneColor(primaryHormone)}50`,
      label: `With Intervention`
    },
    [secondaryHormones[0]]: { 
      color: getHormoneColor(secondaryHormones[0]),
      label: getHormoneLabel(secondaryHormones[0])
    },
    [secondaryHormones[1]]: { 
      color: getHormoneColor(secondaryHormones[1]),
      label: getHormoneLabel(secondaryHormones[1])
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

  // Current position (for annotation)
  const currentPosition = 8; // Example: Month 9

  // Get the phase description based on score category
  const getPhaseDescription = () => {
    switch(scoreCategory) {
      case "minimal": 
        return "You are showing minimal perimenopause symptoms with hormone levels in optimal ranges.";
      case "early": 
        return "This early-stage pattern is why you're noticing subtle changes while still feeling generally well most days.";
      case "moderate": 
        return "This specific pattern explains why you're experiencing your particular symptom cluster.";
      case "significant":
        return "This pattern explains why your symptoms feel so intense and why generic approaches may not work.";
      default:
        return "You are in the perimenopause \"Transitional Phase\" with hormone changes affecting your wellbeing.";
    }
  };

  // Format hormone details for display in the insight panel
  const formatHormoneDetail = (hormone: string) => {
    const status = {
      estradiol: {
        early: "mild fluctuations affecting temperature regulation and mood stability",
        moderate: "notable fluctuations affecting temperature regulation and mood stability",
        significant: "pronounced fluctuations affecting temperature regulation and mood stability",
        minimal: "within optimal range with normal fluctuations"
      },
      progesterone: {
        early: "Early decline (15-20%) affecting sleep and mood",
        moderate: "Moderate decline (30-40%) affecting sleep and mood",
        significant: "Significant decline (45-55%) affecting sleep and mood",
        minimal: "Healthy levels supporting sleep and mood"
      },
      testosterone: {
        early: "Slight decrease (10-15%) affecting energy and motivation",
        moderate: "Notable decrease (25-35%) affecting energy and motivation",
        significant: "Substantial decrease (40-50%) affecting energy and motivation",
        minimal: "Balanced levels supporting energy and vitality"
      }
    };

    const hormoneKey = hormone.toLowerCase() as keyof typeof status;
    const categoryKey = scoreCategory as keyof (typeof status)[typeof hormoneKey];
    
    return status[hormoneKey]?.[categoryKey] || `Changes affecting your wellbeing`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow">
        <ChartContainer className="h-full w-full aspect-[16/9] p-2" config={config}>
          <ResponsiveContainer>
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="optimalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A7C4A0" stopOpacity={0.2}/>
                  <stop offset="100%" stopColor="#A7C4A0" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fill: '#5D4154', fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: '#5D4154', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <Tooltip 
                content={<ChartTooltipContent />} 
                wrapperStyle={{ zIndex: 1000 }} 
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px' }}
              />

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
              <ReferenceLine 
                y={data[0].optimalUpper} 
                stroke="#A7C4A0" 
                strokeDasharray="3 3" 
                isFront={false}
                label={{ 
                  value: "Optimal Upper", 
                  position: "right", 
                  fill: "#A7C4A0",
                  fontSize: 10,
                  dy: -5
                }} 
              />
              <ReferenceLine 
                y={data[0].optimalLower} 
                stroke="#A7C4A0" 
                strokeDasharray="3 3"
                isFront={false} 
                label={{ 
                  value: "Optimal Lower", 
                  position: "right", 
                  fill: "#A7C4A0",
                  fontSize: 10,
                  dy: -5
                }} 
              />
              <ReferenceLine 
                y={data[0].criticalThreshold} 
                stroke="#EF4444" 
                strokeDasharray="3 3"
                isFront={false} 
                label={{ 
                  value: "Critical Threshold", 
                  position: "right", 
                  fill: "#EF4444",
                  fontSize: 10,
                  dy: -5
                }} 
              />
              
              {/* Current position */}
              <ReferenceLine 
                x={data[currentPosition].month} 
                stroke="#5D4154" 
                label={{ 
                  value: "You Are Here", 
                  position: "top", 
                  fill: "#5D4154",
                  fontSize: 12,
                  dy: -10
                }} 
              />

              {/* Main hormone lines */}
              <Line 
                type="monotone" 
                dataKey={primaryHormone} 
                stroke={getHormoneColor(primaryHormone)} 
                strokeWidth={3} 
                dot={{ strokeWidth: 2, r: 4, fill: 'white' }} 
                activeDot={{ r: 6, stroke: '#5D4154' }}
                animationDuration={1500}
              />
              
              {/* Projection lines */}
              <Line 
                type="monotone" 
                dataKey={`${primaryHormone}Projection`} 
                stroke={`${getHormoneColor(primaryHormone)}80`}
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
                animationDuration={1500}
                animationBegin={500}
              />
              
              {/* Intervention projection */}
              <Line 
                type="monotone" 
                dataKey={`${primaryHormone}Intervention`} 
                stroke={`${getHormoneColor(primaryHormone)}50`}
                strokeWidth={2} 
                strokeDasharray="3 3"
                dot={false}
                animationDuration={1500}
                animationBegin={1000}
              />
              
              {/* Secondary hormones */}
              {secondaryHormones.map((hormone, idx) => (
                <Line 
                  key={hormone}
                  type="monotone" 
                  dataKey={hormone} 
                  stroke={getHormoneColor(hormone)}
                  strokeWidth={2}
                  strokeDasharray={idx === 0 ? "" : "5 5"}
                  dot={{ strokeWidth: 1, r: 3, fill: 'white' }}
                  activeDot={{ r: 5 }}
                  animationDuration={1500}
                  animationBegin={300 * (idx + 1)}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      {/* Hormone Pattern Description Section */}
      <div className="bg-white p-4 rounded-lg mt-2 border border-gray-200 shadow-sm">
        <h4 className="text-sm font-bold text-[#5D4154] mb-3">Your Three-Hormone Pattern:</h4>
        
        <div className="space-y-3">
          {/* Hormone indicators with clear visual separation */}
          {[
            { name: "progesterone", color: "#60A5FA" },
            { name: "estradiol", color: "#F472B6" },
            { name: "testosterone", color: "#10B981" }
          ].map(hormone => (
            <div key={hormone.name} className="flex items-start">
              <div 
                className="w-3 h-3 rounded-full mt-1.5 mr-2 flex-shrink-0" 
                style={{ backgroundColor: hormone.color }}
              ></div>
              <div>
                <span className="font-medium text-[#5D4154]">
                  {hormone.name.charAt(0).toUpperCase() + hormone.name.slice(1)}:
                </span>{" "}
                <span className="text-gray-700 text-sm">{formatHormoneDetail(hormone.name)}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-[#5D4154] font-medium">
            {getPhaseDescription()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HormoneVisualization;
