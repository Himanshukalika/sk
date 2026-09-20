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
    : size === 'large' ? { width: 72, height: 72, className: 'w-16 h-16 sm:w-20 sm:h-20' }
    : { width: 56, height: 56, className: 'w-12 h-12 sm:w-14 sm:h-14' };

  const textClasses = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg sm:text-xl' : 'text-xs sm:text-base';
  const subTextClasses = size === 'small' ? 'text-[8px]' : 'text-[9px] sm:text-[10px]';
  const titleColor = variant === 'dark' ? 'text-white' : 'text-neutral-900';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      {/* Official Brand Logo */}
      <div className={`relative shrink-0 flex items-center justify-center ${imageDimensions.className}`}>
        <Image
          src="/logo-clean.png?v=4"
          alt="Shri Krishna Fire and Safety Academy Logo"
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-105"
          priority
          unoptimized
        />
      </div>

      {/* Typography Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
            <span className={`font-black tracking-tight ${titleColor} ${textClasses}`}>
              SHRI KRISHNA <span className="text-red-600">FIRE</span>
            </span>
            <span className="bg-red-600 text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
              PAOTA
            </span>
          </div>
          <span className={`${subTextClasses} font-semibold text-neutral-400 tracking-wider uppercase mt-1`}>
            Safety & Physical Academy
          </span>
        </div>
      )}
    </div>
  );
}

