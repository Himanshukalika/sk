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
    <header className="bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/90 sticky top-0 z-50 transition-all text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <AcademyLogo size="medium" variant="dark" />
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

          {/* Desktop Right Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/admission"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-600/25"
            >
              Book Admission
            </Link>
          </div>

          {/* Mobile Hamburger Button Only */}
          <div className="flex md:hidden items-center">
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
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-5 pt-3 pb-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                  isActive ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
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
              className="block w-full text-center bg-red-600 hover:bg-red-700 text-white px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-600/25 transition-colors"
            >
              Book Online Admission
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
