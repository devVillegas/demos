import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 left-1/2 z-[90] -translate-x-1/2 sm:bottom-28"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 border border-dorado/40 bg-esmeralda-950/95 px-6 py-4 shadow-float backdrop-blur">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-dorado" aria-hidden="true" />
            <div>
              <p className="font-display text-lg text-arena-100">{toast.title}</p>
              {toast.detail && (
                <p className="text-[12px] text-arena-300/80">{toast.detail}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
