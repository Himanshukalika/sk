'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, GraduationCap, Calendar, CheckCircle2, ArrowRight, Flame } from 'lucide-react';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  onApply: (courseSlug: string) => void;
}

export default function CourseCard({ course, onApply }: CourseCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Header & Badges */}
      <div>
        <div className="p-6 pb-4 border-b border-neutral-100 relative">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200/60">
              <Flame className="w-3.5 h-3.5 text-neutral-600" />
              {course.mode}
            </span>
            {course.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100/80 text-neutral-600">
                {course.badge}
              </span>
            )}
          </div>

          <h3 className="font-semibold text-xl text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="text-xs font-normal text-neutral-500 mt-1">
            {course.hindiTitle}
          </p>

          {course.fees && (
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-neutral-900">
                {course.fees}
              </span>
            </div>
          )}
        </div>

        {/* Course Info Specs */}
        <div className="p-6 pt-4 space-y-4 text-xs text-neutral-600">
          <div className="grid grid-cols-2 gap-2 py-2 bg-neutral-50/80 rounded-xl px-3 border border-neutral-100">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block font-medium">Duration</span>
                <span className="font-semibold text-neutral-800">{course.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <div>
                <span className="text-[10px] text-neutral-400 block font-medium">Next Batch</span>
                <span className="font-semibold text-neutral-800">{course.upcomingBatchDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <GraduationCap className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
            <p className="text-xs text-neutral-700">
              <strong>Eligibility:</strong> {course.eligibility}
            </p>
          </div>

          {/* Key Bullet Features */}
          <div className="space-y-2 pt-1">
            {course.keyFeatures.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-neutral-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-tight text-xs">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 space-y-3 mt-2">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/courses/${course.slug}`}
            className="py-2.5 px-3 text-center rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <button
            onClick={() => onApply(course.slug)}
            type="button"
            className="py-2.5 px-3 text-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span>Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
