import Image from 'next/image';
import Link from 'next/link';
import {
  FiUser,
  FiCpu,
  FiHeart,
  FiUsers,
  FiShield,
  FiCalendar,
  FiSmile,
  FiAward,
  FiStar,
  FiArrowRight,
} from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';

/* ---------- content data ---------- */

const FEATURES = [
  {
    icon: FiUser,
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    title: 'Expert Dentists',
    desc: 'Highly qualified & experienced dental professionals dedicated to your oral health.',
  },
  {
    icon: FiCpu,
    image:
      'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=800&q=80',
    title: 'Modern Technology',
    desc: 'Advanced equipment for precise diagnosis and painless treatment.',
  },
  {
    icon: FiHeart,
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
    title: 'Painless Treatment',
    desc: 'Comfortable procedures with minimal discomfort and maximum care.',
  },
  {
    icon: FiUsers,
    image:
      'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=800&q=80',
    title: 'Patient First Approach',
    desc: 'Personalized care & attention for every patient, every step of the way.',
  },
  {
    icon: FiShield,
    image:
      'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=800&q=80',
    title: 'Hygiene & Safety',
    desc: 'Strict sterilization & safety protocols followed for your peace of mind.',
  },
  {
    icon: FiCalendar,
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    title: 'Flexible Timing',
    desc: 'Convenient morning & evening appointment slots for you.',
  },
];

const STATS = [
  { icon: FiSmile, value: '10K+', label: 'Happy Patients', sub: 'And counting' },
  { icon: FiAward, value: '15+', label: 'Years of Experience', sub: 'In dental care' },
  { icon: FaTooth, value: '20+', label: 'Advanced Treatments', sub: 'Under one roof' },
  { icon: FiStar, value: '4.9/5', label: 'Patient Rating', sub: 'Google Reviews' },
];

export default function WhyChooseUs({ settings = {} }) {
  return (
    <section className="relative bg-gradient-to-b from-brand-50/60 via-white to-brand-50/40 overflow-hidden py-20">
      {/* decorative dotted grid, top-left */}
      <div
        className="hidden md:block absolute top-10 left-6 w-40 h-40 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
        }}
      />
    
      {/* decorative tooth-shield, top-right */}
      <div className="hidden lg:block absolute -top-4 right-0 opacity-95 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787741054/Gemini_Generated_Image_id1a94id1a94id1a.png"
          alt=""
          width={280}
          height={280}
        />
      </div>

      <div className="container mx-auto relative">
        {/* ---------- heading ---------- */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-brand-300" />
            <span className="section-eyebrow text-brand-600 flex items-center gap-1.5">
              <FaTooth /> Why Choose Us
            </span>
            <span className="w-8 h-px bg-brand-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
            Because Your Smile Deserves{' '}
            <span className="text-brand-600">the Best</span>
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            We combine expertise, advanced technology, and genuine care to
            deliver exceptional dental experiences.
          </p>
        </div>

        {/* ---------- feature grid ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-10">
          {FEATURES.map(({ icon: Icon, image, title, desc }) => (
            <div
              key={title}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5"
            >
              <div className="relative w-16 h-16 mx-auto -mt-10 mb-4 rounded-full bg-brand-50 border-4 border-white shadow-sm flex items-center justify-center">
                <Icon className="text-brand-600 text-2xl" />
              </div>

              <div className="rounded-xl overflow-hidden mb-4 aspect-[4/3]">
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-slate-900 font-bold text-lg text-center mb-2">
                {title}
              </h3>
              <p className="text-slate-500 text-sm text-center leading-relaxed mb-4">
                {desc}
              </p>
              <span className="block w-8 h-1 bg-brand-500 rounded-full mx-auto" />
            </div>
          ))}
        </div>

        {/* ---------- stats + CTA bar ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* stats */}
          <div className="bg-brand-50/70 rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-600/30">
                  <Icon className="text-xl" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-700 leading-none mb-1">
                    {value}
                  </p>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {label}
                  </p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA panel */}
          <div className="relative rounded-2xl bg-brand-600 overflow-hidden flex items-end min-h-[180px]">
            <div className="relative z-10 p-6 sm:p-8">
              <p className="text-white font-bold text-lg mb-1">
                Ready for a Better Smile?
              </p>
              <p className="text-brand-50/90 text-sm mb-4">
                Book your appointment today!
              </p>
              <Link
                href="/appointment?step=1&pay=clinic"
                className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold text-sm px-5 py-2.5 rounded-xl transition-transform hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book Appointment <FiArrowRight />
              </Link>
            </div>
            <div className="absolute inset-y-0 right-0 w-1/5 hidden sm:block">
              <Image
                src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787742221/dent-removebg-preview.png"
                alt="Happy patient"
                fill
                sizes="140px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-600 via-brand-600/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* bottom wave accent */}
      <div className="absolute -bottom-1 left-0 right-0 h-16 bg-brand-100/60 rounded-t-[50%] scale-x-125 pointer-events-none" />
    </section>
  );
}