import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { HERO } from '../data/mockData.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const lines = HERO.titular.split('\n')
  return (
    <section className="grain relative overflow-hidden border-b border-line bg-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 md:pt-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:pb-24">
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.p variants={item} className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">
            <span className="h-px w-10 bg-ember" />
            Colección Otoño 23
          </motion.p>

          <h1 className="font-display text-[13vw] font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-[5.4rem]">
            {lines.map((l, i) => (
              <motion.span key={i} variants={item} className={`block ${i === lines.length - 1 ? 'italic text-ember' : ''}`}>
                {l}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/70">
            {HERO.subtitulo}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#tienda"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[12px] font-semibold uppercase tracking-widest2 text-bone transition-colors hover:bg-ember"
            >
              {HERO.cta}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#lookbook"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-[12px] font-semibold uppercase tracking-widest2 transition-colors hover:border-ink"
            >
              Lookbook
              <ArrowDown size={15} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] bg-img-fallback lg:aspect-[5/6]">
            <img
              src={HERO.imagen}
              alt="Editorial ATELIER 23 — moda urbana contemporánea"
              loading="eager"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.classList.add('img-fallback')
              }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute -bottom-5 left-4 rounded-2xl border border-line bg-bone/95 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(17,17,17,0.35)] backdrop-blur sm:left-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest2 text-stone2">Piezas nuevas</p>
            <p className="font-display text-2xl font-bold">
              16 <span className="text-ember">/ colección</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
