import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'

/**
 * Contenedor animado de modal/drawer con backdrop y cierre con Escape.
 */
export default function ModalShell({ abierto, onCerrar, titulo, subtitulo, ancho = 'max-w-lg', children, footer }) {
  useEffect(() => {
    if (!abierto) return
    function alPresionar(e) {
      if (e.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alPresionar)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', alPresionar)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar])

  return (
    <AnimatePresence>
      {abierto && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-ink-950/55 backdrop-blur-sm"
            onClick={onCerrar}
          />
          <motion.div
            initial={{ opacity: 0, y: 42, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className={`relative w-full ${ancho} overflow-hidden rounded-t-3xl bg-white shadow-modal sm:rounded-2xl max-h-[92vh] flex flex-col`}
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-6 py-4">
              <div className="min-w-0">
                <h2 className="text-[16px] font-bold tracking-tight text-ink-950">{titulo}</h2>
                {subtitulo && <p className="mt-0.5 text-[12.5px] text-ink-500">{subtitulo}</p>}
              </div>
              <button
                onClick={onCerrar}
                className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-800"
                aria-label="Cerrar"
              >
                <X className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">{children}</div>
            {footer && <div className="border-t border-ink-100 bg-ink-50 px-6 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
