
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
}

const HormoneVisualization: React.FC<HormoneVisualizationProps> = ({ 
  primaryHormone, 
  secondaryHormones 
}) => {
  // Generate example data based on the primary hormone
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
        
        // Make primary hormone more pronounced in the visualization
        const multiplier = hormone.toLowerCase() === primaryHormone.toLowerCase() ? 1 : 0.9;
        
        // Add some randomness to make it look more natural but less extreme than before
        const randomFactor = hormone.toLowerCase() === primaryHormone.toLowerCase() 
          ? Math.random() * 6 - 3 
          : Math.random() * 4 - 2;
        
        dataPoint[hormone] = Math.max(0, Math.min(100, basePattern[i] * multiplier + randomFactor));
        
        // Add projection data for future months
        if (i >= 9) {
          const projectionFactor = hormone.toLowerCase() === "progesterone" ? 0.85 : 
                                   hormone.toLowerCase() === "estradiol" ? (1 + (Math.random() * 0.4) - 0.2) : 0.92;
          
          dataPoint[`${hormone}Projection`] = dataPoint[hormone] * projectionFactor;
        }
      });
      
      // Add optimal zone indicators
      dataPoint.optimalUpper = 85;
      dataPoint.optimalLower = 65;
      
      // Add critical threshold
      dataPoint.criticalThreshold = 40;
      
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

  return (
    <div className="w-full h-full">
      <ChartContainer className="h-full w-full aspect-[16/9] p-4" config={config}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="optimalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A7C4A0" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#A7C4A0" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="month" 
              label={{ value: 'Perimenopause Timeline', position: 'bottom', offset: -5 }} 
              tick={{ fill: '#5D4154' }}
            />
            <YAxis 
              label={{ value: 'Hormone Level', angle: -90, position: 'left' }} 
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: '#5D4154' }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="top" height={36} />

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
            <ReferenceLine y={85} stroke="#A7C4A0" strokeDasharray="3 3" label={{ value: "Optimal Upper", position: "right", fill: "#A7C4A0" }} />
            <ReferenceLine y={65} stroke="#A7C4A0" strokeDasharray="3 3" label={{ value: "Optimal Lower", position: "right", fill: "#A7C4A0" }} />
            <ReferenceLine y={40} stroke="#EF4444" strokeDasharray="3 3" label={{ value: "Critical Threshold", position: "right", fill: "#EF4444" }} />
            
            {/* Current position */}
            <ReferenceLine x={data[currentPosition].month} stroke="#5D4154" label={{ value: "You Are Here", position: "top", fill: "#5D4154" }} />

            {/* Main hormone lines */}
            <Line 
              type="monotone" 
              dataKey={primaryHormone} 
              stroke={getHormoneColor(primaryHormone)} 
              strokeWidth={3} 
              dot={{ strokeWidth: 2, r: 5, fill: 'white' }} 
              activeDot={{ r: 7, stroke: '#5D4154' }}
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
      
      <div className="bg-white p-3 rounded-lg mt-3 border border-gray-200">
        <h4 className="text-sm font-medium text-[#5D4154] mb-1">Key Insight:</h4>
        <p className="text-xs text-gray-600">
          You are currently in the "Early Transitional Phase" with {primaryHormone.toLowerCase()} showing significant changes.
          This specific pattern explains your current symptoms, and the highlighted area shows your optimal intervention window.
        </p>
      </div>
    </div>
  );
};

export default HormoneVisualization;
