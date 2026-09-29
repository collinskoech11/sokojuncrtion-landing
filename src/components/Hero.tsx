"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, ShoppingBag } from "lucide-react";
import { FX_LINKS, BACKEND_URL } from "@/lib/constants";
import ShatterConfettiText, { WordPhrase } from "@/components/ShatterConfettiText";

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

const DEFAULT_PLATFORM_STATS: PlatformStats = {
  total_merchants: 15,
  total_orders: 375,
  total_volume: 1800000,
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 1600,
  formatFn,
}) => {
  const safeEndValue = endValue > 0 ? endValue : 1;
  const [count, setCount] = useState(() => Math.floor(safeEndValue * 0.15));

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startVal = Math.floor(safeEndValue * 0.15);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out quad curve
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentVal = Math.floor(startVal + easeOutQuad(progress) * (safeEndValue - startVal));
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(safeEndValue);
      }
    };

    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [safeEndValue, duration]);

  return <>{formatFn ? formatFn(count) : `${count.toLocaleString()}+`}</>;
};

export default function Hero({ initialStats }: { initialStats?: PlatformStats | null }) {
  const heroPhrases: WordPhrase[] = [
    { primary: "Smart", secondary: "Retail Assistant." },
    { primary: "24/7 Digital", secondary: "Store Cashier." },
    { primary: "Automated", secondary: "Commerce Engine." },
  ];

  const [stats, setStats] = useState<PlatformStats>(() => {
    if (initialStats && initialStats.total_merchants > 0) {
      return initialStats;
    }
    return DEFAULT_PLATFORM_STATS;
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch live stats from backend
  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const res = await fetch(`${BACKEND_URL}/companies/platform-stats/`);
        if (res.ok) {
          const data = await res.json();
          if (mounted && data) {
            const merchants = Number(data.total_merchants);
            const orders = Number(data.total_orders);
            const volume = Number(data.total_volume);
            setStats({
              total_merchants: merchants > 0 ? merchants : DEFAULT_PLATFORM_STATS.total_merchants,
              total_orders: orders > 0 ? orders : DEFAULT_PLATFORM_STATS.total_orders,
              total_volume: volume > 0 ? volume : DEFAULT_PLATFORM_STATS.total_volume,
            });
          }
        }
      } catch {
        // Fallback to initial stats
      }
    }
    fetchStats();
    return () => {
      mounted = false;
    };
  }, []);

  // Currency rule: The currency for this project is always Kes.
  const formatVolume = (val: number) => {
    if (val <= 0) {
      return "Kes 1.8M+";
    }
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
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-transparent">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Central Hero Card */}
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Primary SEO Heading (H1) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
            Meet your <br />
            <ShatterConfettiText phrases={heroPhrases} intervalMs={4000} />
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 font-normal leading-relaxed mb-10">
            SokoJunction is the intelligent retail assistant that runs your store operations.
            From live inventory management and instant M-Pesa STK push cashiering to pickup logistics and sales intelligence — so you can focus on growing your brand.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href={FX_LINKS.companyOnboarding}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold text-white bg-secondary hover:bg-secondary-dark rounded-full shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/35 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Deploy Your Retail Assistant</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href={FX_LINKS.shops}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-semibold text-primary bg-white hover:bg-gray-50 rounded-full border border-gray-200 shadow-sm hover:border-primary/40 transition-all duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-primary" />
              <span>Browse Active Stores</span>
            </a>
          </div>

          {/* Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-600 mb-16">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>Free Starter Tier (0–50 Orders)</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-secondary" />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Automated M-Pesa & Card Cashier</span>
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
              <div className="text-sm font-semibold text-gray-600">Retailers Assisted</div>
            </div>

            <div className="text-center sm:border-x sm:border-gray-200">
              <div className="text-3xl sm:text-4xl font-extrabold text-secondary mb-1">
                <AnimatedCounter
                  endValue={stats.total_orders}
                  formatFn={(val) => `${val.toLocaleString()}+`}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">Orders Handled Automatically</div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-1">
                <AnimatedCounter
                  endValue={stats.total_volume}
                  formatFn={formatVolume}
                />
              </div>
              <div className="text-sm font-semibold text-gray-600">Retail Volume Processed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
