
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

      // Create a shared storage indicator
      localStorage.setItem("peritrack_storage_initialized", "true");
      sessionStorage.setItem("peritrack_session_active", "true");
      
      // Check existing leads for debugging
      const currentLeads = getLeads();
      console.log("EmailCollection: Current leads on load:", currentLeads);
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
      
      // Force immediate synchronization with other tabs/browsers
      localStorage.setItem("leads_updated_timestamp", Date.now().toString());
      
      // Try to broadcast the change event more aggressively
      try {
        // Use both localStorage and sessionStorage for redundancy
        sessionStorage.setItem("latest_lead", JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          timestamp: new Date().toISOString()
        }));
        
        // Force a storage event by updating a tracking key
        localStorage.setItem("lead_tracker", Date.now().toString());
        
        // Dispatch custom events
        window.dispatchEvent(new Event('storage'));
        window.dispatchEvent(new CustomEvent('leadsUpdated'));
        
        // Double check storage after save
        const currentLeads = getLeads();
        console.log("EmailCollection: Current leads after saving:", currentLeads, 
                    "Latest lead should be:", firstName.trim(), email.trim());
      } catch (broadcastError) {
        console.error("Error broadcasting lead update:", broadcastError);
      }
      
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
    <div className="text-center max-w-2xl mx-auto py-6">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#6b4e82] mb-4">
        Your Results Are Ready
      </h2>
      
      <p className="mb-5 text-[#8a6eaa]">
        Enter your email to view your personalized perimenopause assessment
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto text-left">
        <div className="space-y-1.5">
          <Label htmlFor="firstName" className="text-[#6b4e82]">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
