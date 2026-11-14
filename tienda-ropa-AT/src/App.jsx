import { useState, useCallback } from 'react'
import Marquee from './components/Marquee.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Lookbook from './components/Lookbook.jsx'
import Tienda from './components/Tienda.jsx'
import Manifesto from './components/Manifesto.jsx'
import Footer from './components/Footer.jsx'
import QuickView from './components/QuickView.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import OrdersDrawer from './components/OrdersDrawer.jsx'
import DemoBadge from './components/DemoBadge.jsx'
import Toast from './components/Toast.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'

const CLAVE_DEMO = 'asisnet_demo_tienda_ropa'

export default function App() {
  // El carrito vive en memoria; los pedidos finalizados se persisten en la clave única de la demo.
  const [carrito, setCarrito] = useState([])
  const [pedidos, setPedidos] = useLocalStorage(CLAVE_DEMO, [])

  const [quickView, setQuickView] = useState(null)
  const [cartAbierto, setCartAbierto] = useState(false)
  const [pedidosAbierto, setPedidosAbierto] = useState(false)
  const [toast, setToast] = useState(null)

  const mostrarToast = useCallback((mensaje) => {
    setToast(mensaje)
    setTimeout(() => setToast(null), 2800)
  }, [])

  const abrirQuickView = useCallback((producto) => {
    setQuickView(producto)
  }, [])

  const añadirAlCarrito = useCallback((producto, talla, cantidad) => {
    const key = `${producto.id}-${talla}`
    setCarrito((prev) => {
      const existente = prev.find((it) => it.key === key)
      if (existente) {
        return prev.map((it) =>
          it.key === key ? { ...it, cantidad: Math.min(9, it.cantidad + cantidad) } : it,
        )
      }
      return [
        ...prev,
        {
          key,
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagenes[0],
          talla,
          cantidad,
        },
      ]
    })
    mostrarToast(`${producto.nombre} (T. ${talla}) añadido al carrito`)
  }, [mostrarToast])

  const actualizarCantidad = useCallback((key, delta) => {
    setCarrito((prev) =>
      prev
        .map((it) => (it.key === key ? { ...it, cantidad: it.cantidad + delta } : it))
        .filter((it) => it.cantidad > 0),
    )
  }, [])

  const eliminarDelCarrito = useCallback((key) => {
    setCarrito((prev) => prev.filter((it) => it.key !== key))
  }, [])

  const finalizarPedido = useCallback((orden) => {
    setPedidos((prev) => [orden, ...prev])
    setCarrito([])
    mostrarToast(`Pedido ${orden.id} guardado en la demo ✓`)
  }, [setPedidos, mostrarToast])

  const eliminarPedido = useCallback(
    (id) => {
      setPedidos((prev) => prev.filter((p) => p.id !== id))
      mostrarToast('Pedido eliminado de la demo')
    },
    [setPedidos, mostrarToast],
  )

  const resetearDemo = useCallback(() => {
    try {
      window.localStorage.removeItem(CLAVE_DEMO)
    } catch (error) {
      console.warn('No se pudo resetear la demo:', error)
    }
    window.location.reload()
  }, [])

  const cartCount = carrito.reduce((s, it) => s + it.cantidad, 0)

  return (
    <div className="min-h-screen bg-bone text-ink">
      <Marquee />
      <Nav cartCount={cartCount} onOpenCart={() => setCartAbierto(true)} />

      <main>
        <Hero />
        <Tienda onQuickView={abrirQuickView} />
        <Lookbook />
        <Manifesto />
      </main>

      <Footer onReset={resetearDemo} />

      <QuickView
        producto={quickView}
        onClose={() => setQuickView(null)}
        onAddToCart={(p, talla, cantidad) => añadirAlCarrito(p, talla, cantidad)}
      />

      <CartDrawer
        abierto={cartAbierto}
        items={carrito}
        onClose={() => setCartAbierto(false)}
        onUpdateCantidad={actualizarCantidad}
        onRemove={eliminarDelCarrito}
        onFinishOrder={finalizarPedido}
      />

      <OrdersDrawer
        abierto={pedidosAbierto}
        pedidos={pedidos}
        onClose={() => setPedidosAbierto(false)}
        onDelete={eliminarPedido}
      />

      <DemoBadge count={pedidos.length} onOpen={() => setPedidosAbierto(true)} />
      <Toast toast={toast} />
    </div>
  )
}
