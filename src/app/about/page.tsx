import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Trophy,
  User,
  Settings,
  Building2,
  Target
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Shri Krishna Fire and Safety Academy (Pawta Jaipur)',
  description: 'Learn about Shri Krishna Fire and Safety Academy, Pawta Jaipur, Director Sandeep Yadav, NCVT approved courses, physical ground, and rank 1 selection track record.'
};

export default function AboutPage() {
  return (
    <div className="bg-[#f5f4ef] min-h-screen text-neutral-900 pb-28 font-sans">
      
      {/* MINIMALIST HEADER MATCHING GALLERY & CONTACT STYLE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-10">
        <div className="flex items-center gap-4">
          <span className="w-7 sm:w-10 h-[2px] bg-neutral-800 inline-block" />
          <h1 className="text-2xl sm:text-4xl font-normal tracking-[0.2em] text-neutral-900 uppercase">
            ABOUT US
          </h1>
        </div>
        <p className="mt-3 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
          Shri Krishna Fire & Safety Academy (Pawta, Jaipur) — Rajasthan&apos;s premier institute for Fireman, Fire Operator, and Safety courses.
        </p>
      </div>

      {/* DIRECTOR & FOUNDER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Col: Director Profile */}
          <div className="lg:col-span-5 bg-neutral-900 text-white p-8 sm:p-10 rounded-2xl border border-neutral-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-neutral-800 text-amber-400 flex items-center justify-center font-bold text-2xl mb-6 border border-neutral-700">
                <User className="w-8 h-8 text-amber-400" />
              </div>
              
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase text-amber-400 tracking-wider block">
                  Director & Chief Mentor
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  SANDEEP YADAV (S.F.O.)
                </h2>
                <p className="text-xs text-neutral-300 font-medium pt-1">
                  B.Tech, B.Sc. (Fire & Safety)
                </p>
                <p className="text-xs text-neutral-400">
                  Advance Diploma in Industrial Safety • NCVT Approved
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 text-xs text-neutral-400 space-y-2">
              <div className="flex items-center justify-between">
                <span>Campus Location:</span>
                <span className="text-white font-medium">Pawta, Jaipur (Raj)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Helplines:</span>
                <span className="text-amber-400 font-medium">+91 96805 05554</span>
              </div>
            </div>
          </div>

          {/* Right Col: Academy History & Selection Record */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-900 uppercase tracking-wider bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Rajasthan #1 Selection Track Record</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight leading-tight">
                Empowering Youth for Fire Services & Industrial Safety
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                <strong>श्री कृष्णा फायर एकेडमी, पावता (जयपुर)</strong> is Rajasthan&apos;s premier educational coaching institute exclusively dedicated to preparing candidates for Fireman, Fire Driver, Sub Fire Officer, and Industrial Safety competitive examinations.
              </p>
            </div>

            {/* Major Selection Ranks Highlight Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70">
                <div className="text-xl font-bold text-neutral-900">1st & 3rd Rank</div>
                <p className="text-xs font-semibold text-neutral-800 mt-1">Rajasthan Fireman (Driver Post)</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">56 Students Selected in Single Batch</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/70">
                <div className="text-xl font-bold text-neutral-900">70+ Selections</div>
                <p className="text-xs font-semibold text-neutral-800 mt-1">Rajasthan Fire Service 2021</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">Rajasthan Topper from our Academy</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Own Fire Tender Vehicle for practical fire fighting trade test drills.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>S.K. GYM with separate fitness facilities for Boys & Girls.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>S.K. Computer Center offering RS-CIT, PGDCA, Accounts-Tally.</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ACADEMY FACILITIES & INFRASTRUCTURE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight">
            Academy Facilities & Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Campus & Residential Hostel</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Safe, hygienic residential hostel right on campus with 3 balanced meals daily and 24x7 study library.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">400m Physical Ground</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Dedicated 400m athletic track, 60kg dummy weight deadlift racks, 5m vertical rope climb, and long jump pits.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">Practical Vehicles & Gym</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Own Fire Fighting vehicle for driving & centrifugal pump mechanics test, plus S.K. Gym for cadets.
            </p>
          </div>

        </div>
      </section>

      {/* CTA FOOTER CARD */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-12">
        <div className="bg-neutral-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-neutral-800">
          <div>
            <h3 className="text-xl sm:text-2xl font-normal">Ready to Begin Your Preparation?</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">Get in touch with our admissions counselor for batch timings and hostel seats.</p>
          </div>
          <Link
            href="/admission"
            className="bg-white text-neutral-950 hover:bg-neutral-200 font-medium px-6 py-3 rounded-xl text-xs transition-colors shrink-0"
          >
            Book Admission Now
          </Link>
        </div>
      </div>

    </div>
  );
}
