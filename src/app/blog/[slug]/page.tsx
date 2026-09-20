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
      <div className="bg-[#f5f4ef] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center text-neutral-900">
        <h2 className="text-xl font-semibold">Article Not Found</h2>
        <p className="text-xs text-neutral-600 mt-2">The requested blog guide does not exist.</p>
        <Link href="/blog" className="mt-4 px-5 py-2.5 bg-neutral-900 text-white rounded-xl font-medium text-xs">
          Back to Articles
        </Link>
      </div>
    );
  }

  const relatedBlogs = INITIAL_BLOGS.filter(b => b.id !== blog.id).slice(0, 3);

  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-12 pb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white text-neutral-900 border border-neutral-200/80 shadow-xs">
            {blog.category}
          </span>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {blog.readTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-normal tracking-tight text-neutral-900 leading-tight">
          {blog.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-neutral-500 border-t border-neutral-200/80 pt-4">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-neutral-600" />
            <span>By {blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-600" />
            <span>Published on {blog.publishedAt}</span>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Article Body */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
            
            {/* Excerpt Lead */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70 text-xs sm:text-sm text-neutral-700 italic leading-relaxed">
              {blog.excerpt}
            </div>

            {/* Render formatted content */}
            <div className="prose prose-neutral max-w-none space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {blog.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('# ')) {
                  return (
                    <h2 key={idx} className="text-lg sm:text-xl font-semibold text-neutral-900 pt-4 border-b border-neutral-100 pb-2">
                      {trimmed.replace('# ', '')}
                    </h2>
                  );
                }
                if (trimmed.startsWith('## ')) {
                  return (
                    <h3 key={idx} className="text-base font-semibold text-neutral-900 pt-3">
                      {trimmed.replace('## ', '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('### ')) {
                  return (
                    <h4 key={idx} className="text-sm font-semibold text-neutral-800 pt-2">
                      {trimmed.replace('### ', '')}
                    </h4>
                  );
                }
                if (trimmed.startsWith('> [!TIP]')) {
                  return (
                    <div key={idx} className="p-3.5 bg-neutral-50 border-l-2 border-neutral-800 rounded-r-xl text-xs text-neutral-800 font-medium my-3">
                      {trimmed.replace('> [!TIP]', '').trim()}
                    </div>
                  );
                }
                if (trimmed.startsWith('* ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
                  return (
                    <div key={idx} className="bg-neutral-50/80 p-4 rounded-xl border border-neutral-100 text-xs my-2 space-y-1">
                      <p className="whitespace-pre-line font-medium text-neutral-800">{trimmed}</p>
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
            <div className="pt-6 border-t border-neutral-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {blog.tags.map((tag, i) => (
                <span key={i} className="text-[11px] bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>

          </article>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Admission CTA card */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900">
                Join Shri Krishna Fire Academy Batch
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Written exam coaching + daily 400m physical ground workouts with residential hostel in Paota, Jaipur.
              </p>
              <Link
                href="/admission"
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span>Online Admission Form</span>
              </Link>
            </div>

            {/* Direct Helpline card */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
              <h4 className="font-semibold text-xs text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-neutral-600" />
                <span>Admission Helpline</span>
              </h4>
              <p className="text-xs text-neutral-600">
                Call our Paota Jaipur counselor for batch dates and hostel information.
              </p>
              <a
                href="tel:+919680505554"
                className="block text-center py-2.5 bg-neutral-900 text-white font-medium text-xs rounded-xl hover:bg-neutral-800 transition-colors"
              >
                +91 96805 05554
              </a>
            </div>

            {/* Related Articles */}
            <div className="bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <h4 className="font-semibold text-xs text-neutral-900 uppercase tracking-wider border-b border-neutral-100 pb-2">
                Related Articles
              </h4>
              <div className="space-y-3">
                {relatedBlogs.map((rb) => (
                  <Link
                    key={rb.id}
                    href={`/blog/${rb.slug}`}
                    className="block group p-2 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase block mb-0.5">
                      {rb.category}
                    </span>
                    <h5 className="font-semibold text-xs text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug line-clamp-2">
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
