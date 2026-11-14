import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function Toast({ toast, onCerrar }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onCerrar, 4000)
    return () => clearTimeout(t)
  }, [toast, onCerrar])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-1/2 top-24 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full border border-gold/50 bg-ink-700/95 px-6 py-3.5 shadow-goldLg backdrop-blur-md"
          role="status"
        >
          <CheckCircle2 size={18} className="text-gold" />
          <span className="text-sm font-medium text-champagne">{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
