import { motion } from 'framer-motion'
import { TESTIMONIALS, CASE_LOGOS, CASE_STUDY_IMAGE } from '../data/mockData.js'
import SmartImage from './SmartImage.jsx'
import Icon from './Icon.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

export default function Testimonials() {
  return (
    <section id="casos" className="relative scroll-mt-24 bg-night-850 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
      />
      <div className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-bright">
            Casos de éxito
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ice sm:text-4xl">
            Resultados que se pueden <span className="text-gradient">auditar</span>.
          </h2>
          <p className="mt-4 text-muted">
            Cada proyecto cierra con un informe de impacto. Estas son palabras de quienes lo
            vivieron.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.figure
              key={testimonial.id}
              variants={cardItem}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group flex flex-col rounded-2xl border border-white/10 bg-night-900/70 p-7 shadow-card backdrop-blur transition-colors duration-300 hover:border-electric-soft/50"
            >
              <Icon
                name="Quote"
                size={26}
                className="text-electric-bright/70 transition-transform duration-300 group-hover:scale-110"
              />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ice/90">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <SmartImage
                  src={testimonial.unsplash}
                  alt={`Retrato de ${testimonial.name}`}
                  className="h-11 w-11 rounded-full border border-white/15 object-cover"
                  fallbackClassName="h-11 w-11 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-ice">{testimonial.name}</p>
                  <p className="text-xs text-muted">{testimonial.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-night-900/80 shadow-card lg:grid-cols-2"
        >
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-bright">
              Historial destacado
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-ice">
              Meridiana Retail: desabasto −21% con IA aplicada
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              En 14 semanas construimos un data warehouse unificado y un modelo de forecasting que
              hoy predice la demanda de 1,240 sucursales. La operación pasó de reaccionar a
              anticipar.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { value: '−21%', label: 'Desabasto' },
                { value: '14', label: 'Semanas' },
                { value: '1,240', label: 'Sucursales' }
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl bg-white/5 p-4 text-center">
                  <p className="font-display text-xl font-bold text-gradient">{metric.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-full min-h-[280px]">
            <SmartImage
              src={CASE_STUDY_IMAGE}
              alt="Tablero de analítica con indicadores de demanda"
              className="h-full w-full object-cover"
              fallbackClassName="h-full min-h-[280px] w-full"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-night-900/70 to-transparent"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-14"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Equipos que confían en nosotros
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CASE_LOGOS.map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] px-3 py-4 text-center text-xs font-semibold text-muted transition-all duration-300 hover:border-electric-soft/40 hover:text-ice"
              >
                {logo}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
