import { createClient } from '@supabase/supabase-js';

// Ensure your .env file uses VITE_ prefix for these variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL (VITE_SUPABASE_URL) and Anon Key (VITE_SUPABASE_ANON_KEY) must be defined in .env file");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 