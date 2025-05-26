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
      <DialogContent className="sm:max-w-[380px] max-h-[90vh] overflow-y-auto p-4">
        <DialogClose className="absolute right-3 top-3 z-10" />
        
        <div className="text-center py-1">
          <DialogHeader className="mb-3">
            <DialogTitle className="text-lg font-bold text-gray-900 mb-1">
              Wait! Save 55%
            </DialogTitle>
            <p className="text-sm text-gray-700">
              Get Our Yearly Plan With Everything Included Below!
            </p>
          </DialogHeader>
          
          <div className="bg-white border-2 border-blue-500 p-3 rounded-xl relative bg-gradient-to-br from-blue-50 to-white mb-3">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-0.5 rounded-full font-bold text-xs">
              Best Value - Save 55%
            </div>
            
            <h3 className="text-base font-bold mb-1 text-gray-900 mt-1">Enterprise</h3>
            <div className="text-3xl font-black text-blue-500 mb-0.5 leading-none">$79</div>
            <p className="text-xs text-gray-600 mb-3">per year, billed annually</p>
            
            <ul className="text-left mb-3 space-y-1">
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Everything in Professional
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                10 team members included
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Advanced admin controls
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Team collaboration features
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Advanced analytics & reporting
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Custom integrations
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Priority phone support
              </li>
              <li className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-green-200 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </div>
                Dedicated account manager
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={onAcceptUpsell}
              className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white py-2.5 rounded-lg font-bold text-xs hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              Yes! I Want To Save 55%
            </Button>
            
            <Button 
              onClick={onDeclineUpsell}
              variant="outline"
              className="w-full border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold text-xs hover:bg-gray-50 transition-all"
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
