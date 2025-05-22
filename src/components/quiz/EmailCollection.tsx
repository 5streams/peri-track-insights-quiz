
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/utils/leadTracking";

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
    
    // Save lead and show notification
    try {
      // Get quiz results from localStorage if available
      const quizResults = localStorage.getItem("quizAnswers") 
        ? JSON.parse(localStorage.getItem("quizAnswers") || "{}") 
        : {};
      
      console.log("EmailCollection: Saving lead with data:", {
        name: name.trim(),
        email: email.trim(),
        source: 'quiz_results'
      });
      
      // Save lead
      saveLead(
        name.trim(),
        email.trim(),
        'quiz_results',
        null,
        quizResults,
        `Quiz completed at ${new Date().toISOString()}`
      );
      
      // Show success message
      toast({
        title: "Information Saved",
        description: "Your information has been saved. Preparing your results...",
      });
    } catch (error) {
      console.error("Error saving lead:", error);
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
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#6b4e82] mb-4">
        Your Results Are Ready
      </h2>
      
      <p className="mb-5 text-[#8a6eaa]">
        Enter your email to view your personalized perimenopause assessment
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto text-left">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-[#6b4e82]">First Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your first name"
            disabled={isLoading}
            required
            className="border-[#D6BCFA] focus:border-[#a68bc7] focus:ring-[#a68bc7]"
          />
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[#6b4e82]">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={isLoading}
            required
            className="border-[#D6BCFA] focus:border-[#a68bc7] focus:ring-[#a68bc7]"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#a68bc7] hover:bg-[#8a6eaa] py-5 text-lg text-white mt-2"
        >
          {isLoading ? "Processing..." : "Show My Results Now"}
        </Button>
      </form>
      
      <p className="mt-3 text-xs text-[#8a6eaa]">
        We respect your privacy. Your information is never shared or sold.
      </p>
    </div>
  );
};

export default EmailCollection;
