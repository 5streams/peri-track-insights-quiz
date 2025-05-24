
import React, { useState } from 'react';
import { useLeadCapture } from '@/hooks/use-lead-capture';
import LeadCaptureModal from '@/components/leads/LeadCaptureModal';

const HormoneOrderForm: React.FC = () => {
  const { isModalOpen, openLeadModal, closeLeadModal } = useLeadCapture();

  const handleOrderClick = () => {
    // Create mock quiz results for hormone order lead
    const orderQuizResults = {
      source: "HORMONE_ORDER_FORM",
      phase: "Order Process",
      score: 100,
      page_source: 'results_page',
      timestamp: new Date().toISOString(),
      interest: "hormone_order_form"
    };
    
    openLeadModal('quiz_results', undefined, orderQuizResults);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200 shadow-lg">
      <div className="text-center">
        {/* 3-Step Process */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
              1
            </div>
            <div className="text-purple-600 mb-1">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5M7 13h10m0 0l1.5 6" />
              </svg>
            </div>
            <h3 className="text-xs font-bold text-purple-600 mb-1">ORDER YOUR TEST</h3>
            <p className="text-gray-700 text-xs">
              Online or by phone, no doctors referral required
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
              2
            </div>
            <div className="text-purple-600 mb-1">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xs font-bold text-purple-600 mb-1">VISIT A LOCAL LAB</h3>
            <p className="text-gray-700 text-xs">
              Get tested locally at one of our 4,500+ labs
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">
              3
            </div>
            <div className="text-purple-600 mb-1">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xs font-bold text-purple-600 mb-1">GET YOUR RESULTS</h3>
            <p className="text-gray-700 text-xs">
              Receive your lab results within 1-3 business days!
            </p>
          </div>
        </div>

        {/* Order Section */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h2 className="text-xl font-bold text-purple-800 mb-2">
            Order Your Comprehensive Hormone Assessment
          </h2>
          <div className="text-3xl font-bold text-green-600 mb-2">$199</div>
          <p className="text-sm text-gray-600 mb-4">Complete Perimenopause Testing Panel</p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleOrderClick}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg text-lg mb-4 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Order Bloodwork Now!
        </button>

        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure checkout
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            HSA/FSA eligible
          </span>
          <span>Free shipping</span>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={closeLeadModal}
        source="quiz_results"
        quizResults={{
          source: "HORMONE_ORDER_FORM",
          phase: "Order Process",
          score: 100,
          page_source: 'results_page',
          timestamp: new Date().toISOString(),
          interest: "hormone_order_form"
        }}
      />
    </div>
  );
};

export default HormoneOrderForm;
