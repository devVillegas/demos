import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Package, ChevronDown, Database } from 'lucide-react'

function PedidoItem({ pedido, onDelete, abierto, onToggle }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-2xl border border-line bg-white"
    >
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <div>
          <p className="font-display text-lg font-bold">{pedido.id}</p>
          <p className="text-[12px] text-ink/50">
            {new Date(pedido.fecha).toLocaleDateString('es-VE', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}{' '}
            · {pedido.items.length} {pedido.items.length === 1 ? 'pieza' : 'piezas'} · ${pedido.total.toFixed(2)}
          </p>
        </div>
        <motion.span animate={{ rotate: abierto ? 180 : 0 }} transition={{ duration: 0.25 }} className="text-ink/40">
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line px-5 py-4">
              <ul className="flex flex-col gap-2 text-[13px]">
                {pedido.items.map((it, i) => (
                  <li key={i} className="flex justify-between text-ink/70">
                    <span>
                      {it.cantidad}× {it.nombre} <span className="text-ink/40">(T. {it.talla})</span>
                    </span>
                    <span className="font-semibold text-ink">${(it.precio * it.cantidad).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-line pt-3 text-[12px] text-ink/55">
                <p>
                  <span className="font-semibold text-ink">Envío a:</span> {pedido.cliente.nombre} · {pedido.cliente.ciudad}, Venezuela
                </p>
                <p className="mt-0.5">{pedido.cliente.direccion} · {pedido.cliente.email}</p>
              </div>
              <button
                onClick={() => onDelete(pedido.id)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-ember/30 py-2.5 text-[12px] font-bold uppercase tracking-widest2 text-ember transition-colors hover:bg-ember hover:text-white"
              >
                <Trash2 size={14} /> Eliminar este pedido
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function OrdersDrawer({ abierto, pedidos, onClose, onDelete }) {
  const [abiertoId, setAbiertoId] = useState(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {abierto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-3xl bg-bone shadow-2xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none sm:rounded-l-3xl"
            role="dialog"
            aria-label="Mis pedidos demo"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <h2 className="font-display text-2xl font-semibold">Mis pedidos demo</h2>
                <p className="flex items-center gap-1.5 text-[12px] text-ink/50">
                  <Database size={12} className="text-ember" /> Guardados en localStorage de este navegador
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar pedidos"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-line"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {pedidos.length === 0 ? (
                <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-line">
                    <Package size={24} className="text-ink/40" />
                  </div>
                  <p className="mt-5 font-display text-2xl font-semibold">Aún no hay pedidos</p>
                  <p className="mt-2 max-w-[240px] text-[14px] text-ink/55">
                    Finaliza una compra en la tienda y aparecerá aquí, guardada bajo la clave <code className="rounded bg-line px-1.5 py-0.5 text-[12px]">asisnet_demo_tienda_ropa</code>.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  <AnimatePresence initial={false}>
                    {pedidos.map((p) => (
                      <PedidoItem
                        key={p.id}
                        pedido={p}
                        abierto={abiertoId === p.id}
                        onToggle={() => setAbiertoId(abiertoId === p.id ? null : p.id)}
                        onDelete={onDelete}
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
