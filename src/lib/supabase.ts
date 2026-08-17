import { createClient } from '@supabase/supabase-js';
import { GalleryItem } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if credentials are valid (not empty or default placeholders)
export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-supabase-project') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  );
};

// Create Supabase client (only created if configured)
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to convert database row (snake_case) to GalleryItem (camelCase)
export function mapRowToGalleryItem(row: Record<string, any>): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    section: row.section || (row.category === 'govt_selection' ? 'govt' : row.category === 'private_selection' ? 'private' : 'training'),
    imageUrl: row.image_url || row.imageUrl,
    description: row.description || '',
    candidateName: row.candidate_name || row.candidateName || '',
    postOrCompany: row.post_or_company || row.postOrCompany || '',
    date: row.date || ''
  };
}

// Helper to convert GalleryItem (camelCase) to database row (snake_case)
export function mapGalleryItemToRow(item: GalleryItem): Record<string, any> {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    section: item.section || (item.category === 'govt_selection' ? 'govt' : item.category === 'private_selection' ? 'private' : 'training'),
    image_url: item.imageUrl,
    description: item.description || '',
    candidate_name: item.candidateName || '',
    post_or_company: item.postOrCompany || '',
    date: item.date || ''
  };
}
