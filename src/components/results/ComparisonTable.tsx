
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const ComparisonTable: React.FC = () => {
  const isMobile = useIsMobile();

  // Comparison data structure for easier rendering
  const comparisonData = [
    {
      feature: "Finding Information",
      without: "Several years of research and trial-and-error",
      with: "Organized information in one place"
    },
    {
      feature: "Tracking Symptoms",
      without: false,
      with: true
    },
    {
      feature: "Identifying Patterns",
      without: "Difficult without organized data",
      with: "Advanced pattern recognition tools"
    },
    {
      feature: "Lab Result Organization",
      without: false,
      with: true
    },
    {
      feature: "24/7 Information Access",
      without: false,
      with: true
    },
    {
      feature: "Prepared for Healthcare Visits",
      without: "Often unprepared or overwhelmed",
      with: "Organized data and discussion guides"
    }
  ];

  // Render boolean values as icons
  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center">
          <CheckCircle className="h-5 w-5 text-[#9b87f5]" />
          <span className="sr-only">Yes</span>
        </div>
      ) : (
        <div className="flex justify-center">
          <X className="h-5 w-5 text-rose-500" />
          <span className="sr-only">No</span>
        </div>
      );
    }
    return value;
  };

  // Mobile layout - more compact stack
  const renderMobileView = () => (
    <div className="space-y-6">
      {comparisonData.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
          <div className="bg-[#F9F5FF]/50 p-3 border-b font-medium text-[#5D4154]">
            {item.feature}
          </div>
          <div className="grid grid-cols-2">
            <div className="p-3 border-r">
              <div className="text-xs text-gray-500 mb-1">Without Support</div>
              <div className="text-sm">{renderValue(item.without)}</div>
            </div>
            <div className="p-3">
              <div className="text-xs text-gray-500 mb-1">With PeriTrack</div>
              <div className="text-sm">{renderValue(item.with)}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop layout - traditional table
  const renderDesktopView = () => (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#F9F5FF]/50">
          <TableHead className="text-[#5D4154] font-medium">Comparison</TableHead>
          <TableHead className="text-center text-[#5D4154] font-medium">Without Dedicated Support</TableHead>
          <TableHead className="text-center text-[#5D4154] font-medium">With PeriTrack</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comparisonData.map((item, index) => (
          <TableRow key={index} className={index % 2 === 1 ? "bg-[#F9F5FF]/10" : ""}>
            <TableCell className="text-[#5D4154] font-medium">{item.feature}</TableCell>
            <TableCell className="text-center text-gray-700">{renderValue(item.without)}</TableCell>
            <TableCell className="text-center text-gray-700">{renderValue(item.with)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="mb-8 reveal-section transform opacity-0">
      <CardContent className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#5D4154] text-center mb-6">
          EXPLORE YOUR OPTIONS
        </h2>
        
        <div className="overflow-x-auto">
          {isMobile ? renderMobileView() : renderDesktopView()}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-[#5D4154] mb-4 text-center">EXPERIENCES WITH PERITRACK</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
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
