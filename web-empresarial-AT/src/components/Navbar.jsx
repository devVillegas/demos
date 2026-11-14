import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#cotizador', label: 'Cotizador' },
  { href: '#casos', label: 'Casos de éxito' },
  { href: '#contacto', label: 'Contacto' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-night-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            N
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ice">
            Nexora<span className="text-gradient"> Consulting</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors duration-200 hover:text-ice"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cotizador"
            className="rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-cyan"
          >
            Cotizar proyecto
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ice transition hover:bg-white/10 md:hidden"
        >
          {open ? <Icon name="X" size={20} /> : <Icon name="Menu" size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-white/10 bg-night-900/95 backdrop-blur-xl md:hidden"
          >
            <div className="section-shell flex flex-col gap-1 py-4">
              {LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.2 }}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-ice"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#cotizador"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-brand-gradient px-4 py-3 text-center text-sm font-semibold text-white shadow-glow"
              >
                Cotizar proyecto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
