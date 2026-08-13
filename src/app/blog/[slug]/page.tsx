'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Tag,
  GraduationCap,
  PhoneCall
} from 'lucide-react';
import { INITIAL_BLOGS } from '@/data/initialData';

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const blog = INITIAL_BLOGS.find(b => b.slug === resolvedParams.slug);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-neutral-800">Article Not Found</h2>
        <p className="text-sm text-neutral-500 mt-2">The requested blog guide does not exist.</p>
        <Link href="/blog" className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-xs">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const relatedBlogs = INITIAL_BLOGS.filter(b => b.id !== blog.id).slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white">
              {blog.category}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-300 border-t border-neutral-800 pt-4">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-red-400" />
              <span>By {blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Published on {blog.publishedAt}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Article Body */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
            
            {/* Excerpt Lead */}
            <div className="p-4 bg-red-50/60 border-l-4 border-red-600 rounded-r-2xl text-sm font-semibold text-neutral-800 italic leading-relaxed">
              {blog.excerpt}
            </div>

            {/* Render formatted content */}
            <div className="prose prose-neutral max-w-none space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
              {blog.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-black text-neutral-900 pt-4 border-b border-neutral-200 pb-2">
                      {trimmed.replace('# ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('## ')) {
                  return (
                    <h3 key={idx} className="text-xl font-extrabold text-neutral-900 pt-3 text-red-700">
                      {trimmed.replace('## ', '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-lg font-bold text-neutral-900 pt-2">
                      {trimmed.replace('### ', '')}
                    </h4>
                  );
                }
                if (trimmed.startsWith('> [!TIP]')) {
                  return (
                    <div key={idx} className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm text-amber-900 font-medium my-3">
                      {trimmed.replace('> [!TIP]', '').trim()}
                    </div>
                  );
                }
                if (trimmed.startsWith('* ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
                  return (
                    <div key={idx} className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-xs sm:text-sm my-2 space-y-1">
                      <p className="whitespace-pre-line font-medium text-neutral-800">{trimmed}</p>
                    </div>
                  );
                }
                if (trimmed.startsWith('|')) {
                  return (
                    <div key={idx} className="overflow-x-auto my-4 text-xs">
                      <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-xl font-mono whitespace-pre-wrap">
                        {trimmed}
                      </pre>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="whitespace-pre-line">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Tags footer */}
            <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {blog.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>

          </article>

          {/* Right Sidebar: Admission CTA, Helpline & Related Posts */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Admission CTA card */}
            <div className="bg-gradient-to-br from-neutral-900 to-red-950 text-white p-6 rounded-3xl border border-neutral-800 shadow-lg space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">
                Join SK Fire Agency Coaching Batch
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Specialized written exam theory classes + daily 400m physical ground training with hostel facility.
              </p>
              <Link
                href="/admission"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-red-600/30"
              >
                <span>Fill Online Admission Form</span>
              </Link>
            </div>

            {/* Direct Helpline card */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-3">
              <h4 className="font-extrabold text-sm text-neutral-900 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>Admission Helpline</span>
              </h4>
              <p className="text-xs text-neutral-600">
                Call our counselor directly for fee structures, syllabus inquiries, and physical training checks.
              </p>
              <a
                href="tel:+919876543210"
                className="block text-center py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs rounded-xl transition-colors"
              >
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 bg-green-50 text-green-700 hover:bg-green-100 font-bold text-xs rounded-xl transition-colors border border-green-200"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm text-neutral-900 border-l-4 border-red-600 pl-2.5">
                Related Articles
              </h4>
              <div className="space-y-3">
                {relatedBlogs.map((rb) => (
                  <Link
                    key={rb.id}
                    href={`/blog/${rb.slug}`}
                    className="block group p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                      {rb.category}
                    </span>
                    <h5 className="font-bold text-xs text-neutral-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                      {rb.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
