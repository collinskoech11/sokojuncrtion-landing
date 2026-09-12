"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
  TrendingUp,
  Layout,
  Search,
  Globe,
  Boxes,
  Truck,
  BellRing,
  LineChart,
  Users,
  Target,
} from "lucide-react";
import { FX_LINKS } from "@/lib/constants";

// Helper hook for smooth scroll-triggered intersection animation
function useScrollReveal(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

export default function Showcase() {
  const [headerRef, headerVisible] = useScrollReveal(0.2);
  const [item1Ref, item1Visible] = useScrollReveal(0.15);
  const [item2Ref, item2Visible] = useScrollReveal(0.15);
  const [item3Ref, item3Visible] = useScrollReveal(0.15);

  return (
    <section id="showcase" className="relative py-24 md:py-36 bg-[#f8f8f8] overflow-hidden">
      {/* Subtle Background Glow Orbs */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Scroll Fade-In */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-20 md:mb-28 transition-all duration-1000 ease-out ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
            See <span className="text-primary">Soko</span><span className="text-secondary">Junction</span> in Action
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Take a visual tour through our powerful ecosystem built to launch, run, and scale
            your digital storefront with speed and confidence.
          </p>
        </div>

        {/* ================================================================== */}
        {/* Tour Item 1: Storefronts (Image Left, Content Right) */}
        {/* ================================================================== */}
        <div
          ref={item1Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 lg:mb-40"
        >
          {/* Image Mockup Window */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              item1Visible
                ? "opacity-100 translate-x-0 scale-100 rotate-0"
                : "opacity-0 -translate-x-12 scale-[0.96] -rotate-1"
            }`}
          >
            <div className="relative group">
              {/* Subtle ambient backlight */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              {/* Mac Browser Window Mockup Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 bg-white p-2.5 transition-all duration-700 hover:-translate-y-1.5 hover:shadow-primary/15">
                {/* Browser Title Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50/90 rounded-t-2xl border-b border-gray-200/70 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200 text-[11px] text-gray-600 font-mono font-medium shadow-xs">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>shop.sokojunction.com/storefront</span>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100">
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

              {/* Floating Feature Highlight Card */}
              <div
                className={`hidden sm:flex absolute -bottom-6 -right-6 items-center gap-3.5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl shadow-gray-200/60 transition-all duration-1000 delay-300 animate-float-slow ${
                  item1Visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Instant M-Pesa Checkout
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    0.8s conversion-optimized speed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              item1Visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Stunning, High-Converting Storefronts
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              First impressions matter. SokoJunction provides a suite of elegant, responsive designs
              that reflect your brand&apos;s unique identity. Optimized for mobile shoppers, fast loading,
              and seamless browsing across all modern devices.
            </p>

            <ul className="space-y-4 pt-1">
              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-200 ${
                  item1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layout className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Customizable Themes:</span> Brand colors, typography, and banner layouts that fit your identity.
                </div>
              </li>

              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-300 ${
                  item1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Smart Navigation:</span> Category filtering, instant search, and variations for seamless customer discovery.
                </div>
              </li>

              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-400 ${
                  item1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Custom Domains:</span> Connect your own domain (e.g. yourbrand.com) with automated free SSL.
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={FX_LINKS.companyOnboarding}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Build Your Store Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* Tour Item 2: Admin Dashboard (Content Left, Image Right) */}
        {/* ================================================================== */}
        <div
          ref={item2Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 lg:mb-40"
        >
          {/* Text Content */}
          <div
            className={`lg:col-span-5 order-2 lg:order-1 space-y-6 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              item2Visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Intuitive Admin Dashboard & Control
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Manage inventory, update prices, track orders, and fulfill customer requests all from
              a single, clutter-free dashboard. Designed for merchants who value speed and clarity.
            </p>

            <ul className="space-y-4 pt-1">
              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-200 ${
                  item2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Boxes className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Inventory Management:</span> Rapid product uploads, variant control, and automated low-stock warnings.
                </div>
              </li>

              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-300 ${
                  item2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Fulfillment Workflow:</span> One-click order status transitions (Pending, Processing, Completed).
                </div>
              </li>

              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-400 ${
                  item2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Automated Alerts:</span> Instant buyer SMS and email notifications upon dispatch and delivery.
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={FX_LINKS.companyOnboarding}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-secondary hover:bg-secondary-dark rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Explore Merchant Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Image Mockup Window */}
          <div
            className={`lg:col-span-7 order-1 lg:order-2 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              item2Visible
                ? "opacity-100 translate-x-0 scale-100 rotate-0"
                : "opacity-0 translate-x-12 scale-[0.96] rotate-1"
            }`}
          >
            <div className="relative group">
              {/* Subtle ambient backlight */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-secondary/15 via-primary/15 to-secondary/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              {/* Mac Browser Window Mockup Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 bg-white p-2.5 transition-all duration-700 hover:-translate-y-1.5 hover:shadow-secondary/15">
                {/* Browser Title Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50/90 rounded-t-2xl border-b border-gray-200/70 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200 text-[11px] text-gray-600 font-mono font-medium shadow-xs">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>merchant.sokojunction.com/orders</span>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100">
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

              {/* Floating Feature Highlight Card */}
              <div
                className={`hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3.5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl shadow-gray-200/60 transition-all duration-1000 delay-300 animate-float-reverse ${
                  item2Visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    Unified Operations
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    Pickup stations & logistics sync
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* Tour Item 3: AI Insights (Image Left, Content Right) */}
        {/* ================================================================== */}
        <div
          ref={item3Ref}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Image Mockup Window */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              item3Visible
                ? "opacity-100 translate-x-0 scale-100 rotate-0"
                : "opacity-0 -translate-x-12 scale-[0.96] -rotate-1"
            }`}
          >
            <div className="relative group">
              {/* Subtle ambient backlight */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"
                aria-hidden="true"
              />

              {/* Mac Browser Window Mockup Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200/90 bg-white p-2.5 transition-all duration-700 hover:-translate-y-1.5 hover:shadow-primary/15">
                {/* Browser Title Bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50/90 rounded-t-2xl border-b border-gray-200/70 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200 text-[11px] text-gray-600 font-mono font-medium shadow-xs">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>merchant.sokojunction.com/analytics</span>
                  </div>
                  <div className="w-12" />
                </div>

                {/* Screenshot Frame */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100">
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

              {/* Floating Feature Highlight Card */}
              <div
                className={`hidden sm:flex absolute -bottom-6 -right-6 items-center gap-3.5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl shadow-gray-200/60 transition-all duration-1000 delay-300 animate-float-slow ${
                  item3Visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    +28.4% Revenue Uplift
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    AI-driven checkout funnel diagnostics
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              item3Visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
              AI-Powered Insights for Smarter Decisions
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Leverage artificial intelligence and actionable business metrics to discover revenue trends,
              optimize pricing, and personalize promotions to maximize customer lifetime value.
            </p>

            <ul className="space-y-4 pt-1">
              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-200 ${
                  item3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Customer Retention:</span> Cohort behavior tracking and repeat purchase probability scoring.
                </div>
              </li>

              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-300 ${
                  item3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Demand Forecasting:</span> Predictive inventory triggers to prevent stockouts and overstock.
                </div>
              </li>

              <li
                className={`flex items-start gap-3 text-sm text-gray-700 transition-all duration-700 delay-400 ${
                  item3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Funnel Optimization:</span> Real-time cart abandonment diagnostics and conversion analytics.
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href={FX_LINKS.companyOnboarding}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Unlock Growth Analytics</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
