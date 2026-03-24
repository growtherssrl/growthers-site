"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Animated grid background inspired by WorkOS/mcp.
 * Pure Canvas — no dependencies beyond React.
 * Grid squares randomly light up and fade out.
 */

interface AnimatedGridProps {
  gridSize?: number;
  color?: string;
  maxOpacity?: number;
  flickerSpeed?: number;
  className?: string;
}

export default function AnimatedGrid({
  gridSize = 64,
  color = "255, 92, 53",
  maxOpacity = 0.12,
  flickerSpeed = 0.015,
  className = "",
}: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const cellsRef = useRef<{ opacity: number; target: number; speed: number }[]>([]);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;

    const cols = Math.ceil(rect.width / gridSize) + 1;
    const rows = Math.ceil(rect.height / gridSize) + 1;
    const total = cols * rows;

    cellsRef.current = Array.from({ length: total }, () => ({
      opacity: 0,
      target: 0,
      speed: flickerSpeed + Math.random() * flickerSpeed,
    }));
  }, [gridSize, flickerSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    init();

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio;
      const cols = Math.ceil(rect.width / gridSize) + 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      cellsRef.current.forEach((cell, i) => {
        // Randomly pick new targets
        if (Math.random() < 0.002) {
          cell.target = Math.random() * maxOpacity;
        }
        if (Math.random() < 0.005) {
          cell.target = 0;
        }

        // Ease toward target
        cell.opacity += (cell.target - cell.opacity) * cell.speed;

        if (cell.opacity > 0.005) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * gridSize;
          const y = row * gridSize;

          ctx.fillStyle = `rgba(${color}, ${cell.opacity})`;
          ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2);
        }
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [gridSize, color, maxOpacity, flickerSpeed, init]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
