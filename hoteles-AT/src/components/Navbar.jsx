import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarDays } from "lucide-react";
import { hotel } from "../data/mockData";

const links = [
  { href: "#suites", label: "Suites" },
  { href: "#galeria", label: "Galería" },
  { href: "#servicios", label: "Servicios" },
  { href: "#testimonios", label: "Voces" }
];

export default function Navbar({ onMisReservas }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-arena-200/15 bg-esmeralda-950/90 py-3 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="section-pad mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-2xl text-arena-100 transition-colors group-hover:text-dorado sm:text-[26px]">
            {hotel.name}
          </span>
          <span className="text-[9px] uppercase tracking-label text-dorado">
            {hotel.subtitle}
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[12px] uppercase tracking-[0.22em] text-arena-200/85 transition-colors hover:text-dorado"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onMisReservas}
              className="text-[12px] uppercase tracking-[0.22em] text-arena-200/85 transition-colors hover:text-dorado"
            >
              Mis reservas
            </button>
          </li>
          <li>
            <a
              href="#suites"
              className="border border-dorado/70 px-6 py-2.5 text-[12px] uppercase tracking-[0.22em] text-dorado transition-all duration-300 hover:bg-dorado hover:text-esmeralda-950"
            >
              Reservar
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-arena-100 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-arena-200/10 bg-esmeralda-950/95 backdrop-blur-md lg:hidden"
          >
            <ul className="section-pad flex flex-col gap-1 py-6">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[13px] uppercase tracking-[0.22em] text-arena-200/85 transition-colors hover:text-dorado"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onMisReservas();
                  }}
                  className="flex w-full items-center gap-3 py-3 text-left text-[13px] uppercase tracking-[0.22em] text-arena-200/85 transition-colors hover:text-dorado"
                >
                  <CalendarDays className="h-4 w-4 text-dorado" aria-hidden="true" />
                  Mis reservas
                </button>
              </li>
              <li className="mt-3">
                <a
                  href="#suites"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center bg-dorado px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-esmeralda-950"
                >
                  Reservar
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
