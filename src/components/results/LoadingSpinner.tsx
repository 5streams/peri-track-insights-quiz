
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFECD6]/30 p-4">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#5D4154] border-t-[#A7C4A0] rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="font-playfair text-2xl font-semibold text-[#5D4154] mb-4">
          Loading your results...
        </h1>
        <p className="text-[#6D6875]">Please wait while we prepare your personalized assessment.</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
