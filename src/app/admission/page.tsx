'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle,
  Loader2,
  Send,
  MessageCircle,
  Shield,
  Clock,
  Home,
  UserCheck
} from 'lucide-react';
import { INITIAL_COURSES } from '@/data/initialData';

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    dob: '',
    gender: 'Male',
    qualification: '12th Pass (Science)',
    address: '',
    state: 'Delhi',
    city: '',
    selectedCourse: 'fire-guard-course',
    hostelRequired: 'No',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadId, setLeadId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit admission enquiry.');
      }

      setLeadId(data.leadId);
      setIsSuccess(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong. Please call helpline directly.';
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800 px-3.5 py-1.5 rounded-full inline-block">
            Online Registration 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Online Admission & Registration Form
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto">
            Reserve your seat in SK Fire Agency&apos;s upcoming target batch (Written Theory + 400m Physical Ground).
          </p>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 p-6 sm:p-10">
          
          {isSuccess ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-black uppercase text-green-700 bg-green-50 px-3 py-1 rounded-full">
                  Admission Form Received
                </span>
                <h2 className="text-3xl font-black text-neutral-900 mt-2">
                  Your Admission Form Has Been Successfully Submitted!
                </h2>
                <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  Congratulations <strong>{formData.fullName}</strong>! Your official registration ID is:
                </p>
                <div className="inline-block bg-neutral-900 text-amber-400 font-mono font-black text-lg px-6 py-2.5 rounded-xl mt-3 shadow-md">
                  {leadId}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left max-w-lg mx-auto text-xs text-amber-900 space-y-2">
                <h4 className="font-extrabold text-sm text-amber-950 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Next Steps:</span>
                </h4>
                <p>1. Our senior admission counselor will contact you at <strong>{formData.mobile}</strong> within 2 hours.</p>
                <p>2. You will receive complete details regarding batch timings, hostel allotment, and class schedule.</p>
                <p>3. You can also send a direct confirmation message via WhatsApp below.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20I%20have%20submitted%20Online%20Admission%20Form%20with%20ID%20${leadId}%20for%20${encodeURIComponent(formData.selectedCourse)}.%20Please%20confirm%20my%20seat.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-green-600/30 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full sm:w-auto px-6 py-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-sm rounded-xl"
                >
                  Fill Another Form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm flex items-center gap-2">
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Section 1: Course Selection */}
              <div>
                <h3 className="text-lg font-black text-neutral-900 border-l-4 border-red-600 pl-3 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-red-600" />
                  <span>1. Target Course & Batch Selection</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {INITIAL_COURSES.map((course) => (
                    <label
                      key={course.slug}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        formData.selectedCourse === course.slug
                          ? 'border-red-600 bg-red-50/50 shadow-md'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-extrabold text-sm text-neutral-900 block">
                            {course.title}
                          </span>
                          <span className="text-[11px] text-neutral-500 font-medium mt-0.5 block">
                            {course.hindiTitle}
                          </span>
                        </div>
                        <input
                          type="radio"
                          name="selectedCourse"
                          value={course.slug}
                          checked={formData.selectedCourse === course.slug}
                          onChange={handleChange}
                          className="mt-1 text-red-600 focus:ring-red-500"
                        />
                      </div>
                      <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                        <span className="font-bold text-red-600">{course.fees || 'Batch Admission'}</span>
                        <span className="text-neutral-500">{course.duration}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Section 2: Student Personal Info */}
              <div>
                <h3 className="text-lg font-black text-neutral-900 border-l-4 border-red-600 pl-3 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-red-600" />
                  <span>2. Candidate Personal Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter student's full name"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Father’s Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Enter father's name"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Mobile Number (Calling & WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit primary mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Alternate Mobile / Parent Contact
                    </label>
                    <input
                      type="tel"
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleChange}
                      placeholder="Optional alternate mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Highest Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                    >
                      <option value="10th Pass">10th Pass (Matriculation)</option>
                      <option value="12th Pass (Science)">12th Pass (Science - PCM/PCB)</option>
                      <option value="12th Pass (Arts/Commerce)">12th Pass (Arts/Commerce)</option>
                      <option value="10th/12th + HMV License">10th/12th + Heavy Motor Vehicle (HMV) License</option>
                      <option value="Fire Safety Diploma / ITI">Fire Safety Diploma / ITI</option>
                      <option value="Graduate / Post Graduate">Graduate / Post Graduate</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Postal Address & Hostel */}
              <div>
                <h3 className="text-lg font-black text-neutral-900 border-l-4 border-red-600 pl-3 mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-red-600" />
                  <span>3. Address & Hostel Requirement</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Delhi, Haryana, Rajasthan, UP"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. New Delhi, Rewari, Alwar, Meerut"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Hostel & Mess Facility
                    </label>
                    <select
                      name="hostelRequired"
                      value={formData.hostelRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                    >
                      <option value="No">No (Day Scholar)</option>
                      <option value="Yes">Yes (Need Hostel & Food)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Complete Permanent Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House/Plot No., Street/Ward, Tehsil, District, PIN Code"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                      Any Query or Note
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Want physical ground batch from next Monday"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button & Assurance */}
              <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <Shield className="w-4 h-4 text-green-600 shrink-0" />
                  <span>100% Confidential • Seat Reservation Subject to Eligibility</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-base rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Admission Form...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Online Admission Registration</span>
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
