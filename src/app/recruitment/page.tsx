'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  MessageCircle,
  Bell
} from 'lucide-react';
import RecruitmentCard from '@/components/RecruitmentCard';
import AdmissionModal from '@/components/AdmissionModal';
import { INITIAL_RECRUITMENTS } from '@/data/initialData';

export default function RecruitmentPage() {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetCourse, setTargetCourse] = useState('fireman-preparation');

  const states = [
    { id: 'all', label: 'All States & Central' },
    { id: 'Delhi', label: 'Delhi (DSSSB)' },
    { id: 'All India', label: 'Central (CISF / All India)' },
    { id: 'Rajasthan', label: 'Rajasthan' },
    { id: 'Haryana', label: 'Haryana' },
    { id: 'Uttar Pradesh', label: 'Uttar Pradesh' }
  ];

  const filteredRecruitments = INITIAL_RECRUITMENTS.filter(r => {
    const matchesState = selectedState === 'all' || r.state.includes(selectedState);
    const matchesStatus = selectedStatus === 'all' || r.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesStatus && matchesSearch;
  });

  const handleApplyForBatch = (courseSlug: string) => {
    setTargetCourse(courseSlug);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-800 px-3.5 py-1.5 rounded-full inline-block">
            Fire Dept Vacancy Alerts 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Latest Fire Department Recruitments
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Live notification updates for Delhi Fire Service, CISF Fire Wing, State Municipal Corporations, and Industrial Safety positions.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-neutral-200 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recruitment e.g. DSSSB, CISF, Rajasthan..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Status tabs */}
            <div className="flex items-center gap-2">
              {['all', 'Active', 'Upcoming', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                    selectedStatus === st
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {st === 'all' ? 'All Status' : st}
                </button>
              ))}
            </div>
          </div>

          {/* State Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {states.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedState(st.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedState === st.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Recruitment Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* WhatsApp Notification Alert Box */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-green-900 to-neutral-900 text-white border border-green-700/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                Get Instant Fire Vacancy Notifications on WhatsApp!
              </h4>
              <p className="text-xs text-neutral-300">
                Join our free Fire Recruitment alert broadcast for upcoming notification PDFs and admit cards.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20please%20add%20me%20to%20Fire%20Recruitment%20WhatsApp%20Alert%20group."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shrink-0 shadow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join WhatsApp Alerts</span>
          </a>
        </div>

        {filteredRecruitments.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-neutral-200 max-w-md mx-auto space-y-3">
            <Briefcase className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-800">No recruitment notices found</h3>
            <p className="text-xs text-neutral-500">
              Try changing the state or status filter to see other available vacancies.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRecruitments.map((notice) => (
              <RecruitmentCard
                key={notice.id}
                notice={notice}
                onApplyForBatch={handleApplyForBatch}
              />
            ))}
          </div>
        )}

      </section>

      {/* Admission Modal */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={targetCourse}
      />

    </div>
  );
}
