'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, GraduationCap, Calendar, CheckCircle2, ArrowRight, Users, Flame } from 'lucide-react';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  onApply: (courseSlug: string) => void;
}

export default function CourseCard({ course, onApply }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Header & Badges */}
      <div>
        <div className="p-6 pb-4 bg-gradient-to-b from-neutral-50/70 to-white border-b border-neutral-100 relative">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-100 text-red-700">
              <Flame className="w-3.5 h-3.5 text-red-600" />
              {course.mode}
            </span>
            {course.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                ★ {course.badge}
              </span>
            )}
          </div>

          <h3 className="font-extrabold text-xl text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="text-xs font-semibold text-neutral-500 mt-1">
            {course.hindiTitle}
          </p>

          {course.fees && (
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-lg font-black text-red-600">
                {course.fees}
              </span>
              <span className="text-[11px] text-neutral-500 font-medium">
                (Study Material + Ground + Tests Included)
              </span>
            </div>
          )}
        </div>

        {/* Course Info Specs */}
        <div className="p-6 pt-4 space-y-3.5 text-xs text-neutral-600">
          <div className="grid grid-cols-2 gap-2 py-2 bg-neutral-50 rounded-xl px-3 border border-neutral-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-500 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block font-medium">Duration</span>
                <span className="font-bold text-neutral-800">{course.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block font-medium">Next Batch</span>
                <span className="font-bold text-neutral-800">{course.upcomingBatchDate}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start gap-1.5 mb-2">
              <GraduationCap className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs text-neutral-700">
                <strong>Eligibility:</strong> {course.eligibility}
              </p>
            </div>
          </div>

          {/* Key Bullet Features */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
              What’s Included:
            </span>
            {course.keyFeatures.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-neutral-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <span className="leading-tight">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 border-t border-neutral-100 space-y-2 mt-4">
        <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-3">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-neutral-400" />
            <span>Seats: <strong>{course.availableSeats} Left</strong> of {course.totalSeats}</span>
          </span>
          <span className="text-red-600 font-bold animate-pulse">Admissions Open</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/courses/${course.slug}`}
            className="py-2.5 px-3 text-center rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>Syllabus & Info</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={() => onApply(course.slug)}
            type="button"
            className="py-2.5 px-3 text-center rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-1 transition-all"
          >
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
