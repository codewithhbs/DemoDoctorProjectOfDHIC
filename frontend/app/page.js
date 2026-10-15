import Image from "next/image";
import Link from "next/link";
import {
  FiCheckCircle,
  FiPhoneCall,
  FiCalendar,
  FiShield,
  FiAward,
  FiUsers,
  FiHeart,
  FiArrowRight,
} from "react-icons/fi";
import {
  getServices,
  getDoctors,
  getReviews,
  getSettings,
  getHeroBanners,
} from "@/lib/api";
import ServiceCard from "@/components/ServiceCard";
import DoctorCard from "@/components/DoctorCard";

import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import FeatureStrip from "@/components/FeatureStrip";
import HeroBannerSlider from "@/components/HeroBannerSlider";
import { FaWhatsapp } from "react-icons/fa";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import MeetOurTeam from "@/components/MeetOurTeam";

export const revalidate = 120;
function Eyebrow({ children, light = false }) {
  return (
    <p
      className={`mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] ${
        light ? "text-white/60" : "text-[#1D4ED8]"
      }`}
    >
      <span className={`h-px w-6 ${light ? "bg-white/40" : "bg-[#1D4ED8]"}`} />
      {children}
    </p>
  );
}

function OutlineLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8] active:scale-[0.99]"
    >
      {children} <FiArrowRight size={15} />
    </Link>
  );
}

export default async function HomePage() {
  const [servicesRes, doctorsRes, reviewsRes, settingsRes, bannersRes] =
    await Promise.all([
      getServices(),
      getDoctors(),
      getReviews("?featured=1"),
      getSettings(),
      getHeroBanners(),
    ]);

  const services = (servicesRes?.services || [])
    .filter((s) => s.is_featured)
    .slice(0, 8);
  const doctors = (doctorsRes?.doctors || []).slice(0, 4);
  const reviews = reviewsRes?.reviews || [];
  const settings = settingsRes?.settings || {};
  const banners = bannersRes?.banners || [];
  // console.log(banners);
  const doctorExtras = [
    {
      highlights: [
        "Specialist in Painless Root Canal Treatments",
        "Saving Natural Teeth with Advanced Care",
        "Gentle Care for Stronger Smiles",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1758691461990-03b49d969495?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=200&q=80",
      ],
    },
    {
      highlights: [
        "Expert in Dental Implants & Oral Surgery",
        "Precision. Comfort. Lasting Results.",
        "Dedicated to Restoring Your Confident Smile",
      ],
      gallery: [
        "https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=200&q=80",
        "https://images.unsplash.com/photo-1758691461990-03b49d969495?auto=format&fit=crop&w=200&q=80",
      ],
    },
  ];

  const spreadDoctors = doctors.map((doctor, index) => ({
    ...doctor,
    badgeColor: "brand",
    rating: 4.8,

   

    highlights:  doctorExtras[index]?.highlights,

    gallery: doctorExtras[index]?.gallery || [],
  }));
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />

      {/* HERO */}

      {/* <Hero /> */}

      <HeroBannerSlider
        banners={banners.filter((b) => !b.is_mobile)}
        className="hidden md:block"
      />
      <HeroBannerSlider
        banners={banners.filter((b) => b.is_mobile)}
        className="block md:hidden"
      />
      <div className="flex flex-col">
        {/* Feature strip */}
        <div className="order-2 mx-auto md:order-1">
          <FeatureStrip />
        </div>

        {/* About */}
        <section className="order-3 md:order-2">
          <div className="container-x grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10">
                <Image
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                  alt="Dental Health Care & Implant Centre clinic interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* floating stat */}
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:left-auto sm:-right-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8]">
                  <FiUsers size={20} />
                </span>
                <div>
                  <p className="text-lg font-extrabold leading-none text-slate-900">
                    12,000+
                  </p>
                  <p className="text-[11.5px] text-slate-500">
                    Happy patients treated
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 lg:pt-0">
              <Eyebrow>About Our Clinic</Eyebrow>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
                Advanced dental care you can{" "}
                <span className="text-[#1D4ED8]">trust</span>
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                At Dental Health Care &amp; Implant Centre in Patparganj, Delhi,
                we provide comprehensive dental solutions under one roof —
                modern technology and a team dedicated to painless, effective
                and personalised care.
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Advanced equipment & modern technology",
                  "Hygienic & comfortable environment",
                  "Experienced & caring professionals",
                  "Personalised treatment for every patient",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13.5px] text-slate-700"
                  >
                    <FiCheckCircle
                      size={16}
                      className="mt-0.5 shrink-0 text-[#1D4ED8]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <OutlineLink href="/about">Know more about us</OutlineLink>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
<section className="order-1 bg-gradient-to-b from-[#1D4ED8]/[0.05] to-transparent py-16 md:order-3 lg:py-24">
  <div className="container-x">
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="flex justify-center">
        <Eyebrow>Our Treatments</Eyebrow>
      </div>
      <h2 className="mt-4 text-3xl capitalize font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
        Complete dental solutions for{" "}
        <span className="relative inline-block text-[#1D4ED8]">
          every smile
          <svg
            className="absolute -bottom-1 left-0 w-full"
            viewBox="0 0 200 8"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M2 5.5C40 2 100 1 198 5.5"
              stroke="#1D4ED8"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.3"
            />
          </svg>
        </span>
      </h2>
      <p className="mt-4 text-base text-slate-600">
        From general dentistry to advanced procedures, we cover all your
        dental needs.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
      {services.map((s, i) => (
        <ServiceCard key={s.id} service={s} index={i} />
      ))}
    </div>

    <div className="mt-12 text-center">
      <OutlineLink href="/services">View all treatments</OutlineLink>
    </div>
  </div>
</section>
      </div>

      {/* Why choose us */}

      <WhyChooseUs />
      {/* Doctors */}
      {/* {doctors.length > 0 && (
        <section className="bg-brand-50/50 py-16">
          <div className="container-x">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="section-eyebrow mb-2">Meet Our Team</p>
              <h2 className="text-3xl font-bold text-slate-900">
                Expert Doctors Dedicated to{" "}
                <span className="text-brand-600">Your Smile</span>
              </h2>
            </div>
            <div
              className={`grid gap-6 mb-8 ${doctors.length <= 2 ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto" : "grid-cols-2 lg:grid-cols-3"}`}
            >
              {doctors.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/doctors" className="btn-outline">
                View All Doctors
              </Link>
            </div>
          </div>
        </section>
      )} */}

      <MeetOurTeam doctors={spreadDoctors} />

      {/* Testimonials */}
      {reviews.length > 0 && <Testimonials reviews={reviews} />}
    </>
  );
}
