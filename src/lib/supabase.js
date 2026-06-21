import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ppduglunakvyzkgjcuww.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uz60mGm2gD7UUPBA32hYig_nR3Zztrp'

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
