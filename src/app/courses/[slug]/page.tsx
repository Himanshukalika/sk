'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  GraduationCap,
  CheckCircle2,
  Users,
  Loader2,
  CheckCircle,
  PhoneCall,
  MessageCircle,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { INITIAL_COURSES } from '@/data/initialData';

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const course = INITIAL_COURSES.find(c => c.slug === resolvedParams.slug);

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: 'Male',
    qualification: '12th Pass',
    address: '',
    state: 'Delhi',
    city: '',
    hostelRequired: 'No',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-neutral-800">Course Not Found</h2>
        <p className="text-sm text-neutral-500 mt-2">The requested course does not exist.</p>
        <Link href="/courses" className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-xs">
          Back to Courses
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedCourse: course.slug
        })
      });

      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadId);
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white">
              {course.mode}
            </span>
            {course.badge && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-neutral-950">
                ★ {course.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {course.title}
          </h1>
          <p className="text-lg text-red-300 font-semibold mt-2">
            {course.hindiTitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-red-400" />
              <span>Duration: <strong>{course.duration}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Next Batch: <strong>{course.upcomingBatchDate}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              <span>Seats: <strong>{course.availableSeats} Seats Left</strong></span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Col: Course Details, Syllabus, Physical Criteria */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-neutral-900 border-l-4 border-red-600 pl-3">
                Course Overview & Objectives
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {course.description}
              </p>

              {course.fees && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-500 font-bold block">Course Fee Structure:</span>
                    <span className="text-2xl font-black text-red-700">{course.fees}</span>
                  </div>
                  <span className="text-xs text-neutral-600 bg-white px-3 py-1.5 rounded-lg border border-neutral-200 font-semibold">
                    All-Inclusive Fee
                  </span>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-neutral-900 border-l-4 border-red-600 pl-3">
                Key Highlights of this Batch
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {course.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs font-semibold text-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-neutral-900 border-l-4 border-red-600 pl-3">
                Detailed Examination Syllabus
              </h3>
              <div className="space-y-4 pt-2">
                {course.syllabus.map((mod, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                    <h4 className="font-extrabold text-sm text-neutral-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-red-600" />
                      <span>{mod.title}</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 pl-6 list-disc pt-1">
                      {mod.topics.map((t, ti) => (
                        <li key={ti}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Test Standards */}
            {course.physicalRequirements && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <h3 className="text-xl font-black text-neutral-900 border-l-4 border-red-600 pl-3">
                  Physical Test Standards (PST / PET Criteria)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-neutral-400 font-bold block mb-0.5">Height Required</span>
                    <span className="font-extrabold text-neutral-800">{course.physicalRequirements.height}</span>
                  </div>
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-neutral-400 font-bold block mb-0.5">Chest Expansion</span>
                    <span className="font-extrabold text-neutral-800">{course.physicalRequirements.chest}</span>
                  </div>
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-neutral-400 font-bold block mb-0.5">Running Target</span>
                    <span className="font-extrabold text-red-600">{course.physicalRequirements.running}</span>
                  </div>
                  {course.physicalRequirements.weightLift && (
                    <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-neutral-400 font-bold block mb-0.5">Dummy Weight Carry</span>
                      <span className="font-extrabold text-red-600">{course.physicalRequirements.weightLift}</span>
                    </div>
                  )}
                  {course.physicalRequirements.ropeClimb && (
                    <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-neutral-400 font-bold block mb-0.5">Vertical Rope Climb</span>
                      <span className="font-extrabold text-neutral-800">{course.physicalRequirements.ropeClimb}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Col: Direct Registration Form Card */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-red-500/20 shadow-xl sticky top-24 space-y-6">
              
              <div className="text-center pb-2 border-b border-neutral-100">
                <span className="text-xs font-black uppercase text-red-600 block">
                  Online Registration
                </span>
                <h3 className="text-2xl font-black text-neutral-900 mt-1">
                  Apply for this Batch
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Reserve your seat in <strong>{course.title}</strong>
                </p>
              </div>

              {isSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-neutral-900">
                    Application Submitted!
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Your Registration ID is: <strong className="font-mono text-red-600 text-sm">{leadId}</strong>
                  </p>
                  <p className="text-xs text-neutral-500">
                    Our academic counselor will contact you to verify your documents and batch timing.
                  </p>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20I%20applied%20for%20${encodeURIComponent(course.title)}%20with%20ID%20${leadId}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-green-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Confirmation</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Candidate Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Father’s Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Father's name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Mobile No. *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                    >
                      <option value="10th Pass">10th Pass</option>
                      <option value="12th Pass (Science)">12th Pass (Science)</option>
                      <option value="12th Pass (Other)">12th Pass (Other)</option>
                      <option value="10th/12th + HMV Driving License">10th/12th + HMV Driving License</option>
                      <option value="Fire Safety Diploma / ITI">Fire Safety Diploma / ITI</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. New Delhi"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Hostel Required?
                      </label>
                      <select
                        name="hostelRequired"
                        value={formData.hostelRequired}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs bg-white"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-4 h-4" />
                        <span>Confirm Batch Admission</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="pt-2 text-center border-t border-neutral-100">
                <a
                  href="tel:+919876543210"
                  className="text-xs text-neutral-600 hover:text-red-600 font-bold inline-flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                  <span>Helpline: +91 98765 43210</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
