'use client';

import { Heart, ShieldCheck, Sparkles, Smile, Calendar, Phone, Star } from 'lucide-react';
import Image from 'next/image';

const DEFAULT_FEATURES = [
  { icon: <Smile className="w-6 h-6" />, label: 'Expert Doctors' },
  { icon: <ShieldCheck className="w-6 h-6" />, label: 'Advanced Technology' },
  { icon: <Heart className="w-6 h-6" />, label: 'Painless & Comfortable' },
  { icon: <Smile className="w-6 h-6" />, label: 'Personalized Care' },
];


export default function Hero({
  eyebrow = 'Your Smile, Our Priority',
  titleLine1 = 'Better Care for a',
  titleLine2 = 'Brighter Smile!',
  description = 'We combine advanced dental technology with a gentle, personalized approach to help you achieve a healthy, beautiful smile that lasts a lifetime.',
  bookHref = '/appointment',
  callHref = 'tel:+919716590959',
  patientsCount = '2000+',
  yearsExperience = '10+',
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="min-w-0 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2">
              <Heart className="w-4 h-4 text-blue-600 shrink-0" fill="currentColor" />
              <span className="text-sm font-semibold text-blue-700">{eyebrow}</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight text-slate-900">
              {titleLine1}
              <br />
              <span className="relative inline-block text-blue-600">
                {titleLine2}

                <svg
                  className="absolute -bottom-1 left-[75%] -translate-x-1/2 w-[40%] h-3"
                  viewBox="0 0 300 24"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 14C40 4 90 4 150 14C210 24 260 24 296 10"
                    stroke="#2563eb"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-md">
              {description}
            </p>

            {/* Feature icons row */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5 max-w-lg">
              {DEFAULT_FEATURES.map((f) => (
                <div key={f.label} className="flex flex-col items-center text-center gap-2 w-16">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-600 leading-tight">{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col xs:flex-row sm:flex-row gap-3">
              <a
                href={bookHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
              <a
                href={callHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 bg-white px-6 py-3.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Trust bar */}
            <div className="mt-8 flex flex-wrap sm:flex-nowrap items-center gap-x-5 gap-y-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm max-w-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex -space-x-3 shrink-0">
                  {[
                    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">Trusted by {patientsCount} Happy Patients</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-9 bg-slate-200 shrink-0" />

              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-extrabold text-blue-700 leading-none">{yearsExperience}</div>
                  <span className="text-xs text-slate-500">Years of Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — image */}
          <div className="relative max-w-md mx-auto lg:max-w-none lg:mx-0 mt-6 lg:mt-0">
            {/* Soft blue backdrop blob behind image */}
            <div
              className="absolute -inset-4 sm:-inset-6 bg-blue-50 -z-10"
              style={{ borderRadius: '45% 55% 60% 40% / 55% 45% 55% 45%' }}
              aria-hidden="true"
            />

            {/* Decorative dot grid — desktop only */}
            <div
              className="hidden sm:grid absolute -top-4 right-6 grid-cols-6 gap-1.5 opacity-70 pointer-events-none z-20"
              aria-hidden="true"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              ))}
            </div>

            <div
              className="relative overflow-hidden aspect-[4/5] shadow-2xl shadow-blue-900/10"
              style={{ borderRadius: '84% 16% 65% 35% / 50% 64% 36% 50%' }}
            >
              <Image
                src="/hero.jpg"
                alt="Dentist providing professional dental care"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating card — bottom left */}
            <div className="absolute -bottom-6 left-0 sm:-left-6 bg-white rounded-2xl shadow-xl p-4 sm:p-5 w-52 sm:w-64 border border-slate-100 z-20">
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-3">
                <Smile className="w-5 h-5 text-white" />
              </div>
              <p className="font-extrabold text-slate-900 leading-tight text-sm sm:text-base">
                Healthy Smile,<br /><span className="text-blue-600">Happy You!</span>
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-2 leading-relaxed">
                From routine check-ups to advanced treatments, we&apos;re here for all your dental needs.
              </p>
              <div className="h-1 w-10 rounded-full bg-blue-600 mt-3" />
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute bottom-24 sm:bottom-10 right-0 sm:-right-4 bg-blue-600 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 z-20">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white leading-tight">
                Safe. Hygienic.<br />Trusted.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}