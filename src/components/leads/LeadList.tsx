
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
import { RefreshCw, Trash2, Bug } from "lucide-react";

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();
  
  // Load leads function
  const loadLeads = () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    
    try {
      // Get all leads
      const allLeads = getLeads();
      console.log("LeadList: Loaded leads count:", allLeads.length);
      
      // Update state with fetched leads
      setLeads(allLeads);
      
      // Check for any "Julie" leads (for debugging)
      const julieFound = allLeads.some(lead => 
        lead.firstName.toLowerCase().includes('julie')
      );
      
      if (julieFound) {
        console.log("LeadList: Found Julie in the leads!");
      }
    } catch (error) {
      console.error("Error loading leads:", error);
      toast({
        title: "Error loading leads",
        description: "There was a problem retrieving leads.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set up auto-refresh and polling
  useEffect(() => {
    // Initial load
    loadLeads();
    
    // Setup polling interval (every 2 seconds)
    const interval = setInterval(() => {
      loadLeads();
    }, 2000);
    
    // Check for updates on window focus
    const handleFocus = () => {
      loadLeads();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
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
  
  // Create a test lead
  const createTestLead = () => {
    try {
      const testName = `Test User ${Math.floor(Math.random() * 1000)}`;
      const testEmail = `test${Date.now()}@example.com`;
      
      saveLead(
        testName, 
        testEmail, 
        Math.random() > 0.5 ? 'quiz_results' : 'free_trial',
        Math.random() > 0.5 ? (Math.random() > 0.5 ? 'monthly' : 'annual') : null,
        { test: "data" },
        `Test lead created at ${new Date().toISOString()}`
      );
      
      toast({
        title: "Test Lead Created",
        description: "Lead has been created. Refreshing list...",
      });
      
      loadLeads();
    } catch (error) {
      console.error("Error creating test lead:", error);
      toast({
        title: "Error Creating Lead",
        description: "Could not create test lead.",
        variant: "destructive"
      });
    }
  };
  
  // Create a "Julie" test lead specifically
  const createJulieLead = () => {
    try {
      saveLead(
        "Julie", 
        `julie.test${Date.now()}@example.com`, 
        'quiz_results',
        null,
        { test: "Julie's quiz data" },
        `Julie test lead created at ${new Date().toISOString()}`
      );
      
      toast({
        title: "Julie Test Lead Created",
        description: "Julie lead created. Refreshing list...",
      });
      
      loadLeads();
    } catch (error) {
      console.error("Error creating Julie lead:", error);
      toast({
        title: "Error Creating Lead",
        description: "Could not create Julie lead.",
        variant: "destructive"
      });
    }
  };
  
  // Debug storage
  const debugStorage = () => {
    try {
      console.log('===== STORAGE DEBUG =====');
      console.log('Raw storage data:', localStorage.getItem('peritrack_leads'));
      console.log('All localStorage keys:', Object.keys(localStorage));
      
      // Validate storage
      const isValid = validateLeadStorage();
      
      toast({
        title: `Storage Validation: ${isValid ? 'PASSED' : 'FAILED'}`,
        description: "Check console for debug info.",
        variant: isValid ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error("Debug error:", error);
      toast({
        title: "Debug Error",
        description: "Error accessing storage.",
        variant: "destructive",
      });
    }
  };
  
  // Force page reload
  const forcePageReload = () => {
    window.location.reload();
  };
  
  // Manual refresh
  const handleRefresh = () => {
    toast({
      title: "Refreshing Leads",
      description: "Loading latest data..."
    });
    loadLeads();
  };
  
  // Clear all leads
  const handleClearLeads = () => {
    if (window.confirm('Are you sure you want to delete ALL leads? This cannot be undone.')) {
      clearLeads();
      setLeads([]);
      toast({
        title: "Leads Cleared",
        description: "All leads have been removed.",
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
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
              {isLoading ? "Loading..." : "Refresh Now"}
            </Button>
            <Button 
              onClick={createJulieLead}
              variant="outline"
              className="w-full sm:w-auto text-purple-500 hover:text-purple-700"
            >
              + Julie Test
            </Button>
            <Button 
              onClick={createTestLead}
              variant="outline"
              className="w-full sm:w-auto text-blue-500 hover:text-blue-700"
            >
              + Test Lead
            </Button>
            <Button 
              onClick={forcePageReload}
              variant="outline"
              className="w-full sm:w-auto text-green-500 hover:text-green-700"
            >
              ↻ Reload Page
            </Button>
            <Button 
              onClick={debugStorage}
              variant="outline"
              className="w-full sm:w-auto text-amber-500 hover:text-amber-700"
            >
              <Bug className="h-4 w-4 mr-1" /> Debug
            </Button>
            <Button 
              onClick={handleClearLeads}
              variant="outline"
              className="w-full sm:w-auto text-red-500 hover:text-red-700"
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
