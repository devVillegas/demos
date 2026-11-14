import { motion } from 'framer-motion';
import { Clock, Tag, CalendarCheck } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import { SERVICES } from '../data/mockData.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services({ onReserve }) {
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="overline-label mb-4">Nuestra carta de belleza</p>
          <h2 className="display-italic text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Servicios con sello de casa
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="fine-line mx-auto mt-8 max-w-md origin-center"
          />
          <p className="mx-auto mt-6 max-w-2xl font-body font-light leading-relaxed text-ink-soft">
            Cada servicio incluye diagnóstico personalizado y cierre con acabado de lujo. Precios
            claros, sin sorpresas, en dólares.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              variants={item}
              className={`group relative flex flex-col overflow-hidden border border-ink/10 bg-cream-soft shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-powder/40 hover:shadow-editorial ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative h-52 overflow-hidden sm:h-60">
                <SmartImage
                  src={service.image}
                  alt={service.name}
                  gradient={service.gradient}
                  seed={index}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cream-soft via-transparent to-transparent" />
                <span className="absolute left-5 top-5 bg-cream/85 px-3 py-1.5 font-body text-[10px] font-medium uppercase tracking-widest2 text-ink backdrop-blur-sm">
                  {service.tagline}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <h3 className="display-italic text-3xl leading-snug text-ink">{service.name}</h3>
                <p className="mt-3 flex-1 font-body text-sm font-light leading-relaxed text-ink-soft">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center gap-5 border-t border-ink/10 pt-5">
                  <span className="flex items-center gap-2 font-body text-[12px] text-ink-soft">
                    <Clock size={14} strokeWidth={1.5} className="text-powder" />
                    {service.durationMin} min
                  </span>
                  <span className="flex items-center gap-2 font-body text-[12px] text-ink-soft">
                    <Tag size={14} strokeWidth={1.5} className="text-gold" />
                    ${service.priceUsd} USD
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onReserve(service.id)}
                  className="mt-6 inline-flex items-center gap-2 self-start font-body text-[12px] font-medium uppercase tracking-widest2 text-powder transition-all duration-300 hover:gap-3 hover:text-powder-dark"
                >
                  <CalendarCheck size={15} strokeWidth={1.5} />
                  Reservar este servicio
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
