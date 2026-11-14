import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { SectionTitle } from "./Ornament"
import { testimonios } from "../data/mockData"

export default function Testimonios() {
  return (
    <section id="testimonios" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionTitle
        kicker="Voces doradas"
        titulo="Lo que dicen nuestras familias"
        subtitulo="Testimonios reales de bodas, convenciones y aniversarios celebrados con nosotros."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {testimonios.map((t, i) => (
          <motion.blockquote
            key={t.nombre}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="gold-border-anim relative flex flex-col gap-5 rounded-2xl border border-gold/15 bg-ink-800 p-8 shadow-card"
          >
            <Quote size={40} className="absolute -top-4 left-6 text-gold/70 drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]" strokeWidth={1} />
            <div className="mt-3 flex gap-1" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-neutral-300">“{t.texto}”</p>
            <footer className="border-t border-gold/15 pt-4">
              <p className="font-display text-sm font-bold uppercase tracking-wider text-champagne">{t.nombre}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.25em] text-gold">{t.evento}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  )
}
