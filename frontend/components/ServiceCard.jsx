import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

export default function ServiceCard({ service }) {
  const img = service.banner_image_url || service.icon_url;
  const price = parseFloat(service.base_price);
  const isFree = price === 0;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#1D4ED8]/10 hover:ring-[#1D4ED8]/30"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D4ED8]/[0.06]">
        {img ? (
          <Image
            src={img}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-4xl opacity-40">
            🦷
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* <div className="absolute left-3 top-3 flex items-center gap-2">
          {isFree ? (
            <span className="rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              Free
            </span>
          ) : Number.isFinite(price) && price > 0 ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-900 shadow-sm backdrop-blur-sm">
              ₹{price.toLocaleString('en-IN')}
            </span>
          ) : null}
        </div> */}

        <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-[#1D4ED8] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FiArrowRight size={16} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[15px] font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[#1D4ED8]">
          {service.name}
        </h3>

        {service.short_description && (
          <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-slate-500">
            {service.short_description}
          </p>
        )}

        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#1D4ED8]">
            View details
            <FiArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}