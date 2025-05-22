
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveLead, getLeads, initializeLeadStorage, validateLeadStorage } from "@/utils/leadTracking";

interface EmailCollectionProps {
  onSubmit: (firstName: string, email: string) => void;
  isLoading: boolean;
}

const EmailCollection: React.FC<EmailCollectionProps> = ({ onSubmit, isLoading }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Ensure lead storage is initialized when the component mounts
  useEffect(() => {
    // Force initialization of storage
    try {
      initializeLeadStorage();
      console.log("EmailCollection: Lead storage initialized");
      
      // Validate storage is working properly
      const isValid = validateLeadStorage();
      console.log(`EmailCollection: Lead storage validation ${isValid ? 'PASSED' : 'FAILED'}`);
      
      // Debug: Check if storage is working
      const testItem = "test-" + Date.now();
      localStorage.setItem("test_storage", testItem);
      const retrieved = localStorage.getItem("test_storage");
      console.log("Storage test result:", retrieved === testItem ? "PASSED" : "FAILED");
      
      // Check existing leads for debugging
      const currentLeads = getLeads();
      console.log("EmailCollection: Current leads on load:", currentLeads);
      
      // Force a ping to refresh LeadList component
      localStorage.setItem("leads_updated", Date.now().toString());
    } catch (error) {
      console.error("Error initializing lead storage:", error);
    }
  }, []);

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
      const quizResults = localStorage.getItem("quizAnswers") 
        ? JSON.parse(localStorage.getItem("quizAnswers") || "{}") 
        : {};
      
      console.log("EmailCollection: About to save lead with data:", {
        firstName: firstName.trim(),
        email: email.trim(),
        source: 'quiz_results',
        quizResults
      });
      
      // Save lead with a unique timestamp to prevent duplicates
      const lead = saveLead(
        firstName.trim(),
        email.trim(),
        'quiz_results',
        null,
        quizResults,
        `Quiz completed at ${new Date().toISOString()}`
      );
      
      console.log("EmailCollection: Lead saved successfully:", lead);
      
      // Double check that leads are being stored correctly
      const currentLeads = getLeads();
      console.log("EmailCollection: Current leads after saving:", currentLeads);
      console.log("EmailCollection: Storage key used:", 'peritrack_leads');
      
      // Show toast notification for successful lead capture
      toast({
        title: "Information Saved",
        description: "Your information has been saved. Preparing your results...",
      });
      
      // Force leads to be visible in admin immediately
      localStorage.setItem("leads_updated", Date.now().toString());
      
      // Adding a safety delay to ensure localStorage updates are processed
      setTimeout(() => {
        const verificationLeads = getLeads();
        console.log("EmailCollection: Verification check - leads after delay:", verificationLeads);
        localStorage.setItem("leads_updated", Date.now().toString());
      }, 500);
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
