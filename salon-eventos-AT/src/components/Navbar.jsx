import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Gem } from "lucide-react"

const links = [
  { href: "#salones", label: "Salones" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#reserva", label: "Reserva" },
  { href: "#galeria", label: "Galería" },
  { href: "#testimonios", label: "Testimonios" },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/15 bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#inicio" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold-gradient-soft text-gold transition-all group-hover:shadow-gold">
            <Gem size={18} strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold tracking-widest text-champagne">
              SALÓN <span className="text-gold-gradient">DORADO</span>
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.4em] text-neutral-500">Events · Caracas</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-neutral-300 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <motion.a
            href="#reserva"
            whileHover={{ y: -2, boxShadow: "0 0 30px -6px rgba(212,175,55,0.6)" }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gold-gradient px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink"
          >
            Solicitar reserva
          </motion.a>
        </div>

        <button
          onClick={() => setAbierto((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 text-gold lg:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
        >
          {abierto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-gold/15 bg-ink/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setAbierto(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-200 transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#reserva"
                onClick={() => setAbierto(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * links.length }}
                className="mt-2 rounded-full bg-gold-gradient px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Solicitar reserva
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
