
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
  ReferenceLine
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Brain, Droplet, Circle, Heart, Activity, ThermometerSnowflake } from "lucide-react";

interface SymptomHormoneVisualizationProps {
  symptom: string;
  primaryHormone: string;
}

const SymptomHormoneVisualization: React.FC<SymptomHormoneVisualizationProps> = ({
  symptom,
  primaryHormone
}) => {
  // Generate symptom-specific data based on the primary hormone
  const generateData = () => {
    // Base patterns for different symptoms showing hormone impact
    const symptomPatterns: Record<string, any> = {
      "hot flashes": {
        baseline: [50, 48, 45, 44, 50, 46, 42, 51, 48, 45, 47, 49],
        estradiol: [80, 65, 55, 45, 35, 30, 25, 30, 35, 28, 22, 20],
        impact: [20, 30, 40, 55, 65, 75, 85, 82, 78, 85, 90, 95]
      },
      "mood swings": {
        baseline: [50, 48, 52, 50, 49, 51, 50, 48, 50, 51, 49, 50],
        estradiol: [80, 70, 60, 55, 58, 50, 45, 40, 45, 35, 30, 25],
        impact: [20, 30, 35, 40, 38, 50, 60, 70, 65, 75, 80, 85]
      },
      "brain fog": {
        baseline: [50, 50, 49, 51, 50, 49, 51, 50, 49, 51, 50, 49],
        estradiol: [80, 75, 65, 60, 50, 45, 40, 35, 30, 25, 20, 15],
        impact: [20, 25, 35, 40, 50, 55, 60, 65, 70, 75, 80, 85]
      },
      "sleep issues": {
        baseline: [50, 49, 51, 50, 49, 51, 50, 49, 51, 50, 49, 51],
        progesterone: [90, 80, 70, 65, 60, 50, 45, 40, 35, 30, 25, 20],
        impact: [10, 20, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80]
      },
      "fatigue": {
        baseline: [50, 51, 49, 50, 51, 49, 50, 51, 49, 50, 51, 49],
        estradiol: [80, 70, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15],
        testosterone: [85, 75, 70, 65, 60, 55, 50, 45, 40, 35, 35, 30],
        impact: [20, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
      },
      "weight gain": {
        baseline: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        estradiol: [80, 70, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15],
        impact: [20, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
      }
    };
    
    // Default to mood swings if symptom not found
    const pattern = symptomPatterns[symptom.toLowerCase()] || symptomPatterns["mood swings"];
    
    // Generate data points
    return Array.from({ length: 12 }, (_, i) => {
      const dataPoint: any = { 
        month: `M${i+1}`,
        baseline: pattern.baseline[i],
        impact: pattern.impact[i]
      };
      
      // Add primary hormone data
      if (pattern[primaryHormone.toLowerCase()]) {
        dataPoint[primaryHormone] = pattern[primaryHormone.toLowerCase()][i];
      } else if (primaryHormone.toLowerCase() === "estradiol" && pattern.estradiol) {
        dataPoint[primaryHormone] = pattern.estradiol[i];
      } else if (primaryHormone.toLowerCase() === "progesterone" && pattern.progesterone) {
        dataPoint[primaryHormone] = pattern.progesterone[i];
      } else if (primaryHormone.toLowerCase() === "testosterone" && pattern.testosterone) {
        dataPoint[primaryHormone] = pattern.testosterone[i];
      }
      
      return dataPoint;
    });
  };

  const data = generateData();

  // Get hormone color
  const getHormoneColor = (hormone: string) => {
    switch (hormone.toLowerCase()) {
      case "estradiol": return "#F472B6"; // Pink
      case "progesterone": return "#60A5FA"; // Blue
      case "testosterone": return "#9333EA"; // Purple
      default: return "#94A3B8"; // Gray
    }
  };

  // Get symptom icon
  const getSymptomIcon = () => {
    switch (symptom.toLowerCase()) {
      case "hot flashes": return ThermometerSnowflake;
      case "mood swings": return Activity;
      case "brain fog": return Brain;
      case "sleep issues": return Circle;
      case "fatigue": return Droplet;
      case "weight gain": return Circle;
      default: return Heart;
    }
  };

  const SymptomIcon = getSymptomIcon();

  // Config for chart
  const config = {
    [primaryHormone]: {
      color: getHormoneColor(primaryHormone),
      label: primaryHormone.charAt(0).toUpperCase() + primaryHormone.slice(1)
    },
    impact: {
      color: "#EF4444", // Red for symptom impact
      label: "Symptom Severity"
    },
    baseline: {
      color: "#94A3B8", // Gray for baseline
      label: "Baseline"
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-3 my-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-[#5D4154]/10 flex items-center justify-center">
          <SymptomIcon className="h-4 w-4 text-[#5D4154]" />
        </div>
        <h4 className="font-medium text-[#5D4154]">{symptom} & {primaryHormone} Relationship</h4>
      </div>
      
      <ChartContainer className="h-[180px] w-full" config={config}>
        {/* Fix: Wrap LineChart in a single React.Fragment instead of an empty fragment */}
        <React.Fragment>
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <ReferenceLine y={50} stroke="#CBD5E1" strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="baseline"
              stroke="#94A3B8"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey={primaryHormone} 
              stroke={getHormoneColor(primaryHormone)} 
              strokeWidth={2}
              dot={{ strokeWidth: 1, r: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="impact" 
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ strokeWidth: 1, r: 2 }}
            />
          </LineChart>
        </React.Fragment>
        <ChartTooltip />
      </ChartContainer>
      
      <div className="text-xs text-gray-500 mt-2">
        This visualization shows how {primaryHormone} levels (colored line) correlate with {symptom.toLowerCase()} severity (red line) over time.
      </div>
    </div>
  );
};

export default SymptomHormoneVisualization;
