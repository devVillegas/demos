import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2, Inbox, CalendarDays, Clock3, Users, Receipt, Hash } from "lucide-react"

const fmt = (n) => `$${n.toLocaleString("es-VE")}`
const fmtFecha = (iso) =>
  new Date(iso).toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

function SolicitudCard({ sol, onEliminar }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24, height: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-gold/20 bg-ink-700 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-widest text-gold">
            <Hash size={11} /> {sol.id}
          </p>
          <p className="mt-1 text-sm font-semibold text-champagne">{sol.nombre}</p>
          <p className="text-[11px] text-neutral-500">Guardada: {fmtFecha(sol.creadoEn)}</p>
        </div>
        <motion.button
          type="button"
          onClick={() => onEliminar(sol.id)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-red-500/40 text-red-400 transition-colors hover:bg-red-500/15"
          aria-label={`Eliminar solicitud ${sol.id}`}
        >
          <Trash2 size={14} />
        </motion.button>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 border-t border-gold/10 pt-3 text-[11px] text-neutral-300">
        <p className="flex items-center gap-2">
          <CalendarDays size={12} className="text-gold" /> {sol.fecha} · {sol.horario}
        </p>
        <p className="flex items-center gap-2">
          <Users size={12} className="text-gold" /> {sol.presupuesto.tipo} · {sol.presupuesto.salon} · {sol.presupuesto.invitados} invitados
        </p>
        <p className="flex items-center gap-2">
          <Clock3 size={12} className="text-gold" /> {sol.presupuesto.duracionHoras} horas · {sol.presupuesto.extras.length} extras
        </p>
        <p className="flex items-center gap-2">
          <Receipt size={12} className="text-gold" /> Total estimado:{" "}
          <strong className="text-gold">{fmt(sol.presupuesto.total)}</strong>
          {sol.presupuesto.descuentoPct > 0 && (
            <span className="text-amberAccent-soft"> (−{sol.presupuesto.descuentoPct}%)</span>
          )}
        </p>
        {sol.mensaje && <p className="mt-1 rounded-lg bg-ink-600 p-2.5 italic text-neutral-400">“{sol.mensaje}”</p>}
        <p className="mt-1 text-neutral-500">
          {sol.email} · {sol.telefono}
        </p>
      </div>
    </motion.article>
  )
}

export default function DrawerMisSolicitudes({ abierto, solicitudes, onCerrar, onEliminar }) {
  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCerrar}
            className="fixed inset-0 z-[55] bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed bottom-0 right-0 top-0 z-[56] flex w-full max-w-md flex-col border-l border-gold/30 bg-ink-800 shadow-goldLg"
            role="dialog"
            aria-label="Mis solicitudes demo"
          >
            <header className="flex items-center justify-between border-b border-gold/20 p-5">
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-widest text-gold-gradient">
                  Mis solicitudes demo
                </p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                  Datos guardados en este navegador · Asisnet
                </p>
              </div>
              <motion.button
                type="button"
                onClick={onCerrar}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold"
                aria-label="Cerrar"
              >
                <X size={16} />
              </motion.button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {solicitudes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full flex-col items-center justify-center gap-4 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold-gradient-soft text-gold">
                    <Inbox size={26} strokeWidth={1.5} />
                  </span>
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-champagne">
                    Aún no hay solicitudes
                  </p>
                  <p className="max-w-[240px] text-xs leading-relaxed text-neutral-500">
                    Cuando envíes una solicitud de reserva aparecerá aquí, guardada al instante en tu navegador.
                  </p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                    {solicitudes.length} solicitud{solicitudes.length !== 1 ? "es" : ""} guardada
                    {solicitudes.length !== 1 ? "s" : ""} · clave asisnet_demo_salon_eventos
                  </p>
                  <AnimatePresence initial={false}>
                    {solicitudes.map((sol) => (
                      <SolicitudCard key={sol.id} sol={sol} onEliminar={onEliminar} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
