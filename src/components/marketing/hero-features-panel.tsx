import { motion } from "framer-motion";

interface BenefitCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const benefits: BenefitCard[] = [
  {
    id: "since-2015",
    title: "Since 2015",
    subtitle: "Trusted travel expertise",
    image: "/benefits/since-2015.png",
  },
  {
    id: "best-price",
    title: "Best Price Guarantee",
    subtitle: "Smart value deals",
    image: "/benefits/best-price.png",
  },
  {
    id: "assistance",
    title: "24/7 Support",
    subtitle: "Help whenever needed",
    image: "/benefits/support.png",
  },
  {
    id: "payment",
    title: "Flexible Payment",
    subtitle: "Easy booking options",
    image: "/benefits/payment.png",
  },
  {
    id: "advisor",
    title: "Expert Guidance",
    subtitle: "Guidance at every step",
    image: "/benefits/expert-guidance.png",
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
    <div className="relative w-full max-w-[285px] sm:max-w-[305px] lg:ml-auto">
      <motion.div
        className="grid gap-3 sm:gap-3.5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map(({ id, title, subtitle, image }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            className="flex items-center gap-3.5 rounded-2xl border border-white/35 bg-white/24 px-3.5 py-2.5 shadow-[0_16px_36px_-24px_rgba(16,33,58,0.4)] backdrop-blur-lg transition-all duration-300 hover:bg-white/34 sm:py-3"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_10px_22px_-8px_rgba(0,0,0,0.5)] ring-2 ring-white/50"
              aria-hidden="true"
            >
              <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-snug tracking-[-0.02em] text-white">
                {title}
              </h3>
              <p className="mt-0.5 text-xs leading-snug text-white/85">{subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
