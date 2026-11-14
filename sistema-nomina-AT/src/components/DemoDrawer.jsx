import { motion } from 'framer-motion'
import { Users, ReceiptText, Trash2, Database, RotateCcw, X } from 'lucide-react'
import { fmtUSD, fmtBs, fmtFechaHora } from '../utils/nomina.js'

/**
 * Drawer "Registros demo": datos guardados en localStorage (empleados y recibos).
 */
export default function DemoDrawer({ abierto, onCerrar, empleados, recibos, onEliminarEmpleado, onEliminarRecibo, onReset, clave }) {
  return (
    <>
      {abierto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-ink-950/55 backdrop-blur-sm"
          onClick={onCerrar}
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: abierto ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 360, damping: 34 }}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-modal ${abierto ? '' : 'pointer-events-none'}`}
        role="dialog"
        aria-label="Registros demo"
      >
        <div className="flex items-start justify-between gap-3 border-b border-ink-100 px-5 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-[15px] font-bold tracking-tight text-ink-950">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-violetx-600 text-white shadow-soft">
                <Database className="h-4 w-4" strokeWidth={2.2} />
              </span>
              Registros demo
            </h2>
            <p className="mt-1 text-[11.5px] text-ink-500">
              Clave localStorage: <code className="tabular rounded bg-ink-100 px-1.5 py-0.5 font-semibold text-ink-800">{clave}</code>
            </p>
          </div>
          <button
            onClick={onCerrar}
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-800"
            aria-label="Cerrar registros"
          >
            <X className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <div className="sidebar-scroll flex-1 overflow-y-auto px-5 py-4">
          {/* Empleados */}
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-500">
              <Users className="h-3.5 w-3.5" /> Empleados ({empleados.length})
            </h3>
          </div>
          {empleados.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-200 bg-ink-50 px-4 py-3 text-[12px] text-ink-400">
              Sin empleados guardados.
            </p>
          ) : (
            <ul className="space-y-2">
              {empleados.map((emp) => (
                <motion.li
                  key={emp.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-3.5 py-3 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-bold text-ink-950">
                      {emp.nombre} {emp.apellido}
                      {emp.nuevo && (
                        <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-600">
                          Nuevo
                        </span>
                      )}
                    </p>
                    <p className="tabular truncate text-[11px] text-ink-500">
                      {emp.cedula} · {emp.cargo} · {fmtUSD(emp.salarioBase)}
                    </p>
                  </div>
                  <button
                    onClick={() => onEliminarEmpleado(emp.id)}
                    className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-rosita-100 hover:text-rosita-600"
                    aria-label={`Eliminar a ${emp.nombre}`}
                    title="Eliminar registro"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Recibos */}
          <h3 className="mb-2 mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink-500">
            <ReceiptText className="h-3.5 w-3.5" /> Recibos emitidos ({recibos.length})
          </h3>
          {recibos.length === 0 ? (
            <p className="rounded-xl border border-dashed border-ink-200 bg-ink-50 px-4 py-3 text-[12px] text-ink-400">
              Sin recibos guardados.
            </p>
          ) : (
            <ul className="space-y-2">
              {recibos.map((rec) => (
                <motion.li
                  key={rec.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-3.5 py-3 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-bold text-ink-950">{rec.nombreEmpleado}</p>
                    <p className="tabular truncate text-[11px] text-ink-500">
                      {fmtFechaHora(rec.fecha)} · {rec.periodo}
                    </p>
                    <p className="tabular text-[11px] font-semibold text-mint-600">
                      {fmtUSD(rec.netoUsd)} ≈ {fmtBs(rec.netoUsd * rec.tasa)}
                    </p>
                  </div>
                  <button
                    onClick={() => onEliminarRecibo(rec.id)}
                    className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-rosita-100 hover:text-rosita-600"
                    aria-label="Eliminar recibo"
                    title="Eliminar registro"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ink-100 bg-ink-50 px-5 py-4">
          <button
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rosita-600/30 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-rosita-600 shadow-sm transition-colors hover:bg-rosita-100"
          >
            <RotateCcw className="h-4 w-4" />
            Resetear datos de demo
          </button>
          <p className="mt-2 text-center text-[10.5px] text-ink-400">
            Borra únicamente la clave <code className="font-semibold">{clave}</code> y recarga la página.
          </p>
        </div>
      </motion.aside>
    </>
  )
}
