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
    default: "SokoJunction — Your 24/7 Intelligent Retail Assistant",
    template: "%s | SokoJunction Retail Assistant",
  },
  description:
    "SokoJunction is the all-in-one digital retail assistant for modern businesses and shop owners. Automate inventory, streamline orders with instant M-Pesa STK checkout, coordinate pickup logistics, and scale your store operations effortlessly.",
  keywords: [
    "retail assistant",
    "smart retail assistant",
    "AI store manager",
    "automated eCommerce",
    "shop management assistant",
    "SokoJunction",
    "M-Pesa retail automation",
    "store inventory assistant",
    "digital cashier Kenya",
    "retail operations software",
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
    title: "SokoJunction — Your 24/7 Intelligent Retail Assistant",
    description:
      "Automate your retail store operations: live inventory tracking, instant M-Pesa STK push cashiering, order fulfillment coordination, and sales intelligence.",
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
    title: "SokoJunction — Your 24/7 Intelligent Retail Assistant",
    description:
      "The smart retail assistant that runs your store operations 24/7. Automated inventory, instant checkout, and sales insights.",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/logo_square.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/logo_square.png" },
    ],
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SokoJunction",
  url: siteUrl,
  logo: `${siteUrl}/logo_square.png`,
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/logo_square.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
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
