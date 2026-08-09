"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Scroll-reveal wrapper (Framer Motion). Rises + fades in when it enters view.
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
