
import React from 'react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
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
    small: 'px-6 py-3 text-sm',
    medium: 'px-8 py-4 text-base',
    large: 'px-10 py-5 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary-gradient hover:shadow-[0_15px_35px_rgba(93,65,84,0.6)]',
    secondary: 'bg-cta-gradient hover:shadow-[0_15px_35px_rgba(167,196,160,0.6)]'
  };

  return (
    <button
      className={cn(
        'cta-button relative overflow-hidden rounded-full text-white font-semibold font-body cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-lg border-none',
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
