import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, ChefHat, Leaf, Wheat } from "lucide-react";
import { ETIQUETAS } from "../data/mockData.js";

const TAG_ICON = {
  vegetariano: <Leaf size={12} />,
  sin_gluten: <Wheat size={12} />,
  chef: <ChefHat size={12} />,
};

export default function DishCard({ plato, onAdd }) {
  const [imgOk, setImgOk] = useState(true);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(plato);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group h-full flex flex-col rounded-3xl bg-white overflow-hidden shadow-dish hover:shadow-dish-hover transition-shadow duration-500"
    >
      <div className="relative h-52 overflow-hidden">
        {imgOk ? (
          <img
            src={plato.imagen}
            alt={plato.nombre}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-gradient-to-br from-wine via-[#9a3b16] to-gold">
            <span className="font-display text-3xl italic text-cream/90 px-6 text-center leading-tight">
              {plato.nombre}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {plato.etiquetas.map((tag) => (
            <span
              key={tag}
              title={ETIQUETAS[tag].nombre}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cream/95 text-[11px] font-semibold text-ink shadow-sm backdrop-blur"
            >
              <span className="text-gold">{TAG_ICON[tag]}</span>
              {ETIQUETAS[tag].nombre}
            </span>
          ))}
        </div>

        <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-ink/85 text-cream font-display font-semibold text-lg shadow-lg backdrop-blur-sm">
          ${plato.precio.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-semibold leading-snug group-hover:text-wine transition-colors duration-300">
          {plato.nombre}
        </h3>
        <p className="mt-2.5 text-sm text-ink-muted leading-relaxed flex-1">
          {plato.descripcion}
        </p>

        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.93 }}
          animate={added ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={{ duration: 0.45 }}
          className={`mt-4 inline-flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
            added
              ? "bg-gold text-ink shadow-dish"
              : "bg-wine text-cream hover:bg-gold hover:text-ink"
          }`}
        >
          <Plus size={16} strokeWidth={2.6} className={added ? "rotate-90" : ""} />
          {added ? "Añadido a tu pedido" : "Añadir"}
        </motion.button>
      </div>
    </motion.article>
  );
}
