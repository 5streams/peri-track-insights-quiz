
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CTAButton from './CTAButton';
import TrialSignupModal from './TrialSignupModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="PeriTrack Logo" 
              className="h-12 w-auto" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/tryperitrack" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Home
            </Link>
            <Link to="/tryperitrack#features" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Features
            </Link>
            <Link to="/tryperitrack#how-it-works" className="text-primary font-medium hover:text-primary/80 transition-colors">
              How It Works
            </Link>
            <Link to="/tryperitrack#pricing" className="text-primary font-medium hover:text-primary/80 transition-colors">
              Pricing
            </Link>
            <Link to="/tryperitrack#faq" className="text-primary font-medium hover:text-primary/80 transition-colors">
              FAQ
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <CTAButton 
              size="small" 
              variant="primary"
              onClick={handleOpenSignupModal}
            >
              Start Free Trial
            </CTAButton>
            <p className="text-xs text-center text-warm-gray mt-1">
              7-day free trial then only $12.95/month
            </p>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/tryperitrack" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tryperitrack#features" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/tryperitrack#how-it-works" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/tryperitrack#pricing" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/tryperitrack#faq" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-2">
                <CTAButton 
                  size="small" 
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    handleOpenSignupModal();
                    setIsMenuOpen(false);
                  }}
                >
                  Start Free Trial
                </CTAButton>
                <p className="text-xs text-center text-warm-gray mt-1">
                  7-day free trial then only $12.95/month
                </p>
              </div>
            </nav>
          </div>
        )}
      </div>
      
      {/* Trial Signup Modal */}
      <TrialSignupModal 
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
      />
    </header>
  );
};

export default Navbar;
