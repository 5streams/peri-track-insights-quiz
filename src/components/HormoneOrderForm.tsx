
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Shield, Clock, DollarSign } from "lucide-react";
import LeadCaptureModal from "./leads/LeadCaptureModal";

const HormoneOrderForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const features = [
    { icon: Check, text: "12 Critical Hormones Tested", color: "text-green-600" },
    { icon: Check, text: "Professional Interpretation Included", color: "text-green-600" },
    { icon: Check, text: "Personalized Treatment Recommendations", color: "text-green-600" },
    { icon: Check, text: "Same-Day Lab Appointments Available", color: "text-green-600" },
    { icon: Check, text: "Results in 3-5 Business Days", color: "text-green-600" },
    { icon: Check, text: "30-Day Money-Back Guarantee", color: "text-green-600" }
  ];

  const trustFeatures = [
    { icon: Shield, text: "Secure checkout" },
    { icon: Clock, text: "HSA/FSA eligible" },
    { icon: DollarSign, text: "Free shipping" }
  ];

  return (
    <section className="mt-20 mb-16">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
            Order Your Comprehensive Hormone Assessment
          </h2>
          
          <div className="text-4xl font-bold text-green-600 mb-2">
            $199
          </div>
          
          <p className="text-lg text-purple-600 mb-8">
            Complete Perimenopause Testing Panel
          </p>
          
          <Button 
            onClick={handleOrderClick}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 text-lg font-bold rounded-lg mb-8 w-full md:w-auto"
          >
            ORDER BLOODWORK NOW - GET ANSWERS IN 5 DAYS
          </Button>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                <span className="text-purple-700 text-left">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center items-center space-x-8 pt-6 border-t border-purple-200">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <feature.icon className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-600">{feature.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="quiz_results"
        quizResults={{ source: "HORMONE_TESTING_OFFER" }}
      />
    </section>
  );
};

export default HormoneOrderForm;
