import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './components/Dashboard.jsx'
import EmployeesTable from './components/EmployeesTable.jsx'
import PayrollSection from './components/PayrollSection.jsx'
import ReceiptsSection from './components/ReceiptsSection.jsx'
import EmployeeFormModal from './components/EmployeeFormModal.jsx'
import ReceiptModal from './components/ReceiptModal.jsx'
import DemoDrawer from './components/DemoDrawer.jsx'
import Toast from './components/Toast.jsx'
import { useDemoStorage, CLAVE_UNICA } from './hooks/useLocalStorage.js'
import { EMPLEADOS_SEMILLA, TASA_BCV_DEFAULT } from './data/mockData.js'
import { calcNomina } from './utils/nomina.js'

let contadorId = Date.now()
function nuevoId(prefijo) {
  contadorId += 1
  return `${prefijo}-${contadorId.toString(36)}`
}

export default function App() {
  const [vista, setVista] = useState('dashboard')
  const [sidebarAbierta, setSidebarAbierta] = useState(false)
  const [drawerDemo, setDrawerDemo] = useState(false)
  const [tasa, setTasa] = useState(TASA_BCV_DEFAULT)

  const [empleados, setEmpleados] = useDemoStorage('empleados', EMPLEADOS_SEMILLA)
  const [recibos, setRecibos] = useDemoStorage('recibos', [])

  const [modalEmpleado, setModalEmpleado] = useState(null) // null | {modo:'nuevo'} | {modo:'editar', empleado}
  const [empleadoRecibo, setEmpleadoRecibo] = useState(null)
  const [reciboGuardado, setReciboGuardado] = useState(false)
  const [toast, setToast] = useState(null)

  const mostrarToast = useCallback((mensaje, tipo = 'ok') => {
    const id = Date.now()
    setToast({ id, mensaje, tipo })
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t))
    }, 3200)
  }, [])

  /* ---------- Empleados ---------- */

  function guardarEmpleado(datos) {
    const editando = modalEmpleado && modalEmpleado.modo === 'editar'
    if (editando) {
      const objetivo = modalEmpleado.empleado
      setEmpleados((prev) =>
        prev.map((e) =>
          e.id === objetivo.id
            ? { ...e, ...datos, foto: e.foto, nuevo: false }
            : e
        )
      )
      mostrarToast('Empleado actualizado correctamente')
    } else {
      const empleado = {
        id: nuevoId('emp'),
        ...datos,
        foto: `https://images.unsplash.com/photo-1${Math.floor(Math.random() * 900000000 + 100000000)}?auto=format&fit=crop&w=96&q=60`,
        nuevo: true
      }
      setEmpleados((prev) => [...prev, empleado])
      mostrarToast(`${datos.nombre} ${datos.apellido} agregado a la nómina`)
    }
    setModalEmpleado(null)
    if (vista === 'dashboard' || vista === 'nomina' || vista === 'recibos') setVista('empleados')
  }

  function eliminarEmpleado(id) {
    const emp = empleados.find((e) => e.id === id)
    setEmpleados((prev) => prev.filter((e) => e.id !== id))
    setRecibos((prev) => prev.filter((r) => r.empleadoId !== id))
    mostrarToast(emp ? `${emp.nombre} ${emp.apellido} eliminado del registro demo` : 'Registro eliminado')
  }

  /* ---------- Recibos ---------- */

  function abrirRecibo(empleado) {
    setEmpleadoRecibo(empleado)
    setReciboGuardado(false)
  }

  function descargarRecibo() {
    if (!empleadoRecibo) return
    const calc = calcNomina(empleadoRecibo, tasa)
    const periodo = new Date().toLocaleDateString('es-VE', { month: 'long', year: 'numeric' })
    const registro = {
      id: nuevoId('rec'),
      empleadoId: empleadoRecibo.id,
      nombreEmpleado: `${empleadoRecibo.nombre} ${empleadoRecibo.apellido}`,
      cedula: empleadoRecibo.cedula,
      cargo: empleadoRecibo.cargo,
      departamento: empleadoRecibo.departamento,
      periodo,
      fecha: new Date().toISOString(),
      tasa,
      netoUsd: calc.netoUsd
    }
    setRecibos((prev) => [registro, ...prev.filter((r) => r.empleadoId !== registro.empleadoId)])
    setReciboGuardado(true)
    mostrarToast('Recibo guardado en el registro demo ✓')
  }

  function verReciboGuardado(registro) {
    const emp = empleados.find((e) => e.id === registro.empleadoId)
    if (emp) {
      abrirRecibo(emp)
    } else {
      mostrarToast('El empleado de este recibo ya no existe en la planilla', 'error')
    }
  }

  function emitirTodos() {
    if (empleados.length === 0) return
    const periodo = new Date().toLocaleDateString('es-VE', { month: 'long', year: 'numeric' })
    const fecha = new Date().toISOString()
    const registros = empleados.map((emp) => ({
      id: nuevoId('rec'),
      empleadoId: emp.id,
      nombreEmpleado: `${emp.nombre} ${emp.apellido}`,
      cedula: emp.cedula,
      cargo: emp.cargo,
      departamento: emp.departamento,
      periodo,
      fecha,
      tasa,
      netoUsd: calcNomina(emp, tasa).netoUsd
    }))
    setRecibos(registros)
    mostrarToast(`${registros.length} recibos guardados en el registro demo ✓`)
  }

  /* ---------- Reset demo ---------- */

  function resetearDemo() {
    try {
      window.localStorage.removeItem(CLAVE_UNICA)
    } catch {
      // ignorar
    }
    window.location.reload()
  }

  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen bg-ink-50">
      <Sidebar vista={vista} onNavegar={setVista} abierta={sidebarAbierta} onCerrar={() => setSidebarAbierta(false)} />

      <div className="lg:pl-64">
        <Topbar
          vista={vista}
          onAbrirSidebar={() => setSidebarAbierta(true)}
          onNuevoEmpleado={() => setModalEmpleado({ modo: 'nuevo' })}
          tasa={tasa}
          onCambiarTasa={(v) => {
            setTasa(v)
            mostrarToast(`Tasa referencial actualizada: ${v.toFixed(2)} Bs/USD`)
          }}
          empleados={empleados}
          onEmitirTodos={emitirTodos}
        />

        <main className="px-4 pb-28 pt-5 sm:px-6 sm:pb-10">
          <AnimatePresence mode="wait">
            <div key={vista}>
              {vista === 'dashboard' && (
                <Dashboard
                  empleados={empleados}
                  tasa={tasa}
                  onNuevoEmpleado={() => setModalEmpleado({ modo: 'nuevo' })}
                  onIrNomina={() => setVista('nomina')}
                  onIrEmpleados={(destino) => setVista(destino)}
                  onRecibo={abrirRecibo}
                />
              )}
              {vista === 'empleados' && (
                <EmployeesTable
                  empleados={empleados}
                  tasa={tasa}
                  onRecibo={abrirRecibo}
                  onAgregar={() => setModalEmpleado({ modo: 'nuevo' })}
                  onEditar={(emp) => setModalEmpleado({ modo: 'editar', empleado: emp })}
                  onEliminar={eliminarEmpleado}
                />
              )}
              {vista === 'nomina' && (
                <PayrollSection
                  empleados={empleados}
                  tasa={tasa}
                  onRecibo={abrirRecibo}
                  onAgregar={() => setModalEmpleado({ modo: 'nuevo' })}
                />
              )}
              {vista === 'recibos' && (
                <ReceiptsSection
                  recibos={recibos}
                  empleados={empleados}
                  tasa={tasa}
                  onVerRecibo={verReciboGuardado}
                  onEliminar={(id) => {
                    setRecibos((prev) => prev.filter((r) => r.id !== id))
                    mostrarToast('Recibo eliminado del registro demo')
                  }}
                  onAgregar={() => setModalEmpleado({ modo: 'nuevo' })}
                  onEmitirTodos={emitirTodos}
                />
              )}
            </div>
          </AnimatePresence>

          {/* Zona inferior discreta */}
          <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink-200 pt-5 text-[11.5px] text-ink-400">
            <p>
              <span className="font-bold text-ink-700">NominaPro VE</span> · Gestión de nómina Venezuela — demo
              interactiva de Asisnet. Datos simulados, sin validez fiscal.
            </p>
            <button
              onClick={resetearDemo}
              className="rounded-lg border border-ink-200 bg-white px-3 py-1.5 font-semibold text-ink-600 shadow-sm transition-colors hover:border-rosita-600/40 hover:text-rosita-600"
            >
              Resetear datos de demo
            </button>
          </footer>
        </main>
      </div>

      {/* Badge flotante */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setDrawerDemo(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-[11.5px] font-semibold text-white shadow-modal ring-1 ring-white/10 sm:bottom-5 sm:right-5"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-violetx-600">
          <Sparkles className="h-3 w-3 text-white" />
        </span>
        Modo Demo Interactiva · Asisnet
        <span className="tabular rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-brand-400">
          {empleados.length + recibos.length}
        </span>
      </motion.button>

      {/* Modales y drawers */}
      <EmployeeFormModal
        abierto={Boolean(modalEmpleado)}
        empleadoEditar={modalEmpleado && modalEmpleado.modo === 'editar' ? modalEmpleado.empleado : null}
        onCerrar={() => setModalEmpleado(null)}
        onGuardar={guardarEmpleado}
      />
      <ReceiptModal
        empleado={empleadoRecibo}
        tasa={tasa}
        abierto={Boolean(empleadoRecibo)}
        onCerrar={() => setEmpleadoRecibo(null)}
        yaDescargado={reciboGuardado}
        onDescargar={descargarRecibo}
      />
      <DemoDrawer
        abierto={drawerDemo}
        onCerrar={() => setDrawerDemo(false)}
        empleados={empleados}
        recibos={recibos}
        onEliminarEmpleado={eliminarEmpleado}
        onEliminarRecibo={(id) => {
          setRecibos((prev) => prev.filter((r) => r.id !== id))
          mostrarToast('Recibo eliminado del registro demo')
        }}
        onReset={resetearDemo}
        clave={CLAVE_UNICA}
      />
      <Toast toast={toast} />
    </div>
  )
}
