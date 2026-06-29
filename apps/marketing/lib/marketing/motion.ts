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
