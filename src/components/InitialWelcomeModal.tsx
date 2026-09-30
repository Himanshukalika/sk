'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Globe,
  CheckCircle2,
  Flame,
  Award,
  Sparkles,
  Shield,
  Building,
  ArrowRight,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import AcademyLogo from './AcademyLogo';

interface InitialWelcomeModalProps {
  onOpenAdmission?: () => void;
}

export default function InitialWelcomeModal({ onOpenAdmission }: InitialWelcomeModalProps) {
  const { language, setLanguage, isInitialModalOpen, setIsInitialModalOpen, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<Language>(language);

  if (!isInitialModalOpen) return null;

  const handleConfirm = () => {
    setLanguage(selectedLang);
    setIsInitialModalOpen(false);
  };

  const handleClose = () => {
    setLanguage(selectedLang);
    setIsInitialModalOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-neutral-100 overflow-hidden relative max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glowing Gradient Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Header Section */}
        <div className="bg-neutral-950 text-white p-5 sm:p-6 relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-400 text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Session 2026-27 Admissions Open</span>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close welcome popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="shrink-0 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 shadow-sm">
              <AcademyLogo size="small" variant="dark" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                {selectedLang === 'hi' 
                  ? 'श्री कृष्णा फायर & सेफ्टी एकेडमी'
                  : 'Shri Krishna Fire & Safety Academy'}
              </h2>
              <p className="text-xs text-neutral-300 font-medium mt-0.5">
                {selectedLang === 'hi'
                  ? 'पावटा, जयपुर — राजस्थान की #1 फायर ट्रेनिंग संस्थान'
                  : 'Paota, Jaipur — Rajasthan\'s #1 Fire Training Institute'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4.5 text-neutral-800 flex-1">
          
          {/* Language Selection Header */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-neutral-900 uppercase tracking-wider">
                <Globe className="w-4 h-4 text-red-600" />
                <span>Choose Your Language / भाषा चुनें</span>
              </div>
              <span className="text-[10px] text-neutral-400 font-semibold">Change anytime from navbar</span>
            </div>

            {/* Language Cards */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* English Card */}
              <button
                type="button"
                onClick={() => setSelectedLang('en')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                  selectedLang === 'en'
                    ? 'border-red-600 bg-red-50/60 shadow-sm ring-4 ring-red-600/10'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl shadow-xs">🇬🇧</span>
                    <div>
                      <span className="text-sm font-black text-neutral-900 block leading-tight">English</span>
                      <span className="text-[10px] text-neutral-500 font-medium">Standard</span>
                    </div>
                  </div>
                  {selectedLang === 'en' && (
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-neutral-600 leading-tight">
                  Browse courses & campus in English.
                </p>
              </button>

              {/* Hindi Card */}
              <button
                type="button"
                onClick={() => setSelectedLang('hi')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                  selectedLang === 'hi'
                    ? 'border-red-600 bg-red-50/60 shadow-sm ring-4 ring-red-600/10'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl shadow-xs">🇮🇳</span>
                    <div>
                      <span className="text-sm font-black text-neutral-900 block leading-tight">हिन्दी</span>
                      <span className="text-[10px] text-neutral-500 font-medium">Hindi</span>
                    </div>
                  </div>
                  {selectedLang === 'hi' && (
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-neutral-600 leading-tight">
                  सम्पूर्ण विवरण और भर्ती जानकारी हिन्दी में।
                </p>
              </button>

            </div>
          </div>

          {/* Highlights 3-Pill Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80 text-center flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🏃</span>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {selectedLang === 'hi' ? '400m ग्राउंड' : '400m Ground'}
              </span>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80 text-center flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🏆</span>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {selectedLang === 'hi' ? '750+ चयन' : '750+ Selections'}
              </span>
            </div>
            <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80 text-center flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🏢</span>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {selectedLang === 'hi' ? 'हॉस्टल & मेस' : 'Hostel & Mess'}
              </span>
            </div>
          </div>

          {/* Helpline Strip */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs">
            <div className="flex items-center gap-2 text-amber-950 font-bold">
              <div className="w-6 h-6 rounded-full bg-amber-200/80 flex items-center justify-center shrink-0">
                <PhoneCall className="w-3.5 h-3.5 text-amber-800" />
              </div>
              <span>
                {selectedLang === 'hi' ? 'एडमिशन हेल्पलाइन:' : 'Admission Helpline:'}
              </span>
            </div>
            <a href="tel:+919680505554" className="text-red-600 font-black hover:underline tracking-wide">
              +91 96805 05554
            </a>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-neutral-500 hover:text-neutral-900 text-xs font-bold transition-colors"
          >
            {selectedLang === 'hi' ? 'छोड़ें (Skip)' : 'Skip'}
          </button>

          <div className="flex items-center gap-2">
            {onOpenAdmission && (
              <button
                type="button"
                onClick={() => {
                  handleConfirm();
                  onOpenAdmission();
                }}
                className="px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                {selectedLang === 'hi' ? 'एडमिशन फॉर्म' : 'Book Form'}
              </button>
            )}

            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black rounded-xl text-xs shadow-lg shadow-red-600/25 flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>
                {selectedLang === 'hi' ? 'वेबसाइट देखें' : 'Continue to Website'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
