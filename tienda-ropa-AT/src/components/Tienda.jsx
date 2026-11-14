import { useMemo, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Eye, Plus } from 'lucide-react'
import { PRODUCTOS, CATEGORIAS, TALLAS } from '../data/mockData.js'

function ProductCard({ producto, onQuickView }) {
  const etiqueta = producto.nuevo ? 'Nuevo' : producto.oferta ? 'Oferta' : null
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-line">
        <img
          src={producto.imagenes[0]}
          alt={producto.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement.classList.add('img-fallback')
          }}
        />
        {etiqueta && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest2 ${
              producto.nuevo ? 'bg-ink text-bone' : 'bg-ember text-white'
            }`}
          >
            {etiqueta}
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => onQuickView(producto)}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-bone/95 py-3 text-[11px] font-semibold uppercase tracking-widest2 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-bone"
          >
            <Eye size={14} /> Vista rápida
          </button>
          <button
            onClick={() => onQuickView(producto, true)}
            aria-label={`Añadir ${producto.nombre} al carrito`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ember text-white transition-colors hover:bg-ink"
          >
            <Plus size={17} />
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest2 text-stone2">{producto.categoria}</p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{producto.nombre}</h3>
        </div>
        <p className="whitespace-nowrap font-display text-lg font-bold text-ember">
          ${producto.precio.toFixed(2)}
        </p>
      </div>
    </motion.article>
  )
}

export default function Tienda({ onQuickView }) {
  const [cat, setCat] = useState('Todas')
  const [talla, setTalla] = useState(null)
  const [orden, setOrden] = useState('destacados')

  const lista = useMemo(() => {
    let r = PRODUCTOS.filter((p) => (cat === 'Todas' ? true : p.categoria === cat))
    if (talla) r = r.filter((p) => p.tallas.includes(talla))
    if (orden === 'asc') r = [...r].sort((a, b) => a.precio - b.precio)
    if (orden === 'desc') r = [...r].sort((a, b) => b.precio - a.precio)
    return r
  }, [cat, talla, orden])

  const chips = ['Todas', ...CATEGORIAS]

  return (
    <section id="tienda" className="border-b border-line bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">
              <span className="h-px w-10 bg-ember" /> La tienda
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              Compra por <span className="italic text-ember">pieza</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="orden" className="text-[11px] font-semibold uppercase tracking-widest2 text-stone2">
              Ordenar
            </label>
            <select
              id="orden"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="rounded-full border border-line bg-bone px-4 py-2.5 text-[13px] font-medium outline-none transition-colors focus:border-ember"
            >
              <option value="destacados">Destacados</option>
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <LayoutGroup id="chats-categorias">
            {chips.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`relative rounded-full border px-4 py-2 text-[12px] font-semibold uppercase tracking-widest2 transition-colors ${
                  cat === c ? 'border-ink text-bone' : 'border-line text-ink/60 hover:border-ink/40'
                }`}
              >
                {cat === c && (
                  <motion.span
                    layoutId="chip-categoria"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            ))}
          </LayoutGroup>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Talla:</span>
          {TALLAS.map((t) => (
            <button
              key={t}
              onClick={() => setTalla(talla === t ? null : t)}
              className={`h-9 min-w-[40px] rounded-full border px-2 text-[12px] font-bold transition-colors ${
                talla === t
                  ? 'border-ember bg-ember text-white'
                  : 'border-line text-ink/60 hover:border-ink/40 hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
          {talla && (
            <button onClick={() => setTalla(null)} className="ml-2 text-[12px] font-semibold text-ember underline underline-offset-4">
              Quitar talla
            </button>
          )}
          <span className="ml-auto text-[12px] text-ink/50">
            {lista.length} {lista.length === 1 ? 'pieza' : 'piezas'}
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {lista.map((p) => (
              <ProductCard key={p.id} producto={p} onQuickView={onQuickView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {lista.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-3xl font-semibold">Sin piezas con esos filtros</p>
            <p className="mt-2 text-[14px] text-ink/60">Prueba otra categoría o quita el filtro de talla.</p>
          </div>
        )}
      </div>
    </section>
  )
}
