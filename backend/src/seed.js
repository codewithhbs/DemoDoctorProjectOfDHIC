/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const pool = require('./config/db');
require('dotenv').config();

const CLINIC_TIMING = {
  mon_sat: [
    ['10:00', '14:00'],
    ['17:00', '21:00']
  ],
  sun: [['11:00', '14:00']]
};

const DOCTOR_WEEKLY = {
  mon: [['10:00', '14:00'], ['17:00', '21:00']],
  tue: [['10:00', '14:00'], ['17:00', '21:00']],
  wed: [['10:00', '14:00'], ['17:00', '21:00']],
  thu: [['10:00', '14:00'], ['17:00', '21:00']],
  fri: [['10:00', '14:00'], ['17:00', '21:00']],
  sat: [['10:00', '14:00'], ['17:00', '21:00']],
  sun: [['11:00', '14:00']]
};

async function seed() {
  const conn = await pool.getConnection();
  try {
    console.log('🌱 Seeding started...');

    // ---------- ADMIN ----------
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dentalhealthcareandimplantcentre.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await conn.query(
      `INSERT INTO admin_users (name, email, password, role) VALUES (?,?,?,'superadmin')
       ON DUPLICATE KEY UPDATE password = VALUES(password)`,
      ['Super Admin', adminEmail, hashedPassword]
    );
    console.log(`✅ Admin user: ${adminEmail} / ${adminPassword}`);

    // ---------- CLINIC ----------
    const [clinicResult] = await conn.query(
      `INSERT INTO clinics (name, slug, address, city, state, pincode, phone, appointment_number, whatsapp_number, email, timing_json, slot_duration_minutes)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE address = VALUES(address)`,
      [
        'Dental Health Care & Implant Centre',
        'dental-health-care-implant-centre',
        'A-122, Chander Vihar, Opp. Ramakrishna Apartment / Kali Mata Mandir, I.P. Extension, Patparganj, Delhi – 110092',
        'Delhi', 'Delhi', '110092',
        '9716590959', '9716590959', '8527271759',
        'dentalhealthcare24@gmail.com',
        JSON.stringify(CLINIC_TIMING),
        30
      ]
    );
    const [[clinicRow]] = await conn.query('SELECT id FROM clinics WHERE slug = ?', ['dental-health-care-implant-centre']);
    const clinicId = clinicRow.id;
    console.log(`✅ Clinic seeded (id=${clinicId})`);

    // ---------- SERVICE CATEGORIES ----------
    const categories = [
      ['Cosmetic Dentistry', 'cosmetic-dentistry'],
      ['Restorative & Prosthodontics', 'restorative-prosthodontics'],
      ['Orthodontics', 'orthodontics'],
      ['Endodontics & Surgery', 'endodontics-surgery']
    ];
    const categoryIds = {};
    for (const [name, slug] of categories) {
      await conn.query(
        `INSERT INTO service_categories (name, slug) VALUES (?,?) ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        [name, slug]
      );
      const [[row]] = await conn.query('SELECT id FROM service_categories WHERE slug = ?', [slug]);
      categoryIds[slug] = row.id;
    }
    console.log('✅ Service categories seeded');

    // ---------- SERVICES ----------
    const services = [
      {
        name: 'Cosmetic Dentistry', slug: 'cosmetic-dentistry', category: 'cosmetic-dentistry',
        short: 'Enhance your smile with the best cosmetic dental treatments.',
        price: 5000, duration: 60,
        desc: '<p>Our cosmetic dentistry treatments are designed to enhance the appearance of your teeth, gums and overall smile using modern, minimally invasive techniques.</p>'
      },
      {
        name: 'Dental Implants', slug: 'dental-implants', category: 'restorative-prosthodontics',
        short: 'Permanent solutions for missing teeth with natural look.',
        price: 25000, duration: 90,
        desc: '<p>Dental implants are titanium posts surgically placed into the jawbone to replace missing teeth, offering a long-lasting, natural-looking solution.</p>'
      },
      {
        name: 'Teeth Whitening', slug: 'teeth-whitening', category: 'cosmetic-dentistry',
        short: 'Remove stains and discoloration for a brighter smile.',
        price: 3500, duration: 60,
        desc: '<p>Professional in-clinic teeth whitening removes years of stains from tea, coffee, tobacco and aging, giving you a brighter, more confident smile in one sitting.</p>'
      },
      {
        name: 'Braces', slug: 'braces', category: 'orthodontics',
        short: 'Traditional braces to align your teeth perfectly.',
        price: 15000, duration: 60,
        desc: '<p>Metal and ceramic braces gradually move teeth into proper alignment, correcting bite issues and crowding for a healthier, straighter smile.</p>'
      },
      {
        name: 'Invisible Braces', slug: 'invisible-braces', category: 'orthodontics',
        short: 'Clear aligners for straight teeth without visible wires.',
        price: 20000, duration: 60,
        desc: '<p>Clear, removable aligners straighten teeth discreetly without metal wires or brackets — ideal for adults and professionals.</p>'
      },
      {
        name: 'RCT / Root Canal', slug: 'rct-root-canal', category: 'endodontics-surgery',
        short: 'Single sitting root canal treatment for pain relief and healing.',
        price: 4000, duration: 60,
        desc: '<p>Root canal treatment removes infected pulp from inside a tooth, relieving pain and saving the natural tooth from extraction — often completed in a single sitting.</p>'
      },
      {
        name: 'Zirconia Crown', slug: 'zirconia-crown', category: 'restorative-prosthodontics',
        short: 'Metal-free, aesthetic crowns for strong and beautiful teeth.',
        price: 7000, duration: 60,
        desc: '<p>Zirconia crowns are metal-free, highly durable and cosmetically superior, restoring damaged teeth with a natural translucent finish.</p>'
      },
      {
        name: 'Flap Surgery', slug: 'flap-surgery', category: 'endodontics-surgery',
        short: 'Advanced gum treatment for healthy and strong gums.',
        price: 6000, duration: 60,
        desc: '<p>Flap surgery treats advanced gum disease by cleaning below the gumline and reshaping tissue to restore gum and bone health.</p>'
      },
      {
        name: 'Fiber Splint', slug: 'fiber-splint', category: 'restorative-prosthodontics',
        short: 'Quick relief for loose or mobile teeth with fiber jewellery.',
        price: 3000, duration: 45,
        desc: '<p>Fiber splinting stabilizes loose or mobile teeth by bonding them together with a strong, tooth-coloured fiber ribbon.</p>'
      },
      {
        name: 'Dental Jewellery', slug: 'dental-jewellery', category: 'cosmetic-dentistry',
        short: 'Add sparkle to your smile with safe and stylish dental jewellery.',
        price: 2000, duration: 30,
        desc: '<p>Dental jewellery adds a stylish sparkle to your smile using safe, dentist-grade crystals bonded painlessly to the tooth surface.</p>'
      },
      {
        name: 'Metal-Free Crown', slug: 'metal-free-crown', category: 'restorative-prosthodontics',
        short: 'Biocompatible, aesthetic restorations for complete dental care.',
        price: 6500, duration: 60,
        desc: '<p>Metal-free crowns offer biocompatible, natural-looking restorations free from metal allergies or grey margins.</p>'
      }
    ];

    const serviceIds = {};
    for (const s of services) {
      await conn.query(
        `INSERT INTO services (category_id, name, slug, short_description, description, base_price, duration_minutes, is_featured, display_order)
         VALUES (?,?,?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE short_description = VALUES(short_description)`,
        [categoryIds[s.category], s.name, s.slug, s.short, s.desc, s.price, s.duration, 1, 0]
      );
      const [[row]] = await conn.query('SELECT id FROM services WHERE slug = ?', [s.slug]);
      serviceIds[s.slug] = row.id;
    }
    console.log(`✅ ${services.length} services seeded`);

    // ---------- DOCTORS ----------
    const doctors = [
      {
        name: 'Dr. Amit Bansal', slug: 'dr-amit-bansal', qualification: 'BDS, MDS (Oral Surgery)',
        specialization: 'Implant Specialist', experience: 12, rating: 4.8,
        bio: 'Dr. Amit Bansal is a highly experienced oral surgeon and implant specialist with over a decade of expertise in dental implants and surgical procedures.'
      },
      {
        name: 'Dr. Neha Sharma', slug: 'dr-neha-sharma', qualification: 'BDS, MDS (Orthodontics)',
        specialization: 'Braces & Aligners Expert', experience: 9, rating: 4.7,
        bio: 'Dr. Neha Sharma specializes in orthodontics, helping patients achieve perfectly aligned smiles through braces and clear aligners.'
      },
      {
        name: 'Dr. Pooja Verma', slug: 'dr-pooja-verma', qualification: 'BDS, MDS (Conservative)',
        specialization: 'Root Canal Specialist', experience: 8, rating: 4.9,
        bio: 'Dr. Pooja Verma is a conservative dentistry and endodontics expert known for painless, single-sitting root canal treatments.'
      },
      {
        name: 'Dr. Rahul Malhotra', slug: 'dr-rahul-malhotra', qualification: 'BDS, MDS (Preosthodontics)',
        specialization: 'Cosmetic Dentistry Expert', experience: 10, rating: 4.7,
        bio: 'Dr. Rahul Malhotra focuses on cosmetic and prosthodontic dentistry, crafting beautiful, natural-looking smiles for every patient.'
      }
    ];

    const doctorIds = {};
    for (const d of doctors) {
      await conn.query(
        `INSERT INTO doctors (name, slug, qualification, specialization, bio, experience_years, rating)
         VALUES (?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE bio = VALUES(bio)`,
        [d.name, d.slug, d.qualification, d.specialization, d.bio, d.experience, d.rating]
      );
      const [[row]] = await conn.query('SELECT id FROM doctors WHERE slug = ?', [d.slug]);
      doctorIds[d.slug] = row.id;

      // map every doctor to the single clinic with full weekly availability
      await conn.query(
        `INSERT INTO doctor_clinics (doctor_id, clinic_id, weekly_availability)
         VALUES (?,?,?)
         ON DUPLICATE KEY UPDATE weekly_availability = VALUES(weekly_availability)`,
        [row.id, clinicId, JSON.stringify(DOCTOR_WEEKLY)]
      );
    }
    console.log(`✅ ${doctors.length} doctors seeded with clinic availability`);

    // ---------- DOCTOR-SERVICE FEES ----------
    const doctorServiceMap = [
      ['dr-amit-bansal', 'dental-implants', 25000, 90],
      ['dr-amit-bansal', 'flap-surgery', 6000, 60],
      ['dr-amit-bansal', 'zirconia-crown', 7000, 60],
      ['dr-neha-sharma', 'braces', 15000, 60],
      ['dr-neha-sharma', 'invisible-braces', 20000, 60],
      ['dr-pooja-verma', 'rct-root-canal', 4000, 60],
      ['dr-pooja-verma', 'fiber-splint', 3000, 45],
      ['dr-rahul-malhotra', 'cosmetic-dentistry', 5000, 60],
      ['dr-rahul-malhotra', 'teeth-whitening', 3500, 60],
      ['dr-rahul-malhotra', 'dental-jewellery', 2000, 30],
      ['dr-rahul-malhotra', 'metal-free-crown', 6500, 60]
    ];
    for (const [docSlug, svcSlug, fee, dur] of doctorServiceMap) {
      await conn.query(
        `INSERT INTO doctor_services (doctor_id, service_id, fee, duration_minutes)
         VALUES (?,?,?,?)
         ON DUPLICATE KEY UPDATE fee = VALUES(fee)`,
        [doctorIds[docSlug], serviceIds[svcSlug], fee, dur]
      );
    }
    console.log('✅ Doctor-service fees seeded');

    // ---------- FREE CONSULTATION SERVICE ----------
    await conn.query(
      `INSERT INTO services (category_id, name, slug, short_description, description, base_price, duration_minutes, is_featured, display_order)
       VALUES (NULL, 'Dental Consultation', 'dental-consultation', 'Free initial consultation with our expert dentists.', '<p>Book a free consultation to discuss your dental concerns with our expert doctors.</p>', 0, 30, 1, -1)
       ON DUPLICATE KEY UPDATE base_price = 0`
    );

    // ---------- BLOG CATEGORIES & BLOGS ----------
    const blogCategories = [
      ['Dental Care', 'dental-care'],
      ['Cosmetic Dentistry', 'cosmetic-dentistry-blog'],
      ['Dental Implants', 'dental-implants-blog'],
      ['Root Canal', 'root-canal-blog']
    ];
    const blogCatIds = {};
    for (const [name, slug] of blogCategories) {
      await conn.query('INSERT INTO blog_categories (name, slug) VALUES (?,?) ON DUPLICATE KEY UPDATE name=VALUES(name)', [name, slug]);
      const [[row]] = await conn.query('SELECT id FROM blog_categories WHERE slug = ?', [slug]);
      blogCatIds[slug] = row.id;
    }

    const blogs = [
      {
        title: '10 Tips for Maintaining Good Oral Health Every Day', slug: '10-tips-for-maintaining-good-oral-health-every-day',
        category: 'dental-care',
        excerpt: 'Simple daily habits that keep your teeth and gums healthy for life.',
        content: '<p>Good oral health starts with consistent daily habits. Brush twice daily, floss regularly, limit sugary foods, and visit your dentist every six months for a checkup...</p>'
      },
      {
        title: 'Teeth Whitening: Everything You Need to Know', slug: 'teeth-whitening-everything-you-need-to-know',
        category: 'cosmetic-dentistry-blog',
        excerpt: 'A bright white smile can boost your confidence. Learn what causes discoloration and how whitening works.',
        content: '<p>A bright white smile can boost your confidence and make a lasting impression. Teeth whitening removes stains and discoloration, restoring your natural tooth colour...</p><h3>What Causes Tooth Discoloration?</h3><ul><li>Tea, coffee, cola and other dark beverages</li><li>Smoking and tobacco use</li><li>Excessive fluoride during childhood</li><li>Aging and natural wear</li></ul>'
      },
      {
        title: 'Dental Implants: A Permanent Solution for Missing Teeth', slug: 'dental-implants-a-permanent-solution-for-missing-teeth',
        category: 'dental-implants-blog',
        excerpt: 'Explore why dental implants are considered the gold standard for tooth replacement.',
        content: '<p>Dental implants replace missing teeth with a titanium post fused to the jawbone, offering strength and durability similar to natural teeth...</p>'
      },
      {
        title: 'Is Root Canal Treatment Painful? Facts vs Myths', slug: 'is-root-canal-treatment-painful-facts-vs-myths',
        category: 'root-canal-blog',
        excerpt: 'Busting common myths about root canal treatment and what to really expect.',
        content: '<p>Contrary to popular belief, modern root canal treatment is virtually painless thanks to effective local anesthesia and advanced techniques...</p>'
      },
      {
        title: 'Braces vs Invisible Braces: Which Is Right for You?', slug: 'braces-vs-invisible-braces-which-is-right-for-you',
        category: 'dental-care',
        excerpt: 'Compare traditional braces and clear aligners to choose what suits your lifestyle.',
        content: '<p>Both traditional braces and invisible aligners effectively straighten teeth, but they differ in appearance, comfort, and treatment approach...</p>'
      },
      {
        title: 'How Often Should You Visit the Dentist?', slug: 'how-often-should-you-visit-the-dentist',
        category: 'dental-care',
        excerpt: 'Regular dental checkups prevent small issues from becoming big problems.',
        content: '<p>Most dentists recommend a checkup and cleaning every six months, though your ideal frequency depends on your oral health history...</p>'
      }
    ];

    for (const b of blogs) {
      await conn.query(
        `INSERT INTO blogs (category_id, title, slug, excerpt, content, author_name, is_published, published_at)
         VALUES (?,?,?,?,?,?,1,NOW())
         ON DUPLICATE KEY UPDATE excerpt = VALUES(excerpt)`,
        [blogCatIds[b.category], b.title, b.slug, b.excerpt, b.content, 'Dental Health Care & Implant Centre']
      );
    }
    console.log(`✅ ${blogs.length} blogs seeded`);

    // ---------- REVIEWS ----------
    const reviews = [
      ['Rakesh Sharma', 5, 'I had an amazing experience at Dental Health Care & Implant Centre. The staff is very friendly and the treatment was painless. Highly recommended!', 'dr-amit-bansal'],
      ['Sunita Verma', 5, 'Very professional clinic with modern equipment. Dr. Neha explained everything clearly before starting my braces treatment.', 'dr-neha-sharma'],
      ['Anil Khanna', 5, 'Got my root canal done in a single sitting with zero pain. Dr. Pooja is extremely skilled and gentle.', 'dr-pooja-verma']
    ];
    for (const [name, rating, text, docSlug] of reviews) {
      await conn.query(
        `INSERT INTO reviews (doctor_id, clinic_id, patient_name, rating, review_text, is_approved, is_featured, source)
         VALUES (?,?,?,?,?,1,1,'manual')`,
        [doctorIds[docSlug], clinicId, name, rating, text]
      );
    }
    console.log('✅ Reviews seeded');

    // ---------- COUPONS & OFFERS ----------
    await conn.query(
      `INSERT INTO coupons (code, title, description, discount_type, discount_value, max_discount, min_amount, usage_limit, per_patient_limit, valid_from, valid_till)
       VALUES ('WELCOME10','Welcome Offer','Get 10% off on your first booking','percent',10,1000,500,NULL,1,CURDATE(),DATE_ADD(CURDATE(), INTERVAL 1 YEAR))
       ON DUPLICATE KEY UPDATE title = VALUES(title)`
    );
    await conn.query(
      `INSERT INTO coupons (code, title, description, discount_type, discount_value, min_amount, per_patient_limit, valid_from, valid_till)
       VALUES ('IMPLANT2000','Implant Special','Flat ₹2000 off on Dental Implants','flat',2000,15000,1,CURDATE(),DATE_ADD(CURDATE(), INTERVAL 6 MONTH))
       ON DUPLICATE KEY UPDATE title = VALUES(title)`
    );
    const [[welcomeCoupon]] = await conn.query('SELECT id FROM coupons WHERE code = "WELCOME10"');
    await conn.query(
      `INSERT INTO offers (title, slug, description, coupon_id, valid_from, valid_till)
       VALUES ('First Visit Special - 10% Off', 'first-visit-special-10-off', 'New patients get 10% off on their first appointment.', ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))
       ON DUPLICATE KEY UPDATE description = VALUES(description)`,
      [welcomeCoupon.id]
    );
    console.log('✅ Coupons & offers seeded');

    // ---------- SITE SETTINGS ----------
    const settings = [
      ['site_name', 'Dental Health Care & Implant Centre', 'text'],
      ['site_tagline', 'Your Smile, Our Priority', 'text'],
      ['phone', '9716590959', 'text'],
      ['whatsapp', '918527271759', 'text'],
      ['email', 'dentalhealthcare24@gmail.com', 'text'],
      ['address', 'A-122, Chander Vihar, Opp. Ramakrishna Apartment / Kali Mata Mandir, I.P. Extension, Patparganj, Delhi – 110092', 'text'],
      ['logo_url', 'https://dentalhealthcareandimplantcentre.in/wp-content/uploads/2026/07/Dhic-logo.jpg', 'text'],
      ['years_experience', '10+', 'text'],
      ['happy_patients', '2000+', 'text'],
      ['patient_satisfaction', '100%', 'text'],
      ['social_links', JSON.stringify({ facebook: '', instagram: '', google: '', linkedin: '' }), 'json']
    ];
    for (const [key, value, type] of settings) {
      await conn.query(
        `INSERT INTO site_settings (setting_key, setting_value, setting_type) VALUES (?,?,?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, value, type]
      );
    }
    console.log('✅ Site settings seeded');

    // ---------- HERO BANNERS (website hero section slider) ----------
    const [[bannerCount]] = await conn.query('SELECT COUNT(*) AS count FROM hero_banners');
    if (bannerCount.count === 0) {
      const banners = [
        ['World-Class Dental Care for a Healthier, Confident You!', 'Advanced treatments with compassion and care. From cosmetic dentistry to dental implants.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80', 'Book Appointment', '/appointment', 1],
        ['Painless Root Canal, Single Sitting', 'Modern techniques, experienced doctors, zero-wait comfort.', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80', 'Learn More', '/services/rct-root-canal', 2],
        ['Get 10% Off on Your First Visit', 'New patients get a special welcome discount on any treatment.', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80', 'Claim Offer', '/offers', 3]
      ];
      for (const [title, subtitle, image_url, cta_text, cta_link, display_order] of banners) {
        await conn.query(
          `INSERT INTO hero_banners (title, subtitle, image_url, cta_text, cta_link, display_order) VALUES (?,?,?,?,?,?)`,
          [title, subtitle, image_url, cta_text, cta_link, display_order]
        );
      }
      console.log(`✅ ${banners.length} hero banners seeded`);
    } else {
      console.log('✅ Hero banners already present, skipping');
    }

    // ---------- ONBOARDING SLIDES (mobile app) ----------
    const [[slideCount]] = await conn.query('SELECT COUNT(*) AS count FROM onboarding_slides');
    if (slideCount.count === 0) {
      const slides = [
        ['World-Class Dental Care', 'Advanced treatments with compassion and care, right at your fingertips.', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80', 1],
        ['Book Appointments Instantly', 'Choose your doctor, pick a slot, and confirm in seconds.', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=80', 2],
        ['Track Your Dental Journey', 'View prescriptions, medical history and follow-ups anytime, anywhere.', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80', 3]
      ];
      for (const [title, subtitle, image_url, display_order] of slides) {
        await conn.query(
          `INSERT INTO onboarding_slides (title, subtitle, image_url, display_order) VALUES (?,?,?,?)`,
          [title, subtitle, image_url, display_order]
        );
      }
      console.log(`✅ ${slides.length} onboarding slides seeded`);
    } else {
      console.log('✅ Onboarding slides already present, skipping');
    }

    // ---------- SAMPLE PATIENT (for testing) ----------
    await conn.query(
      `INSERT INTO patients (name, mobile, email) VALUES ('Test Patient', '9999999999', 'test@example.com')
       ON DUPLICATE KEY UPDATE name = VALUES(name)`
    );
    console.log('✅ Test patient seeded (mobile: 9999999999, use OTP_PROVIDER=console to see OTP in server logs)');

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    conn.release();
  }
}

seed();
