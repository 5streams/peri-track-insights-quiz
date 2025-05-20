
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
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
    
    // Base patterns for different hormones
    const patterns = {
      estradiol: [80, 65, 85, 60, 75, 50, 65, 45, 60, 40, 55, 35],
      progesterone: [90, 80, 70, 65, 60, 50, 45, 40, 35, 30, 25, 20],
      testosterone: [85, 75, 70, 65, 60, 55, 50, 45, 40, 35, 35, 30]
    };
    
    // Generate data points
    return Array.from({ length: 12 }, (_, i) => {
      const dataPoint: any = { month: `M${i+1}` };
      
      allHormones.forEach(hormone => {
        const basePattern = patterns[hormone.toLowerCase() as keyof typeof patterns] || patterns.estradiol;
        
        // Make primary hormone more pronounced in the visualization
        const multiplier = hormone.toLowerCase() === primaryHormone.toLowerCase() ? 1 : 0.85;
        
        // Add some randomness to make it look more natural
        const randomFactor = hormone.toLowerCase() === primaryHormone.toLowerCase() 
          ? Math.random() * 10 - 5 
          : Math.random() * 6 - 3;
        
        dataPoint[hormone] = Math.max(0, Math.min(100, basePattern[i] * multiplier + randomFactor));
      });
      
      return dataPoint;
    });
  };

  const data = generateData();

  // Define colors for each hormone
  const getHormoneColor = (hormone: string) => {
    switch (hormone.toLowerCase()) {
      case "estradiol": return "#F472B6"; // Pink
      case "progesterone": return "#60A5FA"; // Blue
      case "testosterone": return "#9333EA"; // Purple
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
    [secondaryHormones[0]]: { 
      color: getHormoneColor(secondaryHormones[0]),
      label: getHormoneLabel(secondaryHormones[0])
    },
    [secondaryHormones[1]]: { 
      color: getHormoneColor(secondaryHormones[1]),
      label: getHormoneLabel(secondaryHormones[1])
    }
  };

  return (
    <div className="w-full h-full">
      <ChartContainer className="h-full w-full aspect-[16/9] p-4" config={config}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="month" 
            label={{ value: 'Perimenopause Timeline', position: 'bottom', offset: -5 }} 
          />
          <YAxis 
            label={{ value: 'Hormone Level', angle: -90, position: 'left' }} 
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={primaryHormone} 
            stroke={getHormoneColor(primaryHormone)} 
            strokeWidth={3} 
            dot={{ strokeWidth: 2 }} 
            activeDot={{ r: 6 }}
          />
          {secondaryHormones.map((hormone, idx) => (
            <Line 
              key={hormone}
              type="monotone" 
              dataKey={hormone} 
              stroke={getHormoneColor(hormone)}
              strokeWidth={2}
              strokeDasharray={idx === 0 ? "" : "5 5"}
              dot={{ strokeWidth: 1 }}
            />
          ))}
        </LineChart>
        <ChartTooltip />
      </ChartContainer>
    </div>
  );
};

export default HormoneVisualization;
