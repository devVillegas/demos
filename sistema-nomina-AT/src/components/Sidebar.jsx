import { motion } from 'framer-motion'
import { LayoutDashboard, Users, Calculator, ReceiptText, Wallet, X } from 'lucide-react'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'empleados', label: 'Empleados', icon: Users },
  { id: 'nomina', label: 'Nómina', icon: Calculator },
  { id: 'recibos', label: 'Recibos', icon: ReceiptText }
]

export default function Sidebar({ vista, onNavegar, abierta, onCerrar }) {
  return (
    <>
      {/* Fondo móvil */}
      {abierta && (
        <div
          className="fixed inset-0 z-30 bg-ink-950/50 backdrop-blur-sm lg:hidden"
          onClick={onCerrar}
          aria-hidden="true"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: abierta ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink-950 text-slate-300 lg:translate-x-0 lg:z-20 ${
          abierta ? '' : 'lg:translate-x-0'
        }`}
      >
        {/* Marca */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violetx-600 shadow-lift">
            <Wallet className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-white">NominaPro VE</p>
            <p className="text-[10.5px] font-medium uppercase tracking-widest text-brand-400">
              Asisnet · Demo
            </p>
          </div>
          <button
            onClick={onCerrar}
            className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="sidebar-scroll mt-2 flex-1 space-y-1 overflow-y-auto px-3">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Gestión
          </p>
          {NAV.map((item) => {
            const activo = vista === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavegar(item.id)
                  onCerrar()
                }}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                  activo ? 'text-white' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {activo && (
                  <motion.span
                    layoutId="nav-activo"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-600/25 to-violetx-600/10 ring-1 ring-brand-500/30"
                  />
                )}
                <item.icon
                  className={`relative h-[18px] w-[18px] ${activo ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`}
                  strokeWidth={2}
                />
                <span className="relative">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Pie de sidebar */}
        <div className="mx-3 mb-4 rounded-2xl bg-gradient-to-br from-brand-600/20 to-violetx-600/10 p-4 ring-1 ring-brand-500/20">
          <p className="text-[12.5px] font-semibold text-white">Demo interactiva</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-slate-400">
            Cálculos referenciales de nómina venezolana. Los datos se guardan solo en tu navegador.
          </p>
        </div>
      </motion.aside>
    </>
  )
}
