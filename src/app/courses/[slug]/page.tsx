'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Users,
  Loader2,
  CheckCircle,
  PhoneCall,
  MessageCircle,
  ArrowLeft,
  BookOpen,
  Upload
} from 'lucide-react';
import { INITIAL_COURSES } from '@/data/initialData';

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const course = INITIAL_COURSES.find(c => c.slug === resolvedParams.slug);

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    dob: '',
    gender: 'Male',
    qualification: '12th Pass',
    address: '',
    state: 'Rajasthan',
    city: '',
    hostelRequired: 'No',
    marksheet10thUrl: '',
    marksheet12thUrl: '',
    aadharUrl: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');

  if (!course) {
    return (
      <div className="bg-[#f5f4ef] min-h-[60vh] flex flex-col items-center justify-center p-6 text-center text-neutral-900">
        <h2 className="text-xl sm:text-2xl font-bold">Course Not Found</h2>
        <p className="text-xs sm:text-sm text-neutral-600 mt-2">The requested course does not exist.</p>
        <Link href="/courses" className="mt-4 px-5 py-2.5 bg-neutral-900 text-white rounded-xl font-medium text-xs">
          Back to All Courses
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'marksheet10thUrl' | 'marksheet12thUrl' | 'aadharUrl') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setUploadingField(fieldName);
    try {
      const data = new FormData();
      data.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });

      const result = await res.json();
      if (result.success && (result.imageUrl || result.url)) {
        const fileUrl = result.imageUrl || result.url;
        setFormData(prev => ({
          ...prev,
          [fieldName]: fileUrl
        }));
      } else {
        alert(result.error || 'Failed to upload document.');
      }
    } catch (err) {
      console.error(err);
      alert('Document upload failed.');
    } finally {
      setUploadingField(null);
    }
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
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* MINIMALIST HEADER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-12 pb-6">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.15em] text-neutral-900 uppercase leading-tight">
            {course.title}
          </h1>
        </div>
        <p className="mt-2 text-neutral-600 text-sm sm:text-base font-normal">
          {course.hindiTitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-700">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>Duration: <strong>{course.duration}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            <span>Next Batch: <strong>{course.upcomingBatchDate}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-neutral-200/80 shadow-xs">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Seats: <strong>{course.availableSeats} Left</strong></span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Col: Details, Syllabus, Physical Requirements */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-3">
                Course Overview & Objectives
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {course.description}
              </p>

              {course.fees && (
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-neutral-500 font-semibold block uppercase tracking-wider">Fee Structure:</span>
                    <span className="text-xl sm:text-2xl font-bold text-neutral-900">{course.fees}</span>
                  </div>
                  <span className="text-xs text-neutral-700 bg-white px-3 py-1 rounded-lg border border-neutral-200 font-medium shrink-0">
                    All-Inclusive
                  </span>
                </div>
              )}
            </div>

            {/* Key Features */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-3">
                Batch Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-3">
                Examination Syllabus
              </h3>
              <div className="space-y-4">
                {course.syllabus.map((mod, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-xl bg-neutral-50 border border-neutral-200/70 space-y-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-neutral-500" />
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

            {/* Physical Requirements */}
            {course.physicalRequirements && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 border-b border-neutral-100 pb-3">
                  Physical Test Standards (PST / PET)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-neutral-400 font-medium block mb-0.5">Height Required</span>
                    <span className="font-semibold text-neutral-900">{course.physicalRequirements.height}</span>
                  </div>
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-neutral-400 font-medium block mb-0.5">Chest Expansion</span>
                    <span className="font-semibold text-neutral-900">{course.physicalRequirements.chest}</span>
                  </div>
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <span className="text-neutral-400 font-medium block mb-0.5">Running Target</span>
                    <span className="font-semibold text-neutral-900">{course.physicalRequirements.running}</span>
                  </div>
                  {course.physicalRequirements.weightLift && (
                    <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100">
                      <span className="text-neutral-400 font-medium block mb-0.5">Dummy Carry</span>
                      <span className="font-semibold text-neutral-900">{course.physicalRequirements.weightLift}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Col: Registration Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
              
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">
                  Online Admission Form
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Submit candidate details for <strong>{course.title}</strong>
                </p>
              </div>

              {isSuccess ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900">
                    Application Submitted!
                  </h4>
                  <p className="text-xs text-neutral-600">
                    Registration ID: <strong className="font-mono text-neutral-900 text-sm">{leadId}</strong>
                  </p>

                  <a
                    href={`https://wa.me/919680505554?text=Hello%20SK%20Fire%20Academy,%20I%20applied%20for%20${encodeURIComponent(course.title)}%20with%20ID%20${leadId}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Candidate's full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Father’s Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Father's name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    >
                      <option value="10th Pass">10th Pass</option>
                      <option value="12th Pass (Science)">12th Pass (Science)</option>
                      <option value="12th Pass (Other)">12th Pass (Other)</option>
                      <option value="10th/12th + HMV Driving License">10th/12th + HMV Driving License</option>
                      <option value="Fire Safety Diploma / ITI">Fire Safety Diploma / ITI</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        City / State *
                      </label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Jaipur"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Hostel Required?
                      </label>
                      <select
                        name="hostelRequired"
                        value={formData.hostelRequired}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300/80 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>

                  {/* Document Upload Fields */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <span className="block text-xs font-semibold text-neutral-800">
                      Upload Documents (10th, 12th & Aadhar)
                    </span>

                    <div className="space-y-2">
                      <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1">10th Marksheet</label>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'marksheet10thUrl')}
                          className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-medium file:bg-neutral-900 file:text-white cursor-pointer w-full"
                        />
                        {formData.marksheet10thUrl && <span className="text-[10px] text-emerald-600 font-medium">✓ Uploaded</span>}
                      </div>

                      <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1">12th Marksheet</label>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'marksheet12thUrl')}
                          className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-medium file:bg-neutral-900 file:text-white cursor-pointer w-full"
                        />
                        {formData.marksheet12thUrl && <span className="text-[10px] text-emerald-600 font-medium">✓ Uploaded</span>}
                      </div>

                      <div className="p-2.5 bg-neutral-50 rounded-xl border border-neutral-200/70">
                        <label className="block text-[11px] font-medium text-neutral-700 mb-1">Aadhar Card</label>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => handleFileUpload(e, 'aadharUrl')}
                          className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-medium file:bg-neutral-900 file:text-white cursor-pointer w-full"
                        />
                        {formData.aadharUrl && <span className="text-[10px] text-emerald-600 font-medium">✓ Uploaded</span>}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !!uploadingField}
                    className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </form>
              )}

              <div className="pt-2 text-center border-t border-neutral-100">
                <a
                  href="tel:+919680505554"
                  className="text-xs text-neutral-600 hover:text-neutral-900 font-medium inline-flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Helpline: +91 96805 05554</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
