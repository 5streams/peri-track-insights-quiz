import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import LunaSection from '../components/LunaSection';
import SocialProofSection from '../components/SocialProofSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import TrustFooter from '../components/TrustFooter'; 

const TryPeriTrack = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    setTimeout(() => {
      document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    // CTA tracking - make sure to capture all CTA button clicks
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', () => {
        console.log('CTA clicked:', {
          button_location: button.closest('section')?.className || 'unknown',
          button_text: button.textContent?.trim(),
          lead_to: 'TrialSignupModal' // All CTAs now lead to the signup modal
        });
        
        // You could also add more sophisticated analytics tracking here
        // Example: gtag('event', 'cta_click', { section: button.closest('section')?.className });
      });
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LunaSection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
        <TrustFooter />
      </div>
    </div>
  );
};

export default TryPeriTrack;
