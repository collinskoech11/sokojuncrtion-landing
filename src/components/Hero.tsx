"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, ShoppingBag } from "lucide-react";
import { FX_LINKS, BACKEND_URL } from "@/lib/constants";

export interface PlatformStats {
  total_merchants: number;
  total_orders: number;
  total_volume: number;
}

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  formatFn?: (val: number) => string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 1800,
  formatFn,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out quad curve
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentVal = Math.floor(startVal + easeOutQuad(progress) * (endValue - startVal));
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [endValue, duration]);

  return <>{formatFn ? formatFn(count) : `${count.toLocaleString()}+`}</>;
};

export default function Hero({ initialStats }: { initialStats?: PlatformStats | null }) {
  const [wordIndex, setWordIndex] = useState(0);
  const words = [
    { primary: "Dream", secondary: "Store." },
    { primary: "Digital", secondary: "Empire." },
    { primary: "Future", secondary: "Today." },
  ];

  const [stats, setStats] = useState<PlatformStats>(
    initialStats || {
      total_merchants: 15,
      total_orders: 375,
      total_volume: 1800000,
    }
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [words.length]);

  // Fetch live stats from backend
  useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      try {
        const res = await fetch(`${BACKEND_URL}/companies/platform-stats/`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setStats({
              total_merchants: Number(data.total_merchants) || 0,
              total_orders: Number(data.total_orders) || 0,
              total_volume: Number(data.total_volume) || 0,
            });
          }
        }
      } catch {
        // Fallback to initial stats
      }
    }
    fetchStats();
    return () => {
      isMounted = false;
    };
  }, []);

  // Currency rule: The currency for this project is always Kes.
  const formatVolume = (val: number) => {
    if (val >= 1.0e9) {
      return `Kes ${(val / 1.0e9).toFixed(1).replace(/\.0$/, "")}B+`;
    }
    if (val >= 1.0e6) {
      return `Kes ${(val / 1.0e6).toFixed(1).replace(/\.0$/, "")}M+`;
    }
    if (val >= 1.0e3) {
      return `Kes ${(val / 1.0e3).toFixed(1).replace(/\.0$/, "")}K+`;
    }
    return `Kes ${val.toLocaleString()}+`;
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-[#f4f6fc] to-[#f8f8f8]">
      {/* Ambient background glow effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Central Hero Card */}
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Primary SEO Heading (H1) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Build your <br className="hidden sm:inline" />
            <span className="transition-all duration-500 inline-block min-h-[1.2em]">
              <span className="text-primary">{words[wordIndex].primary}</span>{" "}
              <span className="text-secondary">{words[wordIndex].secondary}</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 font-normal leading-relaxed mb-10">
            SokoJunction provides the all-in-one infrastructure to launch, scale, and manage
            your commerce business. Fast setup, secure payments, and powerful tools — no coding required.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href={FX_LINKS.companyOnboarding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold text-white bg-secondary hover:bg-secondary-dark rounded-full shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/35 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Start Selling Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href={FX_LINKS.shops}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-semibold text-primary bg-white hover:bg-gray-50 rounded-full border border-gray-200 shadow-sm hover:border-primary/40 transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>Browse Active Shops</span>
            </a>
          </div>

          {/* Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-600 mb-16">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>Free Starter Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Secure M-Pesa & Card Checkout</span>
            </div>
          </div>

          {/* Trust Metrics / Numbers from Backend with Countup Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-gray-200/80 shadow-sm">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                <AnimatedCounter
                  endValue={stats.total_merchants}
                  formatFn={(val) => `${val.toLocaleString()}+`}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">Active Merchants</div>
            </div>

            <div className="text-center sm:border-x sm:border-gray-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-secondary mb-1">
                <AnimatedCounter
                  endValue={stats.total_orders}
                  formatFn={(val) => `${val.toLocaleString()}+`}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">Orders Completed</div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                <AnimatedCounter
                  endValue={stats.total_volume}
                  formatFn={formatVolume}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">Transaction Volume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
