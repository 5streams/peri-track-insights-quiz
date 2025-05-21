
import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const PatternVisualization = () => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Load tracking data from localStorage
    loadChartData();
  }, []);
  
  const loadChartData = () => {
    try {
      const trackingData = localStorage.getItem("trackingData");
      if (!trackingData) {
        // Use sample data if no tracking data exists
        setChartData(generateSampleData());
        return;
      }
      
      const parsedData = JSON.parse(trackingData);
      // Sort by date
      parsedData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      // Transform into chart data format
      const processedData = parsedData.map((entry: any) => {
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
        setChartData(generateSampleData());
      }
    } catch (error) {
      console.error("Error loading chart data:", error);
      setChartData(generateSampleData());
    }
  };
  
  const generateSampleData = () => {
    // Sample data in case there's no tracking data
    const sampleData = [
      { name: '5/1', 'Hot Flashes': 3, 'Sleep Disruptions': 2, 'Mood Changes': 1 },
      { name: '5/4', 'Hot Flashes': 4, 'Sleep Disruptions': 4, 'Mood Changes': 2 },
      { name: '5/7', 'Hot Flashes': 2, 'Sleep Disruptions': 3, 'Mood Changes': 4 },
      { name: '5/10', 'Hot Flashes': 1, 'Sleep Disruptions': 1, 'Mood Changes': 3 },
      { name: '5/13', 'Hot Flashes': 2, 'Sleep Disruptions': 2, 'Mood Changes': 2 },
      { name: '5/16', 'Hot Flashes': 5, 'Sleep Disruptions': 4, 'Mood Changes': 2 },
      { name: '5/19', 'Hot Flashes': 4, 'Sleep Disruptions': 5, 'Mood Changes': 3 },
      { name: '5/22', 'Hot Flashes': 2, 'Sleep Disruptions': 3, 'Mood Changes': 5 },
      { name: '5/25', 'Hot Flashes': 1, 'Sleep Disruptions': 2, 'Mood Changes': 4 },
      { name: '5/28', 'Hot Flashes': 3, 'Sleep Disruptions': 2, 'Mood Changes': 2 },
      { name: '5/31', 'Hot Flashes': 4, 'Sleep Disruptions': 3, 'Mood Changes': 1 },
    ];
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
