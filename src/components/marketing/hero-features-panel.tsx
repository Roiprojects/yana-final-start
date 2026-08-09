"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  ShieldCheck,
  CreditCard,
  UserCheck,
  LucideIcon,
} from "lucide-react";

interface BenefitCard {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

const benefits: BenefitCard[] = [
  {
    id: "best-price",
    title: "Best Price Guarantee",
    subtitle: "Unbeatable deals, no hidden costs",
    icon: Trophy,
  },
  {
    id: "assistance",
    title: "24/7 Travel Assistance",
    subtitle: "Help anytime, anywhere",
    icon: ShieldCheck,
  },
  {
    id: "payment",
    title: "Flexible Payment Options",
    subtitle: "Pay your way, hassle-free",
    icon: CreditCard,
  },
  {
    id: "advisor",
    title: "Expert Travel Advisor",
    subtitle: "Personal guidance, every step",
    icon: UserCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function HeroFeaturesPanel() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full bg-[#e4c46d]/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-6 h-40 w-40 rounded-full bg-[#dfe9f8]/70 blur-3xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/55 bg-white/18 p-3 shadow-[0_30px_70px_-34px_rgba(16,33,58,0.42)] backdrop-blur-xl sm:p-4">
        <motion.div
          className="grid gap-3 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {benefits.map(({ id, title, subtitle, icon: Icon }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[1.35rem] border border-[#f0d77d] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(255,249,225,0.96))] p-4 shadow-[0_20px_42px_-24px_rgba(16,33,58,0.42)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9ae39] hover:bg-white hover:shadow-[0_28px_54px_-24px_rgba(16,33,58,0.5)]"
            >
              <span className="absolute inset-x-5 top-0 h-1 rounded-b-full bg-[linear-gradient(90deg,#d7a92e,#f6d77f,#d7a92e)]" aria-hidden />
              <div className="flex h-12 w-12 items-center justify-center rounded-[0.9rem] bg-primary text-[#f8db78] shadow-[0_10px_22px_-12px_rgba(23,63,107,0.95)] ring-2 ring-[#f4d77b]/80">
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="mt-4 min-w-0">
                <h3 className="text-[0.95rem] font-bold leading-5 tracking-[-0.02em] text-deep sm:text-base">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-5 text-text-secondary">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
