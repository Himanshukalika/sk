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
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800 px-3.5 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact & Campus Location
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto">
            Reach out for admissions, physical ground training demos, hostel accommodation details, and course schedules.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Contact Information & Visiting Directions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-neutral-900 border-l-4 border-red-600 pl-3">
                Head Office & Training Campus
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">Address:</strong>
                    <span>
                      SK Fire Agency Campus, Near Police Line Ground, Defense Academy Road, Main Highway Circle, Sector 12
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">Phone Helplines:</strong>
                    <a href="tel:+919876543210" className="hover:text-red-600 font-semibold block">
                      +91 98765 43210
                    </a>
                    <a href="tel:+919812345678" className="hover:text-red-600 font-semibold block">
                      +91 98123 45678
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">WhatsApp Admission Desk:</strong>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline font-bold"
                    >
                      +91 98765 43210 (24x7 Chat)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900">Office & Ground Timings:</strong>
                    <span>Ground Workout: 5:00 AM - 08:30 PM (Daily)</span>
                    <span className="block text-neutral-500">Counseling Office: 8:00 AM - 07:00 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* How to Reach / Outstation Assistance */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm text-neutral-900 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-red-600" />
                <span>How to Reach Our Campus</span>
              </h4>

              <div className="space-y-3 text-xs text-neutral-600">
                <div className="flex items-start gap-2.5">
                  <Train className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span><strong>By Train:</strong> Nearest Junction Railway Station is 3.5 Km away. Direct e-rickshaws and cabs operate to Police Line / SK Fire Campus.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Bus className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span><strong>By Bus:</strong> Central Bus Terminal is 2.0 Km away on Defense Academy Highway.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Col 2: Interactive Contact Form & Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Card */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-2xl font-black text-neutral-900">
                  Send Us an Enquiry Message
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Leave your details and questions below. Our counselors will respond promptly.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-8 text-center space-y-3 bg-green-50 rounded-2xl border border-green-200 p-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                  <h4 className="text-xl font-black text-green-950">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-green-800">
                    Thank you for reaching out. We have received your query and will contact you shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-5 py-2 bg-green-600 text-white font-bold text-xs rounded-xl"
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
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Amit Kumar"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500"
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
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Inquiry Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs bg-white focus:ring-2 focus:ring-red-500"
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
                    <label className="block text-xs font-bold text-neutral-700 mb-1">
                      Your Message / Questions *
                    </label>
                    <textarea
                      rows={4}
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your question or message here..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
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

            {/* Embedded Interactive Map Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
              <div className="p-4 bg-neutral-900 text-white flex items-center justify-between text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Campus Location Map</span>
                </span>
                <span className="text-neutral-400">Open 7 Days a Week</span>
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
