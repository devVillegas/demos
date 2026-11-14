import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { HERO_STATS, HERO_IMAGES } from '../data/mockData.js'
import SmartImage from './SmartImage.jsx'
import Icon from './Icon.jsx'

function AnimatedCounter({ value, suffix, duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame = null
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return (
    <span ref={ref} className="font-display text-3xl font-bold text-ice sm:text-4xl">
      {display}
      <span className="text-gradient">{suffix}</span>
    </span>
  )
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-electric/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-120px] top-40 h-[320px] w-[320px] rounded-full bg-electric-bright/15 blur-[110px]"
      />

      <div className="section-shell relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-electric-soft/40 bg-brand-gradient-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-electric-bright">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-bright opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-bright" />
                </span>
                Consultoría &amp; Tecnología
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ice sm:text-5xl lg:text-6xl"
            >
              Convertimos retos técnicos en{' '}
              <span className="text-gradient">ventajas competitivas</span> medibles.
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Nexora Consulting acompaña a empresas de tamaño medio a reimaginar sus operaciones:
              estrategia digital, desarrollo a medida, cloud, datos e IA y seguridad — con equipos
              senior que entregan, no solo prometen.
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#cotizador"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-glow-cyan"
              >
                Cotizar mi proyecto
                <Icon
                  name="ArrowRight"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#casos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-ice backdrop-blur transition-all duration-300 hover:border-electric-soft/50 hover:bg-white/10"
              >
                Ver casos de éxito
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.id} className="border-l-2 border-electric/40 pl-4">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="relative hidden lg:block">
            <div className="relative animate-float">
              <SmartImage
                src={HERO_IMAGES.primary}
                alt="Equipo de consultoría trabajando en una sesión de estrategia"
                className="h-[420px] w-full rounded-3xl border border-white/10 object-cover shadow-card"
                fallbackClassName="h-[420px] w-full rounded-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl bg-gradient-to-t from-night-900/85 via-transparent to-transparent"
              />
              <div className="glass-card absolute -left-8 bottom-10 flex items-center gap-4 px-5 py-4 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <Icon name="Rocket" size={20} />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-ice">+34% eficiencia</p>
                  <p className="text-xs text-muted">promedio tras el primer trimestre</p>
                </div>
              </div>
            </div>
            <SmartImage
              src={HERO_IMAGES.secondary}
              alt="Consultores revisando métricas de proyecto en pantalla"
              className="absolute -right-6 -top-8 h-36 w-48 rotate-3 rounded-2xl border border-white/15 object-cover shadow-card"
              fallbackClassName="h-36 w-48 rounded-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
