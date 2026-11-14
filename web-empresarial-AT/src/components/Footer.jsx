import { motion } from 'framer-motion'
import { COMPANY } from '../data/mockData.js'
import Icon from './Icon.jsx'

const FOOTER_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#cotizador', label: 'Cotizador' },
  { href: '#casos', label: 'Casos de éxito' },
  { href: '#contacto', label: 'Contacto' }
]

const SERVICE_LINKS = [
  'Consultoría estratégica',
  'Desarrollo web & móvil',
  'Cloud & DevOps',
  'Data & IA',
  'Ciberseguridad',
  'Soporte gestionado'
]

export default function Footer({ onReset }) {
  return (
    <footer className="relative border-t border-white/10 bg-night-950">
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2 rounded-full bg-electric/20 blur-[120px]"
        />
        <div className="section-shell relative py-16 text-center md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-ice sm:text-4xl">
              ¿Listo para convertir tu siguiente gran idea en{' '}
              <span className="text-gradient">un sistema que funcione</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Agenda el diagnóstico gratuito de 30 minutos. Saldrás con un plan claro, tengas o no
              tienes nada más que una pregunta.
            </p>
            <a
              href="#contacto"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-8 py-4 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-cyan"
            >
              Agendar diagnóstico gratuito
              <Icon
                name="ArrowRight"
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </section>

      <div className="section-shell grid gap-10 border-t border-white/5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-white">
              N
            </span>
            <span className="font-display text-lg font-semibold text-ice">
              Nexora<span className="text-gradient"> Consulting</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {COMPANY.tagline}. Consultoría y ejecución tecnológica para empresas que no pueden
            permitirse proyectos eternos.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Explora</h4>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ice/80 transition-colors hover:text-electric-bright"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Servicios</h4>
          <ul className="mt-4 space-y-2.5">
            {SERVICE_LINKS.map((service) => (
              <li key={service} className="text-sm text-muted">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contacto</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>{COMPANY.email}</li>
            <li>{COMPANY.phone}</li>
            <li>{COMPANY.address}</li>
          </ul>
          <button
            type="button"
            onClick={onReset}
            className="mt-5 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-muted transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
          >
            Resetear datos de demo
          </button>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="section-shell flex flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {COMPANY.name}. Todos los derechos reservados.</p>
          <p>
            Sitio de demostración — datos ficticios ·{' '}
            <span className="text-electric-bright">Asisnet Web Demos</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
