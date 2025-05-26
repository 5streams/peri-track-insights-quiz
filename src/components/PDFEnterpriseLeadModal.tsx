
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveLead } from "@/utils/leadTracking";
import { useToast } from "@/hooks/use-toast";
import { Check, ArrowRight } from "lucide-react";

interface PDFEnterpriseLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PDFEnterpriseLeadModal: React.FC<PDFEnterpriseLeadModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<'form' | 'success'>('form');
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
      const additionalNotes = `PDF Enterprise trial signup from /pdfmerger page at ${new Date().toISOString()}`;
      
      const trialQuizResults = {
        source: "PDF_ENTERPRISE_TRIAL_SIGNUP",
        phase: "PDF Enterprise Trial Interest",
        score: 100,
        page_source: 'pdfmerger',
        timestamp: new Date().toISOString(),
        device_info: {
          userAgent: navigator.userAgent,
          screenSize: `${window.innerWidth}x${window.innerHeight}`
        }
      };
      
      console.log("PDFEnterpriseLeadModal: About to save lead with data:", {
        name: name.trim(),
        email: email.trim(),
        source: 'TRIAL',
        pricingTier: 'PDFYEARLY',
        quizResults: trialQuizResults,
        additionalNotes
      });
      
      await saveLead(
        name.trim(), 
        email.trim(), 
        'TRIAL', 
        'PDFYEARLY',
        trialQuizResults,
        additionalNotes
      );
      
      setStep('success');
      
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
    setStep('form');
  };
  
  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogClose className="absolute right-4 top-4" />
        
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Start Your Enterprise Trial
              </DialogTitle>
              <p className="text-gray-600 mt-2">
                Get 14 days of unlimited enterprise-grade PDF processing with team collaboration.
              </p>
              <p className="text-blue-600 font-medium text-sm mt-1">
                Then only $79/year • Cancel anytime
              </p>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Work Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address"
                  required
                />
              </div>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue to Payment"} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                We value your privacy. Your information is secure and will never be shared.
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <DialogTitle className="text-xl font-bold text-gray-900 mb-4">
              Thank You For Your Interest!
            </DialogTitle>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                We're currently in beta and will email you as soon as we reopen for new enterprise users.
              </p>
              
              <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-gray-900">
                  Expected launch in <span className="font-bold">1-2 weeks</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  We'll notify you at {email}
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleClose}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PDFEnterpriseLeadModal;
