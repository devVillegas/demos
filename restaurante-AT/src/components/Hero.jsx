import { motion } from "framer-motion";
import { ArrowDown, CalendarCheck, Flame } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=80";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-end md:items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
      <div className="absolute inset-0 texture-dark opacity-70" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 pb-24 md:pb-0 pt-32 w-full"
      >
        <motion.p
          variants={item}
          className="flex items-center gap-2 text-gold text-xs md:text-sm font-semibold uppercase tracking-[0.35em] mb-5"
        >
          <Flame size={14} className="animate-glow-pulse" />
          Caracas · Alta cocina venezolana
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-cream text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.02] tracking-tight max-w-4xl"
        >
          Sabores que nacen
          <br />
          <em className="italic font-light text-gold-light">del humo</em> y la
          <br />
          <span className="relative inline-block">
            montaña verde
            <svg
              className="absolute -bottom-2 left-0 w-full text-wine"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 9C60 3 120 2 180 6C220 9 260 8 298 5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-cream/75 text-base md:text-lg leading-relaxed"
        >
          Bruma es una mesa de autor donde el mercado de Coche se encuentra con
          la brasa de Samán. Cada carta cambia con la cosecha; cada plato
          cuenta de dónde viene.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#carta"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-wine text-cream font-semibold text-sm md:text-base hover:bg-gold hover:text-ink transition-all duration-300 shadow-dish hover:shadow-dish-hover hover:-translate-y-0.5"
          >
            <ArrowDown size={18} />
            Ver la carta
          </a>
          <a
            href="#reservar"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-cream/30 text-cream font-semibold text-sm md:text-base hover:border-gold hover:text-gold hover:bg-cream/5 transition-all duration-300 backdrop-blur-sm"
          >
            <CalendarCheck size={18} />
            Reservar mesa
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cream to-transparent z-[5]" />
    </section>
  );
}
