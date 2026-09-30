'use client';

import React from 'react';
import Image from 'next/image';

export default function AcademyLogo({ 
  size = 'medium',
  variant = 'light',
  showText = true,
}: { 
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
  showText?: boolean;
}) {
  const imageDimensions = 
    size === 'small' ? { width: 44, height: 44, className: 'w-10 h-10' }
    : size === 'large' ? { width: 80, height: 80, className: 'w-16 h-16 sm:w-20 sm:h-20' }
    : { width: 64, height: 64, className: 'w-12 h-12 sm:w-14 sm:h-14' };

  const textClasses = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg sm:text-xl' : 'text-sm sm:text-base';
  const subTextClasses = size === 'small' ? 'text-[8px]' : 'text-[9px] sm:text-[10.5px]';
  const titleColor = variant === 'dark' ? 'text-white' : 'text-neutral-900';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group">
      {/* Official Brand Logo Emblem with High-Contrast Crisp Circular Base */}
      <div className={`relative shrink-0 flex items-center justify-center ${imageDimensions.className} ${
        variant === 'dark'
          ? 'bg-white rounded-full p-1 sm:p-1.5 shadow-[0_0_12px_rgba(255,255,255,0.2)] ring-2 ring-red-600/60 border border-white'
          : 'bg-white rounded-full p-1 shadow-sm ring-1 ring-neutral-200'
      } transition-all duration-200 group-hover:scale-105 group-hover:ring-red-600`}>
        <Image
          src="/logo-clean.png?v=5"
          alt="Shri Krishna Fire and Safety Academy Logo"
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="object-contain w-full h-full drop-shadow-sm"
          priority
          unoptimized
        />
      </div>

      {/* Typography Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
            <span className={`font-black tracking-tight ${titleColor} ${textClasses}`}>
              SHRI KRISHNA <span className="text-red-600">FIRE</span>
            </span>
            <span className="bg-red-600 text-white text-[8px] sm:text-[9.5px] font-black px-1.5 py-0.5 rounded-md tracking-wider uppercase shadow-sm">
              PAOTA
            </span>
          </div>
          <span className={`${subTextClasses} font-extrabold text-neutral-300 tracking-wider uppercase mt-1.5`}>
            Safety & Physical Academy
          </span>
        </div>
      )}
    </div>
  );
}

