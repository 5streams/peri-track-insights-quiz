
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/utils/leadTracking";

interface EmailCollectionProps {
  onSubmit: (firstName: string, email: string) => void;
  isLoading: boolean;
}

const EmailCollection: React.FC<EmailCollectionProps> = ({ onSubmit, isLoading }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName.trim()) {
      toast({
        title: "First name required",
        description: "Please enter your first name to continue.",
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
    
    // Track lead before submitting
    try {
      // Get quiz results from localStorage
      const quizAnswers = localStorage.getItem("quizAnswers") 
        ? JSON.parse(localStorage.getItem("quizAnswers") || "{}") 
        : {};
      
      console.log("Saving quiz lead with data:", {
        firstName: firstName.trim(),
        email: email.trim(),
        quizAnswers
      });
      
      // Save lead data
      const lead = saveLead(
        firstName.trim(),
        email.trim(),
        'quiz_results',
        null,
        quizAnswers,
        "Submitted via quiz email collection"
      );
      
      console.log("Quiz lead saved successfully:", lead);
      
      // Show toast notification for successful lead capture
      toast({
        title: "Information Saved",
        description: "Your information has been saved. Preparing your results...",
      });
    } catch (error) {
      console.error("Error tracking quiz lead:", error);
      toast({
        title: "Error saving information",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    
    // Continue with original submission
    onSubmit(firstName.trim(), email.trim());
  };

  return (
    <div className="text-center">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#5D4154] mb-4">
        Your Results Are Ready
      </h2>
      
      <p className="mb-6 text-gray-600">
        Enter your email to view your personalized perimenopause assessment
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto text-left">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            disabled={isLoading}
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#5D4154] hover:bg-[#5D4154]/90 py-6 text-lg"
        >
          {isLoading ? "Processing..." : "Show My Results Now"}
        </Button>
      </form>
      
      <p className="mt-4 text-xs text-gray-500">
        We respect your privacy. Your information is never shared or sold.
      </p>
    </div>
  );
};

export default EmailCollection;
