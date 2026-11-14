import { motion } from 'framer-motion'
import { SERVICES } from '../data/mockData.js'
import Icon from './Icon.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
}

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
}

export default function Services() {
  return (
    <section id="servicios" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-bright">
            Qué hacemos
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ice sm:text-4xl">
            Seis capacidades, <span className="text-gradient">un solo equipo</span> responsable.
          </h2>
          <p className="mt-4 text-muted">
            Cada servicio se entrega con un lead senior dedicado, entregables documentados y métricas
            acordadas desde el día uno.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.id}
              variants={card}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-card backdrop-blur transition-colors duration-300 hover:border-electric-soft/50"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient-soft text-electric-bright ring-1 ring-electric-soft/40 transition-transform duration-300 group-hover:scale-110">
                <Icon name={service.icon} size={24} />
              </span>

              <h3 className="mt-5 font-display text-lg font-semibold text-ice">{service.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.blurb}</p>

              <ul className="mt-4 space-y-1.5">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-xs text-muted">
                    <Icon
                      name="CheckCircle2"
                      size={14}
                      className="mt-0.5 shrink-0 text-electric-bright"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <p className="text-sm text-muted">
                  desde{' '}
                  <span className="font-display text-base font-semibold text-ice">
                    ${service.from.toLocaleString('es-MX')} USD
                  </span>
                </p>
                <a
                  href="#cotizador"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-electric-bright transition-all duration-300 hover:gap-2"
                >
                  Cotizar
                  <Icon name="ArrowRight" size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
