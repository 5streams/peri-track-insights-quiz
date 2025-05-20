
import React from "react";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeModuleProps {
  firstName: string;
  trialDaysLeft: number;
}

const WelcomeModule = ({ firstName, trialDaysLeft }: WelcomeModuleProps) => {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  // Mock onboarding tasks
  const onboardingTasks = [
    { id: 1, title: "Complete your profile", completed: true },
    { id: 2, title: "Track your first day", completed: false },
    { id: 3, title: "Explore your insights", completed: false },
    { id: 4, title: "Learn about your hormones", completed: false }
  ];

  // Tasks completed count
  const tasksCompleted = onboardingTasks.filter(task => task.completed).length;

  return (
    <Card className="border-none shadow-md bg-gradient-to-r from-[#5D4154] to-[#5D4154]/90 text-white overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-2">
              {greeting}, {firstName}
            </h2>
            <p className="text-white/90 mb-4">
              {trialDaysLeft > 0 
                ? `You have ${trialDaysLeft} days left in your free trial.` 
                : "Your free trial has ended. Upgrade now to continue."}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Button className="bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white">
              {trialDaysLeft > 0 ? "Track Today" : "Upgrade Now"}
            </Button>
          </div>
        </div>

        {/* Onboarding Progress - only show if not all tasks completed */}
        {tasksCompleted < onboardingTasks.length && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Getting Started</h3>
              <span className="text-sm">{tasksCompleted}/{onboardingTasks.length} completed</span>
            </div>
            
            <div className="bg-white/20 rounded-full h-1.5 mb-4">
              <div 
                className="bg-[#A7C4A0] h-1.5 rounded-full" 
                style={{ width: `${(tasksCompleted / onboardingTasks.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {onboardingTasks.map(task => (
                <div 
                  key={task.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    task.completed ? 'bg-[#A7C4A0]/20' : 'bg-white/10'
                  }`}
                >
                  <div className={`h-5 w-5 flex items-center justify-center rounded-full ${
                    task.completed ? 'bg-[#A7C4A0]' : 'border border-white/40'
                  }`}>
                    {task.completed && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={task.completed ? 'line-through opacity-80' : ''}>{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WelcomeModule;
