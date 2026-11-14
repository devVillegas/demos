import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Bike,
  Store,
  CheckCircle2,
  Clock,
  CreditCard,
} from "lucide-react";
import {
  COSTO_DELIVERY,
  UMBRAL_DELIVERY_GRATIS,
  HORAS_RETIRO,
  METODOS_PAGO,
} from "../data/mockData.js";

const pasoVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
};

export default function CartDrawer({
  open,
  onClose,
  cart,
  onUpdateCantidad,
  onQuitar,
  onVaciar,
  onConfirmarPedido,
  showToast,
}) {
  const [modo, setModo] = useState("delivery");
  const [paso, setPaso] = useState("carrito");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    horaRetiro: "14:00",
    pago: "Efectivo",
  });

  const subtotal = cart.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
  const costoEnvio =
    modo === "delivery" ? (subtotal >= UMBRAL_DELIVERY_GRATIS ? 0 : COSTO_DELIVERY) : 0;
  const total = subtotal + costoEnvio;

  useEffect(() => {
    if (open) {
      setPaso("carrito");
      setPedidoConfirmado(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  const valido = () => {
    if (!form.nombre.trim() || !form.telefono.trim()) return false;
    if (modo === "delivery" && !form.direccion.trim()) return false;
    return cart.length > 0;
  };

  const confirmar = () => {
    if (!valido()) {
      showToast("Completa nombre, teléfono y datos de entrega", "info");
      return;
    }
    const pedido = {
      numero: `BRM-${Date.now().toString().slice(-6)}`,
      fecha: new Date().toISOString(),
      modo,
      items: cart.map((it) => ({
        nombre: it.nombre,
        precio: it.precio,
        cantidad: it.cantidad,
      })),
      subtotal: Number(subtotal.toFixed(2)),
      envio: costoEnvio,
      total: Number(total.toFixed(2)),
      cliente: {
        nombre: form.nombre.trim(),
        telefono: form.telefono.trim(),
        direccion: modo === "delivery" ? form.direccion.trim() : null,
        horaRetiro: modo === "pickup" ? form.horaRetiro : null,
        pago: form.pago,
      },
    };
    setPedidoConfirmado(pedido);
    setPaso("confirmado");
    onConfirmarPedido(pedido);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Tu pedido"
          >
            <div className="flex items-center justify-between px-6 py-5 bg-ink text-cream texture-dark">
              <h2 className="font-display text-2xl font-semibold flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-gold" />
                Tu pedido
              </h2>
              <button
                onClick={onClose}
                className="grid place-items-center w-9 h-9 rounded-full hover:bg-cream/10 transition-colors"
                aria-label="Cerrar"
              >
                <X size={19} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {paso === "carrito" && (
                  <motion.div key="paso-carrito" variants={pasoVariants} initial="hidden" animate="visible" exit="exit" className="p-6 flex flex-col gap-4">
                    {cart.length === 0 ? (
                      <div className="py-20 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-wine/10 grid place-items-center mb-4">
                          <ShoppingBag size={26} className="text-wine" />
                        </div>
                        <p className="font-display text-xl font-semibold">Tu pedido está vacío</p>
                        <p className="text-sm text-ink-muted mt-2">
                          Explora la carta y añade tus platos favoritos.
                        </p>
                      </div>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="flex gap-3.5 rounded-2xl bg-white p-3.5 shadow-sm"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-wine to-gold grid place-items-center">
                              <span className="text-cream font-display font-bold text-lg">
                                {item.nombre.slice(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-semibold text-sm leading-snug">{item.nombre}</h4>
                                <button
                                  onClick={() => onQuitar(item.id)}
                                  className="text-ink-muted hover:text-red-600 transition-colors shrink-0"
                                  aria-label={`Quitar ${item.nombre}`}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                              <p className="text-xs text-ink-muted mt-0.5">${item.precio.toFixed(2)} c/u</p>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2.5 rounded-full bg-cream-dark px-1.5 py-1">
                                  <button
                                    onClick={() => onUpdateCantidad(item.id, -1)}
                                    className="grid place-items-center w-6 h-6 rounded-full bg-white shadow-sm hover:bg-wine hover:text-cream transition-colors"
                                    aria-label="Quitar uno"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="text-sm font-bold w-4 text-center">{item.cantidad}</span>
                                  <button
                                    onClick={() => onUpdateCantidad(item.id, 1)}
                                    className="grid place-items-center w-6 h-6 rounded-full bg-white shadow-sm hover:bg-wine hover:text-cream transition-colors"
                                    aria-label="Agregar uno"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                                <span className="font-display font-bold text-wine">
                                  ${(item.precio * item.cantidad).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        <button
                          onClick={onVaciar}
                          className="self-start text-xs font-medium text-ink-muted hover:text-red-600 underline underline-offset-2 transition-colors"
                        >
                          Vaciar pedido
                        </button>

                        <div className="mt-2">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted mb-2.5">
                            Modo de entrega
                          </p>
                          <div className="grid grid-cols-2 gap-2.5">
                            <button
                              onClick={() => setModo("delivery")}
                              className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border-2 transition-all duration-300 ${
                                modo === "delivery"
                                  ? "border-wine bg-wine/8 shadow-sm"
                                  : "border-ink/10 bg-white hover:border-wine/40"
                              }`}
                            >
                              <Bike size={20} className={modo === "delivery" ? "text-wine" : "text-ink-muted"} />
                              <span className="text-sm font-semibold">Delivery</span>
                              <span className="text-[11px] text-ink-muted text-center leading-tight">
                                $3.00 · gratis desde ${UMBRAL_DELIVERY_GRATIS}
                              </span>
                            </button>
                            <button
                              onClick={() => setModo("pickup")}
                              className={`flex flex-col items-center gap-1.5 p-3.5 rounded-2xl border-2 transition-all duration-300 ${
                                modo === "pickup"
                                  ? "border-wine bg-wine/8 shadow-sm"
                                  : "border-ink/10 bg-white hover:border-wine/40"
                              }`}
                            >
                              <Store size={20} className={modo === "pickup" ? "text-wine" : "text-ink-muted"} />
                              <span className="text-sm font-semibold">Pickup</span>
                              <span className="text-[11px] text-ink-muted text-center leading-tight">
                                Retiro en local · sin costo
                              </span>
                            </button>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-ink text-cream p-5 texture-dark">
                          <div className="flex justify-between text-sm py-1">
                            <span className="text-cream/70">Subtotal</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm py-1">
                            <span className="text-cream/70">Envío</span>
                            <span className="font-semibold">
                              {costoEnvio === 0 ? "Gratis" : `$${costoEnvio.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="border-t border-cream/15 mt-2 pt-3 flex justify-between items-center">
                            <span className="font-display font-semibold text-lg">Total</span>
                            <span className="font-display font-bold text-2xl text-gold">
                              ${total.toFixed(2)}
                            </span>
                          </div>
                          {modo === "delivery" && subtotal < UMBRAL_DELIVERY_GRATIS && (
                            <p className="text-[11px] text-gold/90 mt-2.5 leading-snug">
                              Te faltan ${(UMBRAL_DELIVERY_GRATIS - subtotal).toFixed(2)} para
                              delivery gratis.
                            </p>
                          )}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setPaso("datos")}
                          className="w-full py-4 rounded-full bg-wine text-cream font-bold hover:bg-gold hover:text-ink transition-colors duration-300 shadow-dish"
                        >
                          Continuar con los datos
                        </motion.button>
                      </>
                    )}
                  </motion.div>
                )}

                {paso === "datos" && (
                  <motion.div key="paso-datos" variants={pasoVariants} initial="hidden" animate="visible" exit="exit" className="p-6 flex flex-col gap-4">
                    <h3 className="font-display text-xl font-semibold">Datos de {modo === "delivery" ? "entrega" : "retiro"}</h3>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Nombre</span>
                      <input
                        type="text"
                        value={form.nombre}
                        onChange={set("nombre")}
                        placeholder="Tu nombre completo"
                        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent transition"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Teléfono</span>
                      <input
                        type="tel"
                        value={form.telefono}
                        onChange={set("telefono")}
                        placeholder="+58 412 000 0000"
                        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent transition"
                      />
                    </label>

                    {modo === "delivery" ? (
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Dirección</span>
                        <input
                          type="text"
                          value={form.direccion}
                          onChange={set("direccion")}
                          placeholder="Calle, edificio, apartamento"
                          className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent transition"
                        />
                      </label>
                    ) : (
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Hora de retiro</span>
                        <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-wine transition">
                          <Clock size={16} className="text-wine shrink-0" />
                          <select
                            value={form.horaRetiro}
                            onChange={set("horaRetiro")}
                            className="w-full bg-transparent text-sm focus:outline-none cursor-pointer"
                          >
                            {HORAS_RETIRO.map((h) => (
                              <option key={h} value={h}>{h}</option>
                            ))}
                          </select>
                        </div>
                      </label>
                    )}

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">Método de pago</span>
                      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3 focus-within:ring-2 focus-within:ring-wine transition">
                        <CreditCard size={16} className="text-wine shrink-0" />
                        <select
                          value={form.pago}
                          onChange={set("pago")}
                          className="w-full bg-transparent text-sm focus:outline-none cursor-pointer"
                        >
                          {METODOS_PAGO.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      <span className="text-[11px] text-ink-muted mt-1.5 block">
                        Simulado para la demo — no se procesan pagos reales.
                      </span>
                    </label>

                    <div className="rounded-2xl bg-cream-dark p-4 flex justify-between items-center mt-1">
                      <span className="text-sm font-semibold">Total a pagar</span>
                      <span className="font-display font-bold text-xl text-wine">${total.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2.5 mt-1">
                      <button
                        onClick={() => setPaso("carrito")}
                        className="px-5 py-3.5 rounded-full border border-ink/20 font-semibold text-sm hover:bg-cream-dark transition-colors"
                      >
                        Volver
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={confirmar}
                        className="flex-1 py-3.5 rounded-full bg-wine text-cream font-bold text-sm hover:bg-gold hover:text-ink transition-colors duration-300 shadow-dish"
                      >
                        Confirmar pedido
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {paso === "confirmado" && pedidoConfirmado && (
                  <motion.div
                    key="paso-confirmado"
                    variants={pasoVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="p-6 flex flex-col items-center text-center py-14"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-wine grid place-items-center mb-6 shadow-dish"
                    >
                      <CheckCircle2 size={38} className="text-gold" />
                    </motion.div>
                    <h3 className="font-display text-3xl font-semibold">¡Pedido confirmado!</h3>
                    <p className="mt-3 text-ink-muted text-sm max-w-xs leading-relaxed">
                      Tu cocina de demo está encendida. Guardamos el pedido en
                      tu navegador para que lo revises cuando quieras.
                    </p>
                    <div className="mt-6 rounded-2xl bg-ink text-cream px-7 py-5 texture-dark w-full max-w-xs">
                      <p className="text-xs uppercase tracking-[0.25em] text-cream/60 mb-1">Número de pedido</p>
                      <p className="font-display text-2xl font-bold text-gold">{pedidoConfirmado.numero}</p>
                      <div className="mt-3 pt-3 border-t border-cream/15 text-sm space-y-1">
                        <p className="flex justify-between"><span className="text-cream/70">Modo</span><span className="font-semibold capitalize">{pedidoConfirmado.modo === "delivery" ? "Delivery" : "Pickup"}</span></p>
                        <p className="flex justify-between"><span className="text-cream/70">Pago</span><span className="font-semibold">{pedidoConfirmado.cliente.pago}</span></p>
                        <p className="flex justify-between"><span className="text-cream/70">Total</span><span className="font-semibold text-gold">${pedidoConfirmado.total.toFixed(2)}</span></p>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-8 px-8 py-3.5 rounded-full bg-wine text-cream font-bold text-sm hover:bg-gold hover:text-ink transition-colors duration-300"
                    >
                      Seguir navegando
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
