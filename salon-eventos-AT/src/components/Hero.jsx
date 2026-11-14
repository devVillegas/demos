import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate } from "framer-motion"
import { CalendarCheck, Calculator } from "lucide-react"
import ImgRespaldo from "./ImgRespaldo"
import { venue } from "../data/mockData"

function Contador({ valor, sufijo = "" }) {
  const ref = useRef(null)
  const enVista = useInView(ref, { once: true, margin: "-40px" })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!enVista) return
    const controls = animate(0, valor, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [enVista, valor])

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gold-gradient sm:text-5xl">
      {n.toLocaleString("es-VE")}
      {sufijo}
    </span>
  )
}

const particulas = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.6 + (i % 3) * 2.1) % 100}%`,
  dur: 14 + (i % 7) * 2.5,
  delay: (i % 9) * 1.7,
  size: 2 + (i % 3),
}))

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fondo */}
      <ImgRespaldo
        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80"
        alt="Salón de bodas iluminado con luces doradas"
        inicial="💎"
        className="absolute inset-0 h-full w-full object-cover"
        imgClassName="opacity-45"
      />
      <div className="absolute inset-0 hero-vignette" />

      {/* Partículas doradas */}
      <div className="gold-particles" aria-hidden="true">
        {particulas.map((p, i) => (
          <span
            key={i}
            className="gold-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <motion.div
          initial="oculto"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
          }}
          className="max-w-3xl"
        >
          <motion.p
            variants={{ oculto: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="mb-5 flex items-center gap-3 font-body text-[11px] font-semibold uppercase tracking-[0.4em] text-gold"
          >
            <span className="ornament-line w-10" />
            {venue.ciudad} · Est. {2026 - venue.stats.anos}
          </motion.p>

          <motion.h1
            variants={{ oculto: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
            className="font-display text-4xl font-black uppercase leading-[1.08] tracking-wide text-champagne sm:text-6xl lg:text-7xl"
          >
            Donde cada celebración
            <span className="mt-2 block text-gold-gradient">brilla en oro</span>
          </motion.h1>

          <motion.p
            variants={{ oculto: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg"
          >
            {venue.descripcion}
          </motion.p>

          <motion.div
            variants={{ oculto: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <motion.a
              href="#reserva"
              whileHover={{ y: -3, boxShadow: "0 0 40px -8px rgba(212,175,55,0.7)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink"
            >
              <CalendarCheck size={17} />
              Solicitar reserva
            </motion.a>
            <motion.a
              href="#calculadora"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="gold-border-anim inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink-700/60 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur-sm"
            >
              <Calculator size={17} />
              Calcular presupuesto
            </motion.a>
          </motion.div>

          {/* Contadores */}
          <motion.div
            variants={{ oculto: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-gold/20 pt-8"
          >
            <div className="flex flex-col gap-1">
              <Contador valor={venue.stats.eventos} sufijo="+" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Eventos realizados</span>
            </div>
            <div className="flex flex-col gap-1">
              <Contador valor={venue.stats.capacidad} />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Capacidad total</span>
            </div>
            <div className="flex flex-col gap-1">
              <Contador valor={venue.stats.anos} sufijo=" años" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">De tradición</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
