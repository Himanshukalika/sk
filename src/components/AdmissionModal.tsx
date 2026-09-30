'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Loader2, Send, MessageCircle, AlertCircle, Upload, FileText } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseSlug?: string;
}

export default function AdmissionModal({
  isOpen,
  onClose
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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-neutral-900 text-white p-5 flex items-center justify-between border-b border-neutral-800">
          <div>
            <h3 className="font-semibold text-lg sm:text-xl text-white leading-tight">
              Online Admission Registration Form
            </h3>
            <p className="text-xs text-neutral-400">
              Shri Krishna Fire & Safety Academy (Paota Jaipur)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-xl hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-neutral-900">
                  Admission Registration Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. Your Registration ID is:
                </p>
                <div className="inline-block bg-neutral-100 text-neutral-900 font-mono font-bold text-base px-4 py-2 rounded-xl mt-2 border border-neutral-300">
                  {leadId}
                </div>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs text-neutral-700 text-left max-w-md mx-auto space-y-1">
                <p className="font-bold text-neutral-900">Next Steps:</p>
                <p>1. Our admissions officer will review your uploaded documents and contact you shortly.</p>
                <p>2. You can also visit our physical academy ground for a demo session.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/919680505554?text=Hello%20SK%20Fire%20Academy,%20I%20have%20submitted%20Admission%20Form%20with%20ID%20${leadId}.%20Please%20verify%20my%20documents.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium text-xs rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Student Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter student's full name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    placeholder="Optional alternate contact"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Highest Educational Qualification *
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                  >
                    <option value="10th Pass">10th Pass (Matriculation)</option>
                    <option value="12th Pass (Science)">12th Pass (Science - PCM/PCB)</option>
                    <option value="12th Pass (Arts/Commerce)">12th Pass (Arts/Commerce)</option>
                    <option value="10th/12th + HMV License">10th/12th + Heavy Motor Vehicle License</option>
                    <option value="Fire Safety Diploma / ITI">Fire Safety Diploma / ITI</option>
                    <option value="Graduate / Higher">Graduate / Higher Degree</option>
                  </select>
                </div>

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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Plot No., Street, Tehsil, PIN Code"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                  >
                    <option value="No">No (Day Scholar)</option>
                    <option value="Yes">Yes (Need Hostel & Food)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Additional Query or Note
                  </label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any specific question or message"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30"
                  />
                </div>
              </div>

              {/* DOCUMENT UPLOAD SECTION */}
              <div className="space-y-3 pt-2 border-t border-neutral-200/80">
                <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <Upload className="w-4 h-4 text-neutral-600" />
                  <span>Document Upload (10th, 12th & Aadhar Card)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* 10th Marksheet */}
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                    <label className="block text-xs font-semibold text-neutral-800">
                      10th Marksheet
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'marksheet10thUrl')}
                      className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer w-full"
                    />
                    {uploadingField === 'marksheet10thUrl' && (
                      <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                      </span>
                    )}
                    {formData.marksheet10thUrl && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ 10th Marksheet Uploaded
                      </span>
                    )}
                  </div>

                  {/* 12th Marksheet */}
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                    <label className="block text-xs font-semibold text-neutral-800">
                      12th Marksheet
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'marksheet12thUrl')}
                      className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer w-full"
                    />
                    {uploadingField === 'marksheet12thUrl' && (
                      <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                      </span>
                    )}
                    {formData.marksheet12thUrl && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ 12th Marksheet Uploaded
                      </span>
                    )}
                  </div>

                  {/* Aadhar Card */}
                  <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2">
                    <label className="block text-xs font-semibold text-neutral-800">
                      Aadhar Card
                    </label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'aadharUrl')}
                      className="text-xs text-neutral-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-neutral-900 file:text-white hover:file:bg-neutral-800 cursor-pointer w-full"
                    />
                    {uploadingField === 'aadharUrl' && (
                      <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                      </span>
                    )}
                    {formData.aadharUrl && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        ✓ Aadhar Card Uploaded
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-neutral-500">
                  🔒 Information and uploaded documents are securely processed for admissions.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !!uploadingField}
                  className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Registration</span>
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
