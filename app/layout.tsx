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
  title: "NTU GPA Calculator",
  description: "A polished and animated GPA platform for NTU students.",
  keywords: [
    "NTU GPA calculator",
    "GPA planner",
    "GPA tracker",
    "NTU student tools",
    "academic calculator",
    "semester grade estimator",
    "online GPA calculator",
  ],
  openGraph: {
    title: "NTU GPA Calculator",
    description: "A polished and animated GPA platform for NTU students.",
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
        {/* Google tag (gtag.js) - placed immediately after <head> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}
        </Script>
      </head>
      <body className="min-h-full font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
