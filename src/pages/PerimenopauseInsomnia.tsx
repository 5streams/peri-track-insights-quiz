
import React, { useEffect, useState } from 'react';
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
import TrialSignupModal from '../components/TrialSignupModal';
import StatsSection from '../components/StatsSection';
import ComparisonSection from '../components/ComparisonSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import TestimonialCarousel from '../components/TestimonialCarousel';
import WeightManagementEducation from '../components/WeightManagementEducation';
import WeightPatternTestimonials from '../components/WeightPatternTestimonials';
import WeightPainAmplification from '../components/WeightPainAmplification';
import WeightTimeline from '../components/WeightTimeline';
import BeforeAfterMindset from '../components/BeforeAfterMindset';
import EnhancedFinalCTA from '../components/EnhancedFinalCTA';

const PerimenopauseInsomnia = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

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

    // Handle hash navigation when page loads
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Add a small delay to ensure proper scrolling after page load
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    // Handle hash navigation when URL changes
    window.addEventListener('hashchange', handleHashNavigation);
    // Handle hash navigation on initial page load
    handleHashNavigation();

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <HeroSection />
        <StatsSection />
        <WeightPainAmplification />
        <WeightManagementEducation />
        <WeightTimeline />
        <ProblemSection />
        <SolutionSection />
        <WeightPatternTestimonials />
        <WhyChooseUsSection />
        <div id="features">
          <FeaturesSection />
        </div>
        <ComparisonSection />
        <div id="how-it-works">
          <HowItWorksSection />
        </div>
        <LunaSection />
        <TestimonialCarousel />
        <SocialProofSection />
        <BeforeAfterMindset />
        <div id="pricing">
          <PricingSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <EnhancedFinalCTA />
        <TrustFooter />
        
        {/* Global Trial Signup Modal that can be triggered from anywhere */}
        <TrialSignupModal 
          isOpen={isSignupModalOpen}
          onClose={handleCloseSignupModal}
          pageSource="perimenopause-insomnia"
        />
      </div>
    </div>
  );
};

export default PerimenopauseInsomnia;
