import { motion } from 'framer-motion'
import { ReceiptText, Trash2 } from 'lucide-react'
import EmptyState from './EmptyState.jsx'
import { fmtUSD, fmtBs, fmtFechaHora, calcNomina } from '../utils/nomina.js'

/**
 * Sección "Recibos": recibos de pago emitidos (guardados en el registro demo).
 */
export default function ReceiptsSection({ recibos, empleados, tasa, onVerRecibo, onEliminar, onAgregar, onEmitirTodos }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-200 bg-white px-5 py-4 shadow-soft">
        <div>
          <h2 className="text-[14px] font-bold tracking-tight text-ink-950">Recibos de pago emitidos</h2>
          <p className="text-[12px] text-ink-500">
            {recibos.length === 0
              ? 'Aún no has emitido recibos en esta demo.'
              : `${recibos.length} recibo${recibos.length === 1 ? '' : 's'} guardado${recibos.length === 1 ? '' : 's'} en el registro demo.`}
          </p>
        </div>
        {empleados.length > 0 && (
          <button
            onClick={onEmitirTodos}
            className="rounded-xl bg-gradient-to-r from-brand-600 to-violetx-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lift transition-all hover:-translate-y-px"
          >
            Emitir recibos de todos
          </button>
        )}
      </div>

      {recibos.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white shadow-soft">
          <EmptyState
            icono={ReceiptText}
            titulo="Sin recibos emitidos"
            mensaje={
              empleados.length === 0
                ? 'Primero agrega empleados a la planilla; luego podrás emitir su recibo de pago desde la tabla.'
                : 'Abre un recibo desde la tabla de empleados y pulsa "Descargar" para guardarlo aquí.'
            }
            onAccion={empleados.length === 0 ? onAgregar : undefined}
            textoAccion="Agregar el primero"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {recibos.map((rec, i) => {
            const emp = empleados.find((e) => e.id === rec.empleadoId)
            const nombre = emp ? `${emp.nombre} ${emp.apellido}` : rec.nombreEmpleado
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-4 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violetx-600 text-white shadow-soft">
                  <ReceiptText className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-ink-950">{nombre}</p>
                  <p className="tabular truncate text-[11px] text-ink-500">
                    {fmtFechaHora(rec.fecha)} · período {rec.periodo}
                  </p>
                  <p className="tabular mt-0.5 text-[11.5px] font-semibold text-mint-600">
                    {fmtUSD(rec.netoUsd)} <span className="font-normal text-ink-400">≈ {fmtBs(rec.netoUsd * tasa)}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <button
                    onClick={() => onVerRecibo(rec)}
                    className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink-800 shadow-sm transition-colors hover:border-brand-400 hover:text-brand-600"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => onEliminar(rec.id)}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-ink-400 transition-colors hover:text-rosita-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Eliminar
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
