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
  Menu
} from 'lucide-react';
import { AdmissionLead, ContactEnquiry, Course, RecruitmentNotice, BlogPost, GalleryItem } from '@/types';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_BLOGS, INITIAL_GALLERY } from '@/data/initialData';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default demo authenticated
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'courses' | 'recruitments' | 'blogs' | 'gallery'>('leads');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<AdmissionLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<AdmissionLead | null>(null);

  // Contacts state
  const [contacts, setContacts] = useState<ContactEnquiry[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Content states
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [recruitments, setRecruitments] = useState<RecruitmentNotice[]>(INITIAL_RECRUITMENTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');
  
  // Gallery Modal & Form State
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryItem | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

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

  // Direct File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEditMode = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

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
    } catch (err) {
      console.error(err);
      alert('Photo upload failed');
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
    if (!photoForm.title || !photoForm.imageUrl) {
      alert('Please fill in Title and Image URL');
      return;
    }
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photoForm)
      });
      const data = await res.json();
      if (data.success) {
        alert('Photo added successfully!');
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
        fetchGallery();
      } else {
        alert(data.error || 'Failed to add photo');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to add photo');
    }
  };

  const handleUpdatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPhoto)
      });
      const data = await res.json();
      if (data.success) {
        alert('Photo updated successfully!');
        setEditingPhoto(null);
        fetchGallery();
      } else {
        alert(data.error || 'Failed to update photo');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update photo');
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

  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      try {
        const [lRes, cRes, gRes] = await Promise.all([
          fetch('/api/admission'),
          fetch('/api/contact'),
          fetch('/api/gallery')
        ]);
        const [lData, cData, gData] = await Promise.all([
          lRes.json(),
          cRes.json(),
          gRes.json()
        ]);
        if (isMounted) {
          if (lData.success) setLeads(lData.data);
          if (cData.success) setContacts(cData.data);
          if (gData.success && gData.data) setGalleryItems(gData.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadInitial();
    return () => {
      isMounted = false;
    };
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

  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '1234' || adminPin === 'admin' || adminPin === 'skfire') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Staff PIN (Try: 1234 or skfire)');
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

          <form onSubmit={handlePinLogin} className="space-y-4">
            {pinError && (
              <p className="text-xs text-red-400 font-semibold">{pinError}</p>
            )}
            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full text-center px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm font-bold tracking-widest focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md"
            >
              Access Dashboard
            </button>
          </form>

          <p className="text-[11px] text-neutral-500">
            For demo login, enter PIN: <strong>1234</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col lg:flex-row">
      
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden bg-neutral-950 text-white p-4 flex items-center justify-between border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight">SK Fire Agency</h1>
            <p className="text-[10px] text-neutral-400">Admin Control Center</p>
          </div>
        </div>

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-red-700 to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight text-white">
                  SK Fire Agency
                </h1>
                <p className="text-[10px] font-bold text-neutral-400">Admin Control Portal</p>
              </div>
            </div>

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

        {/* TAB 3: COURSES OVERVIEW */}
        {activeTab === 'courses' && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-neutral-700">{course.fees}</span>
                  </div>
                  <h4 className="font-extrabold text-base text-neutral-900">{course.title}</h4>
                  <p className="text-xs text-neutral-500 line-clamp-2">{course.shortDescription}</p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                    <span>Seats: {course.availableSeats} of {course.totalSeats}</span>
                    <Link href={`/courses/${course.slug}`} className="text-red-600 font-bold hover:underline">
                      View Page
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RECRUITMENTS OVERVIEW */}
        {activeTab === 'recruitments' && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recruitments.map((rec) => (
                <div key={rec.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded">
                      {rec.state}
                    </span>
                    <span className="text-xs font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      {rec.totalPosts} Posts
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-neutral-900">{rec.title}</h4>
                  <div className="text-xs text-neutral-600 space-y-1">
                    <p><strong>Eligibility:</strong> {rec.eligibility}</p>
                    <p><strong>Last Date:</strong> {rec.lastDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BLOGS OVERVIEW */}
        {activeTab === 'blogs' && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <div key={b.id} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm space-y-3">
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded">
                    {b.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-neutral-900 line-clamp-2">{b.title}</h4>
                  <p className="text-xs text-neutral-500 line-clamp-2">{b.excerpt}</p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-400">{b.publishedAt}</span>
                    <Link href={`/blog/${b.slug}`} className="text-red-600 font-bold hover:underline">
                      Read Live
                    </Link>
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

      {/* Add New Photo Modal */}
      {isAddingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-neutral-900">Add New Photo / Candidate Selection</h3>
                <p className="text-xs text-neutral-400">Save photo into Supabase database / local storage</p>
              </div>
              <button
                onClick={() => setIsAddingPhoto(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePhoto} className="space-y-4 text-xs font-bold text-neutral-700">
              <div>
                <label className="block mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  placeholder="e.g. Selected as Fireman in Delhi Fire Service"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Category *</label>
                  <select
                    value={photoForm.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const sec = cat === 'govt_selection' ? 'govt' : cat === 'private_selection' ? 'private' : 'training';
                      setPhotoForm({ ...photoForm, category: cat, section: sec });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    <option value="govt_selection">🏛️ Govt. Selection (Sarkari)</option>
                    <option value="private_selection">🏢 Private Selection (Corporate)</option>
                    <option value="ground">Physical Ground (400m Track)</option>
                    <option value="classroom">Classroom & Theory</option>
                    <option value="drills">Live Fire Drills</option>
                    <option value="celebration">Result Celebration</option>
                    <option value="hostel">Hostel & Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Date</label>
                  <input
                    type="text"
                    value={photoForm.date}
                    onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                    placeholder="e.g. August 2026"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Candidate Name (Optional)</label>
                  <input
                    type="text"
                    value={photoForm.candidateName}
                    onChange={(e) => setPhotoForm({ ...photoForm, candidateName: e.target.value })}
                    placeholder="e.g. Vikram Singh"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Post / Company (Optional)</label>
                  <input
                    type="text"
                    value={photoForm.postOrCompany}
                    onChange={(e) => setPhotoForm({ ...photoForm, postOrCompany: e.target.value })}
                    placeholder="e.g. Delhi Fire Service (Rank 14)"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold text-neutral-800">Upload Photo from Computer / Phone *</label>
                <div className="border-2 border-dashed border-neutral-300 hover:border-red-500 rounded-2xl p-4 text-center bg-neutral-50 hover:bg-red-50/40 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    id="add-photo-file-input"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                  />
                  <label htmlFor="add-photo-file-input" className="cursor-pointer flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-black text-neutral-900">
                      {isUploadingPhoto ? 'Uploading Photo...' : '📁 Click to Choose Photo File from Device'}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-semibold">Supports JPG, PNG, WEBP, GIF</p>
                  </label>
                </div>

                <div className="mt-2.5">
                  <span className="text-[10px] text-neutral-400 font-bold block mb-1">Or enter image URL manually:</span>
                  <input
                    type="url"
                    required
                    value={photoForm.imageUrl}
                    onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none text-xs"
                  />
                </div>

                {photoForm.imageUrl && (
                  <div className="mt-2.5 h-32 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 relative group">
                    <img src={photoForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-neutral-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Selected Photo Preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={photoForm.description}
                  onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                  placeholder="Brief description about the selection or workout..."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingPhoto(false)}
                  className="px-4 py-2.5 bg-neutral-100 text-neutral-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 text-white font-extrabold rounded-xl shadow-md"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-neutral-900">Edit Photo Details</h3>
                <span className="text-[10px] font-mono text-red-600 font-bold">ID: {editingPhoto.id}</span>
              </div>
              <button
                onClick={() => setEditingPhoto(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePhoto} className="space-y-4 text-xs font-bold text-neutral-700">
              <div>
                <label className="block mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  value={editingPhoto.title}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Category *</label>
                  <select
                    value={editingPhoto.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const sec = cat === 'govt_selection' ? 'govt' : cat === 'private_selection' ? 'private' : 'training';
                      setEditingPhoto({ ...editingPhoto, category: cat, section: sec as any });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    <option value="govt_selection">🏛️ Govt. Selection (Sarkari)</option>
                    <option value="private_selection">🏢 Private Selection (Corporate)</option>
                    <option value="ground">Physical Ground (400m Track)</option>
                    <option value="classroom">Classroom & Theory</option>
                    <option value="drills">Live Fire Drills</option>
                    <option value="celebration">Result Celebration</option>
                    <option value="hostel">Hostel & Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1">Date</label>
                  <input
                    type="text"
                    value={editingPhoto.date || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1">Candidate Name</label>
                  <input
                    type="text"
                    value={editingPhoto.candidateName || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, candidateName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1">Post / Company</label>
                  <input
                    type="text"
                    value={editingPhoto.postOrCompany || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, postOrCompany: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold text-neutral-800">Upload New Photo / Replace File *</label>
                <div className="border-2 border-dashed border-neutral-300 hover:border-red-500 rounded-2xl p-4 text-center bg-neutral-50 hover:bg-red-50/40 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    id="edit-photo-file-input"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  <label htmlFor="edit-photo-file-input" className="cursor-pointer flex flex-col items-center justify-center space-y-1.5">
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-black text-neutral-900">
                      {isUploadingPhoto ? 'Uploading Photo...' : '📁 Click to Choose New Photo File from Device'}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-semibold">Supports JPG, PNG, WEBP, GIF</p>
                  </label>
                </div>

                <div className="mt-2.5">
                  <span className="text-[10px] text-neutral-400 font-bold block mb-1">Or update image URL manually:</span>
                  <input
                    type="url"
                    required
                    value={editingPhoto.imageUrl}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none text-xs"
                  />
                </div>

                {editingPhoto.imageUrl && (
                  <div className="mt-2.5 h-32 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 relative">
                    <img src={editingPhoto.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-neutral-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Current Photo Preview
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingPhoto.description || ''}
                  onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPhoto(null)}
                  className="px-4 py-2.5 bg-neutral-100 text-neutral-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 text-white font-extrabold rounded-xl shadow-md"
                >
                  Update Photo
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
