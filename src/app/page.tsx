'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Flame,
  Shield,
  Award,
  Users,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  FileText,
  Star,
  ChevronDown,
  Building,
  Target,
  Trophy
} from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import RecruitmentCard from '@/components/RecruitmentCard';
import AdmissionModal from '@/components/AdmissionModal';
import { INITIAL_COURSES, INITIAL_RECRUITMENTS, INITIAL_TESTIMONIALS, INITIAL_BLOGS } from '@/data/initialData';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('fire-guard-course');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick Mini Form state for hero section
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickCourse, setQuickCourse] = useState('fire-guard-course');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickLoading, setQuickLoading] = useState(false);

  const handleOpenModal = (slug?: string) => {
    if (slug) setSelectedCourseSlug(slug);
    setIsModalOpen(true);
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuickLoading(true);
    try {
      await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: quickName,
          mobile: quickPhone,
          selectedCourse: quickCourse,
          qualification: '12th Pass',
          address: 'Quick Hero Lead',
          state: 'General',
          city: 'General',
          hostelRequired: 'No'
        })
      });
      setQuickSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setQuickLoading(false);
    }
  };

  const faqs = [
    {
      q: 'Does SK Fire Agency provide written exam coaching, physical training, or both?',
      a: 'SK Fire Agency provides an end-to-end curriculum integrating interactive classroom theory (General Studies, Fire Science, Math, Reasoning), daily 2-hour physical ground training (400m running, 60kg dummy carry, vertical rope climb), and weekly OMR mock examinations.'
    },
    {
      q: 'Is hostel and dining mess accommodation available for outstation students?',
      a: 'Yes! We provide safe, comfortable, and well-managed residential hostel accommodations located right next to the academy campus, complete with a hygienic mess serving 3 balanced meals daily and a 24/7 study library.'
    },
    {
      q: 'Which driving license is mandatory for Fire Operator and Fire Driver posts?',
      a: 'A valid Heavy Motor Vehicle (HMV / HTV) driving license is required for Fire Operator and Driver positions. At SK Fire Agency, we conduct specialized driving trade test drills (8-shape and ramp maneuvering) and centrifugal fire pump operation workshops.'
    },
    {
      q: 'What are the minimum height and chest requirements for Fireman recruitment?',
      a: 'For male candidates (General / OBC), minimum height is 165 cm (160 cm for ST / Hilly areas) with a chest expansion of 81 cm unexpanded to 86 cm expanded. For female candidates, the standard minimum height is 152 cm.'
    },
    {
      q: 'When do new batches start and how can I secure my admission?',
      a: 'New target batches commence every Monday. You can reserve your seat immediately by submitting the "Online Admission Form" on our website or by contacting our admission helpline at +91 98765 43210.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-fire-gradient text-white overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-fire-radial opacity-70 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold text-amber-300 shadow-sm">
                <Flame className="w-4 h-4 text-red-400 animate-pulse" />
                <span>#1 Premier Fire & Safety Coaching Academy in India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Realize Your Dream to Wear the Fire Uniform —{' '}
                <span className="text-fire-gradient block mt-1">
                  Fire Guard, Fireman & Operator
                </span>
                Comprehensive Exam Preparation
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
                Dedicated coaching for Delhi Fire Service (DSSSB), CISF Fireman, State Fire Brigades, and Industrial Safety exams. <strong>Written Theory + 400m Ground Physicals + 60kg Dummy Weight Carry + OMR Mock Tests.</strong>
              </p>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-red-400 font-extrabold text-lg sm:text-xl">1250+</div>
                  <div className="text-neutral-400 text-xs font-semibold">Total Selections</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-amber-400 font-extrabold text-lg sm:text-xl">400m Track</div>
                  <div className="text-neutral-400 text-xs font-semibold">Dedicated Academy Ground</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <div className="text-green-400 font-extrabold text-lg sm:text-xl">Hostel & Mess</div>
                  <div className="text-neutral-400 text-xs font-semibold">Residential Facility</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  onClick={() => handleOpenModal('fire-guard-course')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-sm sm:text-base shadow-xl shadow-red-600/40 hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Apply for Admission Now</span>
                </button>

                <Link
                  href="/courses"
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <span>Explore All Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* Right Col: Instant Admission Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-red-500/20 relative">
                <div className="absolute -top-4 -right-4 bg-amber-500 text-neutral-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Admission Open
                </div>

                <div className="text-center mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block mb-1">
                    Direct Academy Admission
                  </span>
                  <h3 className="text-2xl font-black text-neutral-900">
                    Book Your Demo Class
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Fill this quick form to reserve your seat in the upcoming new batch.
                  </p>
                </div>

                {quickSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black text-neutral-900">
                      Enquiry Registered!
                    </h4>
                    <p className="text-xs text-neutral-600">
                      Our senior counselor will call you at <strong>{quickPhone}</strong> within 2 hours.
                    </p>
                    <button
                      onClick={() => setQuickSubmitted(false)}
                      className="text-xs text-red-600 font-bold hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quickName}
                        onChange={(e) => setQuickName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Target Course *
                      </label>
                      <select
                        value={quickCourse}
                        onChange={(e) => setQuickCourse(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                      >
                        {INITIAL_COURSES.map((course) => (
                          <option key={course.slug} value={course.slug}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={quickLoading}
                      className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                    >
                      {quickLoading ? 'Submitting...' : 'Claim Free Demo & Brochure'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                      <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                      <span>Or Call Directly: <strong>+91 98765 43210</strong></span>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INSTITUTE INTRODUCTION BANNER */}
      <section className="bg-amber-50 border-b border-amber-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0 shadow-sm font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                  About SK Fire Agency (Educational Coaching Institute)
                </h4>
                <p className="text-xs text-neutral-600">
                  We are a dedicated educational coaching institute specializing exclusively in Fire Guard, Fireman, Fire Operator, and Fire Safety competitive recruitment examinations.
                </p>
              </div>
            </div>
            <Link
              href="/about"
              className="text-xs font-extrabold text-red-600 hover:text-red-700 flex items-center gap-1 shrink-0 bg-white px-4 py-2 rounded-lg border border-neutral-200 shadow-sm"
            >
              <span>Learn About Our Academy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE SK FIRE AGENCY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full">
              Why SK Fire Agency
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              Why Aspirants Choose SK Fire Agency
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              Success in fire recruitment requires equal mastery over classroom theory and physical endurance. Our academy delivers an optimal balance to help students qualify on their very first attempt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-red-400 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 mb-2.5">
                400m Dedicated Physical Ground
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Featuring our own 400m sprinting track, standard 60-65kg sand dummy deadlift stations, 3m-5m vertical rope climbing racks, and long jump pits guided daily by ex-NIS coaches.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-red-400 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 mb-2.5">
                Ex-Fire Officers & Subject Experts
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Learn directly from retired Fire Officers and experienced competitive exam faculties. In-depth coverage of Fire Chemistry, Hydraulics, Motor Vehicle Rules, and Rescue Operations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-red-400 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 mb-2.5">
                Weekly All-India OMR Mock Tests
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Full-length 100/200 MCQ simulated exams conducted every Sunday under actual examination hall conditions, followed by comprehensive solution discussions and rank benchmarking.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-red-400 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 mb-2.5">
                Campus Hostel, Mess & 24x7 Library
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Comfortable, safe, and hygienic hostel accommodations with 3 nutritious daily meals and a 24-hour quiet study library tailored for outstation candidates.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-red-400 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 mb-2.5">
                Driving Trade Test & Pump Mechanics
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Dedicated training for Fire Operator applicants including Figure &apos;8&apos; and &apos;S&apos; track driving, ramp stopping, centrifugal fire pump operations, and hose coupling drills.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 hover:border-red-400 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-neutral-900 mb-2.5">
                Free Study Material & 5000+ MCQs
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                All admissions include comprehensive printed course booklets, previous 10 years solved exam papers, and specialized fire safety formula cheat sheets.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COURSES PREVIEW SECTION */}
      <section className="py-20 bg-slate-50 border-t border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Targeted Exam Batches
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                Featured Courses & Batches
              </h2>
              <p className="text-neutral-600 text-sm">
                Choose the program matching your eligibility and secure your admission online today.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-red-600 hover:text-red-700 bg-white px-5 py-3 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-all self-start md:self-auto"
            >
              <span>View All 6 Batches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_COURSES.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onApply={handleOpenModal}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-neutral-200 shadow-sm max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="font-extrabold text-neutral-900 text-sm sm:text-base">
                  Need Help Choosing the Right Course?
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Consult with our senior counselor for free syllabus guidance and physical criteria assessment.
                </p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shrink-0 whitespace-nowrap"
              >
                Request Call Back
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. LATEST RECRUITMENTS TICKER & CARDS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Govt & Private Vacancy Alerts
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                Latest Fire Department Recruitments 2026
              </h2>
              <p className="text-neutral-600 text-sm">
                Up-to-date vacancy notifications, eligibility standards, and deadlines across Indian fire services.
              </p>
            </div>

            <Link
              href="/recruitment"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-neutral-900 hover:text-red-600 bg-neutral-100 px-5 py-3 rounded-xl hover:bg-neutral-200 transition-all self-start md:self-auto"
            >
              <span>Explore All Vacancies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIAL_RECRUITMENTS.slice(0, 2).map((notice) => (
              <RecruitmentCard
                key={notice.id}
                notice={notice}
                onApplyForBatch={handleOpenModal}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 6. PHYSICAL GROUND & FACILITIES HIGHLIGHT */}
      <section className="py-20 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.15),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800/80 px-3.5 py-1.5 rounded-full">
                Physical Training Ground
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Our Dedicated 400m Ground —{' '}
                <span className="text-red-500">60kg Dummy Carry & Rope Climbing Drills</span>
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Over 60% of candidates fail the physical endurance test due to lack of biomechanical technique. At SK Fire Agency, we train every student in proper deadlift stance, center-of-gravity balancing, and vertical rope leg locking.
              </p>

              <div className="space-y-3 text-sm text-neutral-200">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Standard 60 kg and 65 kg Human Sand Dummy deadlift stations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>3-meter and 5-meter vertical rope climbing racks with safety pits</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>400m sprint track and 3.0m obstacle ditch long jump pit</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Personalized athletic diet plans and muscle recovery guidance</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/gallery"
                  className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <span>View Ground Photos & Videos</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleOpenModal('physical-training-intensive')}
                  className="px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm border border-neutral-700 flex items-center gap-2"
                >
                  <span>Join Physical Only Batch</span>
                </button>
              </div>
            </div>

            {/* Right side facility cards */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=80"
                    alt="Running Track"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-white">400m Sprint & Stamina Track</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Daily morning endurance workouts</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80"
                    alt="Dummy Carry"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-white">60kg Dummy Weight Station</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Deadlift & shoulder lock technique</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"
                    alt="Rope Climbing"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-white">Vertical Rope Climbing</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">J-hook & S-lock feet technique</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80"
                    alt="Theory Class"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-white">Smart Theory Classrooms</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Air-conditioned & projector enabled</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. STUDENT REVIEWS / TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-green-700 bg-green-100 px-3.5 py-1.5 rounded-full">
              Success Stories & Selections
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              What Our Selected Students Say
            </h2>
            <p className="text-neutral-600 text-sm">
              Read how our students cleared both rigorous physical tests and competitive written exams through structured guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INITIAL_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-700 italic leading-relaxed mb-4">
                    &ldquo;{test.feedback}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="font-extrabold text-sm text-neutral-900">
                    {test.name}
                  </div>
                  <div className="text-[11px] font-bold text-red-600 mt-0.5">
                    {test.role}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {test.selectedIn}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-neutral-900 bg-white px-6 py-3 rounded-xl border border-neutral-200 shadow-sm hover:border-red-400 transition-all"
            >
              <span>View More Student Reviews & Selections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. LATEST BLOGS & EXAM GUIDES PREVIEW */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full">
                Knowledge & Guidance Articles
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                Fireman Exam Guides & Strategic Insights
              </h2>
              <p className="text-neutral-600 text-sm">
                Expert articles covering eligibility, salary scales, dummy weight lifting mechanics, and syllabus breakdowns.
              </p>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-red-600 hover:text-red-700 bg-red-50 px-5 py-3 rounded-xl transition-all self-start md:self-auto"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_BLOGS.slice(0, 3).map((blog) => (
              <article
                key={blog.id}
                className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-red-300 transition-all flex flex-col justify-between group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                    <span className="font-bold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
                      {blog.category}
                    </span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="font-extrabold text-lg text-neutral-900 group-hover:text-red-600 transition-colors leading-snug">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-neutral-600 mt-3 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1.5 pt-3 border-t border-neutral-200/60 w-full"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-slate-50 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-600 bg-neutral-200 px-3.5 py-1.5 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-neutral-600 text-sm">
              Answers to common queries regarding admissions, physical conditioning, hostel facilities, and batch timings.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    type="button"
                    className="w-full px-6 py-5 text-left font-extrabold text-neutral-900 flex items-center justify-between gap-4 text-sm sm:text-base hover:text-red-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-red-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-1 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-16 border-t border-red-900/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" /> Special Batch Admission Open
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Accelerate Your Preparation — Enroll in SK Fire Agency Today
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Limited batch capacity. Fill out the online registration form or contact our counseling desk to secure your seat.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenModal('fireman-preparation')}
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base shadow-xl shadow-red-600/40 hover:scale-105 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Fill Online Admission Form</span>
            </button>

            <a
              href="tel:+919876543210"
              className="px-8 py-4 rounded-xl bg-white text-neutral-900 hover:bg-neutral-100 font-extrabold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>Call Helpline: +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

      {/* Global Admission Modal */}
      <AdmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />

    </div>
  );
}
