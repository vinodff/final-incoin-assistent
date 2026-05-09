import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// A valid anon key is a JWT — it always starts with "eyJ"
const isValidKey = supabaseAnonKey && supabaseAnonKey.startsWith('eyJ')

export const isSupabaseConfigured = !!(supabaseUrl && isValidKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
