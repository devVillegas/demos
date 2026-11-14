import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, RotateCcw, Scissors, ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer({ onReset }) {
  const goToAgenda = () => {
    const el = document.querySelector('#agenda');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer id="contacto" className="relative bg-ink text-cream">
      <section className="border-b border-cream/10 py-24 sm:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="container-editorial text-center"
        >
          <motion.p variants={item} className="overline-label !text-gold-soft mb-6">
            Tu silla te espera
          </motion.p>
          <motion.h2
            variants={item}
            className="display-italic mx-auto max-w-3xl text-balance text-4xl leading-tight sm:text-6xl"
          >
            Reserva hoy y déjate cuidar por {STUDIO_INFO.name}
          </motion.h2>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={goToAgenda}
              className="group inline-flex items-center gap-2 bg-cream px-8 py-3.5 font-body text-[12px] font-medium uppercase tracking-widest2 text-ink transition-all duration-300 hover:bg-powder hover:text-cream"
            >
              Reservar cita
              <ArrowUpRight
                size={15}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 border border-cream/30 px-8 py-3.5 font-body text-[12px] font-medium uppercase tracking-widest2 text-cream transition-all duration-300 hover:border-gold-soft hover:text-gold-soft"
            >
              <Phone size={15} strokeWidth={1.5} />
              {STUDIO_INFO.phone}
            </a>
          </motion.div>
        </motion.div>
      </section>

      <div className="container-editorial grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center border border-gold/50 text-gold-soft">
              <Scissors size={18} strokeWidth={1.5} />
            </span>
            <span className="leading-tight">
              <span className="display-italic block text-2xl">{STUDIO_INFO.name}</span>
              <span className="block font-body text-[10px] uppercase tracking-widest2 text-cream/60">
                {STUDIO_INFO.claim}
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-xs font-body text-sm font-light leading-relaxed text-cream/70">
            Un estudio íntimo de belleza y barbería en el corazón de Caracas, donde cada cita es un
            ritual de lujo.
          </p>
        </div>

        <div>
          <p className="overline-label !text-gold-soft mb-5">Horarios</p>
          <ul className="space-y-3 font-body text-sm font-light text-cream/80">
            <li className="flex items-start gap-3">
              <Clock size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-powder-soft" />
              <span>{STUDIO_INFO.hoursLabel}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-powder-soft" />
              <span className="italic">{STUDIO_INFO.closedLabel}</span>
            </li>
            <li className="pt-2 text-cream/60">
              Última cita del día: entrada a las 18:00 para cerrar la jornada a las 19:00 con
              calma.
            </li>
          </ul>
        </div>

        <div>
          <p className="overline-label !text-gold-soft mb-5">Encuéntranos</p>
          <ul className="space-y-3 font-body text-sm font-light text-cream/80">
            <li className="flex items-start gap-3">
              <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-powder-soft" />
              <span>{STUDIO_INFO.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-powder-soft" />
              <a href={`tel:${STUDIO_INFO.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-gold-soft">
                {STUDIO_INFO.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={15} strokeWidth={1.5} className="mt-0.5 shrink-0 text-powder-soft" />
              <a href={`mailto:${STUDIO_INFO.email}`} className="transition-colors hover:text-gold-soft">
                {STUDIO_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="overline-label !text-gold-soft mb-5">Demo Asisnet</p>
          <p className="font-body text-sm font-light leading-relaxed text-cream/70">
            Esta es una demostración interactiva sin backend. Tus reservas se guardan únicamente en
            este navegador.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-6 inline-flex items-center gap-2 border border-cream/20 px-4 py-2 font-body text-[10px] font-medium uppercase tracking-widest2 text-cream/60 transition-all duration-300 hover:border-powder-soft hover:text-powder-soft"
            aria-label="Resetear los datos guardados de la demo"
          >
            <RotateCcw size={13} strokeWidth={1.5} />
            Resetear datos de demo
          </button>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-body text-[11px] uppercase tracking-widest2 text-cream/50">
            © {new Date().getFullYear()} {STUDIO_INFO.name} · {STUDIO_INFO.claim} · Caracas
          </p>
          <p className="font-body text-[11px] uppercase tracking-widest2 text-cream/50">
            Demo web · Asisnet
          </p>
        </div>
      </div>
    </footer>
  );
}
