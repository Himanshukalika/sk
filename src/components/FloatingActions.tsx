'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, ArrowUp, GraduationCap } from 'lucide-react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center hover:bg-neutral-800 transition-all hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct Call Button */}
        <a
          href="tel:+919876543210"
          aria-label="Call SK Fire Agency"
          className="w-13 h-13 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-600/40 flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span className="absolute right-15 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call +91 98765 43210
          </span>
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href="https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20I%20want%20information%20regarding%20Fireman%20Coaching%20Admission."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/40 flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <MessageCircle className="w-7 h-7 fill-white/20" />
          <span className="absolute right-15 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp Admission Help
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href="tel:+919876543210"
          className="flex-1 py-2.5 bg-neutral-100 active:bg-neutral-200 text-neutral-900 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-neutral-200"
        >
          <Phone className="w-4 h-4 text-red-600" />
          <span>Call Now</span>
        </a>
        <a
          href="https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20I%20want%20information%20regarding%20Fireman%20Coaching%20Admission."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 bg-green-600 active:bg-green-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/admission"
          className="flex-1.5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 active:from-red-700 active:to-red-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-600/30"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Apply Online</span>
        </Link>
      </div>
    </>
  );
}
