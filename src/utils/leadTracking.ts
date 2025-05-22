import { supabase } from '@/lib/supabaseClient';

// Lead tracking and management utilities

// Define lead types
export interface Lead {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  source: 'quiz_results' | 'free_trial' | string;
  pricing_tier?: 'monthly' | 'annual' | null;
  quiz_results?: any;
  created_at?: string;
  status: 'new' | 'contacted' | 'interested' | 'converted' | 'unqualified';
  device_info?: {
    userAgent: string;
    screenSize: string;
  };
  notes?: string;
}

// Get browser and device information
const getDeviceInfo = () => {
  return {
    userAgent: navigator.userAgent,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
  };
};

// Save lead
export const saveLead = async (
  name: string,
  email: string,
  source: 'quiz_results' | 'free_trial' | string,
  pricingTier?: 'monthly' | 'annual' | null,
  quizResults?: any,
  notes?: string
): Promise<Lead> => {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  try {
    // Upsert user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert({ email, name }, { onConflict: 'email' })
      .select()
      .single();

    if (userError || !userData) {
      console.error("Error upserting user:", userError);
      throw userError || new Error("User data is null");
    }
    const userId = userData.id;

    // Prepare lead data
    const leadDataToInsert = {
      user_id: userId,
      name,
      email,
      source,
      pricing_tier: pricingTier === undefined ? null : pricingTier,
      status: 'new' as Lead['status'],
      device_info: getDeviceInfo(),
      notes: notes === undefined ? null : notes,
    };

    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert(leadDataToInsert)
      .select()
      .single();

    if (leadError || !leadData) {
      console.error("Error inserting lead:", leadError);
      throw leadError || new Error("Lead data is null");
    }

    const createdLeadId = leadData.id; // Get the ID of the newly created lead

    // If it's from a quiz and there are quiz results, save to quiz_submissions
    if (source === 'quiz_results' && quizResults) {
      const { error: submissionError } = await supabase
        .from('quiz_submissions')
        .insert({ 
            user_id: userId, 
            lead_id: createdLeadId,
            quiz_results: quizResults === undefined ? null : quizResults
        });

      if (submissionError) {
        console.error("Error inserting quiz submission:", submissionError);
        // Not throwing here, as lead is already created. Log and continue.
      }
    }
    
    // Make sure the returned object matches the Lead interface
    // The 'id' for the Lead interface should be leadData.id
    // 'timestamp' becomes 'created_at'
    return {
        id: leadData.id,
        user_id: userId,
        name: leadData.name,
        email: leadData.email,
        source: leadData.source,
        pricing_tier: leadData.pricing_tier,
        created_at: leadData.created_at,
        status: leadData.status,
        device_info: leadData.device_info,
        notes: leadData.notes,
    };

  } catch (error) {
    console.error('Error saving lead to Supabase:', error);
    throw error;
  }
};

// Get leads
export const getLeads = async (): Promise<Lead[]> => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select(`
        id,
        user_id,
        name,
        email,
        source,
        pricing_tier,
        created_at,
        status,
        device_info,
        notes,
        quiz_submissions (
          quiz_results
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
    
    // Transform data to match Lead interface, especially quiz_results
    return data ? data.map(lead => ({
        ...lead,
        // Assuming quiz_submissions is an array, take the first if available
        quiz_results: lead.quiz_submissions && Array.isArray(lead.quiz_submissions) && lead.quiz_submissions.length > 0 
                      ? lead.quiz_submissions[0].quiz_results 
                      : (lead.quiz_submissions && !Array.isArray(lead.quiz_submissions) ? (lead.quiz_submissions as any).quiz_results : undefined)
    })) : [];

  } catch (error) {
    console.error('Error retrieving leads from Supabase:', error);
    return [];
  }
};

// Update lead
export const updateLead = async (id: string, updates: Partial<Lead>): Promise<boolean> => {
  try {
    // Ensure 'id' is not part of the updates object for Supabase
    const { id: leadId, user_id, created_at, quiz_results, ...restOfUpdates } = updates;
    
    const { error } = await supabase
      .from('leads')
      .update(restOfUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating lead:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error updating lead in Supabase:', error);
    return false;
  }
};

// Clear all leads (USE WITH CAUTION - for testing or admin purposes)
export const clearAllLeadsForUser = async (userId: string): Promise<void> => {
  console.warn(`Attempting to delete all leads, quiz_answers, and quiz_submissions for user ${userId}`);
  try {
    // This is a more complex operation and should be handled with care,
    // potentially as a stored procedure in Supabase for atomicity.
    // For now, sequential deletion:
    const { error: quizAnswersError } = await supabase.from('quiz_answers').delete().eq('user_id', userId);
    if (quizAnswersError) console.error("Error deleting quiz_answers:", quizAnswersError);

    const { error: quizSubmissionsError } = await supabase.from('quiz_submissions').delete().eq('user_id', userId);
    if (quizSubmissionsError) console.error("Error deleting quiz_submissions:", quizSubmissionsError);
    
    const { error: leadsError } = await supabase.from('leads').delete().eq('user_id', userId);
    if (leadsError) console.error("Error deleting leads:", leadsError);

    // Optionally, delete the user too if no longer needed
    // const { error: userError } = await supabase.from('users').delete().eq('id', userId);
    // if (userError) console.error("Error deleting user:", userError);

    console.log(`Cleared data for user ${userId}`);
  } catch (error) {
    console.error('Error clearing leads for user:', error);
  }
};

// Export leads as CSV
export const exportLeadsCSV = async (): Promise<string> => {
  try {
    const leads = await getLeads(); // Fetches leads with quiz_results included
    
    const csvHeader = 'Lead ID,User ID,Name,Email,Source,Pricing Tier,Status,Created At,Notes,Quiz Phase,Quiz Score\n';
    const csvContent = leads.map(lead => {
      const quizPhase = lead.quiz_results?.phase || 'N/A';
      const quizScore = lead.quiz_results?.score !== undefined ? lead.quiz_results.score : 'N/A';
      
      return [
        lead.id,
        lead.user_id || 'N/A',
        lead.name,
        lead.email,
        lead.source,
        lead.pricing_tier || 'N/A',
        lead.status,
        lead.created_at ? new Date(lead.created_at).toLocaleString() : 'N/A',
        lead.notes || '',
        quizPhase,
        quizScore
      ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(','); // Escape quotes and wrap in quotes
    }).join('\n');
    
    return csvHeader + csvContent;
  } catch (error) {
    console.error('Error exporting leads to CSV:', error);
    return 'Error generating CSV'; // Or throw error
  }
};

// Interface for individual quiz submissions (if needed separately)
export interface QuizSubmission {
  id: string;
  user_id: string;
  lead_id?: string; // If you added this from previous step
  quiz_results: any; // Or a more specific type for your quiz results structure
  submitted_at: string;
}

// Interface for the data structure returned by the RPC function
export interface UserActivity {
  user_id: string;
  user_name: string | null;
  user_email: string;
  user_created_at: string;
  leads_data: Lead[] | null; // Array of Lead objects
  quiz_submissions_data: QuizSubmission[] | null; // Array of QuizSubmission objects
  latest_lead_timestamp: string | null;
}

export const getUserCentricActivity = async (): Promise<UserActivity[]> => {
  try {
    const { data, error } = await supabase.rpc('get_user_centric_activity');

    if (error) {
      console.error('Error fetching user centric activity:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getUserCentricActivity:', error);
    return [];
  }
};

// Interface for individual quiz answers
export interface QuizAnswer { 
  id: string;
  user_id: string;
  question_id: string;
  answer: string[]; // Assuming answer is stored as an array of strings
  created_at: string;
}

export const getQuizAnswersForUser = async (userId: string): Promise<QuizAnswer[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_answers') // Ensure this table name matches your Supabase table
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching quiz answers for user:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getQuizAnswersForUser:', error);
    return [];
  }
};
