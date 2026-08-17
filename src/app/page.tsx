'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Shield,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  FileText,
  Building,
  Target,
  Trophy,
  User,
  Anchor,
  Settings,
  Ship,
  Bell,
  Globe,
  Star
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import RecruitmentCard from '@/components/RecruitmentCard';
import AdmissionModal from '@/components/AdmissionModal';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_BLOGS } from '@/data/initialData';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('fire-guard-course');

  const handleOpenModal = (slug?: string) => {
    if (slug) setSelectedCourseSlug(slug);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-neutral-800">
      
      {/* 1. HERO BANNER SECTION (FIREAID STYLE) */}
      <section className="relative bg-neutral-950 text-white min-h-[80vh] flex items-center justify-center overflow-hidden py-24 px-4">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=1920')` 
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/80" />

        {/* Center Content Container with Red Frame Box */}
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          <div className="border-4 border-[#e31b23] p-8 sm:p-12 lg:p-16 bg-neutral-950/60 backdrop-blur-xs shadow-2xl relative">
            
            {/* Top Tagline */}
            <p className="text-[#f1c40f] font-bold text-sm sm:text-xl uppercase tracking-widest mb-3">
              Shri Krishna Fire & Safety Academy • Pawta (Jaipur)
            </p>

            {/* Main High-Impact Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase leading-none mb-4">
              WHERE EXPERIENCE COUNTS
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-200 text-sm sm:text-lg max-w-2xl mx-auto font-medium mb-8">
              Training for Life Safety • Rajasthan&apos;s #1 Academy for Fireman, Fire Driver & Sub Fire Officer Preparation
            </p>

            {/* Two Side-by-Side FireAid Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenModal('fire-guard-course')}
                className="w-full sm:w-auto px-8 py-4 bg-[#f1c40f] hover:bg-[#f39c12] text-neutral-950 font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
              >
                EXPLORE OUR SERVICES
              </button>

              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-4 bg-[#e31b23] hover:bg-red-700 text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
              >
                EXPLORE OUR COURSES
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. YELLOW FULL-WIDTH RIBBON CTA BAR (FIREAID STYLE) */}
      <section className="bg-[#f39c12] text-neutral-950 py-7 px-4 border-b border-amber-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-950">
              View and Book One of Our NCVT Approved Fire & Safety Courses!
            </h2>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-8 py-3.5 bg-[#2c3e50] hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest shadow-md transition-colors shrink-0"
          >
            BOOK NOW
          </button>
        </div>
      </section>

      {/* 3. SPECIALISTS IN SAFETY AND SECURITY TRAINING (FIREAID FEATURE CARDS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-800 tracking-tight">
              Specialists In Safety and Security Training
            </h2>
            <div className="w-20 h-1 bg-[#f39c12] mx-auto" />
            <p className="text-neutral-500 text-sm sm:text-base pt-2">
              Shri Krishna Fire and Safety Academy is Rajasthan&apos;s leading training center for Fireman, Fire Driver, and Sub Fire Officer competitive examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1: Training */}
            <div className="bg-[#f8f9fa] p-8 rounded-2xl text-center border border-neutral-200/80 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between group">
              <div>
                <div className="w-16 h-16 rounded-full bg-neutral-800 text-[#f39c12] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <User className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-neutral-800 mb-3">
                  Training
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  NCVT approved theoretical coaching delivered by experienced faculties & ex-Fire Officers at highly competitive fee structures.
                </p>
              </div>
            </div>

            {/* Card 2: Onboard Drills */}
            <div className="bg-[#f8f9fa] p-8 rounded-2xl text-center border border-neutral-200/80 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between group">
              <div>
                <div className="w-16 h-16 rounded-full bg-neutral-800 text-[#f39c12] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Anchor className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-neutral-800 mb-3">
                  Onboard Drills
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Practical fire fighting training on our own Fire Tender vehicle, centrifugal pumps, and hose coupling trade drills.
                </p>
              </div>
            </div>

            {/* Card 3: Other Services */}
            <div className="bg-[#f8f9fa] p-8 rounded-2xl text-center border border-neutral-200/80 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between group">
              <div>
                <div className="w-16 h-16 rounded-full bg-neutral-800 text-[#f39c12] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Settings className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-neutral-800 mb-3">
                  Other Services
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  S.K. Gym (Separate Gym for Boys & Girls), 400m physical ground, 60kg dummy carry, and computer certification lab.
                </p>
              </div>
            </div>

            {/* Card 4: Hostel & Superyacht */}
            <div className="bg-[#f8f9fa] p-8 rounded-2xl text-center border border-neutral-200/80 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between group">
              <div>
                <div className="w-16 h-16 rounded-full bg-neutral-800 text-[#f39c12] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Ship className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-neutral-800 mb-3">
                  Hostel & Placements
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Safe residential hostel with mess serving 3 daily meals, 24x7 study library, and 100% placement support in Govt & Corporate sectors.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. DARK PARALLAX STATS BANNER (FIREAID STYLE) */}
      <section className="relative bg-neutral-950 text-white py-24 overflow-hidden border-t border-b border-neutral-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1920')` 
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 text-[#f39c12] flex items-center justify-center mx-auto shadow-inner">
                <Bell className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-5xl font-black text-[#f39c12] font-mono">6/7</div>
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Days Physical Ground</div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 text-[#f39c12] flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-5xl font-black text-[#f39c12] font-mono">1st & 3rd</div>
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Rajasthan Topper Ranks</div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 text-[#f39c12] flex items-center justify-center mx-auto shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-5xl font-black text-[#f39c12] font-mono">1863+</div>
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Trained Cadets</div>
            </div>

            {/* Stat 4 */}
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-700 text-[#f39c12] flex items-center justify-center mx-auto shadow-inner">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-5xl font-black text-[#f39c12] font-mono">100%</div>
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Placement Assistance</div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SOME OF OUR COURSES AND SERVICES (FIREAID SHOWCASE GRID) */}
      <section className="py-20 bg-slate-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-800 tracking-tight">
              Some of Our Courses and Services
            </h2>
            <div className="w-20 h-1 bg-[#f39c12] mx-auto" />
            <p className="text-neutral-500 text-sm">
              Explore our flagship programs designed for Fire Guard, Fireman, Fire Driver, and Sub Fire Officer aspirants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Showcase Image Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md group border border-neutral-200 flex flex-col justify-between">
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=800" 
                  alt="Fireman Batch"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-lg font-bold text-[#f39c12] uppercase tracking-wider">
                    FIREMAN BATCH (फायरमैन)
                  </h3>
                </div>
              </div>
              <div className="p-6 text-center space-y-4">
                <p className="text-xs text-neutral-600">
                  10th Pass eligibility • Written theory + 400m ground physicals + 60kg dummy weight carry training.
                </p>
                <button
                  onClick={() => handleOpenModal('fire-guard-course')}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-[#e31b23] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  VIEW DETAILS & BOOK
                </button>
              </div>
            </div>

            {/* Showcase Image Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md group border border-neutral-200 flex flex-col justify-between">
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=800" 
                  alt="Fire Driver Batch"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-lg font-bold text-[#f39c12] uppercase tracking-wider">
                    FIRE DRIVER (फायर ड्राइवर)
                  </h3>
                </div>
              </div>
              <div className="p-6 text-center space-y-4">
                <p className="text-xs text-neutral-600">
                  Heavy HMV Driving license + Figure &apos;8&apos; ramp driving test & centrifugal fire pump mechanics.
                </p>
                <button
                  onClick={() => handleOpenModal('fire-operator-course')}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-[#e31b23] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  VIEW DETAILS & BOOK
                </button>
              </div>
            </div>

            {/* Showcase Image Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md group border border-neutral-200 flex flex-col justify-between">
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" 
                  alt="Sub Fire Officer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <h3 className="text-lg font-bold text-[#f39c12] uppercase tracking-wider">
                    SUB FIRE OFFICER (SFO)
                  </h3>
                </div>
              </div>
              <div className="p-6 text-center space-y-4">
                <p className="text-xs text-neutral-600">
                  Graduate degree eligibility • 9-month advance diploma in fire technology & safety leadership.
                </p>
                <button
                  onClick={() => handleOpenModal('sub-fire-officer-course')}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-[#e31b23] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  VIEW DETAILS & BOOK
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS SECTION (FIREAID STYLE) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-800 tracking-tight">
              Latest News & Notifications
            </h2>
            <div className="w-20 h-1 bg-[#f39c12] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_BLOGS.slice(0, 3).map((blog) => (
              <div key={blog.id} className="bg-[#f8f9fa] border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video overflow-hidden bg-neutral-900 flex items-center justify-center text-white">
                    <Flame className="w-10 h-10 text-amber-500" />
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[10px] font-bold uppercase text-[#e31b23] tracking-widest block">
                      {blog.publishedAt} • {blog.category}
                    </span>
                    <h3 className="font-bold text-base text-neutral-900 leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#e31b23] hover:underline uppercase tracking-wider"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. TRUSTED PARTNERS & ACCREDITATIONS (FIREAID STYLE) */}
      <section className="py-16 bg-slate-50 border-t border-neutral-200 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="text-xl font-light text-neutral-700 uppercase tracking-widest">
            Trusted Partners & Accreditations
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80">
            <div className="px-6 py-3 bg-white border border-neutral-200 rounded-xl shadow-xs font-bold text-xs text-neutral-800">
              NCVT Approved (Govt of India)
            </div>
            <div className="px-6 py-3 bg-white border border-neutral-200 rounded-xl shadow-xs font-bold text-xs text-neutral-800">
              State Fire Services Recognized
            </div>
            <div className="px-6 py-3 bg-white border border-neutral-200 rounded-xl shadow-xs font-bold text-xs text-neutral-800">
              S.K. GYM & Fitness Hub
            </div>
            <div className="px-6 py-3 bg-white border border-neutral-200 rounded-xl shadow-xs font-bold text-xs text-neutral-800">
              S.K. Computer Center (RS-CIT)
            </div>
          </div>
        </div>
      </section>

      {/* ADMISSION LIGHTBOX MODAL */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />

    </div>
  );
}
