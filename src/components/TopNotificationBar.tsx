'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Bell, PhoneCall, Sparkles } from 'lucide-react';

export default function TopNotificationBar() {
  const notifications = [
    '🔥 New Fire Guard & Fireman Target Batch Starting from 18 August 2026! Limited Seats Available.',
    '📢 Delhi Fire Service (DSSSB) 706 Fire Operator Recruitment Notification Out - Driving & Ground Batch Open.',
    '🏆 CISF Constable Fireman 1149 Vacancy Special Physical Ground Training Daily at 5:30 AM.',
    '🏢 Safe & Hygienic Hostel with Mess Facility Available for Outstation Students.'
  ];

  return (
    <div className="bg-neutral-900 text-white text-xs border-b border-neutral-800 relative z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left marquee / ticker */}
        <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto flex-1">
          <span className="inline-flex items-center gap-1 bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[11px] shrink-0 tracking-wide uppercase shadow-sm">
            <Bell className="w-3 h-3 animate-bounce" /> Live Update
          </span>
          <div className="overflow-hidden whitespace-nowrap relative w-full">
            <div className="animate-marquee inline-block">
              {notifications.map((note, idx) => (
                <span key={idx} className="mx-4 text-neutral-200 font-medium inline-flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-red-500 inline" /> {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right quick contact info */}
        <div className="flex items-center gap-4 text-[12px] text-neutral-300 shrink-0 font-medium hidden sm:flex">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-500" />
            <span>Helpline: +91 98765 43210</span>
          </a>
          <span className="text-neutral-600">|</span>
          <Link
            href="/recruitment"
            className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" /> Latest Vacancies
          </Link>
        </div>
      </div>
    </div>
  );
}
