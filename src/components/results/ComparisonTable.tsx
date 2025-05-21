
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";

const ComparisonTable: React.FC = () => {
  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] text-center mb-6">
          EXPLORE YOUR OPTIONS
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#F9F5FF]/50">
                <th className="text-left p-3 border-b-2 border-[#9b87f5]/30 text-[#5D4154]">Comparison</th>
                <th className="text-center p-3 border-b-2 border-[#9b87f5]/30 text-[#5D4154]">Without Dedicated Support</th>
                <th className="text-center p-3 border-b-2 border-[#9b87f5]/30 text-[#5D4154]">With PeriTrack</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-3 text-[#5D4154] font-medium">Finding Information</td>
                <td className="p-3 text-center text-gray-700">Several years of research and trial-and-error</td>
                <td className="p-3 text-center text-gray-700">Organized information in one place</td>
              </tr>
              <tr className="border-b border-gray-200 bg-[#F9F5FF]/10">
                <td className="p-3 text-[#5D4154] font-medium">Tracking Symptoms</td>
                <td className="p-3 text-center text-gray-700">
                  <div className="flex justify-center">
                    <X className="h-5 w-5 text-rose-500" />
                    <span className="sr-only">No</span>
                  </div>
                </td>
                <td className="p-3 text-center text-gray-700">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5]" />
                    <span className="sr-only">Yes</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 text-[#5D4154] font-medium">Identifying Patterns</td>
                <td className="p-3 text-center text-gray-700">Difficult without organized data</td>
                <td className="p-3 text-center text-gray-700">Advanced pattern recognition tools</td>
              </tr>
              <tr className="border-b border-gray-200 bg-[#F9F5FF]/10">
                <td className="p-3 text-[#5D4154] font-medium">Lab Result Organization</td>
                <td className="p-3 text-center text-gray-700">
                  <div className="flex justify-center">
                    <X className="h-5 w-5 text-rose-500" />
                    <span className="sr-only">No</span>
                  </div>
                </td>
                <td className="p-3 text-center text-gray-700">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5]" />
                    <span className="sr-only">Yes</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 text-[#5D4154] font-medium">24/7 Information Access</td>
                <td className="p-3 text-center text-gray-700">
                  <div className="flex justify-center">
                    <X className="h-5 w-5 text-rose-500" />
                    <span className="sr-only">No</span>
                  </div>
                </td>
                <td className="p-3 text-center text-gray-700">
                  <div className="flex justify-center">
                    <CheckCircle className="h-5 w-5 text-[#9b87f5]" />
                    <span className="sr-only">Yes</span>
                  </div>
                </td>
              </tr>
              <tr className="bg-[#F9F5FF]/10">
                <td className="p-3 text-[#5D4154] font-medium">Prepared for Healthcare Visits</td>
                <td className="p-3 text-center text-gray-700">Often unprepared or overwhelmed</td>
                <td className="p-3 text-center text-gray-700">Organized data and discussion guides</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-[#5D4154] mb-4 text-center">EXPERIENCES WITH PERITRACK</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#9b87f5] font-bold text-lg mb-2">Better Informed</div>
              <p className="text-sm text-gray-600">Feel more confident about understanding your unique perimenopause journey</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#9b87f5] font-bold text-lg mb-2">Pattern Recognition</div>
              <p className="text-sm text-gray-600">Identify potential triggers and patterns in your symptoms</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#9b87f5] font-bold text-lg mb-2">More Confident</div>
              <p className="text-sm text-gray-600">Feel empowered about managing your health during this transition</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#9b87f5] font-bold text-lg mb-2">Better Healthcare</div>
              <p className="text-sm text-gray-600">Have more productive and informed discussions with providers</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonTable;
