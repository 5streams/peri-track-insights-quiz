
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
  
  // Get existing leads
  const existingLeads = getLeads();
  
  // Add new lead
  const updatedLeads = [...existingLeads, lead];
  
  // Save to localStorage
  localStorage.setItem('peritrack_leads', JSON.stringify(updatedLeads));
  
  // Track the event
  trackLeadEvent(lead);
  
  return lead;
};

// Get all saved leads
export const getLeads = (): Lead[] => {
  const leadsData = localStorage.getItem('peritrack_leads');
  return leadsData ? JSON.parse(leadsData) : [];
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
