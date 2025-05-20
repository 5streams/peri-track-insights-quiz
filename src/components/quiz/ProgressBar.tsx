
import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#5D4154] to-[#A7C4A0]" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
