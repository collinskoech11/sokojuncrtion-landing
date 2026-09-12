import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FX_LINKS } from "@/lib/constants";

export default function Showcase() {

  return (
    <section id="showcase" className="py-20 md:py-32 bg-[#f8f8f8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            See <span className="text-primary">Soko</span><span className="text-secondary">Junction</span> in Action
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Take a visual tour through our powerful ecosystem built to launch, run, and scale
            your digital storefront with speed and confidence.
          </p>
        </div>

        {/* Tour Item 1: Storefronts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white p-2 group transition-transform duration-500 hover:-translate-y-1">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/assets/this.png"
                  alt="SokoJunction Modern eCommerce Storefronts"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Stunning, High-Converting Storefronts
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              First impressions matter. SokoJunction provides a suite of elegant, responsive designs
              that reflect your brand&apos;s unique identity. Optimized for mobile shoppers, fast loading,
              and seamless browsing across all modern devices.
            </p>
            <ul className="space-y-2.5 text-sm text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Customizable shop themes and brand colors
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Category filters, instant search, and product variations
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Custom domain support (e.g. yourbrand.com)
              </li>
            </ul>
            <div>
              <a
                href={FX_LINKS.companyOnboarding}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                <span>Build Your Store Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Tour Item 2: Admin Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Intuitive Admin Dashboard & Control
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Manage inventory, update prices, track orders, and fulfill customer requests all from
              a single, clutter-free dashboard. Designed for merchants who value speed and clarity.
            </p>
            <ul className="space-y-2.5 text-sm text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Bulk product uploads and stock level tracking
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                One-click order status transitions (Pending, Processing, Completed)
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Pickup location and fulfillment manager
              </li>
            </ul>
            <div>
              <a
                href={FX_LINKS.companyOnboarding}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-secondary hover:bg-secondary-dark rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                <span>Explore Merchant Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white p-2 group transition-transform duration-500 hover:-translate-y-1">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/assets/admin.png"
                  alt="SokoJunction Merchant Admin Dashboard"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tour Item 3: AI-Powered Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white p-2 group transition-transform duration-500 hover:-translate-y-1">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src="/assets/simple.png"
                  alt="SokoJunction AI Insights and Reports"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              AI-Powered Insights for Smarter Decisions
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Leverage artificial intelligence and actionable business metrics to discover revenue trends,
              optimize pricing, and personalize promotions to maximize customer lifetime value.
            </p>
            <ul className="space-y-2.5 text-sm text-gray-700 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Customer retention and repurchase probability
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Demand forecasting to prevent stockouts
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Conversion rate funnel diagnostics
              </li>
            </ul>
            <div>
              <a
                href={FX_LINKS.companyOnboarding}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                <span>Unlock Growth Analytics</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
