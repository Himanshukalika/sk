'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import AcademyLogo from './AcademyLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, toggleLanguage, setIsInitialModalOpen, t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: t('nav.about', 'About'), href: '/about' },
    { name: t('nav.courses', 'Courses'), href: '/courses' },
    { name: t('nav.gallery', 'Gallery'), href: '/gallery' },
    { name: t('nav.vacancies', 'Vacancies'), href: '/recruitment' },
    { name: t('nav.testimonials', 'Reviews'), href: '/testimonials' },
    { name: t('nav.contact', 'Contact'), href: '/contact' }
  ];

  return (
    <header className="bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/90 sticky top-0 z-50 transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <AcademyLogo size="medium" variant="dark" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wider transition-colors duration-150 relative py-1 ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons (Language Switcher + Admission CTA) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-0.5 shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                <span>EN</span>
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                  language === 'hi'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="हिन्दी में बदलें"
              >
                <span>हिन्दी</span>
              </button>
            </div>

            {/* Admission Button */}
            <Link
              href="/admission"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/25 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('nav.admissionBtn', 'Book Admission')}</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Quick Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-red-500" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-5 pt-3 pb-6 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 text-xs">
            <span className="font-bold text-neutral-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-red-500" />
              <span>{language === 'en' ? 'Language' : 'भाषा'}</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  language === 'en' ? 'bg-red-600 text-white' : 'text-neutral-400'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  language === 'hi' ? 'bg-red-600 text-white' : 'text-neutral-400'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                    isActive ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Admission Button inside Mobile Menu Drawer */}
          <div className="pt-2">
            <Link
              href="/admission"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/25 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t('nav.admissionBtn', 'Book Online Admission')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

