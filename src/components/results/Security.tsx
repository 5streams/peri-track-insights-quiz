
import React from "react";

const Security: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mb-6 reveal-section transform opacity-0">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-xs font-medium text-[#5D4154]">HIPAA Compliant</div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-xs font-medium text-[#5D4154]">256-bit Encryption</div>
        </div>
        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-xs font-medium text-[#5D4154]">Medically Reviewed</div>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500">
        Takes just 30 seconds. No credit card required. Cancel anytime.
      </p>
    </div>
  );
};

export default Security;
