import { motion } from "framer-motion"
import { Users, Ruler, Star, Check } from "lucide-react"
import ImgRespaldo from "./ImgRespaldo"
import { SectionTitle } from "./Ornament"
import { salones } from "../data/mockData"

function SalonCard({ salon, seleccionado, onSeleccionar, index }) {
  const activo = seleccionado === salon.id

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      onClick={() => onSeleccionar(salon.id)}
      className={`gold-border-anim group relative cursor-pointer overflow-hidden rounded-2xl border bg-ink-800 shadow-card transition-colors ${
        activo ? "border-gold/70 shadow-gold" : "border-gold/15 hover:border-gold/40"
      }`}
    >
      {/* Foto */}
      <div className="relative h-52 overflow-hidden sm:h-60">
        <ImgRespaldo
          src={salon.imagen}
          alt={`Salón ${salon.nombre}`}
          inicial={salon.nombre.charAt(0)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          imgClassName=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-transparent to-transparent" />
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] backdrop-blur-sm ${
            activo ? "bg-gold-gradient text-ink" : "border border-gold/40 bg-ink/70 text-gold"
          }`}
        >
          {salon.uso}
        </span>
        {activo && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold"
          >
            <Check size={15} strokeWidth={3} />
          </motion.span>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-bold uppercase tracking-wider text-champagne group-hover:text-gold transition-colors">
          {salon.nombre}
        </h3>

        <div className="flex items-center gap-5 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-gold" />
            <strong className="text-champagne">{salon.capacidad}</strong> personas
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler size={14} className="text-gold" />
            <strong className="text-champagne">{salon.m2}</strong> m²
          </span>
        </div>

        <p className="text-sm leading-relaxed text-neutral-400">{salon.descripcion}</p>

        <p className="flex items-start gap-2 rounded-lg border border-gold/15 bg-gold-gradient-soft p-3 text-xs leading-relaxed text-gold-soft">
          <Star size={14} className="mt-0.5 flex-shrink-0 text-gold" />
          {salon.ventaja}
        </p>

        {/* Mini galería */}
        <div className="mt-1 grid grid-cols-3 gap-2">
          {salon.galeria.map((src, i) => (
            <div key={i} className="h-16 overflow-hidden rounded-md border border-gold/10">
              <ImgRespaldo
                src={src}
                alt={`${salon.nombre} · vista ${i + 1}`}
                inicial={salon.nombre.charAt(0)}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSeleccionar(salon.id)
          }}
          className={`mt-2 w-full rounded-full py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
            activo
              ? "bg-gold-gradient text-ink shadow-gold"
              : "border border-gold/40 text-gold hover:bg-gold/10"
          }`}
        >
          {activo ? "✓ Seleccionado para calcular" : "Calcular en este salón"}
        </button>
      </div>
    </motion.article>
  )
}

export default function SalonesTour({ seleccionado, onSeleccionar }) {
  return (
    <section id="salones" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
      <SectionTitle
        kicker="El tour visual"
        titulo="Cuatro espacios, cuatro mundos"
        subtitulo="Explora cada salón y selecciónalo para llevarlo directo a la calculadora de paquetes. Cada espacio tiene su propia tarifa base, capacidad y personalidad."
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {salones.map((salon, i) => (
          <SalonCard
            key={salon.id}
            salon={salon}
            index={i}
            seleccionado={seleccionado}
            onSeleccionar={onSeleccionar}
          />
        ))}
      </div>
    </section>
  )
}
