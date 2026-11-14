import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function DemoBadge({ count, onOpen }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onOpen}
      aria-label="Abrir visor de datos de demo"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border border-white/10 bg-ink px-4 py-3 text-bone shadow-[0_16px_40px_-12px_rgba(17,17,17,0.55)]"
    >
      <motion.span
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 0.8 }}
        className="text-ember"
      >
        <Sparkles size={16} />
      </motion.span>
      <span className="hidden text-[11px] font-semibold uppercase tracking-widest2 sm:inline">
        Modo Demo Interactiva <span className="text-ember">•</span> Asisnet
      </span>
      <span className="sm:hidden text-[11px] font-semibold uppercase tracking-widest2">Demo</span>
      {count > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-ember px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </motion.button>
  )
}
