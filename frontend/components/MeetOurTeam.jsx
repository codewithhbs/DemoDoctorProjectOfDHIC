import Link from 'next/link';
import Image from 'next/image';
import {
  FiStar,
  FiCheckCircle,
  FiSmile,
  FiAward,
  FiShield,
  FiHeart,
  FiUsers,
} from 'react-icons/fi';
import { FaTooth } from 'react-icons/fa';

/* =========================================================================
   DATA
   Replace with doctors fetched from your CMS/DB. Each doctor supports the
   original fields (name, qualification, specialization, rating, photo_url,
   slug) plus a few new optional ones used by the rich card below:
   badge, badgeColor ('brand' | 'rose'), highlights[], gallery[].
   If a doctor is missing the new fields, sensible fallbacks are used.
   ========================================================================= */

const TRUST_POINTS = [
  { icon: FaTooth, label: 'Advanced\nTechnology' },
  { icon: FiShield, label: 'Safe & Painless\nTreatments' },
  { icon: FiUsers, label: 'Patient-Centered\nCare' },
  { icon: FiAward, label: 'Experienced\nProfessionals' },
  { icon: FiHeart, label: 'Trusted by\nThousands' },
];

const STATS = [
  { icon: FiSmile, value: '15,000+', label: 'Happy Patients' },
  { icon: FiAward, value: '12+', label: 'Years of Experience' },
  { icon: FiShield, value: '100%', label: 'Patient Satisfaction' },
  { icon: FaTooth, value: 'Advanced', label: 'Dental Clinic' },
  { icon: FiUsers, value: 'Expert Team', label: 'You Can Trust' },
];

const FALLBACK_DOCTORS = [
  {
    id: 1,
    slug: 'anuj-kataria',
    name: 'Dr. Anuj Kataria',
    qualification: 'BDS, MDS (Oral Surgery)',
    specialization: 'Implant Specialist',
    badgeColor: 'brand',
    rating: 4.8,
    photo_url:
      'https://images.unsplash.com/photo-1758691463333-c79215e8bc3b?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Expert in Dental Implants & Oral Surgery',
      'Precision. Comfort. Lasting Results.',
      'Dedicated to Restoring Your Confident Smile',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1758691461990-03b49d969495?auto=format&fit=crop&w=200&q=80',
    ],
  },
  {
    id: 2,
    slug: 'nutan-satyarthi',
    name: 'Dr. Nutan Satyarthi',
    qualification: 'BDS, MDS (Dental Surgeon)',
    specialization: 'Root Canal Specialist',
    badgeColor: 'rose',
    rating: 4.9,
    photo_url:
      'https://images.unsplash.com/photo-1758691462651-611d730c5272?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Specialist in Painless Root Canal Treatments',
      'Saving Natural Teeth with Advanced Care',
      'Gentle Care for Stronger Smiles',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1758691461990-03b49d969495?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1758205308179-4e00e0e4060b?auto=format&fit=crop&w=200&q=80',
    ],
  },
];

/* ---------- feature doctor card (used for the top 1-2 highlighted docs) --------- */

function FeaturedDoctorCard({ doctor, accent }) {
  const isRose = accent === 'rose';
  const badgeBg = isRose ? 'bg-rose-500' : 'bg-brand-600';
  const iconBg = isRose ? 'bg-rose-500' : 'bg-brand-600';
  const checkColor = isRose ? 'text-rose-500' : 'text-brand-500';
  const underline = isRose ? 'bg-rose-400' : 'bg-brand-500';

  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group relative flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      {/* photo */}
      <div className="relative w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto bg-brand-50 shrink-0">
        <Image
          src={doctor.photo_url}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* dotted accent, top-right of photo */}
        <div
          className="hidden sm:block absolute top-4 right-4 w-10 h-10 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
            backgroundSize: '8px 8px',
          }}
        />
        {/* specialization icon badge, bottom-left overlapping */}
        <div
          className={`absolute bottom-4 left-5 w-12 h-12 rounded-full ${iconBg} text-white flex items-center justify-center shadow-lg ring-4 ring-white`}
        >
          <FaTooth className="text-lg" />
        </div>
      </div>

      {/* content */}
      <div className="flex-1 p-6 pt-8 sm:pt-6">
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
          <FiStar className="fill-amber-500 text-amber-500 w-3 h-3" /> {doctor.rating}
        </span>

        <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
        <p className="text-sm text-slate-500 mb-2">{doctor.qualification}</p>
        <span className={`block w-10 h-0.5 ${underline} mb-3`} />

        <span
          className={`inline-flex items-center gap-1.5 ${badgeBg} text-white text-xs font-semibold px-3 py-1.5 rounded-lg mb-4`}
        >
          <FaTooth className="w-3 h-3" /> {doctor.specialization}
        </span>

        <ul className="space-y-2 mb-5">
          {doctor.highlights?.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
              <FiCheckCircle className={`mt-0.5 shrink-0 ${checkColor}`} />
              {point}
            </li>
          ))}
        </ul>

        {doctor.gallery?.length > 0 && (
          <div className="flex gap-2">
            {doctor.gallery.map((src, i) => (
              <div
                key={src + i}
                className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-100"
              >
                <Image src={src} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <span
        className={`absolute bottom-0 left-0 h-0.5 w-0 ${underline} transition-all duration-300 group-hover:w-full`}
      />
    </Link>
  );
}

/* ---------- compact grid card, used when there are more than 2 doctors --------- */

function DoctorCard({ doctor }) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group relative block bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/5"
    >
      <div className="relative w-full aspect-[3/4] bg-brand-50">
        {doctor.photo_url ? (
          <Image
            src={doctor.photo_url}
            alt={doctor.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-300 text-5xl font-bold">
            {doctor.name?.[0] || 'D'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {doctor.rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            <FiStar className="fill-amber-500 text-amber-500 w-3 h-3" /> {doctor.rating}
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-slate-900">{doctor.name}</h3>
        <p className="text-sm text-slate-500 mb-1">{doctor.qualification}</p>
        <p className="text-sm text-brand-600 font-medium">{doctor.specialization}</p>
      </div>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-600 transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

/* ---------- main section --------- */

export default function MeetOurTeam({ doctors = FALLBACK_DOCTORS }) {
  if (!doctors.length) return null;

  const featured = doctors.slice(0, 2);
  const rest = doctors.slice(2);
  const useFeatureLayout = doctors.length <= 2;

  return (
    <section className="relative bg-gradient-to-b from-brand-50/50 via-white to-brand-50/40 py-20 overflow-hidden">
      {/* decorative leaves, bottom corners */}
      <div className="hidden lg:block absolute -bottom-6 left-0 w-40 opacity-70 pointer-events-none">
        <Image
          src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787745454/pngwing.com.png"
          alt=""
          width={220}
          height={220}
        />
      </div>
      <div className="hidden lg:block absolute -bottom-6 right-0 w-40 opacity-70 pointer-events-none scale-x-[-1]">
        <Image
          src="https://res.cloudinary.com/ln9l1ajs/image/upload/v1787745454/pngwing.com.png"
          alt=""
          width={220}
          height={220}
        />
      </div>

      <div className="container-x relative">
        {/* heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block bg-brand-600 text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full mb-4">
            MEET OUR TEAM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
            Expert Doctors Dedicated to{' '}
            <span className="text-brand-600">Your Smile</span>
          </h2>
          <p className="text-slate-500">
            Compassionate care. Advanced expertise. Beautiful results.
          </p>
        </div>

        {/* trust points row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12">
          {TRUST_POINTS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                <Icon className="text-base" />
              </span>
              <span className="text-sm text-slate-700 font-medium whitespace-pre-line leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* doctor cards */}
        {useFeatureLayout ? (
          <div
            className={`grid gap-6 mb-10 ${
              featured.length === 1 ? 'max-w-xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'
            }`}
          >
            {featured.map((d, i) => (
              <FeaturedDoctorCard
                key={d.id}
                doctor={d}
                accent={d.badgeColor || (i === 0 ? 'brand' : 'rose')}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        )}

        {/* stats bar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 sm:px-10 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="text-brand-600 text-2xl shrink-0" />
              <div>
                <p className="text-lg font-extrabold text-brand-700 leading-none">
                  {value}
                </p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {rest.length > 0 && (
          <div className="text-center mt-8">
            <Link href="/doctors" className="btn-outline">
              View All Doctors
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}