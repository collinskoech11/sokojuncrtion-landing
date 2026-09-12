import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sokojunction.com";
const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-F23L8C9HPP";

export const viewport: Viewport = {
  themeColor: "#35408F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SokoJunction — Launch & Scale Your Online Store Effortlessly",
    template: "%s | SokoJunction",
  },
  description:
    "SokoJunction provides the all-in-one infrastructure to launch, scale, and manage your commerce business. Instant storefronts, frictionless checkout, automated marketing, and AI insights.",
  keywords: [
    "ecommerce platform",
    "online store builder",
    "SokoJunction",
    "sell online",
    "instant storefront",
    "online shopping Kenya",
    "digital commerce",
    "SME ecommerce solution",
    "African marketplace",
  ],
  authors: [{ name: "SokoJunction Team", url: siteUrl }],
  creator: "SokoJunction",
  publisher: "SokoJunction",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SokoJunction — Launch & Scale Your Online Store Effortlessly",
    description:
      "The complete commerce engine for modern businesses. Launch a custom storefront in minutes, accept secure payments, and grow with built-in analytics.",
    url: siteUrl,
    siteName: "SokoJunction",
    images: [
      {
        url: "/logo_min.jpeg",
        width: 800,
        height: 800,
        alt: "SokoJunction Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SokoJunction — Launch & Scale Your Online Store Effortlessly",
    description:
      "All-in-one infrastructure to launch, manage, and scale your commerce business. No coding required.",
    images: ["/logo_min.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo_min.jpeg", type: "image/jpeg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo_min.jpeg",
    apple: "/logo_min.jpeg",
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SokoJunction",
  url: siteUrl,
  logo: `${siteUrl}/logo_min.jpeg`,
  description:
    "All-in-one eCommerce infrastructure platform empowering businesses and entrepreneurs to build, run, and scale online stores.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email: "sokojunction@gmail.com",
    telephone: "+254703508881",
  },
  sameAs: [
    "https://facebook.com",
    "https://instagram.com",
    "https://twitter.com",
    "https://linkedin.com",
  ],
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SokoJunction",
  operatingSystem: "Web",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KES",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "128",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <head>
        <link rel="icon" href="/logo_min.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logo_min.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo_min.jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-[#f8f8f8] text-[#212121]">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-script" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
