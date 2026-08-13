'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { RecruitmentNotice } from '@/types';

interface RecruitmentCardProps {
  notice: RecruitmentNotice;
  onApplyForBatch?: (courseSlug: string) => void;
}

export default function RecruitmentCard({ notice, onApplyForBatch }: RecruitmentCardProps) {
  const isUpcoming = notice.status === 'Upcoming';

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-red-300 transition-all p-6 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              {notice.state}
            </span>
            <span className="text-xs text-neutral-500 font-medium truncate max-w-[200px]">
              {notice.department}
            </span>
          </div>

          <span
            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              notice.status === 'Active'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : isUpcoming
                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            ● {notice.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
          {notice.title}
        </h3>

        {/* Post Count Badge */}
        <div className="mt-3 flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-xl font-extrabold text-sm border border-red-200">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>{notice.totalPosts} Total Vacancies</span>
          </div>

          <span className="text-xs font-semibold text-neutral-600">
            Pay: {notice.salary}
          </span>
        </div>

        {/* Brief */}
        <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
          {notice.brief}
        </p>

        {/* Meta Info Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-100">
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Eligibility</span>
            <span className="font-semibold text-neutral-800 line-clamp-1">{notice.eligibility}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Age Limit</span>
            <span className="font-semibold text-neutral-800">{notice.ageLimit}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Application Starts</span>
            <span className="font-semibold text-neutral-800">{notice.applicationStartDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block font-medium">Last Date to Apply</span>
            <span className="font-bold text-red-600">{notice.lastDate}</span>
          </div>
        </div>

        {/* Key Dates Timeline */}
        {notice.keyDates && notice.keyDates.length > 0 && (
          <div className="mt-3.5 space-y-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
              Important Milestones:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {notice.keyDates.map((kd, i) => (
                <div key={i} className="flex items-center gap-1 text-neutral-700">
                  <CheckCircle2 className="w-3 h-3 text-red-500 shrink-0" />
                  <span><strong>{kd.event}:</strong> {kd.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-neutral-500 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Prep Batch Running at SK Fire Agency</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onApplyForBatch ? (
            <button
              onClick={() => onApplyForBatch('fireman-preparation')}
              type="button"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Join Preparation Batch</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <Link
              href="/admission"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Join Preparation Batch</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
