import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, ArrowRight, ArrowLeft, Lock, CreditCard, CheckCircle2 } from 'lucide-react'
import { CIUDADES_VENEZUELA, GASTO_ENVIO_GRATIS } from '../data/mockData.js'

const pasos = ['cart', 'envio', 'pago', 'exito']

function formatoTarjeta(v) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatoExpira(v) {
  const d = v.replace(/\D/g, '').slice(0, 4)
  return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d
}

function ProgressBar({ subtotal }) {
  const pct = Math.min(100, (subtotal / GASTO_ENVIO_GRATIS) * 100)
  const falta = Math.max(0, GASTO_ENVIO_GRATIS - subtotal)
  return (
    <div className="border-b border-line px-6 py-4">
      <p className="mb-2 flex items-center gap-2 text-[12px] font-medium text-ink/70">
        <Truck size={14} className="text-ember" />
        {falta > 0 ? (
          <>
            Te faltan <span className="font-bold text-ember">${falta.toFixed(2)}</span> para envío gratis
          </>
        ) : (
          <span className="font-bold text-ember">¡Tienes envío gratis! 🎉</span>
        )}
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-ember"
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}

export default function CartDrawer({ abierto, items, onClose, onUpdateCantidad, onRemove, onFinishOrder }) {
  const [paso, setPaso] = useState('cart')
  const [envio, setEnvio] = useState({ nombre: '', email: '', direccion: '', ciudad: 'Caracas' })
  const [tarjeta, setTarjeta] = useState({ numero: '', titular: '', expira: '', cvc: '' })
  const [errores, setErrores] = useState({})
  const [ordenFinal, setOrdenFinal] = useState(null)

  const subtotal = items.reduce((s, it) => s + it.precio * it.cantidad, 0)
  const costoEnvio = subtotal >= GASTO_ENVIO_GRATIS || subtotal === 0 ? 0 : 5.5
  const total = subtotal + costoEnvio

  useEffect(() => {
    if (!abierto) {
      const t = setTimeout(() => {
        setPaso('cart')
        setErrores({})
        setOrdenFinal(null)
      }, 350)
      return () => clearTimeout(t)
    }
  }, [abierto])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const validarEnvio = () => {
    const e = {}
    if (!envio.nombre.trim()) e.nombre = 'Ingresa tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(envio.email)) e.email = 'Ingresa un email válido'
    if (!envio.direccion.trim()) e.direccion = 'Ingresa tu dirección'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const validarPago = () => {
    const e = {}
    if (tarjeta.numero.replace(/\s/g, '').length !== 16) e.numero = 'La tarjeta debe tener 16 dígitos'
    if (!tarjeta.titular.trim()) e.titular = 'Ingresa el titular de la tarjeta'
    if (!/^\d{2}\/\d{2}$/.test(tarjeta.expira)) e.expira = 'Formato MM/AA'
    if (tarjeta.cvc.length !== 3) e.cvc = '3 dígitos'
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const confirmarPago = () => {
    if (!validarPago()) return
    const orden = {
      id: 'AT23-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      fecha: new Date().toISOString(),
      cliente: { ...envio },
      items: items.map((it) => ({ id: it.id, nombre: it.nombre, talla: it.talla, cantidad: it.cantidad, precio: it.precio })),
      subtotal,
      envio: costoEnvio,
      total,
    }
    setOrdenFinal(orden)
    onFinishOrder(orden)
    setPaso('exito')
  }

  const campo = (key) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[14px] outline-none transition-colors placeholder:text-ink/35 ${
      errores[key] ? 'border-ember' : 'border-line focus:border-ink'
    }`

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 33 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-bone shadow-2xl sm:max-w-lg"
            role="dialog"
            aria-label="Carrito de compras"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-2xl font-semibold">
                {paso === 'cart' && 'Tu carrito'}
                {paso === 'envio' && 'Datos de envío'}
                {paso === 'pago' && 'Pago simulado'}
                {paso === 'exito' && 'Pedido confirmado'}
              </h2>
              <button
                onClick={onClose}
                aria-label="Cerrar carrito"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-line"
              >
                <X size={18} />
              </button>
            </div>

            {paso !== 'exito' && items.length > 0 && paso === 'cart' && <ProgressBar subtotal={subtotal} />}

            {/* PASO: CARRITO */}
            {paso === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-line">
                        <ShoppingBag size={24} className="text-ink/40" />
                      </div>
                      <p className="mt-5 font-display text-2xl font-semibold">Tu carrito está vacío</p>
                      <p className="mt-2 text-[14px] text-ink/55">Explora la colección y encuentra tu próxima pieza favorita.</p>
                      <button
                        onClick={onClose}
                        className="mt-6 rounded-full bg-ink px-6 py-3 text-[11px] font-bold uppercase tracking-widest2 text-bone transition-colors hover:bg-ember"
                      >
                        Ver la tienda
                      </button>
                    </div>
                  ) : (
                    <ul className="flex flex-col divide-y divide-line">
                      <AnimatePresence initial={false}>
                        {items.map((it) => (
                          <motion.li
                            key={it.key}
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, x: 40, height: 0 }}
                            transition={{ duration: 0.28 }}
                            className="flex gap-4 overflow-hidden py-4"
                          >
                            <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-line">
                              <img
                                src={it.imagen}
                                alt={it.nombre}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                  e.currentTarget.parentElement.classList.add('img-fallback')
                                }}
                              />
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="font-display text-[15px] font-semibold leading-snug">{it.nombre}</p>
                                  <p className="mt-0.5 text-[12px] text-ink/55">Talla {it.talla}</p>
                                </div>
                                <p className="font-display font-bold">${(it.precio * it.cantidad).toFixed(2)}</p>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-2">
                                <div className="flex items-center rounded-full border border-line">
                                  <button
                                    onClick={() => onUpdateCantidad(it.key, -1)}
                                    aria-label="Reducir cantidad"
                                    className="flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-line"
                                  >
                                    <Minus size={13} />
                                  </button>
                                  <span className="w-7 text-center text-[13px] font-bold">{it.cantidad}</span>
                                  <button
                                    onClick={() => onUpdateCantidad(it.key, 1)}
                                    aria-label="Aumentar cantidad"
                                    className="flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-line"
                                  >
                                    <Plus size={13} />
                                  </button>
                                </div>
                                <button
                                  onClick={() => onRemove(it.key)}
                                  aria-label="Eliminar del carrito"
                                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ember hover:text-white"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-line px-6 py-5">
                    <div className="mb-1 flex justify-between text-[14px] text-ink/70">
                      <span>Subtotal</span>
                      <span className="font-semibold text-ink">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="mb-4 flex justify-between text-[14px] text-ink/70">
                      <span>Envío</span>
                      <span className="font-semibold text-ink">
                        {costoEnvio === 0 ? 'Gratis' : `$${costoEnvio.toFixed(2)}`}
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaso('envio')}
                      className="flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-[12px] font-bold uppercase tracking-widest2 text-bone transition-colors hover:bg-ember"
                    >
                      Finalizar compra <ArrowRight size={15} />
                    </motion.button>
                  </div>
                )}
              </>
            )}

            {/* PASO: ENVÍO */}
            {paso === 'envio' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Nombre completo</label>
                      <input
                        className={campo('nombre')}
                        placeholder="Ana Rodríguez"
                        value={envio.nombre}
                        onChange={(e) => setEnvio({ ...envio, nombre: e.target.value })}
                      />
                      {errores.nombre && <p className="mt-1 text-[12px] font-medium text-ember">{errores.nombre}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Email</label>
                      <input
                        type="email"
                        className={campo('email')}
                        placeholder="ana@correo.com"
                        value={envio.email}
                        onChange={(e) => setEnvio({ ...envio, email: e.target.value })}
                      />
                      {errores.email && <p className="mt-1 text-[12px] font-medium text-ember">{errores.email}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Dirección</label>
                      <input
                        className={campo('direccion')}
                        placeholder="Av. Principal, Edificio A, Apto 4-B"
                        value={envio.direccion}
                        onChange={(e) => setEnvio({ ...envio, direccion: e.target.value })}
                      />
                      {errores.direccion && <p className="mt-1 text-[12px] font-medium text-ember">{errores.direccion}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Ciudad (Venezuela)</label>
                      <select
                        className={campo('ciudad')}
                        value={envio.ciudad}
                        onChange={(e) => setEnvio({ ...envio, ciudad: e.target.value })}
                      >
                        {CIUDADES_VENEZUELA.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="flex items-start gap-2 rounded-xl bg-line/60 p-3 text-[12px] leading-relaxed text-ink/60">
                      <Lock size={14} className="mt-0.5 shrink-0 text-ember" />
                      Demo interactiva: estos datos no salen de tu navegador. Ningún pago real será procesado.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-line px-6 py-5">
                  <button
                    onClick={() => setPaso('cart')}
                    className="flex items-center gap-2 rounded-full border border-line px-5 py-4 text-[11px] font-bold uppercase tracking-widest2 transition-colors hover:border-ink"
                  >
                    <ArrowLeft size={14} /> Volver
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => validarEnvio() && setPaso('pago')}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink py-4 text-[12px] font-bold uppercase tracking-widest2 text-bone transition-colors hover:bg-ember"
                  >
                    Continuar al pago <ArrowRight size={14} />
                  </motion.button>
                </div>
              </>
            )}

            {/* PASO: PAGO */}
            {paso === 'pago' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: [0, 8, 0] }}
                    transition={{ duration: 0.9, ease: 'easeInOut' }}
                    className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-ink via-[#1d1d1d] to-ink p-5 text-bone"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-display text-lg font-bold">ATELIER 23</span>
                      <CreditCard size={22} className="text-ember" />
                    </div>
                    <p className="mt-6 font-mono text-lg tracking-[0.18em]">
                      {tarjeta.numero || '•••• •••• •••• ••••'}
                    </p>
                    <div className="mt-5 flex justify-between text-[11px] uppercase tracking-widest2 text-bone/70">
                      <span>{tarjeta.titular || 'Titular'}</span>
                      <span>{tarjeta.expira || 'MM/AA'}</span>
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Número de tarjeta</label>
                      <input
                        inputMode="numeric"
                        placeholder="4242 4242 4242 4242"
                        className={campo('numero')}
                        value={tarjeta.numero}
                        onChange={(e) => setTarjeta({ ...tarjeta, numero: formatoTarjeta(e.target.value) })}
                      />
                      {errores.numero && <p className="mt-1 text-[12px] font-medium text-ember">{errores.numero}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Titular de la tarjeta</label>
                      <input
                        className={campo('titular')}
                        placeholder="Como aparece en la tarjeta"
                        value={tarjeta.titular}
                        onChange={(e) => setTarjeta({ ...tarjeta, titular: e.target.value })}
                      />
                      {errores.titular && <p className="mt-1 text-[12px] font-medium text-ember">{errores.titular}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Expira</label>
                        <input
                          inputMode="numeric"
                          placeholder="MM/AA"
                          className={campo('expira')}
                          value={tarjeta.expira}
                          onChange={(e) => setTarjeta({ ...tarjeta, expira: formatoExpira(e.target.value) })}
                        />
                        {errores.expira && <p className="mt-1 text-[12px] font-medium text-ember">{errores.expira}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest2 text-stone2">CVC</label>
                        <input
                          inputMode="numeric"
                          placeholder="123"
                          maxLength={3}
                          className={campo('cvc')}
                          value={tarjeta.cvc}
                          onChange={(e) => setTarjeta({ ...tarjeta, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        />
                        {errores.cvc && <p className="mt-1 text-[12px] font-medium text-ember">{errores.cvc}</p>}
                      </div>
                    </div>
                    <div className="rounded-xl border border-line p-4 text-[14px]">
                      <div className="flex justify-between text-ink/70">
                        <span>Total a pagar</span>
                        <span className="font-display text-xl font-bold text-ember">${total.toFixed(2)}</span>
                      </div>
                      <p className="mt-1 text-[12px] text-ink/45">Envío a {envio.ciudad}, Venezuela · {envio.direccion}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-line px-6 py-5">
                  <button
                    onClick={() => setPaso('envio')}
                    className="flex items-center gap-2 rounded-full border border-line px-5 py-4 text-[11px] font-bold uppercase tracking-widest2 transition-colors hover:border-ink"
                  >
                    <ArrowLeft size={14} /> Volver
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmarPago}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ember py-4 text-[12px] font-bold uppercase tracking-widest2 text-white transition-colors hover:bg-ink"
                  >
                    <Lock size={14} /> Pagar ${total.toFixed(2)}
                  </motion.button>
                </div>
              </>
            )}

            {/* PASO: ÉXITO */}
            {paso === 'exito' && ordenFinal && (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-ember/10 text-ember"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="mt-6 font-display text-3xl font-semibold">¡Gracias, {ordenFinal.cliente.nombre.split(' ')[0]}!</h3>
                <p className="mt-2 max-w-xs text-[14px] text-ink/60">
                  Tu pedido está confirmado. Este es un demo: no se cobró nada real.
                </p>
                <div className="mt-6 w-full rounded-2xl border border-line bg-white p-5 text-left">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-widest2 text-stone2">N° de orden</span>
                    <span className="font-display text-lg font-bold text-ember">{ordenFinal.id}</span>
                  </div>
                  <ul className="mt-3 flex flex-col gap-2 text-[13px]">
                    {ordenFinal.items.map((it, i) => (
                      <li key={i} className="flex justify-between text-ink/70">
                        <span>
                          {it.cantidad}× {it.nombre} <span className="text-ink/40">(T. {it.talla})</span>
                        </span>
                        <span className="font-semibold text-ink">${(it.precio * it.cantidad).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex justify-between border-t border-line pt-3 text-[14px] font-bold">
                    <span>Total</span>
                    <span>${ordenFinal.total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="mt-7 rounded-full bg-ink px-8 py-4 text-[12px] font-bold uppercase tracking-widest2 text-bone transition-colors hover:bg-ember"
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
