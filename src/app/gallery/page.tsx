'use client';

import React, { useState } from 'react';
import {
  X,
  ZoomIn
} from 'lucide-react';
import { INITIAL_GALLERY } from '@/data/initialData';
import { GalleryItem } from '@/types';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'ground', label: 'Physical Ground (400m Track & Dummy)' },
    { id: 'classroom', label: 'Classroom & Theory' },
    { id: 'drills', label: 'Live Fire Drills' },
    { id: 'celebration', label: 'Result Celebrations' },
    { id: 'hostel', label: 'Hostel & Campus' }
  ];

  const filteredItems = INITIAL_GALLERY.filter(item => {
    return selectedCategory === 'all' || item.category === selectedCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800 px-3.5 py-1.5 rounded-full inline-block">
            Campus Life & Training
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Photo & Training Gallery
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Glimpses of our 400m sprint workouts, 60kg dummy deadlift workshops, smart theory classrooms, and selected candidates felicitations.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-neutral-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-3 bg-red-600 rounded-full shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-extrabold text-sm text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-[11px] text-neutral-500 line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.date && (
                  <span className="text-[10px] text-neutral-400 block pt-1 font-medium">
                    {item.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-neutral-900/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />

            <div className="p-6 bg-neutral-900 text-white">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
                {activePhoto.category} • {activePhoto.date}
              </span>
              <h3 className="text-xl font-bold">{activePhoto.title}</h3>
              {activePhoto.description && (
                <p className="text-xs text-neutral-300 mt-1">{activePhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
