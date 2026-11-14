import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'

export default function FloatingBadge({ onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      aria-label="Abrir visor de datos de la demo"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-night-850/90 px-4 py-2.5 text-xs font-semibold text-ice shadow-card backdrop-blur-md transition-colors duration-300 hover:border-electric-soft/60 sm:bottom-6 sm:right-6"
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="glow-dot relative inline-flex h-2 w-2 rounded-full bg-electric-bright" />
      </span>
      Modo Demo Interactiva
      <span className="hidden text-muted sm:inline">• Asisnet</span>
      <Icon name="Sparkles" size={14} className="text-electric-bright" />
    </motion.button>
  )
}

export function BadgePortal({ children }) {
  return <AnimatePresence>{children}</AnimatePresence>
}
