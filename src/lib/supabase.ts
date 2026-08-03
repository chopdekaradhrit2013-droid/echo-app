import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  username: string
  full_name: string
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export type Post = {
  id: string
  user_id: string
  content: string | null
  media_url: string | null
  media_type: 'image' | 'video' | null
  likes_count: number
  comments_count: number
  created_at: string
  profiles?: Profile
}

export type Message = {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  created_at: string
  profiles?: Profile
}
