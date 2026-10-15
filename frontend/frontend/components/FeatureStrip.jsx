'use client';

import {
  Sparkles,
  Layers,
  Sun,
  AlignCenter,
  Activity,
  Gem,
  MoveHorizontal,
  Plus,
} from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, label: 'Cosmetic Dentistry' },
  { icon: Layers, label: 'Dental Implants' },
  { icon: Sun, label: 'Teeth Whitening' },
  { icon: AlignCenter, label: 'Invisible Braces' },
  { icon: Activity, label: 'RCT / Root Canal' },
  { icon: Gem, label: 'Zirconia Crown' },
  { icon: MoveHorizontal, label: 'Braces & Orthodontics' },
  { icon: Plus, label: 'More' },
];

export default function FeatureStrip() {
  return (
    <section className="bg-white border-y border-slate-100">
      {/* ── Mobile: 4-col icon grid ── */}
      <div className="md:hidden py-6 px-4">
        <div className="grid grid-cols-4 gap-y-5 gap-x-2">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="size-12 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/60 flex items-center justify-center text-brand-600 ring-1 ring-brand-200/50">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <p className="text-[11px] font-medium leading-tight text-slate-600 line-clamp-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop: auto-scrolling marquee ── */}
      <div className="hidden md:block overflow-hidden">
        <div className="relative">

          <div className="flex">
            {FEATURES.map(({ icon: Icon, label }, i) => (
              <div
                key={`${label}-${i}`}
                className="flex shrink-0 items-center gap-2.5 px-6 py-5 border-r border-slate-100"
              >
                <div className="size-10 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/60 flex items-center justify-center text-brand-600 ring-1 ring-brand-200/50">
                  <Icon className="size-4" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-medium text-slate-700 whitespace-nowrap">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}