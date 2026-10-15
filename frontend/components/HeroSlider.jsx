'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80';

export default function HeroSlider({ banners = [] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const slides = banners.length > 0 ? banners : [{ id: 'fallback', image_url: FALLBACK_IMAGE, title: null, subtitle: null, cta_text: null, cta_link: null }];

  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setIndex(i);
  };

  return (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <Image
            src={slide.image_url}
            alt={slide.title || 'Dental Health Care & Implant Centre'}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {(slide.title || slide.subtitle || slide.cta_text) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6">
              {slide.title && <p className="text-white font-bold text-lg leading-snug mb-1">{slide.title}</p>}
              {slide.subtitle && <p className="text-white/85 text-sm mb-4 line-clamp-2">{slide.subtitle}</p>}
              {slide.cta_text && slide.cta_link && (
                <Link href={slide.cta_link} className="self-start bg-white text-brand-700 font-semibold text-sm px-4 py-2 rounded-lg">
                  {slide.cta_text}
                </Link>
              )}
            </div>
          )}
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}