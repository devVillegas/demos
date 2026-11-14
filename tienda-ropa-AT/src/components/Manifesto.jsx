import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Recycle, HeartHandshake, CheckCircle2 } from 'lucide-react'

const valores = [
  {
    icono: Leaf,
    titulo: 'Materiales honestos',
    texto: 'Algodón peinado, lino europeo e índigo natural. Si decimos que es de verdad, es de verdad.',
  },
  {
    icono: Recycle,
    titulo: 'Producción corta',
    texto: 'Lotes de 120 piezas máximo. No quemamos inventario ni lo mandamos al fondo del mar.',
  },
  {
    icono: HeartHandshake,
    titulo: 'Precios transparentes',
    texto: 'Sabes exactamente qué pagas: tela, manos y margen razonable. Sin marketing inflado.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Manifesto() {
  const [email, setEmail] = useState('')
  const [suscrito, setSuscrito] = useState(false)
  const [error, setError] = useState(false)

  const enviar = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true)
      return
    }
    setError(false)
    setSuscrito(true)
  }

  return (
    <section id="manifiesto" className="grain relative overflow-hidden bg-ink py-20 text-bone lg:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mx-auto max-w-7xl px-5 sm:px-8"
      >
        <motion.p variants={item} className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest2 text-bone/50">
          <span className="h-px w-10 bg-ember" /> Manifiesto
        </motion.p>
        <motion.h2 variants={item} className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Hacemos ropa para <span className="italic text-ember">durar</span>, no para desfil de fotos.
        </motion.h2>
        <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-relaxed text-bone/65">
          ATELIER 23 nació de una pregunta simple: ¿por qué la moda urbana tenía que elegir entre verse bien y aguantar? Cada pieza de esta colección responde con costuras reforzadas, telas elegidas a mano y un diseño que no le grita a nadie.
        </motion.p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {valores.map((v) => (
            <motion.div
              key={v.titulo}
              variants={item}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-ember/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ember/15 text-ember">
                <v.icono size={20} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{v.titulo}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-bone/60">{v.texto}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10 lg:flex-row lg:items-center"
        >
          <div>
            <h3 className="font-display text-3xl font-semibold sm:text-4xl">
              Únete al <span className="italic text-ember">círculo</span>
            </h3>
            <p className="mt-2 max-w-md text-[14px] text-bone/60">
              Avances de colección, accesos anticipados y un 10% en tu primer pedido. Cero spam, palabra del atelier.
            </p>
          </div>
          {suscrito ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 rounded-full bg-ember/15 px-6 py-4 text-[14px] font-semibold text-ember"
            >
              <CheckCircle2 size={18} /> ¡Listo! Revisa tu correo (demo).
            </motion.p>
          ) : (
            <form onSubmit={enviar} className="flex w-full max-w-md flex-col gap-3 sm:flex-row" noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                aria-label="Correo para newsletter"
                className={`flex-1 rounded-full border bg-white/[0.06] px-5 py-4 text-[14px] text-bone outline-none transition-colors placeholder:text-bone/35 ${
                  error ? 'border-ember' : 'border-white/15 focus:border-ember'
                }`}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-ember px-7 py-4 text-[12px] font-bold uppercase tracking-widest2 text-white transition-colors hover:bg-white hover:text-ink"
              >
                Suscribirme <ArrowRight size={14} />
              </button>
            </form>
          )}
        </motion.div>
        {error && !suscrito && <p className="mt-3 text-right text-[12px] font-medium text-ember lg:max-w-md lg:ml-auto">Ingresa un correo válido para continuar.</p>}
      </motion.div>
    </section>
  )
}
