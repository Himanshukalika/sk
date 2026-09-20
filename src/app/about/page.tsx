import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Trophy,
  User,
  Settings,
  Building2,
  Target,
  Flame,
  ShieldCheck,
  Award,
  Sparkles,
  Compass,
  ArrowRight,
  GraduationCap,
  HardHat,
  Briefcase,
  Layers,
  HeartHandshake
} from 'lucide-react';
import AcademyLogo from '@/components/AcademyLogo';

export const metadata = {
  title: 'About Us | Shri Krishna Fire & Safety Academy (Paota, Jaipur)',
  description: 'Shri Krishna Fire & Safety Academy (Est. 2014) — Rajasthan’s premier institute for Fire & Industrial Safety training. 750+ successful alumni, 56 selections in 2016, 70 selections in 2021, and Rajasthan State Topper (Rank #1).'
};

const TRAINING_TOPICS = [
  'Fire Prevention & Fire Protection Principles',
  'Fire Extinguishers & Safe Operational Deployment',
  'Fire Hydrant & Fire Fighting System Mechanics',
  'Fire Alarm & Advanced Detection Systems',
  'Emergency Response & Evacuation Procedures',
  'Industrial Safety & Hazard Management',
  'Occupational Health & Environmental Safety',
  'Safety Standards & Safe Work Protocols',
  'Personal Protective Equipment (PPE) Mastery',
  'Basic Rescue Techniques & Life Support First Aid',
  'Emergency & Disaster Management Strategies',
  'Workplace Safety Audits & Risk Assessment',
  'Fire Safety Inspection & Statutory Compliance',
  'Practical Fire Tender Vehicle & Centrifugal Pump Drills'
];

const MILESTONES = [
  {
    year: '2014',
    title: 'Academy Establishment',
    subtitle: 'Foundation of Excellence',
    desc: 'Founded with the mission to deliver high-quality technical education, physical ground drills, and career-oriented skills in Fire & Industrial Safety.'
  },
  {
    year: '2016',
    title: '56+ Government Selections',
    subtitle: 'Rajasthan Fire Service 2016',
    desc: 'An exceptional milestone with 56 candidates successfully selected in the Rajasthan Fire Service examination in a single recruitment cycle.'
  },
  {
    year: '2021',
    title: '70+ Selections & State Topper',
    subtitle: 'Rajasthan Rank #1 Achiever',
    desc: '70 candidates qualified in Rajasthan Fire Service, securing the coveted Rajasthan State Topper (Rank #1) achievement from our academy.'
  },
  {
    year: 'Present',
    title: '750+ Successful Alumni',
    subtitle: 'Govt, Aviation & Industrial Safety',
    desc: 'Over 750 trained professionals actively serving across government fire services, multinational corporations, airports, and industrial complexes.'
  }
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-neutral-900 pb-28 font-sans">
      
      {/* 1. HERO HEADER WITH STATS & BRANDING */}
      <section className="bg-neutral-950 text-white pt-14 pb-16 px-6 sm:px-10 lg:px-12 border-b border-neutral-800 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-neutral-800/80">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-3 bg-neutral-900/80 px-3.5 py-1.5 rounded-full border border-neutral-800">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Established 2014 • Over 11 Years of Excellence</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
                About Us | <span className="text-red-500 font-bold">Shri Krishna Academy</span>
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl">
                Shri Krishna Fire & Safety Academy, Paota (Jaipur) — India&apos;s premier destination for quality safety education, technical mastery, and honorable public service careers.
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <AcademyLogo size="large" variant="dark" />
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10">
            <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-black text-amber-400">11+ Years</span>
              <p className="text-xs text-neutral-300 font-bold mt-1">Proven Legacy</p>
              <p className="text-[11px] text-neutral-500">Since 2014 in Fire Training</p>
            </div>
            <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-black text-red-500">750+</span>
              <p className="text-xs text-neutral-300 font-bold mt-1">Successful Alumni</p>
              <p className="text-[11px] text-neutral-500">Govt & Private Sector Cadets</p>
            </div>
            <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">126+</span>
              <p className="text-xs text-neutral-300 font-bold mt-1">Raj Fire Service Selections</p>
              <p className="text-[11px] text-neutral-500">56 (2016) + 70 (2021)</p>
            </div>
            <div className="bg-neutral-900/90 border border-neutral-800 p-5 rounded-2xl">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400">State #1</span>
              <p className="text-xs text-neutral-300 font-bold mt-1">Rajasthan State Topper</p>
              <p className="text-[11px] text-neutral-500">All-India Rank & Highest Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN STORY: INTRODUCTION & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Institutional Overview & Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
              A Legacy of Discipline, High-Caliber Training & Real-World Readiness
            </h2>

            <div className="prose text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                <strong>Shri Krishna Fire & Safety Academy</strong> was established in <strong>2014</strong> with the primary objective of providing top-tier technical education, rigorous practical training, and career-oriented vocational skills in the fire and industrial safety sector. From its inception, the academy has been dedicated to equipping students with robust theoretical foundations paired with hands-on field experience for safe, honorable, and rewarding careers.
              </p>
              
              <p>
                For over <strong>11 continuous years</strong>, Shri Krishna Fire & Safety Academy has been at the forefront of candidate empowerment, setting benchmarks in safety education across Rajasthan and North India.
              </p>

              <div className="p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl my-4 text-neutral-800 text-sm sm:text-base italic">
                &ldquo;We firmly believe that textbook knowledge alone cannot make a competent safety professional. True excellence requires technical precision, practical drills, unyielding discipline, leadership qualities, swift crisis decision-making, and an uncompromising commitment to life safety.&rdquo;
              </div>

              <p>
                To achieve this, our comprehensive training curriculum places equal emphasis on conceptual classroom theory, <strong>400m athletic track conditioning, dummy carry weight training, and live fire tender pump operations</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Director & Mentorship Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 text-white p-8 rounded-3xl border border-neutral-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 text-amber-400 flex items-center justify-center font-bold mb-6">
                <User className="w-8 h-8 text-amber-400" />
              </div>

              <span className="text-[11px] font-bold uppercase text-amber-400 tracking-wider block">
                Director & Chief Mentor
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                SANDEEP YADAV (S.F.O.)
              </h3>
              
              <div className="mt-4 pt-4 border-t border-neutral-800 space-y-2 text-xs text-neutral-300">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>B.Tech</strong> in Engineering</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>B.Sc. Fire & Safety</strong> Specialist</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Advance Diploma in Industrial Safety</span>
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>NCVT Approved Master Trainer & Ex-S.F.O.</span>
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-neutral-800/80 text-xs text-neutral-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Academy Location:</span>
                  <span className="text-white font-semibold">Paota, Jaipur (Rajasthan)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Helpline / Direct:</span>
                  <span className="text-amber-400 font-bold">+91 96805 05554</span>
                </div>
              </div>
            </div>

            {/* Quick Highlight Box */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Rajasthan State Rank #1</h4>
                  <p className="text-xs text-neutral-500">State Topper from SK Academy</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                Our relentless focus on exam patterns, personal mentorship, and rigorous ground conditioning has consistently produced state rankers and record-setting batch qualification rates.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. JOURNEY & ACHIEVEMENTS TIMELINE */}
      <section className="bg-white py-16 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="text-red-600 text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
              Track Record of Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
              Our Journey & Milestone Achievements
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base">
              From our inception in 2014 to shaping thousands of successful careers across public and corporate sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-50 p-6 rounded-3xl border border-neutral-200/80 hover:border-red-500/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-red-600">{item.year}</span>
                    <span className="p-2 rounded-xl bg-white text-neutral-800 shadow-xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Award className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                  <p className="text-xs font-bold text-neutral-500 mt-0.5">{item.subtitle}</p>
                  <p className="text-xs text-neutral-600 leading-relaxed mt-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 750+ Detailed Selection Feature Card */}
          <div className="mt-10 bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white p-8 sm:p-10 rounded-3xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase">
                <GraduationCap className="w-4 h-4" />
                <span>Our Pride — Our Selected Candidates</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                750+ Trained Professionals Serving Across the Nation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Today, more than 750 alumni from Shri Krishna Fire & Safety Academy are actively serving in state fire brigades, municipal corporations, CISF, defense sectors, oil refineries, and multinational industrial complexes. Their success stands as a testament to our training rigor and dedicated guidance.
              </p>
            </div>
            <Link
              href="/gallery"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-red-600/30"
            >
              <span>View Selection Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. PRACTICAL & EMPLOYMENT-ORIENTED TRAINING CURRICULUM */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Practical & Industry-Oriented Training
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Comprehensive Hands-On Emergency & Safety Modules
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            At Shri Krishna Fire & Safety Academy, students undergo immersive practical training covering the full spectrum of industrial safety, fire suppression systems, and emergency operations:
          </p>
        </div>

        {/* 14 Core Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRAINING_TOPICS.map((topic, index) => (
            <div 
              key={index}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-400 shadow-xs flex items-start gap-3.5 transition-all group"
            >
              <div className="p-2 rounded-xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-neutral-900 block leading-snug">
                  {topic}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  Theory + Live Demonstration Drills
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. COMMITMENT & INDUSTRY DEMAND */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">
                Industry Scope & Career Growth
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Our Unwavering Commitment to Student Careers
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Fire & Industrial Safety is one of the most vital, high-responsibility sectors in modern infrastructure. Manufacturing plants, commercial hubs, high-rise buildings, hospitals, luxury hotels, airports, and public sector undertakings maintain a continuous demand for certified safety professionals.
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We prepare our cadets not just to pass exams, but to emerge as responsible, battle-tested <strong>Fire & Safety Leaders</strong> capable of managing critical emergencies with composure and technical mastery.
              </p>
            </div>

            {/* Scope Badges */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Building2 className="w-6 h-6 text-red-500 mb-2" />
                <h4 className="font-bold text-sm text-white">Industrial & Manufacturing</h4>
                <p className="text-[11px] text-neutral-400 mt-1">Chemical Plants, Factories & Refineries</p>
              </div>
              <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <HardHat className="w-6 h-6 text-amber-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Government Fire Services</h4>
                <p className="text-[11px] text-neutral-400 mt-1">State Fire Brigade, CISF, DFS, Municipal</p>
              </div>
              <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Briefcase className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Malls, Hotels & Hospitals</h4>
                <p className="text-[11px] text-neutral-400 mt-1">Commercial Complexes & Life Safety</p>
              </div>
              <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800">
                <Layers className="w-6 h-6 text-cyan-400 mb-2" />
                <h4 className="font-bold text-sm text-white">Infrastructure & Aviation</h4>
                <p className="text-[11px] text-neutral-400 mt-1">Airports, Metro Rails & Mega Projects</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. VISION & MISSION CARDS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 relative overflow-hidden group hover:border-red-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 block">
              OUR VISION
            </span>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
              Institutional Vision
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To be recognized as India&apos;s foremost benchmark institution in Fire & Safety Education, distinguished by uncompromising discipline, high-grade practical facilities, and high employment success.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
              We envision our graduates not merely obtaining certifications, but stepping forth as skilled, responsible, and visionary safety professionals who inspire trust in critical situations.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200/80 shadow-xs space-y-4 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">
              OUR MISSION
            </span>
            <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
              Institutional Mission
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              To deliver world-class Fire & Safety training programs, empower candidates with industry-standard physical and technical competencies, and prepare them for prestigious public and private career opportunities.
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
              We continuously upgrade our physical grounds, trade test vehicle fleets, and curriculum modules in alignment with modern national safety standards and exam methodologies.
            </p>
          </div>

        </div>
      </section>

      {/* 7. FACILITIES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-16">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Campus Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-2">
            State-of-the-Art Training Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Residential Hostel & Campus</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Safe, hygienic on-campus residential hostel with three nutritious meals daily, round-the-clock security, and a 24x7 quiet study library.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">400m Athletic Physical Ground</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Dedicated 400m running track, 60kg sand dummy deadlift racks, 5-meter vertical rope climbing posts, and standard long jump pits.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Fire Tender Fleet & S.K. Gym</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Academy-owned operational Fire Tender vehicle for driving test preparation and centrifugal pump mechanics, alongside separate gym facilities for boys and girls.
            </p>
          </div>

        </div>
      </section>

      {/* 8. CTA FOOTER BANNER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="bg-neutral-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-neutral-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>Begin Your Preparation Today</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Join Shri Krishna Fire & Safety Academy
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Speak with our senior admission counselor for batch schedules, physical training routines, and hostel seat availability.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/admission"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 text-center"
            >
              Online Admission Form
            </Link>
            <Link
              href="/contact"
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all border border-neutral-700 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
