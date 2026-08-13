'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  Menu,
  X,
  PhoneCall,
  GraduationCap,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Vacancies', href: '/recruitment', badge: 'NEW' },
    { name: 'Blogs', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200 py-1' 
        : 'bg-white border-b border-neutral-200 py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-amber-600 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-amber-200 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-neutral-900">
                  SK FIRE <span className="text-red-600">AGENCY</span>
                </span>
                <span className="bg-red-100 text-red-700 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">
                  Coaching
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 tracking-wide mt-0.5">
                Fire Guard, Fireman & Operator Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-red-600 bg-red-50 shadow-xs'
                      : 'text-neutral-700 hover:text-red-600 hover:bg-neutral-50'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 text-xs xl:text-sm font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2.5 rounded-xl transition-all whitespace-nowrap border border-neutral-200/60"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Call Us</span>
            </a>

            <Link
              href="/admission"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs xl:text-sm shadow-md shadow-red-600/30 hover:shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Apply Online</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
              </span>
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/admission"
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black shadow-sm flex items-center gap-1"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Apply</span>
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-xl text-neutral-700 hover:text-red-600 hover:bg-neutral-100 focus:outline-none transition-colors border border-neutral-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-full uppercase font-black">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
            <Link
              href="/admission"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Fill Online Admission Form</span>
            </Link>

            <a
              href="tel:+919876543210"
              className="w-full text-center py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Call Helpline (+91 98765 43210)</span>
            </a>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center justify-center gap-1.5 py-1.5 text-center font-medium"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Staff Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
