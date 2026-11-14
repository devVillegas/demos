import { motion } from 'framer-motion'
import { ReceiptText, Printer, Download, ShieldCheck, AlertTriangle } from 'lucide-react'
import ModalShell from './ModalShell.jsx'
import { EMPRESA } from '../data/mockData.js'
import { fmtUSD, fmtBs, fmtFecha, calcNomina } from '../utils/nomina.js'

/**
 * Recibo de pago profesional. El contenedor lleva id="recibo-printable"
 * para que @media print muestre SOLO el recibo.
 */
export default function ReceiptModal({ empleado, tasa, abierto, onCerrar, yaDescargado, onDescargar }) {
  if (!empleado) return null
  const calc = calcNomina(empleado, tasa)
  const periodo = new Date().toLocaleDateString('es-VE', { month: 'long', year: 'numeric' })
  const periodoTxt = periodo.charAt(0).toUpperCase() + periodo.slice(1)

  const Fila = ({ label, valor, bold, verde, rojo }) => (
    <div className="flex items-center justify-between py-1.5 text-[12.5px]">
      <span className={`${rojo ? 'text-rosita-600' : 'text-ink-600'} ${bold ? 'font-bold text-ink-950' : ''}`}>
        {label}
      </span>
      <span
        className={`tabular ${bold ? 'text-[14px] font-extrabold text-ink-950' : 'font-semibold text-ink-900'} ${
          verde ? 'text-mint-600' : ''
        } ${rojo ? 'text-rosita-600' : ''}`}
      >
        {valor}
      </span>
    </div>
  )

  return (
    <ModalShell
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Recibo de pago"
      subtitulo={`${empleado.nombre} ${empleado.apellido} · ${periodoTxt}`}
      ancho="max-w-2xl"
      footer={
        <div className="no-print flex flex-col-reverse gap-2 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-[11px] text-ink-500">Documento simulado — demo</p>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              onClick={onDescargar}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-800 shadow-soft transition-all hover:-translate-y-px hover:border-brand-400 hover:text-brand-600"
            >
              <Download className="h-4 w-4" />
              {yaDescargado ? 'Guardado ✓' : 'Descargar'}
            </button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violetx-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lift"
            >
              <Printer className="h-4 w-4" />
              Imprimir
            </motion.button>
          </div>
        </div>
      }
    >
      <div id="recibo-printable" className="rounded-2xl border border-ink-200 bg-white p-6 shadow-soft sm:p-8">
        {/* Encabezado */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink-950 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violetx-600 text-white shadow-soft">
                <ReceiptText className="h-5.5 w-5.5" style={{ width: 22, height: 22 }} />
              </div>
              <div>
                <p className="text-[17px] font-extrabold tracking-tight text-ink-950">{EMPRESA.nombre}</p>
                <p className="tabular text-[11.5px] font-medium text-ink-500">RIF: {EMPRESA.rif}</p>
              </div>
            </div>
            <p className="mt-2 max-w-xs text-[10.5px] leading-relaxed text-ink-500">{EMPRESA.direccion}</p>
            <p className="tabular text-[10.5px] text-ink-500">Tel. {EMPRESA.telefono}</p>
          </div>
          <div className="text-right">
            <span className="inline-block rounded-lg bg-ink-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
              Recibo de pago
            </span>
            <p className="tabular mt-2 text-[12px] font-bold text-ink-950">Período: {periodoTxt}</p>
            <p className="tabular text-[11px] text-ink-500">Fecha: {fmtFecha(new Date().toISOString().slice(0, 10))}</p>
            <p className="tabular text-[10.5px] text-ink-400">
              Tasa ref.: {tasa.toFixed(2)} Bs/USD
            </p>
          </div>
        </div>

        {/* Datos del trabajador */}
        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 rounded-xl bg-ink-50 px-4 py-3.5 text-[12px] sm:grid-cols-2">
          <p className="flex justify-between gap-3 sm:block">
            <span className="font-semibold text-ink-500">Trabajador: </span>
            <span className="font-bold text-ink-950">
              {empleado.nombre} {empleado.apellido}
            </span>
          </p>
          <p className="flex justify-between gap-3 sm:block">
            <span className="font-semibold text-ink-500">Cédula: </span>
            <span className="tabular font-bold text-ink-950">{empleado.cedula}</span>
          </p>
          <p className="flex justify-between gap-3 sm:block">
            <span className="font-semibold text-ink-500">Cargo: </span>
            <span className="font-bold text-ink-950">{empleado.cargo}</span>
          </p>
          <p className="flex justify-between gap-3 sm:block">
            <span className="font-semibold text-ink-500">Departamento: </span>
            <span className="font-bold text-ink-950">{empleado.departamento}</span>
          </p>
        </div>

        {/* Desglose */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 border-b border-mint-600/30 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-mint-600">
              Asignaciones
            </p>
            <Fila label="Salario base" valor={fmtUSD(calc.base)} />
            <Fila label="Cesta ticket (no tributable)" valor={fmtUSD(calc.cesta)} />
            <div className="mt-2 border-t border-dashed border-ink-200 pt-2">
              <Fila label="Total asignaciones" valor={fmtUSD(calc.totalAsignaciones)} bold />
            </div>
          </div>
          <div>
            <p className="mb-2 border-b border-rosita-600/30 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-rosita-600">
              Deducciones del trabajador
            </p>
            <Fila label="IVSS (4%)" valor={fmtUSD(calc.ivss)} rojo />
            <Fila label="FAOV (1%)" valor={fmtUSD(calc.faov)} rojo />
            <Fila label="RPE (0,5%)" valor={fmtUSD(calc.rpe)} rojo />
            <div className="mt-2 border-t border-dashed border-ink-200 pt-2">
              <Fila label="Total deducciones" valor={fmtUSD(calc.totalDeducciones)} rojo />
            </div>
          </div>
        </div>

        {/* Neto */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-ink-950 to-ink-800 p-5 text-white">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
                Neto a pagar · {periodoTxt}
              </p>
              <p className="tabular mt-1 text-3xl font-extrabold tracking-tight">{fmtUSD(calc.netoUsd)}</p>
              <p className="tabular mt-0.5 text-[13px] font-semibold text-slate-300">
                ≈ {fmtBs(calc.netoBs)} <span className="text-slate-400">({tasa.toFixed(2)} Bs/USD)</span>
              </p>
            </div>
            <div className="tabular rounded-xl bg-white/10 px-4 py-2.5 text-right ring-1 ring-white/15">
              <p className="text-[10px] uppercase tracking-wider text-slate-300">Asignaciones − Deducciones</p>
              <p className="text-[13px] font-bold">
                {fmtUSD(calc.totalAsignaciones)} − {fmtUSD(calc.totalDeducciones)}
              </p>
            </div>
          </div>
        </div>

        {/* Firma + aviso */}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="border-t border-ink-300 pt-2">
            <p className="text-[11.5px] font-semibold text-ink-800">Firma del trabajador</p>
            <p className="tabular text-[10.5px] text-ink-400">{empleado.cedula}</p>
          </div>
          <div className="border-t border-ink-300 pt-2">
            <p className="text-[11.5px] font-semibold text-ink-800">{EMPRESA.nombre}</p>
            <p className="text-[10.5px] text-ink-400">Departamento de Recursos Humanos</p>
          </div>
        </div>

        <div className="no-print mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl bg-ink-100 px-4 py-2.5 text-[10.5px] text-ink-500">
          <span className="inline-flex items-center gap-1.5 font-semibold text-ink-700">
            <ShieldCheck className="h-3.5 w-3.5 text-mint-600" />
            Documento simulado — demo
          </span>
          <span className="inline-flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-ambar-600" />
            Cálculos referenciales, sin validez fiscal.
          </span>
        </div>
        <p className="mt-4 text-center text-[9.5px] uppercase tracking-[0.2em] text-ink-400 sm:hidden">
          Documento simulado — demo
        </p>
      </div>
    </ModalShell>
  )
}
