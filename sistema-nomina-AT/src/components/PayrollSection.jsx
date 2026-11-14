import { motion } from 'framer-motion'
import { Calculator, ReceiptText } from 'lucide-react'
import EmptyState from './EmptyState.jsx'
import { fmtUSD, fmtBs, calcNomina, resumenPorDepartamento } from '../utils/nomina.js'

/**
 * Sección Nómina: tabla de cálculo referencial con totales al pie,
 * resumen por departamento y gráfica de barras CSS.
 */
export default function PayrollSection({ empleados, tasa, onRecibo, onAgregar }) {
  const filas = empleados.map((emp) => ({ emp, calc: calcNomina(emp, tasa) }))
  const totales = filas.reduce(
    (acc, { calc }) => ({
      asignaciones: acc.asignaciones + calc.totalAsignaciones,
      deducciones: acc.deducciones + calc.totalDeducciones,
      neto: acc.neto + calc.netoUsd
    }),
    { asignaciones: 0, deducciones: 0, neto: 0 }
  )
  const resumenDeptos = resumenPorDepartamento(empleados, tasa)
  const maxNeto = Math.max(...resumenDeptos.map((d) => d.neto), 1)

  if (empleados.length === 0) {
    return (
      <div className="rounded-2xl border border-ink-200 bg-white shadow-soft">
        <EmptyState
          icono={Calculator}
          titulo="Nómina vacía"
          mensaje="Agrega empleados para calcular IVSS, FAOV y RPE, y ver el costo total de la planilla por departamento."
          onAccion={onAgregar}
          textoAccion="Agregar el primero"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-5"
    >
      {/* Leyenda de cálculo */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-[11.5px] text-ink-700">
        <Calculator className="h-4 w-4 shrink-0 text-brand-600" />
        <span className="font-semibold text-ink-950">Cálculo referencial:</span>
        <span>Deducciones del trabajador: IVSS 4% · FAOV 1% · RPE 0,5% del salario base.</span>
        <span>Asignaciones: salario base + cesta ticket (no tributable).</span>
        <span className="tabular">
          Tasa aplicada: <b>{tasa.toFixed(2)} Bs/USD</b>
        </span>
      </div>

      {/* Tabla de nómina */}
      <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft">
        <div className="border-b border-ink-100 px-5 py-4">
          <h2 className="text-[14px] font-bold tracking-tight text-ink-950">Nómina del período (USD)</h2>
          <p className="text-[12px] text-ink-500">Desglose por empleado con totales al pie</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-[10.5px] font-bold uppercase tracking-wider text-ink-500">
                <th className="px-5 py-3">Empleado</th>
                <th className="px-4 py-3 text-right">Salario base</th>
                <th className="px-4 py-3 text-right">Cesta ticket</th>
                <th className="px-4 py-3 text-right">IVSS 4%</th>
                <th className="px-4 py-3 text-right">FAOV 1%</th>
                <th className="px-4 py-3 text-right">RPE 0,5%</th>
                <th className="px-4 py-3 text-right">Total deducc.</th>
                <th className="px-4 py-3 text-right">Neto USD</th>
                <th className="px-4 py-3 text-right">Neto Bs</th>
                <th className="px-4 py-3 text-center">Recibo</th>
              </tr>
            </thead>
            <tbody>
              {filas.map(({ emp, calc }, i) => (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.25) }}
                  className="border-b border-ink-100 transition-colors last:border-0 hover:bg-brand-50/40"
                >
                  <td className="px-5 py-3">
                    <p className="font-semibold text-ink-950">
                      {emp.nombre} {emp.apellido}
                    </p>
                    <p className="text-[11px] text-ink-500">
                      {emp.departamento} · <span className="tabular">{emp.cedula}</span>
                    </p>
                  </td>
                  <td className="tabular px-4 py-3 text-right text-ink-900">{fmtUSD(calc.base)}</td>
                  <td className="tabular px-4 py-3 text-right text-ink-700">
                    {calc.cesta > 0 ? fmtUSD(calc.cesta) : '—'}
                  </td>
                  <td className="tabular px-4 py-3 text-right text-rosita-600">{fmtUSD(calc.ivss)}</td>
                  <td className="tabular px-4 py-3 text-right text-rosita-600">{fmtUSD(calc.faov)}</td>
                  <td className="tabular px-4 py-3 text-right text-rosita-600">{fmtUSD(calc.rpe)}</td>
                  <td className="tabular px-4 py-3 text-right font-semibold text-rosita-600">
                    {fmtUSD(calc.totalDeducciones)}
                  </td>
                  <td className="tabular px-4 py-3 text-right font-bold text-ink-950">{fmtUSD(calc.netoUsd)}</td>
                  <td className="tabular px-4 py-3 text-right text-ink-700">{fmtBs(calc.netoBs)}</td>
                  <td className="px-4 py-3 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onRecibo(emp)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-800 shadow-sm transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
                    >
                      <ReceiptText className="h-3.5 w-3.5" />
                      Recibo
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-ink-950 to-ink-800 text-white">
                <td className="px-5 py-4 text-[12px] font-bold uppercase tracking-wider text-brand-400">
                  Totales ({empleados.length} empleados)
                </td>
                <td colSpan={2} />
                <td colSpan={3} />
                <td className="tabular px-4 py-4 text-right text-[13px] font-bold text-rose-300">
                  −{fmtUSD(totales.deducciones)}
                </td>
                <td className="tabular px-4 py-4 text-right text-[15px] font-extrabold">{fmtUSD(totales.neto)}</td>
                <td className="tabular px-4 py-4 text-right text-[13px] font-bold text-brand-400">
                  {fmtBs(totales.neto * tasa)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Resumen por departamento */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink-500">Resumen por departamento</h3>
          <div className="mt-4 space-y-3">
            {resumenDeptos.map((d) => (
              <div
                key={d.departamento}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 bg-ink-50 px-4 py-3"
              >
                <div>
                  <p className="text-[13px] font-bold text-ink-950">{d.departamento}</p>
                  <p className="text-[11px] text-ink-500">
                    {d.personas} persona{d.personas === 1 ? '' : 's'} · asignaciones {fmtUSD(d.asignaciones)} ·
                    deducciones {fmtUSD(d.deducciones)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="tabular text-[14px] font-extrabold text-ink-950">{fmtUSD(d.neto)}</p>
                  <p className="tabular text-[11px] text-ink-500">{fmtBs(d.neto * tasa)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfica de barras CSS */}
        <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink-500">Costo neto por departamento</h3>
          <p className="text-[11.5px] text-ink-400">Barras en proporción al neto mensual (USD)</p>
          <div className="mt-5 space-y-3.5">
            {resumenDeptos.map((d, i) => (
              <div key={d.departamento}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="truncate text-[11.5px] font-semibold text-ink-800">{d.departamento}</span>
                  <span className="tabular shrink-0 text-[11.5px] font-bold text-ink-950">{fmtUSD(d.neto)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-ink-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max((d.neto / maxNeto) * 100, 4)}%` }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="bar-fill h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-ink-100 pt-3 text-center">
            <p className="text-[11px] text-ink-400">Total neto mensual</p>
            <p className="tabular text-[18px] font-extrabold text-ink-950">
              {fmtUSD(totales.neto)} <span className="text-[12px] font-semibold text-ink-500">≈ {fmtBs(totales.neto * tasa)}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
