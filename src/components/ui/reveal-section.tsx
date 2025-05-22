
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
    
    // Create a more reliable intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only add the revealed class if not already revealed
        if (entry.isIntersecting && !section.classList.contains('revealed')) {
          // Apply delay if specified
          if (delay) {
            setTimeout(() => {
              section.classList.add('revealed');
            }, delay);
          } else {
            section.classList.add('revealed');
          }
          // Once revealed, stop observing to prevent potential glitches
          observer.unobserve(section);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger earlier for smoother experience
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
      style={{
        // Apply these styles directly to ensure they take precedence
        opacity: 0,
        transform: 'translateY(15px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default RevealSection;
