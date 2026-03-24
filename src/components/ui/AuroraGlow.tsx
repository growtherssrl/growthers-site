"use client";

import { motion } from "framer-motion";

interface Blob {
  color: string;
  opacity: number;
  size: string;
  maxSize: number;
  blur: number;
  position: Record<string, string>;
  duration: number;
}

interface AuroraGlowProps {
  className?: string;
  variant?: "default" | "warm" | "cool" | "purple";
}

const PRESETS: Record<string, Blob[]> = {
  default: [
    { color: "255,92,53", opacity: 0.15, size: "40vw", maxSize: 600, blur: 60, position: { top: "20%", left: "30%" }, duration: 20 },
    { color: "191,90,242", opacity: 0.12, size: "35vw", maxSize: 500, blur: 60, position: { top: "35%", right: "15%" }, duration: 25 },
    { color: "48,209,88", opacity: 0.08, size: "25vw", maxSize: 350, blur: 80, position: { bottom: "20%", left: "50%" }, duration: 18 },
  ],
  warm: [
    { color: "255,92,53", opacity: 0.18, size: "45vw", maxSize: 650, blur: 70, position: { top: "25%", left: "25%" }, duration: 22 },
    { color: "251,146,60", opacity: 0.1, size: "30vw", maxSize: 450, blur: 60, position: { bottom: "20%", right: "20%" }, duration: 18 },
  ],
  cool: [
    { color: "191,90,242", opacity: 0.14, size: "40vw", maxSize: 600, blur: 70, position: { top: "20%", right: "20%" }, duration: 22 },
    { color: "48,209,88", opacity: 0.10, size: "30vw", maxSize: 450, blur: 60, position: { bottom: "25%", left: "25%" }, duration: 18 },
  ],
  purple: [
    { color: "191,90,242", opacity: 0.16, size: "45vw", maxSize: 650, blur: 70, position: { top: "20%", left: "30%" }, duration: 20 },
    { color: "255,92,53", opacity: 0.08, size: "25vw", maxSize: 350, blur: 60, position: { bottom: "30%", right: "25%" }, duration: 16 },
  ],
};

const MOTIONS = [
  { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] },
  { x: [0, -30, 25, 0], y: [0, 25, -20, 0], scale: [1, 0.95, 1.08, 1] },
  { x: [0, 20, -15, 0], y: [0, -15, 10, 0], scale: [1, 1.05, 0.98, 1] },
];

export default function AuroraGlow({ className = "", variant = "default" }: AuroraGlowProps) {
  const blobs = PRESETS[variant] || PRESETS.default;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            maxWidth: blob.maxSize,
            maxHeight: blob.maxSize,
            background: `radial-gradient(circle, rgba(${blob.color},${blob.opacity}) 0%, rgba(${blob.color},0) 70%)`,
            filter: `blur(${blob.blur}px)`,
            ...blob.position,
          }}
          animate={MOTIONS[i % MOTIONS.length]}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
