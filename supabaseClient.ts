import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
const env = (import.meta as any).env || {};

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;

// Export a flag to check if Supabase is actually configured with environment variables
export const isSupabaseConfigured = !!url && !!key;

// Fallback to a dummy URL to prevent initialization errors, but we will skip network calls if not configured.
const supabaseUrl = url || 'https://placeholder.supabase.co';
const supabaseAnonKey = key || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
