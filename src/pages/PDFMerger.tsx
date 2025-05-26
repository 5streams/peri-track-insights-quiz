import React, { useState } from 'react';
import PDFMergerLeadModal from '@/components/PDFMergerLeadModal';

const PDFMerger = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const startTrial = () => {
    setIsLeadModalOpen(true);
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-gray-900 no-underline">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              FP
            </div>
            <span>FileFlow Pro</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 no-underline font-medium hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 no-underline font-medium hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#enterprise" className="text-gray-600 no-underline font-medium hover:text-gray-900 transition-colors">Enterprise</a>
            <a href="#support" className="text-gray-600 no-underline font-medium hover:text-gray-900 transition-colors">Support</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={startTrial}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all border-none cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </header>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-3 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
              <span>150,000+ Users</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
              <span>No Hidden Costs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-purple-50/50"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-blue-200">
            <span>✨</span>
            Trusted by Fortune 500 companies
          </div>
          
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Professional PDF Merge & Document Processing Platform
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Merge PDF files instantly, convert documents, process data with enterprise security. 
            Trusted by 150,000+ professionals. Transparent pricing, guaranteed results.
          </p>
          
          <div className="flex gap-4 justify-center items-center flex-wrap mb-12">
            <button 
              onClick={startTrial}
              className="bg-blue-500 text-white px-9 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-blue-500/25 border-none cursor-pointer"
            >
              Start Free Trial - $12/month
            </button>
            <a href="#features" className="bg-transparent text-blue-500 px-9 py-4 border-2 border-blue-500 rounded-xl font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all no-underline">
              See Features
            </a>
          </div>
          
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-gray-900 mb-1">2.5M+</span>
              <div className="text-sm text-gray-600 font-medium">Files processed monthly</div>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-gray-900 mb-1">150K+</span>
              <div className="text-sm text-gray-600 font-medium">Enterprise customers</div>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-gray-900 mb-1">99.9%</span>
              <div className="text-sm text-gray-600 font-medium">Uptime guarantee</div>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-gray-900 mb-1">30 sec</span>
              <div className="text-sm text-gray-600 font-medium">Average processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Professional PDF Merge & Document Processing Tools
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Merge PDF files, convert documents, process data with enterprise-grade security. 
              Replace unreliable free tools with professional solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📄
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Professional PDF Merge</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Merge multiple PDF files into single documents instantly. Combine contracts, reports, presentations with enterprise-grade reliability and no file size limits.
              </p>
              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold text-sm border-l-4 border-blue-500">
                Capability: Merge 100+ PDFs in seconds
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning-Fast Processing</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Process files in seconds, not minutes. Our enterprise infrastructure handles even the largest documents instantly with guaranteed 99.9% uptime.
              </p>
              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold text-sm border-l-4 border-blue-500">
                Time savings: 15+ hours per week
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🛡️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                SOC 2 Type II compliance, bank-level encryption, automatic file deletion. Your confidential data is protected with enterprise-grade security standards.
              </p>
              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold text-sm border-l-4 border-blue-500">
                Protection: Complete data privacy
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🤖
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Intelligence</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Smart data cleaning, automatic formatting, intelligent file optimization. Advanced AI handles complex processing while maintaining accuracy.
              </p>
              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold text-sm border-l-4 border-blue-500">
                Quality: Professional results every time
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Batch Operations</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Process thousands of files simultaneously with enterprise-grade performance. Custom automation rules scale with your business needs.
              </p>
              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold text-sm border-l-4 border-blue-500">
                Efficiency: Process 1000s of files at once
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 hover:border-blue-500 hover:-translate-y-2 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                🔗
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise Integration</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Seamless integration with your existing workflow. API access, webhook notifications, and direct connections to enterprise platforms.
              </p>
              <div className="bg-blue-50 text-blue-800 px-4 py-3 rounded-lg font-semibold text-sm border-l-4 border-blue-500">
                Integration: Works with your tools
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-gray-600">See how enterprises across industries rely on FileFlow Pro for mission-critical document processing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm relative">
              <div className="absolute -top-5 left-10 text-6xl text-blue-500 font-serif font-bold">"</div>
              <p className="text-lg text-gray-700 mb-8 italic leading-relaxed">
                FileFlow Pro solved our PDF merge bottleneck completely. We process 500+ contracts daily, merging multiple documents into final agreements. The batch PDF merge feature processes what used to take hours in just minutes.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SC
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Operations Director, LegalTech Corp</p>
                </div>
              </div>
              <div className="bg-green-50 text-green-800 px-4 py-2 rounded-full font-semibold text-sm inline-block mt-4 border border-green-200">
                Result: Merge 500+ PDFs daily
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm relative">
              <div className="absolute -top-5 left-10 text-6xl text-blue-500 font-serif font-bold">"</div>
              <p className="text-lg text-gray-700 mb-8 italic leading-relaxed">
                The batch processing capabilities eliminated our biggest bottleneck. What used to take our team 3 days now happens in 30 minutes. FileFlow Pro's reliability and speed are unmatched in our industry.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  MR
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Marcus Rodriguez</h4>
                  <p className="text-sm text-gray-600">IT Director, Manufacturing Solutions</p>
                </div>
              </div>
              <div className="bg-green-50 text-green-800 px-4 py-2 rounded-full font-semibold text-sm inline-block mt-4 border border-green-200">
                Result: 400% efficiency increase
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm relative">
              <div className="absolute -top-5 left-10 text-6xl text-blue-500 font-serif font-bold">"</div>
              <p className="text-lg text-gray-700 mb-8 italic leading-relaxed">
                Security and compliance are non-negotiable for our financial services firm. FileFlow Pro delivers enterprise-grade protection with the performance our clients expect. The transparent pricing model fits our budget planning perfectly.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  EW
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Emily Watson</h4>
                  <p className="text-sm text-gray-600">Chief Technology Officer, FinanceFirst</p>
                </div>
              </div>
              <div className="bg-green-50 text-green-800 px-4 py-2 rounded-full font-semibold text-sm inline-block mt-4 border border-green-200">
                Result: Zero security incidents
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white text-center" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing for Every Business</h2>
            <p className="text-lg text-gray-600">No hidden costs. No surprises. No gimmicks. Professional tools with professional pricing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-blue-500 p-12 rounded-3xl relative transform scale-105 bg-gradient-to-br from-blue-50 to-white">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-8 py-2 rounded-full font-bold text-sm tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Professional</h3>
              <div className="text-6xl font-black text-blue-500 mb-2 leading-none">$12</div>
              <p className="text-gray-600 mb-8">per month, billed monthly</p>
              
              <ul className="text-left mb-10 space-y-3">
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Unlimited PDF merge & processing
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  All file formats supported
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Batch processing (1000+ files)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  AI-powered features
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Enterprise security (SOC 2)
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Priority email support
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  API access included
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  99.9% uptime SLA
                </li>
              </ul>
              
              <button 
                onClick={startTrial}
                className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 border-none rounded-xl font-bold text-lg cursor-pointer hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all mb-6 shadow-lg hover:shadow-blue-500/30"
              >
                Start Free Trial
              </button>
              
              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <div className="text-green-800 font-semibold text-sm">
                  <strong>14-day free trial</strong> • No credit card required • Cancel anytime
                </div>
              </div>
            </div>
            
            <div className="bg-white border-2 border-gray-200 p-12 rounded-3xl hover:-translate-y-2 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Enterprise</h3>
              <div className="text-6xl font-black text-blue-500 mb-2 leading-none">$79</div>
              <p className="text-gray-600 mb-8">per month, billed monthly</p>
              
              <ul className="text-left mb-10 space-y-3">
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Everything in Professional
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  10 team members included
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Advanced admin controls
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Team collaboration features
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Advanced analytics & reporting
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Custom integrations
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Priority phone support
                </li>
                <li className="flex items-center gap-3 font-medium">
                  <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-sm font-bold flex-shrink-0">✓</span>
                  Dedicated account manager
                </li>
              </ul>
              
              <button 
                onClick={startTrial}
                className="w-full bg-blue-500 text-white p-4 border-none rounded-xl font-bold text-lg cursor-pointer hover:bg-blue-600 transform hover:-translate-y-1 transition-all mb-6"
              >
                Start Enterprise Trial
              </button>
              
              <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                <div className="text-green-800 font-semibold text-sm">
                  <strong>14-day free trial</strong> • No credit card required • Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white" id="enterprise">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Enterprise-Grade Security & Compliance</h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Built for organizations that require the highest levels of security, compliance, and reliability. 
                FileFlow Pro meets enterprise standards while delivering exceptional performance.
              </p>
              
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                  SOC 2 Type II compliance
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                  GDPR & CCPA compliant
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                  End-to-end encryption
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                  Automatic file deletion
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                  Audit logs & reporting
                </li>
                <li className="flex items-center gap-3 text-gray-200">
                  <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</span>
                  99.9% uptime SLA
                </li>
              </ul>
              
              <div className="flex gap-4">
                <button 
                  onClick={startTrial}
                  className="bg-blue-500 text-white px-9 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transform hover:-translate-y-1 transition-all border-none cursor-pointer"
                >
                  Start Enterprise Trial
                </button>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-10 backdrop-blur-lg border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-xl text-center">
                  <div className="text-3xl mb-3">🔒</div>
                  <div className="text-gray-300 font-semibold text-sm">Bank-Level<br />Encryption</div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl text-center">
                  <div className="text-3xl mb-3">🛡️</div>
                  <div className="text-gray-300 font-semibold text-sm">SOC 2<br />Compliant</div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <div className="text-gray-300 font-semibold text-sm">Audit<br />Logs</div>
                </div>
                <div className="bg-white/5 p-6 rounded-xl text-center">
                  <div className="text-3xl mb-3">⚡</div>
                  <div className="text-gray-300 font-semibold text-sm">99.9%<br />Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold mb-6 tracking-tight">Ready to Transform Your Workflow?</h2>
          <p className="text-xl mb-12 opacity-95 leading-relaxed">
            Join 150,000+ professionals who trust FileFlow Pro for their most important projects.
          </p>
          
          <div className="bg-white/10 p-6 rounded-2xl mb-10 backdrop-blur-sm border border-white/20">
            <h4 className="text-yellow-300 font-bold text-lg mb-2">🌟 Why Choose FileFlow Pro?</h4>
            <p className="text-sm opacity-90">
              Unlike other tools that trick you with hidden costs and fake "free" PDF merging, 
              FileFlow Pro shows transparent pricing upfront. Professional PDF tools for professional people.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={startTrial}
              className="bg-white text-blue-600 px-9 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all border-none cursor-pointer"
            >
              Start Free Trial - $12/month
            </button>
            <button className="bg-transparent text-white px-9 py-4 border-2 border-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all cursor-pointer">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-500 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                  FP
                </div>
                <span className="text-xl font-bold text-white">FileFlow Pro</span>
              </div>
              <p className="leading-relaxed max-w-sm">
                Enterprise document processing platform trusted by 150,000+ professionals worldwide. 
                Transparent pricing, enterprise security, guaranteed results.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-5">Product</h4>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Features</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Pricing</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">API Documentation</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Integrations</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Security</a>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-5">Company</h4>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">About Us</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Careers</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Press</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Blog</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Contact</a>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-5">Support</h4>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Help Center</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Status Page</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Community</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Enterprise Support</a>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-5">Legal</h4>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Privacy Policy</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Terms of Service</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Cookie Policy</a>
              <a href="#" className="block mb-3 text-gray-500 hover:text-white transition-colors no-underline">Compliance</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              &copy; 2025 FileFlow Pro. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm no-underline">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm no-underline">Terms</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm no-underline">Security</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm no-underline">Status</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Lead Capture Modal */}
      <PDFMergerLeadModal
        isOpen={isLeadModalOpen}
        onClose={handleCloseLeadModal}
      />
    </div>
  );
};

export default PDFMerger;
