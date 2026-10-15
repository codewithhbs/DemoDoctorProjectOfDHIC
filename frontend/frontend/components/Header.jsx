"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiPhone, FiMail, FiUser, FiLogOut } from "react-icons/fi";
import { getPatientToken, clearPatientToken } from "@/lib/apiClient";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/blog", label: "Blog" },
  { href: "/offers", label: "Offers" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header({ settings = {} }) {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  const phone = settings.phone || "9716590959";
  const email = settings.email || "dentalhealthcare24@gmail.com";

  useEffect(() => {
    setMounted(true);
    setLoggedIn(!!getPatientToken());
  }, []);

  const handleLogout = () => {
    clearPatientToken();
    setLoggedIn(false);
    setOpen(false);
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top utility bar */}
      <div className="hidden md:block bg-brand-900 text-white text-xs">
        <div className="container-x flex items-center justify-between py-2">
          <span className="truncate text-white/80">
            A-122, Chander Vihar, Opp. Ramakrishna Apartment / Kali Mata Mandir,
            I.P. Extension, Patparganj, Delhi – 110092
          </span>
          <div className="flex items-center gap-5 shrink-0">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <FiMail size={13} /> {email}
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
            >
              <FiPhone size={13} /> {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          {settings.logo_url ? (
            <Image
              src={settings.logo_url}
              alt="Dental Health Care & Implant Centre"
              width={44}
              height={44}
              className="rounded-full object-cover w-11 h-11"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
              D
            </div>
          )}
          <div className="leading-tight">
            <p className="font-bold text-lg text-brand-800">
              Dental Health Care
            </p>
            <p className="text-xs text-slate-500 -mt-0.5">& Implant Centre</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-slate-700 hover:text-brand-700 font-medium text-sm transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-brand-600 after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {mounted && loggedIn ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-brand-800 border border-brand-200 rounded-full px-4 py-2 hover:bg-brand-50 transition-colors"
              >
                <FiUser size={15} /> Dashboard
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-brand-800 border border-brand-200 rounded-full px-4 py-2 hover:bg-brand-50 transition-colors"
            >
              Patient Login
            </Link>
          )}
          <Link href="/appointment" className="btn-primary text-sm px-5 py-2.5">
            Book Appointment
          </Link>
        </div>

        <button
          className="lg:hidden text-2xl text-brand-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <div className="container-x py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-700 font-medium py-1.5"
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-slate-100 my-1" />

            {mounted && loggedIn ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-brand-800 font-medium py-1.5"
                >
                  <FiUser size={16} /> Dashboard
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-brand-700 font-medium py-1.5"
              >
                Patient Login
              </Link>
            )}

            <Link
              href="/appointment"
              onClick={() => setOpen(false)}
              className="btn-primary w-full mt-2 text-center"
            >
              Book Appointment
            </Link>
            <a href={`tel:${phone}`} className="btn-outline w-full text-center">
              Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
