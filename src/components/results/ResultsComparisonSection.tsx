
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X, Check } from "lucide-react";

const ResultsComparisonSection: React.FC = () => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5D4154] mb-6 text-center">
          Peritrack vs. Other Solutions
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#5D4154]">Feature</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-[#9b87f5]">Peritrack</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Generic Apps</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Doctor Visits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-sm">Perimenopause-specific tracking</td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">AI pattern recognition</td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">24/7 availability</td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Personalized recommendations</td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center">
                  <span className="text-xs text-gray-500">Sometimes</span>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm">Cost per month</td>
                <td className="px-4 py-3 text-center text-[#9b87f5] font-semibold">$9.99</td>
                <td className="px-4 py-3 text-center text-gray-600">$5-15</td>
                <td className="px-4 py-3 text-center text-gray-600">$200+</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm">Evidence-based approach</td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                <td className="px-4 py-3 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsComparisonSection;
