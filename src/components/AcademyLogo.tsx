'use client';

import React from 'react';
import { Flame } from 'lucide-react';

export default function AcademyLogo({ 
  size = 'medium',
  variant = 'light'
}: { 
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
}) {
  const containerClasses = size === 'small' ? 'w-8 h-8' : size === 'large' ? 'w-13 h-13' : 'w-10 h-10 sm:w-11 sm:h-11';
  const textClasses = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg sm:text-xl' : 'text-xs sm:text-base';
  const titleColor = variant === 'dark' ? 'text-white' : 'text-neutral-900';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      {/* Visual Shield Emblem */}
      <div className={`${containerClasses} rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#d32f2f] via-neutral-900 to-[#0288d1] p-0.5 shadow-xs flex items-center justify-center relative group shrink-0`}>
        <div className="w-full h-full bg-neutral-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center relative overflow-hidden border border-amber-500/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,169,244,0.3),transparent_70%)]" />
          
          {/* Flame Icon */}
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 z-10" />

          {/* Badge accent */}
          <span className="absolute bottom-0.5 text-[6px] sm:text-[7px] font-black text-cyan-300 tracking-tighter z-10 uppercase">
            SK FIRE
          </span>
        </div>
      </div>

      {/* Typography Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${titleColor} ${textClasses}`}>
            SHRI KRISHNA <span className="text-red-500">FIRE</span>
          </span>
          <span className="bg-red-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
            PAWTA
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-semibold text-neutral-400 tracking-wider uppercase mt-1">
          Safety & Physical Academy
        </span>
      </div>
    </div>
  );
}
