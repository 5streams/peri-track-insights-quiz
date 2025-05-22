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
import {
  saveLead,
  Lead,
  UserActivity,
  getUserCentricActivity
} from "@/utils/leadTracking";
import { RefreshCw, FileText, Plus, Trash2, Eye } from "lucide-react";

// Placeholder for the new modal - create this file later
import LeadDetailModal from './LeadDetailModal'; 

const AdminLeadList = () => {
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();
  
  // State for the detail modal
  const [selectedUserActivity, setSelectedUserActivity] = useState<UserActivity | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const loadUserActivities = async () => {
    setIsLoading(true);
    try {
      const activities = await getUserCentricActivity();
      setUserActivities(activities);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Error loading user activities:", error);
      toast({
        title: "Error Loading Data",
        description: "There was a problem retrieving user activities.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserActivities();
    const interval = setInterval(loadUserActivities, 30000); // Refresh less frequently for RPC
    return () => clearInterval(interval);
  }, []);
  
  const filteredUserActivities = userActivities.filter(activity => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (activity.user_name || '').toLowerCase().includes(searchLower) ||
      activity.user_email.toLowerCase().includes(searchLower)
    );
  });
  
  const createTestLead = async () => { 
    setIsLoading(true);
    try {
      const testName = `Test User ${Math.floor(Math.random() * 1000)}`;
      const testEmail = `test.user.${Date.now()}@example.com`; // Ensure unique email for new user
      
      // This still uses saveLead, which creates a lead and a user if not exists.
      // In a user-centric view, this will add a new user or a new lead to an existing user.
      await saveLead(
        testName, 
        testEmail, 
        'test_lead_admin_panel',
        Math.random() > 0.5 ? 'monthly' : 'annual', // Randomly assign a plan
        { testData: "Sample quiz result for test lead", phase: "Test Phase", score: 50 },
        `Test lead created via admin panel at ${new Date().toISOString()}`
      );
      
      toast({
        title: "Test Lead/User Activity Created",
        description: "Activity has been created. Refreshing list...",
      });
      await loadUserActivities();
    } catch (error) {
      console.error("Error creating test lead/user activity:", error);
      toast({
        title: "Error Creating Test Data",
        description: (error as Error).message || "Could not create test data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportData = async () => {
    setIsLoading(true);
    try {
      // Simplified export for now, or adapt/create a new export function for UserActivity[]
      const csvHeader = 'User ID,User Name,User Email,User Created At,Has Quiz,Number of Leads,Latest Lead Timestamp\n';
      const csvContent = userActivities.map(activity => {
        return [
          activity.user_id,
          activity.user_name || 'N/A',
          activity.user_email,
          activity.user_created_at ? new Date(activity.user_created_at).toLocaleString() : 'N/A',
          activity.quiz_submissions_data && activity.quiz_submissions_data.length > 0 ? 'Yes' : 'No',
          activity.leads_data?.length || 0,
          activity.latest_lead_timestamp ? new Date(activity.latest_lead_timestamp).toLocaleString() : 'N/A'
        ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');
      }).join('\n');
      const fullCsv = csvHeader + csvContent;

      const blob = new Blob([fullCsv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `peritrack-user-activity-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      toast({ title: "Export Successful", description: "User activity data exported." });
    } catch (error) {
      console.error("Export error:", error);
      toast({ title: "Export Error", description: (error as Error).message || "Could not export data.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearLeads = async () => {
    // This function needs to be re-evaluated. Clearing by user_id might be an option
    // but a global clear is very dangerous via client-side and not directly supported by current leadTracking utils.
    if (window.confirm("DANGEROUS: This operation is not fully implemented for user-centric view. Consult Supabase dashboard for bulk deletions.")) {
      toast({ title: "Operation Not Implemented", description: "Please manage bulk deletions via Supabase dashboard.", variant: "default" });
    }
  };

  const handleViewDetails = (activity: UserActivity) => {
    setSelectedUserActivity(activity);
    setIsDetailModalOpen(true);
  };

  // Helper to extract plan types from leads_data
  const getPlanTypes = (leads: Lead[] | null): string => {
    if (!leads || leads.length === 0) return "N/A";
    const plans = new Set<string>();
    leads.forEach(lead => {
      if (lead.pricing_tier) {
        plans.add(lead.pricing_tier);
      }
    });
    return plans.size > 0 ? Array.from(plans).join(', ') : "None";
  };

  return (
    <Card className="bg-white shadow-sm border">
      <CardHeader className="bg-[#f4edfd] pb-4">
        <CardTitle className="font-playfair text-xl text-[#6b4e82] flex items-center justify-between">
          <span>User Activity Dashboard</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal bg-[#6b4e82] text-white px-3 py-1 rounded-full">
              {userActivities.length} Total Users
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
            <Label htmlFor="search">Search Users</Label>
            <Input
              id="search"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 items-end">
            <Button onClick={loadUserActivities} variant="outline" className="w-full sm:w-auto" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} /> 
              {isLoading ? "Loading..." : "Refresh"}
            </Button>
            <Button onClick={handleExportData} variant="outline" className="w-full sm:w-auto">
              <FileText className="h-4 w-4 mr-1" /> Export CSV
            </Button>
            <Button onClick={createTestLead} variant="outline" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-1" /> Test User/Lead
            </Button>
            {/* <Button onClick={handleClearLeads} variant="outline" className="w-full sm:w-auto text-red-500 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-1" /> Clear All (Admin)
            </Button> */}
          </div>
        </div>
        
        {userActivities.length > 0 ? (
          <Table>
            <TableCaption>
              Showing {filteredUserActivities.length} users
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Quiz Taken</TableHead>
                <TableHead>Plans</TableHead>
                <TableHead>Lead Count</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUserActivities.map((activity) => (
                <TableRow key={activity.user_id}>
                  <TableCell className="font-medium">{activity.user_name || 'N/A'}</TableCell>
                  <TableCell>{activity.user_email}</TableCell>
                  <TableCell>{activity.quiz_submissions_data && activity.quiz_submissions_data.length > 0 ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{getPlanTypes(activity.leads_data)}</TableCell>
                  <TableCell>{activity.leads_data?.length || 0}</TableCell>
                  <TableCell>{activity.latest_lead_timestamp ? new Date(activity.latest_lead_timestamp).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(activity)}>
                      <Eye className="h-4 w-4 mr-1" /> View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 border rounded-md bg-gray-50">
            {isLoading ? (
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <RefreshCw className="animate-spin h-4 w-4" /> Loading user activities...
              </p>
            ) : (
              <p className="text-gray-500">No user activities found.</p>
            )}
          </div>
        )}
      </CardContent>

      {selectedUserActivity && (
        <LeadDetailModal 
          isOpen={isDetailModalOpen} 
          onClose={() => setIsDetailModalOpen(false)} 
          userActivity={selectedUserActivity} 
        />
      )}
    </Card>
  );
};

export default AdminLeadList;
