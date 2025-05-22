
// Lead storage utility - simplified implementation

export interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  timestamp: string;
  notes?: string;
}

// Local storage key
const STORAGE_KEY = 'peritrack_leads';

// Initialize storage
export const initStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Save lead
export const saveLead = (name: string, email: string, source: string, notes?: string): Lead => {
  // Create lead object
  const lead: Lead = {
    id: generateId(),
    name,
    email,
    source,
    timestamp: new Date().toISOString(),
    notes
  };
  
  // Get current leads
  const leadsData = localStorage.getItem(STORAGE_KEY) || '[]';
  const leads: Lead[] = JSON.parse(leadsData);
  
  // Add new lead
  leads.push(lead);
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  
  return lead;
};

// Get all leads
export const getLeads = (): Lead[] => {
  const leadsData = localStorage.getItem(STORAGE_KEY) || '[]';
  return JSON.parse(leadsData);
};

// Clear all leads (for testing)
export const clearLeads = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
};

// Export to CSV
export const exportToCSV = (): string => {
  const leads = getLeads();
  
  const csvHeader = 'ID,Name,Email,Source,Date,Notes\n';
  const csvRows = leads.map(lead => {
    return `${lead.id},${lead.name},${lead.email},${lead.source},${lead.timestamp},${lead.notes || ''}`;
  }).join('\n');
  
  return csvHeader + csvRows;
};

// Initialize storage on module load
initStorage();
