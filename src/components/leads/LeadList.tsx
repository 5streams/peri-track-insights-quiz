
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  getLeads, 
  Lead, 
  clearLeads, 
  saveLead, 
  updateLead, 
  exportLeadsCSV 
} from "@/utils/leadTracking";
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
import { RefreshCw, Trash2, Bug, FileText, Check, X } from "lucide-react";

const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayLeads: 0,
    conversionRate: 0
  });
  const { toast } = useToast();
  
  // Load leads function
  const loadLeads = async () => {
    setIsLoading(true);
    setLastRefresh(new Date());
    
    try {
      // Get all leads
      const allLeads = await getLeads();
      console.log("LeadList: Loaded leads count:", allLeads.length);
      
      // Update state with fetched leads
      setLeads(allLeads);
      
      // Calculate stats
      calculateStats(allLeads);
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
  
  // Calculate dashboard stats
  const calculateStats = (leadsData: Lead[]) => {
    const today = new Date().toDateString();
    const todayLeads = leadsData.filter(lead => 
      lead.created_at && new Date(lead.created_at).toDateString() === today
    );
    const converted = leadsData.filter(lead => lead.status === 'converted');

    setStats({
      totalLeads: leadsData.length,
      todayLeads: todayLeads.length,
      conversionRate: leadsData.length > 0 ? 
        Math.round((converted.length / leadsData.length) * 100) : 0
    });
  };

  // Set up auto-refresh and polling
  useEffect(() => {
    // Initial load
    loadLeads();
    
    // Setup polling interval (every 10 seconds)
    const interval = setInterval(() => {
      loadLeads();
    }, 10000);
    
    // Set up event listener for new leads
    const handleNewLead = () => {
      console.log("LeadList: New lead event detected");
      loadLeads();
    };
    
    // Set up event listener for lead updates
    const handleLeadUpdate = () => {
      console.log("LeadList: Lead update event detected");
      loadLeads();
    };
    
    // Listen for storage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'peritrack_leads' || e.key === 'leads_updated_timestamp') {
        console.log("LeadList: Storage change detected in another tab");
        loadLeads();
      }
    };
    
    // Check for updates on window focus
    const handleFocus = () => {
      loadLeads();
    };
    
    // Register event listeners
    window.addEventListener('peritrack_lead_added', handleNewLead);
    window.addEventListener('peritrack_lead_updated', handleLeadUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('peritrack_lead_added', handleNewLead);
      window.removeEventListener('peritrack_lead_updated', handleLeadUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);
  
  // Filter leads based on search term and source filter
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filterSource === 'all' || 
      lead.source === filterSource;
    
    return matchesSearch && matchesFilter;
  });
  
  // Create a test lead
  const createTestLead = async () => {
    try {
      const testName = `Test User ${Math.floor(Math.random() * 1000)}`;
      const testEmail = `test${Date.now()}@example.com`;
      
      await saveLead(
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
  const createJulieLead = async () => {
    try {
      await saveLead(
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
  
  // Update lead status
  const handleUpdateStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const success = await updateLead(leadId, { 
        status: newStatus,
      });
      
      if (success) {
        toast({
          title: "Status Updated",
          description: `Lead status changed to "${newStatus}"`,
        });
        loadLeads();
      } else {
        toast({
          title: "Update Failed",
          description: "Could not update lead status.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive"
      });
    }
  };
  
  // Add notes to lead
  const addNotesToLead = async (leadId: string) => {
    try {
      const lead = leads.find(l => l.id === leadId);
      if (!lead) return;
      
      const notes = prompt("Add notes for this lead:", lead.notes);
      if (notes === null) return; // User cancelled
      
      const success = await updateLead(leadId, { notes });
      
      if (success) {
        toast({
          title: "Notes Updated",
          description: "Lead notes have been updated.",
        });
        loadLeads();
      } else {
        toast({
          title: "Update Failed",
          description: "Could not update lead notes.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        title: "Error",
        description: "Failed to update notes.",
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
      
      toast({
        title: "Storage Debug Info",
        description: "Check browser console for details.",
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
  
  // Export leads as CSV
  const handleExportCSV = async () => {
    try {
      const csvContent = await exportLeadsCSV();
      
      // Create download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `peritrack-leads-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Leads exported to CSV file.",
      });
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export Error",
        description: "Could not export leads.",
        variant: "destructive",
      });
    }
  };
  
  // Force page reload
  const forcePageReload = () => {
    window.location.href = window.location.pathname + "?cache=" + Date.now();
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
  const handleClearLeads = async () => {
    if (window.confirm('Are you sure you want to delete ALL leads? This cannot be undone.')) {
      // Find the first user ID in the leads list to use for clearing
      const userId = leads.length > 0 && leads[0].user_id;
      
      if (!userId) {
        toast({
          title: "Error",
          description: "No user ID found to clear leads.",
          variant: "destructive"
        });
        return;
      }
      
      await clearLeads(userId);
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#D6BCFA]/30">
            <div className="text-sm text-[#6b4e82]/70">Total Leads</div>
            <div className="text-2xl font-bold text-[#6b4e82]">{stats.totalLeads}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#D6BCFA]/30">
            <div className="text-sm text-[#6b4e82]/70">Today's Leads</div>
            <div className="text-2xl font-bold text-[#6b4e82]">{stats.todayLeads}</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#D6BCFA]/30">
            <div className="text-sm text-[#6b4e82]/70">Conversion Rate</div>
            <div className="text-2xl font-bold text-[#6b4e82]">{stats.conversionRate}%</div>
          </div>
        </div>
      
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
              onClick={handleExportCSV}
              variant="outline"
              className="w-full sm:w-auto text-gray-600"
            >
              <FileText className="h-4 w-4 mr-1" /> Export CSV
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
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
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
                    {lead.pricing_tier ? (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.pricing_tier === 'monthly' 
                          ? 'bg-orange-100 text-orange-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {lead.pricing_tier === 'monthly' ? '$9.99 (Monthly)' : '$99 (Annual)'}
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <select
                      value={lead.status}
                      onChange={(e) => handleUpdateStatus(lead.id, e.target.value as Lead['status'])}
                      className="text-xs p-1 border rounded bg-gray-50"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="converted">Converted</option>
                      <option value="unqualified">Unqualified</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right">{new Date(lead.created_at || '').toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => addNotesToLead(lead.id)}
                        title={lead.notes || "Add notes"}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-green-500"
                        onClick={() => handleUpdateStatus(lead.id, 'converted')}
                        title="Mark as converted"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => handleUpdateStatus(lead.id, 'unqualified')}
                        title="Mark as unqualified"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
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
