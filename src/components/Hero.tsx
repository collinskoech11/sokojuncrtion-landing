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

interface ShootingStarItem {
  id: number;
  direction: "right" | "left" | "down" | "up";
  top?: string;
  left?: string;
  duration: string;
  color: string;
  size: number;
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
  const [activeStars, setActiveStars] = useState<ShootingStarItem[]>([]);

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

  // Randomized non-repetitive shooting star spawner running along grid tracks
  useEffect(() => {
    if (!isMounted) return;

    let starIdCounter = 0;
    let isCancelled = false;
    let spawnTimer: NodeJS.Timeout;

    const HORIZONTAL_TRACKS = [12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92];
    const VERTICAL_TRACKS = [15, 25, 35, 45, 55, 65, 75, 85, 92];
    const COLORS = ["#35408F", "#EF5C2A"];
    const DIRECTIONS: Array<"right" | "left" | "down" | "up"> = ["right", "left", "down", "up"];

    let lastDirection: string = "";
    let lastTrack: number = -1;
    let lastColorIndex: number = -1;

    const spawnStar = () => {
      if (isCancelled) return;

      const availableDirs = DIRECTIONS.filter((d) => d !== lastDirection);
      const direction = availableDirs[Math.floor(Math.random() * availableDirs.length)] || "right";
      lastDirection = direction;

      const isHorizontal = direction === "right" || direction === "left";
      const trackPool = isHorizontal ? HORIZONTAL_TRACKS : VERTICAL_TRACKS;

      const availableTracks = trackPool.filter((t) => t !== lastTrack);
      const chosenTrack = availableTracks[Math.floor(Math.random() * availableTracks.length)] || trackPool[0];
      lastTrack = chosenTrack;

      let topStr: string | undefined;
      let leftStr: string | undefined;

      if (direction === "right") {
        topStr = `${chosenTrack}%`;
        leftStr = "0%";
      } else if (direction === "left") {
        topStr = `${chosenTrack}%`;
        leftStr = "100%";
      } else if (direction === "down") {
        topStr = "0%";
        leftStr = `${chosenTrack}%`;
      } else {
        topStr = "100%";
        leftStr = `${chosenTrack}%`;
      }

      const randomDuration = (1.7 + Math.random() * 0.5).toFixed(2);
      const nextColorIndex = lastColorIndex === 0 ? 1 : 0;
      lastColorIndex = nextColorIndex;
      const chosenColor = COLORS[nextColorIndex];
      const randomSize = Math.random() > 0.45 ? 6 : 5;

      const newStar: ShootingStarItem = {
        id: ++starIdCounter,
        direction,
        top: topStr,
        left: leftStr,
        duration: `${randomDuration}s`,
        color: chosenColor,
        size: randomSize,
      };

      setActiveStars((prev) => [...prev.slice(-3), newStar]);

      const nextDelay = 650 + Math.floor(Math.random() * 650);
      spawnTimer = setTimeout(spawnStar, nextDelay);
    };

    spawnStar();
    const initTimer = setTimeout(spawnStar, 400);

    return () => {
      isCancelled = true;
      clearTimeout(spawnTimer);
      clearTimeout(initTimer);
    };
  }, [isMounted]);

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
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-[#f8f9fc]">
      {/* 1. Grid Pattern Overlay */}
      <div className="absolute inset-0 hero-grid pointer-events-none z-0" aria-hidden="true" />

      {/* 2. Animated Ambient Blobs */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[100px] opacity-30 hero-blob-1 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #35408F 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full filter blur-[100px] opacity-30 hero-blob-2 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #EF5C2A 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 3. Motion Items Animation (Shooting Stars along Grid Axes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
        {activeStars.map((star) => {
          const isRight = star.direction === "right";
          const isLeft = star.direction === "left";
          const isDown = star.direction === "down";

          return (
            <div
              key={star.id}
              className="absolute pointer-events-none will-change-transform"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                boxShadow: `0 0 6px 2px #ffffff, 0 0 16px 5px ${star.color}, 0 0 36px 10px ${star.color}b3`,
                animation: `${isRight ? "straightRight" : isLeft ? "straightLeft" : isDown ? "straightDown" : "straightUp"} ${star.duration} linear forwards`,
              }}
              onAnimationEnd={() => {
                setActiveStars((prev) => prev.filter((s) => s.id !== star.id));
              }}
            >
              <span
                className="absolute rounded-full pointer-events-none"
                style={{
                  filter: `drop-shadow(0 0 8px ${star.color}) drop-shadow(0 0 16px ${star.color})`,
                  ...(isRight
                    ? {
                        right: "50%",
                        top: "50%",
                        transformOrigin: "right center",
                        width: "90px",
                        height: "3.5px",
                        background: `linear-gradient(90deg, transparent, ${star.color}33 15%, ${star.color} 55%, #ffffff 100%)`,
                        animation: `tailStretchRight ${star.duration} linear forwards`,
                      }
                    : isLeft
                    ? {
                        left: "50%",
                        top: "50%",
                        transformOrigin: "left center",
                        width: "90px",
                        height: "3.5px",
                        background: `linear-gradient(90deg, #ffffff 0%, ${star.color} 45%, ${star.color}33 85%, transparent 100%)`,
                        animation: `tailStretchLeft ${star.duration} linear forwards`,
                      }
                    : isDown
                    ? {
                        bottom: "50%",
                        left: "50%",
                        transformOrigin: "center bottom",
                        width: "3.5px",
                        height: "90px",
                        background: `linear-gradient(180deg, transparent, ${star.color}33 15%, ${star.color} 55%, #ffffff 100%)`,
                        animation: `tailStretchDown ${star.duration} linear forwards`,
                      }
                    : {
                        top: "50%",
                        left: "50%",
                        transformOrigin: "center top",
                        width: "3.5px",
                        height: "90px",
                        background: `linear-gradient(180deg, #ffffff 0%, ${star.color} 45%, ${star.color}33 85%, transparent 100%)`,
                        animation: `tailStretchUp ${star.duration} linear forwards`,
                      }),
                }}
              />
            </div>
          );
        })}
      </div>

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
