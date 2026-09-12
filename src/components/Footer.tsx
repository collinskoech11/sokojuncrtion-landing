"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { FX_LINKS, MERCHANT_URL } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1b2149] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-1">
                <Image
                  src="/sokojunction_no_bg_mini.jpeg"
                  alt="SokoJunction"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Soko<span className="text-secondary">Junction</span>
              </span>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              The intelligent retail assistant and commerce operating system designed for African businesses, SMEs, and digital merchants. Automate storefronts, M-Pesa cashiering, and fulfillment.
            </p>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <a
                  href="mailto:sokojunction@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  sokojunction@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <a
                  href="tel:+254703508881"
                  className="hover:text-white transition-colors"
                >
                  +254 703 508 881
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SokoJunction
                </Link>
              </li>
              <li>
                <a href="/#features" className="hover:text-white transition-colors">
                  Assistant Capabilities
                </a>
              </li>
              <li>
                <a href="/#showcase" className="hover:text-white transition-colors">
                  Assistant in Action
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-white transition-colors">
                  Pricing Plans (Kes)
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="hover:text-white transition-colors">
                  Retailer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Merchants & Ecosystem */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Ecosystem
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a
                  href={FX_LINKS.shops}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Explore Marketplace
                </a>
              </li>
              <li>
                <a
                  href={FX_LINKS.companyOnboarding}
                  className="hover:text-white transition-colors"
                >
                  Deploy Retail Assistant
                </a>
              </li>
              <li>
                <a
                  href={MERCHANT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Merchant WebApp Sign In
                </a>
              </li>
              <li>
                <Link
                  href="/mobile-app"
                  className="hover:text-white transition-colors"
                >
                  Manager Mobile App
                </Link>
              </li>
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">
                  Partner Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Updates */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Connected
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get product updates, eCommerce tips, and exclusive merchant growth strategies.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary-dark text-xs font-bold text-white transition-colors shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; {currentYear} SokoJunction Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-secondary fill-secondary" />
            <span>for growing African commerce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
