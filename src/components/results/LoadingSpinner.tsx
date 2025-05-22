
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50/30 p-4">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-700 border-t-purple-300 rounded-full animate-spin mx-auto mb-6"></div>
        <h1 className="font-playfair text-2xl font-semibold text-purple-800 mb-4">
          Loading your results...
        </h1>
        <p className="text-purple-700">Please wait while we prepare your personalized assessment.</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
