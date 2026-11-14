import { motion } from 'framer-motion'
import { Wallet, Users, TrendingUp, Banknote, Plus, Calculator, ReceiptText } from 'lucide-react'
import KpiCard from './KpiCard.jsx'
import Avatar from './Avatar.jsx'
import { fmtUSD, fmtBs, fmtNum, calcNomina, totalNominaUSD, totalNominaBs, resumenPorDepartamento } from '../utils/nomina.js'

const contenedor = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
}

export default function Dashboard({ empleados, tasa, onNuevoEmpleado, onIrNomina, onIrEmpleados, onRecibo }) {
  const totalUSD = totalNominaUSD(empleados, tasa)
  const totalBs = totalNominaBs(empleados, tasa)
  const promedio = empleados.length > 0 ? totalUSD / empleados.length : 0
  const resumenDeptos = resumenPorDepartamento(empleados, tasa)
  const maxDepto = Math.max(...resumenDeptos.map((d) => d.neto), 1)
  const ultimos = [...empleados].slice(-5).reverse()

  return (
    <motion.div variants={contenedor} initial="oculto" animate="visible" className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icono={Wallet}
          gradiente="bg-gradient-to-br from-brand-600 to-violetx-600"
          titulo="Total nómina mensual"
          valor={fmtUSD(totalUSD)}
          sub={`${empleados.length} empleado${empleados.length === 1 ? '' : 's'} en planilla`}
          nota="Neto a pagar · USD"
          delay={0}
        />
        <KpiCard
          icono={Banknote}
          gradiente="bg-gradient-to-br from-emerald-500 to-teal-600"
          titulo="Equivalente en bolívares"
          valor={fmtBs(totalBs)}
          sub={`Tasa referencial: ${tasa.toFixed(2)} Bs/USD`}
          nota="Tasa BCV referencial · demo"
          delay={0.05}
        />
        <KpiCard
          icono={Users}
          gradiente="bg-gradient-to-br from-sky-500 to-indigo-600"
          titulo="Empleados activos"
          valor={fmtNum(empleados.length)}
          sub={`${resumenDeptos.length} departamento${resumenDeptos.length === 1 ? '' : 's'}`}
          nota="Planilla guardada en tu navegador"
          delay={0.1}
        />
        <KpiCard
          icono={TrendingUp}
          gradiente="bg-gradient-to-br from-rose-500 to-orange-500"
          titulo="Promedio salarial neto"
          valor={fmtUSD(promedio)}
          sub="Por empleado / mes"
          nota="Base + cesta − deducciones"
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Acciones rápidas + últimos agregados */}
        <motion.div
          variants={{ oculto: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink-500">Acciones rápidas</h3>
            <div className="mt-4 space-y-2.5">
              {[
                { icono: Plus, titulo: 'Agregar empleado', desc: 'Cédula, cargo y salario en USD', accion: onNuevoEmpleado },
                { icono: Calculator, titulo: 'Calcular nómina', desc: 'IVSS · FAOV · RPE y totales', accion: onIrNomina },
                { icono: ReceiptText, titulo: 'Emitir recibos', desc: 'Recibo de pago imprimible', accion: () => onIrEmpleados('recibos') }
              ].map((a) => (
                <motion.button
                  key={a.titulo}
                  whileHover={{ x: 4 }}
                  onClick={a.accion}
                  className="group flex w-full items-center gap-3.5 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3 text-left transition-colors hover:border-brand-400 hover:bg-brand-50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violetx-600 text-white shadow-soft">
                    <a.icono className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-ink-950">{a.titulo}</span>
                    <span className="block text-[11.5px] text-ink-500">{a.desc}</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink-500">Últimos agregados</h3>
              <button onClick={onIrEmpleados} className="text-[11.5px] font-semibold text-brand-600 hover:underline">
                Ver todos
              </button>
            </div>
            <div className="mt-3 space-y-1">
              {ultimos.map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => onRecibo(emp)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-brand-50"
                >
                  <Avatar foto={emp.foto} nombre={emp.nombre} apellido={emp.apellido} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold text-ink-950">
                      {emp.nombre} {emp.apellido}
                    </span>
                    <span className="block truncate text-[11px] text-ink-500">{emp.cargo}</span>
                  </span>
                  <span className="tabular text-[12px] font-bold text-ink-950">
                    {fmtUSD(calcNomina(emp, tasa).netoUsd)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Gráfica por departamento + tabla resumen */}
        <motion.div
          variants={{ oculto: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft xl:col-span-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink-500">
                Costo neto por departamento
              </h3>
              <p className="mt-0.5 text-[11.5px] text-ink-400">Mini gráfica · {fmtUSD(totalUSD)} mensuales</p>
            </div>
            <button
              onClick={onIrNomina}
              className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-[11.5px] font-semibold text-ink-800 shadow-sm hover:border-brand-400 hover:text-brand-600"
            >
              Ver nómina completa
            </button>
          </div>

          {resumenDeptos.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-[13px] text-ink-400">
              Sin datos todavía — agrega empleados para ver la gráfica.
            </div>
          ) : (
            <div className="mt-5 flex h-64 items-end gap-3 sm:gap-5">
              {resumenDeptos.map((d, i) => (
                <div key={d.departamento} className="group flex min-w-0 flex-1 flex-col items-center gap-2">
                  <span className="tabular text-[10.5px] font-bold text-ink-700 opacity-0 transition-opacity group-hover:opacity-100">
                    {fmtUSD(d.neto)}
                  </span>
                  <div className="flex h-44 w-full items-end justify-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max((d.neto / maxDepto) * 100, 6)}%` }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="bar-fill relative w-full max-w-[52px] rounded-t-lg"
                    >
                      <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-lg bg-white/25" />
                    </motion.div>
                  </div>
                  <span className="tabular text-[10.5px] font-bold text-ink-950">
                    {fmtUSD(d.neto).replace('$', '')}$
                  </span>
                  <span className="max-w-full truncate text-center text-[10px] font-medium uppercase tracking-wide text-ink-500">
                    {d.departamento}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
