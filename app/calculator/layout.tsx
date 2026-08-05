import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

const SITE_URL = "https://apnagpa.surge.sh";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NTU GPA Calculator | Calculate Semester GPA Online",
    template: "%s | NTU GPA Calculator",
  },
  description:
    "Calculate your National Textile University GPA online with a fast and student-friendly calculator. Enter subjects, credit hours, and marks to get instant GPA, grade points, and academic standing.",
  keywords: [
    "NTU GPA calculator",
    "NTU semester GPA",
    "GPA calculator online",
    "National Textile University GPA",
    "NTU grade point average",
    "NTU grade calculator",
    "semester GPA estimator",
    "NTU academic calculator",
    "grade points calculator",
    "GPA tracker",
    "NTU result calculator",
    "online GPA planner",
  ],
  alternates: {
    canonical: "/calculator",
  },
  openGraph: {
    title: "NTU GPA Calculator | Calculate Semester GPA Online",
    description:
      "Use the NTU GPA calculator to estimate semester GPA, grade points, and academic standing in seconds.",
    url: "/calculator",
    siteName: "NTU GPA Calculator",
    type: "website",
    images: [
      {
        url: "/ntu-logo.png",
        width: 1200,
        height: 630,
        alt: "NTU GPA Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NTU GPA Calculator | Calculate Semester GPA Online",
    description:
      "Fast and accurate GPA calculator for NTU students to calculate semester GPA online.",
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
};

export default function CalculatorLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "NTU GPA Calculator",
    url: `${SITE_URL}/calculator`,
    description:
      "A fast and accurate GPA calculator designed for National Textile University students.",
    applicationCategory: "EducationalApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <Script id="calculator-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(structuredData)}
      </Script>
      {children}
    </>
  );
}
