
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

// Save a lead to localStorage with improved error handling and validation
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
    console.error("Cannot save lead: firstName and email are required");
    throw new Error("FirstName and email are required");
  }
  
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
    // Get existing leads
    const existingLeadsString = localStorage.getItem(LEADS_STORAGE_KEY);
    console.log(`Raw leads data before update: ${existingLeadsString}`);
    
    // Parse existing leads, ensuring we have an array
    let existingLeads: Lead[] = [];
    if (existingLeadsString) {
      try {
        const parsed = JSON.parse(existingLeadsString);
        existingLeads = Array.isArray(parsed) ? parsed : [];
      } catch (parseError) {
        console.error("Failed to parse leads, starting with empty array", parseError);
        existingLeads = [];
      }
    }
    
    // Add new lead
    const updatedLeads = [...existingLeads, lead];
    
    console.log(`Saving lead to localStorage. Total leads: ${updatedLeads.length}`);
    console.log("Lead being saved:", lead);
    
    // Save to localStorage
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    
    // Double-check that lead was actually saved properly
    const savedLeadsData = localStorage.getItem(LEADS_STORAGE_KEY);
    const savedLeads = savedLeadsData ? JSON.parse(savedLeadsData) : [];
    console.log(`After saving, localStorage has ${savedLeads.length} leads`);
    
    // Verify the save was successful
    const savedData = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!savedData) {
      console.error('Failed to save leads to localStorage - data is empty after save');
    }
    
    // Track the event
    trackLeadEvent(lead);
    
    // Validate storage for debugging
    validateLeadStorage();
    
  } catch (error) {
    console.error('Error saving lead to localStorage:', error);
    // Try one more time with a clean approach
    try {
      const singleLeadArray = [lead];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(singleLeadArray));
      console.log("Attempted emergency save of single lead");
    } catch (retryError) {
      console.error("Even emergency save failed:", retryError);
    }
  }
  
  return lead;
};

// Get all saved leads with additional validation
export const getLeads = (): Lead[] => {
  try {
    const leadsData = localStorage.getItem(LEADS_STORAGE_KEY);
    console.log("Raw leads data retrieved:", leadsData);
    
    if (!leadsData) {
      console.log('No leads found in localStorage');
      return [];
    }
    
    try {
      const parsedLeads = JSON.parse(leadsData);
      if (!Array.isArray(parsedLeads)) {
        console.error('Leads data is not an array:', parsedLeads);
        return [];
      }
      
      console.log(`Successfully retrieved ${parsedLeads.length} leads`);
      return parsedLeads;
    } catch (parseError) {
      console.error('Error parsing leads JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('Error reading leads from localStorage:', error);
    return [];
  }
};

// Delete a lead by ID
export const deleteLead = (id: string): boolean => {
  const leads = getLeads();
  const filteredLeads = leads.filter(lead => lead.id !== id);
  
  if (filteredLeads.length < leads.length) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(filteredLeads));
    return true;
  }
  
  return false;
};

// Clear all leads (for testing purposes)
export const clearLeads = (): void => {
  localStorage.removeItem(LEADS_STORAGE_KEY);
  console.log('All leads cleared from localStorage');
};

// Track lead capture events (can be expanded to send to analytics service)
const trackLeadEvent = (lead: Lead) => {
  console.log('Lead captured:', lead);
  
  // This is where you would integrate with an analytics service
  // For now, we're just tracking in localStorage
  
  // Track page events
  const events = JSON.parse(localStorage.getItem('peritrack_events') || '[]');
  events.push({
    type: lead.source === 'quiz_results' ? 'quiz_results_submitted' : 'free_trial_signup',
    leadId: lead.id,
    timestamp: lead.timestamp,
    pricingPlan: lead.pricingPlan,
    path: window.location.pathname
  });
  
  localStorage.setItem('peritrack_events', JSON.stringify(events));
};

// Method to check if leads are properly being stored
export const validateLeadStorage = (): boolean => {
  console.log("Validating lead storage...");
  const existingLeadCount = getLeads().length;
  
  // Create a test lead and then immediately remove it
  const testId = "test-" + Date.now();
  const testLead: Lead = {
    id: testId,
    firstName: "TestUser",
    email: "test@validation.com",
    source: 'quiz_results',
    timestamp: new Date().toISOString(),
    deviceInfo: getDeviceInfo()
  };
  
  try {
    // Manually add the test lead
    const currentLeads = getLeads();
    const updatedLeads = [...currentLeads, testLead];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    
    // Check if test lead was saved
    const leadsAfterAdd = getLeads();
    const found = leadsAfterAdd.some(lead => lead.id === testId);
    
    // Remove the test lead
    const cleanedLeads = leadsAfterAdd.filter(lead => lead.id !== testId);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(cleanedLeads));
    
    console.log(`Storage validation result: ${found ? "SUCCESS" : "FAILED"} (found: ${found})`);
    return found;
  } catch (error) {
    console.error("Lead storage validation failed:", error);
    return false;
  }
};

// Force re-initialize the storage if needed
export const initializeLeadStorage = (): void => {
  if (!localStorage.getItem(LEADS_STORAGE_KEY)) {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify([]));
    console.log("Initialized empty leads array in storage");
  }
  
  // Validate that we can read from storage properly
  try {
    const testData = { test: "value" };
    localStorage.setItem('peritrack_test', JSON.stringify(testData));
    const retrieved = localStorage.getItem('peritrack_test');
    const parsedTest = retrieved ? JSON.parse(retrieved) : null;
    console.log("LocalStorage test:", parsedTest && parsedTest.test === "value" ? "PASSED" : "FAILED");
    localStorage.removeItem('peritrack_test');
  } catch (error) {
    console.error("LocalStorage test failed:", error);
  }
};

// Initialize storage when this module loads
initializeLeadStorage();
