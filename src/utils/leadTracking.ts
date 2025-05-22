
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

// Local storage constants
const LEADS_STORAGE_KEY = 'peritrack_leads';
const BACKUP_STORAGE_KEY = 'peritrack_leads_backup';
const LAST_UPDATED_KEY = 'leads_updated_timestamp';

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
          
          // Try to backup malformed data before overwriting
          localStorage.setItem('peritrack_leads_malformed_backup', localStorage.getItem(LEADS_STORAGE_KEY) || '');
          
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
        }
      } catch (parseError) {
        console.error("initializeLeadStorage: Error parsing leads, recreating", parseError);
        
        // Try to backup malformed data before overwriting
        localStorage.setItem('peritrack_leads_malformed_backup', localStorage.getItem(LEADS_STORAGE_KEY) || '');
        
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
      }
    }
    
    // Create a backup of the current state
    try {
      const currentData = localStorage.getItem(LEADS_STORAGE_KEY);
      if (currentData) {
        localStorage.setItem(BACKUP_STORAGE_KEY, currentData);
      }
    } catch (backupError) {
      console.error("Error creating backup:", backupError);
    }
    
    // Set initialization flags
    localStorage.setItem('peritrack_initialized', 'true');
    localStorage.setItem('peritrack_last_init', new Date().toISOString());
  } catch (error) {
    console.error("initializeLeadStorage: Critical error during initialization:", error);
    
    // Try to use backup if main storage fails
    try {
      const backup = localStorage.getItem(BACKUP_STORAGE_KEY);
      if (backup) {
        localStorage.setItem(LEADS_STORAGE_KEY, backup);
        console.log("Restored leads from backup");
      }
    } catch (restoreError) {
      console.error("Failed to restore from backup:", restoreError);
    }
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
  
  console.log("saveLead: Creating new lead:", lead);
  
  try {
    // Get current leads safely
    const existingLeadsData = localStorage.getItem(LEADS_STORAGE_KEY) || '[]';
    let existingLeads: Lead[] = [];
    
    try {
      existingLeads = JSON.parse(existingLeadsData);
      if (!Array.isArray(existingLeads)) {
        console.error("saveLead: Existing leads is not an array, resetting");
        existingLeads = [];
      }
    } catch (parseError) {
      console.error("saveLead: Error parsing existing leads:", parseError);
      existingLeads = [];
    }
    
    // Add new lead
    const updatedLeads = [...existingLeads, lead];
    
    // Save to localStorage
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    console.log(`saveLead: Saved lead. Total leads count: ${updatedLeads.length}`);
    
    // Create a backup of the current state
    try {
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(updatedLeads));
    } catch (backupError) {
      console.error("Error creating backup:", backupError);
    }
    
    // Save most recent lead to sessionStorage as a backup
    try {
      sessionStorage.setItem('latest_lead', JSON.stringify(lead));
      sessionStorage.setItem('latest_lead_timestamp', new Date().toISOString());
    } catch (sessionError) {
      console.warn("Session storage backup failed:", sessionError);
    }
    
    // Update timestamp for synchronization
    const timestamp = Date.now().toString();
    localStorage.setItem(LAST_UPDATED_KEY, timestamp);
    
    return lead;
  } catch (error) {
    console.error('Error saving lead:', error);
    
    // Try to save to sessionStorage as a fallback
    try {
      const sessionLeads = JSON.parse(sessionStorage.getItem('backup_leads') || '[]');
      sessionLeads.push(lead);
      sessionStorage.setItem('backup_leads', JSON.stringify(sessionLeads));
      console.log("Lead saved to session storage as fallback");
    } catch (sessionError) {
      console.error("Failed to save to session storage:", sessionError);
    }
    
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
        console.error('getLeads: Leads data is not an array, returning empty array');
        return [];
      }
      
      // Sort leads by timestamp, newest first
      leads.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
      
    } catch (error) {
      console.error('Error parsing leads:', error);
      
      // Try to recover from backup
      try {
        const backupData = localStorage.getItem(BACKUP_STORAGE_KEY);
        if (backupData) {
          leads = JSON.parse(backupData);
          if (Array.isArray(leads)) {
            console.log("Recovered leads from backup");
            // Restore main storage
            localStorage.setItem(LEADS_STORAGE_KEY, backupData);
            return leads;
          }
        }
      } catch (backupError) {
        console.error("Failed to recover from backup:", backupError);
      }
      
      return [];
    }
    
    return leads;
  } catch (error) {
    console.error('Error retrieving leads:', error);
    return [];
  }
};

// Clear all leads
export const clearLeads = (): void => {
  try {
    // Create backup before clearing
    const currentLeads = localStorage.getItem(LEADS_STORAGE_KEY);
    if (currentLeads) {
      localStorage.setItem('peritrack_leads_before_clear', currentLeads);
    }
    
    // Clear leads
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
    console.log('All leads cleared from localStorage');
    
    // Update timestamp
    localStorage.setItem(LAST_UPDATED_KEY, Date.now().toString());
  } catch (error) {
    console.error("Error clearing leads:", error);
    throw error;
  }
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
      return true;
    }
    
    return false;
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
