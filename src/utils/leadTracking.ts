
// Lead tracking and management utilities

// Define lead types
export interface Lead {
  id: string;
  firstName: string;
  email: string;
  source: 'quiz_results' | 'free_trial';
  pricingPlan?: 'monthly' | 'annual' | null;
  quizResults?: any;
  timestamp: string;
  deviceInfo: {
    userAgent: string;
    screenSize: string;
  };
  additionalNotes?: string;
}

// Generate a unique ID for leads
const generateLeadId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Get browser and device information
const getDeviceInfo = () => {
  return {
    userAgent: navigator.userAgent,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
  };
};

// Local storage key for leads
const LEADS_STORAGE_KEY = 'peritrack_leads';

// Initialize or validate lead storage with improved error handling
export const initializeLeadStorage = (): void => {
  console.log("initializeLeadStorage: Starting lead storage initialization");
  
  try {
    // Create new empty storage if it doesn't exist
    if (!localStorage.getItem(LEADS_STORAGE_KEY)) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
      console.log("initializeLeadStorage: Created new empty leads storage");
    } else {
      // Validate existing data is an array
      try {
        const data = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
        if (!Array.isArray(data)) {
          console.error("initializeLeadStorage: Stored data is not an array, recreating");
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
        }
      } catch (parseError) {
        console.error("initializeLeadStorage: Error parsing leads, recreating", parseError);
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
      }
    }
    
    // Set initialization flags
    localStorage.setItem('peritrack_initialized', 'true');
    localStorage.setItem('peritrack_last_init', new Date().toISOString());
  } catch (error) {
    console.error("initializeLeadStorage: Critical error during initialization:", error);
  }
};

// Enhanced save lead function with stronger synchronization
export const saveLead = (
  firstName: string, 
  email: string, 
  source: 'quiz_results' | 'free_trial',
  pricingPlan?: 'monthly' | 'annual' | null,
  quizResults?: any,
  additionalNotes?: string
): Lead => {
  // Validate inputs
  if (!firstName || !email) {
    throw new Error("FirstName and email are required");
  }
  
  // Ensure storage is initialized
  initializeLeadStorage();
  
  // Create lead object with a unique ID
  const leadId = generateLeadId();
  const lead: Lead = {
    id: leadId,
    firstName,
    email,
    source,
    pricingPlan,
    quizResults,
    timestamp: new Date().toISOString(),
    deviceInfo: getDeviceInfo(),
    additionalNotes
  };
  
  try {
    // Get current leads safely
    const existingLeadsData = localStorage.getItem(LEADS_STORAGE_KEY) || '[]';
    let existingLeads: Lead[] = [];
    
    try {
      existingLeads = JSON.parse(existingLeadsData);
      if (!Array.isArray(existingLeads)) existingLeads = [];
    } catch {
      existingLeads = [];
    }
    
    // Add new lead
    const updatedLeads = [...existingLeads, lead];
    
    // Save to localStorage
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    
    // Save a backup copy to sessionStorage
    try {
      sessionStorage.setItem('latest_lead', JSON.stringify(lead));
    } catch (e) {
      console.warn("Session storage backup failed:", e);
    }
    
    // Update timestamp for synchronization
    const timestamp = Date.now().toString();
    localStorage.setItem('leads_updated_timestamp', timestamp);
    
    return lead;
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
};

// Simplified and reliable getLeads function
export const getLeads = (): Lead[] => {
  try {
    // Ensure storage is initialized
    initializeLeadStorage();
    
    // Get and parse leads
    const leadsData = localStorage.getItem(LEADS_STORAGE_KEY) || '[]';
    let leads: Lead[] = [];
    
    try {
      leads = JSON.parse(leadsData);
      if (!Array.isArray(leads)) {
        console.error('Leads data is not an array');
        leads = [];
      }
    } catch (error) {
      console.error('Error parsing leads:', error);
      leads = [];
    }
    
    return leads;
  } catch (error) {
    console.error('Error retrieving leads:', error);
    return [];
  }
};

// Clear all leads
export const clearLeads = (): void => {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
  console.log('All leads cleared from localStorage');
};

// Simple validation function
export const validateLeadStorage = (): boolean => {
  try {
    const testId = "validation-" + Date.now();
    const testLead = {
      id: testId,
      firstName: "ValidationTest",
      email: "validation@test.com",
      source: 'quiz_results' as const,
      timestamp: new Date().toISOString(),
      deviceInfo: getDeviceInfo()
    };
    
    const before = getLeads();
    const updatedLeads = [...before, testLead];
    
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    
    const after = getLeads();
    const found = after.some(lead => lead.id === testId);
    
    if (found) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(before));
    }
    
    return found;
  } catch (error) {
    console.error("Validation failed:", error);
    return false;
  }
};

// Initialize storage when module loads
try {
  initializeLeadStorage();
} catch (error) {
  console.error("Failed to initialize storage on module load:", error);
}
