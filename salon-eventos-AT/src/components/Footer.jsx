import { motion } from "framer-motion"
import { Gem, Phone, Mail, MapPin, Instagram, Clock3, ArrowRight } from "lucide-react"
import { Ornament } from "./Ornament"
import { venue } from "../data/mockData"

export default function Footer({ onReset }) {
  return (
    <footer className="relative border-t border-gold/20 bg-ink-800/60">
      {/* CTA final */}
      <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex flex-col items-center"
        >
          <h2 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-wide text-champagne sm:text-5xl">
            Tu noche de gloria <span className="text-gold-gradient">empieza con una fecha</span>
          </h2>
          <Ornament className="my-6" />
          <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Las fechas del {venue.stats.eventos > 0 ? "próximo trimestre" : "año"} se reservan con meses de
            anticipación. Solicita tu fecha hoy y asegura el salón que tu celebración merece.
          </p>
          <motion.a
            href="#reserva"
            whileHover={{ y: -3, boxShadow: "0 0 40px -8px rgba(212,175,55,0.7)" }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-ink"
          >
            Solicitar mi fecha
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </section>

      {/* Pie */}
      <div className="ornament-line mx-8" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 bg-gold-gradient-soft text-gold">
              <Gem size={18} strokeWidth={1.5} />
            </span>
            <span className="font-display text-lg font-bold tracking-widest text-champagne">
              SALÓN <span className="text-gold-gradient">DORADO</span>
            </span>
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-500">
            {venue.nombre} · {venue.lema}. Bodas, eventos corporativos y celebraciones privadas en {venue.ciudad}.
            Demo interactiva creada por Asisnet.
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs text-gold">
            <Instagram size={14} /> {venue.instagram}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-xs text-neutral-400">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Contacto</p>
          <p className="flex items-center gap-2.5">
            <Phone size={13} className="text-gold" /> {venue.telefono} · WhatsApp {venue.whatsapp}
          </p>
          <p className="flex items-center gap-2.5">
            <Mail size={13} className="text-gold" /> {venue.email}
          </p>
          <p className="flex items-start gap-2.5">
            <MapPin size={13} className="mt-0.5 flex-shrink-0 text-gold" /> {venue.direccion}
          </p>
          <p className="flex items-center gap-2.5">
            <Clock3 size={13} className="text-gold" /> {venue.horario}
          </p>
        </div>

        <div className="flex flex-col gap-3 text-xs text-neutral-400">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Navegación</p>
          {[
            ["#salones", "Tour de salones"],
            ["#calculadora", "Calculadora de paquetes"],
            ["#reserva", "Solicitud de reserva"],
            ["#galeria", "Galería de eventos"],
            ["#testimonios", "Testimonios"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-gold">
              {label}
            </a>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="mt-4 w-fit rounded-full border border-gold/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 transition-all hover:border-gold/60 hover:text-gold"
          >
            Resetear datos de demo
          </button>
        </div>
      </div>

      <div className="ornament-line mx-8" />
      <div className="flex flex-col items-center gap-1 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-8 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          © 2026 {venue.nombre} · Todos los derechos reservados
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600">
          Demo interactiva · <span className="text-gold/70">Asisnet Web Demos</span>
        </p>
      </div>
    </footer>
  )
}
