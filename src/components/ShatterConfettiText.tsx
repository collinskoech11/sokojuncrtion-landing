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

// Vibrant and subtle dot shades strictly derived from logo hues
const LOGO_BLUE_DOTS = [
  "#35408F", // Exact logo primary blue
  "#4B5AB8", // Logo blue light highlight
  "#252D66", // Logo blue deep navy
  "#2563EB", // Bright royal blue
  "#5C6BC0", // Soft blue glow
];

const LOGO_ORANGE_DOTS = [
  "#EF5C2A", // Exact logo secondary orange
  "#F37B53", // Logo orange coral
  "#C94517", // Logo orange deep rust
  "#F97316", // Vivid bright orange
  "#FF8A65", // Warm peach glow
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
  const animFrameIdRef = useRef<number | null>(null);

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

  // Sync canvas dimensions with device pixel ratio
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cRect = canvas.getBoundingClientRect();
    if (cRect.width === 0 || cRect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(cRect.width * dpr);
    canvas.height = Math.round(cRect.height * dpr);
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    return () => window.removeEventListener("resize", syncCanvasSize);
  }, [syncCanvasSize]);

  // Render loop for rounded dot particles with explicit per-frame transform
  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      animFrameIdRef.current = null;
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      animFrameIdRef.current = null;
      return;
    }

    const cRect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Explicitly set transform per frame to avoid matrix accumulation bugs
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cRect.width, cRect.height);

    const activeParticles: DotParticle[] = [];

    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];
      p.life++;

      const progress = p.life / p.maxLife;
      if (progress >= 1) continue;

      // Retain opacity for first 60% of lifespan, then smoothly fade out
      p.opacity = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;

      // Gentle floating physics with air drag and soft gravity
      p.vx *= 0.965;
      p.vy = p.vy * 0.965 + 0.09; // Light gravity so dots float and drift
      p.x += p.vx;
      p.y += p.vy;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.glow) {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
      }

      ctx.fill();
      ctx.restore();

      activeParticles.push(p);
    }

    particlesRef.current = activeParticles;

    if (activeParticles.length > 0) {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    } else {
      ctx.clearRect(0, 0, cRect.width, cRect.height);
      animFrameIdRef.current = null;
    }
  }, []);

  // Spawn visible rounded dots directly along the primary (blue) and secondary (orange) words
  const spawnTextDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    syncCanvasSize();
    const cRect = canvas.getBoundingClientRect();

    const primaryEl = primarySpanRef.current;
    const secondaryEl = secondarySpanRef.current;

    const newParticles: DotParticle[] = [];

    // Emit gentle rounded dots from an element's bounding box
    const emitDotsFromElement = (
      el: HTMLElement | null,
      palette: string[],
      dotCount: number
    ) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const elX = rect.left - cRect.left;
      const elY = rect.top - cRect.top;
      const elW = rect.width;
      const elH = rect.height;
      const centerX = elX + elW / 2;
      const centerY = elY + elH / 2;

      for (let i = 0; i < dotCount; i++) {
        // Distribute starting positions along the text characters
        const startX = elX + (Math.random() * 0.92 + 0.04) * elW;
        const startY = elY + (Math.random() * 0.8 + 0.1) * elH;

        // Radial angle outwards from the word center
        const angle = Math.atan2(startY - centerY, startX - centerX) + (Math.random() - 0.5) * 0.7;
        const speed = 2.0 + Math.random() * 4.5;

        // Upward pop and soft outward float
        const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 1.8;
        const vy = Math.sin(angle) * speed * 0.65 - (1.8 + Math.random() * 3.5);

        const color = palette[Math.floor(Math.random() * palette.length)];
        const radius = 2.4 + Math.random() * 3.2; // Distinct, clearly visible rounded dot (2.4px to 5.6px)
        const glow = Math.random() > 0.4;

        newParticles.push({
          x: startX,
          y: startY,
          vx,
          vy,
          radius,
          color,
          opacity: 1,
          life: 0,
          maxLife: 65 + Math.random() * 30, // ~1.1s to 1.6s of graceful float
          glow,
        });
      }
    };

    // Emit blue dots from the primary word (e.g. "Smart", "24/7 Digital", "Automated")
    emitDotsFromElement(primaryEl, LOGO_BLUE_DOTS, 65);

    // Emit orange dots from the secondary word (e.g. "Retail Assistant.", "Store Cashier.", "Commerce Engine.")
    emitDotsFromElement(secondaryEl, LOGO_ORANGE_DOTS, 75);

    particlesRef.current = newParticles;

    if (!animFrameIdRef.current) {
      renderLoop();
    }
  }, [syncCanvasSize, renderLoop]);

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
      }, 700);
    }, 240);
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
        minHeight: maxHeight ? `${maxHeight}px` : "2.3em",
        height: maxHeight ? `${maxHeight}px` : undefined,
        transition: "height 250ms ease-out",
      }}
    >
      {/* Hidden measurement probe inside valid span to pre-calculate maximum height across all phrases */}
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

      {/* Particle Canvas Layer with high z-index and generous padding */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute z-30"
        style={{
          width: "calc(100% + 300px)",
          height: "calc(100% + 220px)",
          left: "-150px",
          top: "-110px",
        }}
        aria-hidden="true"
      />

      {/* Main Animated Text Phrase */}
      <span
        className="inline-block text-center transition-all duration-300 will-change-[transform,opacity,filter]"
        style={{
          transform:
            phase === "shattering"
              ? "scale(0.96) translateY(-3px)"
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
