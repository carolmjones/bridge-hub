"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type PetalConfig = {
  id: string;
  top: string;
  left: string;
  size: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  x: number[];
  y: number[];
  rotate: number[];
  scale: number[];
};

export const PETALS: readonly PetalConfig[] = [
  {
    id: "p1",
    top: "10%",
    left: "6%",
    size: 36,
    blur: 1,
    opacity: 0.62,
    duration: 14,
    delay: 0.2,
    x: [0, 18, -10, 12, 0],
    y: [-20, 80, 160, 250, 280],
    rotate: [0, 35, 110, 190, 280],
    scale: [0.92, 1.04, 0.97, 1, 0.92],
  },
  {
    id: "p2",
    top: "16%",
    left: "88%",
    size: 52,
    blur: 2,
    opacity: 0.52,
    duration: 18,
    delay: 1.1,
    x: [0, -14, 12, -10, 0],
    y: [-40, 60, 140, 230, 265],
    rotate: [20, 70, 160, 235, 320],
    scale: [0.96, 1.02, 0.98, 1.01, 0.96],
  },
  {
    id: "p3",
    top: "38%",
    left: "3.5%",
    size: 22,
    blur: 0,
    opacity: 0.55,
    duration: 11,
    delay: 0.6,
    x: [0, 12, -8, 10, 0],
    y: [-10, 90, 170, 255, 290],
    rotate: [0, 40, 120, 200, 290],
    scale: [0.92, 1.06, 0.98, 1.02, 0.92],
  },
  {
    id: "p4",
    top: "42%",
    left: "92%",
    size: 28,
    blur: 3,
    opacity: 0.38,
    duration: 16,
    delay: 2.3,
    x: [0, -10, 14, -12, 0],
    y: [-28, 70, 150, 235, 268],
    rotate: [15, 65, 140, 220, 300],
    scale: [0.95, 1.03, 0.97, 1.01, 0.95],
  },
  {
    id: "p5",
    top: "70%",
    left: "10%",
    size: 44,
    blur: 1,
    opacity: 0.78,
    duration: 12,
    delay: 1.7,
    x: [0, 10, -14, 8, 0],
    y: [-18, 60, 140, 220, 260],
    rotate: [0, 55, 130, 210, 280],
    scale: [0.9, 1.03, 0.96, 1.01, 0.9],
  },
  {
    id: "p6",
    top: "74%",
    left: "86%",
    size: 18,
    blur: 2,
    opacity: 0.46,
    duration: 9,
    delay: 0.9,
    x: [0, -12, 8, -10, 0],
    y: [-16, 85, 170, 250, 285],
    rotate: [0, 45, 115, 190, 275],
    scale: [0.94, 1.05, 0.98, 1.01, 0.94],
  },
] as const;

const REDUCED_MOTION_PETALS = [PETALS[0], PETALS[4]] as const;

function Petal({
  petal,
  static: isStatic = false,
}: {
  petal: PetalConfig;
  static?: boolean;
}) {
  if (isStatic) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute will-change-transform"
        style={{
          top: petal.top,
          left: petal.left,
          width: petal.size,
          height: petal.size,
          opacity: petal.opacity * 0.45,
        }}
      >
        <PetalImage petal={petal} />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute will-change-transform"
      style={{
        top: petal.top,
        left: petal.left,
        width: petal.size,
        height: petal.size,
      }}
      initial={{
        x: petal.x[0],
        y: petal.y[0],
        rotate: petal.rotate[0],
        scale: petal.scale[0],
        opacity: petal.opacity,
      }}
      animate={{
        x: petal.x,
        y: petal.y,
        rotate: petal.rotate,
        scale: petal.scale,
        opacity: [0, petal.opacity, petal.opacity, petal.opacity * 0.25, 0],
      }}
      transition={{
        duration: petal.duration,
        delay: petal.delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      <PetalImage petal={petal} />
    </motion.div>
  );
}

function PetalImage({ petal }: { petal: PetalConfig }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        filter: `blur(${petal.blur}px) drop-shadow(0 18px 28px rgba(0,0,0,0.35)) drop-shadow(0 0 12px rgba(232,196,140,0.18))`,
      }}
    >
      <Image
        src="/images/golden-petal.png"
        alt=""
        fill
        unoptimized
        sizes={`${petal.size}px`}
        className="object-contain"
      />
    </div>
  );
}

export function FloatingPetals() {
  const reduceMotion = useReducedMotion();
  const petals = reduceMotion ? REDUCED_MOTION_PETALS : PETALS;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
    >
      {petals.map((petal) => (
        <Petal key={petal.id} petal={petal} static={Boolean(reduceMotion)} />
      ))}
    </div>
  );
}
