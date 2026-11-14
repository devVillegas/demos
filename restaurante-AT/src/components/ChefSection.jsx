import { motion } from "framer-motion";
import { Flame, Leaf } from "lucide-react";
import { useState } from "react";

const CHEF_IMG =
  "https://images.unsplash.com/photo-1577219491135-ce391726fbaf?auto=format&fit=crop&w=900&q=80";
const AMBIENTE_IMG =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80";

export default function ChefSection() {
  const [chefOk, setChefOk] = useState(true);
  const [ambOk, setAmbOk] = useState(true);

  return (
    <section id="chef" className="relative py-20 md:py-28 bg-cream-dark texture-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-dish-hover aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              {chefOk ? (
                <img
                  src={CHEF_IMG}
                  alt="Retrato del chef Alejandro Bruma"
                  loading="lazy"
                  onError={() => setChefOk(false)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-wine via-[#8a3312] to-gold grid place-items-center">
                  <span className="font-display text-4xl italic text-cream/90 text-center px-8">
                    Chef Alejandro Bruma
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-cream">
                <p className="font-display text-2xl font-semibold">Alejandro Bruma</p>
                <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mt-1">
                  Chef propietario
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -right-3 md:right-6 w-36 h-44 rounded-2xl overflow-hidden shadow-dish rotate-3 border-4 border-cream"
            >
              {ambOk ? (
                <img
                  src={AMBIENTE_IMG}
                  alt="Montaje en la cocina de Bruma"
                  loading="lazy"
                  onError={() => setAmbOk(false)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-ink via-wine to-gold" />
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.35em] mb-4">
              <Flame size={14} />
              La filosofía
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-tight">
              «La bruma no esconde:
              <br />
              <em className="italic text-wine">revela lo que ya estaba»</em>
            </h2>
            <div className="mt-7 space-y-5 text-ink-muted leading-relaxed">
              <p>
                Aprendí en las brasas de mi abuela en San Cristóbal y perfeccioné
                el oficio en cocinas de Lima y San Sebastián. Cuando volví a
                Caracas entendí algo simple: aquí ya había una alta cocina — la
                nuestra — solo le faltaba mesa de mantel largo.
              </p>
              <p>
                En Bruma cocinamos con mercado del día, brasa de maderas locales
                y fermentaciones que respetan el tiempo. No hay prisa en esta
                cocina; hay paciencia de cocinero viejo y curiosidad de cocinero
                nuevo.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {["Mercado del día", "Brasa de Samán", "Fermentados de casa", "Cero desperdicio"].map((pilar) => (
                  <span
                    key={pilar}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/80 text-xs font-semibold text-wine shadow-sm border border-wine/10"
                  >
                    <Leaf size={12} className="text-emerald-600" />
                    {pilar}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
