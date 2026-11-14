import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import { HERO_IMAGE, STUDIO_INFO } from '../data/mockData.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const goToAgenda = () => {
    const el = document.querySelector('#agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        <SmartImage
          src={HERO_IMAGE}
          alt="Interior cálido del estudio de belleza Casa Serena"
          gradient="from-powder-soft/70 via-gold-soft/40 to-cream-deep"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/60 to-cream/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/70 via-transparent to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-editorial relative z-10 pb-24 pt-40 sm:pb-28"
      >
        <motion.p variants={item} className="overline-label mb-6 flex items-center gap-3">
          <Sparkles size={14} strokeWidth={1.5} className="text-gold" />
          Caracas · Desde 2012
        </motion.p>

        <motion.h1
          variants={item}
          className="display-italic max-w-4xl text-balance text-5xl leading-[1.05] text-ink sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Belleza que <span className="gold-underline">se escucha</span>, estilo que se recuerda
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl font-body text-base font-light leading-relaxed text-ink-soft sm:text-lg"
        >
          {STUDIO_INFO.name} es un estudio íntimo donde el corte, el color y el cuidado del cabello
          se convierten en un ritual de lujo. Reserva tu cita en menos de dos minutos.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-5">
          <button type="button" onClick={goToAgenda} className="btn-solid">
            Reservar cita
            <ArrowDown size={15} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('#servicios');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="font-body text-[12px] font-medium uppercase tracking-widest2 text-ink underline decoration-gold/60 underline-offset-8 transition-colors hover:text-powder"
          >
            Ver servicios
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-ink/10 pt-6"
        >
          {['Estilistas de élite', 'Productos de primera línea', 'Agenda sin fricción'].map(
            (label) => (
              <span
                key={label}
                className="flex items-center gap-2 font-body text-[12px] uppercase tracking-widest2 text-ink-soft"
              >
                <span className="h-1 w-1 rounded-full bg-gold" />
                {label}
              </span>
            )
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
