import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Info,
  Rocket,
  ShieldCheck,
  Users,
  Handshake,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { FX_LINKS } from "@/lib/constants";
import AboutAccordion from "./AboutAccordion";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SokoJunction, our mission to democratize digital commerce in Africa, our core values, community guidelines, and terms of service.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Rocket,
      title: "Innovation",
      desc: "Constantly evolving our technology and real-time endpoints to ensure your storefront is blazingly fast, reliable, and modern.",
    },
    {
      icon: Handshake,
      title: "Accessibility",
      desc: "Making enterprise-grade eCommerce infrastructure affordable and intuitive without requiring code or complex configurations.",
    },
    {
      icon: TrendingUp,
      title: "Merchant Growth",
      desc: "Dedicated support, instant local payment rails (Kes M-Pesa STK push & cards), and tools engineered to maximize conversion rates.",
    },
  ];

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#18181b] tracking-tight mb-4">
            About <span className="text-primary">Soko</span><span className="text-secondary">Junction</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We build an intelligent digital retail assistant that empowers local shop owners and businesses to automate storefronts, streamline cashiering with instant M-Pesa STK push, and thrive in the modern marketplace.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Story & What We Offer */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 transition-shadow hover:shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Info className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#18181b] tracking-tight">
              Our Story & What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#18181b]">
                The Journey
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Founded in 2023, SokoJunction emerged from a passion for simplifying the complexities of retail and eCommerce. We saw a gap in the market for a solution that truly acts as an operational partner — taking over repetitive store tasks without prohibitive costs or steep technical learning curves.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our journey began with a single commitment: democratize retail automation. We aim to make setting up and running a successful store effortless for every retailer.
              </p>
            </div>

            <div className="space-y-4 md:border-l md:border-gray-100 md:pl-8">
              <h3 className="text-lg font-bold text-[#18181b]">
                What We Offer
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                SokoJunction provides a 24/7 digital retail assistant. Our platform handles automated cashiering, instant M-Pesa STK push and Card billing in Kes, live inventory controls, intelligent sales forecasting, and multi-location pickup logistics.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Built on a modern stack emphasizing security, speed, and exceptional UX, we handle the day-to-day operations so you can focus on building your brand.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Core Values */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 transition-shadow hover:shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Rocket className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#18181b] tracking-tight">
              Our Core Mission
            </h2>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-3xl mb-8 text-sm sm:text-base">
            Our mission is to empower businesses of all sizes to achieve their absolute potential in the digital realm. We strive to provide an innovative, reliable, and user-friendly platform that catalyzes growth and simplifies the daily operations of local merchants.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div
                  key={i}
                  className="bg-[#fbfbfb] hover:bg-white border border-gray-100 hover:border-primary/30 p-6 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#18181b] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Guidelines & Policies */}
        <AboutAccordion />

        {/* Get In Touch */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 transition-shadow hover:shadow-md text-center">
          <h2 className="text-2xl font-extrabold text-[#18181b] tracking-tight mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Have questions, feedback, or need help setting up your storefront? Contact our customer support team anytime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-left">
            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfbfb] text-center hover:border-primary/20 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#18181b] text-sm mb-1">Email Support</h3>
              <a
                href="mailto:sokojunction@gmail.com"
                className="text-gray-600 text-sm hover:text-primary transition-colors"
              >
                sokojunction@gmail.com
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfbfb] text-center hover:border-primary/20 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#18181b] text-sm mb-1">Phone Support</h3>
              <a
                href="tel:+254703508881"
                className="text-gray-600 text-sm hover:text-primary transition-colors"
              >
                +254 703 508 881
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-gray-100 bg-[#fbfbfb] text-center hover:border-primary/20 transition-all">
              <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#18181b] text-sm mb-1">Our Location</h3>
              <p className="text-gray-600 text-sm">
                Nairobi, Kenya
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:sokojunction@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Send Us an Email</span>
            </a>

            <a
              href={FX_LINKS.companyOnboarding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-secondary hover:bg-secondary-dark transition-all shadow-sm"
            >
              <span>Create Your Store</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
