import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ReceiptText, SlidersHorizontal } from 'lucide-react'
import Avatar from './Avatar.jsx'
import EmptyState from './EmptyState.jsx'
import { fmtUSD, fmtBs, fmtFecha, calcNomina } from '../utils/nomina.js'

const CHIP_DEPTO =
  'inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide'

function colorDepto(depto) {
  const paleta = {
    Administración: 'bg-brand-50 text-brand-600 ring-1 ring-brand-100',
    'Almacén y Logística': 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    Compras: 'bg-violetx-100 text-violetx-600 ring-1 ring-violetx-100',
    'Recursos Humanos': 'bg-mint-50 text-mint-600 ring-1 ring-mint-100',
    Tecnología: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
    Ventas: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
  }
  return paleta[depto] || 'bg-ink-100 text-ink-700 ring-1 ring-ink-200'
}

export default function EmployeesTable({ empleados, tasa, onRecibo, onAgregar, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = empleados.filter((emp) => {
    const t = busqueda.trim().toLowerCase()
    if (!t) return true
    return (
      `${emp.nombre} ${emp.apellido}`.toLowerCase().includes(t) ||
      emp.cedula.toLowerCase().includes(t) ||
      emp.cargo.toLowerCase().includes(t) ||
      emp.departamento.toLowerCase().includes(t)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft"
    >
      {/* Barra de herramientas */}
      <div className="flex flex-wrap items-center gap-3 border-b border-ink-100 px-4 py-3.5 sm:px-5">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, cédula, cargo o departamento…"
            className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-9 pr-3 text-[13px] text-ink-950 placeholder-ink-400 transition-colors focus:border-brand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <span className="tabular hidden rounded-lg bg-ink-100 px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-700 sm:block">
          {filtrados.length} de {empleados.length}
        </span>
        <span className="hidden items-center gap-1.5 text-[11.5px] font-medium text-ink-400 md:flex">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Deducciones: IVSS 4% · FAOV 1% · RPE 0,5%
        </span>
      </div>

      {filtrados.length === 0 ? (
        empleados.length === 0 ? (
          <EmptyState
            titulo="Aún no hay empleados"
            mensaje="Agrega el primero para calcular su nómina y emitir recibos de pago. Todo se guarda solo en tu navegador."
            onAccion={onAgregar}
            textoAccion="Agregar el primero"
          />
        ) : (
          <EmptyState
            titulo="Sin resultados"
            mensaje={`Ningún empleado coincide con "${busqueda}". Prueba con otro término de búsqueda.`}
          />
        )
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50 text-[10.5px] font-bold uppercase tracking-wider text-ink-500">
                <th className="px-5 py-3">Empleado</th>
                <th className="px-4 py-3">Departamento</th>
                <th className="px-4 py-3">Ingreso</th>
                <th className="px-4 py-3 text-right">Salario base</th>
                <th className="px-4 py-3 text-right">Cesta</th>
                <th className="px-4 py-3 text-right">Neto USD</th>
                <th className="px-4 py-3 text-right">Neto Bs</th>
                <th className="px-4 py-3 text-center">Recibo</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((emp, i) => {
                const calc = calcNomina(emp, tasa)
                return (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.25) }}
                    whileHover={{ backgroundColor: 'rgba(238, 242, 255, 0.55)' }}
                    className="group border-b border-ink-100 last:border-0 transition-colors hover:bg-brand-50/40"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar foto={emp.foto} nombre={emp.nombre} apellido={emp.apellido} />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-ink-950">
                              {emp.nombre} {emp.apellido}
                            </p>
                            {emp.nuevo && (
                              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-brand-600 ring-1 ring-brand-400/40">
                                Nuevo
                              </span>
                            )}
                          </div>
                          <p className="text-[11.5px] text-ink-500">
                            {emp.cargo} · <span className="tabular">{emp.cedula}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`${CHIP_DEPTO} ${colorDepto(emp.departamento)}`}>{emp.departamento}</span>
                    </td>
                    <td className="tabular px-4 py-3.5 text-ink-700">{fmtFecha(emp.fechaIngreso)}</td>
                    <td className="tabular px-4 py-3.5 text-right font-medium text-ink-950">
                      {fmtUSD(emp.salarioBase)}
                    </td>
                    <td className="tabular px-4 py-3.5 text-right text-ink-700">
                      {emp.cestaTicket > 0 ? fmtUSD(emp.cestaTicket) : '—'}
                    </td>
                    <td className="tabular px-4 py-3.5 text-right font-bold text-ink-950">{fmtUSD(calc.netoUsd)}</td>
                    <td className="tabular px-4 py-3.5 text-right text-ink-700">{fmtBs(calc.netoBs)}</td>
                    <td className="px-4 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onRecibo(emp)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-800 shadow-sm transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
                          title="Ver recibo de pago"
                        >
                          <ReceiptText className="h-3.5 w-3.5" />
                          Recibo
                        </motion.button>
                        <button
                          onClick={() => onEditar(emp)}
                          className="rounded-lg px-2 py-1.5 text-[11.5px] font-semibold text-ink-500 transition-colors hover:text-brand-600"
                          title="Editar"
                        >
                          Editar
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}
