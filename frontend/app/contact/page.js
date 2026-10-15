import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getSettings } from '@/lib/api';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, SITE_URL } from '@/lib/schema';

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: 'Contact Us',
    description: 'Get in touch with Dental Health Care & Implant Centre in Patparganj, Delhi. Call, WhatsApp or visit us for your dental care needs.',
    alternates: { canonical: `${SITE_URL}/contact` }
  };
}

export default async function ContactPage() {
  const settingsRes = await getSettings();
  const settings = settingsRes?.settings || {};

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact Us', path: '/contact' }])} />

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

        <div className="container-x relative">
          <p className="section-eyebrow text-brand-300 mb-2">Reach Out</p>
          <h1 className="text-4xl font-extrabold mb-3">Contact Us</h1>
          <p className="text-brand-100/70 max-w-xl">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </section>

      <section className="container-x py-16 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <div className="space-y-4 mb-8">
            {[
              [FiMapPin, 'Address', settings.address || 'A-122, Chander Vihar, Opp. Ramakrishna Apartment / Kali Mata Mandir, I.P. Extension, Patparganj, Delhi – 110092'],
              [FiPhone, 'Phone', `${settings.phone || '9716590959'} / +91 ${settings.whatsapp?.replace('91', '') || '8527271759'}`],
              [FiMail, 'Email', settings.email || 'dentalhealthcare24@gmail.com'],
              [FiClock, 'Clinic Timing', 'Mon–Sat: 10 AM–2 PM & 5 PM–9 PM · Sun: 11 AM–2 PM (Appointment Only)']
            ].map(([Icon, title, val]) => (
              <div
                key={title}
                className="group flex items-start gap-4 bg-white border border-slate-100 rounded-xl p-4 transition-all duration-300 hover:border-brand-100 hover:shadow-lg hover:shadow-brand-600/5"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 text-lg shrink-0 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="text-sm text-slate-600">{val}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${settings.whatsapp || '918527271759'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2"
          >
            <FaWhatsapp /> Chat on WhatsApp
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-card border border-slate-100 h-80 lg:h-full min-h-[420px]">
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps?q=A-122%20Chander%20Vihar%20Patparganj%20Delhi%20110092&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}