'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isInitialModalOpen: boolean;
  setIsInitialModalOpen: (open: boolean) => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Branding
    'top.callUs': 'Call Us 24/7: +91 9680505554 | 8696715101',
    'top.portal': 'Online Portal',
    'top.whatsapp': 'WhatsApp',
    'academy.name': 'Shri Krishna Fire & Safety Academy',
    'academy.tagline': 'Paota, Jaipur — Rajasthan',
    'academy.motto': 'Premier Institute for Fire & Safety Coaching',

    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.courses': 'Courses',
    'nav.gallery': 'Gallery',
    'nav.vacancies': 'Vacancies',
    'nav.contact': 'Contact Us',
    'nav.testimonials': 'Reviews & Selections',
    'nav.admissionBtn': 'Book Admission 2026',
    'nav.langSwitch': 'हिन्दी',

    // Welcome Popup
    'welcome.title': 'Welcome to Shri Krishna Fire & Safety Academy',
    'welcome.subtitle': 'Rajasthan\'s Leading Institute for Fireman, Fire Officer & Industrial Safety Training',
    'welcome.selectLang': 'Select Your Preferred Language / अपनी पसंदीदा भाषा चुनें',
    'welcome.enTitle': 'English',
    'welcome.enDesc': 'Continue browsing the website in standard English.',
    'welcome.hiTitle': 'हिन्दी (Hindi)',
    'welcome.hiDesc': 'वेबसाइट की सम्पूर्ण जानकारी सरल हिन्दी में देखें।',
    'welcome.btn': 'Save Preference & Enter Website',
    'welcome.batchNotice': '📢 New Batch Admissions 2026 Open for Fire Guard, Fire Driver & CISF Batches!',
    'welcome.feature1': '400m Athletic Track & Ground',
    'welcome.feature2': '750+ Selection Records',
    'welcome.feature3': 'Residential Boys & Girls Hostel',

    // Hero Section
    'hero.badge': 'GOVT. RECOGNIZED FIRE TRAINING INSTITUTE',
    'hero.title1': 'WHERE EXPERIENCE COUNTS',
    'hero.title2': 'TRAINING FOR LIFE SAFETY',
    'hero.subtitle': 'Rajasthan\'s #1 Academy for Fireman, Fire Driver & Sub Fire Officer Preparation with authentic 400m physical ground training in Paota, Jaipur.',
    'hero.applyBtn': 'EXPLORE OUR SERVICES',
    'hero.coursesBtn': 'EXPLORE OUR COURSES',
    'hero.helpline': 'Direct Admission Helpline: +91 96805 05554',

    // Yellow Ribbon
    'yellow.ribbon': 'View and Book One of Our NCVT Approved Fire & Safety Courses!',
    'yellow.bookBtn': 'BOOK NOW',

    // Features Strip
    'feat.ground': '400m Athletic Ground',
    'feat.groundDesc': 'Daily 5:00 AM physical drills, 60kg dummy carry & vertical rope climbing.',
    'feat.faculty': 'Expert Fire Faculty',
    'feat.facultyDesc': 'Retired Chief Fire Officers and certified physical trainers.',
    'feat.hostel': 'Hostel & Mess Facility',
    'feat.hostelDesc': 'Hygienic living, library, and 24x7 security for outstation cadets.',
    'feat.placements': '750+ Placements',
    'feat.placementsDesc': 'High track record in government fire departments and top MNCs.',

    // About Section
    'about.heading': 'About Us – Shri Krishna Fire & Safety Academy',
    'about.sub': 'Building Future Safety Professionals Through Quality Education & Practical Training',
    'about.desc1': 'Shri Krishna Fire & Safety Academy is one of Rajasthan\'s leading institutes dedicated to Fire Engineering, Industrial Safety, Health, Safety & Environment (HSE), and Emergency Response education. With our Main Campus in Paota, Jaipur, we are committed to developing skilled safety professionals through high-quality education, practical training, and industry-oriented learning.',
    'about.desc2': 'Our mission is to create competent professionals who can contribute to safer workplaces, industries, and communities. We combine classroom learning with hands-on practical training using modern firefighting equipment, emergency response techniques, and disaster management.',
    'about.desc3': 'Our experienced faculty and practical training methodology help students develop the confidence, technical knowledge, and professional skills required to succeed in Government and Private Sector Fire & Safety careers.',
    'about.focusHeading': 'What sets Shri Krishna Academy apart is our unwavering focus on:',
    'about.highlight1': 'Skill development with discipline',
    'about.highlight2': 'Live fire fighting & rescue drills',
    'about.highlight3': '400m physical ground & gym',
    'about.highlight4': '100% Recruitment & placement support',
    'about.readMore': 'Read Full Institutional Story',

    // Ground Action Showcase Strip
    'stats.year': 'YEAR FOUNDED',
    'stats.instructors': 'CERTIFIED INSTRUCTORS',
    'stats.cadets': 'GRADUATED CADETS',
    'stats.selections': 'GOVT FIRE SELECTIONS',
    'training.heading': 'Join a High-Impact Learning Community at Shri Krishna Fire & Safety Academy',
    'training.sub': 'Immerse yourself in a world-class training curriculum with practical firefighting drills, rescue simulations, and physical ground workouts. Our diverse programs help you gain real-world competence on fire safety and emergency management, preparing you for a successful career in the safety industry.',

    // Placement & Opportunities
    'placement.title': 'Placement & Opportunities',
    'placement.sub': 'Shri Krishna Fire & Safety Academy has successfully trained and placed students in Government Fire Services, Rajasthan Fire Brigade, Delhi Fire Service (DFS), CISF, Airport Authority, Oil & Gas Sector, and Multinational Companies across India.',
    'placement.viewAll': 'View All 750+ Selection Records',
    'placement.selectedBadge': 'Selected',

    // Campus Tour
    'tour.tag': 'Want to Join With Us?',
    'tour.heading': 'WATCH LIVE CAMPUS TOUR',
    'tour.desc1': 'Experience the vibrant atmosphere of our campus with our Live Campus Tour! Explore state-of-the-art facilities, 400m athletic physical training ground, operational fire tender vehicle, and interactive classroom sessions that give you a firsthand glimpse into the life of our cadets.',
    'tour.desc2': 'Want to join with us? Enroll today to kickstart your journey towards a rewarding career in government safety services and emergency management. Don\'t miss this opportunity to be part of Rajasthan\'s leading training academy.',
    'tour.playBtn': 'Play Campus Video',
    'tour.visitBtn': 'Book Campus Visit',
    'tour.clickToWatch': 'Click to Watch Video Tour',

    // Quick Action Icon Strip
    'icon.feedback': 'Post Feedback',
    'icon.gallery': 'Photo Gallery',
    'icon.awards': 'Award & Selections',
    'icon.media': 'Media Space',
    'icon.faqs': 'FAQ\'s',
    'icon.testimonials': 'Testimonials',
    'icon.care': 'Customer Care',

    // Courses Section
    'courses.heading': 'Featured Academy Coaching Batches',
    'courses.sub': 'Intensive theoretical classroom teaching, physical endurance drills, and driving trade test preparation.',
    'courses.viewAll': 'Explore All Courses & Syllabus',

    // Recruitment Notice
    'recruitment.tag': 'Live Vacancies Desk',
    'recruitment.heading': 'Latest Fire & Safety Job Recruitment Alerts 2026',
    'recruitment.viewAll': 'View All Recruitment Notices',

    // Floating Action & Footer
    'float.call': 'Call Academy',
    'float.whatsapp': 'WhatsApp',
    'float.apply': 'Apply Online',
    'footer.rights': 'All rights reserved.',
    'footer.paota': 'Paota, Jaipur — Rajasthan, India'
  },
  hi: {
    // Top Bar & Branding
    'top.callUs': '24/7 हेल्पलाइन: +91 9680505554 | 8696715101',
    'top.portal': 'ऑनलाइन पोर्टल',
    'top.whatsapp': 'व्हाट्सएप',
    'academy.name': 'श्री कृष्णा फायर & सेफ्टी एकेडमी',
    'academy.tagline': 'पावटा, जयपुर — राजस्थान',
    'academy.motto': 'फायरमैन एवं सेफ्टी भर्ती की सर्वश्रेष्ठ कोचिंग',

    // Navbar
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.courses': 'कोर्सेस',
    'nav.gallery': 'गैलरी',
    'nav.vacancies': 'सरकारी भर्तियां',
    'nav.contact': 'संपर्क करें',
    'nav.testimonials': 'सफल छात्र (रिव्यू)',
    'nav.admissionBtn': 'एडमिशन फॉर्म 2026',
    'nav.langSwitch': 'English',

    // Welcome Popup
    'welcome.title': 'श्री कृष्णा फायर & सेफ्टी एकेडमी में आपका स्वागत है',
    'welcome.subtitle': 'राजस्थान की नंबर-1 फायरमैन, फायर ऑपरेटर और इंडस्ट्रियल सेफ्टी ट्रेनिंग संस्थान (पावटा, जयपुर)',
    'welcome.selectLang': 'अपनी पसंदीदा भाषा चुनें / Select Your Preferred Language',
    'welcome.enTitle': 'English (अंग्रेजी)',
    'welcome.enDesc': 'Continue browsing the website in English.',
    'welcome.hiTitle': 'हिन्दी (Hindi)',
    'welcome.hiDesc': 'सम्पूर्ण जानकारी और भर्ती विवरण सरल हिन्दी भाषा में देखें।',
    'welcome.btn': 'भाषा चुनें और वेबसाइट देखें',
    'welcome.batchNotice': '📢 सत्र 2026: फायर गार्ड, फायर ड्राइवर और CISF फिजिकल नए बैच शुरू!',
    'welcome.feature1': '400 मीटर ग्राउंड & फिजिकल तैयारी',
    'welcome.feature2': '750+ सरकारी एवं प्राइवेट चयन',
    'welcome.feature3': 'सुरक्षित हॉस्टल (छात्र एवं छात्राएं)',

    // Hero Section
    'hero.badge': 'सरकार द्वारा मान्यता प्राप्त फायर ट्रेनिंग संस्थान',
    'hero.title1': 'जहां अनुभव बोलता है (अनुभव ही पहचान है)',
    'hero.title2': 'जीवन सुरक्षा और सुनहरे भविष्य की ट्रेनिंग',
    'hero.subtitle': 'राजस्थान की #1 एकेडमी - फायरमैन, फायर ड्राइवर और सब फायर ऑफिसर की 400 मीटर फिजिकल ग्राउंड एवं थ्योरी कोचिंग (पावटा, जयपुर)।',
    'hero.applyBtn': 'हमारी सेवाएं देखें',
    'hero.coursesBtn': 'सभी कोर्सेस देखें',
    'hero.helpline': 'सीधी एडमिशन हेल्पलाइन: +91 96805 05554',

    // Yellow Ribbon
    'yellow.ribbon': 'NCVT से मान्यता प्राप्त फायर & सेफ्टी कोर्सेस देखें और अपनी सीट बुक करें!',
    'yellow.bookBtn': 'अभी बुक करें',

    // Features Strip
    'feat.ground': '400 मीटर फिजिकल ग्राउंड',
    'feat.groundDesc': 'प्रतिदिन 5:00 AM रनिंग, 60kg डमी वजन एवं रोप क्लाइम्बिंग टेस्ट की तैयारी।',
    'feat.faculty': 'अनुभवी फायर फैकल्टी',
    'feat.facultyDesc': 'रिटायर्ड चीफ फायर ऑफिसर्स एवं NIS सर्टिफाइड फिजिकल कोच द्वारा मार्गदर्शन।',
    'feat.hostel': 'हॉस्टल एवं मेस सुविधा',
    'feat.hostelDesc': 'शुद्ध खानपान, वाई-फाई लाइब्रेरी और 24x7 सुरक्षा व्यवस्था।',
    'feat.placements': '750+ सिलेक्शन रिकॉर्ड',
    'feat.placementsDesc': 'सरकारी फायर विभाग एवं शीर्ष मल्टीनेशनल कंपनियों में सफल चयन।',

    // About Section
    'about.heading': 'हमारे बारे में – श्री कृष्णा फायर & सेफ्टी एकेडमी',
    'about.sub': 'गुणवत्तापूर्ण शिक्षा एवं प्रैक्टिकल ट्रेनिंग के माध्यम से भविष्य के सुरक्षा अधिकारी तैयार करना',
    'about.desc1': 'श्री कृष्णा फायर & सेफ्टी एकेडमी राजस्थान का अग्रणी संस्थान है जो फायर इंजीनियरिंग, इंडस्ट्रियल सेफ्टी, हेल्थ, सेफ्टी & एनवायरनमेंट (HSE) और आपदा प्रबंधन की शिक्षा प्रदान करता है। पावटा (जयपुर) स्थित मुख्य परिसर में हम उच्च गुणवत्तायुक्त व्यावहारिक प्रशिक्षण देते हैं।',
    'about.desc2': 'हमारा उद्देश्य ऐसे दक्ष पेशेवर तैयार करना है जो सुरक्षित कार्यस्थलों और समाज के निर्माण में योगदान दें। आधुनिक अग्निशमन उपकरण, लाइव रेस्क्यू ऑपरेशन और आपातकालीन प्रबंधन का व्यावहारिक अभ्यास कराया जाता है।',
    'about.desc3': 'हमारे अनुभवी प्रशिक्षक छात्रों में तकनीकी ज्ञान, अनुशासन और आत्मविश्वास विकसित करते हैं जिससे वे सरकारी एवं निजी क्षेत्र में शानदार करियर बना सकें।',
    'about.focusHeading': 'श्री कृष्णा एकेडमी की प्रमुख विशेषताएं:',
    'about.highlight1': 'अनुशासन के साथ कौशल विकास',
    'about.highlight2': 'लाइव फायर फाइटिंग एवं रेस्क्यू ड्रिल्स',
    'about.highlight3': '400 मीटर फिजिकल ग्राउंड एवं जिम',
    'about.highlight4': '100% भर्ती एवं प्लेसमेंट सहायता',
    'about.readMore': 'संस्थान की पूरी जानकारी पढ़ें',

    // Ground Action Showcase Strip
    'stats.year': 'स्थापना वर्ष',
    'stats.instructors': 'प्रमाणित प्रशिक्षक',
    'stats.cadets': 'प्रशिक्षित कैडेट्स',
    'stats.selections': 'सरकारी चयन',
    'training.heading': 'श्री कृष्णा फायर & सेफ्टी एकेडमी में शामिल हों',
    'training.sub': 'लाइव फायर फाइटिंग अभ्यास, रेस्क्यू सिमुलेशन और 400 मीटर ग्राउंड ट्रेनिंग के साथ अपना भविष्य सुरक्षित करें।',

    // Placement & Opportunities
    'placement.title': 'चयन एवं प्लेसमेंट अवसर',
    'placement.sub': 'हमारे छात्रों का राजस्थान फायर सर्विस, दिल्ली फायर सर्विस (DFS), CISF, एयरपोर्ट अथॉरिटी और ऑयल & गैस कंपनियों में शानदार चयन हुआ है।',
    'placement.viewAll': 'सभी 750+ सिलेक्शन रिकॉर्ड देखें',
    'placement.selectedBadge': 'चयनित (Selected)',

    // Campus Tour
    'tour.tag': 'क्या आप भी एडमिशन लेना चाहते हैं?',
    'tour.heading': 'लाइव कैंपस वीडियो टूर देखें',
    'tour.desc1': 'हमारे पावटा (जयपुर) स्थित विशाल 400 मीटर ग्राउंड, फायर टेंडर वाहन, स्मार्ट क्लासरूम और हॉस्टल सुविधाओं का लाइव वीडियो टूर देखें।',
    'tour.desc2': 'आज ही अपना नामांकन कराएं और सरकारी सुरक्षा सेवाओं में एक उज्ज्वल भविष्य की शुरुआत करें।',
    'tour.playBtn': 'कैंपस वीडियो देखें',
    'tour.visitBtn': 'कैंपस विजिट बुक करें',
    'tour.clickToWatch': 'वीडियो टूर देखने के लिए क्लिक करें',

    // Quick Action Icon Strip
    'icon.feedback': 'सुझाव / फीडबैक',
    'icon.gallery': 'फोटो गैलरी',
    'icon.awards': 'अवार्ड & चयन',
    'icon.media': 'मीडिया स्पेस',
    'icon.faqs': 'सामान्य प्रश्न (FAQ)',
    'icon.testimonials': 'छात्र समीक्षाएं',
    'icon.care': 'हेल्पलाइन सहायता',

    // Courses Section
    'courses.heading': 'एकेडमी के प्रमुख कोचिंग बैच',
    'courses.sub': 'गहन थ्योरी कक्षाएं, 400 मीटर ग्राउंड फिटनेस और ड्राइविंग ट्रेड टेस्ट की विशेष तैयारी।',
    'courses.viewAll': 'सभी कोर्सेस एवं सिलेबस देखें',

    // Recruitment Notice
    'recruitment.tag': 'सरकारी भर्ती सूचना',
    'recruitment.heading': 'नवीनतम फायर & सेफ्टी सरकारी भर्ती अलर्ट 2026',
    'recruitment.viewAll': 'सभी भर्ती सूचनाएं देखें',

    // Floating Action & Footer
    'float.call': 'कॉल करें',
    'float.whatsapp': 'व्हाट्सएप',
    'float.apply': 'एडमिशन लें',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    'footer.paota': 'पावटा, जयपुर — राजस्थान, भारत'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialModalOpen, setIsInitialModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has previously set language preference
    const saved = localStorage.getItem('sk_preferred_language') as Language | null;
    const hasSeenModal = localStorage.getItem('sk_welcomed_v1');

    if (saved === 'hi' || saved === 'en') {
      setLanguageState(saved);
    }

    // If first visit, show the initial welcome and language selection popup
    if (!hasSeenModal) {
      setIsInitialModalOpen(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sk_preferred_language', lang);
      localStorage.setItem('sk_welcomed_v1', 'true');
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const fallbackDict = translations['en'];
    if (fallbackDict && fallbackDict[key]) {
      return fallbackDict[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isInitialModalOpen,
        setIsInitialModalOpen,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
