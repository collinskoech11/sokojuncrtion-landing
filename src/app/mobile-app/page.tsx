import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  BarChart3,
  Store,
  ShieldCheck,
  Download,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FX_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "SokoJunction Manager Mobile App",
  description:
    "Manage your online store, track live sales, update inventory, and manage pickup locations on the go with SokoJunction Manager APK.",
};

const capabilities = [
  {
    title: "Store Dashboard",
    desc: "A centralized hub to monitor your vital business health, revenue, and daily orders at a glance.",
    icon: LayoutDashboard,
    iconColor: "text-blue-600 bg-blue-50",
  },
  {
    title: "Product Suite",
    desc: "Full-lifecycle inventory management. Upload new items, edit pricing, and update stock counts in seconds.",
    icon: Package,
    iconColor: "text-purple-600 bg-purple-50",
  },
  {
    title: "Live Order Tracking",
    desc: "Real-time order processing pipelines and instant alerts so your customers never miss a beat.",
    icon: TrendingUp,
    iconColor: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Deep Analytics",
    desc: "Transform raw transactions into actionable insights with professional-grade sales and customer reports.",
    icon: BarChart3,
    iconColor: "text-pink-600 bg-pink-50",
  },
  {
    title: "Store & Branch Control",
    desc: "Manage multiple pickup locations, dispatch stations, and branch hours from one master interface.",
    icon: Store,
    iconColor: "text-orange-600 bg-orange-50",
  },
  {
    title: "Enterprise Security",
    desc: "Multi-factor authentication, safe sessions, and encrypted transactions to keep commercial data locked down.",
    icon: ShieldCheck,
    iconColor: "text-sky-600 bg-sky-50",
  },
];

export default function MobileAppPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Hero Section with Solid Brand Navy */}
      <section className="bg-[#1b2149] text-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-3">
            Android Private Beta • Available Now
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            SokoJunction Manager
          </h1>

          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-10">
            Your business doesn&apos;t stop when you step away from your desk. Monitor live orders, manage inventory, and grow your storefront from anywhere.
          </p>

          {/* Download Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a
              href="/downloads/sokojunction.apk.zip"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-extrabold text-primary bg-white hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-base"
            >
              <Download className="w-5 h-5 text-primary" />
              <span>Download APK for Android</span>
            </a>

            <button
              disabled
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white/50 border border-white/20 cursor-not-allowed text-base bg-white/5"
            >
              <Smartphone className="w-5 h-5 opacity-40" />
              <span>iOS (Coming Soon)</span>
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-5 italic">
            Compatible with Android 8.0+. iOS version currently under active development.
          </p>
        </div>
      </section>

      {/* Main Capabilities Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            Powerful Mobile Capabilities
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#18181b] tracking-tight mb-3">
            Everything You Need to Scale on the Go
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            The SokoJunction Manager mobile suite is built for lightning speed, offline resilience, and daily efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((c, i) => {
            const IconComp = c.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105 ${c.iconColor}`}
                >
                  <IconComp className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#18181b] mb-2">
                  {c.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlight / Workflow */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181b] tracking-tight">
                Instant Order Alerts & Real-time M-Pesa STK Updates
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Receive instant push notifications every time an order is placed and paid for via M-Pesa or Card. Update order dispatch statuses, print receipts, and communicate with customers without delay.
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  "Real-time notifications for incoming orders",
                  "One-tap order status updating (Processing, Ready, Shipped)",
                  "Instant receipt generation and dispatch slips",
                  "Direct branch pickup coordination",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#fbfbfb] rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-xl text-[#18181b]">
                Install Directly on Android
              </h3>
              <p className="text-gray-500 text-xs max-w-xs leading-relaxed">
                Download the lightweight APK package directly to your smartphone. Fast installation with zero unnecessary permissions.
              </p>
              <a
                href="/downloads/sokojunction.apk.zip"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download APK (.zip)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181b] tracking-tight mb-3">
            Ready to Take Control of Your Store?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-8">
            Join hundreds of smart merchants optimizing their daily workflow with SokoJunction Manager.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/downloads/sokojunction.apk.zip"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-secondary hover:bg-secondary-dark transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Mobile App</span>
            </a>

            <a
              href={FX_LINKS.companyOnboarding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-primary bg-primary/10 hover:bg-primary/20 transition-all"
            >
              <span>Register as Merchant</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
