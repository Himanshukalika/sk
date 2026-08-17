'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import AcademyLogo from './AcademyLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Vacancies', href: '/recruitment' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-neutral-200/80 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <AcademyLogo size="medium" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-wider transition-colors duration-150 relative py-1 ${
                    isActive
                      ? 'text-neutral-900 font-bold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/admission"
              className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-xs font-medium transition-all shadow-xs"
            >
              Book Admission
            </Link>
          </div>

          {/* Mobile Hamburger Button Only */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-neutral-900 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200/80 px-5 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                  isActive ? 'bg-neutral-100 text-neutral-900 font-bold' : 'text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Admission Button inside Mobile Menu Drawer */}
          <div className="pt-2">
            <Link
              href="/admission"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              Book Online Admission
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
