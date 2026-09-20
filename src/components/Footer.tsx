'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import AcademyLogo from './AcademyLogo';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/80 font-sans">
      
      {/* Top CTA Banner - Clean Minimalist Style */}
      <div className="bg-neutral-900/60 border-b border-neutral-800/80 py-10 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-white uppercase">
              Ready to Join Shri Krishna Fire Academy?
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 max-w-xl font-normal">
              Enroll for Written Theory + 400m Physical Ground + Heavy Driving Trade Test Coaching (Paota, Jaipur).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/admission"
              className="bg-white text-neutral-950 hover:bg-neutral-200 font-medium px-5 py-2.5 text-xs rounded-xl transition-colors shadow-xs"
            >
              Book Admission
            </Link>
            <a
              href="https://wa.me/919680505554?text=Hello%20Shri%20Krishna%20Fire%20Academy,%20I%20want%20information%20regarding%20Fireman%20Admission."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 hover:bg-neutral-850 text-neutral-200 font-medium px-4 py-2.5 text-xs rounded-xl flex items-center gap-2 border border-neutral-700/80 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Helpline</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <AcademyLogo size="medium" variant="dark" />
            
            <p className="text-xs text-neutral-400 leading-relaxed pt-2">
              <strong>Shri Krishna Fire and Safety Academy</strong> (Paota, Jaipur) is Rajasthan&apos;s premier institute for Fireman, Fire Driver, Sub Fire Officer, and NCVT approved safety courses.
            </p>

            <div className="pt-2 text-xs text-neutral-400 space-y-0.5 border-t border-neutral-900">
              <p className="text-neutral-300 font-medium">Director: Sandeep Yadav (S.F.O.)</p>
              <p className="text-[11px] text-neutral-500">B.Tech, B.Sc. Fire & Safety, NCVT Approved</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-200 border-b border-neutral-800/80 pb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                  <span>Courses & Batches</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                  <span>About SK Academy</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                  <span>Gallery & Ground</span>
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                  <span>Latest Vacancies 2026</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-neutral-500" />
                  <span>Contact Helpline</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs Offered */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-200 border-b border-neutral-800/80 pb-3">
              Courses Offered
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>• Fireman Special Batch (10th Pass)</li>
              <li>• Fire Driver & Operator (HMV License)</li>
              <li>• Sub Fire Officer (SFO Graduate)</li>
              <li>• Health Sanitary Inspector (1 Year)</li>
              <li>• I.T.I Courses (NCVT Approved)</li>
              <li>• S.K. Computer Center (RS-CIT, PGDCA)</li>
            </ul>
          </div>

          {/* Col 4: Campus Address & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-200 border-b border-neutral-800/80 pb-3">
              Paota Jaipur Campus
            </h4>
            
            <div className="space-y-3.5 text-xs text-neutral-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Ram Vihar Colony, Near S.H.M. College, Paota, Jaipur, Rajasthan (303106)
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <div className="flex flex-col space-y-0.5">
                  <a href="tel:+919680505554" className="hover:text-white transition-colors text-neutral-200 font-medium">
                    +91 96805 05554
                  </a>
                  <a href="tel:+918696715101" className="hover:text-white transition-colors text-neutral-200 font-medium">
                    +91 86967 15101
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <a href="mailto:info@skfiresafety.com" className="hover:text-white transition-colors">
                  info@skfiresafety.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-neutral-900/90 border-t border-neutral-800/60 py-5 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Shri Krishna Fire and Safety Academy (Paota, Jaipur). All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
            <Link href="/admin" className="hover:text-white transition-colors">Admin Login</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Terms & Helplines</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
