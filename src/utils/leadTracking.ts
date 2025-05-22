
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
    // Store initialization timestamp for debugging
    localStorage.setItem('peritrack_last_init', new Date().toISOString());
    sessionStorage.setItem('peritrack_session_init', new Date().toISOString());
    
    // Check if storage exists
    const existingData = localStorage.getItem(LEADS_STORAGE_KEY);
    
    if (!existingData) {
      // Create new empty storage
      console.log("initializeLeadStorage: No leads storage found, creating empty array");
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
      
      // Force broadcast of change
      window.dispatchEvent(new Event('storage'));
      return;
    }
    
    // Validate existing data
    try {
      const parsed = JSON.parse(existingData);
      if (!Array.isArray(parsed)) {
        console.error("initializeLeadStorage: Stored data is not an array, recreating", parsed);
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
      } else {
        console.log(`initializeLeadStorage: Found existing lead storage with ${parsed.length} leads`);
        // Force the correct json format
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(parsed));
        // Broadcast that leads are available
        window.dispatchEvent(new CustomEvent('leadsAvailable', { detail: parsed }));
      }
    } catch (error) {
      console.error("initializeLeadStorage: Error parsing leads, recreating", error);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error("initializeLeadStorage: Critical error during initialization:", error);
    // Try one more time with a safer approach
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
    } catch (secondError) {
      console.error("initializeLeadStorage: Failed again during emergency initialization:", secondError);
    }
  }
  
  // Test storage is working
  try {
    const testKey = `test_${Date.now()}`;
    const testValue = `value_${Date.now()}`;
    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    
    if (retrieved !== testValue) {
      console.error("initializeLeadStorage: localStorage test failed", { set: testValue, got: retrieved });
    } else {
      console.log("initializeLeadStorage: localStorage test passed");
    }
  } catch (error) {
    console.error("initializeLeadStorage: localStorage test failed with error", error);
  }
};

// Enhanced save lead function with additional synchronization mechanisms
export const saveLead = (
  firstName: string, 
  email: string, 
  source: 'quiz_results' | 'free_trial',
  pricingPlan?: 'monthly' | 'annual' | null,
  quizResults?: any,
  additionalNotes?: string
): Lead => {
  console.log("saveLead: Starting to save lead", { firstName, email, source });
  
  // Validate inputs
  if (!firstName || !email) {
    const error = new Error("FirstName and email are required");
    console.error("saveLead: Cannot save lead, missing required fields", error);
    throw error;
  }
  
  // Ensure storage is initialized
  initializeLeadStorage();
  
  // Create lead object with a unique timestamp-based ID
  const leadId = generateLeadId();
  console.log("saveLead: Generated lead ID:", leadId);
  
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
    // Get existing leads safely
    let existingLeads: Lead[] = [];
    const existingLeadsData = localStorage.getItem(LEADS_STORAGE_KEY);
    
    if (existingLeadsData) {
      try {
        const parsed = JSON.parse(existingLeadsData);
        existingLeads = Array.isArray(parsed) ? parsed : [];
      } catch (parseError) {
        console.error("saveLead: Error parsing existing leads, starting with empty array", parseError);
      }
    }
    
    console.log(`saveLead: Retrieved ${existingLeads.length} existing leads`);
    
    // Check for potential duplicates (same name + email within last minute)
    const potentialDuplicates = existingLeads.filter(l => 
      l.firstName.toLowerCase() === firstName.toLowerCase() &&
      l.email.toLowerCase() === email.toLowerCase() &&
      // Check if timestamp is within the last minute
      (new Date().getTime() - new Date(l.timestamp).getTime()) < 60000
    );
    
    if (potentialDuplicates.length > 0) {
      console.warn("saveLead: Potential duplicate detected", potentialDuplicates);
      // We'll save it anyway but log the warning
    }
    
    // Add new lead
    const updatedLeads = [...existingLeads, lead];
    
    console.log(`saveLead: Saving lead to localStorage. Total leads: ${updatedLeads.length}`);
    
    // Save to localStorage
    const dataToSave = JSON.stringify(updatedLeads);
    localStorage.setItem(LEADS_STORAGE_KEY, dataToSave);
    
    // Also save a temporary copy to sessionStorage as backup
    try {
      sessionStorage.setItem('peritrack_latest_lead', JSON.stringify(lead));
      sessionStorage.setItem('peritrack_leads_count', updatedLeads.length.toString());
    } catch (sessionError) {
      console.warn("saveLead: Could not save to sessionStorage:", sessionError);
    }
    
    // Store a timestamp of the last update for synchronization
    localStorage.setItem('leads_updated_timestamp', Date.now().toString());
    
    // Dispatch a storage event for other tabs to detect
    try {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('leadsUpdated', { detail: updatedLeads }));
    } catch (eventError) {
      console.error("saveLead: Error dispatching update events", eventError);
    }
    
    // Verify the save was successful
    const savedData = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!savedData) {
      throw new Error('Failed to save leads to localStorage - data is empty after save');
    }
    
    try {
      const savedLeads = JSON.parse(savedData);
      console.log(`saveLead: Lead saved successfully. Storage now has ${savedLeads.length} leads`);
      
      if (!Array.isArray(savedLeads) || savedLeads.length !== updatedLeads.length) {
        console.error("saveLead: Storage verification failed - incorrect data format or length", { 
          expected: updatedLeads.length, 
          actual: Array.isArray(savedLeads) ? savedLeads.length : 'not an array' 
        });
      }
    } catch (parseError) {
      console.error("saveLead: Failed to parse saved data for verification", parseError);
    }
    
    // Track the event
    trackLeadEvent(lead);
    
    return lead;
  } catch (error) {
    console.error('saveLead: Error saving lead to localStorage:', error);
    
    // Emergency save as a fallback - store just this lead if regular save fails
    try {
      console.log("saveLead: Attempting emergency single-lead save");
      
      // Try storing individual lead in a different key
      localStorage.setItem(`peritrack_emergency_lead_${leadId}`, JSON.stringify(lead));
      
      // Also try to save to sessionStorage as a last resort
      sessionStorage.setItem(`peritrack_emergency_lead_${leadId}`, JSON.stringify(lead));
      
      // Flag that emergency save was needed
      localStorage.setItem('peritrack_emergency_save', Date.now().toString());
      
      return lead;
    } catch (retryError) {
      console.error("saveLead: Emergency save failed:", retryError);
      throw retryError;
    }
  }
};

// Enhanced getLeads with emergency lead recovery
export const getLeads = (): Lead[] => {
  console.log("getLeads: Retrieving leads from localStorage");
  
  try {
    // Ensure storage is initialized
    initializeLeadStorage();
    
    const leadsData = localStorage.getItem(LEADS_STORAGE_KEY);
    
    if (!leadsData) {
      console.log('getLeads: No leads found in localStorage');
      return recoverEmergencyLeads(); // Try to recover any emergency leads
    }
    
    // Check if the data is not empty or corrupt
    if (leadsData === "null" || leadsData === "undefined" || leadsData === "") {
      console.error('getLeads: Invalid leads data in localStorage:', leadsData);
      return recoverEmergencyLeads(); // Try to recover any emergency leads
    }
    
    try {
      const parsedLeads = JSON.parse(leadsData);
      
      if (!Array.isArray(parsedLeads)) {
        console.error('getLeads: Leads data is not an array:', parsedLeads);
        return recoverEmergencyLeads(); // Try to recover any emergency leads
      }
      
      // Basic validation of lead objects
      const validLeads = parsedLeads.filter(lead => {
        return lead && typeof lead === 'object' && 
               typeof lead.id === 'string' &&
               typeof lead.firstName === 'string' &&
               typeof lead.email === 'string';
      });
      
      if (validLeads.length !== parsedLeads.length) {
        console.warn(`getLeads: Found ${parsedLeads.length - validLeads.length} invalid lead objects`);
      }
      
      console.log(`getLeads: Successfully retrieved ${validLeads.length} valid leads`);
      
      // Also check for emergency leads and merge them
      const emergencyLeads = recoverEmergencyLeads();
      
      if (emergencyLeads.length > 0) {
        console.log(`getLeads: Found ${emergencyLeads.length} emergency leads to merge`);
        
        // Merge and remove duplicates based on ID
        const mergedLeads = [...validLeads];
        
        emergencyLeads.forEach(emergencyLead => {
          if (!mergedLeads.some(lead => lead.id === emergencyLead.id)) {
            mergedLeads.push(emergencyLead);
          }
        });
        
        console.log(`getLeads: Returning ${mergedLeads.length} leads after merging`);
        return mergedLeads;
      }
      
      return validLeads;
    } catch (parseError) {
      console.error('getLeads: Error parsing leads JSON:', parseError);
      console.error('getLeads: Raw data that failed to parse:', leadsData);
      return recoverEmergencyLeads(); // Try to recover any emergency leads
    }
  } catch (error) {
    console.error('getLeads: Error reading leads from localStorage:', error);
    return recoverEmergencyLeads(); // Try to recover any emergency leads
  }
};

// Helper function to find emergency saved leads
const recoverEmergencyLeads = (): Lead[] => {
  try {
    console.log("recoverEmergencyLeads: Looking for emergency leads");
    
    // Get all localStorage keys
    const allKeys = Object.keys(localStorage);
    
    // Filter for emergency lead keys
    const emergencyLeadKeys = allKeys.filter(key => 
      key.startsWith('peritrack_emergency_lead_')
    );
    
    if (emergencyLeadKeys.length === 0) {
      // Try sessionStorage as last resort
      const sessionKeys = Object.keys(sessionStorage);
      const sessionEmergencyKeys = sessionKeys.filter(key => 
        key.startsWith('peritrack_emergency_lead_')
      );
      
      if (sessionEmergencyKeys.length === 0) {
        return [];
      }
      
      // Try to recover from sessionStorage
      console.log(`recoverEmergencyLeads: Found ${sessionEmergencyKeys.length} emergency leads in sessionStorage`);
      
      const sessionEmergencyLeads: Lead[] = [];
      
      sessionEmergencyKeys.forEach(key => {
        try {
          const leadData = sessionStorage.getItem(key);
          if (leadData) {
            const lead = JSON.parse(leadData);
            if (lead && lead.id && lead.firstName && lead.email) {
              sessionEmergencyLeads.push(lead);
            }
          }
        } catch (e) {
          console.error(`recoverEmergencyLeads: Error recovering lead from key ${key}:`, e);
        }
      });
      
      return sessionEmergencyLeads;
    }
    
    console.log(`recoverEmergencyLeads: Found ${emergencyLeadKeys.length} emergency leads`);
    
    // Recover each emergency lead
    const emergencyLeads: Lead[] = [];
    
    emergencyLeadKeys.forEach(key => {
      try {
        const leadData = localStorage.getItem(key);
        if (leadData) {
          const lead = JSON.parse(leadData);
          if (lead && lead.id && lead.firstName && lead.email) {
            emergencyLeads.push(lead);
            
            // Remove the emergency key after recovery
            localStorage.removeItem(key);
          }
        }
      } catch (e) {
        console.error(`recoverEmergencyLeads: Error recovering lead from key ${key}:`, e);
      }
    });
    
    // If we found emergency leads, restore them to main storage
    if (emergencyLeads.length > 0) {
      try {
        console.log(`recoverEmergencyLeads: Restoring ${emergencyLeads.length} emergency leads to main storage`);
        
        // Get current leads or empty array
        const currentLeadsData = localStorage.getItem(LEADS_STORAGE_KEY);
        let currentLeads: Lead[] = [];
        
        if (currentLeadsData) {
          try {
            const parsed = JSON.parse(currentLeadsData);
            if (Array.isArray(parsed)) {
              currentLeads = parsed;
            }
          } catch (e) {
            console.error("recoverEmergencyLeads: Error parsing current leads:", e);
          }
        }
        
        // Merge current leads with emergency leads
        const mergedLeads = [...currentLeads];
        
        emergencyLeads.forEach(emergencyLead => {
          if (!mergedLeads.some(lead => lead.id === emergencyLead.id)) {
            mergedLeads.push(emergencyLead);
          }
        });
        
        // Save the merged leads back
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(mergedLeads));
        localStorage.setItem('leads_updated_timestamp', Date.now().toString());
        
        // Clear emergency flag
        localStorage.removeItem('peritrack_emergency_save');
      } catch (e) {
        console.error("recoverEmergencyLeads: Error restoring emergency leads:", e);
      }
    }
    
    return emergencyLeads;
  } catch (error) {
    console.error("recoverEmergencyLeads: Error recovering emergency leads:", error);
    return [];
  }
};

// Delete a lead by ID
export const deleteLead = (id: string): boolean => {
  const leads = getLeads();
  const filteredLeads = leads.filter(lead => lead.id !== id);
  
  if (filteredLeads.length < leads.length) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filteredLeads));
    localStorage.setItem('leads_updated_timestamp', Date.now().toString());
    
    // Notify other tabs/browsers
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('leadsUpdated', { detail: filteredLeads }));
    return true;
  }
  
  return false;
};

// Clear all leads and reinitialize storage
export const clearLeads = (): void => {
  localStorage.removeItem(LEADS_STORAGE_KEY);
  
  // Also clear any emergency leads
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(key => {
    if (key.startsWith('peritrack_emergency_lead_')) {
      localStorage.removeItem(key);
    }
  });
  
  initializeLeadStorage();
  
  // Notify other tabs/browsers
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new CustomEvent('leadsUpdated', { detail: [] }));
  console.log('clearLeads: All leads cleared from localStorage');
};

// Track lead capture events (can be expanded to send to analytics service)
const trackLeadEvent = (lead: Lead) => {
  console.log('trackLeadEvent: Lead captured:', lead);
  
  // Track page events
  try {
    const eventsKey = 'peritrack_events';
    const events = JSON.parse(localStorage.getItem(eventsKey) || '[]');
    events.push({
      type: lead.source === 'quiz_results' ? 'quiz_results_submitted' : 'free_trial_signup',
      leadId: lead.id,
      timestamp: lead.timestamp,
      pricingPlan: lead.pricingPlan,
      path: window.location.pathname
    });
    
    localStorage.setItem(eventsKey, JSON.stringify(events));
  } catch (error) {
    console.error("trackLeadEvent: Error tracking event", error);
  }
  
  // Force update signal for admin page
  localStorage.setItem("leads_updated", Date.now().toString());
};

// Method to check if leads are properly being stored
export const validateLeadStorage = (): boolean => {
  console.log("validateLeadStorage: Validating lead storage");
  
  // Create a test lead and then immediately remove it
  const testId = "test-" + Date.now();
  const testLead: Lead = {
    id: testId,
    firstName: "TestValidation",
    email: "test@validation.com",
    source: 'quiz_results',
    timestamp: new Date().toISOString(),
    deviceInfo: getDeviceInfo()
  };
  
  try {
    // Get the current leads
    const currentLeads = getLeads();
    
    // Add the test lead
    const updatedLeads = [...currentLeads, testLead];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    
    // Check if test lead was saved
    const leadsAfterAdd = getLeads();
    const found = leadsAfterAdd.some(lead => lead.id === testId);
    
    // Remove the test lead
    if (found) {
      const cleanedLeads = leadsAfterAdd.filter(lead => lead.id !== testId);
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(cleanedLeads));
      console.log("validateLeadStorage: Validation SUCCESS");
    } else {
      console.error("validateLeadStorage: Validation FAILED - test lead not found after save");
    }
    
    return found;
  } catch (error) {
    console.error("validateLeadStorage: Lead storage validation failed:", error);
    return false;
  }
};

// Initialize storage when this module loads
try {
  initializeLeadStorage();
  console.log("leadTracking.ts: Storage initialized on module load");
} catch (error) {
  console.error("leadTracking.ts: Failed to initialize storage on module load:", error);
}
