import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Info } from 'lucide-react'

/**
 * Tarjeta KPI animada con tendencia referencial y nota de pie.
 */
export default function KpiCard({ icono: Icono, titulo, valor, sub, tendencia, nota, gradiente, delay = 0 }) {
  return (
    <motion.div
      variants={{
        oculto: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-ink-200 bg-white p-5 shadow-soft"
    >
      {/* Halo del acento */}
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-[0.12] blur-2xl transition-opacity duration-300 group-hover:opacity-25 ${gradiente}`}
      />
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-soft ${gradiente}`}
        >
          <Icono className="h-5 w-5" strokeWidth={2.1} />
        </div>
        {tendencia && (
          <span className="flex items-center gap-1 rounded-full bg-mint-50 px-2 py-1 text-[11px] font-semibold text-mint-600 ring-1 ring-mint-600/20">
            {tendencia > 0 ? (
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
            ) : (
              <ArrowDownRight className="h-3 w-3" strokeWidth={2.5} />
            )}
            {Math.abs(tendencia)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">{titulo}</p>
      <p className="tabular mt-1 text-[26px] font-extrabold tracking-tight text-ink-950">{valor}</p>
      {sub && <p className="tabular mt-0.5 text-[12.5px] font-medium text-ink-500">{sub}</p>}
      {nota && (
        <p className="mt-3 flex items-center gap-1.5 border-t border-ink-100 pt-3 text-[11px] text-ink-400">
          <Info className="h-3.5 w-3.5 shrink-0" />
          {nota}
        </p>
      )}
    </motion.div>
  )
}
