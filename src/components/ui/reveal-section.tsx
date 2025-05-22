
import React, { useEffect, useRef, ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const RevealSection: React.FC<RevealSectionProps> = ({ 
  children, 
  delay = 0,
  className = ""
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay if specified
          if (delay) {
            setTimeout(() => {
              section.classList.add('revealed');
            }, delay);
          } else {
            section.classList.add('revealed');
          }
          // Once revealed, stop observing
          observer.unobserve(section);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px" // Trigger animation before element fully enters viewport
      }
    );
    
    observer.observe(section);
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={sectionRef} 
      className={`reveal-section ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealSection;
