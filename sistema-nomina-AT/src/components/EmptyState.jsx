import { motion } from 'framer-motion'
import { UserPlus, Sparkles } from 'lucide-react'

/**
 * Estado vacío elegante con CTA principal.
 */
export default function EmptyState({ titulo, mensaje, onAccion, textoAccion, icono: Icono = UserPlus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-500 to-violetx-600 opacity-20 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-600 to-violetx-600 text-white shadow-lift">
          <Icono className="h-7 w-7" strokeWidth={2} />
        </div>
      </div>
      <h3 className="mt-5 text-[16px] font-bold tracking-tight text-ink-950">{titulo}</h3>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-ink-500">{mensaje}</p>
      {onAccion && (
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          onClick={onAccion}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violetx-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lift"
        >
          <Sparkles className="h-4 w-4" />
          {textoAccion}
        </motion.button>
      )}
    </motion.div>
  )
}
