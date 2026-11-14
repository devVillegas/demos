import { motion } from "framer-motion"
import ImgRespaldo from "./ImgRespaldo"
import { SectionTitle } from "./Ornament"
import { galeriaEventos } from "../data/mockData"

export default function Galeria() {
  return (
    <section id="galeria" className="relative bg-ink-800/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="Nuestro legado"
          titulo="Eventos que ya hicieron historia"
          subtitulo="Una muestra de celebraciones producidas en nuestros cuatro espacios. Cada foto guarda una noche que nuestros clientes aún recuerdan."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {galeriaEventos.map((ev, i) => (
            <motion.figure
              key={ev.titulo}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative col-span-1 aspect-square cursor-pointer overflow-hidden rounded-xl border border-gold/15 shadow-card transition-colors hover:border-gold/60 hover:shadow-gold"
            >
              <ImgRespaldo
                src={ev.imagen}
                alt={ev.titulo}
                inicial="✦"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block text-[9px] uppercase tracking-[0.3em] text-gold">{ev.salon}</span>
                <span className="mt-1 block font-display text-xs font-bold uppercase tracking-wide text-champagne sm:text-sm">
                  {ev.titulo}
                </span>
              </figcaption>
              <span className="pointer-events-none absolute inset-2 rounded-lg border border-gold/0 transition-colors duration-300 group-hover:border-gold/40" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
