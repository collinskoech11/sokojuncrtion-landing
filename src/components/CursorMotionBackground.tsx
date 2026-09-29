"use client";

import React, { useEffect, useRef, useState } from "react";

type Direction = "right" | "left" | "down" | "up";

interface GridStreak {
  direction: Direction;
  track: number; // Grid coordinate perpendicular to movement (y for horizontal, x for vertical)
  pos: number; // Coordinate along movement axis (x for horizontal, y for vertical)
  baseSpeed: number;
  currentSpeed: number;
  tailLength: number;
  baseTailLength: number;
  colorIndex: number; // 0 for primary blue, 1 for secondary orange
}

interface PreRenderedSprites {
  heads: HTMLCanvasElement[];
  tailsRight: HTMLCanvasElement[];
  tailsLeft: HTMLCanvasElement[];
  tailsDown: HTMLCanvasElement[];
  tailsUp: HTMLCanvasElement[];
}

const BRAND_COLORS = [
  { hex: "#35408F", rgb: [53, 64, 143] }, // Logo primary blue
  { hex: "#EF5C2A", rgb: [239, 92, 42] }, // Logo secondary orange
];

const GRID_SIZE = 40; // 40px grid tracks matching landing-grid
const MAX_TAIL = 420; // Extended length for dramatic glowing warp streaks

export default function CursorMotionBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clipBottom, setClipBottom] = useState<number>(0);

  // Direction & cursor physics refs
  const dominantDirectionRef = useRef<Direction>("right");
  const energyRef = useRef<number>(0);
  const lastInteractionRef = useRef<number>(0);
  const isIdleRef = useRef<boolean>(true);
  const prevCursorRef = useRef<{ x: number; y: number; time: number }>({
    x: 0,
    y: 0,
    time: 0,
  });
  const prevScrollYRef = useRef<number>(0);

  // 1. Maintain footer boundary using throttled check to save layout computation
  useEffect(() => {
    let ticking = false;
    const handleFooterBoundary = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const footer = document.querySelector("footer");
        if (!footer) {
          setClipBottom(0);
          return;
        }
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight) {
          setClipBottom(Math.max(0, windowHeight - footerRect.top));
        } else {
          setClipBottom(0);
        }
      });
    };

    window.addEventListener("scroll", handleFooterBoundary, { passive: true });
    window.addEventListener("resize", handleFooterBoundary, { passive: true });
    handleFooterBoundary();

    return () => {
      window.removeEventListener("scroll", handleFooterBoundary);
      window.removeEventListener("resize", handleFooterBoundary);
    };
  }, []);

  // 2. High-performance Canvas animation using pre-rendered sprites and grid tracks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    // Cap DPR at 1.25 to save ~60% GPU texture memory on high-DPI screens without visual loss
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    // --- Pre-render Sprites (Offscreen Canvases) ---
    // Zero runtime gradient allocation during the 60fps render loop
    const createSprites = (): PreRenderedSprites => {
      const HEAD_SIZE = 36;
      const TAIL_WIDTH = 3.5;

      const heads: HTMLCanvasElement[] = [];
      const tailsRight: HTMLCanvasElement[] = [];
      const tailsLeft: HTMLCanvasElement[] = [];
      const tailsDown: HTMLCanvasElement[] = [];
      const tailsUp: HTMLCanvasElement[] = [];

      BRAND_COLORS.forEach(({ hex, rgb: [r, g, b] }) => {
        // A. Head Sprite (36x36)
        const hCanvas = document.createElement("canvas");
        hCanvas.width = HEAD_SIZE;
        hCanvas.height = HEAD_SIZE;
        const hCtx = hCanvas.getContext("2d")!;
        const center = HEAD_SIZE / 2;

        // Outer halo
        const glowGrad = hCtx.createRadialGradient(center, center, 0, center, center, 16);
        glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.88)`);
        glowGrad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, 0.3)`);
        glowGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        hCtx.fillStyle = glowGrad;
        hCtx.beginPath();
        hCtx.arc(center, center, 16, 0, Math.PI * 2);
        hCtx.fill();

        // Intense inner halo
        const innerGrad = hCtx.createRadialGradient(center, center, 0, center, center, 6.5);
        innerGrad.addColorStop(0, "#ffffff");
        innerGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.95)`);
        innerGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        hCtx.fillStyle = innerGrad;
        hCtx.beginPath();
        hCtx.arc(center, center, 6.5, 0, Math.PI * 2);
        hCtx.fill();

        // Incandescent core
        hCtx.fillStyle = "#ffffff";
        hCtx.beginPath();
        hCtx.arc(center, center, 2.8, 0, Math.PI * 2);
        hCtx.fill();
        heads.push(hCanvas);

        // B. Tail Sprite - Right (MAX_TAIL x 16)
        const trCanvas = document.createElement("canvas");
        trCanvas.width = MAX_TAIL;
        trCanvas.height = 16;
        const trCtx = trCanvas.getContext("2d")!;
        const trGrad = trCtx.createLinearGradient(0, 0, MAX_TAIL, 0);
        trGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        trGrad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.12)`);
        trGrad.addColorStop(0.68, `rgba(${r}, ${g}, ${b}, 0.55)`);
        trGrad.addColorStop(0.9, `rgba(${r}, ${g}, ${b}, 0.9)`);
        trGrad.addColorStop(1, "rgba(255, 255, 255, 0.98)");

        trCtx.strokeStyle = trGrad;
        trCtx.lineWidth = TAIL_WIDTH;
        trCtx.lineCap = "round";
        trCtx.shadowColor = hex;
        trCtx.shadowBlur = 7;
        trCtx.beginPath();
        trCtx.moveTo(2, 8);
        trCtx.lineTo(MAX_TAIL - 2, 8);
        trCtx.stroke();
        tailsRight.push(trCanvas);

        // C. Tail Sprite - Left (MAX_TAIL x 16)
        const tlCanvas = document.createElement("canvas");
        tlCanvas.width = MAX_TAIL;
        tlCanvas.height = 16;
        const tlCtx = tlCanvas.getContext("2d")!;
        const tlGrad = tlCtx.createLinearGradient(0, 0, MAX_TAIL, 0);
        tlGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        tlGrad.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, 0.9)`);
        tlGrad.addColorStop(0.32, `rgba(${r}, ${g}, ${b}, 0.55)`);
        tlGrad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.12)`);
        tlGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        tlCtx.strokeStyle = tlGrad;
        tlCtx.lineWidth = TAIL_WIDTH;
        tlCtx.lineCap = "round";
        tlCtx.shadowColor = hex;
        tlCtx.shadowBlur = 7;
        tlCtx.beginPath();
        tlCtx.moveTo(2, 8);
        tlCtx.lineTo(MAX_TAIL - 2, 8);
        tlCtx.stroke();
        tailsLeft.push(tlCanvas);

        // D. Tail Sprite - Down (16 x MAX_TAIL)
        const tdCanvas = document.createElement("canvas");
        tdCanvas.width = 16;
        tdCanvas.height = MAX_TAIL;
        const tdCtx = tdCanvas.getContext("2d")!;
        const tdGrad = tdCtx.createLinearGradient(0, 0, 0, MAX_TAIL);
        tdGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        tdGrad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.12)`);
        tdGrad.addColorStop(0.68, `rgba(${r}, ${g}, ${b}, 0.55)`);
        tdGrad.addColorStop(0.9, `rgba(${r}, ${g}, ${b}, 0.9)`);
        tdGrad.addColorStop(1, "rgba(255, 255, 255, 0.98)");

        tdCtx.strokeStyle = tdGrad;
        tdCtx.lineWidth = TAIL_WIDTH;
        tdCtx.lineCap = "round";
        tdCtx.shadowColor = hex;
        tdCtx.shadowBlur = 7;
        tdCtx.beginPath();
        tdCtx.moveTo(8, 2);
        tdCtx.lineTo(8, MAX_TAIL - 2);
        tdCtx.stroke();
        tailsDown.push(tdCanvas);

        // E. Tail Sprite - Up (16 x MAX_TAIL)
        const tuCanvas = document.createElement("canvas");
        tuCanvas.width = 16;
        tuCanvas.height = MAX_TAIL;
        const tuCtx = tuCanvas.getContext("2d")!;
        const tuGrad = tuCtx.createLinearGradient(0, 0, 0, MAX_TAIL);
        tuGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
        tuGrad.addColorStop(0.1, `rgba(${r}, ${g}, ${b}, 0.9)`);
        tuGrad.addColorStop(0.32, `rgba(${r}, ${g}, ${b}, 0.55)`);
        tuGrad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.12)`);
        tuGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        tuCtx.strokeStyle = tuGrad;
        tuCtx.lineWidth = TAIL_WIDTH;
        tuCtx.lineCap = "round";
        tuCtx.shadowColor = hex;
        tuCtx.shadowBlur = 7;
        tuCtx.beginPath();
        tuCtx.moveTo(8, 2);
        tuCtx.lineTo(8, MAX_TAIL - 2);
        tuCtx.stroke();
        tailsUp.push(tuCanvas);
      });

      return { heads, tailsRight, tailsLeft, tailsDown, tailsUp };
    };

    let sprites = createSprites();

    const resizeCanvas = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Helpers to get snapped grid tracks
    const getRandomHorizontalTrack = (maxH: number) => {
      const numTracks = Math.max(1, Math.floor(maxH / GRID_SIZE));
      return Math.floor(Math.random() * numTracks) * GRID_SIZE;
    };

    const getRandomVerticalTrack = (maxW: number) => {
      const numTracks = Math.max(1, Math.floor(maxW / GRID_SIZE));
      return Math.floor(Math.random() * numTracks) * GRID_SIZE;
    };

    // 9 sleek streaks: lightweight, high visual impact without overcrowding
    const STREAK_COUNT = 9;
    const streaks: GridStreak[] = [];

    const spawnStreak = (
      streak: GridStreak | null,
      dirPreference?: Direction
    ): GridStreak => {
      const dir =
        dirPreference ||
        (isIdleRef.current
          ? (["right", "down", "right", "down", "left", "up"][Math.floor(Math.random() * 6)] as Direction)
          : dominantDirectionRef.current);

      const isHorizontal = dir === "right" || dir === "left";
      const track = isHorizontal
        ? getRandomHorizontalTrack(height)
        : getRandomVerticalTrack(width);

      // Longer base tails and faster base speeds
      const baseTail = 175 + Math.random() * 75; // 175px to 250px base
      const speed = 8.0 + Math.random() * 4.5; // 8.0 to 12.5 px/frame base
      const colorIndex = Math.random() > 0.5 ? 1 : 0;

      let pos = 0;
      if (dir === "right") {
        pos = -baseTail;
      } else if (dir === "left") {
        pos = width + baseTail;
      } else if (dir === "down") {
        pos = -baseTail;
      } else {
        pos = height + baseTail;
      }

      if (streak) {
        streak.direction = dir;
        streak.track = track;
        streak.pos = pos;
        streak.baseSpeed = speed;
        streak.currentSpeed = speed;
        streak.baseTailLength = baseTail;
        streak.tailLength = baseTail;
        streak.colorIndex = colorIndex;
        return streak;
      }

      return {
        direction: dir,
        track,
        pos: isHorizontal ? Math.random() * width : Math.random() * height,
        baseSpeed: speed,
        currentSpeed: speed,
        baseTailLength: baseTail,
        tailLength: baseTail,
        colorIndex,
      };
    };

    for (let i = 0; i < STREAK_COUNT; i++) {
      streaks.push(spawnStreak(null));
    }

    // --- Cursor & Input Direction Tracking ---
    const onPointerMove = (clientX: number, clientY: number) => {
      const now = performance.now();
      const prev = prevCursorRef.current;

      if (prev.time > 0) {
        const dx = clientX - prev.x;
        const dy = clientY - prev.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 2.5) {
          let newDir: Direction;
          if (Math.abs(dx) >= Math.abs(dy)) {
            newDir = dx > 0 ? "right" : "left";
          } else {
            newDir = dy > 0 ? "down" : "up";
          }

          dominantDirectionRef.current = newDir;
          energyRef.current = Math.min(energyRef.current + dist * 0.12, 10);
          lastInteractionRef.current = now;
          isIdleRef.current = false;
        }
      }

      prevCursorRef.current = { x: clientX, y: clientY, time: now };
    };

    const handleMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Scroll adds vertical momentum in straight downward/upward lines
    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - prevScrollYRef.current;
      prevScrollYRef.current = currentScrollY;

      if (Math.abs(scrollDiff) > 2) {
        dominantDirectionRef.current = scrollDiff > 0 ? "down" : "up";
        energyRef.current = Math.min(energyRef.current + Math.abs(scrollDiff) * 0.06, 8);
        lastInteractionRef.current = now;
        isIdleRef.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let isTabVisible = true;
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Idle cycle direction timer
    let idleDirIndex = 0;
    const idleDirs: Direction[] = ["right", "down", "right", "down", "left", "up"];

    // Main 60fps render loop
    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();

      // Check idle state
      if (now - lastInteractionRef.current > 1500) {
        isIdleRef.current = true;
        energyRef.current *= 0.95;

        // Periodically alternate ambient directions when idle
        if (Math.floor(now / 3200) !== idleDirIndex) {
          idleDirIndex = Math.floor(now / 3200);
          dominantDirectionRef.current = idleDirs[idleDirIndex % idleDirs.length];
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Process and render straight-line streaks
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];

        // 1. Calculate normalized progress along current travel axis (0 at entrance, 0.5 in middle, 1.0 at exit)
        const margin = 100;
        let progress = 0.5;
        if (s.direction === "right") {
          progress = (s.pos + margin) / (width + 2 * margin);
        } else if (s.direction === "left") {
          progress = (width + margin - s.pos) / (width + 2 * margin);
        } else if (s.direction === "down") {
          progress = (s.pos + margin) / (height + 2 * margin);
        } else {
          progress = (height + margin - s.pos) / (height + 2 * margin);
        }

        const clampedProgress = Math.max(0, Math.min(1, progress));
        // distFromCenter: 0 in middle, 1.0 at entrance and exit edges
        const distFromCenter = Math.abs(clampedProgress - 0.5) * 2;
        const curve = Math.pow(distFromCenter, 1.7);

        // Fast around edges (~2.2x), decelerates into center (~0.35x), accelerates on exit
        const speedFactor = 0.35 + 1.95 * curve;
        const speedBoost = energyRef.current * 0.45;
        s.currentSpeed = (s.baseSpeed + speedBoost) * speedFactor;

        // Longer tail streaks: stretches up to 390px around edges and high speed
        const tailFactor = 0.48 + 1.15 * curve;
        s.tailLength = s.baseTailLength * tailFactor + energyRef.current * 7;

        // 2. Advance along straight line track
        if (s.direction === "right") {
          s.pos += s.currentSpeed;
          if (s.pos - s.tailLength > width + 60) {
            spawnStreak(s);
          }
        } else if (s.direction === "left") {
          s.pos -= s.currentSpeed;
          if (s.pos + s.tailLength < -60) {
            spawnStreak(s);
          }
        } else if (s.direction === "down") {
          s.pos += s.currentSpeed;
          if (s.pos - s.tailLength > height + 60) {
            spawnStreak(s);
          }
        } else {
          s.pos -= s.currentSpeed;
          if (s.pos + s.tailLength < -60) {
            spawnStreak(s);
          }
        }

        // --- Fast GPU Sprite Blitting (ctx.drawImage) ---
        const colorIdx = s.colorIndex;
        const headSprite = sprites.heads[colorIdx];
        const intPos = Math.round(s.pos);
        const intTrack = s.track;
        const intTail = Math.round(Math.min(s.tailLength, MAX_TAIL - 10));

        if (s.direction === "right") {
          const tailSprite = sprites.tailsRight[colorIdx];
          ctx.drawImage(
            tailSprite,
            MAX_TAIL - intTail,
            0,
            intTail,
            16,
            intPos - intTail,
            intTrack - 8,
            intTail,
            16
          );
          ctx.drawImage(headSprite, intPos - 18, intTrack - 18);
        } else if (s.direction === "left") {
          const tailSprite = sprites.tailsLeft[colorIdx];
          ctx.drawImage(
            tailSprite,
            0,
            0,
            intTail,
            16,
            intPos,
            intTrack - 8,
            intTail,
            16
          );
          ctx.drawImage(headSprite, intPos - 18, intTrack - 18);
        } else if (s.direction === "down") {
          const tailSprite = sprites.tailsDown[colorIdx];
          ctx.drawImage(
            tailSprite,
            0,
            MAX_TAIL - intTail,
            16,
            intTail,
            intTrack - 8,
            intPos - intTail,
            16,
            intTail
          );
          ctx.drawImage(headSprite, intTrack - 18, intPos - 18);
        } else {
          const tailSprite = sprites.tailsUp[colorIdx];
          ctx.drawImage(
            tailSprite,
            0,
            0,
            16,
            intTail,
            intTrack - 8,
            intPos,
            16,
            intTail
          );
          ctx.drawImage(headSprite, intTrack - 18, intPos - 18);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform"
      style={{
        transform: "translateZ(0)",
        clipPath: clipBottom > 0 ? `inset(0 0 ${clipBottom}px 0)` : undefined,
      }}
      aria-hidden="true"
    >
      {/* 1. Full Landing Page Grid Overlay (Visible all through) */}
      <div className="absolute inset-0 landing-grid pointer-events-none z-0" aria-hidden="true" />

      {/* 2. Light, Zero-Blur GPU-Friendly Gradient Ambient Blobs */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full opacity-35 hero-blob-1 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(53, 64, 143, 0.22) 0%, rgba(53, 64, 143, 0.07) 42%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-30 hero-blob-2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239, 92, 42, 0.2) 0%, rgba(239, 92, 42, 0.06) 42%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-30 hero-blob-1 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(53, 64, 143, 0.2) 0%, rgba(53, 64, 143, 0.05) 42%, transparent 70%)",
        }}
      />

      {/* 3. High-Performance Straight-Line Grid Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />
    </div>
  );
}
