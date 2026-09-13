"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface WordPhrase {
  primary: string;
  secondary: string;
}

interface DotParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
  glow?: boolean;
}

interface ShatterConfettiTextProps {
  phrases: WordPhrase[];
  intervalMs?: number;
  className?: string;
}

// Exact Blue and Orange colors sampled directly from SokoJunction Logo (logo_min.jpeg)
const LOGO_BLUE = "#35408F"; // rgb(53, 64, 143)
const LOGO_ORANGE = "#EF5C2A"; // rgb(239, 92, 42)

// Subtle and vibrant rounded dot shades strictly derived from logo hues
const LOGO_BLUE_DOTS = [
  "#35408F", // Exact logo primary blue
  "#4350A5", // Vibrant blue accent
  "#283273", // Deep navy blue
  "#4F5EC7", // Bright royal blue
  "#5C6BC0", // Soft blue glow
];

const LOGO_ORANGE_DOTS = [
  "#EF5C2A", // Exact logo secondary orange
  "#F3784D", // Warm coral orange
  "#D24816", // Deep amber rust
  "#FA895E", // Vivid orange glow
  "#FF9D7A", // Soft peach accent
];

export default function ShatterConfettiText({
  phrases,
  intervalMs = 4000,
  className = "",
}: ShatterConfettiTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "shattering" | "entering">("idle");
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  const containerRef = useRef<HTMLSpanElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const primarySpanRef = useRef<HTMLSpanElement>(null);
  const secondarySpanRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isAnimatingRef = useRef(false);
  const particlesRef = useRef<DotParticle[]>([]);

  // Measure all phrases in probe to lock container height permanently and eliminate layout shifts
  const measureHeights = useCallback(() => {
    const probe = probeRef.current;
    if (!probe) return;

    const children = probe.children;
    let maxH = 0;
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      if (el.offsetHeight > maxH) {
        maxH = el.offsetHeight;
      }
    }
    if (maxH > 0) {
      setMaxHeight(maxH);
    }
  }, []);

  useEffect(() => {
    measureHeights();
    window.addEventListener("resize", measureHeights);
    return () => window.removeEventListener("resize", measureHeights);
  }, [measureHeights, phrases]);

  // Continuous, race-free animation render loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const cRect = canvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const targetW = Math.round(cRect.width * dpr);
          const targetH = Math.round(cRect.height * dpr);

          // Automatically sync canvas buffer size to current element dimensions
          if (cRect.width > 0 && cRect.height > 0) {
            if (canvas.width !== targetW || canvas.height !== targetH) {
              canvas.width = targetW;
              canvas.height = targetH;
            }

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, cRect.width, cRect.height);

            if (particlesRef.current.length > 0) {
              const active: DotParticle[] = [];

              for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.life++;

                const progress = p.life / p.maxLife;
                if (progress >= 1) continue;

                // Retain full opacity for first 65% of lifespan, then smoothly fade out
                p.opacity = progress < 0.65 ? 1 : Math.max(0, 1 - (progress - 0.65) / 0.35);

                // Gentle floating physics with light air drag and soft gravity
                p.vx *= 0.96;
                p.vy = p.vy * 0.96 + 0.08;
                p.x += p.vx;
                p.y += p.vy;

                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;

                if (p.glow) {
                  ctx.shadowColor = p.color;
                  ctx.shadowBlur = 8;
                }

                ctx.fill();
                ctx.restore();

                active.push(p);
              }

              particlesRef.current = active;
            }
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Spawn visible rounded dots directly along the primary (blue) and secondary (orange) words
  const spawnTextDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cRect = canvas.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const primaryEl = primarySpanRef.current;
    const secondaryEl = secondarySpanRef.current;

    const newParticles: DotParticle[] = [];

    const emitDotsFromElement = (
      el: HTMLElement | null,
      palette: string[],
      dotCount: number,
      fallbackRatioX: number
    ) => {
      let elX: number;
      let elY: number;
      let elW: number;
      let elH: number;

      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          elX = rect.left - cRect.left;
          elY = rect.top - cRect.top;
          elW = rect.width;
          elH = rect.height;
        } else {
          elW = cRect.width * 0.3;
          elH = 40;
          elX = cRect.width * fallbackRatioX - elW / 2;
          elY = cRect.height / 2 - elH / 2;
        }
      } else {
        elW = cRect.width * 0.3;
        elH = 40;
        elX = cRect.width * fallbackRatioX - elW / 2;
        elY = cRect.height / 2 - elH / 2;
      }

      const centerX = elX + elW / 2;
      const centerY = elY + elH / 2;

      for (let i = 0; i < dotCount; i++) {
        // Distribute starting positions along the text characters
        const startX = elX + (Math.random() * 0.94 + 0.03) * elW;
        const startY = elY + (Math.random() * 0.8 + 0.1) * elH;

        // Radial angle outwards from word center
        const angle = Math.atan2(startY - centerY, startX - centerX) + (Math.random() - 0.5) * 0.8;
        const speed = 2.2 + Math.random() * 4.8;

        // Upward pop and soft outward drift
        const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 2;
        const vy = Math.sin(angle) * speed * 0.6 - (2.2 + Math.random() * 3.8);

        const color = palette[Math.floor(Math.random() * palette.length)];
        const radius = 3.0 + Math.random() * 3.5; // Clear rounded dots (3.0px to 6.5px)
        const glow = Math.random() > 0.3;

        newParticles.push({
          x: startX,
          y: startY,
          vx,
          vy,
          radius,
          color,
          opacity: 1,
          life: 0,
          maxLife: 65 + Math.random() * 30, // ~1.2s to 1.6s of graceful float
          glow,
        });
      }
    };

    // Emit blue dots from primary word
    emitDotsFromElement(primaryEl, LOGO_BLUE_DOTS, 55, 0.38);

    // Emit orange dots from secondary word
    emitDotsFromElement(secondaryEl, LOGO_ORANGE_DOTS, 65, 0.62);

    particlesRef.current = newParticles;
  }, []);

  // Transition orchestrator using stable ref flag
  const advanceTransition = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // 1. Text breaks apart into subtle rounded dots
    setPhase("shattering");
    spawnTextDots();

    // 2. Advance to the next phrase and smoothly reveal
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
      setPhase("entering");

      setTimeout(() => {
        setPhase("idle");
        isAnimatingRef.current = false;
      }, 650);
    }, 220);
  }, [phrases.length, spawnTextDots]);

  // Stable recurring automatic interval
  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = setInterval(() => {
      advanceTransition();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [phrases.length, intervalMs, advanceTransition]);

  const currentPhrase = phrases[currentIndex] || phrases[0];

  return (
    <span
      ref={containerRef}
      onClick={advanceTransition}
      title="Click to shatter"
      className={`relative inline-flex flex-col items-center justify-center w-full select-none cursor-pointer ${className}`}
      style={{
        minHeight: maxHeight ? `${maxHeight}px` : "2.4em",
        height: maxHeight ? `${maxHeight}px` : undefined,
        transition: "height 250ms ease-out",
      }}
    >
      {/* Hidden measurement probe to pre-calculate maximum height across all phrases */}
      <span
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 w-full opacity-0 -z-50 overflow-hidden block"
        style={{ visibility: "hidden" }}
      >
        {phrases.map((phrase, idx) => (
          <span key={idx} className="w-full text-center py-1 block">
            <span className="font-black tracking-tight" style={{ color: LOGO_BLUE }}>
              {phrase.primary}
            </span>{" "}
            <span className="font-black tracking-tight" style={{ color: LOGO_ORANGE }}>
              {phrase.secondary}
            </span>
          </span>
        ))}
      </span>

      {/* Particle Canvas Layer covering the text area with generous bleed */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -inset-y-16 -inset-x-12 w-[calc(100%+6rem)] h-[calc(100%+8rem)] z-30"
        aria-hidden="true"
      />

      {/* Main Animated Text Phrase */}
      <span
        className="inline-block text-center transition-all duration-300 will-change-[transform,opacity,filter]"
        style={{
          transform:
            phase === "shattering"
              ? "scale(0.96) translateY(-4px)"
              : phase === "entering"
              ? "scale(1) translateY(0px)"
              : "scale(1) translateY(0px)",
          opacity: phase === "shattering" ? 0 : 1,
          filter:
            phase === "shattering"
              ? "blur(5px)"
              : phase === "entering"
              ? "blur(0px)"
              : "blur(0px)",
          transition:
            phase === "shattering"
              ? "transform 200ms ease-out, opacity 180ms ease-out, filter 200ms ease-out"
              : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), filter 400ms ease-out",
        }}
      >
        {/* Primary Word in Exact Logo Blue */}
        <span
          ref={primarySpanRef}
          className="inline-block font-black tracking-tight drop-shadow-sm"
          style={{ color: LOGO_BLUE }}
        >
          {currentPhrase.primary}
        </span>{" "}
        {/* Secondary Word in Exact Logo Orange */}
        <span
          ref={secondarySpanRef}
          className="inline-block font-black tracking-tight drop-shadow-sm"
          style={{ color: LOGO_ORANGE }}
        >
          {currentPhrase.secondary}
        </span>
      </span>
    </span>
  );
}
