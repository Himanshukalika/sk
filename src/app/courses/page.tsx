'use client';

import React, { useState } from 'react';
import { Search, GraduationCap, PhoneCall } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import AdmissionModal from '@/components/AdmissionModal';
import { INITIAL_COURSES } from '@/data/initialData';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetCourseSlug, setTargetCourseSlug] = useState('fire-guard-course');

  const categories = [
    { id: 'all', label: 'All Batches' },
    { id: 'fire-guard', label: 'Fire Guard' },
    { id: 'fireman', label: 'Fireman Special' },
    { id: 'operator', label: 'Fire Operator (Driver)' },
    { id: 'diploma', label: 'Diploma & Sub-Officer' },
    { id: 'physical', label: 'Physical Ground Only' },
    { id: 'special', label: 'Crash Batches' }
  ];

  const filteredCourses = INITIAL_COURSES.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleApply = (slug: string) => {
    setTargetCourseSlug(slug);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* MINIMALIST HEADER MATCHING GALLERY STYLE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            COURSES & BATCHES
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Explore our targeted training programs — Written Theory, 400m Physical Ground & Heavy Vehicle Trade Drills.
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
                placeholder="Search courses e.g. Fireman, Operator..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30 transition-all"
              />
            </div>

            <div className="text-xs text-neutral-600 font-medium flex items-center gap-2">
              <span>Counselor Helpline:</span>
              <a
                href="tel:+919680505554"
                className="text-neutral-900 hover:underline font-semibold flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+91 9680505554</span>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100/80 text-neutral-700 hover:bg-neutral-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* COURSES CARDS GRID */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center space-y-3 border border-neutral-200/80 shadow-xs">
            <GraduationCap className="w-10 h-10 text-neutral-400 mx-auto" />
            <h3 className="text-base font-medium text-neutral-700">No courses found matching your criteria.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onApply={handleApply}
              />
            ))}
          </div>
        )}

      </section>

      {/* ADMISSION LIGHTBOX MODAL */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={targetCourseSlug}
      />

    </div>
  );
}
