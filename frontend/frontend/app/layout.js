import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import JsonLd from "@/components/JsonLd";
import { getSettings } from "@/lib/api";
import { dentistSchema, SITE_URL } from "@/lib/schema";

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:
        "Dental Health Care & Implant Centre | Best Dentist in Patparganj, Delhi",
      template: "%s | Dental Health Care & Implant Centre",
    },
    description:
      "World-class dental care in Patparganj, Delhi. Dental implants, root canal, braces, teeth whitening & cosmetic dentistry by expert dentists. Book your appointment today.",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: "Dental Health Care & Implant Centre",
      locale: "en_IN",
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function RootLayout({ children }) {
  const settingsRes = await getSettings();
  const settings = settingsRes?.settings || {};

  return (
    <html lang="en">
      <body className="font-sans antialiased text-slate-800">
        <JsonLd data={dentistSchema(settings)} />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <FloatingButtons settings={settings} />
      </body>
    </html>
  );
}
