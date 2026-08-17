'use client';

import React, { useState } from 'react';
import {
  CheckCircle,
  Loader2,
  Send,
  MessageCircle,
  Clock,
  Upload,
  FileText
} from 'lucide-react';

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
  const [errorMessage, setErrorMessage] = useState('');
  const [leadId, setLeadId] = useState('');

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
      alert('Document upload failed. Please try again.');
    } finally {
      setUploadingField(null);
    }
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
        throw new Error(data.error || 'Failed to submit admission form.');
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
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            ONLINE ADMISSION REGISTRATION
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Shri Krishna Fire & Safety Academy (Pawta Jaipur) — Submit candidate details and upload documents (10th, 12th & Aadhar Card).
        </p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs p-6 sm:p-10">
          
          {isSuccess ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  Admission Registration Submitted
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-3">
                  Registration Submitted Successfully
                </h2>
                <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  Thank you <strong>{formData.fullName}</strong>. Your official Registration ID is:
                </p>
                <div className="inline-block bg-neutral-900 text-white font-mono font-bold text-lg px-6 py-2.5 rounded-xl mt-3 shadow-xs">
                  {leadId}
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-5 text-left max-w-lg mx-auto text-xs text-neutral-700 space-y-2">
                <h3 className="font-semibold text-sm text-neutral-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-600" />
                  <span>Next Steps:</span>
                </h3>
                <p>1. Our admissions counselor will contact you at <strong>{formData.mobile}</strong> shortly.</p>
                <p>2. You will receive complete details regarding hostel allotment, physical ground timing, and class schedules.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href={`https://wa.me/919680505554?text=Hello%20SK%20Fire%20Academy,%20I%20have%20submitted%20Online%20Admission%20Form%20with%20ID%20${leadId}.%20Please%20verify%20my%20documents.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsSuccess(false)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs rounded-xl transition-colors"
                >
                  Fill Another Form
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-neutral-900 border-b border-neutral-100 pb-2">
                  1. Candidate Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      placeholder="Enter candidate's full name"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                      placeholder="Enter father's name"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit primary mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Alternate Mobile / Parent Contact
                    </label>
                    <input
                      type="tel"
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleChange}
                      placeholder="Optional alternate mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Highest Qualification *
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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

              {/* Postal Address & Hostel */}
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-semibold text-neutral-900 border-b border-neutral-100 pb-2">
                  2. Address & Hostel Requirement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Rajasthan, Delhi, Haryana"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Jaipur, Alwar, Rewari"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Hostel & Mess Facility
                    </label>
                    <select
                      name="hostelRequired"
                      value={formData.hostelRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    >
                      <option value="No">No (Day Scholar)</option>
                      <option value="Yes">Yes (Need Hostel & Food)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Complete Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House/Plot No., Street, Tehsil, District, PIN Code"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Any Query or Note
                    </label>
                    <input
                      type="text"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="e.g. Want physical ground batch from next Monday"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                    />
                  </div>
                </div>
              </div>

              {/* DOCUMENT UPLOAD SECTION */}
              <div className="space-y-4 pt-2 border-t border-neutral-200/80">
                <h3 className="text-base font-semibold text-neutral-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-neutral-600" />
                  <span>3. Document Upload (10th, 12th & Aadhar Card)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 10th Marksheet */}
                  <div className="p-4 bg-neutral-50/80 rounded-xl border border-neutral-200/80 space-y-2">
                    <label className="block text-xs font-semibold text-neutral-800">
                      10th Marksheet
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'marksheet10thUrl')}
                      className="text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer w-full"
                    />
                    {uploadingField === 'marksheet10thUrl' && (
                      <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                      </span>
                    )}
                    {formData.marksheet10thUrl && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ 10th Marksheet Uploaded
                      </span>
                    )}
                  </div>

                  {/* 12th Marksheet */}
                  <div className="p-4 bg-neutral-50/80 rounded-xl border border-neutral-200/80 space-y-2">
                    <label className="block text-xs font-semibold text-neutral-800">
                      12th Marksheet
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'marksheet12thUrl')}
                      className="text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer w-full"
                    />
                    {uploadingField === 'marksheet12thUrl' && (
                      <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                      </span>
                    )}
                    {formData.marksheet12thUrl && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ 12th Marksheet Uploaded
                      </span>
                    )}
                  </div>

                  {/* Aadhar Card */}
                  <div className="p-4 bg-neutral-50/80 rounded-xl border border-neutral-200/80 space-y-2">
                    <label className="block text-xs font-semibold text-neutral-800">
                      Aadhar Card
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'aadharUrl')}
                      className="text-xs text-neutral-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer w-full"
                    />
                    {uploadingField === 'aadharUrl' && (
                      <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                      </span>
                    )}
                    {formData.aadharUrl && (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ Aadhar Card Uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">
                  🔒 Information and uploaded documents are securely processed for admissions.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting || !!uploadingField}
                  className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
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
