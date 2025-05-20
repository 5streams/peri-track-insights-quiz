
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
  Label
} from "recharts";
import {
  ChartContainer,
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
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        estradiol: [80, 65, 55, 45, 35, 30, 25, 30, 35, 28, 22, 20],
        impact: [20, 30, 40, 55, 65, 75, 85, 82, 78, 85, 90, 95],
        criticalPoint: 5, // Index where symptoms significantly increase
        intervention: [null, null, null, null, null, null, null, null, null, 75, 65, 45]
      },
      "mood swings": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        estradiol: [80, 70, 60, 55, 58, 50, 45, 40, 45, 35, 30, 25],
        progesterone: [85, 75, 65, 60, 55, 50, 48, 45, 40, 35, 30, 25],
        impact: [25, 30, 35, 40, 38, 50, 60, 70, 65, 75, 80, 85],
        criticalPoint: 6,
        intervention: [null, null, null, null, null, null, null, null, null, 60, 50, 35]
      },
      "brain fog": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        estradiol: [80, 75, 65, 60, 50, 45, 40, 35, 30, 25, 20, 15],
        progesterone: [85, 80, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25],
        impact: [20, 25, 35, 40, 50, 55, 60, 65, 70, 75, 80, 85],
        criticalPoint: 4,
        intervention: [null, null, null, null, null, null, null, null, null, 65, 55, 40]
      },
      "sleep issues": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        progesterone: [90, 80, 70, 65, 60, 50, 45, 40, 35, 30, 25, 20],
        impact: [10, 20, 30, 35, 40, 50, 55, 60, 65, 70, 75, 80],
        criticalPoint: 5,
        intervention: [null, null, null, null, null, null, null, null, null, 60, 50, 40]
      },
      "fatigue": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        estradiol: [80, 70, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15],
        testosterone: [85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30],
        impact: [20, 25, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
        criticalPoint: 6,
        intervention: [null, null, null, null, null, null, null, null, null, 60, 50, 40]
      },
      "weight gain": {
        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        estradiol: [80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25],
        testosterone: [85, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44, 40],
        impact: [15, 20, 25, 30, 35, 45, 50, 55, 65, 70, 75, 80],
        criticalPoint: 7,
        intervention: [null, null, null, null, null, null, null, null, null, 60, 50, 40]
      }
    };
    
    // Default to mood swings if symptom not found
    const pattern = symptomPatterns[symptom.toLowerCase()] || symptomPatterns["mood swings"];
    
    // Generate data points
    return Array.from({ length: 12 }, (_, i) => {
      const dataPoint: any = { 
        month: pattern.months[i],
        baseline: 50,
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
      
      // Add intervention data
      dataPoint.intervention = pattern.intervention[i];
      
      // Add critical threshold
      dataPoint.criticalThreshold = 50;
      
      return dataPoint;
    });
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

  // Get the symptom-specific insight
  const getSymptomInsight = () => {
    switch (symptom.toLowerCase()) {
      case "hot flashes":
        return `Your ${primaryHormone} decline has reached the critical threshold where hot flashes typically intensify. Without intervention, these are likely to increase in frequency.`;
      case "mood swings":
        return `The fluctuations in your ${primaryHormone} levels create unpredictable mood changes. This pattern explains why your mood symptoms seem to come and go.`;
      case "brain fog":
        return `Your ${primaryHormone} is approaching the level where cognitive symptoms become most noticeable. This explains your recent experiences with brain fog.`;
      case "sleep issues":
        return `Your ${primaryHormone} has fallen below the critical threshold that typically maintains healthy sleep. This is directly causing your sleep disruptions.`;
      case "fatigue":
        return `The decline in your ${primaryHormone} levels correlates directly with increasing fatigue. This hormone plays a key role in your energy regulation.`;
      case "weight gain":
        return `Your changing ${primaryHormone} balance is affecting your metabolism. This pattern commonly leads to increasing difficulty maintaining weight.`;
      default:
        return `Your ${primaryHormone} pattern shows a clear correlation with your ${symptom.toLowerCase()} symptoms.`;
    }
  };

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
    },
    intervention: {
      color: "#22C55E", // Green for intervention
      label: "With Intervention"
    },
    criticalThreshold: {
      color: "#EF4444",
      label: "Critical Threshold"
    }
  };

  // Find critical point from data
  const symptomPatterns: Record<string, any> = {
    "hot flashes": { criticalPoint: 5 },
    "mood swings": { criticalPoint: 6 },
    "brain fog": { criticalPoint: 4 },
    "sleep issues": { criticalPoint: 5 },
    "fatigue": { criticalPoint: 6 },
    "weight gain": { criticalPoint: 7 },
  };
  const criticalIndex = symptomPatterns[symptom.toLowerCase()]?.criticalPoint || 5;
  const criticalMonth = data[criticalIndex].month;

  return (
    <div className="w-full bg-white rounded-lg shadow p-3 my-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-8 w-8 rounded-full bg-[#5D4154]/10 flex items-center justify-center">
          <SymptomIcon className="h-4 w-4 text-[#5D4154]" />
        </div>
        <h4 className="font-medium text-[#5D4154]">{symptom} & {primaryHormone} Relationship</h4>
      </div>
      
      <ChartContainer className="h-[200px] w-full" config={config}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="symptomAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.2}/>
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
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
            <Legend verticalAlign="top" height={20} />
            
            {/* Critical threshold */}
            <ReferenceLine y={50} stroke="#EF4444" strokeDasharray="3 3">
              <Label value="Critical Threshold" position="right" fill="#EF4444" fontSize={10} />
            </ReferenceLine>
            
            {/* Critical point marker */}
            <ReferenceLine x={criticalMonth} stroke="#5D4154" strokeDasharray="3 3">
              <Label value="Symptom Onset" position="top" fill="#5D4154" fontSize={10} />
            </ReferenceLine>
            
            {/* Baseline line */}
            <Line 
              type="monotone" 
              dataKey="baseline"
              stroke="#94A3B8"
              strokeWidth={1}
              strokeDasharray="3 3"
              dot={false}
            />
            
            {/* Primary hormone line */}
            <Line 
              type="monotone" 
              dataKey={primaryHormone} 
              stroke={getHormoneColor(primaryHormone)} 
              strokeWidth={2.5}
              dot={{ strokeWidth: 1, r: 3 }}
              activeDot={{ r: 5 }}
            />
            
            {/* Symptom impact line */}
            <Line 
              type="monotone" 
              dataKey="impact" 
              stroke="#EF4444"
              strokeWidth={2.5}
              dot={{ strokeWidth: 1, r: 3 }}
              activeDot={{ r: 5 }}
            />
            
            {/* Intervention line */}
            <Line 
              type="monotone" 
              dataKey="intervention" 
              stroke="#22C55E"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
            />
            
            {/* Area under symptom impact */}
            <Area
              type="monotone"
              dataKey="impact"
              stroke="none"
              fill="url(#symptomAreaGradient)"
              fillOpacity={0.5}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-[#5D4154]">Key Insight:</span> {getSymptomInsight()}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          The green projection shows the typical improvement pattern with proper tracking and intervention.
        </p>
      </div>
    </div>
  );
};

export default SymptomHormoneVisualization;
