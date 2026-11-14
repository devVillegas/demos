import { motion } from "framer-motion"
import { Inbox, Gem } from "lucide-react"

export default function BadgeFlotante({ cantidad, onAbrir }) {
  return (
    <motion.button
      type="button"
      onClick={onAbrir}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      whileHover={{ y: -3, boxShadow: "0 0 32px -6px rgba(212,175,55,0.65)" }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-gold/40 bg-ink-700/90 py-2.5 pl-3.5 pr-4 shadow-gold backdrop-blur-md"
      aria-label="Mis solicitudes demo"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gold-gradient text-ink">
        <Gem size={15} strokeWidth={2} />
        {cantidad > 0 && (
          <motion.span
            key={cantidad}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full border border-ink bg-amberAccent px-1 text-[9px] font-bold text-ink"
            style={{ height: 18 }}
          >
            {cantidad}
          </motion.span>
        )}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-gold">Modo Demo Interactiva</span>
        <span className="text-[10px] font-medium text-neutral-300">
          Mis solicitudes demo {cantidad > 0 ? `· ${cantidad}` : "· Asisnet"}
        </span>
      </span>
      <Inbox size={14} className="text-gold/80" />
    </motion.button>
  )
}
