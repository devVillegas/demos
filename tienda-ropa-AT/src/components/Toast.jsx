import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          className="fixed left-1/2 top-6 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3.5 text-bone shadow-2xl"
          role="status"
        >
          <CheckCircle2 size={18} className="shrink-0 text-ember" />
          <p className="text-[13px] font-medium">{toast}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
