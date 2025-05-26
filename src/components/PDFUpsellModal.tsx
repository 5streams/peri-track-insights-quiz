
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
      <DialogContent className="sm:max-w-[400px] max-h-[85vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 z-10" />
        
        <div className="text-center py-3">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
              Wait! Save 55%
            </DialogTitle>
            <p className="text-base text-gray-700 mb-1">
              Get Our Yearly Plan With Everything Included Below!
            </p>
          </DialogHeader>
          
          <div className="bg-white border-2 border-blue-500 p-4 rounded-2xl relative bg-gradient-to-br from-blue-50 to-white mb-4">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full font-bold text-xs tracking-wider">
              Best Value - Save 55%
            </div>
            
            <h3 className="text-lg font-bold mb-2 text-gray-900">Enterprise</h3>
            <div className="text-4xl font-black text-blue-500 mb-1 leading-none">$79</div>
            <p className="text-sm text-gray-600 mb-4">per month, billed monthly</p>
            
            <ul className="text-left mb-4 space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Everything in Professional
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                10 team members included
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Advanced admin controls
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Team collaboration features
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Advanced analytics & reporting
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Custom integrations
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Priority phone support
              </li>
              <li className="flex items-center gap-2 text-sm">
                <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                Dedicated account manager
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={onAcceptUpsell}
              className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-lg font-bold text-sm hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-blue-500/30"
            >
              Yes! I Want To Save 55%
            </Button>
            
            <Button 
              onClick={onDeclineUpsell}
              variant="outline"
              className="w-full border-2 border-gray-300 text-gray-700 p-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
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
