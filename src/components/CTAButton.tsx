
import React from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'urgent' | 'outline';
  className?: string;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  size = 'medium', 
  variant = 'secondary',
  className,
  onClick 
}) => {
  const sizeClasses = {
    small: 'px-5 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary-gradient hover:shadow-[0_10px_25px_rgba(93,65,84,0.5)]',
    secondary: 'bg-cta-gradient hover:shadow-[0_10px_25px_rgba(167,196,160,0.5)]',
    urgent: 'bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-[0_10px_25px_rgba(239,68,68,0.5)] animate-pulse',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white'
  };

  return (
    <button
      className={cn(
        'cta-button relative overflow-hidden rounded-full text-white font-semibold font-body cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-md border-none',
        sizeClasses[size],
        variantClasses[variant],
        'before:content-[""] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-500',
        'hover:before:left-full',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CTAButton;
