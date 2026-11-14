import { motion } from "framer-motion";
import { Star, MapPin, Clock, Phone, Navigation } from "lucide-react";
import { TESTIMONIOS, HORARIOS, RESTAURANT } from "../data/mockData.js";

export default function InfoSection() {
  return (
    <section id="visitanos" className="relative py-20 md:py-28 bg-cream texture-light">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="flex items-center justify-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.35em] mb-4">
            <Star size={14} />
            Lo que dice la mesa
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
            Testimonios que
            <em className="italic text-wine"> sazonan</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIOS.map((t, i) => (
            <motion.blockquote
              key={t.nombre}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-3xl bg-white p-7 shadow-dish"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s < t.estrellas ? "text-gold fill-gold" : "text-ink/15"}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-ink-muted flex-1">«{t.texto}»</p>
              <footer className="mt-6 pt-5 border-t border-cream-deep">
                <p className="font-display font-semibold">{t.nombre}</p>
                <p className="text-xs text-ink-muted mt-0.5">{t.rol}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-ink text-cream p-8 md:p-10 texture-dark shadow-dish"
          >
            <h3 className="font-display text-2xl font-semibold flex items-center gap-2.5 mb-7">
              <Clock size={22} className="text-gold" />
              Horarios de Bruma
            </h3>
            <ul className="divide-y divide-cream/10">
              {HORARIOS.map((h) => (
                <li key={h.dias} className="flex items-center justify-between py-4 text-sm">
                  <span className="text-cream/75 font-medium">{h.dias}</span>
                  <span className="font-display font-semibold text-gold">{h.horas}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 space-y-2.5 text-sm text-cream/70">
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold shrink-0" />
                {RESTAURANT.telefono}
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                {RESTAURANT.direccion}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-dish min-h-[380px] bg-cream-dark map-grid"
          >
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 right-0 h-5 bg-wine/15 rounded-full rotate-[-4deg]" />
              <div className="absolute top-2/3 left-0 right-0 h-4 bg-wine/10 rounded-full rotate-[3deg]" />
              <div className="absolute left-1/4 top-0 bottom-0 w-4 bg-wine/10 rounded-full rotate-[6deg]" />
              <div className="absolute right-1/3 top-0 bottom-0 w-5 bg-wine/15 rounded-full rotate-[-5deg]" />
              <div className="absolute top-[30%] left-[8%] w-28 h-20 bg-ink/5 rounded-xl" />
              <div className="absolute bottom-[12%] left-[35%] w-32 h-24 bg-ink/5 rounded-xl" />
              <div className="absolute top-[18%] right-[10%] w-24 h-28 bg-ink/5 rounded-xl" />
              <div className="absolute inset-x-0 bottom-[42%] h-16 bg-gold/10 -rotate-2" />
            </div>

            <div className="absolute top-[42%] left-[46%]">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="absolute -inset-6 rounded-full bg-gold/25 blur-md" />
                <div className="relative w-12 h-12 rounded-full bg-wine grid place-items-center shadow-dish ring-4 ring-cream">
                  <Navigation size={19} className="text-gold" />
                </div>
              </motion.div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap px-4 py-2 rounded-full bg-ink text-cream text-xs font-semibold shadow-dish">
                Bruma · Altamira
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-ink/85 backdrop-blur px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-cream font-semibold text-sm">{RESTAURANT.ciudad}</p>
                <p className="text-cream/60 text-xs mt-0.5">Reservas al {RESTAURANT.telefono}</p>
              </div>
              <a
                href="#reservar"
                className="px-4 py-2 rounded-full bg-gold text-ink text-xs font-bold hover:bg-gold-light transition-colors"
              >
                Reservar
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
