import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLeads, Lead, clearLeads, initializeLeadStorage, saveLead, validateLeadStorage } from "@/utils/leadTracking";
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
import { RefreshCw, Trash2, AlertCircle, Bug } from "lucide-react";

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();
  
  // Load leads with better error handling and feedback
  const loadLeads = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    
    // Make sure storage is initialized
    try {
      initializeLeadStorage();
      
      // Direct localStorage access for debugging
      console.log("LeadList: Checking direct localStorage access");
      const rawData = localStorage.getItem('peritrack_leads');
      console.log("LeadList: Raw leads data from localStorage:", rawData);
      
      // Manual parsing as a fallback
      let parsedLeads: Lead[] = [];
      if (rawData) {
        try {
          const parsed = JSON.parse(rawData);
          parsedLeads = Array.isArray(parsed) ? parsed : [];
          console.log("LeadList: Manually parsed leads:", parsedLeads);
        } catch (parseError) {
          console.error("LeadList: Error parsing leads manually:", parseError);
        }
      }
      
      // Get leads through the utility function
      const allLeads = getLeads();
      console.log("LeadList: Leads loaded via getLeads():", allLeads);
      
      // Use whichever source has leads
      const leadsToUse = allLeads.length > 0 ? allLeads : parsedLeads;
      setLeads(leadsToUse);
      
      // Provide user feedback
      if (leadsToUse.length === 0) {
        console.log("LeadList: No leads found through any method");
      } else {
        console.log(`LeadList: Loaded ${leadsToUse.length} leads successfully`);
      }
      
      // Check localStorage status
      const storageKeys = Object.keys(localStorage);
      console.log("LeadList: All localStorage keys:", storageKeys);
      
      // Check if storage validation passes
      const isValid = validateLeadStorage();
      console.log(`LeadList: Lead storage validation ${isValid ? 'PASSED' : 'FAILED'}`);
      
    } catch (error) {
      console.error("LeadList: Error loading leads:", error);
      toast({
        title: "Error loading leads",
        description: "There was a problem loading lead data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check for updates from other components
  useEffect(() => {
    const checkForUpdates = () => {
      const updated = localStorage.getItem("leads_updated");
      if (updated) {
        console.log("LeadList: Detected leads update, reloading");
        loadLeads();
        localStorage.removeItem("leads_updated"); // Clear the flag
      }
    };
    
    // Set up interval to check for updates
    const updateInterval = setInterval(checkForUpdates, 1000);
    return () => clearInterval(updateInterval);
  }, []);
  
  useEffect(() => {
    // Initialize storage and load leads on component mount
    console.log("LeadList: Component mounted, loading leads");
    loadLeads();
    
    // Set up an interval to automatically refresh leads
    const interval = setInterval(() => {
      console.log("LeadList: Auto refreshing leads");
      loadLeads();
    }, 10000); // Check for new leads every 10 seconds
    
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
  
  // Create a test lead for debugging - improved version
  const createTestLead = () => {
    try {
      const testName = `Test User ${Math.floor(Math.random() * 1000)}`;
      const testEmail = `test${Date.now()}@example.com`;
      console.log("LeadList: Creating test lead with", testName, testEmail);
      
      const lead = saveLead(
        testName, 
        testEmail, 
        Math.random() > 0.5 ? 'quiz_results' : 'free_trial',
        Math.random() > 0.5 ? (Math.random() > 0.5 ? 'monthly' : 'annual') : null,
        { test: "data", timestamp: new Date().toISOString() },
        `Test lead created at ${new Date().toISOString()}`
      );
      
      console.log("LeadList: Test lead created:", lead);
      
      // Force reload leads
      loadLeads();
      
      toast({
        title: "Test Lead Created",
        description: "A test lead has been added successfully."
      });
    } catch (error) {
      console.error("LeadList: Error creating test lead:", error);
      toast({
        title: "Error Creating Test Lead",
        description: "There was a problem creating the test lead.",
        variant: "destructive"
      });
    }
  };
  
  // Debug localStorage content
  const debugStorage = () => {
    const leadsData = localStorage.getItem('peritrack_leads');
    console.log('===== STORAGE DEBUG =====');
    console.log('Raw storage data:', leadsData);
    
    try {
      if (leadsData) {
        const parsed = JSON.parse(leadsData);
        console.log('Parsed leads:', parsed);
        console.log('Is array:', Array.isArray(parsed));
        console.log('Length:', Array.isArray(parsed) ? parsed.length : 'N/A');
      } else {
        console.log('No leads data in localStorage');
      }
    } catch (error) {
      console.error('Parse error:', error);
    }
    
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('========================');
    
    toast({
      title: "Debug Info",
      description: "Check console for detailed lead storage information.",
    });
    
    // Validate storage
    const isValid = validateLeadStorage();
    toast({
      title: `Storage Validation: ${isValid ? 'PASSED' : 'FAILED'}`,
      variant: isValid ? 'default' : 'destructive',
    });
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
    console.log("LeadList: Manual refresh triggered");
    toast({
      title: "Refreshing Leads",
      description: "Loading latest leads data..."
    });
    loadLeads();
  };
  
  // Clear all leads and recreate storage
  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to delete ALL leads? This cannot be undone.')) {
      console.log("LeadList: Clearing all leads");
      clearLeads();
      setLeads([]);
      initializeLeadStorage(); // Re-initialize empty storage
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal bg-[#5D4154] text-white px-3 py-1 rounded-full">
              {leads.length} Total Leads
            </span>
            <span className="text-xs text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
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
              disabled={leads.length === 0}
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
              onClick={debugStorage}
              variant="outline"
              className="w-full sm:w-auto text-amber-500 hover:text-amber-700"
              title="Debug storage"
            >
              <Bug className="h-4 w-4 mr-1" /> Debug
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
        
        {leads.length > 0 ? (
          <Table>
            <TableCaption>Showing {leads.length} leads</TableCaption>
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
              {leads.map((lead) => (
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
                        {lead.pricingPlan === 'monthly' ? '$9.99 (Monthly)' : '$99 (Annual)'}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell className="text-right">{new Date(lead.timestamp).toLocaleString()}</TableCell>
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
                <div className="flex justify-center gap-2">
                  <Button 
                    onClick={createTestLead}
                    variant="secondary"
                    className="text-sm"
                  >
                    Create Test Lead
                  </Button>
                  <Button 
                    onClick={debugStorage}
                    variant="secondary"
                    className="text-sm"
                  >
                    Debug Storage
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadList;
