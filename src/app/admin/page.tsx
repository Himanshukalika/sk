'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  MessageSquare,
  Briefcase,
  BookOpen,
  Download,
  Search,
  Trash2,
  CheckCircle,
  Clock,
  Flame,
  Eye,
  X,
  Phone,
  RefreshCw,
  Lock,
  Camera,
  Plus,
  Edit3,
  Award,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
  Menu,
  Loader2,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  User,
  Tag,
  Link as LinkIcon,
  Video,
  Play,
  Settings as SettingsIcon
} from 'lucide-react';
import { AdmissionLead, ContactEnquiry, Course, RecruitmentNotice, BlogPost, GalleryItem, SiteSettings } from '@/types';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_BLOGS, INITIAL_GALLERY, INITIAL_SETTINGS } from '@/data/initialData';
import { getYouTubeEmbedUrl } from '@/lib/videoUtils';
import AcademyLogo from '@/components/AcademyLogo';

const ADMIN_EMAIL = 'info@skfiresafety.in';
const ADMIN_PASSWORD = 'SKFire@2024';

const initialCourseForm: Course = {
  id: '',
  slug: '',
  title: '',
  hindiTitle: '',
  category: 'fireman',
  badge: 'Popular',
  duration: '6 Months',
  eligibility: '10th / 12th Pass',
  batchTiming: '08:00 AM - 12:00 PM',
  mode: 'Offline + Ground',
  fees: '₹18,500',
  shortDescription: '',
  description: '',
  keyFeatures: [
    'Daily Physical Training (400m Track + Obstacles)',
    'Live Hose & Hydrant Practical Drills',
    'Breathing Apparatus (BA) Set Training',
    'Govt. & Private Placement Support'
  ],
  syllabus: [
    { title: 'Module 1: Fire Science & Prevention', topics: ['Chemistry of Combustion', 'Classification of Fire', 'Fire Prevention Measures'] },
    { title: 'Module 2: Practical Fire Fighting Equipment', topics: ['Fire Hoses & Branch Pipes', 'Pumps & Primers Drill', 'Breathing Apparatus Operation'] }
  ],
  upcomingBatchDate: '1st & 15th of Every Month',
  totalSeats: 60,
  availableSeats: 15
};

const initialRecruitmentForm: RecruitmentNotice = {
  id: '',
  title: '',
  department: '',
  state: 'All India',
  totalPosts: 100,
  eligibility: '10th / 12th Pass with Fire Safety Certificate',
  ageLimit: '18 - 28 Years',
  salary: 'Pay Level 3 (₹21,700 - ₹69,100)',
  applicationStartDate: new Date().toISOString().split('T')[0],
  lastDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  status: 'Active',
  notificationUrl: '',
  applyUrl: '',
  brief: '',
  keyDates: [
    { event: 'Application Start Date', date: new Date().toISOString().split('T')[0] },
    { event: 'Last Date for Online Submission', date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] }
  ]
};

const initialBlogForm: BlogPost = {
  id: '',
  slug: '',
  title: '',
  hindiTitle: '',
  excerpt: '',
  content: '',
  category: 'Guide',
  author: 'Chief Fire Training Officer',
  publishedAt: new Date().toISOString().split('T')[0],
  readTime: '5 min read',
  tags: ['Fireman', 'Recruitment', 'Exam Preparation', 'Physical Test'],
  featured: false
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'courses' | 'recruitments' | 'blogs' | 'gallery' | 'settings'>('leads');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Settings State (YouTube Video & Tour Info)
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<AdmissionLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<AdmissionLead | null>(null);

  // Contacts state
  const [contacts, setContacts] = useState<ContactEnquiry[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Courses state & modals
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [courseSearch, setCourseSearch] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('all');
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<Course>(initialCourseForm);
  const [isSavingCourse, setIsSavingCourse] = useState(false);

  // Recruitment state & modals
  const [recruitments, setRecruitments] = useState<RecruitmentNotice[]>(INITIAL_RECRUITMENTS);
  const [recruitmentSearch, setRecruitmentSearch] = useState('');
  const [recruitmentStateFilter, setRecruitmentStateFilter] = useState('all');
  const [isAddingRecruitment, setIsAddingRecruitment] = useState(false);
  const [editingRecruitment, setEditingRecruitment] = useState<RecruitmentNotice | null>(null);
  const [recruitmentForm, setRecruitmentForm] = useState<RecruitmentNotice>(initialRecruitmentForm);
  const [isSavingRecruitment, setIsSavingRecruitment] = useState(false);

  // Blogs state & modals
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<BlogPost>(initialBlogForm);
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');
  
  // Gallery Modal & Form State
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSavingPhoto, setIsSavingPhoto] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);

  const [photoForm, setPhotoForm] = useState({
    title: '',
    category: 'govt_selection',
    section: 'govt',
    imageUrl: '',
    description: '',
    candidateName: '',
    postOrCompany: '',
    date: ''
  });

  // Client-side image compressor before upload
  const compressImage = async (file: File, maxWidth = 1280, maxHeight = 1280, quality = 0.82): Promise<File> => {
    if (typeof window === 'undefined' || !file.type.startsWith('image/')) {
      return file;
    }
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(file);
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (!blob) return resolve(file);
              const compressed = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
                type: 'image/webp',
                lastModified: Date.now()
              });
              resolve(compressed);
            },
            'image/webp',
            quality
          );
        };
        img.onerror = () => resolve(file);
      };
      reader.onerror = () => resolve(file);
    });
  };

  // Direct File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const originalFile = files[0];

    setIsUploadingPhoto(true);
    try {
      const fileToUpload = await compressImage(originalFile);
      const formData = new FormData();
      formData.append('file', fileToUpload);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success && data.imageUrl) {
        if (isEditMode && editingPhoto) {
          setEditingPhoto(prev => prev ? { ...prev, imageUrl: data.imageUrl } : null);
        } else {
          setPhotoForm(prev => ({ ...prev, imageUrl: data.imageUrl }));
        }
      } else {
        alert(data.error || 'Failed to upload photo');
      }
    } catch (err: any) {
      console.error(err);
      alert('Photo upload failed: ' + (err?.message || 'Network error'));
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Fetch leads and contacts
  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/admission');
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeads(false);
    }
  };

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchGallery = async () => {
    setLoadingGallery(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && data.data) {
        setGalleryItems(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.title) {
      alert('Please fill in Title / Caption for the photo');
      return;
    }
    if (!photoForm.imageUrl) {
      alert('Please select and upload a photo first!');
      return;
    }
    setIsSavingPhoto(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoForm)
      });
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        throw new Error(`Server returned status ${res.status}`);
      }
      if (data.success) {
        alert('Photo published successfully to gallery!');
        setIsAddingPhoto(false);
        setPhotoForm({
          title: '',
          category: 'govt_selection',
          section: 'govt',
          imageUrl: '',
          description: '',
          candidateName: '',
          postOrCompany: '',
          date: ''
        });
        setShowManualUrl(false);
        fetchGallery();
      } else {
        alert(data.error || 'Failed to add photo');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to add photo: ' + (err?.message || 'Server error'));
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleUpdatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    setIsSavingPhoto(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPhoto)
      });
      let data: any = {};
      try {
        data = await res.json();
      } catch {
        throw new Error(`Server returned status ${res.status}`);
      }
      if (data.success) {
        alert('Photo updated successfully!');
        setEditingPhoto(null);
        fetchGallery();
      } else {
        alert(data.error || 'Failed to update photo');
      }
    } catch (err: any) {
      console.error(err);
      alert('Failed to update photo: ' + (err?.message || 'Server error'));
    } finally {
      setIsSavingPhoto(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo item?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setGalleryItems(prev => prev.filter(g => g.id !== id));
      } else {
        alert(data.error || 'Failed to delete photo');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete photo');
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (data.success && data.data) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCourse(true);
    try {
      const isEdit = !!editingCourse;
      const targetData = isEdit ? editingCourse : courseForm;
      if (!targetData.title) {
        alert('Course Title is required');
        setIsSavingCourse(false);
        return;
      }
      const res = await fetch('/api/courses', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetData)
      });
      const data = await res.json();
      if (data.success) {
        alert(isEdit ? 'Course updated successfully!' : 'Course added successfully!');
        setIsAddingCourse(false);
        setEditingCourse(null);
        setCourseForm(initialCourseForm);
        fetchCourses();
      } else {
        alert(data.error || 'Failed to save course');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save course');
    } finally {
      setIsSavingCourse(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/courses?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCourses(prev => prev.filter(c => c.id !== id && c.slug !== id));
      } else {
        alert(data.error || 'Failed to delete course');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete course');
    }
  };

  // Recruitment Handlers
  const fetchRecruitments = async () => {
    try {
      const res = await fetch('/api/recruitment');
      const data = await res.json();
      if (data.success && data.data) {
        setRecruitments(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch recruitments:', err);
    }
  };

  const handleSaveRecruitment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingRecruitment(true);
    try {
      const isEdit = !!editingRecruitment;
      const targetData = isEdit ? editingRecruitment : recruitmentForm;
      if (!targetData.title || !targetData.department) {
        alert('Notice Title and Department are required');
        setIsSavingRecruitment(false);
        return;
      }
      const res = await fetch('/api/recruitment', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetData)
      });
      const data = await res.json();
      if (data.success) {
        alert(isEdit ? 'Recruitment notice updated successfully!' : 'Recruitment notice added successfully!');
        setIsAddingRecruitment(false);
        setEditingRecruitment(null);
        setRecruitmentForm(initialRecruitmentForm);
        fetchRecruitments();
      } else {
        alert(data.error || 'Failed to save recruitment notice');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save recruitment notice');
    } finally {
      setIsSavingRecruitment(false);
    }
  };

  const handleDeleteRecruitment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this recruitment notice? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/recruitment?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setRecruitments(prev => prev.filter(r => r.id !== id));
      } else {
        alert(data.error || 'Failed to delete recruitment notice');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete recruitment notice');
    }
  };

  // Blog Handlers
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success && data.data) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBlog(true);
    try {
      const isEdit = !!editingBlog;
      const targetData = isEdit ? editingBlog : blogForm;
      if (!targetData.title || !targetData.content) {
        alert('Title and Content are required');
        setIsSavingBlog(false);
        return;
      }
      const res = await fetch('/api/blogs', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetData)
      });
      const data = await res.json();
      if (data.success) {
        alert(isEdit ? 'Blog post updated successfully!' : 'Blog post published successfully!');
        setIsAddingBlog(false);
        setEditingBlog(null);
        setBlogForm(initialBlogForm);
        fetchBlogs();
      } else {
        alert(data.error || 'Failed to save blog post');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save blog post');
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setBlogs(prev => prev.filter(b => b.id !== id && b.slug !== id));
      } else {
        alert(data.error || 'Failed to delete blog post');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog post');
    }
  };

  // Video Settings Handlers
  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        alert('Campus Tour Video & Settings updated successfully!');
        if (data.data) setSettings(data.data);
      } else {
        alert(data.error || 'Failed to save settings');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update settings');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploadingThumbnail(true);
    try {
      const compressed = await compressImage(files[0]);
      const formData = new FormData();
      formData.append('file', compressed);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        const newSettings = { ...settings, tourVideoThumbnail: data.imageUrl };
        setSettings(newSettings);
        // Auto-save to settings API
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings)
        });
        alert('Cover photo uploaded and saved successfully!');
      } else {
        alert(data.error || 'Failed to upload thumbnail');
      }
    } catch (err: any) {
      console.error(err);
      alert('Thumbnail upload failed: ' + (err?.message || 'Network error'));
    } finally {
      setIsUploadingThumbnail(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      try {
        const [lRes, cRes, gRes, sRes, crRes, recRes, bRes] = await Promise.all([
          fetch('/api/admission'),
          fetch('/api/contact'),
          fetch('/api/gallery'),
          fetch('/api/settings'),
          fetch('/api/courses'),
          fetch('/api/recruitment'),
          fetch('/api/blogs')
        ]);
        const [lData, cData, gData, sData, crData, recData, bData] = await Promise.all([
          lRes.json(),
          cRes.json(),
          gRes.json(),
          sRes.json(),
          crRes.json(),
          recRes.json(),
          bRes.json()
        ]);
        if (isMounted) {
          if (lData.success) setLeads(lData.data);
          if (cData.success) setContacts(cData.data);
          if (gData.success && gData.data) setGalleryItems(gData.data);
          if (sData.success && sData.data) setSettings(sData.data);
          if (crData.success && crData.data) setCourses(crData.data);
          if (recData.success && recData.data) setRecruitments(recData.data);
          if (bData.success && bData.data) setBlogs(bData.data);
        }
      } catch (e) {
        console.error('Error fetching initial dashboard data:', e);
      }
    }
    loadInitial();
    return () => { isMounted = false; };
  }, []);

  const handleUpdateLeadStatus = async (id: string, newStatus: AdmissionLead['status']) => {
    try {
      const res = await fetch('/api/admission', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admission?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(l => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setContacts(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim().toLowerCase() === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    const matchesSearch = (l.fullName || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
                          (l.mobile || '').includes(leadSearch) ||
                          (l.city || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
                          (l.selectedCourse || '').toLowerCase().includes(leadSearch.toLowerCase()) ||
                          (l.id || '').toLowerCase().includes(leadSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const enrolledCount = leads.filter(l => l.status === 'Enrolled').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center mx-auto text-white shadow-lg">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-black">SK Fire Agency Admin</h2>
            <p className="text-xs text-neutral-400 mt-1">
              Authorized Staff & Admission Desk Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {loginError && (
              <p className="text-xs text-red-400 font-semibold text-center">{loginError}</p>
            )}
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none text-white placeholder:text-neutral-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none text-white placeholder:text-neutral-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md mt-2"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col lg:flex-row">
      
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden bg-neutral-950 text-white p-4 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-40">
        <Link href="/" className="flex items-center">
          <AcademyLogo size="small" variant="dark" />
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-neutral-900 rounded-xl text-white hover:bg-neutral-800"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* LEFT SIDEBAR NAVIGATION MENU */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'}
        lg:block w-full lg:w-72 bg-neutral-950 text-neutral-300 border-r border-neutral-800 shrink-0 flex flex-col justify-between min-h-screen p-5 z-40
      `}>
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="hidden lg:flex items-center justify-between border-b border-neutral-800/80 pb-5">
            <Link href="/" className="flex items-center">
              <AcademyLogo size="medium" variant="dark" />
            </Link>

            <span className="bg-green-500/20 text-green-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase border border-green-500/30">
              Live
            </span>
          </div>

          {/* Navigation Items Organized by Section */}
          <nav className="space-y-6">
            
            {/* Section 1: Lead & Student Management */}
            <div>
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-3 mb-2">
                Student & Leads Desk
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('leads'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'leads'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Student Admissions</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {leads.length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab('contacts'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'contacts'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Messages</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {contacts.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Section 2: Media & Selections Manager */}
            <div>
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-3 mb-2">
                Media & Selections
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('gallery'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'gallery'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Camera className="w-4 h-4" />
                    <span>Gallery & Selections</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {galleryItems.length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'settings'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Video className="w-4 h-4" />
                    <span>Campus Tour Video</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Live
                  </span>
                </button>
              </div>
            </div>

            {/* Section 3: Course & Job Content */}
            <div>
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest px-3 mb-2">
                Courses & Recruitment
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => { setActiveTab('courses'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'courses'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4" />
                    <span>Course Catalog</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === 'courses' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {courses.length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab('recruitments'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'recruitments'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4" />
                    <span>Recruitment Notices</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === 'recruitments' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {recruitments.length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab('blogs'); setIsMobileMenuOpen(false); }}
                  className={`w-full px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    activeTab === 'blogs'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                      : 'hover:bg-neutral-900 text-neutral-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileTextIcon className="w-4 h-4" />
                    <span>Blogs & Exam Guides</span>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === 'blogs' ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}>
                    {blogs.length}
                  </span>
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-6 border-t border-neutral-800/80 space-y-2.5 mt-6">
          <a
            href="/api/export-leads"
            download
            className="w-full py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Leads (Excel)</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { fetchLeads(); fetchContacts(); fetchGallery(); }}
              className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-bold rounded-xl border border-neutral-800 flex items-center justify-center gap-1.5"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="py-2 px-3 bg-neutral-900 hover:bg-red-950 text-neutral-300 hover:text-red-400 text-xs font-bold rounded-xl border border-neutral-800 flex items-center justify-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
        
        {/* Top Header Metrics Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase">Total Admissions</span>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 mt-2">{totalLeadsCount}</div>
            <span className="text-[11px] text-neutral-400 font-medium">All registered leads</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase">New / Pending</span>
              <div className="p-2 rounded-lg bg-red-50 text-red-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-red-600 mt-2">{newLeadsCount}</div>
            <span className="text-[11px] text-neutral-400 font-medium">Action required</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase">Enrolled Students</span>
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-green-600 mt-2">{enrolledCount}</div>
            <span className="text-[11px] text-neutral-400 font-medium">Batch confirmed</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase">Contact Enquiries</span>
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600 mt-2">{contacts.length}</div>
            <span className="text-[11px] text-neutral-400 font-medium">General inquiries</span>
          </div>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="mt-6 space-y-4">
            
            {/* Search & Filter bar */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search by name, mobile, city, ID..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-bold text-neutral-500">Filter Status:</span>
                {['all', 'New', 'Contacted', 'Enrolled', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      leadStatusFilter === st
                        ? 'bg-neutral-900 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-extrabold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Reg. Date & ID</th>
                      <th className="py-3.5 px-4">Candidate & Father</th>
                      <th className="py-3.5 px-4">Contact Info</th>
                      <th className="py-3.5 px-4">Uploaded Documents</th>
                      <th className="py-3.5 px-4">City/State</th>
                      <th className="py-3.5 px-4">Hostel</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-neutral-400">
                          No admission leads match your criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-neutral-800 block text-[11px]">{lead.id}</span>
                            <span className="text-[10px] text-neutral-400">
                              {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-neutral-900">
                            <div>{lead.fullName}</div>
                            <div className="text-[10px] text-neutral-500 font-normal">S/o: {lead.fatherName || 'N/A'}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <a href={`tel:${lead.mobile}`} className="font-bold text-red-600 hover:underline block">
                              {lead.mobile}
                            </a>
                            {lead.email && <div className="text-[10px] text-neutral-500 truncate max-w-35">{lead.email}</div>}
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-neutral-800">
                            <div className="flex flex-wrap gap-1">
                              {lead.marksheet10thUrl && (
                                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200/60">
                                  10th
                                </span>
                              )}
                              {lead.marksheet12thUrl && (
                                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-200/60">
                                  12th
                                </span>
                              )}
                              {lead.aadharUrl && (
                                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px] border border-purple-200/60">
                                  Aadhar
                                </span>
                              )}
                              {!lead.marksheet10thUrl && !lead.marksheet12thUrl && !lead.aadharUrl && (
                                <span className="text-[10px] text-neutral-400">No docs</span>
                              )}
                            </div>
                            <div className="text-[10px] text-neutral-500 mt-1">{lead.qualification}</div>
                          </td>

                          <td className="py-3.5 px-4 text-neutral-600">
                            {lead.city}, {lead.state}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.hostelRequired === 'Yes'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {lead.hostelRequired === 'Yes' ? 'Yes (Hostel)' : 'No'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as AdmissionLead['status'])}
                              className={`px-2 py-1 rounded text-[11px] font-bold border ${
                                lead.status === 'New'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : lead.status === 'Contacted'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : lead.status === 'Enrolled'
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 text-neutral-500 hover:text-neutral-900 bg-neutral-100 rounded-lg hover:bg-neutral-200"
                              title="View Full Application"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <a
                              href={`https://wa.me/91${lead.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.fullName)},%20this%20is%20from%20SK%20Fire%20Agency%20regarding%20your%20admission%20form.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-green-600 hover:text-green-700 bg-green-50 rounded-lg hover:bg-green-100 inline-block"
                              title="WhatsApp Student"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 text-neutral-400 hover:text-red-600 bg-neutral-100 rounded-lg hover:bg-red-50"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === 'contacts' && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-extrabold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Sender Name</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Message</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-neutral-400">
                        No contact enquiries received yet.
                      </td>
                    </tr>
                  ) : (
                    contacts.map((c) => (
                      <tr key={c.id} className="hover:bg-neutral-50">
                        <td className="py-3.5 px-4 text-neutral-400 text-[10px]">
                          {new Date(c.createdAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-neutral-900">{c.name}</td>
                        <td className="py-3.5 px-4">
                          <a href={`tel:${c.phone}`} className="font-bold text-red-600 hover:underline block">{c.phone}</a>
                          {c.email && <span className="text-[10px] text-neutral-500">{c.email}</span>}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-neutral-800">{c.subject}</td>
                        <td className="py-3.5 px-4 text-neutral-600 max-w-xs">{c.message}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 bg-neutral-100 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COURSES OVERVIEW & MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="mt-6 space-y-6">
            {/* Header & Controls */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="Search course title, category or eligibility..."
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <select
                  value={courseCategoryFilter}
                  onChange={(e) => setCourseCategoryFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="fireman">Fireman (6 Months)</option>
                  <option value="fire-guard">Fire Guard</option>
                  <option value="operator">Pump Operator</option>
                  <option value="diploma">Safety Diploma</option>
                  <option value="physical">Physical Ground Training</option>
                  <option value="special">Specialized Rescue</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={fetchCourses}
                  className="p-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors"
                  title="Reload courses"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCourseForm(initialCourseForm);
                    setIsAddingCourse(true);
                  }}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((c) => {
                  const matchCat = courseCategoryFilter === 'all' || c.category === courseCategoryFilter;
                  const matchSearch =
                    (c.title || '').toLowerCase().includes(courseSearch.toLowerCase()) ||
                    (c.hindiTitle || '').toLowerCase().includes(courseSearch.toLowerCase()) ||
                    (c.eligibility || '').toLowerCase().includes(courseSearch.toLowerCase()) ||
                    (c.shortDescription || '').toLowerCase().includes(courseSearch.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map((course) => (
                  <div key={course.id || course.slug} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-black text-red-600 bg-red-50 border border-red-200/60 px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                          {course.category}
                        </span>
                        <span className="text-xs font-black text-neutral-900 bg-neutral-100 px-2.5 py-0.5 rounded-lg">{course.fees || 'Contact for Fees'}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-black text-base text-neutral-900 leading-snug">{course.title}</h4>
                        {course.hindiTitle && (
                          <p className="text-xs font-bold text-amber-700 mt-0.5">{course.hindiTitle}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 font-medium text-neutral-600">
                        <div>
                          <span className="text-[10px] text-neutral-400 block font-bold">Duration</span>
                          <span className="font-bold text-neutral-800">{course.duration}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-neutral-400 block font-bold">Training Mode</span>
                          <span className="font-bold text-neutral-800">{course.mode}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[10px] text-neutral-400 block font-bold">Eligibility</span>
                          <span className="font-bold text-neutral-800">{course.eligibility}</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">{course.shortDescription}</p>
                      
                      <div className="flex items-center justify-between text-[11px] font-bold text-neutral-500 pt-1">
                        <span>Seats Available:</span>
                        <span className="text-emerald-700 font-extrabold">{course.availableSeats} / {course.totalSeats}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <Link href={`/courses/${course.slug}`} target="_blank" className="text-xs text-red-600 font-black hover:underline flex items-center gap-1">
                        <span>View Live Page</span>
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingCourse(course)}
                          className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Edit Course Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px]">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id || course.slug)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="Delete Course"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: RECRUITMENTS OVERVIEW & MANAGEMENT */}
        {activeTab === 'recruitments' && (
          <div className="mt-6 space-y-6">
            {/* Header & Controls */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={recruitmentSearch}
                    onChange={(e) => setRecruitmentSearch(e.target.value)}
                    placeholder="Search department, state or post title..."
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <select
                  value={recruitmentStateFilter}
                  onChange={(e) => setRecruitmentStateFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="all">All States & Central</option>
                  <option value="All India">All India / Central</option>
                  <option value="Delhi">Delhi (DFS)</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={fetchRecruitments}
                  className="p-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors"
                  title="Reload recruitment notices"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setRecruitmentForm(initialRecruitmentForm);
                    setIsAddingRecruitment(true);
                  }}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Recruitment Notice</span>
                </button>
              </div>
            </div>

            {/* Recruitment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recruitments
                .filter((r) => {
                  const matchState = recruitmentStateFilter === 'all' || r.state === recruitmentStateFilter || (r.state || '').includes(recruitmentStateFilter);
                  const matchSearch =
                    (r.title || '').toLowerCase().includes(recruitmentSearch.toLowerCase()) ||
                    (r.department || '').toLowerCase().includes(recruitmentSearch.toLowerCase()) ||
                    (r.eligibility || '').toLowerCase().includes(recruitmentSearch.toLowerCase()) ||
                    (r.brief || '').toLowerCase().includes(recruitmentSearch.toLowerCase());
                  return matchState && matchSearch;
                })
                .map((rec) => (
                  <div key={rec.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-lg">
                          📍 {rec.state}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            rec.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                            rec.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-700'
                          }`}>
                            {rec.status}
                          </span>
                          <span className="text-xs font-black text-green-700 bg-green-50 border border-green-200/80 px-2.5 py-0.5 rounded-lg">
                            {rec.totalPosts} Posts
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-neutral-900 leading-snug">{rec.title}</h4>
                        <p className="text-xs font-bold text-neutral-500 mt-0.5">🏢 {rec.department}</p>
                      </div>

                      <div className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1.5">
                        <p><strong>Eligibility:</strong> {rec.eligibility}</p>
                        <p><strong>Age Limit:</strong> {rec.ageLimit}</p>
                        <p><strong>Pay Scale:</strong> {rec.salary}</p>
                        <p><strong>Last Date:</strong> <span className="text-red-600 font-black">{rec.lastDate}</span></p>
                      </div>

                      {rec.brief && (
                        <p className="text-xs text-neutral-500 line-clamp-2">{rec.brief}</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {rec.applyUrl && (
                          <a href={rec.applyUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1">
                            <span>Apply Link</span>
                            <LinkIcon className="w-3 h-3" />
                          </a>
                        )}
                        {rec.notificationUrl && (
                          <a href={rec.notificationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-neutral-600 font-bold hover:underline flex items-center gap-1">
                            <span>PDF Notice</span>
                            <Download className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingRecruitment(rec)}
                          className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Edit Recruitment Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px]">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteRecruitment(rec.id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 5: BLOGS & EXAM GUIDES MANAGEMENT */}
        {activeTab === 'blogs' && (
          <div className="mt-6 space-y-6">
            {/* Header & Controls */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                    placeholder="Search articles, syllabus, pattern..."
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <select
                  value={blogCategoryFilter}
                  onChange={(e) => setBlogCategoryFilter(e.target.value)}
                  className="w-full sm:w-48 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Guide">Guide</option>
                  <option value="Exam Pattern">Exam Pattern</option>
                  <option value="Physical">Physical Standards</option>
                  <option value="Salary">Salary & Perks</option>
                  <option value="Syllabus">Syllabus & Books</option>
                  <option value="Results">Cut Off & Results</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={fetchBlogs}
                  className="p-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl transition-colors"
                  title="Reload blog posts"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setBlogForm(initialBlogForm);
                    setIsAddingBlog(true);
                  }}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Article / Guide</span>
                </button>
              </div>
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs
                .filter((b) => {
                  const matchCat = blogCategoryFilter === 'all' || b.category === blogCategoryFilter;
                  const matchSearch =
                    (b.title || '').toLowerCase().includes(blogSearch.toLowerCase()) ||
                    (b.excerpt || '').toLowerCase().includes(blogSearch.toLowerCase()) ||
                    (b.content || '').toLowerCase().includes(blogSearch.toLowerCase()) ||
                    (b.tags || []).some(t => t.toLowerCase().includes(blogSearch.toLowerCase()));
                  return matchCat && matchSearch;
                })
                .map((b) => (
                  <div key={b.id || b.slug} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-black text-red-600 bg-red-50 border border-red-200/60 px-2.5 py-0.5 rounded-lg">
                          {b.category}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-400">
                          ⏱️ {b.readTime}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-sm text-neutral-900 line-clamp-2 leading-snug">{b.title}</h4>
                      
                      <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">{b.excerpt}</p>

                      {b.tags && b.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {b.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-[10px] font-medium bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-neutral-400 font-medium">📅 {b.publishedAt}</span>

                      <div className="flex items-center gap-1.5">
                        <Link href={`/blog/${b.slug}`} target="_blank" className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1" title="Read Live Article">
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setEditingBlog(b)}
                          className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b.id || b.slug)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY & SELECTIONS MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="mt-6 space-y-6">
            
            {/* Header & Controls */}
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    placeholder="Search candidate name, post or title..."
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <select
                  value={galleryCategoryFilter}
                  onChange={(e) => setGalleryCategoryFilter(e.target.value)}
                  className="w-full sm:w-56 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-800 focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="all">All Categories & Selections</option>
                  <option value="govt_selection">🏛️ Govt. Selections</option>
                  <option value="private_selection">🏢 Private Selections</option>
                  <option value="ground">Physical Ground (400m Track)</option>
                  <option value="classroom">Classroom & Theory</option>
                  <option value="drills">Live Fire Drills</option>
                  <option value="hostel">Hostel & Campus</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddingPhoto(true)}
                className="w-full md:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Photo / Candidate Selection</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {galleryItems
                .filter(item => {
                  const matchesCategory =
                    galleryCategoryFilter === 'all' ||
                    item.category === galleryCategoryFilter ||
                    (galleryCategoryFilter === 'govt_selection' && item.section === 'govt') ||
                    (galleryCategoryFilter === 'private_selection' && item.section === 'private');

                  const matchesSearch =
                    (item.title || '').toLowerCase().includes(gallerySearch.toLowerCase()) ||
                    (item.candidateName || '').toLowerCase().includes(gallerySearch.toLowerCase()) ||
                    (item.postOrCompany || '').toLowerCase().includes(gallerySearch.toLowerCase()) ||
                    (item.description || '').toLowerCase().includes(gallerySearch.toLowerCase());

                  return matchesCategory && matchesSearch;
                })
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-4/3 bg-neutral-900 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm ${
                        item.category === 'govt_selection' || item.section === 'govt'
                          ? 'bg-red-600 text-white'
                          : item.category === 'private_selection' || item.section === 'private'
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-900/80 backdrop-blur-sm text-white'
                      }`}>
                        {item.category === 'govt_selection' ? '🏛️ Govt. Selection' : item.category === 'private_selection' ? '🏢 Private Placement' : item.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="font-extrabold text-xs text-neutral-900 line-clamp-2">{item.title}</h4>

                      {item.candidateName && (
                        <div className="text-[11px] bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                          <p className="font-bold text-amber-700">{item.candidateName}</p>
                          {item.postOrCompany && (
                            <p className="text-[10px] text-neutral-500 font-semibold">{item.postOrCompany}</p>
                          )}
                        </div>
                      )}

                      {item.description && (
                        <p className="text-[11px] text-neutral-500 line-clamp-2">{item.description}</p>
                      )}

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-400 font-medium">{item.date}</span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setEditingPhoto(item)}
                            className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-bold flex items-center gap-1"
                            title="Edit Photo Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeletePhoto(item.id)}
                            className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-bold"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        )}

      {/* Campus Tour Video & Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Header Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 flex items-center gap-2">
                  Campus Tour Video & Media Settings
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </h2>
                <p className="text-xs text-neutral-500 font-medium">
                  Update the official YouTube tour video, director desk thumbnail, and admission helpline displayed on the Homepage.
                </p>
              </div>
            </div>

            <button
              onClick={fetchSettings}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors self-start md:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Settings</span>
            </button>
          </div>

          {/* Form & Live Video Player Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Live YouTube Video Player Preview Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-5 sm:p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                  <h3 className="font-extrabold text-sm text-neutral-900 flex items-center gap-2">
                    <Play className="w-4 h-4 text-red-600 fill-red-600" />
                    <span>Live YouTube Player Preview</span>
                  </h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Live Embed
                  </span>
                </div>

                {/* 16:9 Video Embed or Fallback */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-inner flex items-center justify-center">
                  {settings.tourVideoUrl ? (
                    <iframe
                      src={getYouTubeEmbedUrl(settings.tourVideoUrl, false)}
                      title="Campus Tour Live Preview"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="text-center p-4 text-neutral-400 text-xs">
                      Enter a valid YouTube URL to test live player
                    </div>
                  )}
                </div>

                {/* Thumbnail Preview with Direct Change Option */}
                <div className="space-y-2.5 pt-3 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-red-600" />
                      <span>Cover Thumbnail Image</span>
                    </span>

                    {/* Direct Upload Button on Preview Card */}
                    <input
                      type="file"
                      accept="image/*"
                      id="direct-cover-photo-file-input"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="direct-cover-photo-file-input"
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-black text-[11px] rounded-xl cursor-pointer shadow-md flex items-center gap-1.5 transition-all"
                    >
                      {isUploadingThumbnail ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{isUploadingThumbnail ? 'Uploading...' : '📁 Change Cover Photo'}</span>
                    </label>
                  </div>

                  {/* Interactive Thumbnail Box with Hover Action */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-md group">
                    <img
                      src={settings.tourVideoThumbnail || '/images/director-campus-tour.jpg'}
                      alt="Current Video Cover"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Hover Overlay */}
                    <label
                      htmlFor="direct-cover-photo-file-input"
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-black text-white bg-black/60 px-3 py-1 rounded-full border border-white/20">
                        Click to Choose New Photo
                      </span>
                    </label>

                    {/* Bottom Status Tag */}
                    <span className="absolute bottom-2 left-2 bg-neutral-950/85 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md border border-neutral-800 pointer-events-none">
                      Active Cover Photo
                    </span>
                  </div>

                  {/* URL path indicator */}
                  <div className="text-[10px] text-neutral-400 font-mono truncate px-1">
                    Path: {settings.tourVideoThumbnail || '/images/director-campus-tour.jpg'}
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Configuration Form (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
                
                <div className="border-b border-neutral-100 pb-3">
                  <h3 className="text-base font-black text-neutral-900">
                    Edit Video Details & Links
                  </h3>
                  <p className="text-xs text-neutral-400">Changes save instantly to the database and update on the live website.</p>
                </div>

                {/* YouTube Video URL */}
                <div>
                  <label className="block mb-1.5 text-xs font-black text-neutral-900 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-red-600" />
                    <span>Real YouTube Video URL *</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={settings.tourVideoUrl}
                    onChange={(e) => setSettings({ ...settings, tourVideoUrl: e.target.value })}
                    placeholder="e.g., https://www.youtube.com/watch?v=kYJzX2N8E8s or https://youtu.be/..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-bold text-neutral-900 transition-all font-mono"
                  />
                  <p className="mt-1.5 text-[11px] text-neutral-500 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Supports standard watch URLs, short links (`youtu.be`), and YouTube Shorts.
                  </p>
                </div>

                {/* Video Heading & Subtitle Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-xs font-black text-neutral-900">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.tourVideoHeading}
                      onChange={(e) => setSettings({ ...settings, tourVideoHeading: e.target.value })}
                      placeholder="e.g., WATCH LIVE CAMPUS TOUR"
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-bold text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block mb-1.5 text-xs font-black text-neutral-900">
                      Admission Helpline Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.tourVideoHelpline}
                      onChange={(e) => setSettings({ ...settings, tourVideoHelpline: e.target.value })}
                      placeholder="e.g., +91 96805 05554"
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-bold text-neutral-900"
                    />
                  </div>
                </div>

                {/* Video Modal Title */}
                <div>
                  <label className="block mb-1.5 text-xs font-black text-neutral-900">
                    Video Modal Player Title
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.tourVideoTitle}
                    onChange={(e) => setSettings({ ...settings, tourVideoTitle: e.target.value })}
                    placeholder="e.g., Watch Live Campus Tour - Shri Krishna Fire & Safety Academy"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900"
                  />
                </div>

                {/* Thumbnail Image Management */}
                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <label className="block text-xs font-black text-neutral-900">
                    Video Cover Thumbnail Image
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      id="tour-thumbnail-file-input"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="tour-thumbnail-file-input"
                      className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm flex items-center justify-center gap-2 transition-colors shrink-0"
                    >
                      {isUploadingThumbnail ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>{isUploadingThumbnail ? 'Uploading Image...' : '📁 Upload New Thumbnail'}</span>
                    </label>

                    <input
                      type="text"
                      value={settings.tourVideoThumbnail}
                      onChange={(e) => setSettings({ ...settings, tourVideoThumbnail: e.target.value })}
                      placeholder="/images/director-campus-tour.jpg or https://..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSavingSettings || isUploadingThumbnail}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    {isSavingSettings ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Settings...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Save & Publish Video Settings</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      )}
      {isAddingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden relative max-h-[92vh] flex flex-col animate-in zoom-in-95">
            {/* Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600/90 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    Add New Gallery Photo & Selection
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-medium">Upload candidate photos, campus drills, and achievements</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAddingPhoto(false);
                  setShowManualUrl(false);
                }}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleCreatePhoto} className="p-6 overflow-y-auto space-y-5 text-xs font-bold text-neutral-700 flex-1">
              
              {/* Photo Upload & Preview Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    Upload Photo Image *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] text-red-600 hover:text-red-700 font-bold flex items-center gap-1 hover:underline"
                  >
                    <LinkIcon className="w-3 h-3" />
                    {showManualUrl ? 'Hide manual URL input' : 'Paste Image URL instead'}
                  </button>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  id="add-photo-file-input"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />

                {/* If Image is Uploaded/Present -> Show High-Quality Uncropped Preview */}
                {photoForm.imageUrl ? (
                  <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-3 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] max-h-[340px] shadow-inner group">
                    <img
                      src={photoForm.imageUrl}
                      alt="Selected Photo Preview"
                      className="max-h-[260px] w-auto h-auto object-contain rounded-xl shadow-2xl transition-transform"
                    />
                    
                    {/* Top Status & Action Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-black backdrop-blur-md shadow-lg pointer-events-auto">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Photo Ready
                      </span>
                      <div className="flex items-center gap-2 pointer-events-auto">
                        <label
                          htmlFor="add-photo-file-input"
                          className="px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-white text-[11px] font-bold rounded-xl cursor-pointer shadow-md border border-neutral-700 backdrop-blur-md flex items-center gap-1.5 transition-all"
                        >
                          <Upload className="w-3.5 h-3.5 text-red-400" />
                          Change Photo
                        </label>
                        <button
                          type="button"
                          onClick={() => setPhotoForm({ ...photoForm, imageUrl: '' })}
                          className="p-1.5 bg-red-600/90 hover:bg-red-700 text-white rounded-xl shadow-md backdrop-blur-md transition-all"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom File Path Pill */}
                    <div className="absolute bottom-2 left-3 right-3 text-center pointer-events-none">
                      <span className="inline-block px-3 py-0.5 bg-neutral-900/80 backdrop-blur-md rounded-md text-[10px] text-neutral-300 font-mono max-w-full truncate border border-neutral-800">
                        {photoForm.imageUrl}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Drag & Drop Upload Zone when No Photo Selected */
                  <label
                    htmlFor="add-photo-file-input"
                    className="border-2 border-dashed border-neutral-300 hover:border-red-500 rounded-2xl p-6 text-center bg-neutral-50/70 hover:bg-red-50/30 transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-red-100 group-hover:bg-red-600 text-red-600 group-hover:text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105">
                      {isUploadingPhoto ? (
                        <Loader2 className="w-7 h-7 animate-spin text-red-600" />
                      ) : (
                        <Upload className="w-7 h-7" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-neutral-900 group-hover:text-red-600 transition-colors">
                        {isUploadingPhoto ? 'Uploading to Server...' : '📁 Click to Choose Photo from Computer / Phone'}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-semibold mt-1">
                        High resolution JPG, PNG, WEBP, or GIF supported
                      </p>
                    </div>
                    <span className="px-4 py-1.5 bg-neutral-900 group-hover:bg-red-600 text-white text-[11px] font-black rounded-xl shadow-sm transition-colors">
                      Browse Local Files
                    </span>
                  </label>
                )}

                {/* Manual URL Input (Collapsible or if active) */}
                {showManualUrl && (
                  <div className="pt-2 animate-in fade-in">
                    <label className="block text-[11px] text-neutral-500 font-bold mb-1">
                      Direct Photo Web URL / Path:
                    </label>
                    <input
                      type="text"
                      required
                      value={photoForm.imageUrl}
                      onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                      placeholder="https://... or /uploads/..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Title & Caption */}
              <div>
                <label className="block mb-1.5 text-xs font-black text-neutral-900">
                  Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g., Selected as Fireman in Delhi Fire Service / Live Rescue Drill"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900 transition-all"
                />
              </div>

              {/* Category & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block mb-1.5 text-xs font-black text-neutral-900 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-red-600" />
                    Category *
                  </label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const sec = cat === 'govt_selection' ? 'govt' : cat === 'private_selection' ? 'private' : 'training';
                      setPhotoForm({ ...photoForm, category: cat, section: sec });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-bold text-neutral-900 transition-all cursor-pointer"
                  >
                    <option value="govt_selection">🏛️ Govt. Selection (Sarkari Bharti)</option>
                    <option value="private_selection">🏢 Private Selection (Corporate Placement)</option>
                    <option value="ground">🏃 Physical Ground (400m Track & Drills)</option>
                    <option value="classroom">📚 Classroom & Theory Session</option>
                    <option value="drills">🔥 Live Fire Drills & Hose Training</option>
                    <option value="celebration">🏆 Result & Certificate Celebration</option>
                    <option value="hostel">🏢 Hostel & Campus Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-black text-neutral-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    Date / Batch
                  </label>
                  <input
                    type="text"
                    value={photoForm.date}
                    onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                    placeholder="e.g., September 2026 or 15/09/2026"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900 transition-all"
                  />
                </div>
              </div>

              {/* Candidate Selection Details (Highlighted Card) */}
              <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-950 font-black text-xs">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Candidate & Placement Details (Optional for selections)</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-700" />
                      Candidate Full Name
                    </label>
                    <input
                      type="text"
                      value={photoForm.candidateName}
                      onChange={(e) => setPhotoForm({ ...photoForm, candidateName: e.target.value })}
                      placeholder="e.g. Himanshu Yadav"
                      className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-medium text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amber-700" />
                      Post / Department / Company
                    </label>
                    <input
                      type="text"
                      value={photoForm.postOrCompany}
                      onChange={(e) => setPhotoForm({ ...photoForm, postOrCompany: e.target.value })}
                      placeholder="e.g. Delhi Fire Service (Rank 14)"
                      className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-medium text-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Description / Extra Info */}
              <div>
                <label className="block mb-1.5 text-xs font-black text-neutral-900">
                  Description / Achievement Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  placeholder="Brief story, rank information, or drill workout notes..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900 resize-none transition-all"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingPhoto(false);
                    setShowManualUrl(false);
                  }}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPhoto || isUploadingPhoto || !photoForm.imageUrl}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isSavingPhoto ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving & Publishing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Save & Publish Photo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden relative max-h-[92vh] flex flex-col animate-in zoom-in-95">
            {/* Header */}
            <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600/90 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    Edit Photo Details
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-800 text-red-400 rounded-md font-bold">
                      ID: {editingPhoto.id}
                    </span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-medium">Update candidate information, category, or replace photo</p>
                </div>
              </div>
              <button
                onClick={() => setEditingPhoto(null)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleUpdatePhoto} className="p-6 overflow-y-auto space-y-5 text-xs font-bold text-neutral-700 flex-1">
              
              {/* Photo Preview & Replace */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-neutral-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-red-600" />
                    Current Photo Preview & File *
                  </label>
                  <label
                    htmlFor="edit-photo-file-input"
                    className="text-[11px] text-red-600 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <Upload className="w-3 h-3" />
                    Replace Image File
                  </label>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="edit-photo-file-input"
                  onChange={(e) => handleFileUpload(e, true)}
                  className="hidden"
                />

                {editingPhoto.imageUrl && (
                  <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-3 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] max-h-[340px] shadow-inner group">
                    <img
                      src={editingPhoto.imageUrl}
                      alt="Current Photo Preview"
                      className="max-h-[260px] w-auto h-auto object-contain rounded-xl shadow-2xl transition-transform"
                    />

                    {/* Top Overlay Actions */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-black backdrop-blur-md shadow-lg pointer-events-auto">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Current Photo
                      </span>
                      <label
                        htmlFor="edit-photo-file-input"
                        className="px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-white text-[11px] font-bold rounded-xl cursor-pointer shadow-md border border-neutral-700 backdrop-blur-md flex items-center gap-1.5 transition-all pointer-events-auto"
                      >
                        <Upload className="w-3.5 h-3.5 text-red-400" />
                        {isUploadingPhoto ? 'Uploading...' : 'Replace Photo'}
                      </label>
                    </div>

                    {/* Bottom URL Pill */}
                    <div className="absolute bottom-2 left-3 right-3 text-center pointer-events-none">
                      <span className="inline-block px-3 py-0.5 bg-neutral-900/80 backdrop-blur-md rounded-md text-[10px] text-neutral-300 font-mono max-w-full truncate border border-neutral-800">
                        {editingPhoto.imageUrl}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Title / Caption */}
              <div>
                <label className="block mb-1.5 text-xs font-black text-neutral-900">
                  Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  placeholder="Title or caption"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900 transition-all"
                />
              </div>

              {/* Category & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block mb-1.5 text-xs font-black text-neutral-900 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-red-600" />
                    Category *
                  </label>
                  <select
                    value={editingPhoto.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const sec = cat === 'govt_selection' ? 'govt' : cat === 'private_selection' ? 'private' : 'training';
                      setEditingPhoto({ ...editingPhoto, category: cat, section: sec as any });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-bold text-neutral-900 transition-all cursor-pointer"
                  >
                    <option value="govt_selection">🏛️ Govt. Selection (Sarkari Bharti)</option>
                    <option value="private_selection">🏢 Private Selection (Corporate Placement)</option>
                    <option value="ground">🏃 Physical Ground (400m Track & Drills)</option>
                    <option value="classroom">📚 Classroom & Theory Session</option>
                    <option value="drills">🔥 Live Fire Drills & Hose Training</option>
                    <option value="celebration">🏆 Result & Certificate Celebration</option>
                    <option value="hostel">🏢 Hostel & Campus Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-black text-neutral-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-red-600" />
                    Date / Batch
                  </label>
                  <input
                    type="text"
                    value={editingPhoto.date || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                    placeholder="e.g., September 2026"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900 transition-all"
                  />
                </div>
              </div>

              {/* Candidate Selection Details (Highlighted Card) */}
              <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-950 font-black text-xs">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Candidate & Placement Details</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-700" />
                      Candidate Full Name
                    </label>
                    <input
                      type="text"
                      value={editingPhoto.candidateName || ''}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, candidateName: e.target.value })}
                      placeholder="e.g. Vikram Singh"
                      className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-medium text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-amber-900 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-amber-700" />
                      Post / Department / Company
                    </label>
                    <input
                      type="text"
                      value={editingPhoto.postOrCompany || ''}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, postOrCompany: e.target.value })}
                      placeholder="e.g. Delhi Fire Service (Rank 14)"
                      className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none text-xs font-medium text-neutral-900"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1.5 text-xs font-black text-neutral-900">
                  Description / Achievement Notes
                </label>
                <textarea
                  rows={2}
                  value={editingPhoto.description || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                  placeholder="Brief notes..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white focus:outline-none text-xs font-medium text-neutral-900 resize-none transition-all"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPhoto || isUploadingPhoto}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isSavingPhoto ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Update Photo Details</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT COURSE */}
      {(isAddingCourse || editingCourse) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-red-600 uppercase">
                  {editingCourse ? 'Edit Course Record' : 'Create New Course'}
                </span>
                <h3 className="text-xl font-black text-neutral-900">
                  {editingCourse ? editingCourse.title : 'Add Course to Catalog'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddingCourse(false);
                  setEditingCourse(null);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Course Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse ? editingCourse.title : courseForm.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, title: val });
                      else setCourseForm({ ...courseForm, title: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') });
                    }}
                    placeholder="e.g. Fireman Government Recruitment Batch"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Hindi Title (Optional)</label>
                  <input
                    type="text"
                    value={editingCourse ? (editingCourse.hindiTitle || '') : (courseForm.hindiTitle || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, hindiTitle: val });
                      else setCourseForm({ ...courseForm, hindiTitle: val });
                    }}
                    placeholder="e.g. फायरमैन सरकारी भर्ती स्पेशल बैच"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">URL Slug / Identifier *</label>
                  <input
                    type="text"
                    required
                    value={editingCourse ? editingCourse.slug : courseForm.slug}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, slug: val });
                      else setCourseForm({ ...courseForm, slug: val });
                    }}
                    placeholder="e.g. fireman-course"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white text-xs font-mono text-neutral-800"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Category *</label>
                  <select
                    value={editingCourse ? editingCourse.category : courseForm.category}
                    onChange={(e) => {
                      const val = e.target.value as Course['category'];
                      if (editingCourse) setEditingCourse({ ...editingCourse, category: val });
                      else setCourseForm({ ...courseForm, category: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 text-xs font-bold text-neutral-900"
                  >
                    <option value="fireman">Fireman (6 Months)</option>
                    <option value="fire-guard">Fire Guard</option>
                    <option value="operator">Pump Operator</option>
                    <option value="diploma">Safety Diploma</option>
                    <option value="physical">Physical Ground Training</option>
                    <option value="special">Specialized Rescue</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Course Fees / Fee Structure</label>
                  <input
                    type="text"
                    value={editingCourse ? (editingCourse.fees || '') : (courseForm.fees || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, fees: val });
                      else setCourseForm({ ...courseForm, fees: val });
                    }}
                    placeholder="e.g. ₹18,500 or ₹24,000 (Installment Available)"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Duration</label>
                  <input
                    type="text"
                    value={editingCourse ? editingCourse.duration : courseForm.duration}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, duration: val });
                      else setCourseForm({ ...courseForm, duration: val });
                    }}
                    placeholder="e.g. 6 Months (Theory + Ground)"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Training Mode</label>
                  <select
                    value={editingCourse ? editingCourse.mode : courseForm.mode}
                    onChange={(e) => {
                      const val = e.target.value as Course['mode'];
                      if (editingCourse) setEditingCourse({ ...editingCourse, mode: val });
                      else setCourseForm({ ...courseForm, mode: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  >
                    <option value="Offline + Ground">Offline + Ground</option>
                    <option value="Offline">Offline</option>
                    <option value="Online + Ground">Online + Ground</option>
                    <option value="Physical Only">Physical Only</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={editingCourse ? editingCourse.eligibility : courseForm.eligibility}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, eligibility: val });
                      else setCourseForm({ ...courseForm, eligibility: val });
                    }}
                    placeholder="e.g. 10th / 12th Pass (Any Recognized Board)"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Badge / Tag (Optional)</label>
                  <input
                    type="text"
                    value={editingCourse ? (editingCourse.badge || '') : (courseForm.badge || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, badge: val });
                      else setCourseForm({ ...courseForm, badge: val });
                    }}
                    placeholder="e.g. Most Popular, 100% Placement"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Total Seats</label>
                  <input
                    type="number"
                    value={editingCourse ? editingCourse.totalSeats : courseForm.totalSeats}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      if (editingCourse) setEditingCourse({ ...editingCourse, totalSeats: val });
                      else setCourseForm({ ...courseForm, totalSeats: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Available Seats</label>
                  <input
                    type="number"
                    value={editingCourse ? editingCourse.availableSeats : courseForm.availableSeats}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      if (editingCourse) setEditingCourse({ ...editingCourse, availableSeats: val });
                      else setCourseForm({ ...courseForm, availableSeats: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Short Summary Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingCourse ? editingCourse.shortDescription : courseForm.shortDescription}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, shortDescription: val });
                      else setCourseForm({ ...courseForm, shortDescription: val });
                    }}
                    placeholder="Brief 2-line summary shown on cards..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Full Course Description & Overview</label>
                  <textarea
                    rows={3}
                    value={editingCourse ? editingCourse.description : courseForm.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingCourse) setEditingCourse({ ...editingCourse, description: val });
                      else setCourseForm({ ...courseForm, description: val });
                    }}
                    placeholder="Detailed curriculum overview..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingCourse(false);
                    setEditingCourse(null);
                  }}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingCourse}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isSavingCourse ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Course...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingCourse ? 'Save Changes' : 'Publish Course'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT RECRUITMENT NOTICE */}
      {(isAddingRecruitment || editingRecruitment) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-red-600 uppercase">
                  {editingRecruitment ? 'Edit Recruitment Notice' : 'New Job / Recruitment Alert'}
                </span>
                <h3 className="text-xl font-black text-neutral-900">
                  {editingRecruitment ? editingRecruitment.title : 'Publish Recruitment Notice'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddingRecruitment(false);
                  setEditingRecruitment(null);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecruitment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Recruitment Notice Title *</label>
                  <input
                    type="text"
                    required
                    value={editingRecruitment ? editingRecruitment.title : recruitmentForm.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, title: val });
                      else setRecruitmentForm({ ...recruitmentForm, title: val });
                    }}
                    placeholder="e.g. Delhi Fire Service (DFS) Fireman 1200+ Posts Recruitment 2025"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Department / Organization *</label>
                  <input
                    type="text"
                    required
                    value={editingRecruitment ? editingRecruitment.department : recruitmentForm.department}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, department: val });
                      else setRecruitmentForm({ ...recruitmentForm, department: val });
                    }}
                    placeholder="e.g. DSSSB / Delhi Fire Service"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">State / Region *</label>
                  <input
                    type="text"
                    required
                    value={editingRecruitment ? editingRecruitment.state : recruitmentForm.state}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, state: val });
                      else setRecruitmentForm({ ...recruitmentForm, state: val });
                    }}
                    placeholder="e.g. Delhi, Rajasthan, All India"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Total Vacancy Posts</label>
                  <input
                    type="number"
                    value={editingRecruitment ? editingRecruitment.totalPosts : recruitmentForm.totalPosts}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, totalPosts: val });
                      else setRecruitmentForm({ ...recruitmentForm, totalPosts: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Notice Status</label>
                  <select
                    value={editingRecruitment ? editingRecruitment.status : recruitmentForm.status}
                    onChange={(e) => {
                      const val = e.target.value as RecruitmentNotice['status'];
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, status: val });
                      else setRecruitmentForm({ ...recruitmentForm, status: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  >
                    <option value="Active">🟢 Active (Form Open)</option>
                    <option value="Upcoming">🟡 Upcoming (Notification Out)</option>
                    <option value="Closed">🔴 Closed / Expired</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Salary / Pay Scale</label>
                  <input
                    type="text"
                    value={editingRecruitment ? editingRecruitment.salary : recruitmentForm.salary}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, salary: val });
                      else setRecruitmentForm({ ...recruitmentForm, salary: val });
                    }}
                    placeholder="e.g. Level-3 (₹21,700 - ₹69,100)"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Age Limit</label>
                  <input
                    type="text"
                    value={editingRecruitment ? editingRecruitment.ageLimit : recruitmentForm.ageLimit}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, ageLimit: val });
                      else setRecruitmentForm({ ...recruitmentForm, ageLimit: val });
                    }}
                    placeholder="e.g. 18 - 27 Years"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Application Start Date</label>
                  <input
                    type="text"
                    value={editingRecruitment ? editingRecruitment.applicationStartDate : recruitmentForm.applicationStartDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, applicationStartDate: val });
                      else setRecruitmentForm({ ...recruitmentForm, applicationStartDate: val });
                    }}
                    placeholder="e.g. 15 Jan 2025"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Last Date to Apply *</label>
                  <input
                    type="text"
                    required
                    value={editingRecruitment ? editingRecruitment.lastDate : recruitmentForm.lastDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, lastDate: val });
                      else setRecruitmentForm({ ...recruitmentForm, lastDate: val });
                    }}
                    placeholder="e.g. 28 Feb 2025"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-red-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Eligibility Details</label>
                  <input
                    type="text"
                    value={editingRecruitment ? editingRecruitment.eligibility : recruitmentForm.eligibility}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, eligibility: val });
                      else setRecruitmentForm({ ...recruitmentForm, eligibility: val });
                    }}
                    placeholder="e.g. 10th / 12th Pass with Fire Operator / Fireman Training Certificate"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Official Apply Online Link</label>
                  <input
                    type="url"
                    value={editingRecruitment ? (editingRecruitment.applyUrl || '') : (recruitmentForm.applyUrl || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, applyUrl: val });
                      else setRecruitmentForm({ ...recruitmentForm, applyUrl: val });
                    }}
                    placeholder="https://dsssb.delhi.gov.in"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-800"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Official Notification PDF Link</label>
                  <input
                    type="url"
                    value={editingRecruitment ? (editingRecruitment.notificationUrl || '') : (recruitmentForm.notificationUrl || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, notificationUrl: val });
                      else setRecruitmentForm({ ...recruitmentForm, notificationUrl: val });
                    }}
                    placeholder="https://example.com/notification.pdf"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Brief Overview & Highlights</label>
                  <textarea
                    rows={2}
                    value={editingRecruitment ? editingRecruitment.brief : recruitmentForm.brief}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingRecruitment) setEditingRecruitment({ ...editingRecruitment, brief: val });
                      else setRecruitmentForm({ ...recruitmentForm, brief: val });
                    }}
                    placeholder="Short brief on vacancies, exam structure or special notes..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingRecruitment(false);
                    setEditingRecruitment(null);
                  }}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingRecruitment}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isSavingRecruitment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Notice...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingRecruitment ? 'Save Changes' : 'Publish Notice'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT BLOG & EXAM GUIDE */}
      {(isAddingBlog || editingBlog) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-red-600 uppercase">
                  {editingBlog ? 'Edit Blog / Exam Guide' : 'Publish New Guide Article'}
                </span>
                <h3 className="text-xl font-black text-neutral-900">
                  {editingBlog ? editingBlog.title : 'New Blog / Exam Guide Post'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddingBlog(false);
                  setEditingBlog(null);
                }}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Article Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog ? editingBlog.title : blogForm.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, title: val });
                      else setBlogForm({ ...blogForm, title: val, slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') });
                    }}
                    placeholder="e.g. Complete Fireman Physical Fitness Test Strategy & Running Guide"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:bg-white text-xs font-bold text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Hindi Title (Optional)</label>
                  <input
                    type="text"
                    value={editingBlog ? (editingBlog.hindiTitle || '') : (blogForm.hindiTitle || '')}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, hindiTitle: val });
                      else setBlogForm({ ...blogForm, hindiTitle: val });
                    }}
                    placeholder="e.g. फायरमैन फिजिकल टेस्ट और रनिंग तैयारी टिप्स"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog ? editingBlog.slug : blogForm.slug}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, slug: val });
                      else setBlogForm({ ...blogForm, slug: val });
                    }}
                    placeholder="e.g. fireman-physical-test-guide"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-800"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Category *</label>
                  <select
                    value={editingBlog ? editingBlog.category : blogForm.category}
                    onChange={(e) => {
                      const val = e.target.value as BlogPost['category'];
                      if (editingBlog) setEditingBlog({ ...editingBlog, category: val });
                      else setBlogForm({ ...blogForm, category: val });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900"
                  >
                    <option value="Guide">Guide</option>
                    <option value="Exam Pattern">Exam Pattern</option>
                    <option value="Physical">Physical Standards</option>
                    <option value="Salary">Salary & Perks</option>
                    <option value="Syllabus">Syllabus & Books</option>
                    <option value="Results">Cut Off & Results</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Author Name</label>
                  <input
                    type="text"
                    value={editingBlog ? editingBlog.author : blogForm.author}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, author: val });
                      else setBlogForm({ ...blogForm, author: val });
                    }}
                    placeholder="e.g. Chief Fire Instructor"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog ? editingBlog.readTime : blogForm.readTime}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, readTime: val });
                      else setBlogForm({ ...blogForm, readTime: val });
                    }}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-xs font-black text-neutral-900">Published Date</label>
                  <input
                    type="text"
                    value={editingBlog ? editingBlog.publishedAt : blogForm.publishedAt}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, publishedAt: val });
                      else setBlogForm({ ...blogForm, publishedAt: val });
                    }}
                    placeholder="e.g. 2026-09-30"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={editingBlog ? editingBlog.tags.join(', ') : blogForm.tags.join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      if (editingBlog) setEditingBlog({ ...editingBlog, tags });
                      else setBlogForm({ ...blogForm, tags });
                    }}
                    placeholder="e.g. Fireman Recruitment, Physical Ground, Delhi DFS"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Short Excerpt / Teaser *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingBlog ? editingBlog.excerpt : blogForm.excerpt}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, excerpt: val });
                      else setBlogForm({ ...blogForm, excerpt: val });
                    }}
                    placeholder="Brief 2-line summary shown on blog cards..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block mb-1 text-xs font-black text-neutral-900">Full Article Content *</label>
                  <textarea
                    rows={5}
                    required
                    value={editingBlog ? editingBlog.content : blogForm.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (editingBlog) setEditingBlog({ ...editingBlog, content: val });
                      else setBlogForm({ ...blogForm, content: val });
                    }}
                    placeholder="Write your full guide / article content here..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingBlog(false);
                    setEditingBlog(null);
                  }}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-extrabold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingBlog}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  {isSavingBlog ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Article...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{editingBlog ? 'Save Changes' : 'Publish Article'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      </main>

      {/* Full Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-red-600">ID: {selectedLead.id}</span>
                <h3 className="text-xl font-black text-neutral-900">Student Admission Profile</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Student Full Name</span>
                <span className="text-sm font-extrabold text-neutral-900">{selectedLead.fullName}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Father’s Name</span>
                <span className="text-sm font-extrabold text-neutral-900">{selectedLead.fatherName || 'N/A'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Primary Calling Mobile</span>
                <a href={`tel:${selectedLead.mobile}`} className="text-sm font-extrabold text-red-600 hover:underline">
                  {selectedLead.mobile}
                </a>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Alternate / Parent Contact</span>
                <span className="text-sm font-extrabold text-neutral-900">{selectedLead.alternateMobile || 'None'}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Date of Birth & Gender</span>
                <span className="font-bold text-neutral-900">{selectedLead.dob} ({selectedLead.gender})</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Educational Qualification</span>
                <span className="font-bold text-neutral-900">{selectedLead.qualification}</span>
              </div>
              <div className="col-span-2 p-3.5 bg-neutral-50 rounded-xl space-y-2 border border-neutral-200/80">
                <span className="text-neutral-500 font-bold block uppercase text-[10px] tracking-wider">Candidate Uploaded Documents (10th, 12th & Aadhar)</span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedLead.marksheet10thUrl ? (
                    <a
                      href={selectedLead.marksheet10thUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-neutral-900 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>View 10th Marksheet</span>
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-400 font-medium bg-neutral-100 px-2.5 py-1 rounded-lg">10th Marksheet: Not Attached</span>
                  )}

                  {selectedLead.marksheet12thUrl ? (
                    <a
                      href={selectedLead.marksheet12thUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-neutral-900 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>View 12th Marksheet</span>
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-400 font-medium bg-neutral-100 px-2.5 py-1 rounded-lg">12th Marksheet: Not Attached</span>
                  )}

                  {selectedLead.aadharUrl ? (
                    <a
                      href={selectedLead.aadharUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-neutral-900 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>View Aadhar Card</span>
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-400 font-medium bg-neutral-100 px-2.5 py-1 rounded-lg">Aadhar Card: Not Attached</span>
                  )}
                </div>
              </div>

              <div className="col-span-2 p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Permanent Address</span>
                <span className="font-semibold text-neutral-800">
                  {selectedLead.address}, {selectedLead.city}, {selectedLead.state}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Hostel Required</span>
                <span className="font-bold text-neutral-900">{selectedLead.hostelRequired}</span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Notes / Query</span>
                <span className="text-neutral-700">{selectedLead.notes || 'None'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/91${selectedLead.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.fullName)},%20this%20is%20from%20SK%20Fire%20Agency%20regarding%20your%20admission.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-green-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
