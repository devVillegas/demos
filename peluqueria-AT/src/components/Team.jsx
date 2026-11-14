import { motion } from 'framer-motion';
import { Award, Check } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import { STYLISTS } from '../data/mockData.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Team({ selectedStylistId, onSelect }) {
  return (
    <section id="equipo" className="relative bg-cream-deep/60 py-24 sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="overline-label mb-4">Manos que transforman</p>
          <h2 className="display-italic text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Elige a tu estilista
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="fine-line mx-auto mt-8 max-w-md origin-center"
          />
          <p className="mx-auto mt-6 max-w-2xl font-body font-light leading-relaxed text-ink-soft">
            Un equipo pequeño y refinado a propósito: aquí nadie es un número. Toca una tarjeta para
            seleccionar a tu estilista y verás la elección reflejada en la agenda.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STYLISTS.map((stylist, index) => {
            const selected = selectedStylistId === stylist.id;
            return (
              <motion.button
                key={stylist.id}
                type="button"
                variants={item}
                onClick={() => onSelect(selected ? null : stylist.id)}
                aria-pressed={selected}
                className={`group relative flex flex-col overflow-hidden border bg-cream-soft text-left shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-editorial ${
                  selected ? 'border-powder shadow-editorial' : 'border-ink/10'
                }`}
              >
                <div className="relative h-72 overflow-hidden">
                  <SmartImage
                    src={stylist.image}
                    alt={`${stylist.name}, ${stylist.specialty}`}
                    gradient={stylist.gradient}
                    seed={index + 1}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream-soft via-transparent to-transparent" />
                  {selected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-powder text-cream shadow-card"
                    >
                      <Check size={17} strokeWidth={2.2} />
                    </motion.span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display-italic text-2xl text-ink">{stylist.name}</h3>
                  <p className="mt-1 font-body text-[11px] font-medium uppercase tracking-widest2 text-powder">
                    {stylist.specialty}
                  </p>
                  <p className="mt-4 flex-1 font-body text-[13px] font-light leading-relaxed text-ink-soft">
                    {stylist.bio}
                  </p>
                  <span className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-4 font-body text-[12px] text-ink-soft">
                    <Award size={14} strokeWidth={1.5} className="text-gold" />
                    {stylist.yearsExperience} años de experiencia
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
