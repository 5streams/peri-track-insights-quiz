
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
    
    // Mark as revealed immediately to prevent blank spots
    const timer = setTimeout(() => {
      if (section && !section.classList.contains('revealed')) {
        section.classList.add('revealed');
      }
    }, delay);
    
    // Create a more reliable intersection observer as backup
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only add the revealed class if not already revealed
        if (entry.isIntersecting && section && !section.classList.contains('revealed')) {
          section.classList.add('revealed');
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -10px 0px" // Trigger earlier
      }
    );
    
    observer.observe(section);
    
    return () => {
      clearTimeout(timer);
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
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default RevealSection;
