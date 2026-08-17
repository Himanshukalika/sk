'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Loader2,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Navigation,
  Bus,
  Train
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Admission Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit contact enquiry.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong. Please call helpline directly.';
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28">
      
      {/* MINIMALIST HEADER MATCHING GALLERY STYLE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            CONTACT US
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Get in touch with Shri Krishna Fire Academy for admissions, campus visits, and helpline assistance.
        </p>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COL: CAMPUS & HELPLINE INFO */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
              <h2 className="text-lg font-semibold text-neutral-900 tracking-tight border-b border-neutral-100 pb-4">
                Head Office & Training Campus
              </h2>

              <div className="space-y-5 text-sm text-neutral-700">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-neutral-900 text-xs uppercase tracking-wider text-neutral-500 mb-0.5">Campus Location</span>
                    <p className="text-neutral-800 leading-snug">
                      Ram Vihar Colony, Near S.H.M. College, Pawta, Jaipur, Rajasthan (303106)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-neutral-900 text-xs uppercase tracking-wider text-neutral-500 mb-0.5">Admission Helplines</span>
                    <div className="space-y-0.5">
                      <a href="tel:+919680505554" className="hover:text-red-600 font-medium block">
                        +91 96805 05554
                      </a>
                      <a href="tel:+918696715101" className="hover:text-red-600 font-medium block">
                        +91 86967 15101
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-neutral-900 text-xs uppercase tracking-wider text-neutral-500 mb-0.5">WhatsApp Desk</span>
                    <a
                      href="https://wa.me/919680505554"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline font-semibold block"
                    >
                      +91 96805 05554 (24x7 Chat Support)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-neutral-900 text-xs uppercase tracking-wider text-neutral-500 mb-0.5">Campus Hours</span>
                    <p className="text-neutral-800">Ground Workout: 5:00 AM - 08:30 PM</p>
                    <p className="text-neutral-500 text-xs">Counseling Desk: 8:00 AM - 07:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visiting & Transport Directions */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-4">
              <h3 className="font-semibold text-sm text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
                <Navigation className="w-4 h-4 text-neutral-500" />
                <span>How to Reach Campus</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span><strong>By Train:</strong> Nearest Junction Station is easily accessible. Direct e-rickshaws and cabs available to Pawta S.H.M. College Circle.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Bus className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span><strong>By Bus:</strong> Pawta Bus Stop is within 1 Km distance on Jaipur-Delhi Highway.</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COL: FORM & MAP */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Card */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-neutral-900">
                  Send Us a Message
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                  Fill in your details below and our counseling team will get back to you shortly.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3 bg-emerald-50/60 rounded-xl border border-emerald-200 p-6">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-lg font-semibold text-emerald-950">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                    Thank you for reaching out. We have received your query and will contact you soon.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2 bg-neutral-900 text-white font-medium text-xs rounded-xl hover:bg-neutral-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30 transition-all"
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
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm bg-neutral-50/30 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all"
                      >
                        <option value="Admission Inquiry">Admission & Batch Timings</option>
                        <option value="Hostel & Mess Facility">Hostel & Mess Facility</option>
                        <option value="Physical Ground Training">Physical Ground Training Only</option>
                        <option value="Fee Structure & Discount">Fee Structure & Concession</option>
                        <option value="Heavy Driving Test Guidance">Fire Operator & Heavy Driving</option>
                        <option value="Other Query">Other Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your question or message here..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300/80 text-xs sm:text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/30 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Map Card */}
            <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs">
              <div className="px-5 py-3.5 bg-neutral-900 text-white flex items-center justify-between text-xs">
                <span className="font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>Campus Location Map</span>
                </span>
                <span className="text-neutral-400 text-[11px]">Pawta, Jaipur</span>
              </div>
              <div className="w-full h-64 bg-neutral-100 flex items-center justify-center relative">
                <iframe
                  title="SK Fire Agency Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.09262729792!2d77.0688998!3d28.6324259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d047309fff32f%3A0xfc6543b59bf7049e!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
