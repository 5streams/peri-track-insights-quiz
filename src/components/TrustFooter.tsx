
import React from 'react';

const TrustFooter = () => {
  return (
    <footer className="trust-footer py-8 bg-gray-50 border-t">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="font-headline font-bold text-xl text-primary mb-3">Peritrack</h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              The intelligent perimenopause tracker that helps you understand, predict, and manage your symptoms with personalized AI coaching.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-3">Product</h4>
            <ul className="space-y-1 text-sm text-warm-gray">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Luna AI Coach</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-3">Support</h4>
            <ul className="space-y-1 text-sm text-warm-gray">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-primary mb-3">Trust & Security</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-warm-gray">
                <span className="mr-2">🔒</span>
                HIPAA Compliant
              </div>
              <div className="flex items-center text-sm text-warm-gray">
                <span className="mr-2">🛡️</span>
                SOC 2 Certified
              </div>
              <div className="flex items-center text-sm text-warm-gray">
                <span className="mr-2">🏥</span>
                Clinically Validated
              </div>
              <div className="flex items-center text-sm text-warm-gray">
                <span className="mr-2">⭐</span>
                4.9/5 App Rating
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-warm-gray">
          <div className="mb-3 md:mb-0">
            © 2024 Peritrack. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustFooter;
