
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLeads, Lead } from "@/utils/leadTracking";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>('all');
  
  useEffect(() => {
    // Load leads from localStorage
    const allLeads = getLeads();
    setLeads(allLeads);
    
    // Set up a refresh interval
    const interval = setInterval(() => {
      setLeads(getLeads());
    }, 5000); // Check for new leads every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter leads based on search term and source filter
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterSource === 'all' || 
      lead.source === filterSource;
    
    return matchesSearch && matchesFilter;
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Export leads to CSV
  const exportLeads = () => {
    const headers = ["ID", "First Name", "Email", "Source", "Pricing Plan", "Timestamp"];
    
    const csvRows = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.id,
        `"${lead.firstName}"`,
        `"${lead.email}"`,
        lead.source,
        lead.pricingPlan || 'N/A',
        lead.timestamp
      ].join(','))
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `peritrack_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  return (
    <Card className="bg-white shadow-sm border">
      <CardHeader className="bg-[#FFECD6]/30 pb-4">
        <CardTitle className="font-playfair text-xl text-[#5D4154] flex items-center justify-between">
          <span>Lead Management Dashboard</span>
          <span className="text-sm font-normal bg-[#5D4154] text-white px-3 py-1 rounded-full">
            {leads.length} Total Leads
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search">Search Leads</Label>
            <Input
              id="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-48">
            <Label htmlFor="filter">Filter By Source</Label>
            <select
              id="filter"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
            >
              <option value="all">All Sources</option>
              <option value="quiz_results">Quiz Results</option>
              <option value="free_trial">Free Trial</option>
            </select>
          </div>
          
          <div className="w-full sm:w-auto flex items-end">
            <Button 
              onClick={exportLeads}
              className="w-full sm:w-auto bg-[#5D4154] hover:bg-[#5D4154]/90 text-white"
            >
              Export to CSV
            </Button>
          </div>
        </div>
        
        {filteredLeads.length > 0 ? (
          <Table>
            <TableCaption>Showing {filteredLeads.length} of {leads.length} leads</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.firstName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.source === 'quiz_results' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {lead.source === 'quiz_results' ? 'Quiz Results' : 'Free Trial'}
                    </span>
                  </TableCell>
                  <TableCell>{lead.pricingPlan || '-'}</TableCell>
                  <TableCell className="text-right">{formatDate(lead.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No leads found. Try adjusting your search or filters.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadList;
