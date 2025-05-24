
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
import { Check } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingPlan?: 'monthly' | 'annual';
  source: 'quiz_results' | 'free_trial';
  quizResults?: any;
  navigateToDashboard?: boolean;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  pricingPlan,
  source,
  quizResults,
  navigateToDashboard = false
}) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if this is a hormone testing offer
  const isHormoneTestingOffer = quizResults?.source === "HORMONE_TESTING_OFFER";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !email.trim() || !email.includes('@')) {
      toast({
        title: "Missing information",
        description: "Please provide both your name and a valid email address.",
        variant: "destructive"
      });
      return;
    }
    
    if (source === 'free_trial' && !phoneNumber) {
      toast({
        title: "Missing information",
        description: "Please provide your phone number for the free trial.",
        variant: "destructive"
      });
      return;
    }

    // For hormone testing offers, require phone and zip code
    if (isHormoneTestingOffer && (!phoneNumber || !zipCode)) {
      toast({
        title: "Missing information",
        description: "Please provide your phone number and zip code.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const additionalNotes = isHormoneTestingOffer 
        ? `Phone: ${phoneNumber}, Zip Code: ${zipCode}, Address: ${address}, Captured at: ${new Date().toISOString()}` 
        : source === 'free_trial' 
        ? `Phone: ${phoneNumber}, Address: ${address}, Captured at: ${new Date().toISOString()}` 
        : `Captured at: ${new Date().toISOString()}`;
        
      console.log("LeadCaptureModal: About to save lead with data:", {
        firstName: firstName.trim(),
        email: email.trim(),
        source,
        pricingPlan,
        quizResults,
        additionalNotes
      });
      
      const lead = await saveLead(
        firstName.trim(), 
        email.trim(), 
        source, 
        pricingPlan, 
        quizResults,
        additionalNotes
      );
      
      console.log("LeadCaptureModal: Lead successfully saved:", lead);
      
      setIsSubmitted(true);
      
      toast({
        title: "Successfully Added",
        description: isHormoneTestingOffer 
          ? "Your hormone testing request has been submitted. We'll contact you soon!"
          : "You've been added to our waitlist. We'll notify you when we launch!",
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
    setPhoneNumber("");
    setZipCode("");
    setAddress("");
    setIsSubmitted(false);
  };
  
  const handleClose = () => {
    // Simply close the modal without navigation
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
                {isHormoneTestingOffer 
                  ? 'Order Your Hormone Testing' 
                  : source === 'free_trial' ? 'Start Your Free Trial' : 'Get Your Results'}
              </DialogTitle>
              <DialogDescription>
                {isHormoneTestingOffer 
                  ? 'Enter your details to order comprehensive hormone testing.'
                  : source === 'free_trial' 
                  ? 'Enter your details below to start your 7-day free trial.'
                  : 'Enter your details to see your personalized results.'}
                {source === 'free_trial' && (
                  <p className="text-[#5D4154] font-medium text-sm mt-1">7-day trial then only $12.95/month</p>
                )}
                {isHormoneTestingOffer && (
                  <p className="text-[#5D4154] font-medium text-sm mt-1">Complete Perimenopause Testing Panel - $199</p>
                )}
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
              
              {(source === 'free_trial' || isHormoneTestingOffer) && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Your phone number"
                    required={isHormoneTestingOffer}
                  />
                </div>
              )}

              {isHormoneTestingOffer && (
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Your zip code"
                    required
                  />
                </div>
              )}
              
              {source === 'free_trial' && (
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Your address"
                    rows={3}
                  />
                </div>
              )}
              
              {source === 'free_trial' && pricingPlan && (
                <div className="bg-[#FFECD6]/30 p-3 rounded-lg text-sm text-[#5D4154] flex items-center justify-between">
                  <span>Selected plan: <strong>{pricingPlan === 'monthly' ? 'Monthly ($9.99/mo)' : 'Annual ($99/year)'}</strong></span>
                </div>
              )}
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-[#9b87f5] hover:bg-[#9b87f5]/90 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : 
                   isHormoneTestingOffer ? "ORDER BLOODWORK NOW" :
                   source === 'free_trial' ? "Start 7-Day Free Trial" : "Show My Results"}
                </Button>
                {source === 'free_trial' && (
                  <p className="text-xs text-center mt-1 text-[#5D4154]">
                    7-day trial then only $12.95/month
                  </p>
                )}
                {isHormoneTestingOffer && (
                  <p className="text-xs text-center mt-1 text-[#5D4154]">
                    Results in 3-5 business days
                  </p>
                )}
              </div>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                We value your privacy. Your information is secure and will never be shared.
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="bg-[#9b87f5]/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#9b87f5]" />
            </div>
            
            <DialogTitle className="text-xl font-bold text-[#5D4154] mb-4">
              {isHormoneTestingOffer 
                ? "Thank You For Your Order!" 
                : "Thank You For Requesting Your Trial"}
            </DialogTitle>
            
            <div className="mb-6">
              <p className="text-[#5D4154] mb-4">
                {isHormoneTestingOffer 
                  ? "We will contact you within 24 hours to schedule your lab appointment and send you the testing kit."
                  : "We Are Currently In Beta And Will Email You As Soon As We Open"}
              </p>
              
              <div className="mt-4 bg-[#F9F5FF]/50 p-4 rounded-lg border border-[#9b87f5]/20">
                <p className="text-sm font-medium text-[#5D4154] mt-2">
                  <span className="font-bold">
                    {isHormoneTestingOffer ? "*Within 24 hours*" : "*1 - 2 weeks*"}
                  </span>
                </p>
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
