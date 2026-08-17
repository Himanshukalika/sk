'use client';

import React, { useState } from 'react';
import { Search, Briefcase, MessageCircle } from 'lucide-react';
import RecruitmentCard from '@/components/RecruitmentCard';
import AdmissionModal from '@/components/AdmissionModal';
import { INITIAL_RECRUITMENTS } from '@/data/initialData';

export default function RecruitmentPage() {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetCourse, setTargetCourse] = useState('fire-guard-course');

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
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* MINIMALIST HEADER MATCHING GALLERY & CONTACT STYLE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            VACANCIES & RECRUITMENT
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Live Vacancy Alerts for Delhi Fire Service (DSSSB), CISF Fire Wing & State Municipal Corporations.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vacancies e.g. DSSSB, CISF..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30 transition-all"
              />
            </div>

            {/* Status tabs */}
            <div className="flex items-center gap-2">
              {['all', 'Active', 'Upcoming', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedStatus === st
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100/80 text-neutral-600 hover:bg-neutral-200/70'
                  }`}
                >
                  {st === 'all' ? 'All Status' : st}
                </button>
              ))}
            </div>
          </div>

          {/* State Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {states.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedState(st.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedState === st.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100/80 text-neutral-700 hover:bg-neutral-200/70'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

        </div>

        {/* RECRUITMENT NOTICES CARDS */}
        {filteredRecruitments.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center space-y-3 border border-neutral-200/80 shadow-xs">
            <Briefcase className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-base font-medium text-neutral-700">No recruitment notices match your search criteria.</h3>
            <p className="text-xs text-neutral-500">Try clearing filters or search for another state.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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

      {/* WHATSAPP ALERTS CTA CARD */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12">
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Get Instant Job Notifications</h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">Join our WhatsApp alert group for new Fire & Safety recruitment releases.</p>
          </div>
          <a
            href="https://wa.me/919680505554?text=Hello%20Shri%20Krishna%20Fire%20Academy,%20please%20add%20me%20to%20the%20Job%20Alert%20group."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join WhatsApp Alerts</span>
          </a>
        </div>
      </div>

      {/* ADMISSION LIGHTBOX MODAL */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={targetCourse}
      />

    </div>
  );
}
