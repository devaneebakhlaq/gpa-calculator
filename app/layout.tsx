import type { Metadata } from "next";
import { Outfit, Sora } from "next/font/google";
import Script from "next/script";
import Analytics from "./components/Analytics";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://apnagpa.surge.sh";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "NTU GPA Calculator | Online GPA Calculator for NTU Students",
    template: "%s | NTU GPA Calculator",
  },
  description:
    "Use the NTU GPA calculator to calculate semester GPA, grade points, and academic standing for National Textile University courses in seconds.",
  keywords: [
    "NTU GPA calculator",
    "online GPA calculator",
    "semester GPA calculator",
    "NTU semester GPA",
    "National Textile University GPA",
    "GPA planner",
    "GPA tracker",
    "NTU student tools",
    "academic calculator",
    "semester grade estimator",
    "grade points calculator",
  ],
  openGraph: {
    title: "NTU GPA Calculator | Online GPA Calculator for NTU Students",
    description:
      "Fast and accurate GPA calculator for NTU students to calculate semester GPA, credit hours, and grade points online.",
    url: SITE_URL,
    siteName: "NTU GPA Calculator",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/ntu-logo.png`,
        width: 1200,
        height: 630,
        alt: "NTU GPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NTU GPA Calculator | Online GPA Calculator for NTU Students",
    description:
      "Fast and accurate GPA calculator for NTU students to calculate semester GPA and grade points online.",
    images: ["/ntu-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/ntu-logo.png",
    shortcut: "/ntu-logo.png",
    apple: "/ntu-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T6QFLW1EVW";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NTU GPA Calculator",
    url: SITE_URL,
    logo: `${SITE_URL}/ntu-logo.png`,
    sameAs: [SITE_URL],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NTU GPA Calculator",
    url: SITE_URL,
    description:
      "Online GPA calculator for NTU students to calculate semester GPA, credit hours, and grade points quickly.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/calculator?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sora.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/ntu-logo.png" sizes="32x32" />
        <link rel="icon" href="/ntu-logo.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/ntu-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ntu-logo.png" />
        <meta name="theme-color" content="#081d2b" />
        <meta
          name="google-site-verification"
          content="iu5BdCgr_6iPGqbadNTpZX9An2oLnuWKQUSVXOZSxIc"
        />
        <meta name="description" content="Calculate semester GPA and grade points for NTU students with an online GPA calculator built for National Textile University courses." />
        <link rel="canonical" href={SITE_URL} />
        {/* Google tag (gtag.js) - placed immediately after <head> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
        </Script>
        <Script id="organization-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(organizationSchema)}
        </Script>
        <Script id="website-schema" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(websiteSchema)}
        </Script>
      </head>
      <body className="min-h-full font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
