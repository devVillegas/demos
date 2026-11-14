import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu as MenuIcon, X, Wine } from "lucide-react";

const LINKS = [
  { href: "#carta", texto: "La carta" },
  { href: "#chef", texto: "El chef" },
  { href: "#reservar", texto: "Reservar mesa" },
  { href: "#visitanos", texto: "Visítanos" },
];

export default function Navbar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-wine text-cream group-hover:bg-gold transition-colors duration-300">
            <Wine size={18} strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl md:text-2xl font-semibold tracking-tight text-cream">
            Bruma
            <span className="block text-[10px] md:text-[11px] font-body font-medium uppercase tracking-[0.28em] text-gold -mt-0.5">
              Cocina de autor
            </span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide"
            >
              {link.texto}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={onOpenCart}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className="relative grid place-items-center w-11 h-11 rounded-full bg-wine text-cream hover:bg-gold hover:text-ink transition-colors duration-300 shadow-dish"
            aria-label="Abrir pedido"
          >
            <ShoppingBag size={19} strokeWidth={2.2} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gold text-ink text-[11px] font-bold grid place-items-center ring-2 ring-ink/80"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden grid place-items-center w-11 h-11 rounded-full bg-ink/40 text-cream backdrop-blur"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-ink/98 backdrop-blur-lg border-t border-cream/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3 rounded-lg text-cream/90 font-medium hover:bg-wine/40 hover:text-gold transition-colors"
                >
                  {link.texto}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
