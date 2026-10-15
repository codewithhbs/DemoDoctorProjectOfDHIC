const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dentalhealthcareandimplantcentre.in';

export const dentistSchema = (settings = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: settings.site_name || 'Dental Health Care & Implant Centre',
  image: settings.logo_url,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: settings.phone || '9716590959',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'A-122, Chander Vihar, Opp. Ramakrishna Apartment / Kali Mata Mandir, I.P. Extension, Patparganj',
    addressLocality: 'Delhi',
    postalCode: '110092',
    addressCountry: 'IN'
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '14:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '17:00', closes: '21:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '11:00', closes: '14:00' }
  ]
});

export const doctorSchema = (doctor) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: doctor.name,
  jobTitle: doctor.specialization,
  description: doctor.bio,
  image: doctor.photo_url,
  url: `${SITE_URL}/doctors/${doctor.slug}`,
  worksFor: { '@type': 'Dentist', name: 'Dental Health Care & Implant Centre' }
});

export const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  name: service.name,
  description: service.short_description,
  url: `${SITE_URL}/services/${service.slug}`
});

export const articleSchema = (blog) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: blog.title,
  description: blog.excerpt,
  image: blog.cover_image_url,
  author: { '@type': 'Organization', name: blog.author_name },
  datePublished: blog.published_at,
  dateModified: blog.updated_at || blog.published_at,
  mainEntityOfPage: `${SITE_URL}/blog/${blog.slug}`
});

export const faqSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
});

export const breadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`
  }))
});

export { SITE_URL };
