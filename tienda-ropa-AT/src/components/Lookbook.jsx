import { motion } from 'framer-motion'
import { LOOKBOOK } from '../data/mockData.js'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Lookbook() {
  return (
    <section id="lookbook" className="border-b border-line bg-bone py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">
              <span className="h-px w-10 bg-ember" /> Editorial
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              Look<span className="italic text-ember">book</span>
            </h2>
          </div>
          <p className="max-w-xs text-[14px] leading-relaxed text-ink/60">
            Cinco historias fotografiadas en la ciudad. Sin retoque de fondo, sin estilismos imposibles: ropa real usada de verdad.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[300px]"
        >
          {LOOKBOOK.map((look) => (
            <motion.figure
              key={look.nombre}
              variants={item}
              className={`group relative overflow-hidden rounded-xl bg-line ${look.span}`}
            >
              <img
                src={look.imagen}
                alt={look.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement.classList.add('img-fallback')
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              <figcaption className="absolute bottom-0 left-0 p-5">
                <p className="font-display text-xl font-semibold text-bone sm:text-2xl">{look.nombre}</p>
                <p className="mt-1 text-[12px] text-bone/75">{look.descripcion}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
