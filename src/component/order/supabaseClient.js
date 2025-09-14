import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://gxuuyxmsdlevydzdmohk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dXV5eG1zZGxldnlkemRtb2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY1NDYsImV4cCI6MjA3MzAxMjU0Nn0.a2Q4rzUkID6opxGGPenqXxMvHhgdaRH4cx51iyF2Rn4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
