import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export interface Newsletter {
  id?: string
  email: string
  first_name?: string
  last_name?: string
  status?: "active" | "unsubscribed"
  source?: string
  created_at?: string
  updated_at?: string
}

export interface ContactRequest {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company?: string
  position?: string
  subject: string
  message: string
  status?: "new" | "in_progress" | "completed" | "closed"
  created_at?: string
  updated_at?: string
}

export interface EbookDownload {
  id?: string
  first_name: string
  email: string
  ebook_title?: string
  downloaded_at?: string
}
