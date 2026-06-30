"use client";

import type { Transition, Variants } from "framer-motion";

/** Locked easing — no bounce/spring. */
export const easeOut: Transition["ease"] = [0.22, 0.61, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const buttonHover = {
  y: -2,
  transition: { duration: 0.2, ease: easeOut },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: easeOut, delay: 0.15 },
  },
};

export const glassCardIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOut, delay },
  }),
};

export const subtleFloat = {
  y: [0, -7, 0],
  transition: {
    duration: 7,
    ease: easeOut,
    repeat: Infinity,
  },
};
