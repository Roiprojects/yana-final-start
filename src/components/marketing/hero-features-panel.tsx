import { motion } from "framer-motion";

interface BenefitCard {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
}

const benefits: BenefitCard[] = [
  {
    id: "since-2015",
    title: "Since 2015",
    subtitle: "Trusted travel expertise",
    imageSrc: "/benefits/since-2015.png",
  },
  {
    id: "best-price",
    title: "Best Price Guarantee",
    subtitle: "Smart value deals",
    imageSrc: "/benefits/best-price.png",
  },
  {
    id: "assistance",
    title: "24/7 Support",
    subtitle: "Help whenever needed",
    imageSrc: "/benefits/support.png",
  },
  {
    id: "payment",
    title: "Flexible Payment",
    subtitle: "Easy booking options",
    imageSrc: "/benefits/payment.png",
  },
  {
    id: "advisor",
    title: "Expert Guidance",
    subtitle: "Guidance at every step",
    imageSrc: "/benefits/expert-guidance.png",
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
      <div className="grid gap-2.5">
        <motion.div
          className="grid gap-2.5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {benefits.map(({ id, title, subtitle, imageSrc }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="flex items-center gap-3.5 rounded-2xl border border-white/35 bg-white/24 px-4 py-4 shadow-[0_16px_36px_-24px_rgba(16,33,58,0.4)] backdrop-blur-lg transition-all duration-300 hover:bg-white/34"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] bg-white/95 shadow-[0_16px_28px_-18px_rgba(52,87,202,0.95)] ring-1 ring-white/40">
                <img
                  src={imageSrc}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold leading-5 tracking-[-0.02em] text-white sm:text-lg">
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
