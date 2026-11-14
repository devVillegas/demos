import { useCallback, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Menu from "./components/Menu.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Reservation from "./components/Reservation.jsx";
import ChefSection from "./components/ChefSection.jsx";
import InfoSection from "./components/InfoSection.jsx";
import Footer from "./components/Footer.jsx";
import DemoBadge from "./components/DemoBadge.jsx";
import Toast from "./components/Toast.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

export const DEMO_KEY = "asisnet_demo_restaurante";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [demoData, setDemoData] = useLocalStorage(DEMO_KEY, {
    pedidos: [],
    reservas: [],
  });

  const showToast = useCallback((mensaje, tipo = "exito") => {
    setToast({ mensaje, tipo, id: Date.now() });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const addToCart = useCallback((plato) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === plato.id);
      if (existente) {
        return prev.map((item) =>
          item.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...plato, cantidad: 1 }];
    });
  }, []);

  const updateCantidad = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }, []);

  const quitarDelCarrito = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => setCart([]), []);

  const confirmarPedido = useCallback(
    (pedido) => {
      setDemoData((prev) => ({ ...prev, pedidos: [pedido, ...prev.pedidos] }));
      vaciarCarrito();
      showToast(`Pedido ${pedido.numero} confirmado — demo guardada localmente`);
    },
    [setDemoData, showToast, vaciarCarrito]
  );

  const confirmarReserva = useCallback(
    (reserva) => {
      setDemoData((prev) => ({
        ...prev,
        reservas: [reserva, ...prev.reservas],
      }));
      showToast(`Mesa reservada para ${reserva.personas} — demo guardada`);
    },
    [setDemoData, showToast]
  );

  const eliminarPedido = useCallback(
    (numero) => {
      setDemoData((prev) => ({
        ...prev,
        pedidos: prev.pedidos.filter((p) => p.numero !== numero),
      }));
      showToast("Pedido demo eliminado", "info");
    },
    [setDemoData, showToast]
  );

  const eliminarReserva = useCallback(
    (id) => {
      setDemoData((prev) => ({
        ...prev,
        reservas: prev.reservas.filter((r) => r.id !== id),
      }));
      showToast("Reserva demo eliminada", "info");
    },
    [setDemoData, showToast]
  );

  const resetearDemo = useCallback(() => {
    try {
      window.localStorage.removeItem(DEMO_KEY);
    } catch {
      /* sin acceso a almacenamiento: recarga igual */
    }
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink overflow-x-hidden">
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.cantidad, 0)}
        onOpenCart={() => setCartOpen(true)}
      />

      <main>
        <Hero />
        <Menu onAdd={addToCart} />
        <ChefSection />
        <Reservation onReservar={confirmarReserva} />
        <InfoSection />
      </main>

      <Footer onResetDemo={resetearDemo} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateCantidad={updateCantidad}
        onQuitar={quitarDelCarrito}
        onVaciar={vaciarCarrito}
        onConfirmarPedido={confirmarPedido}
        showToast={showToast}
      />

      <DemoBadge
        pedidos={demoData.pedidos}
        reservas={demoData.reservas}
        onEliminarPedido={eliminarPedido}
        onEliminarReserva={eliminarReserva}
        onResetDemo={resetearDemo}
      />

      <Toast toast={toast} />
    </div>
  );
}
