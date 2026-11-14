import { useState } from 'react'
import { Menu, Plus, ChevronDown, Users } from 'lucide-react'
import { fmtUSD, fmtBs, totalNominaUSD, totalNominaBs } from '../utils/nomina.js'

const TITULOS = {
  dashboard: 'Dashboard',
  empleados: 'Empleados',
  nomina: 'Nómina del período',
  recibos: 'Recibos de pago'
}

export default function Topbar({ vista, onAbrirSidebar, onNuevoEmpleado, tasa, onCambiarTasa, empleados, onEmitirTodos }) {
  const [editandoTasa, setEditandoTasa] = useState(false)
  const [borrador, setBorrador] = useState(String(tasa))

  function confirmarTasa() {
    const valor = parseFloat(borrador.replace(',', '.'))
    if (!Number.isFinite(valor) || valor <= 0) {
      setBorrador(String(tasa))
    } else {
      onCambiarTasa(valor)
    }
    setEditandoTasa(false)
  }

  return (
    <header className="sticky top-0 z-10 border-b border-ink-200 bg-white/80 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:py-4">
        <button
          onClick={onAbrirSidebar}
          className="rounded-xl border border-ink-200 bg-white p-2 text-ink-800 shadow-soft hover:bg-ink-100 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-[17px] font-bold tracking-tight text-ink-950 sm:text-lg">
            {TITULOS[vista]}
          </h1>
          <p className="hidden text-[12px] text-ink-500 sm:block">
            {empleados.length} empleado{empleados.length === 1 ? '' : 's'} · Neto mensual{' '}
            <span className="tabular font-semibold text-ink-800">{fmtUSD(totalNominaUSD(empleados, tasa))}</span>{' '}
            ≈ <span className="tabular font-semibold text-ink-800">{fmtBs(totalNominaBs(empleados, tasa))}</span>
          </p>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Tasa referencial editable */}
          <div className="flex items-center gap-2 rounded-xl border border-ink-200 bg-ink-50 px-3 py-2 shadow-soft">
            <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-ink-500 md:block">
              Tasa BCV referencial · demo
            </span>
            {editandoTasa ? (
              <div className="flex items-center gap-1">
                <input
                  autoFocus
                  value={borrador}
                  onChange={(e) => setBorrador(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') confirmarTasa()
                    if (e.key === 'Escape') {
                      setBorrador(String(tasa))
                      setEditandoTasa(false)
                    }
                  }}
                  onBlur={confirmarTasa}
                  inputMode="decimal"
                  className="tabular w-20 rounded-lg border border-brand-400 bg-white px-2 py-1 text-right text-[13px] font-semibold text-ink-950 focus:border-brand-600"
                  aria-label="Tasa Bs por USD"
                />
                <span className="text-[11px] font-medium text-ink-500">Bs/USD</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setBorrador(String(tasa))
                  setEditandoTasa(true)
                }}
                className="group flex items-center gap-1.5"
                title="Editar tasa referencial (demo)"
              >
                <span className="tabular rounded-lg bg-white px-2 py-1 text-[13px] font-bold text-ink-950 ring-1 ring-ink-200">
                  {tasa.toFixed(2)} Bs
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-ink-400 transition-colors group-hover:text-brand-600" />
              </button>
            )}
          </div>

          {vista === 'recibos' && empleados.length > 0 && (
            <button
              onClick={onEmitirTodos}
              className="hidden items-center gap-2 rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink-800 shadow-soft transition-all hover:-translate-y-px hover:border-brand-400 hover:text-brand-600 sm:flex"
            >
              <Users className="h-4 w-4" />
              Emitir todos
            </button>
          )}

          <button
            onClick={onNuevoEmpleado}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-violetx-600 px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-lift transition-all hover:-translate-y-px hover:shadow-modal active:translate-y-0"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Nuevo empleado</span>
            <span className="sm:hidden">Empleado</span>
          </button>
        </div>
      </div>
    </header>
  )
}
