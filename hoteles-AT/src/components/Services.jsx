import { motion } from "framer-motion";
import { Sparkles, UtensilsCrossed, Waves, Sailboat, ArrowUpRight } from "lucide-react";
import { services } from "../data/mockData";
import SmartImage from "./SmartImage";

const serviceIcons = {
  spa: Sparkles,
  restaurante: UtensilsCrossed,
  piscina: Waves,
  traslado: Sailboat
};

export default function Services() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="servicios" className="section-pad bg-arena-50 py-24 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={item} className="mb-14 flex flex-col items-start gap-4">
          <p className="label-caps-dark">Servicios de la casa</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light text-esmeralda-900 sm:text-6xl">
              Todo a mano, nada en exceso
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed text-tinta/70">
              Un equipo pequeño que conoce tu nombre para el segundo día.
            </p>
          </div>
          <span className="divider-line" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.id] ?? Sparkles;
            return (
              <motion.article
                key={s.id}
                variants={item}
                className="group flex flex-col border border-esmeralda-900/10 bg-white shadow-card transition-shadow duration-500 hover:shadow-float"
              >
                <div className="relative">
                  <SmartImage
                    src={s.image}
                    alt={s.name}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute -bottom-5 left-5 flex h-11 w-11 items-center justify-center border border-dorado/40 bg-esmeralda-950 text-dorado">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-9">
                  <h3 className="font-display text-[22px] text-esmeralda-900">{s.name}</h3>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-tinta/65">
                    {s.description}
                  </p>
                  <a
                    href="#suites"
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-dorado-dark transition-colors hover:text-esmeralda-900"
                  >
                    Reservar estadía
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
