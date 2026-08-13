'use client';

import React, { useState } from 'react';
import {
  Search,
  GraduationCap,
  PhoneCall
} from 'lucide-react';
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
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Exam Oriented Batches
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            All Courses & Exam Batches
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Comprehensive written syllabus coaching, 400m physical endurance conditioning, and heavy driving test simulations.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-neutral-200 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses e.g. Fireman, Operator, Ground..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Helpline quick link */}
            <div className="text-xs text-neutral-600 font-semibold flex items-center gap-2">
              <span>Need help choosing?</span>
              <a
                href="tel:+919876543210"
                className="text-red-600 hover:underline font-bold flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Counselor: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Courses List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-neutral-200 space-y-4 max-w-lg mx-auto">
            <GraduationCap className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="text-xl font-bold text-neutral-800">No courses match your search</h3>
            <p className="text-xs text-neutral-500">
              Try adjusting your search terms or view all courses by resetting the filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Admission Modal */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={targetCourseSlug}
      />

    </div>
  );
}
