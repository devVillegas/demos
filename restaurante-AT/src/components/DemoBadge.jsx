import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  X,
  ShoppingBag,
  CalendarCheck,
  Trash2,
  Database,
  Package,
} from "lucide-react";

export default function DemoBadge({
  pedidos,
  reservas,
  onEliminarPedido,
  onEliminarReserva,
  onResetDemo,
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("pedidos");
  const total = pedidos.length + reservas.length;

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const fechaCorta = (iso) =>
    new Date(iso).toLocaleString("es-VE", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink/90 backdrop-blur text-cream text-xs font-semibold shadow-dish border border-gold/30 hover:border-gold transition-colors duration-300"
        aria-label="Abrir mis reservas y pedidos demo"
      >
        <Sparkles size={14} className="text-gold" />
        <span className="hidden sm:inline">Modo Demo Interactiva · Asisnet</span>
        <span className="sm:hidden">Demo · Asisnet</span>
        {total > 0 && (
          <motion.span
            key={total}
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            className="min-w-[19px] h-[19px] px-1 rounded-full bg-gold text-ink text-[10px] font-bold grid place-items-center"
          >
            {total}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="demo-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            />
            <motion.div
              key="demo-modal"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed z-[65] inset-x-4 bottom-4 sm:inset-x-0 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2 sm:mx-auto max-w-xl bg-cream rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
              role="dialog"
              aria-label="Mis reservas y pedidos demo"
            >
              <div className="flex items-center justify-between px-6 py-5 bg-ink text-cream texture-dark shrink-0">
                <div>
                  <h3 className="font-display text-xl font-semibold flex items-center gap-2.5">
                    <Database size={19} className="text-gold" />
                    Mis reservas y pedidos demo
                  </h3>
                  <p className="text-[11px] text-cream/55 mt-1">
                    Guardados localmente en la clave «asisnet_demo_restaurante»
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid place-items-center w-9 h-9 rounded-full hover:bg-cream/10 transition-colors"
                  aria-label="Cerrar visor"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex gap-2 px-6 pt-4 shrink-0">
                <button
                  onClick={() => setTab("pedidos")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    tab === "pedidos"
                      ? "bg-wine text-cream"
                      : "bg-cream-dark text-ink-muted hover:text-ink"
                  }`}
                >
                  <ShoppingBag size={14} />
                  Pedidos ({pedidos.length})
                </button>
                <button
                  onClick={() => setTab("reservas")}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    tab === "reservas"
                      ? "bg-wine text-cream"
                      : "bg-cream-dark text-ink-muted hover:text-ink"
                  }`}
                >
                  <CalendarCheck size={14} />
                  Reservas ({reservas.length})
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                <AnimatePresence mode="popLayout">
                  {tab === "pedidos" &&
                    (pedidos.length === 0 ? (
                      <motion.p
                        key="sin-pedidos"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-10 text-center text-sm text-ink-muted"
                      >
                        Aún no hay pedidos demo. Añade platos a tu carrito y
                        confirma uno para verlo aquí.
                      </motion.p>
                    ) : (
                      pedidos.map((p) => (
                        <motion.div
                          key={p.numero}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="rounded-2xl bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-display font-bold text-wine flex items-center gap-2">
                                <Package size={15} />
                                {p.numero}
                              </p>
                              <p className="text-[11px] text-ink-muted mt-0.5">
                                {fechaCorta(p.fecha)} · {p.modo === "delivery" ? "Delivery" : "Pickup"} · {p.cliente.nombre}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold">${p.total.toFixed(2)}</span>
                              <button
                                onClick={() => onEliminarPedido(p.numero)}
                                className="grid place-items-center w-8 h-8 rounded-full text-ink-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                                aria-label={`Eliminar pedido ${p.numero}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <ul className="mt-2.5 text-xs text-ink-muted space-y-0.5">
                            {p.items.map((it, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span>
                                  {it.cantidad}× {it.nombre}
                                </span>
                                <span>${(it.precio * it.cantidad).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))
                    ))}

                  {tab === "reservas" &&
                    (reservas.length === 0 ? (
                      <motion.p
                        key="sin-reservas"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-10 text-center text-sm text-ink-muted"
                      >
                        Aún no hay reservas demo. Completa el formulario de
                        reservación para crear una.
                      </motion.p>
                    ) : (
                      reservas.map((r) => (
                        <motion.div
                          key={r.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          className="rounded-2xl bg-white p-4 shadow-sm flex items-center justify-between gap-3"
                        >
                          <div>
                            <p className="font-semibold text-sm">
                              {r.fecha} · {r.hora} · {r.personas}{" "}
                              {r.personas === 1 ? "persona" : "personas"}
                            </p>
                            <p className="text-[11px] text-ink-muted mt-0.5">
                              {r.nombre} · {r.ocasion} · {r.telefono}
                            </p>
                          </div>
                          <button
                            onClick={() => onEliminarReserva(r.id)}
                            className="grid place-items-center w-8 h-8 rounded-full text-ink-muted hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                            aria-label="Eliminar reserva"
                          >
                            <Trash2 size={14} />
                          </button>
                        </motion.div>
                      ))
                    ))}
                </AnimatePresence>
              </div>

              <div className="shrink-0 border-t border-ink/10 px-6 py-4 flex items-center justify-between">
                <p className="text-[11px] text-ink-muted leading-snug max-w-[60%]">
                  Los datos solo viven en este navegador. Bórralos cuando
                  quieras desde aquí o desde el footer.
                </p>
                <button
                  onClick={onResetDemo}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={13} />
                  Resetear demo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
