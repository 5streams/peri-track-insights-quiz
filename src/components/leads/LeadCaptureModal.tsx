
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveLead } from "@/utils/leadTracking";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingPlan?: 'monthly' | 'annual';
  source: 'quiz_results' | 'free_trial';
  quizResults?: any;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  pricingPlan,
  source,
  quizResults
}) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !email.trim() || !email.includes('@')) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Save lead data
    try {
      const lead = saveLead(
        firstName.trim(), 
        email.trim(), 
        source, 
        pricingPlan, 
        quizResults
      );
      
      console.log("Lead successfully saved:", lead);
      
      // Show success state
      setIsSubmitted(true);
      
      toast({
        title: "Successfully Added",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
        action: <Check className="h-4 w-4 text-green-500" />
      });
      
    } catch (error) {
      console.error("Error saving lead:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setEmail("");
    setIsSubmitted(false);
  };
  
  const handleClose = () => {
    onClose();
    // Reset the form after a delay to avoid visual transition issues
    setTimeout(resetForm, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose className="absolute right-4 top-4" />
        
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-[#5D4154]">
                {source === 'free_trial' ? 'Start Your Free Trial' : 'Get Your Results'}
              </DialogTitle>
              <DialogDescription>
                {source === 'free_trial' 
                  ? 'Enter your details below to start your 7-day free trial.'
                  : 'Enter your details to see your personalized results.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
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
                  required
                />
              </div>
              
              {source === 'free_trial' && pricingPlan && (
                <div className="bg-[#FFECD6]/30 p-3 rounded-lg text-sm text-[#5D4154] flex items-center justify-between">
                  <span>Selected plan: <strong>{pricingPlan === 'monthly' ? 'Monthly ($9.99/mo)' : 'Annual ($99/year)'}</strong></span>
                </div>
              )}
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-[#A7C4A0] hover:bg-[#A7C4A0]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : source === 'free_trial' ? "Continue to Payment" : "Show My Results"}
                </Button>
              </div>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                We value your privacy. Your information is secure and will never be shared.
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="bg-[#A7C4A0]/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#A7C4A0]" />
            </div>
            
            <DialogTitle className="text-xl font-bold text-[#5D4154] mb-4">
              Thank You For Joining!
            </DialogTitle>
            
            <div className="mb-6">
              <p className="text-[#5D4154]">
                We're currently in beta testing and will notify you when Peritrack officially launches.
              </p>
              
              <div className="mt-4 bg-[#FFECD6]/30 p-4 rounded-lg">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#A7C4A0] h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <p className="text-sm text-[#5D4154]">Development progress: <strong>85% complete</strong></p>
              </div>
            </div>
            
            <Button
              onClick={handleClose}
              className="bg-[#5D4154] hover:bg-[#5D4154]/90 text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
