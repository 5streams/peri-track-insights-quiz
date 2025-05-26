
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PDFUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptUpsell: () => void;
  onDeclineUpsell: () => void;
}

const PDFUpsellModal: React.FC<PDFUpsellModalProps> = ({
  isOpen,
  onClose,
  onAcceptUpsell,
  onDeclineUpsell
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 z-10" />
        
        <div className="text-center py-6">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-4">
              Wait! Save 55%
            </DialogTitle>
            <p className="text-xl text-gray-700 mb-2">
              Get Our Yearly Plan With Everything Included Below!
            </p>
          </DialogHeader>
          
          <div className="bg-white border-2 border-blue-500 p-8 rounded-3xl relative transform scale-105 bg-gradient-to-br from-blue-50 to-white mb-8">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider">
              Best Value - Save 55%
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
            <div className="text-6xl font-black text-blue-500 mb-2 leading-none">$79</div>
            <p className="text-gray-600 mb-8">per month, billed monthly</p>
            
            <ul className="text-left mb-8 space-y-3">
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Everything in Professional
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                10 team members included
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Advanced admin controls
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Team collaboration features
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Advanced analytics & reporting
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Custom integrations
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Priority phone support
              </li>
              <li className="flex items-center gap-3 font-medium">
                <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">
                  <Check className="h-4 w-4" />
                </div>
                Dedicated account manager
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={onAcceptUpsell}
              className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              Yes! I Want To Save 55%
            </Button>
            
            <Button 
              onClick={onDeclineUpsell}
              variant="outline"
              className="w-full border-2 border-gray-300 text-gray-700 p-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all"
            >
              No, Continue with $12/month
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFUpsellModal;
