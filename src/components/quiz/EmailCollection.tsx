
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/utils/leadStorage";
import { Check } from "lucide-react";

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
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-slate-800 mb-3">
        Your Personalized Perimenopause Analysis Is Ready
      </h2>
      
      <p className="mb-5 text-slate-600">
        Enter your email to unlock your comprehensive hormone assessment and discover exactly what's happening in your body
      </p>
      
      {/* Form moved here, right after the subheadline */}
      <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto text-left mb-6">
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
          {isLoading ? "Processing..." : "Get My Personalized Results Now"}
        </Button>
      </form>
      
      <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-6 text-left">
        <p className="font-medium text-slate-700 mb-2">Here's what you'll discover in your personalized results:</p>
        <ul className="space-y-2">
          {[
            "Your specific hormone pattern and what it means for your symptoms",
            "Why you're experiencing sleep disruptions, brain fog, or mood changes",
            "The exact connection between your symptoms and hormone fluctuations",
            "Personalized recommendations to start feeling better immediately",
            "Whether your symptoms indicate early, mid, or late-stage perimenopause",
            "What to expect next in your hormone journey"
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-purple-600 mt-1 shrink-0" />
              <span className="text-sm text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6 italic text-center">
        <p className="text-slate-600 text-sm mb-2">
          Join 30,000+ women who've discovered clarity about their perimenopause symptoms
        </p>
        <blockquote className="text-slate-700 text-sm">
          "Finally understanding why I was waking up at 3 AM every night changed everything. 
          The personalized insights were incredibly helpful."
          <span className="font-medium"> - Jennifer, 45</span>
        </blockquote>
      </div>
      
      <p className="text-purple-800 font-medium mb-6">
        This detailed analysis would cost $200+ at a specialist's office.
        <br />Get your complete assessment free in the next 60 seconds.
      </p>
      
      <div className="mt-4 space-y-1 text-center">
        {[
          "⚡ Instant access - no waiting",
          "🔒 Your privacy is protected - we never share your information",
          "📧 Bonus: Get weekly tips for managing your specific hormone pattern"
        ].map((item, index) => (
          <p key={index} className="text-xs text-slate-500">{item}</p>
        ))}
      </div>
    </div>
  );
};

export default EmailCollection;
