import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

/**
 * Toast flotante inferior-derecha (encima del badge demo).
 */
export default function Toast({ toast }) {
  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-[60] sm:bottom-24 sm:right-6">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="flex items-center gap-2.5 rounded-xl bg-ink-950 px-4 py-3 text-white shadow-modal ring-1 ring-white/10"
          >
            {toast.tipo === 'error' ? (
              <AlertCircle className="h-4.5 w-4.5 text-rosita-600" style={{ width: 18, height: 18 }} />
            ) : (
              <CheckCircle2 className="h-4.5 w-4.5 text-mint-600" style={{ width: 18, height: 18 }} />
            )}
            <p className="text-[12.5px] font-semibold">{toast.mensaje}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
