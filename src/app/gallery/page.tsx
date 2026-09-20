'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Trophy,
  ShieldCheck,
  Flame,
  Building,
  Briefcase,
  Layers,
  Sparkles,
  Calendar,
  UserCheck
} from 'lucide-react';
import { INITIAL_GALLERY } from '@/data/initialData';
import { GalleryItem } from '@/types';

const CATEGORIES = [
  { id: 'all', label: 'All Photos', icon: Layers },
  { id: 'govt_selection', label: 'Govt Selections', icon: Trophy },
  { id: 'drills', label: 'Live Fire Drills', icon: Flame },
  { id: 'ground', label: 'Ground & Physicals', icon: ShieldCheck },
  { id: 'classroom', label: 'Campus & Classroom', icon: Building },
  { id: 'private_selection', label: 'Industrial Placements', icon: Briefcase }
];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Fetch live gallery items from API (with fallback and merge with INITIAL_GALLERY)
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const apiIds = new Set(data.data.map((d: GalleryItem) => d.id));
          const remainingInitial = INITIAL_GALLERY.filter(item => !apiIds.has(item.id));
          setItems([...data.data, ...remainingInitial]);
        }
      } catch (err) {
        console.error('Failed to fetch live gallery items:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const galleryList = items && items.length > 0 ? items : INITIAL_GALLERY;

  const filteredList = useMemo(() => {
    if (activeCategory === 'all') return galleryList;
    return galleryList.filter((item) => item.category === activeCategory);
  }, [galleryList, activeCategory]);

  const activePhoto = activePhotoIndex !== null ? filteredList[activePhotoIndex] : null;

  const handlePrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredList.length - 1));
    }
  }, [activePhotoIndex, filteredList.length]);

  const handleNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! < filteredList.length - 1 ? prev! + 1 : 0));
    }
  }, [activePhotoIndex, filteredList.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setActivePhotoIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handlePrev, handleNext]);

  return (
    <div className="bg-slate-50 min-h-screen text-neutral-900 pb-28 font-sans">
      
      {/* 1. HEADER SECTION */}
      <section className="bg-neutral-950 text-white pt-12 pb-14 px-6 sm:px-10 lg:px-12 border-b border-neutral-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest bg-neutral-900 px-3.5 py-1.5 rounded-full border border-neutral-800 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Life At Shri Krishna Fire & Safety Academy</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                Photo Gallery & <span className="text-red-500">Hall of Fame</span>
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-2xl">
                Explore real ground workouts, 60kg dummy lifting drills, live fire pump operations, smart classrooms, and candidate selection milestones.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-4 bg-neutral-900/80 border border-neutral-800 px-5 py-3 rounded-2xl">
              <div>
                <span className="text-2xl font-black text-white">{filteredList.length}</span>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Photos In View
                </p>
              </div>
              <div className="w-[1px] h-8 bg-neutral-800" />
              <div>
                <span className="text-2xl font-black text-amber-400">750+</span>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Alumni Placed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' 
              ? galleryList.length 
              : galleryList.filter(i => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActivePhotoIndex(null);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-md'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'text-neutral-500'}`} />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-100 text-neutral-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="aspect-[4/3] rounded-2xl bg-neutral-200/70 animate-pulse"
              />
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 space-y-3">
            <Layers className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900">No photos found in this category</h3>
            <p className="text-xs text-neutral-500">Switch to another tab to view available gallery photos.</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl"
            >
              View All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredList.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActivePhotoIndex(idx)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-950 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-neutral-200/80"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  unoptimized
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-neutral-950/80 backdrop-blur-md text-white border border-neutral-700/80 text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg">
                    {item.category.replace('_', ' ')}
                  </span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <h3 className="text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  {item.candidateName ? (
                    <p className="text-xs text-emerald-400 font-bold mt-1 line-clamp-1 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>{item.candidateName} • {item.postOrCompany}</span>
                    </p>
                  ) : item.description ? (
                    <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  ) : null}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-10">
                  <span className="w-8 h-8 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. ENHANCED INTERACTIVE LIGHTBOX MODAL */}
      {activePhoto && activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-neutral-950 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Navigation & Close */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-400">
                  {activePhotoIndex + 1} of {filteredList.length}
                </span>
                <span className="bg-neutral-800 text-neutral-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                  {activePhoto.category.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors ml-2"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Image Preview Area */}
            <div className="relative bg-black flex items-center justify-center overflow-hidden flex-1 min-h-[350px] max-h-[60vh]">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                width={1200}
                height={800}
                className="w-full h-full max-h-[60vh] object-contain"
                unoptimized
              />

              {/* Float Left/Right Navigation Arrows on Large Screens */}
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-red-600 text-white items-center justify-center transition-colors border border-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-red-600 text-white items-center justify-center transition-colors border border-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Details Footer */}
            <div className="p-5 sm:p-6 bg-neutral-950 text-white space-y-3 border-t border-neutral-900">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {activePhoto.title}
                </h3>
                {activePhoto.date && (
                  <span className="text-xs text-neutral-400 font-medium shrink-0 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activePhoto.date}</span>
                  </span>
                )}
              </div>

              {activePhoto.candidateName && (
                <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Candidate / Selected Student</p>
                    <p className="text-sm sm:text-base font-bold text-amber-400">{activePhoto.candidateName}</p>
                  </div>
                  {activePhoto.postOrCompany && (
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Designation / Department</p>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-400">{activePhoto.postOrCompany}</p>
                    </div>
                  )}
                </div>
              )}

              {activePhoto.description && (
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activePhoto.description}
                </p>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
