
// Lead tracking and management utilities

// Define lead types
export interface Lead {
  id: string;
  name: string;
  email: string;
  source: 'quiz_results' | 'free_trial' | string;
  pricingTier?: 'monthly' | 'annual' | null;
  quizResults?: any;
  timestamp: string;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'unqualified';
  deviceInfo: {
    userAgent: string;
    screenSize: string;
  };
  notes?: string;
}

// Generate a unique ID for leads
const generateId = (): string => {
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

// Initialize lead storage
export const initializeLeadStorage = (): void => {
  console.log("Initializing lead storage");
  
  try {
    // Create new empty storage if it doesn't exist
    if (!localStorage.getItem(LEADS_STORAGE_KEY)) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
    } else {
      // Validate existing data is an array
      try {
        const data = JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
        if (!Array.isArray(data)) {
          console.error("Stored lead data is not an array, recreating");
          localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
        }
      } catch (parseError) {
        console.error("Error parsing leads, recreating", parseError);
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
      }
    }
    
    // Set initialization flags
    localStorage.setItem('peritrack_initialized', 'true');
    localStorage.setItem('peritrack_last_init', new Date().toISOString());
  } catch (error) {
    console.error("Critical error during initialization:", error);
  }
};

// Save lead
export const saveLead = (
  name: string, 
  email: string, 
  source: 'quiz_results' | 'free_trial' | string,
  pricingTier?: 'monthly' | 'annual' | null,
  quizResults?: any,
  notes?: string
): Lead => {
  // Validate inputs
  if (!name || !email) {
    throw new Error("Name and email are required");
  }
  
  // Ensure storage is initialized
  initializeLeadStorage();
  
  // Create lead object with a unique ID
  const leadId = generateId();
  const lead: Lead = {
    id: leadId,
    name,
    email,
    source,
    pricingTier,
    quizResults,
    timestamp: new Date().toISOString(),
    status: 'new',
    deviceInfo: getDeviceInfo(),
    notes
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
    
    // Update timestamp for synchronization
    const timestamp = Date.now().toString();
    localStorage.setItem('leads_updated_timestamp', timestamp);
    
    // Dispatch custom event for real-time updates across tabs
    try {
      const event = new CustomEvent('peritrack_lead_added', { 
        detail: { lead, timestamp } 
      });
      window.dispatchEvent(event);
    } catch (e) {
      console.warn("Could not dispatch lead event:", e);
    }
    
    return lead;
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
};

// Get leads
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

// Update lead status
export const updateLead = (id: string, updates: Partial<Lead>): boolean => {
  try {
    const leads = getLeads();
    
    const index = leads.findIndex(lead => lead.id === id);
    if (index === -1) return false;
    
    // Apply updates
    leads[index] = { ...leads[index], ...updates };
    
    // Save updated leads
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    
    // Dispatch update event
    try {
      const event = new CustomEvent('peritrack_lead_updated', { 
        detail: { leadId: id, updates } 
      });
      window.dispatchEvent(event);
    } catch (e) {
      console.warn("Could not dispatch update event:", e);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating lead:', error);
    return false;
  }
};

// Clear all leads
export const clearLeads = (): void => {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
  console.log('All leads cleared from localStorage');
};

// Export leads as CSV
export const exportLeadsCSV = (): string => {
  const leads = getLeads();
  
  const csvHeader = 'ID,Name,Email,Source,Pricing Tier,Status,Date,Notes\n';
  const csvContent = leads.map(lead => {
    return [
      lead.id,
      lead.name,
      lead.email,
      lead.source,
      lead.pricingTier || 'N/A',
      lead.status,
      new Date(lead.timestamp).toLocaleString(),
      lead.notes || ''
    ].join(',');
  }).join('\n');
  
  return csvHeader + csvContent;
};

// Initialize storage when module loads
try {
  initializeLeadStorage();
} catch (error) {
  console.error("Failed to initialize storage on module load:", error);
}
