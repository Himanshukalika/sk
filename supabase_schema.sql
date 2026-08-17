-- ========================================================
-- SK FIRE AGENCY - SUPABASE DATABASE SCHEMA (IDEMPOTENT / SAFE RE-RUN)
-- ========================================================
-- How to use:
-- 1. Open your Supabase Dashboard (https://app.supabase.com)
-- 2. Go to your Project -> SQL Editor
-- 3. Copy and paste this complete SQL script into the query editor
-- 4. Click "Run" to execute
-- ========================================================

-- --------------------------------------------------------
-- 1. GALLERY & SELECTIONS TABLE (gallery_items)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'govt_selection', 'private_selection', 'ground', 'classroom', 'drills', 'celebration', 'hostel'
  section TEXT,          -- 'govt', 'private', 'training'
  image_url TEXT NOT NULL,
  description TEXT,
  candidate_name TEXT,
  post_or_company TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public select for gallery_items" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow public insert for gallery_items" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow public update for gallery_items" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow public delete for gallery_items" ON public.gallery_items;

-- Allow Public Access Policies
CREATE POLICY "Allow public select for gallery_items" 
  ON public.gallery_items FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert for gallery_items" 
  ON public.gallery_items FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update for gallery_items" 
  ON public.gallery_items FOR UPDATE TO public USING (true);

CREATE POLICY "Allow public delete for gallery_items" 
  ON public.gallery_items FOR DELETE TO public USING (true);


-- --------------------------------------------------------
-- 2. ADMISSION LEADS TABLE (admission_leads)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admission_leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name TEXT NOT NULL,
  father_name TEXT,
  mobile TEXT NOT NULL,
  alternate_mobile TEXT,
  email TEXT,
  dob TEXT,
  gender TEXT DEFAULT 'Male',
  qualification TEXT,
  address TEXT,
  state TEXT,
  city TEXT,
  selected_course TEXT NOT NULL,
  hostel_required TEXT DEFAULT 'No',
  notes TEXT,
  status TEXT DEFAULT 'New', -- 'New', 'Contacted', 'Enrolled', 'Rejected'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admission_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public all access on admission_leads" ON public.admission_leads;

CREATE POLICY "Allow public all access on admission_leads" 
  ON public.admission_leads FOR ALL TO public USING (true) WITH CHECK (true);


-- --------------------------------------------------------
-- 3. CONTACT ENQUIRIES TABLE (contact_enquiries)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New', -- 'New', 'Replied', 'Archived'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public all access on contact_enquiries" ON public.contact_enquiries;

CREATE POLICY "Allow public all access on contact_enquiries" 
  ON public.contact_enquiries FOR ALL TO public USING (true) WITH CHECK (true);


-- --------------------------------------------------------
-- 4. SUPABASE STORAGE BUCKET (gallery-photos)
-- --------------------------------------------------------
-- Create public storage bucket for image file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-photos', 'gallery-photos', true) 
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies if re-running
DROP POLICY IF EXISTS "Public Read Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Storage Access" ON storage.objects;

-- Public Storage Access Policies
CREATE POLICY "Public Read Storage Access" 
  ON storage.objects FOR SELECT TO public 
  USING (bucket_id = 'gallery-photos');

CREATE POLICY "Public Insert Storage Access" 
  ON storage.objects FOR INSERT TO public 
  WITH CHECK (bucket_id = 'gallery-photos');

CREATE POLICY "Public Update Storage Access" 
  ON storage.objects FOR UPDATE TO public 
  USING (bucket_id = 'gallery-photos');

CREATE POLICY "Public Delete Storage Access" 
  ON storage.objects FOR DELETE TO public 
  USING (bucket_id = 'gallery-photos');

-- ========================================================
-- SCHEMA CREATION COMPLETED SUCCESSFULLY!
-- ========================================================
