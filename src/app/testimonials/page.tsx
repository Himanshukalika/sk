'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Trophy, Award, CheckCircle2 } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '@/data/initialData';

export default function TestimonialsPage() {
  const extraReviews = [
    {
      id: 'test-5',
      name: 'Mohit Rawat',
      role: 'Selected Fireman',
      selectedIn: 'Chandigarh Fire Brigade',
      batchYear: 'Batch 2024',
      feedback: 'Fire science terminology and hydraulics initially felt overwhelming. The faculty illustrated every concept with practical diagrams, which helped me score top marks in the technical exam.',
      rating: 5,
      rollNo: 'CFB-2024-512'
    },
    {
      id: 'test-6',
      name: 'Deepak Sharma',
      role: 'Selected Constable Fire',
      selectedIn: 'CISF Fire Wing',
      batchYear: 'Batch 2024-25',
      feedback: 'The strict ground discipline during 5:00 AM track sessions is what prepares you to clear the 5km run and 60kg dummy carry test with ease. 3 months here completely transformed my stamina.',
      rating: 5,
      rollNo: 'CISF-FW-7781'
    }
  ];

  const allReviews = [...INITIAL_TESTIMONIALS, ...extraReviews];

  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28 font-sans">
      
      {/* MINIMALIST HEADER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            HALL OF FAME & REVIEWS
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Genuine feedback and candidate selection stories from Shri Krishna Fire & Safety Academy (Pawta, Jaipur).
        </p>
      </div>

      {/* Stats Counter Row */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900">1863+</div>
            <div className="text-xs font-medium text-neutral-600">Total Selections</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900">1st & 3rd</div>
            <div className="text-xs font-medium text-neutral-600">Rajasthan Driver Rank</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-neutral-900">70+</div>
            <div className="text-xs font-medium text-neutral-600">Fire Service Cadets</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600">100%</div>
            <div className="text-xs font-medium text-neutral-600">Placement Support</div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allReviews.map((test) => (
            <div
              key={test.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200/60">
                    {test.batchYear}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-6">
                  &ldquo;{test.feedback}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-neutral-900">{test.name}</h4>
                  <p className="text-xs font-medium text-neutral-600 mt-0.5">{test.selectedIn}</p>
                </div>
                {test.rollNo && (
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">
                    {test.rollNo}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
