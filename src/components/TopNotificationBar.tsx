'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Globe, MessageCircle, Video } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TopNotificationBar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="hidden sm:block bg-[#e31b23] text-white text-xs font-semibold py-2 relative z-40 border-b border-red-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Contact Info */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <a href="tel:+919680505554" className="flex items-center gap-1.5 hover:text-red-100 transition-colors">
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>{t('top.callUs', 'Call Us 24/7: +91 9680505554 | 8696715101')}</span>
          </a>
          <span className="hidden md:inline text-red-300">|</span>
          <a href="mailto:info@skfiresafety.in" className="hidden md:flex items-center gap-1.5 hover:text-red-100 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            <span>info@skfiresafety.in</span>
          </a>
        </div>

        {/* Right Social Links */}
        <div className="flex items-center gap-4 text-white/90 text-[11px]">
          <a href="https://wa.me/919680505554" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
            <MessageCircle className="w-3.5 h-3.5 text-green-300" />
            <span>{t('top.whatsapp', 'WhatsApp')}</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
            <Video className="w-3.5 h-3.5" />
            <span>YouTube</span>
          </a>
          <a href="/admission" className="flex items-center gap-1 hover:text-white transition-colors">
            <Globe className="w-3.5 h-3.5" />
            <span>{t('top.portal', 'Online Portal')}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
