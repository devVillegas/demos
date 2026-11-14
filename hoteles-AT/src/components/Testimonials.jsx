import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../data/mockData";

export default function Testimonials() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="testimonios" className="section-pad bg-esmeralda-900 py-24 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={item} className="mb-14 flex flex-col items-center text-center">
          <p className="label-caps">Voces de la casa</p>
          <h2 className="mt-3 font-display text-4xl font-light text-arena-50 sm:text-5xl">
            Lo que se llevan los que se van
          </h2>
          <span className="divider-line mt-6" />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              variants={item}
              className="flex flex-col border border-arena-200/10 bg-esmeralda-950/40 p-7"
            >
              <Quote className="h-7 w-7 text-dorado/70" strokeWidth={1.2} aria-hidden="true" />
              <blockquote className="mt-4 flex-1 font-display text-[19px] italic leading-relaxed text-arena-100/90">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 border-t border-arena-200/10 pt-4">
                <p className="text-[13px] font-medium text-arena-100">{t.name}</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-arena-300/60">
                  {t.origin}
                </p>
                <p className="mt-1 text-[11px] text-dorado/80">{t.stay}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
