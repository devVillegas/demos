import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info } from "lucide-react";

export default function Toast({ toast }) {
  return (
    <div className="fixed top-20 md:top-24 inset-x-0 z-[70] flex justify-center pointer-events-none px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className={`animate-toast-in flex items-center gap-2.5 px-5 py-3 rounded-full shadow-dish text-sm font-medium max-w-md ${
              toast.tipo === "info"
                ? "bg-ink text-cream ring-1 ring-cream/20"
                : "bg-wine text-cream ring-1 ring-gold/40"
            }`}
            role="status"
          >
            {toast.tipo === "info" ? (
              <Info size={17} className="shrink-0 text-gold" />
            ) : (
              <CheckCircle2 size={17} className="shrink-0 text-gold" />
            )}
            <span className="leading-snug">{toast.mensaje}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
