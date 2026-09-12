"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, Store, LogIn } from "lucide-react";
import { FX_LINKS } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Product Tour", href: "#showcase" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-100/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-transform group-hover:scale-105">
              <Image
                src="/sokojunction_no_bg_mini.jpeg"
                alt="SokoJunction Logo"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-primary">
                Soko<span className="text-secondary">Junction</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">
                eCommerce Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={FX_LINKS.shops}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary hover:bg-gray-50 rounded-full transition-colors border border-gray-200"
            >
              <Store className="w-4 h-4 text-primary" />
              <span>Explore Marketplace</span>
            </a>

            <a
              href={FX_LINKS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </a>

            <a
              href={FX_LINKS.companyOnboarding}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold text-white bg-secondary hover:bg-secondary-dark rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Start Selling</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href={FX_LINKS.companyOnboarding}
              className="sm:inline-flex hidden items-center px-3.5 py-1.5 text-xs font-bold text-white bg-secondary rounded-full shadow-sm"
            >
              Start Free
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
            <a
              href={FX_LINKS.shops}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
            >
              <Store className="w-4 h-4 text-primary" />
              <span>Explore Marketplace</span>
            </a>

            <a
              href={FX_LINKS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </a>

            <a
              href={FX_LINKS.companyOnboarding}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-bold text-white bg-secondary hover:bg-secondary-dark rounded-xl shadow transition-colors"
            >
              <span>Start Selling Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
