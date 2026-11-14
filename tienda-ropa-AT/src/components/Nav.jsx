import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'

const links = [
  { label: 'Tienda', href: '#tienda' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Manifiesto', href: '#manifiesto' },
]

export default function Nav({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-all duration-300 ${
        scrolled ? 'border-line bg-bone/90 backdrop-blur-md' : 'border-transparent bg-bone'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="font-display text-lg font-bold tracking-tight sm:text-xl">
          ATELIER <span className="text-ember">23</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[13px] font-medium uppercase tracking-widest2 text-ink/70 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrito de compras"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white transition-all hover:border-ink hover:bg-ink hover:text-bone"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            <AnimatePresence mode="popLayout">
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0, y: -4 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ember px-1 text-[10px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white md:hidden"
          >
            {menuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden border-t border-line bg-bone md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold last:border-b-0"
                  >
                    {l.label}
                    <span className="text-ember">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
