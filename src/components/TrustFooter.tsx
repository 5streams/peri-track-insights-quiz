
import React from 'react';
import { Link } from 'react-router-dom';

const TrustFooter = () => {
  return (
    <footer className="trust-footer py-8 bg-gray-50 border-t">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-warm-gray text-sm leading-relaxed">
              The intelligent perimenopause tracker that helps you understand, predict, and manage your symptoms with personalized AI coaching.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-3">Product</h4>
            <ul className="space-y-1 text-sm text-warm-gray">
              <li><Link to="/perimenopause-test" className="hover:text-primary transition-colors">Perimenopause Test</Link></li>
              <li><Link to="/perimenopause-quiz" className="hover:text-primary transition-colors">Perimenopause Quiz</Link></li>
              <li><Link to="/perimenopause-symptoms" className="hover:text-primary transition-colors">Symptom Checker</Link></li>
              <li><Link to="/trial-price" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary mb-3">Support</h4>
            <ul className="space-y-1 text-sm text-warm-gray">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/medical-disclaimer" className="hover:text-primary transition-colors">Medical Disclaimer</Link></li>
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
            © 2024 . All rights reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/medical-disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustFooter;
