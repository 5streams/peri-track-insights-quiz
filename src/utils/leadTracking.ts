
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

// Initialize or validate lead storage
export const initializeLeadStorage = (): void => {
  console.log("initializeLeadStorage: Starting lead storage initialization");
  
  try {
    // Check if storage exists
    const existingData = localStorage.getItem(LEADS_STORAGE_KEY);
    
    if (!existingData) {
      // Create new empty storage
      console.log("initializeLeadStorage: No leads storage found, creating empty array");
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
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

// Save a lead to localStorage with improved error handling and validation
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
  
  // Create lead object
  const lead: Lead = {
    id: generateLeadId(),
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
    
    // Add new lead
    const updatedLeads = [...existingLeads, lead];
    
    console.log(`saveLead: Saving lead to localStorage. Total leads: ${updatedLeads.length}`);
    
    // Save to localStorage
    const dataToSave = JSON.stringify(updatedLeads);
    localStorage.setItem(LEADS_STORAGE_KEY, dataToSave);
    
    // Dispatch a storage event for other tabs to detect
    try {
      window.dispatchEvent(new CustomEvent('leadsUpdated', { detail: updatedLeads }));
    } catch (eventError) {
      console.error("saveLead: Error dispatching leadsUpdated event", eventError);
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
    
    // Emergency save as a fallback
    try {
      console.log("saveLead: Attempting emergency single-lead save");
      const singleLeadArray = [lead];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(singleLeadArray));
      return lead;
    } catch (retryError) {
      console.error("saveLead: Emergency save failed:", retryError);
      throw retryError;
    }
  }
};

// Get all saved leads with additional validation
export const getLeads = (): Lead[] => {
  console.log("getLeads: Retrieving leads from localStorage");
  
  try {
    const leadsData = localStorage.getItem(LEADS_STORAGE_KEY);
    
    if (!leadsData) {
      console.log('getLeads: No leads found in localStorage');
      return [];
    }
    
    // Check if the data is not empty or corrupt
    if (leadsData === "null" || leadsData === "undefined" || leadsData === "") {
      console.error('getLeads: Invalid leads data in localStorage:', leadsData);
      return [];
    }
    
    try {
      const parsedLeads = JSON.parse(leadsData);
      
      if (!Array.isArray(parsedLeads)) {
        console.error('getLeads: Leads data is not an array:', parsedLeads);
        return [];
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
      return validLeads;
    } catch (parseError) {
      console.error('getLeads: Error parsing leads JSON:', parseError);
      console.error('getLeads: Raw data that failed to parse:', leadsData);
      return [];
    }
  } catch (error) {
    console.error('getLeads: Error reading leads from localStorage:', error);
    return [];
  }
};

// Delete a lead by ID
export const deleteLead = (id: string): boolean => {
  const leads = getLeads();
  const filteredLeads = leads.filter(lead => lead.id !== id);
  
  if (filteredLeads.length < leads.length) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filteredLeads));
    // Notify other tabs/browsers
    window.dispatchEvent(new CustomEvent('leadsUpdated', { detail: filteredLeads }));
    return true;
  }
  
  return false;
};

// Clear all leads and reinitialize storage
export const clearLeads = (): void => {
  localStorage.removeItem(LEADS_STORAGE_KEY);
  initializeLeadStorage();
  // Notify other tabs/browsers
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
