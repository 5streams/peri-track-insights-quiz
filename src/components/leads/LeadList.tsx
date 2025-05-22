import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLeads, Lead, clearLeads, initializeLeadStorage } from "@/utils/leadTracking";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Trash2, AlertCircle } from "lucide-react";

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Load leads with better error handling and feedback
  const loadLeads = () => {
    setIsLoading(true);
    // Make sure storage is initialized
    initializeLeadStorage();
    
    // Load leads from localStorage - add debugging
    try {
      console.log("Checking raw leads data from localStorage...");
      const rawData = localStorage.getItem('peritrack_leads');
      console.log("Raw leads data from localStorage:", rawData);
      
      const allLeads = getLeads();
      console.log("Parsed leads loaded in admin:", allLeads);
      
      setLeads(allLeads);
      
      if (allLeads.length === 0) {
        console.log("No leads found. Storage might be empty or corrupted.");
        
        // Additional debugging for localStorage
        const storageKeys = Object.keys(localStorage);
        console.log("All localStorage keys:", storageKeys);
      }
    } catch (error) {
      console.error("Error loading leads:", error);
      toast({
        title: "Error loading leads",
        description: "There was a problem loading lead data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Initialize storage and load leads on component mount
    initializeLeadStorage();
    loadLeads();
    
    // Set up a refresh interval
    const interval = setInterval(() => {
      loadLeads();
    }, 5000); // Check for new leads every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Format pricing plan for display
  const formatPricingPlan = (plan: string | null | undefined) => {
    if (!plan) return '-';
    
    switch(plan) {
      case 'monthly':
        return '$9.99 (Monthly)';
      case 'annual':
        return '$99 (Annual)';
      default:
        return plan;
    }
  };
  
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
  
  // Create a test lead for debugging
  const createTestLead = () => {
    try {
      const testLead = {
        firstName: `Test User ${Math.floor(Math.random() * 1000)}`,
        email: `test${Date.now()}@example.com`,
        source: 'quiz_results' as const
      };
      
      // Import the saveLead function
      const { saveLead } = require('@/utils/leadTracking');
      
      // Save the test lead
      saveLead(testLead.firstName, testLead.email, testLead.source);
      
      toast({
        title: "Test Lead Created",
        description: "A test lead has been added successfully."
      });
      
      // Reload leads immediately
      loadLeads();
    } catch (error) {
      console.error("Error creating test lead:", error);
      toast({
        title: "Error Creating Test Lead",
        description: "There was a problem creating the test lead.",
        variant: "destructive"
      });
    }
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
    
    toast({
      title: "Export Complete",
      description: `${filteredLeads.length} leads exported successfully.`
    });
  };
  
  // Handle manual refresh with more feedback
  const handleRefresh = () => {
    console.log("Manual refresh triggered");
    toast({
      title: "Refreshing Leads",
      description: "Loading latest leads data..."
    });
    loadLeads();
  };
  
  // Clear all leads (for testing)
  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to delete ALL leads? This cannot be undone.')) {
      clearLeads();
      setLeads([]);
      toast({
        title: "Leads Cleared",
        description: "All leads have been removed from storage.",
        variant: "destructive"
      });
    }
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
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 items-end">
            <Button 
              onClick={exportLeads}
              className="w-full sm:w-auto bg-[#5D4154] hover:bg-[#5D4154]/90 text-white"
              disabled={filteredLeads.length === 0}
            >
              Export to CSV
            </Button>
            <Button 
              onClick={handleRefresh}
              variant="outline"
              className="w-full sm:w-auto"
              title="Refresh leads"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
            <Button 
              onClick={createTestLead}
              variant="outline"
              className="w-full sm:w-auto text-blue-500 hover:text-blue-700"
              title="Add test lead"
            >
              + Test Lead
            </Button>
            <Button 
              onClick={handleClearLeads}
              variant="outline"
              className="w-full sm:w-auto text-red-500 hover:text-red-700"
              title="Clear all leads (for testing only)"
            >
              <Trash2 className="h-4 w-4 mr-1" /> Clear All
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
                  <TableCell>
                    {lead.pricingPlan ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.pricingPlan === 'monthly' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {formatPricingPlan(lead.pricingPlan)}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">{formatDate(lead.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 border rounded-md bg-gray-50">
            {isLoading ? (
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <RefreshCw className="animate-spin h-4 w-4" /> Loading leads...
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-500 flex items-center justify-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  No leads found. Try adjusting your search or filters.
                </p>
                <div className="flex justify-center">
                  <Button 
                    onClick={createTestLead}
                    variant="secondary"
                    className="text-sm"
                  >
                    Create Test Lead
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {leads.length === 0 && !isLoading && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mt-4">
            <p className="text-blue-700 mb-2 font-medium">
              No leads have been captured yet
            </p>
            <p className="text-blue-600 text-sm mb-3">
              When users fill out the quiz results form or start a free trial, their information will appear here.
              Try taking the quiz or signing up for a free trial to generate your first lead.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={createTestLead}
                size="sm"
                variant="outline"
                className="text-xs text-blue-700 border-blue-300"
              >
                Create Test Lead
              </Button>
              <Button
                onClick={handleRefresh} 
                size="sm"
                variant="outline"
                className="text-xs text-blue-700 border-blue-300"
              >
                <RefreshCw className="h-3 w-3 mr-1" /> Refresh
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadList;
