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
    <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
      <motion.div
        className="grid gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map(({ id, title, subtitle, image }) => (
          <motion.div
            key={id}
            variants={cardVariants}
            className="flex items-center gap-3 rounded-2xl border border-white/35 bg-white/24 px-3.5 py-3 shadow-[0_16px_36px_-24px_rgba(16,33,58,0.4)] backdrop-blur-lg transition-all duration-300 hover:bg-white/34"
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_16px_28px_-18px_rgba(52,87,202,0.95)] ring-1 ring-white/40"
              aria-hidden="true"
            >
              <img src={image} alt="" className="h-9 w-9 object-contain" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-4 tracking-[-0.02em] text-white sm:text-base">
                {title}
              </h3>
              <p className="text-xs leading-4 text-white/80">{subtitle}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
