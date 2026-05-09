import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zuqohqbkmkcxzxcnsbyr.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cW9ocWJrbWtjeHp4Y25zYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Njc0MDYsImV4cCI6MjA5MjI0MzQwNn0.--I4APXoZXPCkjWb0AZmxk6PW5m1-PIfixZ31AJgsos'

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

let _supabase = null
try {
  if (isSupabaseConfigured) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (e) {
  console.error('Supabase client init failed:', e)
}

export const supabase = _supabase
