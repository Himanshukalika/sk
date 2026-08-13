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
  Lock
} from 'lucide-react';
import { AdmissionLead, ContactEnquiry, Course, RecruitmentNotice, BlogPost } from '@/types';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_BLOGS } from '@/data/initialData';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // default demo authenticated
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [activeTab, setActiveTab] = useState<'leads' | 'contacts' | 'courses' | 'recruitments' | 'blogs'>('leads');

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

  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      try {
        const [lRes, cRes] = await Promise.all([
          fetch('/api/admission'),
          fetch('/api/contact')
        ]);
        const [lData, cData] = await Promise.all([
          lRes.json(),
          cRes.json()
        ]);
        if (isMounted) {
          if (lData.success) setLeads(lData.data);
          if (cData.success) setContacts(cData.data);
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
    <div className="bg-slate-100 min-h-screen pb-20">
      
      {/* Admin Top Header */}
      <header className="bg-neutral-950 text-white border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight">
                  SK Fire Agency • Admin Control Center
                </h1>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Live
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Lead Management, Admissions & Content Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/export-leads"
              download
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export Leads (Excel/CSV)</span>
            </a>

            <button
              onClick={() => { fetchLeads(); fetchContacts(); }}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl border border-neutral-800"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-2 bg-neutral-900 hover:bg-red-950 text-neutral-300 hover:text-red-400 text-xs font-bold rounded-xl border border-neutral-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Stat Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'leads'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student Admissions ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'contacts'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Messages ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'courses'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('recruitments')}
            className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'recruitments'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Recruitments ({recruitments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
              activeTab === 'blogs'
                ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                : 'bg-white text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <FileTextIcon className="w-4 h-4" />
            <span>Blogs & Guides ({blogs.length})</span>
          </button>
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
                      <th className="py-3.5 px-4">Course Applied</th>
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
                            {lead.email && <div className="text-[10px] text-neutral-500 truncate max-w-[140px]">{lead.email}</div>}
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-neutral-800">
                            <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold text-[11px]">
                              {lead.selectedCourse}
                            </span>
                            <div className="text-[10px] text-neutral-400 mt-0.5">{lead.qualification}</div>
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

      </div>

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
              <div className="col-span-2 p-3 bg-neutral-50 rounded-xl">
                <span className="text-neutral-400 font-bold block">Target Course / Batch</span>
                <span className="text-sm font-extrabold text-red-700">{selectedLead.selectedCourse}</span>
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
