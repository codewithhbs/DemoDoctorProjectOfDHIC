import Link from "next/link";
import Image from "next/image";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiPhoneCall,
  FiMail,
  FiCalendar,
  FiClock,
  FiShield,
  FiChevronRight,
  FiHome,
  FiUser,
  FiGrid,
  FiUsers,
  FiFileText,
  FiMessageCircle,
} from "react-icons/fi";
import { FaWhatsapp, FaTooth } from "react-icons/fa";

/* ---------- static nav data (icons carry meaning: section type) ---------- */

const QUICK_LINKS = [
  { href: "/", label: "Home", icon: FiHome },
  { href: "/about", label: "About Us", icon: FiUser },
  { href: "/services", label: "Services", icon: FiGrid },
  { href: "/doctors", label: "Doctors", icon: FiUsers },
  { href: "/blog", label: "Blog", icon: FiFileText },
  { href: "/contact", label: "Contact Us", icon: FiMessageCircle },
];

const TREATMENTS = [
  { href: "/services/dental-implants", label: "Dental Implants" },
  { href: "/services/teeth-whitening", label: "Teeth Whitening" },
  { href: "/services/braces", label: "Braces & Invisalign" },
  { href: "/services/rct-root-canal", label: "RCT / Root Canal" },
  { href: "/services/zirconia-crown", label: "Zirconia Crown" },
  { href: "/services/cosmetic-dentistry", label: "Cosmetic Dentistry" },
];

export default function Footer({ settings = {} }) {
  const phone = settings.phone || "9716590959";
  const whatsapp = settings.whatsapp || "918527271759";
  const email = settings.email || "dentalhealthcare24@gmail.com";
  const address =
    settings.address ||
    "A-122, Chander Vihar, Opp. Ramakrishna Apartment / Kali Mata Mandir, I.P. Extension, Patparganj, Delhi – 110092";
  const year = new Date().getFullYear();

  return (
    <>
      {/* ================= CTA STRIP ================= */}
      <section className="relative bg-[#262e45] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
    url("https://res.cloudinary.com/ln9l1ajs/image/upload/v1787741302/bf326047-1d07-471b-85ca-ae695be13a59.jpg"),
    radial-gradient(circle, #fff 1px, transparent 1px)
  `,
            backgroundSize: "cover, 24px 24px",
            backgroundPosition: "center, 0 0",
          }}
        />
        <div className="absolute -top-32 -right-20 w-80 h-80 rounded-full bg-brand-600/20 blur-3xl" />
        {/* decorative tooth, hidden on small screens so it never collides with text */}
        <div className="hidden lg:block absolute bottom-5 right-24 opacity-90">
          <Image
            src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787741436/b1c2ee8e-73e4-4723-8097-3a275250e049.png"
            alt=""
            width={220}
            height={220}
            className="drop-shadow-2xl"
          />
        </div>

        <div className="container-x relative py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-eyebrow text-brand-300 mb-2">Get In Touch</p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-3">
              Have a Question? We&apos;re Here to Help!
            </h2>
            <p className="text-brand-100/80 mb-6">
              Call us or WhatsApp us to book your appointment today.
            </p>

            <div className="flex items-start gap-3 border-t border-white/10 pt-5">
              <FiCalendar className="text-brand-300 mt-0.5 shrink-0" />
              <div className="text-sm text-brand-100/80 space-y-1">
                <p>
                  <strong className="text-white font-medium">
                    Monday–Saturday:
                  </strong>{" "}
                  10:00 AM–2:00 PM &amp; 5:00 PM–9:00 PM
                </p>
                <p>
                  <strong className="text-white font-medium">Sunday:</strong>{" "}
                  11:00 AM–2:00 PM (Appointment Only)
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <a
              href={`tel:${phone}`}
              className="group flex items-center justify-center gap-2 bg-white text-brand-700 font-semibold px-6 py-3.5 rounded-xl text-center transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FiPhoneCall className="transition-transform group-hover:rotate-12" />{" "}
              {phone}
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 font-semibold px-6 py-3.5 rounded-xl text-center transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ================= MAIN FOOTER ================= */}
      <footer className="relative bg-slate-50 text-slate-700 overflow-hidden">
        {/* faint decorative dental-mirror image, desktop only */}
        <div className="hidden xl:block absolute top-5 right-6 opacity-90 pointer-events-none">
          <Image
            src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787741054/Gemini_Generated_Image_id1a94id1a94id1a.png"
            alt=""
            width={260}
            height={300}
          />
        </div>

        <div className="container-x relative py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + about */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaTooth className="text-brand-600 text-2xl" />
              <p className="text-slate-900 font-bold text-lg leading-tight">
                Dental Health Care &amp; Implant Centre
              </p>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              We are dedicated to providing world-class dental care with a
              gentle touch. Your smile is our priority.
            </p>
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.facebook.com/DentalHealthCareandImplantCentre/"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
              >
                <FiFacebook />
              </a>
              <a
                href="https://www.instagram.com/dentalhealthcareimplantcentre/"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-colors"
              >
                <FiInstagram />
              </a>
        
            </div>

            {/* promo card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-3 flex gap-3 items-center shadow-sm">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787741190/Hi_tech_Dental_Chair.jpg"
                  alt="Dental chair"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-slate-900 font-semibold text-sm leading-snug">
                  Healthy Smile, Happy Life!
                </p>
                <p className="text-xs text-slate-500 mb-2">
                  Book your appointment today and take the first step towards a
                  better smile.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Book Appointment <FiChevronRight />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-slate-900 font-semibold mb-4 pb-2 border-b-2 border-brand-600 inline-block">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2.5 hover:text-brand-600 transition-colors"
                  >
                    <Icon className="text-brand-500 shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <p className="text-slate-900 font-semibold mb-4 pb-2 border-b-2 border-brand-600 inline-block">
              Our Treatments
            </p>
            <ul className="space-y-2.5 text-sm text-slate-500">
              {TREATMENTS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2.5 hover:text-brand-600 transition-colors"
                  >
                    <FaTooth className="text-brand-500 shrink-0 text-xs" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-slate-900 font-semibold mb-4 pb-2 border-b-2 border-brand-600 inline-block">
              Contact Info
            </p>
            <ul className="space-y-3 text-sm text-slate-500 mb-5">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 shrink-0 text-brand-500" />{" "}
                {address}
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-brand-500" />
                <a href={`tel:${phone}`} className="hover:text-brand-600">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-brand-500" />
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600"
                >
                  +91 {whatsapp?.replace("91", "")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-brand-500" />
                <a href={`mailto:${email}`} className="hover:text-brand-600">
                  {email}
                </a>
              </li>
            </ul>

            <div className="rounded-2xl bg-brand-600 text-white p-4 flex items-start gap-3">
              <FiClock className="mt-0.5 shrink-0" />
              <div className="text-sm leading-relaxed">
                <p className="font-semibold mb-1">We&apos;re Open</p>
                <p className="text-brand-50/90">
                  Mon – Sat: 10:00 AM – 2:00 PM
                  <br />
                  &amp; 5:00 PM – 9:00 PM
                </p>
                <p className="text-brand-50/90">Sunday: 11:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 bg-[#262e45] text-slate-300">
          <div className="container-x py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="flex items-center gap-2">
              <FiShield className="text-brand-400" /> Your Smile. Our Passion.
              Exceptional Care.
            </p>
            <p className="text-slate-400">
              © {year} Dental Health Care &amp; Implant Centre. All Rights
              Reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= FLOATING QUICK-CONTACT BUTTONS ================= */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform hover:scale-105"
        >
          <FaWhatsapp size={22} />
        </a>
        <a
          href={`tel:${phone}`}
          aria-label="Call us"
          className="w-12 h-12 rounded-full bg-brand-600 hover:bg-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 transition-transform hover:scale-105"
        >
          <FiPhone size={20} />
        </a>
      </div>
    </>
  );
}
