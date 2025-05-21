
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LeadList from "@/components/leads/LeadList";

const AdminLeads = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Simple authentication for demo purposes
  // In production, you'd want to use a more secure method
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "peritrack2025") { // Simple password protection
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFECD6]/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#5D4154] mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-[#5D4154] font-medium">Password</label>
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
              className="w-full bg-[#5D4154] hover:bg-[#5D4154]/90"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#FFECD6]/30 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#5D4154]">Peritrack Admin Dashboard</h1>
          <Button 
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="text-[#5D4154] border-[#5D4154]/20"
          >
            Logout
          </Button>
        </div>
        
        <LeadList />
      </div>
    </div>
  );
};

export default AdminLeads;
