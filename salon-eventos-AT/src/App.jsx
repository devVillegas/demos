import { useState, useCallback } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SalonesTour from "./components/SalonesTour"
import Calculadora from "./components/Calculadora"
import FormularioReserva from "./components/FormularioReserva"
import Galeria from "./components/Galeria"
import Testimonios from "./components/Testimonios"
import Footer from "./components/Footer"
import BadgeFlotante from "./components/BadgeFlotante"
import DrawerMisSolicitudes from "./components/DrawerMisSolicitudes"
import Toast from "./components/Toast"
import { useLocalStorage } from "./hooks/useLocalStorage"
import { STORAGE_KEY, salones, tiposEvento } from "./data/mockData"

export default function App() {
  const [solicitudes, setSolicitudes, limpiarSolicitudes] = useLocalStorage(STORAGE_KEY, [])
  const [drawerAbierto, setDrawerAbierto] = useState(false)
  const [toast, setToast] = useState(null)
  const [salonSeleccionado, setSalonSeleccionado] = useState("cristal")
  const [configCalculadora, setConfigCalculadora] = useState({
    tipoEvento: "boda",
    salonId: "cristal",
    invitados: 120,
    duracionHoras: 6,
    extrasSel: ["banquete", "dj", "foto"],
  })
  const [presupuesto, setPresupuesto] = useState({
    salon: salones[0],
    tipo: tiposEvento[0],
    lineas: [],
    subtotal: 0,
    descuentoPct: 0,
    descuento: 0,
    total: 0,
    invitados: 120,
    duracionHoras: 6,
  })

  const mostrarToast = useCallback((mensaje) => setToast(mensaje), [])
  const registrarPresupuesto = useCallback((p) => setPresupuesto(p), [])

  const seleccionarSalon = useCallback((id) => {
    setSalonSeleccionado(id)
    setConfigCalculadora((c) => ({ ...c, salonId: id }))
    const salon = salones.find((s) => s.id === id)
    if (salon) {
      mostrarToast(`${salon.nombre} cargado en la calculadora`)
    }
  }, [mostrarToast])

  const guardarSolicitud = useCallback(
    (solicitud) => {
      setSolicitudes((prev) => [solicitud, ...prev])
      mostrarToast(`Solicitud ${solicitud.id} guardada en la demo`)
    },
    [setSolicitudes, mostrarToast],
  )

  const eliminarSolicitud = useCallback(
    (id) => {
      setSolicitudes((prev) => prev.filter((s) => s.id !== id))
      mostrarToast("Solicitud eliminada")
    },
    [setSolicitudes, mostrarToast],
  )

  const resetearDemo = useCallback(() => {
    limpiarSolicitudes()
    window.location.reload()
  }, [limpiarSolicitudes])

  return (
    <div className="min-h-screen bg-ink text-neutral-200">
      <Navbar />

      <main>
        <Hero />
        <SalonesTour seleccionado={salonSeleccionado} onSeleccionar={seleccionarSalon} />
        <Calculadora
          config={configCalculadora}
          setConfig={setConfigCalculadora}
          onPresupuesto={registrarPresupuesto}
        />
        <FormularioReserva
          presupuesto={presupuesto}
          solicitudes={solicitudes}
          onGuardar={guardarSolicitud}
        />
        <Galeria />
        <Testimonios />
      </main>

      <Footer onReset={resetearDemo} />

      <BadgeFlotante cantidad={solicitudes.length} onAbrir={() => setDrawerAbierto(true)} />
      <DrawerMisSolicitudes
        abierto={drawerAbierto}
        solicitudes={solicitudes}
        onCerrar={() => setDrawerAbierto(false)}
        onEliminar={eliminarSolicitud}
      />
      <Toast toast={toast} onCerrar={() => setToast(null)} />
    </div>
  )
}
