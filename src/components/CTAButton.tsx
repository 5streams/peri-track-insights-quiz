
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
    small: 'px-4 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary-gradient hover:shadow-[0_8px_20px_rgba(93,65,84,0.4)]',
    secondary: 'bg-cta-gradient hover:shadow-[0_8px_20px_rgba(167,196,160,0.4)]'
  };

  return (
    <button
      className={cn(
        'cta-button relative overflow-hidden rounded-lg text-white font-semibold font-body cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-md border-none',
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
