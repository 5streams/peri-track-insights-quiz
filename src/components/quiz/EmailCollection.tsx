
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface EmailCollectionProps {
  onSubmit: (name: string) => void;
  isLoading: boolean;
}

const EmailCollection: React.FC<EmailCollectionProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState("");
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
    
    console.log("EmailCollection: Submitting with name:", name.trim());
    
    // Continue with submission
    onSubmit(name.trim());
  };

  return (
    <div className="text-center max-w-2xl mx-auto py-6">
      <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#6b4e82] mb-4">
        Your Results Are Ready
      </h2>
      
      <p className="mb-5 text-[#8a6eaa]">
        Enter your name to view your personalized perimenopause assessment
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
