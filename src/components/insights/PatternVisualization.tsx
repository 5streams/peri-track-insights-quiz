
import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PatternVisualizationProps {
  timeWindow?: number; // Days to display (7, 30, 90)
}

const PatternVisualization: React.FC<PatternVisualizationProps> = ({ timeWindow = 30 }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Load tracking data from localStorage
    loadChartData();
  }, [timeWindow]); // Re-load data when timeWindow changes
  
  const loadChartData = () => {
    try {
      const trackingData = localStorage.getItem("trackingData");
      if (!trackingData) {
        // Use sample data if no tracking data exists
        setChartData(generateSampleData(timeWindow));
        return;
      }
      
      const parsedData = JSON.parse(trackingData);
      // Sort by date
      parsedData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Filter data based on timeWindow
      const filteredData = filterDataByTimeWindow(parsedData, timeWindow);
      
      // Transform into chart data format
      const processedData = filteredData.map((entry: any) => {
        const date = new Date(entry.date);
        const formattedDate = `${(date.getMonth() + 1)}/${date.getDate()}`;
        
        // Count symptoms by category
        const physicalCount = entry.symptoms?.physical?.length || 0;
        const emotionalCount = entry.symptoms?.emotional?.length || 0;
        const sleepCount = entry.symptoms?.sleep?.length || 0;
        
        return {
          name: formattedDate,
          'Hot Flashes': physicalCount > 0 ? Math.floor(Math.random() * 4) + 1 : 0, // Sample data for now
          'Sleep Disruptions': sleepCount > 0 ? Math.floor(Math.random() * 5) + 1 : 0,
          'Mood Changes': emotionalCount > 0 ? Math.floor(Math.random() * 5) + 1 : 0,
        };
      });
      
      if (processedData.length > 0) {
        setChartData(processedData);
      } else {
        setChartData(generateSampleData(timeWindow));
      }
    } catch (error) {
      console.error("Error loading chart data:", error);
      setChartData(generateSampleData(timeWindow));
    }
  };
  
  const filterDataByTimeWindow = (data: any[], days: number) => {
    if (!days) return data;
    
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return data.filter((entry: any) => {
      const entryDate = new Date(entry.date);
      return entryDate >= cutoffDate && entryDate <= now;
    });
  };
  
  const generateSampleData = (days: number = 30) => {
    // Sample data in case there's no tracking data
    const today = new Date();
    const sampleData = [];
    
    // Determine how many data points to generate based on the time window
    const dataPointCount = days === 7 ? 7 : days === 30 ? 11 : 12;
    const dayStep = days === 7 ? 1 : days === 30 ? 3 : 8;
    
    for (let i = 0; i < dataPointCount; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (dataPointCount - 1 - i) * dayStep);
      
      sampleData.push({
        name: `${(date.getMonth() + 1)}/${date.getDate()}`,
        'Hot Flashes': Math.floor(Math.random() * 5) + 1,
        'Sleep Disruptions': Math.floor(Math.random() * 5) + 1,
        'Mood Changes': Math.floor(Math.random() * 5) + 1,
      });
    }
    
    return sampleData;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" stroke="#6D6875" tick={{ fontSize: 12 }} />
        <YAxis stroke="#6D6875" tick={{ fontSize: 12 }} />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: "white", 
            borderRadius: "8px", 
            border: "none", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
          }} 
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="Hot Flashes" 
          stackId="1" 
          stroke="#FF9B85" 
          fill="#FF9B85" 
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="Sleep Disruptions" 
          stackId="2" 
          stroke="#5D4154" 
          fill="#5D4154" 
          fillOpacity={0.6}
        />
        <Area 
          type="monotone" 
          dataKey="Mood Changes" 
          stackId="3" 
          stroke="#A7C4A0" 
          fill="#A7C4A0" 
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PatternVisualization;
