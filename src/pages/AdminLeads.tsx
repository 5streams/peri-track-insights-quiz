
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initializeLeadStorage } from "@/utils/leadTracking";
import LeadList from "@/components/leads/LeadList";

const AdminLeads = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pageError, setPageError] = useState<string | null>(null);
  const [authAttempted, setAuthAttempted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Add error boundary to catch and display rendering errors
  useEffect(() => {
    console.log("AdminLeads: Component mounted");
    
    try {
      // Add no-cache meta tags to ensure fresh data
      const metaTags = [
        { name: "Cache-Control", content: "no-cache, no-store, must-revalidate" },
        { name: "Pragma", content: "no-cache" },
        { name: "Expires", content: "0" }
      ];
      
      // Add each meta tag to the head
      metaTags.forEach(tagData => {
        const existingTag = document.querySelector(`meta[name="${tagData.name}"]`);
        if (existingTag) {
          existingTag.setAttribute("content", tagData.content);
        } else {
          const metaTag = document.createElement("meta");
          metaTag.setAttribute("name", tagData.name);
          metaTag.setAttribute("content", tagData.content);
          document.head.appendChild(metaTag);
        }
      });
      
      // Clean up function to remove meta tags
      return () => {
        console.log("AdminLeads: Cleaning up meta tags");
        try {
          metaTags.forEach(tagData => {
            const tag = document.querySelector(`meta[name="${tagData.name}"]`);
            if (tag && tag.parentNode) {
              document.head.removeChild(tag);
            }
          });
        } catch (cleanupError) {
          console.error("AdminLeads: Error during meta tag cleanup", cleanupError);
        }
      };
    } catch (metaError) {
      console.error("AdminLeads: Error setting meta tags", metaError);
      setPageError("Error initializing page metadata");
    }
  }, []);

  // Check authentication with better error handling
  useEffect(() => {
    console.log("AdminLeads: Checking authentication");
    
    try {
      // Initialize lead storage
      initializeLeadStorage();
      
      const adminSession = sessionStorage.getItem("admin_authenticated");
      if (adminSession === "true") {
        console.log("AdminLeads: Admin session found");
        setIsAuthenticated(true);
      } else {
        console.log("AdminLeads: No admin session found, user needs to log in");
      }
    } catch (error) {
      console.error("AdminLeads: Error during authentication check", error);
      setPageError("Error checking authentication status");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Enhanced authentication with error handling
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthAttempted(true);
    
    console.log("AdminLeads: Login attempt");
    
    try {
      if (password === "peritrack2025") { // Simple password protection
        console.log("AdminLeads: Login successful");
        setIsAuthenticated(true);
        setError("");
        
        // Store the authentication status in sessionStorage for persistence
        sessionStorage.setItem("admin_authenticated", "true");
        
        // Initialize storage after successful login
        initializeLeadStorage();
        
        toast({
          title: "Login Successful",
          description: "You are now logged in as admin."
        });
      } else {
        console.log("AdminLeads: Login failed - incorrect password");
        setError("Incorrect password. Please try again.");
        
        toast({
          title: "Login Failed",
          description: "Incorrect password. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("AdminLeads: Login error", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  // Handle logout - clear session
  const handleLogout = () => {
    console.log("AdminLeads: Logging out");
    
    try {
      sessionStorage.removeItem("admin_authenticated");
      setIsAuthenticated(false);
      setPassword("");
      setError("");
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out."
      });
    } catch (error) {
      console.error("AdminLeads: Error during logout", error);
      toast({
        title: "Logout Error",
        description: "There was a problem logging out.",
        variant: "destructive"
      });
    }
  };

  // Force page reload with cache busting
  const forceRefresh = () => {
    const cacheBuster = `?cache=${Date.now()}`;
    window.location.href = window.location.pathname + cacheBuster;
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f4edfd] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-[#6b4e82] mb-4">Loading Admin Dashboard...</h2>
          <div className="animate-spin w-8 h-8 border-4 border-[#6b4e82] border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // Display any page errors
  if (pageError) {
    return (
      <div className="min-h-screen bg-[#f4edfd] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Dashboard Error</h2>
          <p className="mb-4 text-gray-700">{pageError}</p>
          <p className="mb-6 text-sm text-gray-500">
            Try refreshing the page or clearing your browser cache.
          </p>
          <Button onClick={forceRefresh} className="w-full bg-[#6b4e82]">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Page
          </Button>
          <div className="mt-4 text-center">
            <Link to="/" className="text-[#6b4e82] hover:underline text-sm">
              <ArrowLeft className="h-4 w-4 inline mr-1" /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4edfd] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#6b4e82] mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-[#6b4e82] font-medium">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
              {authAttempted && !error && (
                <p className="text-xs text-gray-500 mt-1">
                  Authenticating...
                </p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-[#6b4e82] hover:bg-[#8a6eaa]"
            >
              Login
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500 italic">
                Hint: The password is "peritrack2025"
              </p>
            </div>
            
            <div className="pt-2 text-center">
              <Link to="/" className="text-[#6b4e82] hover:underline flex items-center justify-center gap-1 text-sm">
                <ArrowLeft className="h-4 w-4" /> Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  // If we reach here, we're authenticated and should show the dashboard
  return (
    <div className="min-h-screen bg-[#f4edfd] py-8 px-4 md:px-8 lg:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#6b4e82]">Peritrack Admin Dashboard</h1>
            <p className="text-[#a68bc7] text-sm">
              View and manage your lead data
            </p>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button 
              onClick={forceRefresh}
              variant="outline"
              className="text-[#6b4e82] border-[#6b4e82]/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Force Refresh
            </Button>
            
            <Link to="/">
              <Button 
                variant="outline"
                className="text-[#6b4e82] border-[#6b4e82]/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Home
              </Button>
            </Link>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="text-[#6b4e82] border-[#6b4e82]/20"
            >
              Logout
            </Button>
          </div>
        </div>
        
        {/* Wrap the LeadList component in an error boundary */}
        <div className="dashboard-content">
          <React.Suspense fallback={
            <div className="p-8 bg-white rounded-lg shadow text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#6b4e82] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-[#6b4e82]">Loading leads...</p>
            </div>
          }>
            <LeadList />
          </React.Suspense>
        </div>
        
        <div className="mt-6 text-sm text-[#a68bc7] text-center">
          <p>Experiencing issues? Try using the Debug button or creating a test lead.</p>
          <p>Make sure to refresh the page or press the "Refresh Now" button to see the latest leads.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
