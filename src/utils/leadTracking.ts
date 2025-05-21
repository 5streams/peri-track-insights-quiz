
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

// Save a lead to localStorage
export const saveLead = (
  firstName: string, 
  email: string, 
  source: 'quiz_results' | 'free_trial',
  pricingPlan?: 'monthly' | 'annual' | null,
  quizResults?: any,
  additionalNotes?: string
): Lead => {
  // Ensure we have a valid first name and email
  if (!firstName || !email) {
    console.error("Invalid lead data: firstName and email are required");
    throw new Error("Invalid lead data: firstName and email are required");
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
  
  console.log("Creating new lead:", lead);
  
  // Get existing leads
  const existingLeads = getLeads();
  
  // Add new lead
  const updatedLeads = [...existingLeads, lead];
  
  // Save to localStorage
  try {
    localStorage.setItem('peritrack_leads', JSON.stringify(updatedLeads));
    console.log("Lead saved successfully. Total leads:", updatedLeads.length);
  } catch (error) {
    console.error("Error saving lead to localStorage:", error);
    throw error;
  }
  
  // Track the event
  trackLeadEvent(lead);
  
  return lead;
};

// Get all saved leads
export const getLeads = (): Lead[] => {
  try {
    const leadsData = localStorage.getItem('peritrack_leads');
    const leads = leadsData ? JSON.parse(leadsData) : [];
    console.log("Retrieved leads from localStorage:", leads.length);
    return leads;
  } catch (error) {
    console.error("Error reading leads from localStorage:", error);
    return [];
  }
};

// Delete a lead by ID
export const deleteLead = (id: string): boolean => {
  const leads = getLeads();
  const filteredLeads = leads.filter(lead => lead.id !== id);
  
  if (filteredLeads.length < leads.length) {
    localStorage.setItem('peritrack_leads', JSON.stringify(filteredLeads));
    console.log(`Lead ${id} deleted successfully`);
    return true;
  }
  
  console.log(`Lead ${id} not found`);
  return false;
};

// Clear all leads (for testing purposes)
export const clearLeads = (): void => {
  localStorage.removeItem('peritrack_leads');
  console.log("All leads cleared from localStorage");
};

// Track lead capture events (can be expanded to send to analytics service)
const trackLeadEvent = (lead: Lead) => {
  console.log('Lead captured:', lead);
  
  // This is where you would integrate with an analytics service
  // For now, we're just tracking in localStorage
  
  // Track page events
  try {
    const events = JSON.parse(localStorage.getItem('peritrack_events') || '[]');
    events.push({
      type: lead.source === 'quiz_results' ? 'quiz_results_submitted' : 'free_trial_signup',
      leadId: lead.id,
      timestamp: lead.timestamp,
      pricingPlan: lead.pricingPlan,
      path: window.location.pathname
    });
    
    localStorage.setItem('peritrack_events', JSON.stringify(events));
    console.log("Lead event tracked successfully");
  } catch (error) {
    console.error("Error tracking lead event:", error);
  }
};
