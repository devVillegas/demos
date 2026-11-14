import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Users, Phone, Sparkles, CalendarDays, Clock3 } from "lucide-react";
import { HORAS_RESERVA, OCASIONES } from "../data/mockData.js";

const inputCls =
  "mt-1.5 w-full rounded-xl border border-cream/20 bg-white/5 px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition";

const labelCls = "text-xs font-bold uppercase tracking-wider text-cream/60";

export default function Reservation({ onReservar }) {
  const hoy = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    fecha: hoy,
    hora: "20:00",
    personas: 2,
    ocasion: "Cena",
    nombre: "",
    telefono: "",
  });
  const [confirmada, setConfirmada] = useState(null);

  const set = (campo) => (e) =>
    setForm((prev) => ({ ...prev, [campo]: e.target.value }));

  const enviar = (e) => {
    e.preventDefault();
    const reserva = {
      id: `res-${Date.now()}`,
      fecha: form.fecha,
      hora: form.hora,
      personas: Number(form.personas),
      ocasion: form.ocasion,
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
      creada: new Date().toISOString(),
    };
    setConfirmada(reserva);
    onReservar(reserva);
  };

  return (
    <section id="reservar" className="relative py-20 md:py-28 bg-ink texture-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="flex items-center justify-center gap-2 text-gold text-xs font-semibold uppercase tracking-[0.35em] mb-4">
            <CalendarCheck size={14} />
            Reservaciones
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-cream">
            Tu mesa te está
            <em className="italic text-gold-light"> esperando</em>
          </h2>
          <p className="mt-5 text-cream/70 leading-relaxed">
            Solo 14 mesas y una barra de chef. Reserva con al menos dos horas de
            anticipación y cuéntanos la ocasión para afinar el servicio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {confirmada ? (
              <motion.div
                key="confirmada"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="rounded-3xl bg-wine p-8 md:p-12 text-center shadow-dish ring-1 ring-gold/30"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.15 }}
                  className="mx-auto w-20 h-20 rounded-full bg-cream grid place-items-center mb-6"
                >
                  <CheckCircle2 size={40} className="text-wine" />
                </motion.div>
                <h3 className="font-display text-3xl font-semibold text-cream">
                  ¡Mesa reservada!
                </h3>
                <p className="mt-3 text-cream/85 text-sm leading-relaxed max-w-sm mx-auto">
                  {confirmada.nombre}, te esperamos el{" "}
                  <strong className="text-gold-pale">{confirmada.fecha}</strong> a las{" "}
                  <strong className="text-gold-pale">{confirmada.hora}</strong> para{" "}
                  {confirmada.personas} {confirmada.personas === 1 ? "persona" : "personas"} ·{" "}
                  {confirmada.ocasion}. Te llamaremos para confirmar.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2.5 text-xs">
                  {["Fecha guardada en demo", "Modificable por teléfono", "Cortesía de un trago de la casa"].map((chip) => (
                    <span key={chip} className="px-3 py-1.5 rounded-full bg-ink/25 text-cream/85 border border-cream/15">
                      {chip}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setConfirmada(null)}
                  className="mt-8 px-7 py-3 rounded-full bg-cream text-wine font-bold text-sm hover:bg-gold hover:text-ink transition-colors duration-300"
                >
                  Hacer otra reserva
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="formulario"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                onSubmit={enviar}
                className="rounded-3xl bg-ink-soft/90 backdrop-blur ring-1 ring-cream/10 p-6 md:p-10 shadow-dish"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className={`${labelCls} flex items-center gap-1.5`}>
                      <CalendarDays size={12} /> Fecha
                    </span>
                    <input
                      type="date"
                      required
                      min={hoy}
                      value={form.fecha}
                      onChange={set("fecha")}
                      className={`${inputCls} [color-scheme:dark]`}
                    />
                  </label>

                  <label className="block">
                    <span className={`${labelCls} flex items-center gap-1.5`}>
                      <Clock3 size={12} /> Hora
                    </span>
                    <select value={form.hora} onChange={set("hora")} className={`${inputCls} cursor-pointer`}>
                      {HORAS_RESERVA.map((h) => (
                        <option key={h} value={h} className="text-ink">{h}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={`${labelCls} flex items-center gap-1.5`}>
                      <Users size={12} /> Nº de personas
                    </span>
                    <select value={form.personas} onChange={set("personas")} className={`${inputCls} cursor-pointer`}>
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                        <option key={n} value={n} className="text-ink">
                          {n} {n === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={`${labelCls} flex items-center gap-1.5`}>
                      <Sparkles size={12} /> Ocasión
                    </span>
                    <select value={form.ocasion} onChange={set("ocasion")} className={`${inputCls} cursor-pointer`}>
                      {OCASIONES.map((o) => (
                        <option key={o} value={o} className="text-ink">{o}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={`${labelCls} flex items-center gap-1.5`}>
                      <Users size={12} /> Nombre
                    </span>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={set("nombre")}
                      placeholder="Nombre para la reserva"
                      className={inputCls}
                    />
                  </label>

                  <label className="block">
                    <span className={`${labelCls} flex items-center gap-1.5`}>
                      <Phone size={12} /> Teléfono
                    </span>
                    <input
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={set("telefono")}
                      placeholder="+58 412 000 0000"
                      className={inputCls}
                    />
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 w-full py-4 rounded-full bg-gold text-ink font-bold text-base hover:bg-gold-light transition-colors duration-300 shadow-dish"
                >
                  Reservar mesa
                </motion.button>
                <p className="mt-4 text-center text-xs text-cream/50">
                  Demo interactiva: la reserva se guarda solo en tu navegador.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
