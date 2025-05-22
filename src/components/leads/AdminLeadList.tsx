
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { getLeads, clearLeads, saveLead, exportToCSV, Lead } from "@/utils/leadStorage";
import { RefreshCw, FileText, Plus, Trash2 } from "lucide-react";

const AdminLeadList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();
  
  // Load leads
  const loadLeads = () => {
    try {
      setIsLoading(true);
      const allLeads = getLeads();
      setLeads(allLeads);
      setLastRefresh(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading leads:", error);
      toast({
        title: "Error loading leads",
        description: "There was a problem retrieving leads.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Load leads on mount and set up interval
  useEffect(() => {
    // Initial load
    loadLeads();
    
    // Refresh every 10 seconds
    const interval = setInterval(loadLeads, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter leads by search term
  const filteredLeads = leads.filter(lead => {
    return (
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Create test lead
  const createTestLead = () => {
    try {
      const testName = `Test User ${Math.floor(Math.random() * 1000)}`;
      const testEmail = `test${Date.now()}@example.com`;
      
      saveLead(
        testName, 
        testEmail, 
        'test',
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
  
  // Handle export to CSV
  const handleExportCSV = () => {
    try {
      const csvContent = exportToCSV();
      
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
        variant: "destructive"
      });
    }
  };
  
  // Clear all leads
  const handleClearLeads = () => {
    if (window.confirm("Are you sure you want to delete ALL leads? This cannot be undone.")) {
      clearLeads();
      setLeads([]);
      toast({
        title: "All Leads Cleared",
        description: "All leads have been deleted.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-white shadow-sm border">
      <CardHeader className="bg-[#f4edfd] pb-4">
        <CardTitle className="font-playfair text-xl text-[#6b4e82] flex items-center justify-between">
          <span>Lead Management</span>
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
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 items-end">
            <Button 
              onClick={loadLeads}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
            
            <Button 
              onClick={handleExportCSV}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <FileText className="h-4 w-4 mr-1" /> Export CSV
            </Button>
            
            <Button 
              onClick={createTestLead}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-1" /> Test Lead
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
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{new Date(lead.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{lead.notes || '-'}</TableCell>
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
                <p className="text-gray-500">
                  No leads found. Try adding a test lead or capturing leads from the quiz.
                </p>
                <Button 
                  onClick={createTestLead}
                  variant="secondary"
                  className="text-sm"
                >
                  Create Test Lead
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminLeadList;
