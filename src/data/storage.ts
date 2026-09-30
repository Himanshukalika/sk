import fs from 'fs';
import path from 'path';
import { Course, AdmissionLead, ContactEnquiry, RecruitmentNotice, BlogPost, GalleryItem, SiteSettings } from '@/types';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_BLOGS, INITIAL_GALLERY, INITIAL_SETTINGS } from './initialData';
import { isSupabaseConfigured, supabase, mapRowToGalleryItem, mapGalleryItemToRow } from '@/lib/supabase';

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  leads: AdmissionLead[];
  contacts: ContactEnquiry[];
  courses: Course[];
  recruitments: RecruitmentNotice[];
  blogs: BlogPost[];
  gallery: GalleryItem[];
  settings?: SiteSettings;
}

function ensureDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialDb: DatabaseSchema = {
        leads: [
          {
            id: 'lead-1',
            fullName: 'Aman Verma',
            fatherName: 'Rajesh Verma',
            mobile: '9876543210',
            alternateMobile: '9876543211',
            email: 'aman.verma@example.com',
            dob: '2002-05-14',
            gender: 'Male',
            qualification: '12th Pass (Science)',
            address: 'Ward No 4, Main Market, Rewari',
            state: 'Haryana',
            city: 'Rewari',
            selectedCourse: 'fire-guard-course',
            hostelRequired: 'Yes',
            notes: 'Interested in physical ground training from next week.',
            status: 'New',
            createdAt: new Date().toISOString()
          },
          {
            id: 'lead-2',
            fullName: 'Ravi Kumar Gurjar',
            fatherName: 'Ramprasad Gurjar',
            mobile: '9812345678',
            email: 'ravi.gurjar@example.com',
            dob: '2001-11-20',
            gender: 'Male',
            qualification: '10th + HMV Driving License',
            address: 'Village Dholpur',
            state: 'Rajasthan',
            city: 'Dholpur',
            selectedCourse: 'fire-operator-course',
            hostelRequired: 'Yes',
            notes: 'Possesses 3 years heavy driving license.',
            status: 'Contacted',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ],
        contacts: [
          {
            id: 'contact-1',
            name: 'Pooja Choudhary',
            phone: '9988776655',
            email: 'pooja.c@example.com',
            subject: 'Hostel and batch timings inquiry',
            message: 'Hello, are there separate hostel and physical training batches available for female candidates?',
            createdAt: new Date().toISOString(),
            status: 'New'
          }
        ],
        courses: INITIAL_COURSES,
        recruitments: INITIAL_RECRUITMENTS,
        blogs: INITIAL_BLOGS,
        gallery: INITIAL_GALLERY,
        settings: INITIAL_SETTINGS
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }

    const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return {
      leads: parsed.leads || [],
      contacts: parsed.contacts || [],
      courses: parsed.courses?.length ? parsed.courses : INITIAL_COURSES,
      recruitments: parsed.recruitments?.length ? parsed.recruitments : INITIAL_RECRUITMENTS,
      blogs: parsed.blogs?.length ? parsed.blogs : INITIAL_BLOGS,
      gallery: parsed.gallery?.length ? parsed.gallery : INITIAL_GALLERY,
      settings: parsed.settings || INITIAL_SETTINGS
    };
  } catch (error) {
    console.error('Failed to read or initialize DB file, falling back to memory/defaults:', error);
    return {
      leads: [],
      contacts: [],
      courses: INITIAL_COURSES,
      recruitments: INITIAL_RECRUITMENTS,
      blogs: INITIAL_BLOGS,
      gallery: INITIAL_GALLERY
    };
  }
}

function saveDb(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save to DB file:', error);
  }
}

// Leads
export function getLeads(): AdmissionLead[] {
  const db = ensureDb();
  return db.leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addLead(lead: Omit<AdmissionLead, 'id' | 'createdAt' | 'status'> & Partial<Pick<AdmissionLead, 'id' | 'createdAt' | 'status'>>): AdmissionLead {
  const db = ensureDb();
  const newLead: AdmissionLead = {
    id: lead.id || `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    fullName: lead.fullName,
    fatherName: lead.fatherName,
    mobile: lead.mobile,
    alternateMobile: lead.alternateMobile || '',
    email: lead.email || '',
    dob: lead.dob,
    gender: lead.gender || 'Male',
    qualification: lead.qualification,
    address: lead.address,
    state: lead.state,
    city: lead.city,
    selectedCourse: lead.selectedCourse || 'General Admission',
    hostelRequired: lead.hostelRequired || 'No',
    marksheet10thUrl: lead.marksheet10thUrl || '',
    marksheet12thUrl: lead.marksheet12thUrl || '',
    aadharUrl: lead.aadharUrl || '',
    notes: lead.notes || '',
    status: lead.status || 'New',
    createdAt: lead.createdAt || new Date().toISOString()
  };
  db.leads.unshift(newLead);
  saveDb(db);
  return newLead;
}

export function updateLeadStatus(id: string, status: AdmissionLead['status']): boolean {
  const db = ensureDb();
  const lead = db.leads.find(l => l.id === id);
  if (lead) {
    lead.status = status;
    saveDb(db);
    return true;
  }
  return false;
}

export function deleteLead(id: string): boolean {
  const db = ensureDb();
  const initialLength = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);
  if (db.leads.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Contacts
export function getContacts(): ContactEnquiry[] {
  const db = ensureDb();
  return db.contacts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addContact(contact: Omit<ContactEnquiry, 'id' | 'createdAt' | 'status'>): ContactEnquiry {
  const db = ensureDb();
  const newContact: ContactEnquiry = {
    id: `contact-${Date.now()}`,
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    subject: contact.subject,
    message: contact.message,
    createdAt: new Date().toISOString(),
    status: 'New'
  };
  db.contacts.unshift(newContact);
  saveDb(db);
  return newContact;
}

export function deleteContact(id: string): boolean {
  const db = ensureDb();
  const initialLength = db.contacts.length;
  db.contacts = db.contacts.filter(c => c.id !== id);
  if (db.contacts.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Courses
export function getCourses(): Course[] {
  const db = ensureDb();
  return db.courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getCourses();
  return courses.find(c => c.slug === slug || c.id === slug);
}

export function saveCourse(course: Course): Course {
  const db = ensureDb();
  const index = db.courses.findIndex(c => c.id === course.id);
  if (index >= 0) {
    db.courses[index] = course;
  } else {
    db.courses.unshift(course);
  }
  saveDb(db);
  return course;
}

export function deleteCourse(id: string): boolean {
  const db = ensureDb();
  const initialLength = db.courses.length;
  db.courses = db.courses.filter(c => c.id !== id && c.slug !== id);
  if (db.courses.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Recruitments
export function getRecruitments(): RecruitmentNotice[] {
  const db = ensureDb();
  return db.recruitments;
}

export function saveRecruitment(notice: RecruitmentNotice): RecruitmentNotice {
  const db = ensureDb();
  const index = db.recruitments.findIndex(r => r.id === notice.id);
  if (index >= 0) {
    db.recruitments[index] = notice;
  } else {
    db.recruitments.unshift(notice);
  }
  saveDb(db);
  return notice;
}

export function deleteRecruitment(id: string): boolean {
  const db = ensureDb();
  const initialLength = db.recruitments.length;
  db.recruitments = db.recruitments.filter(r => r.id !== id);
  if (db.recruitments.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Blogs
export function getBlogs(): BlogPost[] {
  const db = ensureDb();
  return db.blogs;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const blogs = getBlogs();
  return blogs.find(b => b.slug === slug || b.id === slug);
}

export function saveBlog(blog: BlogPost): BlogPost {
  const db = ensureDb();
  const index = db.blogs.findIndex(b => b.id === blog.id);
  if (index >= 0) {
    db.blogs[index] = blog;
  } else {
    db.blogs.unshift(blog);
  }
  saveDb(db);
  return blog;
}

export function deleteBlog(id: string): boolean {
  const db = ensureDb();
  const initialLength = db.blogs.length;
  db.blogs = db.blogs.filter(b => b.id !== id && b.slug !== id);
  if (db.blogs.length !== initialLength) {
    saveDb(db);
    return true;
  }
  return false;
}

// Gallery
export function getGallery(): GalleryItem[] {
  const db = ensureDb();
  return db.gallery;
}

export async function getGalleryItemsAsync(): Promise<GalleryItem[]> {
  const localItems = getGallery();
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const supabaseItems = data.map(mapRowToGalleryItem);
        const supabaseIds = new Set(supabaseItems.map(item => item.id));
        const remainingInitial = localItems.filter(item => !supabaseIds.has(item.id));
        return [...supabaseItems, ...remainingInitial];
      }
    } catch (err) {
      console.warn('Supabase fetch error, using local database fallback:', err);
    }
  }
  return localItems;
}

export function addGalleryItem(item: GalleryItem): GalleryItem {
  const db = ensureDb();
  db.gallery.unshift(item);
  saveDb(db);
  return item;
}

export async function addGalleryItemAsync(itemData: Omit<GalleryItem, 'id'> & { id?: string }): Promise<GalleryItem> {
  const newItem: GalleryItem = {
    id: itemData.id || `gal-${Date.now()}`,
    title: itemData.title,
    category: itemData.category,
    section: itemData.section || (itemData.category === 'govt_selection' ? 'govt' : itemData.category === 'private_selection' ? 'private' : 'training'),
    imageUrl: itemData.imageUrl,
    description: itemData.description || '',
    candidateName: itemData.candidateName || '',
    postOrCompany: itemData.postOrCompany || '',
    date: itemData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      const row = mapGalleryItemToRow(newItem);
      const { data, error } = await supabase
        .from('gallery_items')
        .insert([row])
        .select();

      if (!error && data && data.length > 0) {
        // also sync local db for redundancy
        addGalleryItem(mapRowToGalleryItem(data[0]));
        return mapRowToGalleryItem(data[0]);
      }
    } catch (err) {
      console.warn('Supabase insert error, falling back to local file storage:', err);
    }
  }

  return addGalleryItem(newItem);
}

export async function updateGalleryItemAsync(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
  const db = ensureDb();
  const index = db.gallery.findIndex(g => g.id === id);
  if (index === -1) return null;

  const updatedItem: GalleryItem = {
    ...db.gallery[index],
    ...updates
  };

  db.gallery[index] = updatedItem;
  saveDb(db);

  if (isSupabaseConfigured() && supabase) {
    try {
      const row = mapGalleryItemToRow(updatedItem);
      await supabase
        .from('gallery_items')
        .update(row)
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase update error:', err);
    }
  }

  return updatedItem;
}

export async function deleteGalleryItemAsync(id: string): Promise<boolean> {
  const db = ensureDb();
  const initialLength = db.gallery.length;
  db.gallery = db.gallery.filter(g => g.id !== id);
  const success = db.gallery.length < initialLength;
  
  if (success) {
    saveDb(db);
  }

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  return success;
}

// Site & Video Settings
export function getSettings(): SiteSettings {
  const db = ensureDb();
  return db.settings || INITIAL_SETTINGS;
}

export function updateSettings(newSettings: Partial<SiteSettings>): SiteSettings {
  const db = ensureDb();
  const current = db.settings || INITIAL_SETTINGS;
  const updated: SiteSettings = {
    ...current,
    ...newSettings
  };
  db.settings = updated;
  saveDb(db);
  return updated;
}
