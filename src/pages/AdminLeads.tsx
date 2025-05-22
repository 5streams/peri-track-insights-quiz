
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminLeadList from "@/components/leads/AdminLeadList";

const AdminLeads = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  
  // Check authentication state
  useEffect(() => {
    const adminSession = sessionStorage.getItem("admin_authenticated");
    if (adminSession === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password protection
    if (password === "peritrack2025") {
      setIsAuthenticated(true);
      setError("");
      
      // Store the authentication status in sessionStorage
      sessionStorage.setItem("admin_authenticated", "true");
      
      toast({
        title: "Login Successful",
        description: "You are now logged in as admin."
      });
    } else {
      setError("Incorrect password. Please try again.");
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setIsAuthenticated(false);
    setPassword("");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };
  
  // Force page reload with cache busting
  const forceRefresh = () => {
    window.location.href = window.location.pathname + "?t=" + Date.now();
  };

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
  
  return (
    <div className="min-h-screen bg-[#f4edfd] py-8 px-4 md:px-8">
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
        
        <AdminLeadList />
      </div>
    </div>
  );
};

export default AdminLeads;
