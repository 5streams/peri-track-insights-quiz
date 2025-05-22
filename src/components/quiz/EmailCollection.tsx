
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/utils/leadStorage";

interface EmailCollectionProps {
  onSubmit: (name: string, email: string) => void;
  isLoading: boolean;
}

const EmailCollection: React.FC<EmailCollectionProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address to receive your results.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Get quiz results from localStorage if available
      const quizResults = localStorage.getItem("quizAnswers") 
        ? JSON.parse(localStorage.getItem("quizAnswers") || "{}") 
        : {};
      
      // Save lead to localStorage
      saveLead(
        name.trim(),
        email.trim(),
        'quiz_results',
        `Quiz completed at ${new Date().toISOString()}`
      );
      
      // Show success message
      toast({
        title: "Information Saved",
        description: "Your information has been saved. Preparing your results...",
      });
    } catch (error) {
      console.error("Error saving information:", error);
      toast({
        title: "Error saving information",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    // Continue with original submission
    onSubmit(name.trim(), email.trim());
  };

  return (
    <div className="text-center max-w-2xl mx-auto py-6">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-slate-800 mb-4">
        Your Results Are Ready
      </h2>
      
      <p className="mb-5 text-slate-600">
        Enter your email to view your personalized perimenopause assessment
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto text-left">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-slate-700">First Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name"
            disabled={isLoading}
            required
            className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-slate-700">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={isLoading}
            required
            className="border-slate-200 focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 py-5 text-lg text-white mt-2"
        >
          {isLoading ? "Processing..." : "Show My Results Now"}
        </Button>
      </form>
      
      <p className="mt-3 text-xs text-slate-500">
        We respect your privacy. Your information is never shared or sold.
      </p>
    </div>
  );
};

export default EmailCollection;
