'use client';

import React, { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { INITIAL_GALLERY } from '@/data/initialData';
import { GalleryItem } from '@/types';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  // Fetch live gallery items from API (Supabase / Local storage)
  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setItems(data.data);
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

  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* MINIMALIST HEADER MATCHING DESIGN REFERENCE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            GALLERY
          </h1>
        </div>
      </div>

      {/* GALLERY GRID */}
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryList.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className="group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-neutral-300/40"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="text-base sm:text-lg font-medium tracking-wide text-neutral-100 drop-shadow-sm group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  {item.candidateName && (
                    <p className="text-xs text-amber-300 font-semibold mt-0.5 line-clamp-1">
                      {item.candidateName} {item.postOrCompany ? `• ${item.postOrCompany}` : ''}
                    </p>
                  )}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg border border-white/10"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Preview Container */}
            <div className="relative bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Details Footer */}
            <div className="p-6 bg-neutral-900 text-white space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {activePhoto.title}
                </h3>
                {activePhoto.date && (
                  <span className="text-xs text-neutral-400 font-medium shrink-0">
                    {activePhoto.date}
                  </span>
                )}
              </div>

              {activePhoto.candidateName && (
                <div className="bg-neutral-950 border border-neutral-800 p-3 sm:p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Candidate / Student</p>
                    <p className="text-sm sm:text-base font-bold text-amber-400">{activePhoto.candidateName}</p>
                  </div>
                  {activePhoto.postOrCompany && (
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Selected In</p>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-200">{activePhoto.postOrCompany}</p>
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
