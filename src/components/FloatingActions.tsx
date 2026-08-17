'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const pathname = usePathname();

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

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Floating Action Buttons (Hidden on mobile) */}
      <div className="hidden md:flex fixed bottom-6 right-5 z-40 flex-col items-end gap-3">
        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="w-11 h-11 rounded-full bg-neutral-900 text-white shadow-lg flex items-center justify-center hover:bg-neutral-800 transition-all hover:scale-110 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Direct Call Button */}
        <a
          href="tel:+919680505554"
          aria-label="Call SK Fire Agency"
          className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform group relative"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call +91 9680505554
          </span>
        </a>

        {/* WhatsApp Chat Button */}
        <a
          href="https://wa.me/919680505554?text=Hello%20SK%20Fire%20Agency,%20I%20want%20information%20regarding%20Fireman%20Coaching%20Admission."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform group relative"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="absolute right-14 bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp Help Desk
          </span>
        </a>
      </div>
    </>
  );
}
