import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scissors } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData.js';

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Mis reservas', href: '#reservas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 shadow-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-editorial flex items-center justify-between py-4">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-3 text-left"
          aria-label="Ir al inicio de Casa Serena"
        >
          <span className="flex h-10 w-10 items-center justify-center border border-powder/50 text-powder transition-colors duration-300 group-hover:bg-powder group-hover:text-cream">
            <Scissors size={18} strokeWidth={1.5} />
          </span>
          <span className="leading-tight">
            <span className="display-italic block text-xl text-ink">{STUDIO_INFO.name}</span>
            <span className="overline-label block !text-[9px]">{STUDIO_INFO.claim}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => goTo(link.href)}
              className="font-body text-[12px] font-medium uppercase tracking-widest2 text-ink-soft transition-colors duration-300 hover:text-powder"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo('#agenda')}
            className="btn-outline !px-5 !py-2 !text-[11px]"
          >
            Reservar
          </button>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-powder hover:text-powder lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink/10 bg-cream/95 backdrop-blur-md lg:hidden"
          >
            <nav className="container-editorial flex flex-col gap-1 py-6" aria-label="Menú móvil">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  onClick={() => goTo(link.href)}
                  className="border-b border-ink/5 py-3 text-left font-display text-2xl italic text-ink transition-colors hover:text-powder"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => goTo('#agenda')}
                className="btn-solid mt-4"
              >
                Reservar cita
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
