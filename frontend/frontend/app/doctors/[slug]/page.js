import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiStar, FiCalendar, FiAward, FiClock } from 'react-icons/fi';
import { getDoctorBySlug, getDoctors } from '@/lib/api';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import JsonLd from '@/components/JsonLd';
import { doctorSchema, breadcrumbSchema, SITE_URL } from '@/lib/schema';

export const revalidate = 300;

export async function generateStaticParams() {
  const res = await getDoctors();
  return (res?.doctors || []).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const res = await getDoctorBySlug(params.slug);
  const doctor = res?.doctor;
  if (!doctor) return { title: 'Doctor Not Found' };

  return {
    title: doctor.meta_title || `${doctor.name} — ${doctor.specialization}`,
    description: doctor.meta_description || doctor.bio?.slice(0, 155),
    alternates: { canonical: `${SITE_URL}/doctors/${doctor.slug}` },
    openGraph: { images: doctor.photo_url ? [doctor.photo_url] : [] }
  };
}

export default async function DoctorDetailPage({ params }) {
  const res = await getDoctorBySlug(params.slug);
  if (!res?.doctor) notFound();
  const { doctor, clinics = [], services = [], reviews = [] } = res;

  return (
    <>
      <JsonLd data={doctorSchema(doctor)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Doctors', path: '/doctors' }, { name: doctor.name, path: `/doctors/${doctor.slug}` }])} />

      {/* Header */}
      <section className="relative bg-[#262e45] text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-brand-600/20 blur-3xl" />

        <div className="container-x relative grid md:grid-cols-[220px,1fr] gap-8 items-center">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/10">
            {doctor.photo_url ? (
              <Image src={doctor.photo_url} alt={doctor.name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-brand-600/30 flex items-center justify-center text-5xl font-bold text-white">
                {doctor.name?.[0]}
              </div>
            )}
          </div>

          <div>
            <p className="text-brand-100/60 text-sm mb-2">
              Home <span className="mx-1">/</span> Doctors <span className="mx-1">/</span> {doctor.name}
            </p>
            <h1 className="text-3xl font-extrabold mb-1">{doctor.name}</h1>
            <p className="text-brand-300 font-semibold mb-1">{doctor.specialization}</p>
            <p className="text-brand-100/70 mb-4">{doctor.qualification} · {doctor.experience_years}+ years experience</p>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              {doctor.rating && (
                <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-sm">
                  <FiStar className="fill-amber-400 text-amber-400" /> <span className="font-semibold">{doctor.rating} Rating</span>
                </div>
              )}
              {!!doctor.consultation_fee && (
                <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-sm font-semibold">
                  ₹{doctor.consultation_fee} Consultation Fee
                </div>
              )}
            </div>

            <div>
              <Link
                href={`/appointment?doctor=${doctor.slug}`}
                className="btn-primary inline-flex items-center gap-2"
              >
                <FiCalendar /> Book Appointment with {doctor.name.split(' ')[1]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
          <p className="section-eyebrow mb-2">Profile</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About {doctor.name}</h2>
          <p className="text-slate-600 leading-relaxed mb-12">{doctor.bio}</p>

          {services.length > 0 && (
            <div className="mb-12">
              <p className="section-eyebrow mb-2">Expertise</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Services Offered</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between bg-white border border-slate-100 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-100 hover:shadow-lg hover:shadow-brand-600/5"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">{s.name}</p>
                      {s.duration_minutes ? (
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <FiClock className="w-3 h-3" /> {s.duration_minutes} min
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {reviews.length > 0 && (
            <div>
              <p className="section-eyebrow mb-2">Testimonials</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Patient Reviews</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((r) => <TestimonialCard key={r.id} review={r} />)}
              </div>
            </div>
          )}
        </div>

        <aside>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card sticky top-24">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FiAward className="text-brand-600" /> Available At
            </h3>
            {clinics.map((c) => (
              <div key={c.id} className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0 last:mb-0">
                <p className="font-semibold text-slate-800 text-sm">{c.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{c.address}</p>
              </div>
            ))}
            <Link href={`/appointment?doctor=${doctor.slug}`} className="btn-primary w-full mt-2 text-center">
              Book Appointment
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}