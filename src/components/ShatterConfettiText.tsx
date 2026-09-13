"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface WordPhrase {
  primary: string;
  secondary: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "shard" | "confetti" | "glint";
  color: string;
  width: number;
  height: number;
  rotation: number;
  vRotation: number;
  tiltAngle: number;
  vTilt: number;
  opacity: number;
  life: number;
  maxLife: number;
  points?: { x: number; y: number }[];
}

interface ShatterConfettiTextProps {
  phrases: WordPhrase[];
  intervalMs?: number;
  className?: string;
}

const BRAND_COLORS = [
  "#35408F", // SokoJunction Primary Blue
  "#EF5C2A", // SokoJunction Secondary Orange
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#8B5CF6", // Violet
  "#38BDF8", // Sky Blue
  "#EC4899", // Pink
];

export default function ShatterConfettiText({
  phrases,
  intervalMs = 3800,
  className = "",
}: ShatterConfettiTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "shattering" | "entering">("idle");
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Helper to spawn shattering glass shards and confetti ribbons
  const spawnBurst = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const cRect = canvas.getBoundingClientRect();

    // Center coordinates relative to canvas
    const centerX = rect.left - cRect.left + rect.width / 2;
    const centerY = rect.top - cRect.top + rect.height / 2;

    const newParticles: Particle[] = [];

    // 1. Shattering shards (angular polygon fragments radiating outward)
    const numShards = 36;
    for (let i = 0; i < numShards; i++) {
      const angle = (Math.PI * 2 * i) / numShards + (Math.random() - 0.5) * 0.4;
      const speed = 4 + Math.random() * 8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 2.5; // slight upward pop
      const color = Math.random() > 0.5 ? "#35408F" : "#EF5C2A";

      // Build random triangular/polygonal shard
      const s = 6 + Math.random() * 10;
      const points = [
        { x: -s / 2, y: -s / 2 },
        { x: s / 2 + (Math.random() - 0.5) * 4, y: -s / 4 },
        { x: (Math.random() - 0.5) * 4, y: s / 2 },
      ];

      newParticles.push({
        x: centerX + (Math.random() - 0.5) * (rect.width * 0.7),
        y: centerY + (Math.random() - 0.5) * (rect.height * 0.7),
        vx,
        vy,
        type: "shard",
        color,
        width: s,
        height: s,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.35,
        tiltAngle: Math.random() * Math.PI,
        vTilt: 0,
        opacity: 1,
        life: 0,
        maxLife: 45 + Math.random() * 25,
        points,
      });
    }

    // 2. Confetti ribbons & fluttering pieces
    const numConfetti = 50;
    for (let i = 0; i < numConfetti; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 7;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 4.5; // upward burst
      const color = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
      const isSquare = Math.random() > 0.5;

      newParticles.push({
        x: centerX + (Math.random() - 0.5) * (rect.width * 0.8),
        y: centerY + (Math.random() - 0.5) * (rect.height * 0.6),
        vx,
        vy,
        type: "confetti",
        color,
        width: isSquare ? 7 + Math.random() * 5 : 4 + Math.random() * 4,
        height: isSquare ? 7 + Math.random() * 5 : 10 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        vRotation: (Math.random() - 0.5) * 0.25,
        tiltAngle: Math.random() * Math.PI,
        vTilt: 0.08 + Math.random() * 0.12,
        opacity: 1,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    }

    // 3. Sparkle / glint stars
    const numGlints = 16;
    for (let i = 0; i < numGlints; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      newParticles.push({
        x: centerX + (Math.random() - 0.5) * rect.width,
        y: centerY + (Math.random() - 0.5) * rect.height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        type: "glint",
        color: "#ffffff",
        width: 3 + Math.random() * 4,
        height: 3 + Math.random() * 4,
        rotation: 0,
        vRotation: 0,
        tiltAngle: 0,
        vTilt: 0,
        opacity: 1,
        life: 0,
        maxLife: 35 + Math.random() * 20,
      });
    }

    particlesRef.current = newParticles;

    // Start render loop if not running
    if (!animFrameIdRef.current) {
      renderLoop();
    }
  }, []);

  // Particle Physics and Render Loop
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activeParticles: Particle[] = [];

    for (let i = 0; i < particlesRef.current.length; i++) {
      const p = particlesRef.current[i];
      p.life++;

      // Progress ratio (0 to 1)
      const progress = p.life / p.maxLife;
      if (progress >= 1) continue;

      // Opacity fade in the second half of life
      p.opacity = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;

      if (p.type === "shard") {
        // Physics for shattered glass/text shards
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + 0.22; // gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRotation;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.points && p.points.length >= 3) {
          ctx.beginPath();
          ctx.moveTo(p.points[0].x, p.points[0].y);
          for (let k = 1; k < p.points.length; k++) {
            ctx.lineTo(p.points[k].x, p.points[k].y);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        }
        ctx.restore();
      } else if (p.type === "confetti") {
        // Physics for fluttering 3D confetti
        p.vx *= 0.97;
        p.vy = Math.min(p.vy * 0.97 + 0.16, 4.0); // terminal velocity + air friction
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRotation;
        p.tiltAngle += p.vTilt;

        // 3D paper flip oscillation width
        const currentWidth = p.width * Math.cos(p.tiltAngle);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);

        // Draw fluttering ribbon/rect
        ctx.fillRect(-Math.abs(currentWidth) / 2, -p.height / 2, Math.abs(currentWidth), p.height);

        // Highlight sheen on flip
        if (Math.abs(currentWidth) < p.width * 0.3) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.fillRect(-Math.abs(currentWidth) / 2, -p.height / 2, Math.abs(currentWidth), p.height);
        }
        ctx.restore();
      } else if (p.type === "glint") {
        p.x += p.vx;
        p.y += p.vy;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = Math.max(0, p.opacity * 0.85);
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      activeParticles.push(p);
    }

    particlesRef.current = activeParticles;

    if (activeParticles.length > 0) {
      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animFrameIdRef.current = null;
    }
  }, []);

  // Sync canvas size with pixel ratio
  const syncCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    return () => {
      window.removeEventListener("resize", syncCanvasSize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [syncCanvasSize]);

  // Main transition orchestrator
  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = setInterval(() => {
      // 1. Trigger shatter & confetti explosion
      setPhase("shattering");
      spawnBurst();

      // 2. Switch to next word and trigger smooth entrance
      const switchTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setPhase("entering");

        // 3. Return to idle
        const idleTimer = setTimeout(() => {
          setPhase("idle");
        }, 700);

        return () => clearTimeout(idleTimer);
      }, 220);

      return () => clearTimeout(switchTimer);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [phrases.length, intervalMs, spawnBurst]);

  const currentPhrase = phrases[currentIndex] || phrases[0];

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center justify-center min-h-[1.25em] ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Full-width particle canvas layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute -inset-24 z-20 w-[calc(100%+12rem)] h-[calc(100%+12rem)]"
        style={{
          width: "calc(100% + 12rem)",
          height: "calc(100% + 12rem)",
          left: "-6rem",
          top: "-6rem",
        }}
        aria-hidden="true"
      />

      {/* Smoothly animated text content */}
      <span
        className="inline-block transition-all will-change-[transform,opacity,filter]"
        style={{
          transform:
            phase === "shattering"
              ? "scale(0.92) rotate(-1.5deg) translateY(-4px)"
              : phase === "entering"
              ? "scale(1) rotate(0deg) translateY(0px)"
              : "scale(1) rotate(0deg) translateY(0px)",
          opacity: phase === "shattering" ? 0 : 1,
          filter:
            phase === "shattering"
              ? "blur(6px)"
              : phase === "entering"
              ? "blur(0px)"
              : "blur(0px)",
          transition:
            phase === "shattering"
              ? "transform 220ms ease-in, opacity 200ms ease-in, filter 220ms ease-in"
              : "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms ease-out",
        }}
      >
        <span className="text-primary font-black tracking-tight drop-shadow-sm">
          {currentPhrase.primary}
        </span>{" "}
        <span className="text-secondary font-black tracking-tight drop-shadow-sm">
          {currentPhrase.secondary}
        </span>
      </span>
    </span>
  );
}
