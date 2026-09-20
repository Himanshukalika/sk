'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { INITIAL_BLOGS } from '@/data/initialData';

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Guide', label: 'Exam Guides' },
    { id: 'Physical', label: 'Physical Tips' },
    { id: 'Salary', label: 'Salary & Perks' },
    { id: 'Exam Pattern', label: 'Pattern & Trade Test' }
  ];

  const faqs = [
    {
      q: 'Does Shri Krishna Fire Academy provide physical ground training & hostel?',
      a: 'Yes! We provide complete 400m athletic track ground workouts, 60kg dummy carry training, vertical rope climb, separate physical workout areas, and residential hostel with hygienic food.'
    },
    {
      q: 'What driving license is needed for Fire Operator & Driver post?',
      a: 'A valid Heavy Motor Vehicle (HMV) driving license is required. At Shri Krishna Fire Academy Paota, we conduct practical driving tests on our own Fire Tender vehicle.'
    },
    {
      q: 'Are NCVT approved ITI & Fire Safety diploma courses available?',
      a: 'Yes, Shri Krishna Fire and Safety Academy (Paota Jaipur) offers NCVT approved ITI, Fireman, Fire Driver, and Sub Fire Officer (SFO) diploma courses.'
    },
    {
      q: 'How can I take admission in the new target batch?',
      a: 'You can apply online via our website form or contact our Paota Jaipur admission helpline directly at +91 9680505554 / 8696715101.'
    }
  ];

  const filteredBlogs = INITIAL_BLOGS.filter(b => {
    const matchesCat = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28 font-sans">
      
      {/* MINIMALIST HEADER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            FAQS & ARTICLES
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Syllabus breakdowns, exam pattern guides, physical test criteria, and fire safety academy updates.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        
        {/* Search & Category Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or FAQs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
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
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                    <span className="text-neutral-900 uppercase tracking-wider text-[11px]">{blog.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-neutral-400" /> {blog.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-700 uppercase tracking-wider"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-neutral-600" />
              <span>Frequently Asked Questions (FAQs)</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Clear answers regarding Shri Krishna Fire Academy admissions and physical ground curriculum.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-neutral-200/80 rounded-xl overflow-hidden bg-neutral-50/50">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-neutral-900 flex items-center justify-between gap-3 hover:bg-neutral-100/60 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 shrink-0 transform transition-transform ${openFaq === idx ? 'rotate-180 text-neutral-900' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-neutral-600 bg-white border-t border-neutral-200/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
