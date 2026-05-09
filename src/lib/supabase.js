import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zuqohqbkmkcxzxcnsbyr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cW9ocWJrbWtjeHp4Y25zYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Njc0MDYsImV4cCI6MjA5MjI0MzQwNn0.--I4APXoZXPCkjWb0AZmxk6PW5m1-PIfixZ31AJgsos'

// A valid anon key is a JWT — it always starts with "eyJ"
const isValidKey = supabaseAnonKey && supabaseAnonKey.startsWith('eyJ')

export const isSupabaseConfigured = !!(supabaseUrl && isValidKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
