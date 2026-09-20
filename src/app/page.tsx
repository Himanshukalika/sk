'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Star,
  Play,
  Phone,
  MessageSquare,
  HelpCircle,
  Camera,
  Video,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import RecruitmentCard from '@/components/RecruitmentCard';
import AdmissionModal from '@/components/AdmissionModal';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_BLOGS, INITIAL_GALLERY, INITIAL_SETTINGS } from '@/data/initialData';
import { GalleryItem, SiteSettings } from '@/types';
import { getYouTubeEmbedUrl } from '@/lib/videoUtils';

const DEFAULT_CANDIDATES = [
  {
    name: 'JOGINDER',
    post: 'DCPO',
    dept: 'Driver Cum Pump Operator',
    image: '/images/candidate-joginder.jpg'
  },
  {
    name: 'AMIT KUMAR SWAMI',
    post: 'FIREMAN',
    dept: 'State Fire Service',
    image: '/images/candidate-amit.jpg'
  },
  {
    name: 'RAMESH PURI',
    post: 'FIRE OFFICER',
    dept: 'Delhi Fire Service (DFS)',
    image: '/images/candidate-ramesh.jpg'
  },
  {
    name: 'VUPIN KUMAR',
    post: 'FIREMAN',
    dept: 'Delhi Fire Service',
    image: '/images/candidate-vupin.jpg'
  },
  {
    name: 'ANKIT KUMAWAT',
    post: 'SAFETY OFFICER',
    dept: 'Mumbai Industrial Area (MH)',
    image: '/images/candidate-ankit.jpg'
  }
];

const DEFAULT_GALLERY_THUMBS = [
  { src: '/images/training-thumb-1.jpg', title: 'Smart Classroom Lecture' },
  { src: '/images/campus-building.jpg', title: 'Academy Batch Formation' },
  { src: '/images/training-thumb-3.jpg', title: 'Fire Extinguisher Drills' },
  { src: '/images/training-thumb-4.jpg', title: 'Stretcher & First Aid Rescue' },
  { src: '/images/training-thumb-5.jpg', title: 'Live Safety Demonstration' },
  { src: '/images/training-thumb-6.jpg', title: 'Fire Hose & Nozzle Drills' },
  { src: '/images/training-thumb-7.jpg', title: 'Theory & Study Session' }
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('fire-guard-course');
  const [liveGallery, setLiveGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  // Fetch live items from Supabase/API and settings
  React.useEffect(() => {
    async function loadInitialData() {
      try {
        const [galleryRes, settingsRes] = await Promise.allSettled([
          fetch('/api/gallery'),
          fetch('/api/settings')
        ]);

        if (galleryRes.status === 'fulfilled') {
          const gData = await galleryRes.value.json();
          if (gData.success && gData.data && gData.data.length > 0) {
            setLiveGallery(gData.data);
          }
        }

        if (settingsRes.status === 'fulfilled') {
          const sData = await settingsRes.value.json();
          if (sData.success && sData.data) {
            setSiteSettings(sData.data);
          }
        }
      } catch (err) {
        console.error('Failed to load live data on homepage:', err);
      }
    }
    loadInitialData();
  }, []);

  // Compute live candidates (Govt / Private Selections or items with candidateName)
  const candidateSelections = React.useMemo(() => {
    const fromDb = liveGallery.filter(
      item =>
        item.candidateName ||
        item.category === 'govt_selection' ||
        item.category === 'private_selection' ||
        item.section === 'govt' ||
        item.section === 'private'
    );

    const formattedDb = fromDb.map(item => ({
      name: item.candidateName || item.title,
      post: item.postOrCompany ? item.postOrCompany.split('(')[0].trim() : (item.category === 'govt_selection' ? 'FIRE SERVICE' : 'SAFETY OFFICER'),
      dept: item.postOrCompany || (item.category === 'govt_selection' ? 'Govt Fire Department' : 'Corporate Safety Wing'),
      image: item.imageUrl
    }));

    // Put new uploaded candidates at the top and keep default templates
    const combined = [...formattedDb, ...DEFAULT_CANDIDATES];
    const seen = new Set<string>();
    const unique = combined.filter(c => {
      const key = (c.name || '').toLowerCase().trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique.slice(0, 10);
  }, [liveGallery]);

  // Compute live ground action photos (Training, Drills, Ground, Classroom, etc.)
  const groundActionThumbs = React.useMemo(() => {
    const fromDb = liveGallery.filter(
      item =>
        item.category === 'ground' ||
        item.category === 'drills' ||
        item.category === 'classroom' ||
        item.category === 'celebration' ||
        item.category === 'hostel' ||
        item.section === 'training'
    );

    const formattedDb = fromDb.map(item => ({
      src: item.imageUrl,
      title: item.title
    }));

    // Put new uploaded ground photos first and keep default thumbs
    const combined = [...formattedDb, ...DEFAULT_GALLERY_THUMBS];
    const seen = new Set<string>();
    const unique = combined.filter(g => {
      const key = (g.src || '').toLowerCase().trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return unique.slice(0, 7);
  }, [liveGallery]);

  const handleOpenModal = (slug?: string) => {
    if (slug) setSelectedCourseSlug(slug);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-neutral-800">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-neutral-950 text-white min-h-[75vh] flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 transform scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('/images/fire-drill-action.jpg')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/85" />

        {/* Center Content Container with Red Frame Box */}
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
          <div className="border-4 border-[#e31b23] p-8 sm:p-12 lg:p-16 bg-neutral-950/70 backdrop-blur-xs shadow-2xl relative">
            
            {/* Top Tagline */}
            <p className="text-[#f1c40f] font-bold text-sm sm:text-xl uppercase tracking-widest mb-3">
              Shri Krishna Fire & Safety Academy • Paota (Jaipur)
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

      {/* 2. YELLOW FULL-WIDTH RIBBON CTA BAR */}
      <section className="bg-[#f39c12] text-neutral-950 py-6 px-4 border-b border-amber-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-950">
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

      {/* 3. ABOUT US - SHRI KRISHNA FIRE & SAFETY ACADEMY (MATCHING REFERENCE) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col: Real Campus Building & Batch Photo */}
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-100 bg-neutral-900">
                <Image
                  src="/images/campus-hero-banner.jpg"
                  alt="Shri Krishna Fire & Safety Academy Campus Building and Cadets"
                  width={900}
                  height={550}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded tracking-wider">
                    Main Campus • Paota (Jaipur)
                  </span>
                  <p className="text-xs font-semibold text-neutral-200 mt-1">
                    State-of-the-Art Training Facilities & 400m Athletic Ground
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: About Us Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
                  About Us – Shri Krishna Fire & Safety Academy
                </h2>
                <p className="text-red-600 italic font-semibold text-sm sm:text-base mt-1.5">
                  Building Future Safety Professionals Through Quality Education & Practical Training
                </p>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                <p>
                  <strong>Shri Krishna Fire & Safety Academy</strong> is one of Rajasthan&apos;s leading institutes dedicated to Fire Engineering, Industrial Safety, Health, Safety & Environment (HSE), and Emergency Response education. With our Main Campus in <strong>Paota, Jaipur</strong>, we are committed to developing skilled safety professionals through high-quality education, practical training, and industry-oriented learning.
                </p>
                <p>
                  Our mission is to create competent professionals who can contribute to safer workplaces, industries, and communities. We combine classroom learning with hands-on practical training using modern firefighting equipment, emergency response techniques, industrial safety practices, rescue operations, first aid, and disaster management.
                </p>
                <p>
                  Our experienced faculty and practical training methodology help students develop the confidence, technical knowledge, and professional skills required to succeed in Government and Private Sector Fire & Safety careers.
                </p>
              </div>

              {/* What Sets Us Apart Checklist */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2.5">
                  What sets Shri Krishna Academy apart is our unwavering focus on:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Skill development with discipline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live fire fighting & rescue drills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>400m physical ground & gym</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Recruitment & placement support</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider"
                >
                  <span>Read Full Institutional Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. STATS COUNTER & 7-PHOTO PRACTICAL TRAINING SHOWCASE GALLERY */}
      <section className="py-14 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 4 Key Stat Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-12">
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-neutral-900">2014</div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">YEAR FOUNDED</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-red-600">20+</div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">CERTIFIED INSTRUCTORS</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-neutral-900">750+</div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">GRADUATED CADETS</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-5xl font-black text-emerald-600">126+</div>
              <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest">GOVT FIRE SELECTIONS</div>
            </div>
          </div>

          {/* 7-Photo Real Ground Action Showcase Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-8">
            {groundActionThumbs.map((thumb, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-neutral-900 aspect-square border border-neutral-200"
              >
                <img
                  src={thumb.src}
                  alt={thumb.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 text-center justify-center">
                  <span className="text-[10px] text-white font-bold leading-tight">
                    {thumb.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtitle & Invite */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Join a High-Impact Learning Community at Shri Krishna Fire & Safety Academy
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Immerse yourself in a world-class training curriculum with practical firefighting drills, rescue simulations, and physical ground workouts. Our diverse programs help you gain real-world competence on fire safety and emergency management, preparing you for a successful career in the safety industry.
            </p>
          </div>

        </div>
      </section>

      {/* 5. PLACEMENT & OPPORTUNITIES - CANDIDATE SELECTION CARDS (MATCHING REFERENCE) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Placement & Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Shri Krishna Fire & Safety Academy has successfully trained and placed students in <strong>Government Fire Services, Rajasthan Fire Brigade, Delhi Fire Service (DFS), CISF, Airport Authority, Oil & Gas Sector, and Multinational Companies</strong> across India.
            </p>
          </div>

          {/* Real Candidate Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {candidateSelections.map((cand, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group text-center"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                  <img
                    src={cand.image}
                    alt={cand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                      Selected
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-black text-sm text-neutral-900 uppercase tracking-tight line-clamp-1">
                    {cand.name}
                  </h3>
                  <div className="text-[11px] font-bold text-red-600 uppercase line-clamp-1">
                    {cand.post}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-medium line-clamp-1">
                    {cand.dept}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>View All 750+ Selection Records</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. WATCH LIVE CAMPUS TOUR & DIRECTOR DESK (MATCHING REFERENCE) */}
      <section className="py-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Director Video Desk Photo with Play Icon & Helpline */}
            <div className="lg:col-span-6 relative group">
              <div 
                onClick={() => setIsVideoModalOpen(true)}
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-neutral-800 bg-black cursor-pointer group"
              >
                <img
                  src={siteSettings.tourVideoThumbnail || '/images/director-campus-tour.jpg'}
                  alt={siteSettings.tourVideoTitle || 'Watch Live Campus Tour - Director Desk'}
                  className="w-full h-auto max-h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-18 h-18 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 transition-all duration-300 ring-4 ring-white/30">
                    <Play className="w-8 h-8 ml-1 fill-white" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 border border-neutral-800 flex items-center gap-1.5 shadow">
                  <Video className="w-3.5 h-3.5 text-red-500" />
                  <span>Click to Watch Video Tour</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-neutral-950/95 py-2.5 px-4 text-center text-xs text-neutral-300 font-medium border-t border-neutral-800">
                  <span>Shri Krishna Fire & Safety Academy (Paota) || Helpline: </span>
                  <a href={`tel:${(siteSettings.tourVideoHelpline || '+919680505554').replace(/\s+/g, '')}`} className="text-amber-400 font-bold hover:underline" onClick={(e) => e.stopPropagation()}>
                    {siteSettings.tourVideoHelpline || '+91 96805 05554'}
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Live Campus Tour Narrative */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
                <span>Want to Join With Us?</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight uppercase">
                {siteSettings.tourVideoHeading || 'WATCH LIVE CAMPUS TOUR'}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Experience the vibrant atmosphere of our campus with our Live Campus Tour! Explore state-of-the-art facilities, 400m athletic physical training ground, operational fire tender vehicle, and interactive classroom sessions that give you a firsthand glimpse into the life of our cadets. Witness the dedication to excellence in fire and safety education.
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Want to join with us? Enroll today to kickstart your journey towards a rewarding career in government safety services and emergency management. Don&apos;t miss this opportunity to be part of Rajasthan&apos;s leading training academy.
              </p>

              <div className="pt-3 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Campus Video</span>
                </button>
                <button
                  onClick={() => handleOpenModal()}
                  className="px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-neutral-700"
                >
                  Book Campus Visit
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. QUICK ACTION ICON NAVIGATION STRIP (MATCHING REFERENCE) */}
      <section className="bg-white border-b border-neutral-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            
            <Link 
              href="/contact"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <MessageSquare className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">Post Feedback</span>
            </Link>

            <Link 
              href="/gallery"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <Camera className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">Photo Gallery</span>
            </Link>

            <Link 
              href="/about"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <Trophy className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">Award & Selections</span>
            </Link>

            <Link 
              href="/gallery"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <Video className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">Media Space</span>
            </Link>

            <Link 
              href="/blog"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <HelpCircle className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">FAQ&apos;s</span>
            </Link>

            <Link 
              href="/testimonials"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <FileText className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">Testimonials</span>
            </Link>

            <a 
              href="tel:+919680505554"
              className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
            >
              <PhoneCall className="w-5 h-5 text-neutral-700 group-hover:text-red-600 mb-1.5 transition-colors" />
              <span className="text-xs font-bold text-neutral-800">Customer Care</span>
            </a>

          </div>
        </div>
      </section>

      {/* 8. FEATURED TARGET COURSES */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              Featured Academy Coaching Batches
            </h2>
            <div className="w-20 h-1 bg-[#e31b23] mx-auto" />
            <p className="text-neutral-600 text-sm sm:text-base">
              Intensive theoretical classroom teaching, physical endurance drills, and driving trade test preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_COURSES.slice(0, 6).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onApply={(slug) => handleOpenModal(slug)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-colors shadow-lg"
            >
              <span>Explore All Courses & Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 9. RECRUITMENT NOTICES BOARD */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-wider mb-2">
                <Bell className="w-4 h-4" />
                <span>Live Vacancies Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Latest Fire & Safety Job Recruitment Alerts 2026
              </h2>
            </div>

            <Link
              href="/recruitment"
              className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>View All Recruitment Notices</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_RECRUITMENTS.slice(0, 3).map((item) => (
              <RecruitmentCard key={item.id} notice={item} />
            ))}
          </div>

        </div>
      </section>

      {/* Quick Admission Modal Component */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />

      {/* Live Campus Tour YouTube Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div 
            className="bg-neutral-950 rounded-3xl max-w-4xl w-full border border-neutral-800 shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-neutral-900 flex items-center justify-between border-b border-neutral-800 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    {siteSettings.tourVideoTitle || 'Watch Live Campus Tour'}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-medium">Shri Krishna Fire & Safety Academy (Paota, Jaipur)</p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close video player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 16:9 Video Player Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {siteSettings.tourVideoUrl ? (
                <iframe
                  src={getYouTubeEmbedUrl(siteSettings.tourVideoUrl, true)}
                  title={siteSettings.tourVideoTitle || 'Campus Tour Video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="text-center p-8 text-neutral-400 text-xs">
                  No video URL configured. Please configure in the Admin Panel.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-neutral-300 font-medium text-center sm:text-left">
                <span>Direct Admission & Campus Visit Helpline: </span>
                <a 
                  href={`tel:${(siteSettings.tourVideoHelpline || '+919680505554').replace(/\s+/g, '')}`} 
                  className="text-amber-400 font-black hover:underline"
                >
                  {siteSettings.tourVideoHelpline || '+91 96805 05554'}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    handleOpenModal();
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl text-xs transition-colors shadow-sm"
                >
                  Apply for Admission
                </button>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
