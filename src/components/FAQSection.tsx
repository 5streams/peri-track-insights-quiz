
import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is Peritrack different from other period tracking apps?",
      answer: "Most period trackers focus on fertility and regular cycles. Peritrack is specifically designed for perimenopause - we track symptoms like hot flashes, mood changes, sleep issues, and energy levels. Our AI learns your unique patterns and provides personalized relief strategies, not just predictions."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most women see their first insights within 24 hours of tracking. Pattern recognition improves with more data - after 1-2 weeks, Luna can start predicting your symptoms. Symptom improvement typically begins within 2-3 weeks of following personalized recommendations."
    },
    {
      question: "Is my health data secure and private?",
      answer: "Absolutely. Your data is encrypted and stored securely. We never share your personal health information with third parties. You own your data and can export or delete it anytime. We're HIPAA compliant and follow strict privacy protocols."
    },
    {
      question: "Can I use Peritrack if I'm still having periods?",
      answer: "Yes! Peritrack works whether you're in early perimenopause (still having periods but experiencing symptoms) or late perimenopause (irregular or no periods). Our AI adapts to your unique situation and cycle patterns."
    },
    {
      question: "What makes Luna different from regular chatbots?",
      answer: "Luna is specifically trained on perimenopause research and learns from your personal tracking data. She remembers your history, understands your triggers, and provides advice tailored to your symptoms and what's worked for you before. She's like having a perimenopause specialist available 24/7."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription anytime from your account settings. There are no cancellation fees or long-term commitments. Your data remains accessible for 90 days after cancellation in case you want to reactivate."
    }
  ];

  return (
    <section className="faq-section py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="font-headline font-bold text-h2 text-primary mb-4 fade-in-up">
            Frequently Asked Questions
          </h2>
          <p className="text-body-large text-warm-gray fade-in-up">
            Everything you need to know about Peritrack
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="faq-item bg-white rounded-xl shadow-lg overflow-hidden fade-in-up"
            >
              <button
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-semibold text-primary pr-4 leading-relaxed">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <span className="text-sm font-bold">↓</span>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-4 pb-4">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-warm-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
