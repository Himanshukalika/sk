'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  PhoneCall,
  Flame,
  Award,
  Shield,
  MessageCircle,
  Building,
  User,
  BookOpen
} from 'lucide-react';
import AcademyLogo from './AcademyLogo';
import { useLanguage } from '@/context/LanguageContext';

export default function StudentRegistrationModal() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobile: '',
    course: 'Fireman Special Batch (10th Pass)',
    qualification: '12th Pass',
    city: '',
    state: 'Rajasthan',
    hostelRequired: 'Yes'
  });

  useEffect(() => {
    // Show on initial visit if user hasn't dismissed it in this session or recently
    const hasSeen = localStorage.getItem('sk_student_reg_shown_v1');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('sk_student_reg_shown_v1', 'true');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          fatherName: formData.fatherName,
          mobile: formData.mobile,
          qualification: formData.qualification,
          city: formData.city,
          state: formData.state,
          hostelRequired: formData.hostelRequired,
          notes: `Target Course: ${formData.course} (Direct Popup Lead)`
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'रजिस्ट्रेशन सबमिट नहीं हो सका। कृपया हेल्पलाइन पर कॉल करें।');
      }

      setLeadId(data.leadId || `SK-${Date.now().toString().slice(-4)}`);
      setIsSuccess(true);
      localStorage.setItem('sk_student_reg_shown_v1', 'true');
    } catch (err: unknown) {
      const errTxt = err instanceof Error ? err.message : 'Something went wrong.';
      setErrorMessage(errTxt);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-neutral-100 overflow-hidden relative my-6 max-h-[94vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Flame Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        {/* Header Banner */}
        <div className="bg-neutral-950 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10 mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-amber-500/40 text-amber-400 text-[11px] font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {language === 'hi'
                  ? 'सत्र 2026-27 : नए बैच एडमिशन ओपन'
                  : 'Session 2026-27 : New Batch Admissions Open'}
              </span>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="shrink-0 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 shadow-sm">
              <AcademyLogo size="small" variant="dark" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                {language === 'hi' 
                  ? 'श्री कृष्णा फायर & सेफ्टी एकेडमी (पावटा, जयपुर)'
                  : 'Shri Krishna Fire & Safety Academy (Paota, Jaipur)'}
              </h2>
              <p className="text-xs text-neutral-300 font-medium mt-0.5">
                {language === 'hi'
                  ? 'ऑनलाइन छात्र प्रवेश / रजिस्ट्रेशन फॉर्म (फ्री सीट इन्क्वायरी)'
                  : 'Student Online Admission & Registration Form'}
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-neutral-800">
          
          {isSuccess ? (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-neutral-900">
                  {language === 'hi' ? 'रजिस्ट्रेशन सफलतापूर्वक सबमिट हुआ!' : 'Registration Submitted Successfully!'}
                </h3>
                <p className="text-xs text-neutral-600 max-w-md mx-auto">
                  {language === 'hi'
                    ? `धन्यवाद ${formData.fullName}! आपका एडमिशन रजिस्ट्रेशन आईडी है:`
                    : `Thank you ${formData.fullName}! Your Admission ID is:`}
                </p>
                <div className="inline-block bg-neutral-100 text-red-600 font-mono font-black text-base px-5 py-2 rounded-xl mt-1 border border-neutral-300">
                  {leadId}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 text-left max-w-md mx-auto space-y-1">
                <p className="font-bold text-neutral-900">
                  {language === 'hi' ? 'अगला कदम (Next Steps):' : 'Next Steps:'}
                </p>
                <p>
                  {language === 'hi'
                    ? '1. हमारे एडमिशन काउंसलर जल्द ही आपको कॉल करेंगे।'
                    : '1. Our admission officer will contact you shortly.'}
                </p>
                <p>
                  {language === 'hi'
                    ? '2. आप पावटा (जयपुर) कैंपस में 400m ग्राउंड व डेमो क्लास के लिए पधार सकते हैं।'
                    : '2. You can visit Paota campus for physical ground drills & demo class.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                <a
                  href={`https://wa.me/919680505554?text=${encodeURIComponent(
                    `नमस्ते श्री कृष्णा एकेडमी, मैंने नया रजिस्ट्रेशन फॉर्म भरा है (ID: ${leadId}, नाम: ${formData.fullName}, कोर्स: ${formData.course})। कृपया मुझे बैच की जानकारी दें।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'hi' ? 'व्हाट्सएप पर कन्फर्म करें' : 'Confirm on WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  {language === 'hi' ? 'वेबसाइट देखें' : 'Continue to Website'}
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* 3 Academy Stats Pills */}
              <div className="grid grid-cols-3 gap-2 pb-1">
                <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-200/80 text-center flex flex-col items-center justify-center">
                  <span className="text-sm">🏃</span>
                  <span className="text-[10px] font-bold text-neutral-800 leading-tight">
                    {language === 'hi' ? '400m ग्राउंड' : '400m Track'}
                  </span>
                </div>
                <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-200/80 text-center flex flex-col items-center justify-center">
                  <span className="text-sm">🏆</span>
                  <span className="text-[10px] font-bold text-neutral-800 leading-tight">
                    {language === 'hi' ? '750+ सरकारी चयन' : '750+ Selections'}
                  </span>
                </div>
                <div className="bg-neutral-50 p-2 rounded-xl border border-neutral-200/80 text-center flex flex-col items-center justify-center">
                  <span className="text-sm">🏢</span>
                  <span className="text-[10px] font-bold text-neutral-800 leading-tight">
                    {language === 'hi' ? 'हॉस्टल & मेस' : 'Hostel & Mess'}
                  </span>
                </div>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'विद्यार्थी का नाम (Student Name) *' : 'Student Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={language === 'hi' ? 'अपना पूरा नाम लिखें' : 'Enter full name'}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50/40"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'पिता का नाम (Father\'s Name) *' : 'Father\'s Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder={language === 'hi' ? 'पिता का नाम लिखें' : 'Enter father\'s name'}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50/40"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर (Mobile No.) *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50/40"
                  />
                </div>

                {/* Target Course Selection */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'कोर्स चुनें (Select Course) *' : 'Target Course *'}
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50/40"
                  >
                    <option value="Fireman Special Batch (10th Pass)">फायरमैन भर्ती स्पेशल बैच (10th पास)</option>
                    <option value="Fire Driver & Operator (HMV License)">फायर ड्राइवर एवं ऑपरेटर बैच (HMV लाइसेंस)</option>
                    <option value="Sub Fire Officer (SFO Graduate)">सब फायर ऑफिसर (SFO) बैच</option>
                    <option value="CISF & Delhi Fire Service (DFS)">CISF एवं दिल्ली फायर सर्विस स्पेशल</option>
                    <option value="Fire & Safety Diploma (NCVT)">फायर & सेफ्टी डिप्लोमा (NCVT)</option>
                    <option value="Health Sanitary Inspector (1 Year)">हेल्थ सेनेटरी इंस्पेक्टर (HSI)</option>
                  </select>
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'योग्यता (Qualification) *' : 'Qualification *'}
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50/40"
                  >
                    <option value="10th Pass">10वीं पास (10th Pass)</option>
                    <option value="12th Pass">12वीं पास (12th Pass - Science/Arts/Comm)</option>
                    <option value="10th/12th + HMV License">10th/12th + ड्राइविंग लाइसेंस (HMV)</option>
                    <option value="Graduate / Degree">ग्रेजुएट / उच्च शिक्षा</option>
                    <option value="ITI / Diploma">ITI / अन्य डिप्लोमा</option>
                  </select>
                </div>

                {/* City / State */}
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'जिला व राज्य (District & State) *' : 'District & State *'}
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder={language === 'hi' ? 'उदा. जयपुर, सीकर, अलवर, रेवाड़ी' : 'e.g. Jaipur, Alwar, Delhi'}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50/40"
                  />
                </div>

                {/* Hostel Required */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {language === 'hi' ? 'हॉस्टल & मेस सुविधा चाहिए?' : 'Hostel & Mess Facility Required?'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className={`flex items-center justify-center p-2 rounded-xl border cursor-pointer font-bold transition-all ${
                      formData.hostelRequired === 'Yes'
                        ? 'border-red-600 bg-red-50/70 text-red-700'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}>
                      <input
                        type="radio"
                        name="hostelRequired"
                        value="Yes"
                        checked={formData.hostelRequired === 'Yes'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>{language === 'hi' ? '🏢 हाँ (हॉस्टल चाहिए)' : '🏢 Yes (Need Hostel)'}</span>
                    </label>

                    <label className={`flex items-center justify-center p-2 rounded-xl border cursor-pointer font-bold transition-all ${
                      formData.hostelRequired === 'No'
                        ? 'border-red-600 bg-red-50/70 text-red-700'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                    }`}>
                      <input
                        type="radio"
                        name="hostelRequired"
                        value="No"
                        checked={formData.hostelRequired === 'No'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span>{language === 'hi' ? '🚶 नहीं (डे-स्कॉलर)' : '🚶 No (Day Scholar)'}</span>
                    </label>
                  </div>
                </div>

              </div>

              {/* Direct Admission Helpline */}
              <div className="flex items-center justify-between px-3 py-2 bg-amber-50 border border-amber-200/80 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 text-amber-950 font-bold">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{language === 'hi' ? 'सीधी एडमिशन हेल्पलाइन:' : 'Helpline:'}</span>
                </div>
                <a href="tel:+919680505554" className="text-red-600 font-black hover:underline tracking-wide">
                  +91 96805 05554
                </a>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-neutral-500 hover:text-neutral-900 text-xs font-bold transition-colors"
                >
                  {language === 'hi' ? 'छोड़ें (Skip)' : 'Skip'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black rounded-xl text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{language === 'hi' ? 'रजिस्ट्रेशन सबमिट करें' : 'Submit Registration'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
