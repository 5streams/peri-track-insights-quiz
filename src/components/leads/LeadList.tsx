
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
  
  // Load leads with improved error handling and feedback
  const loadLeads = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    
    console.log("LeadList: Loading leads at", new Date().toISOString());
    
    try {
      // Make sure storage is initialized
      initializeLeadStorage();
      
      // Get the raw data for debugging
      const rawData = localStorage.getItem('peritrack_leads');
      console.log("LeadList: Raw leads data from localStorage:", rawData);
      
      // Get all leads through the utility function
      const allLeads = getLeads();
      console.log("LeadList: Loaded leads via getLeads():", allLeads);
      
      // Update state with fetched leads
      setLeads(allLeads);
      
      // Check for "Julie" in the leads for debugging
      const julieFound = allLeads.some(lead => 
        lead.firstName.toLowerCase().includes('julie')
      );
      
      console.log(`LeadList: Searching for "Julie" in leads: ${julieFound ? 'FOUND' : 'NOT FOUND'}`);
      
      // Get last update time
      const lastUpdate = localStorage.getItem('leads_updated_timestamp');
      console.log("LeadList: Last leads update timestamp:", lastUpdate);
      
    } catch (error) {
      console.error("LeadList: Error loading leads:", error);
      toast({
        title: "Error loading leads",
        description: "There was a problem loading lead data. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Force lead refresh on regular intervals and setup listeners
  useEffect(() => {
    console.log("LeadList: Component mounted, setting up listeners");
    
    // Initial load
    loadLeads();
    
    // Setup aggressive polling interval (every 3 seconds)
    const interval = setInterval(() => {
      console.log("LeadList: Auto-refreshing leads");
      loadLeads();
    }, 3000);
    
    // Listen for storage events from other tabs/windows
    const handleStorageEvent = (event: StorageEvent) => {
      console.log("LeadList: Storage event received", event);
      if (event.key === 'peritrack_leads' || 
          event.key === 'leads_updated' || 
          event.key === 'leads_updated_timestamp' || 
          event.key === 'lead_tracker') {
        console.log("LeadList: Lead-related storage change detected, reloading");
        loadLeads();
      }
    };
    
    // Listen for custom events
    const handleLeadsUpdated = () => {
      console.log("LeadList: leadsUpdated custom event received");
      loadLeads();
    };
    
    // Setup event listeners
    window.addEventListener('storage', handleStorageEvent);
    window.addEventListener('leadsUpdated', handleLeadsUpdated);
    
    // Check for debug flags and new leads on window focus
    const handleFocus = () => {
      console.log("LeadList: Window focus detected, checking for updates");
      loadLeads();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Cleanup event listeners
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageEvent);
      window.removeEventListener('leadsUpdated', handleLeadsUpdated);
      window.removeEventListener('focus', handleFocus);
    };
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
  
  // Create a test lead to verify system is working
  const createTestLead = () => {
    try {
      // Generate a random name and email
      const testName = `Test User ${Math.floor(Math.random() * 1000)}`;
      const testEmail = `test${Date.now()}@example.com`;
      console.log("LeadList: Creating test lead with", testName, testEmail);
      
      // Save the test lead
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
        description: "A test lead has been added successfully.",
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
  
  // Create a test "Julie" lead specifically for debugging
  const createJulieLead = () => {
    try {
      console.log("LeadList: Creating Julie test lead");
      
      const lead = saveLead(
        "Julie", 
        `julie.test${Date.now()}@example.com`, 
        'quiz_results',
        null,
        { test: "Julie's quiz data" },
        `Julie test lead created at ${new Date().toISOString()}`
      );
      
      console.log("LeadList: Julie test lead created:", lead);
      loadLeads();
      
      toast({
        title: "Julie Test Lead Created",
        description: "A test lead for Julie has been added successfully.",
      });
    } catch (error) {
      console.error("Error creating Julie test lead:", error);
    }
  };
  
  // Debug localStorage content
  const debugStorage = () => {
    try {
      const leadsData = localStorage.getItem('peritrack_leads');
      console.log('===== STORAGE DEBUG =====');
      console.log('Raw storage data:', leadsData);
      
      // Force a reload before checking the parsed data
      initializeLeadStorage();
      
      if (leadsData) {
        try {
          const parsed = JSON.parse(leadsData);
          console.log('Parsed leads:', parsed);
          console.log('Is array:', Array.isArray(parsed));
          console.log('Length:', Array.isArray(parsed) ? parsed.length : 'N/A');
          
          // Check for Julie in the parsed data
          if (Array.isArray(parsed)) {
            const julieLeads = parsed.filter(lead => 
              lead && typeof lead.firstName === 'string' && 
              lead.firstName.toLowerCase().includes('julie')
            );
            console.log('Julie leads found in raw data:', julieLeads);
          }
        } catch (parseError) {
          console.error('Parse error:', parseError);
        }
      } else {
        console.log('No leads data in localStorage');
        
        // Try to recreate storage
        initializeLeadStorage();
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
    } catch (error) {
      console.error("Error during storage debugging:", error);
      toast({
        title: "Storage Debug Error",
        description: "Error accessing storage. Check console.",
        variant: "destructive",
      });
    }
  };
  
  // Force a full reload of the page to clear any memory issues
  const forcePageReload = () => {
    toast({
      title: "Reloading Page",
      description: "Refreshing the entire admin panel...",
    });
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
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
      <CardHeader className="bg-[#f4edfd] pb-4">
        <CardTitle className="font-playfair text-xl text-[#6b4e82] flex items-center justify-between">
          <span>Lead Management Dashboard</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal bg-[#6b4e82] text-white px-3 py-1 rounded-full">
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
              onClick={handleRefresh}
              variant="outline"
              className="w-full sm:w-auto"
              title="Refresh leads"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
              {isLoading ? "Loading..." : "Refresh Now"}
            </Button>
            <Button 
              onClick={createJulieLead}
              variant="outline"
              className="w-full sm:w-auto text-purple-500 hover:text-purple-700"
              title="Add Julie test lead"
            >
              + Julie Test
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
              onClick={forcePageReload}
              variant="outline"
              className="w-full sm:w-auto text-green-500 hover:text-green-700"
              title="Force page reload"
            >
              ↻ Reload Page
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
            <TableCaption>
              Showing {filteredLeads.length} leads
              {searchTerm && <span> matching "{searchTerm}"</span>}
              {filterSource !== 'all' && <span> from {filterSource}</span>}
            </TableCaption>
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
                  No leads found. Try adding a test lead or check storage.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button 
                    onClick={createJulieLead}
                    variant="secondary"
                    className="text-sm"
                  >
                    Create Julie Test Lead
                  </Button>
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
                  <Button 
                    onClick={forcePageReload}
                    variant="secondary"
                    className="text-sm"
                  >
                    Reload Page
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
