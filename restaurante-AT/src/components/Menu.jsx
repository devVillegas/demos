import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Wheat, ChefHat, UtensilsCrossed } from "lucide-react";
import DishCard from "./DishCard.jsx";
import { CARTA, CATEGORIAS, ETIQUETAS } from "../data/mockData.js";

const TAG_ICON = {
  vegetariano: <Leaf size={11} className="text-emerald-600" />,
  sin_gluten: <Wheat size={11} className="text-amber-600" />,
  chef: <ChefHat size={11} className="text-gold" />,
};

export default function Menu({ onAdd }) {
  const [tab, setTab] = useState("entradas");
  const [filtros, setFiltros] = useState([]);

  const toggleFiltro = (tag) =>
    setFiltros((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const platos = useMemo(() => {
    return CARTA.filter(
      (plato) =>
        plato.categoria === tab &&
        filtros.every((f) => plato.etiquetas.includes(f))
    );
  }, [tab, filtros]);

  return (
    <section id="carta" className="relative py-20 md:py-28 texture-light">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="flex items-center justify-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.35em] mb-4">
            <UtensilsCrossed size={14} />
            La carta viva
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
            Cocina de mercado,
            <br />
            <em className="italic text-wine">carta de la estación</em>
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            Cambiamos platos cada semana según lo que llega del mercado. Los
            precios están en dólares americanos y todo se prepara al momento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-5 mb-10"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIAS.map((cat) => {
              const activo = tab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setTab(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    activo
                      ? "text-cream"
                      : "text-ink-muted bg-cream-dark hover:text-ink hover:bg-cream-deep"
                  }`}
                >
                  {activo && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-wine shadow-dish"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.nombre}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(ETIQUETAS).map(([tag, meta]) => {
              const activo = filtros.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleFiltro(tag)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                    activo
                      ? "border-gold bg-gold/15 text-wine-dark shadow-sm"
                      : "border-ink/15 bg-white/60 text-ink-muted hover:border-gold/60 hover:text-wine"
                  }`}
                >
                  <span aria-hidden>{TAG_ICON[tag]}</span>
                  {meta.nombre}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {platos.map((plato, i) => (
              <motion.div
                key={plato.id}
                layout
                initial={{ opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <DishCard plato={plato} onAdd={onAdd} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {platos.length === 0 && (
          <p className="text-center text-ink-muted py-14 font-medium">
            No hay platos con esa combinación de filtros — prueba otra mezcla,
            la cocina reinventa todos los días.
          </p>
        )}
      </div>
    </section>
  );
}
