'use client';

import React from 'react';
import Link from 'next/link';
import {
  Star,
  GraduationCap,
  PlayCircle
} from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '@/data/initialData';

export default function TestimonialsPage() {
  const extraReviews = [
    {
      id: 'test-5',
      name: 'Mohit Rawat',
      role: 'Selected Fireman',
      selectedIn: 'Chandigarh Fire Brigade',
      batchYear: 'Batch 2024',
      feedback: 'Fire science terminology and hydraulics initially felt overwhelming. The faculty illustrated every concept with practical diagrams, which helped me score 24 out of 25 in the technical section.',
      rating: 5,
      rollNo: 'CFB-2024-512'
    },
    {
      id: 'test-6',
      name: 'Deepak Sharma',
      role: 'Selected Constable Fire',
      selectedIn: 'CISF Fire Wing',
      batchYear: 'Batch 2024-25',
      feedback: 'The strict ground discipline under Coach Baljeet during 5:00 AM track sessions is what prepares you to clear the 5km run and dummy test with ease. 3 months here completely transformed my stamina.',
      rating: 5,
      rollNo: 'CISF-FW-7781'
    }
  ];

  const allReviews = [...INITIAL_TESTIMONIALS, ...extraReviews];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-800 px-3.5 py-1.5 rounded-full inline-block">
            Hall of Fame & Selections
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Student Reviews & Selection Stories
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Discover how our alumni cleared rigorous physical and written fire department examinations across India.
          </p>
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-red-600">1250+</div>
            <div className="text-xs font-bold text-neutral-600">Total Selections</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-neutral-900">94.2%</div>
            <div className="text-xs font-bold text-neutral-600">Physical Test Pass Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-600">400+</div>
            <div className="text-xs font-bold text-neutral-600">DSSSB Fire Operators</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-green-600">350+</div>
            <div className="text-xs font-bold text-neutral-600">CISF Fire Constables</div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReviews.map((test) => (
            <div
              key={test.id}
              className="bg-white p-7 rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                    {test.batchYear}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-6">
                  &ldquo;{test.feedback}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-neutral-900">
                    {test.name}
                  </h4>
                  <p className="text-xs font-bold text-red-600 mt-0.5">
                    {test.role}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-medium">
                    {test.selectedIn}
                  </p>
                </div>
                {test.rollNo && (
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-50 border border-neutral-200 px-2 py-1 rounded">
                    Roll: {test.rollNo}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Reviews Highlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-red-400 tracking-wider">
              Video Testimonials
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Selected Candidates Video Interviews
            </h3>
            <p className="text-xs text-neutral-400">
              Watch our successful alumni share their 60kg dummy deadlift techniques and OMR test strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'DSSSB Fire Operator Rank 14 Strategy', name: 'Vikram Shekhawat', dur: '4:20 mins' },
              { title: 'CISF Fireman 5Km Running & PST Tips', name: 'Rahul Meena', dur: '3:45 mins' },
              { title: 'Zero to Fire Guard in 4 Months Journey', name: 'Sunil Yadav', dur: '5:10 mins' }
            ].map((v, i) => (
              <div key={i} className="bg-neutral-800/60 rounded-2xl p-4 border border-neutral-700/60 space-y-3">
                <div className="relative aspect-video rounded-xl bg-neutral-950 flex items-center justify-center overflow-hidden group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-white px-2 py-0.5 rounded">
                    {v.dur}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white leading-snug">{v.title}</h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">By {v.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center space-y-4">
        <h3 className="text-2xl font-black text-neutral-900">
          The Next Success Story Could Be Yours!
        </h3>
        <p className="text-xs text-neutral-600">
          Do not delay your preparation. Reserve your seat in the upcoming target batch today.
        </p>
        <Link
          href="/admission"
          className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Apply Online for Admission</span>
        </Link>
      </div>

    </div>
  );
}
