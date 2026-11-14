import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Check } from 'lucide-react'
import { TALLAS } from '../data/mockData.js'

export default function QuickView({ producto, onClose, onAddToCart }) {
  const [talla, setTalla] = useState(null)
  const [error, setError] = useState(false)
  const [cantidad, setCantidad] = useState(1)
  const [imgIdx, setImgIdx] = useState(0)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (!producto) return
    setTalla(null)
    setError(false)
    setCantidad(1)
    setImgIdx(0)
    setAdded(false)
  }, [producto])

  const manejarAdd = () => {
    if (!talla) {
      setError(true)
      return
    }
    onAddToCart({ ...producto, imagen: producto.imagenes[0] }, talla, cantidad)
    setAdded(true)
    setTimeout(onClose, 700)
  }

  return (
    <AnimatePresence>
      {producto && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <motion.button
            aria-label="Cerrar vista rápida"
            onClick={onClose}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 60, scale: 0.98 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-bone sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-bone/90 backdrop-blur transition-colors hover:bg-ink hover:text-bone"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5] bg-line md:aspect-auto md:min-h-[560px]">
                <img
                  key={imgIdx}
                  src={producto.imagenes[imgIdx]}
                  alt={producto.nombre}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement.classList.add('img-fallback')
                  }}
                />
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {producto.imagenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      aria-label={`Imagen ${i + 1}`}
                      className={`h-2 rounded-full transition-all ${i === imgIdx ? 'w-6 bg-bone' : 'w-2 bg-bone/50 hover:bg-bone'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-widest2 text-stone2">
                  {producto.categoria} · Atelier 23
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{producto.nombre}</h3>
                <p className="mt-3 font-display text-2xl font-bold text-ember">${producto.precio.toFixed(2)}</p>

                <p className="mt-5 text-[14px] leading-relaxed text-ink/70">{producto.descripcion}</p>

                <div className="mt-7">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Talla {talla ? `· ${talla}` : ''}</p>
                    {error && <p className="text-[12px] font-semibold text-ember">Elige una talla para continuar</p>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {producto.tallas.map((t) => {
                      const esTalla = producto.tallas.length === 1 && t === 'Talla única'
                      return (
                        <button
                          key={t}
                          onClick={() => {
                            setTalla(t)
                            setError(false)
                          }}
                          className={`min-w-[52px] rounded-full border px-3 py-2.5 text-[13px] font-semibold transition-all ${
                            talla === t
                              ? 'border-ink bg-ink text-bone'
                              : error
                                ? 'border-ember/60 hover:border-ink'
                                : 'border-line hover:border-ink'
                          }`}
                        >
                          {esTalla ? 'T. única' : t}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                      aria-label="Menos cantidad"
                      className="flex h-11 w-11 items-center justify-center rounded-l-full transition-colors hover:bg-line"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center font-display text-lg font-bold">{cantidad}</span>
                    <button
                      onClick={() => setCantidad((c) => Math.min(9, c + 1))}
                      aria-label="Más cantidad"
                      className="flex h-11 w-11 items-center justify-center rounded-r-full transition-colors hover:bg-line"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <p className="text-[13px] text-ink/50">
                    Subtotal: <span className="font-semibold text-ink">${(producto.precio * cantidad).toFixed(2)}</span>
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={manejarAdd}
                  className={`mt-8 flex items-center justify-center gap-3 rounded-full py-4 text-[12px] font-bold uppercase tracking-widest2 text-white transition-colors ${
                    added ? 'bg-green-600' : 'bg-ink hover:bg-ember'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} /> Añadido al carrito
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Añadir al carrito
                    </>
                  )}
                </motion.button>

                <p className="mt-4 text-center text-[12px] text-ink/45">
                  Envío gratis en compras desde $60 · Cambios sin costo en 14 días
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
