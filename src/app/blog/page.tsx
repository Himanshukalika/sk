'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { INITIAL_BLOGS } from '@/data/initialData';

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Guide', label: 'Exam Guides' },
    { id: 'Physical', label: 'Physical Tips' },
    { id: 'Salary', label: 'Salary & Perks' },
    { id: 'Exam Pattern', label: 'Pattern & Trade Test' }
  ];

  const filteredBlogs = INITIAL_BLOGS.filter(b => {
    const matchesCat = selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredBlog = INITIAL_BLOGS.find(b => b.featured) || INITIAL_BLOGS[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800 px-3.5 py-1.5 rounded-full inline-block">
            Fire Coaching Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Fire Service Preparation Articles & Guides
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Career roadmaps, physical conditioning strategies, salary analysis, and syllabus breakdowns authored by fire training experts.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Search & Category Filter */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-neutral-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles e.g. Salary, Physical, 60kg Dummy..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
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
        </div>

        {/* Featured Blog Highlight */}
        {selectedCategory === 'all' && !searchQuery && featuredBlog && (
          <div className="mt-10 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 3-h" /> Featured Guide
                </span>
                <span className="text-xs text-neutral-400">
                  {featuredBlog.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug hover:text-red-400 transition-colors">
                <Link href={`/blog/${featuredBlog.slug}`}>
                  {featuredBlog.title}
                </Link>
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                {featuredBlog.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-red-600/30"
                >
                  <span>Read Complete Article</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-red-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-7">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                  <span className="font-extrabold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="font-black text-xl text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-xs text-neutral-600 mt-3 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {blog.tags.map((t, i) => (
                    <span key={i} className="text-[10px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-7 pt-0">
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">
                    {blog.publishedAt}
                  </span>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="font-extrabold text-red-600 hover:text-red-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

    </div>
  );
}
