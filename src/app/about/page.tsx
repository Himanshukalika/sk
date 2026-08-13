import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Target,
  Users,
  Compass
} from 'lucide-react';

export const metadata = {
  title: 'About Us | SK Fire Agency - Premier Fire & Safety Coaching Institute',
  description: 'Learn about SK Fire Agency coaching academy, our mission, experienced ex-fire officers faculty, physical training ground, and proven selection track record.'
};

export default function AboutPage() {
  const values = [
    {
      title: '100% Exam-Centric Curriculum',
      desc: 'Our study programs are continuously refined against the latest exam patterns, OMR answer keys, and past 10 years solved papers.'
    },
    {
      title: 'Scientific Physical Training',
      desc: 'Supervised by NIS-certified athletic coaches to master 60kg dummy deadlifts, 400m sprint pacing, and vertical rope climbing safely.'
    },
    {
      title: 'Experienced Faculty Mentorship',
      desc: 'Instruction by retired Fire Officers and seasoned subject matter specialists providing personalized performance feedback.'
    },
    {
      title: 'Weekly All-India Benchmarking',
      desc: 'Sunday simulated full-length OMR mock examinations with live rank analysis to objectively evaluate exam readiness.'
    }
  ];

  const faculty = [
    {
      name: 'Sub-Officer S. K. Yadav (Retd.)',
      role: 'Founder & Chief Academic Director',
      exp: '28+ Years in State Fire Services',
      specialty: 'Fire Science, Hydraulics & Rescue Tactics'
    },
    {
      name: 'Coach Baljeet Singh (NIS Certified)',
      role: 'Head Physical Training Coach',
      exp: '14+ Years Ground Training Experience',
      specialty: '400m Track, 60kg Dummy Deadlift, Vertical Rope Grip'
    },
    {
      name: 'Er. Rajesh Bhardwaj',
      role: 'Senior Faculty - General Studies & GK',
      exp: '10+ Years Competitive Exam Mentorship',
      specialty: 'General Science, Logical Reasoning & GK'
    },
    {
      name: 'Mahesh Kumar Sharma',
      role: 'Fire Operator & Driving Test Instructor',
      exp: '12+ Years HMV & Pump Mechanics Instructor',
      specialty: 'Water Tender Operations & Driving Trade Tests'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-red-400 bg-red-950/80 border border-red-800 px-3.5 py-1.5 rounded-full inline-block mb-3">
            About SK Fire Agency
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Institute Introduction & Leadership
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            India&apos;s premier specialized academy for Fire Guard, Fireman, Fire Operator, and Fire & Safety recruitment preparation.
          </p>
        </div>
      </section>

      {/* Main Intro & Clarification */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-red-600" />
                <span>Our Story & Commitment</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                Empowering Aspirants to Excel in Fire and Emergency Services
              </h2>

              <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">
                <p>
                  <strong>SK Fire Agency</strong> is an elite coaching institute and athletic training academy founded with a singular mission: to provide focused, disciplined, and results-driven training for young aspirants aiming to serve in public and industrial fire brigades.
                </p>
                <p>
                  Despite the word &apos;Agency&apos; in our heritage name, we are not a commercial fire safety vendor — we are an <strong>academic coaching academy and physical training ground</strong> preparing candidates for competitive examinations such as Delhi Fire Service (DSSSB), CISF Fireman, State Municipal Fire Services, and Industrial Safety Officers.
                </p>
                <p>
                  Our holistic curriculum combines classroom pedagogy (General Knowledge, Mathematics, Reasoning, Fire Science) with daily morning and evening physical conditioning on our dedicated 400m track, 60kg dummy lifting racks, and vertical ropes.
                </p>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                  <div className="text-2xl font-black text-red-700">1250+</div>
                  <div className="text-xs font-bold text-neutral-700 mt-0.5">Selections in Fire Depts</div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="text-2xl font-black text-amber-700">100%</div>
                  <div className="text-xs font-bold text-neutral-700 mt-0.5">Ground & Practical Facility</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80"
                  alt="SK Fire Agency Classroom"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900">
                Our Vision
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                To stand as India&apos;s most reliable coaching academy where every dedicated candidate dreaming of joining the fire services receives the highest standard of academic education, athletic conditioning, and character building.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-neutral-900">
                Our Mission
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                To maintain state-of-the-art smart classrooms, dedicated athletic grounds, authentic physical testing equipment, and a disciplined residential environment ensuring over 500+ successful firefighter selections every year.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values / Why Students Choose */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Our Core Strengths
            </span>
            <h2 className="text-3xl font-black text-neutral-900">
              Institutional Pillars of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <h4 className="font-extrabold text-base text-neutral-900 pt-1">
                  {v.title}
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Team */}
      <section className="py-16 bg-slate-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-700 bg-neutral-200 px-3 py-1 rounded-full">
              Expert Mentors
            </span>
            <h2 className="text-3xl font-black text-neutral-900">
              Our Faculty & Ground Instructors
            </h2>
            <p className="text-xs text-neutral-600">
              Guided by retired fire service officers and certified athletic coaches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {faculty.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm space-y-3 text-center">
                <div className="w-20 h-20 rounded-full bg-neutral-100 border-2 border-red-500 mx-auto flex items-center justify-center text-red-600">
                  <Users className="w-10 h-10 text-neutral-400" />
                </div>
                <div>
                  <h4 className="font-black text-base text-neutral-900">{f.name}</h4>
                  <p className="text-xs font-bold text-red-600 mt-0.5">{f.role}</p>
                </div>
                <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
                  <p><strong>Experience:</strong> {f.exp}</p>
                  <p className="text-neutral-700"><strong>Specialty:</strong> {f.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-neutral-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to Begin Your Fire Service Career?
          </h3>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            Enroll in our upcoming target batch or visit our campus for a personalized counseling and ground demo session.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/admission"
              className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30"
            >
              Fill Online Admission Form
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm border border-neutral-700"
            >
              Visit Our Campus Ground
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
