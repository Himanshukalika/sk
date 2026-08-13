import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  Send,
  MessageCircle,
  Lock
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      {/* Top Banner / Quick Connect */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Ready to Wear the Fireman Uniform?
            </h3>
            <p className="text-red-100 text-sm mt-1">
              Join SK Fire Agency for Complete Written + Physical Ground + Mock Test Coaching.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admission"
              className="bg-white text-red-700 hover:bg-neutral-100 font-extrabold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              Get Admission Today
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20I%20want%20information%20regarding%20Fireman%20Coaching%20Admission."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900/80 hover:bg-neutral-900 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 text-sm border border-white/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Institute About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                <Flame className="w-6 h-6 text-amber-300" />
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                SK FIRE <span className="text-red-500">AGENCY</span>
              </span>
            </div>
            
            <p className="text-sm text-neutral-400 leading-relaxed">
              SK Fire Agency is India’s premier coaching institute dedicated solely to Fire Guard, Fireman, Fire Operator, and Fire & Safety competitive recruitment examinations and physical ground training.
            </p>

            <div className="pt-2">
              <div className="text-xs font-semibold uppercase text-neutral-400 tracking-wider mb-3">
                Connect on Social Media
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-red-600 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-pink-600 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-blue-600 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-sky-500 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-lg bg-neutral-900 hover:bg-green-600 text-neutral-400 hover:text-white flex items-center justify-center transition-colors border border-neutral-800"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-l-2 border-red-500 pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About Institute & Faculty
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-red-400 transition-colors">
                  All Courses & Batches
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="hover:text-red-400 transition-colors flex items-center gap-1.5 text-amber-400">
                  <span>Latest Fire Recruitment 2026</span>
                  <span className="bg-red-600 text-[10px] text-white px-1.5 py-0.2 rounded font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-red-400 transition-colors">
                  Online Admission Form
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-400 transition-colors">
                  Exam Guides & Syllabus Blogs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-red-400 transition-colors">
                  Ground & Classroom Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-red-400 transition-colors">
                  Selected Toppers & Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contact & Campus Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 border-l-2 border-red-500 pl-2.5">
              Target Batches
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses/fire-guard-course" className="hover:text-red-400 transition-colors">
                  Fire Guard Complete Batch
                </Link>
              </li>
              <li>
                <Link href="/courses/fireman-preparation" className="hover:text-red-400 transition-colors">
                  Fireman Selection Batch (DFS/CISF)
                </Link>
              </li>
              <li>
                <Link href="/courses/fire-operator-course" className="hover:text-red-400 transition-colors">
                  Fire Operator & Heavy Driver Batch
                </Link>
              </li>
              <li>
                <Link href="/courses/fire-safety-diploma" className="hover:text-red-400 transition-colors">
                  Fire & Safety Diploma Exam Prep
                </Link>
              </li>
              <li>
                <Link href="/courses/physical-training-intensive" className="hover:text-red-400 transition-colors">
                  Special Ground & Physical Batch
                </Link>
              </li>
              <li>
                <Link href="/courses/crash-course-fireman" className="hover:text-red-400 transition-colors">
                  45-Day Fast Track Crash Course
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Contact Details */}
          <div className="space-y-3.5">
            <h4 className="text-white font-bold text-base mb-4 border-l-2 border-red-500 pl-2.5">
              Campus & Head Office
            </h4>

            <div className="flex items-start gap-3 text-sm text-neutral-400">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>
                SK Fire Agency Campus, Near Police Line Ground, Defense Academy Road, Main Highway Circle, Sector 12
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <Phone className="w-4 h-4 text-red-500 shrink-0" />
              <a href="tel:+919876543210" className="hover:text-white transition-colors">
                +91 98765 43210, +91 98123 45678
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <a href="mailto:info@skfireagency.com" className="hover:text-white transition-colors">
                info@skfireagency.com / admissions@skfireagency.com
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-neutral-400">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Ground: 5:00 AM - 8:30 PM (Daily)</span>
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors py-1 px-2.5 rounded bg-neutral-900 border border-neutral-800"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Staff Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Disclaimer Box */}
        <div className="mt-12 pt-6 border-t border-neutral-900 text-xs text-neutral-400 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/80 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p>
            <strong>Important Clarification:</strong> SK Fire Agency is a private educational and physical training institute dedicated to preparing candidates for competitive government and industrial fire service examinations (such as Fire Guard, Fireman, Fire Driver & Safety Sub-Officer). We provide classroom coaching, mock tests, and physical conditioning. We are not a government agency.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} SK Fire Agency. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-neutral-300">Privacy Policy</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-neutral-300">Terms of Admission</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-neutral-300">Help & Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
