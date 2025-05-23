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
import { Textarea } from "@/components/ui/textarea";
import { saveLead } from "@/utils/leadTracking";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight } from "lucide-react";

interface TrialSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialSignupModal: React.FC<TrialSignupModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [step, setStep] = useState<'form' | 'beta-message'>('form');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Format the notes to be consistent with other lead types
      const additionalNotes = `Captured from TryPeriTrack page at ${new Date().toISOString()}`;
      
      // Create a quiz-like results object to maintain consistency with other lead types
      const trialQuizResults = {
        source: "TRIAL_SIGNUP",
        phase: "Trial Interest",
        score: 100,
        timestamp: new Date().toISOString(),
        device_info: {
          userAgent: navigator.userAgent,
          screenSize: `${window.innerWidth}x${window.innerHeight}`
        }
      };
      
      console.log("TrialSignupModal: About to save lead with data:", {
        name: name.trim(),
        email: email.trim(),
        address: address.trim() + " (NOTE: address not saved until database schema is updated)",
        source: 'TRIAL',
        quizResults: trialQuizResults,
        additionalNotes
      });
      
      // Save lead using the same function as quiz results to ensure consistency
      await saveLead(
        name.trim(), 
        email.trim(), 
        'TRIAL', 
        'free_trial', // Set pricing tier to "free_trial" instead of null
        trialQuizResults, // Pass formatted results to maintain consistency
        additionalNotes
      );
      
      // Fire the conversion tracking when signup is successful
      if (typeof window !== 'undefined' && (window as any).trackTrialConversion) {
        (window as any).trackTrialConversion();
        console.log('Trial conversion tracked for Google Ads');
      }
      
      setStep('beta-message');
      
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
    setName("");
    setEmail("");
    setAddress("");
    setStep('form');
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
        
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-primary">
                Join Peritrack
              </DialogTitle>
              <DialogDescription>
                Enter your details to get started with your trial.
                <p className="text-primary font-medium text-sm mt-1">7-day trial then only $12.95/month</p>
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
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

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your address (optional)"
                  rows={3}
                />
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-primary-gradient hover:bg-primary/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue to Payment"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-center text-warm-gray mt-4">
                We value your privacy. Your information is secure and will never be shared.
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="bg-secondary/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-secondary" />
            </div>
            
            <DialogTitle className="text-xl font-bold text-primary mb-4">
              Thank You For Your Interest!
            </DialogTitle>
            
            <div className="mb-6">
              <p className="text-primary mb-4">
                We're currently in beta and will email you as soon as we reopen for new users.
              </p>
              
              <div className="mt-4 bg-accent/50 p-4 rounded-lg border border-secondary/20">
                <p className="text-sm font-medium text-primary">
                  Expected launch in <span className="font-bold">1-2 weeks</span>
                </p>
                <p className="text-sm text-warm-gray mt-2">
                  We'll notify you at {email}
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleClose}
              className="bg-primary-gradient hover:bg-primary/90 text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrialSignupModal;
