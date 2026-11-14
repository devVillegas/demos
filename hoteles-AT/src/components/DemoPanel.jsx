import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Trash2, ChevronDown, X, Wind } from "lucide-react";
import { formatDate, formatUSD } from "../lib/pricing";
import SmartImage from "./SmartImage";

export function DemoBadge({ onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-4 right-4 z-[60] flex items-center gap-2.5 border border-dorado/50 bg-esmeralda-950/90 py-2.5 pl-4 pr-5 shadow-float backdrop-blur"
      aria-haspopup="dialog"
      aria-label="Abrir visor de datos de demo"
    >
      <Wind className="h-4 w-4 text-dorado" aria-hidden="true" />
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-label text-arena-300/70">
          Modo Demo Interactiva
        </span>
        <span className="block text-[11px] font-medium tracking-[0.12em] text-arena-100">
          • Asisnet
        </span>
      </span>
    </motion.button>
  );
}

export function ReservationsDrawer({ open, onClose, reservations, onCancel }) {
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[75] bg-esmeralda-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[76] flex w-full max-w-md flex-col bg-esmeralda-950 shadow-float"
            role="dialog"
            aria-modal="true"
            aria-label="Mis reservas demo"
          >
            <header className="flex items-center justify-between border-b border-arena-200/15 px-6 py-5">
              <div>
                <p className="label-caps">Modo Demo Interactiva</p>
                <h3 className="mt-1 font-display text-2xl text-arena-50">
                  Mis reservas demo
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="border border-arena-200/25 p-2 text-arena-100 transition-colors hover:border-dorado hover:text-dorado"
                aria-label="Cerrar panel"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {reservations.length === 0 ? (
                <div className="mt-10 flex flex-col items-center px-4 text-center">
                  <CalendarDays
                    className="h-10 w-10 text-arena-300/40"
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-display text-xl text-arena-100">
                    No hay reservas guardadas
                  </p>
                  <p className="mt-2 text-[13px] text-arena-200/60">
                    Las reservas que confirmes se guardan al instante en este
                    navegador (clave local <span className="font-mono">asisnet_demo_hoteles</span>)
                    y aparecen aquí y en la sección «Mis reservas».
                  </p>
                  <a
                    href="#suites"
                    onClick={onClose}
                    className="btn-gold mt-6 text-[11px]"
                  >
                    Explorar suites
                  </a>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {reservations.map((res) => (
                      <motion.li
                        key={res.id}
                        layout
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="border border-arena-200/15 bg-esmeralda-900/50"
                      >
                        <div className="flex gap-3 p-3.5">
                          <SmartImage
                            src={res.suiteImage}
                            alt={res.suiteName}
                            className="h-16 w-20 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[10px] tracking-[0.18em] text-dorado">
                              {res.code}
                            </p>
                            <p className="truncate font-display text-[17px] text-arena-100">
                              {res.suiteName}
                            </p>
                            <p className="text-[11px] text-arena-200/60">
                              {formatDate(res.checkIn)} → {formatDate(res.checkOut)} ·{" "}
                              {res.nights} {res.nights === 1 ? "noche" : "noches"}
                            </p>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <span className="font-display text-lg text-dorado-light">
                              {formatUSD(res.breakdown.total)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpanded((id) => (id === res.id ? null : res.id))
                                }
                                className="border border-arena-200/25 p-1.5 text-arena-200 transition-colors hover:border-dorado hover:text-dorado"
                                aria-label="Ver detalle"
                                aria-expanded={expanded === res.id}
                              >
                                <ChevronDown
                                  className={`h-3.5 w-3.5 transition-transform ${
                                    expanded === res.id ? "rotate-180" : ""
                                  }`}
                                  aria-hidden="true"
                                />
                              </button>
                              <button
                                type="button"
                                onClick={() => onCancel(res.id)}
                                className="border border-arena-200/25 p-1.5 text-arena-200 transition-colors hover:border-red-400 hover:text-red-400"
                                aria-label={`Cancelar reserva ${res.code}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence initial={false}>
                          {expanded === res.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <dl className="space-y-1.5 border-t border-arena-200/10 px-4 py-3.5 text-[12px]">
                                <div className="flex justify-between">
                                  <dt className="text-arena-200/55">Tarifa × noches</dt>
                                  <dd className="text-arena-100">
                                    {formatUSD(res.breakdown.room)}
                                  </dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-arena-200/55">Desayuno</dt>
                                  <dd className="text-arena-100">
                                    {res.breakfast
                                      ? formatUSD(res.breakdown.breakfast)
                                      : "No incluido"}
                                  </dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-arena-200/55">IVA hospedaje (16%)</dt>
                                  <dd className="text-arena-100">
                                    {formatUSD(res.breakdown.iva)}
                                  </dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-arena-200/55">Huésped</dt>
                                  <dd className="text-arena-100">{res.guest.name}</dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-arena-200/55">Contacto</dt>
                                  <dd className="truncate text-arena-100">
                                    {res.guest.email} · {res.guest.phone}
                                  </dd>
                                </div>
                                <div className="flex justify-between">
                                  <dt className="text-arena-200/55">Huéspedes</dt>
                                  <dd className="text-arena-100">{res.guests}</dd>
                                </div>
                              </dl>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <footer className="border-t border-arena-200/15 px-6 py-4">
              <p className="text-center text-[10px] uppercase tracking-label text-arena-300/50">
                Datos guardados solo en tu navegador · Demo Asisnet
              </p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
