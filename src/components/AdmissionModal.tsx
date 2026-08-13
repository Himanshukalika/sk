'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Loader2, Send, Flame, MessageCircle, AlertCircle } from 'lucide-react';
import { INITIAL_COURSES } from '@/data/initialData';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseSlug?: string;
}

export default function AdmissionModal({
  isOpen,
  onClose,
  defaultCourseSlug
}: AdmissionModalProps) {
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
    selectedCourse: defaultCourseSlug || 'fire-guard-course',
    hostelRequired: 'No',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [leadId, setLeadId] = useState('');

  if (!isOpen) return null;

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
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong. Please call helpline directly.';
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white p-5 flex items-center justify-between border-b border-red-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-md">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white leading-tight">
                Online Admission & Registration Form
              </h3>
              <p className="text-xs text-red-200 font-medium">
                SK Fire Agency • Fireman & Fire Guard Exam Coaching
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-neutral-900">
                  Admission Form Submitted!
                </h4>
                <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your registration ID is:
                </p>
                <div className="inline-block bg-neutral-100 text-red-700 font-mono font-bold text-base px-4 py-2 rounded-lg mt-2 border border-neutral-300">
                  {leadId}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 text-left max-w-md mx-auto space-y-1">
                <p className="font-bold">Next Steps:</p>
                <p>1. Our admission counselor will call you within 2 hours to confirm batch timing and seat availability.</p>
                <p>2. You can also visit our physical academy ground for a free demo session.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20SK%20Fire%20Agency,%20I%20have%20submitted%20Admission%20Form%20with%20ID%20${leadId}%20for%20${formData.selectedCourse}.%20Please%20confirm%20my%20seat.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-sm rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter candidate's full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Father's Name */}
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
                    placeholder="Enter father's name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Mobile Number (Calling & WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Alternate Mobile */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Alternate Mobile / Parent Contact
                  </label>
                  <input
                    type="tel"
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleChange}
                    placeholder="Optional alternate contact"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Email ID */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Date of Birth */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Highest Qualification */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Highest Educational Qualification *
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  >
                    <option value="10th Pass">10th Pass (Matriculation)</option>
                    <option value="12th Pass (Science)">12th Pass (Science - PCM/PCB)</option>
                    <option value="12th Pass (Arts/Commerce)">12th Pass (Arts/Commerce)</option>
                    <option value="10th/12th + HMV License">10th/12th + Heavy Driving License (HMV)</option>
                    <option value="Fire Safety Diploma / ITI">Fire Safety Diploma / ITI / Sub-Officer</option>
                    <option value="Graduate / Higher">Graduate / Higher Degree</option>
                  </select>
                </div>

                {/* Selected Course */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Select Target Course / Batch *
                  </label>
                  <select
                    name="selectedCourse"
                    value={formData.selectedCourse}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-red-500 text-sm font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-600 bg-red-50/40"
                  >
                    {INITIAL_COURSES.map(course => (
                      <option key={course.slug} value={course.slug}>
                        {course.title} ({course.fees || 'Batch Admission'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g. Delhi, Haryana, Rajasthan, UP"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* City / District */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. New Delhi, Rewari, Alwar, Meerut"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Full Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Full Postal Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Plot No., Street/Ward, Tehsil, PIN Code"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                {/* Hostel Requirement */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Hostel & Mess Required?
                  </label>
                  <select
                    name="hostelRequired"
                    value={formData.hostelRequired}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
                  >
                    <option value="No">No (Day Scholar)</option>
                    <option value="Yes">Yes (Need Hostel & Mess Room)</option>
                  </select>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Any Specific Query or Note
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Want to join physical training batch from Monday"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-neutral-500 text-center sm:text-left">
                  🔒 Your details are secure and used exclusively for admission counseling.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Admission Registration</span>
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
