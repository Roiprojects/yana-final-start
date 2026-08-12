import { motion } from "framer-motion";
import {
  Tag,
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
    subtitle: "Unbeatable deals",
    icon: Tag,
  },
  {
    id: "assistance",
    title: "24/7 Travel Assistance",
    subtitle: "Help anytime, anywhere",
    icon: ShieldCheck,
  },
  {
    id: "payment",
    title: "Flexible Payment",
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
      <div className="grid gap-3">
        <motion.div
          className="grid gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {benefits.map(({ id, title, subtitle, icon: Icon }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="flex items-center gap-4 rounded-2xl border border-white/40 bg-white/30 p-5 shadow-[0_16px_36px_-24px_rgba(16,33,58,0.4)] backdrop-blur-lg transition-all duration-300 hover:bg-white/40"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/30 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold leading-6 tracking-[-0.02em] text-white">
                  {title}
                </h3>
                <p className="text-sm leading-5 text-white/80">{subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
