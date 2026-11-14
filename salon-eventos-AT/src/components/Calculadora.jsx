import { useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Clock, Sparkles, Receipt } from "lucide-react"
import { SectionTitle } from "./Ornament"
import { salones, tiposEvento, duraciones, extras } from "../data/mockData"

const PRECIO_POR_INVITADO = 15

function calcularPresupuesto({ tipoEvento, salonId, invitados, duracionHoras, extrasSel }) {
  const salon = salones.find((s) => s.id === salonId)
  const tipo = tiposEvento.find((t) => t.id === tipoEvento)
  const dur = duraciones.find((d) => d.horas === duracionHoras)

  const lineas = []
  const push = (nombre, detalle, monto) => monto > 0 && lineas.push({ nombre, detalle, monto })

  const tarifaSalon = Math.round(salon.tarifaBase * dur.multiplicador)
  push(`Salón ${salon.nombre}`, `Tarifa base × ${dur.horas} h`, tarifaSalon)

  const porInvitado = PRECIO_POR_INVITADO * invitados
  push("Servicio base por invitado", `${invitados} invitados × $${PRECIO_POR_INVITADO}`, Math.round(porInvitado))

  if (tipo.recargoPct > 0) {
    push(
      `Recargo ${tipo.nombre}`,
      `Producción temática especial (${tipo.recargoPct}%)`,
      Math.round(((tarifaSalon + porInvitado) * tipo.recargoPct) / 100),
    )
  }

  extrasSel.forEach((id) => {
    const ex = extras.find((e) => e.id === id)
    if (!ex) return
    const monto = ex.unidad === "persona" ? ex.precio * invitados : ex.precio
    push(ex.nombre, `${ex.precio.toLocaleString("es-VE")} / ${ex.unidad}`, Math.round(monto))
  })

  const subtotal = lineas.reduce((acc, l) => acc + l.monto, 0)

  let descuentoPct = 0
  if (invitados >= 200) descuentoPct = 10
  else if (invitados >= 100) descuentoPct = 5
  const descuento = Math.round((subtotal * descuentoPct) / 100)
  const total = subtotal - descuento

  return { salon, tipo, lineas, subtotal, descuentoPct, descuento, total, invitados, duracionHoras }
}

const fmt = (n) => `$${n.toLocaleString("es-VE")}`

function FilaDesglose({ linea, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex items-baseline justify-between gap-4 border-b border-gold/10 py-2.5 last:border-0"
    >
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-200">{linea.nombre}</span>
        <span className="text-[11px] text-neutral-500">{linea.detalle}</span>
      </div>
      <span className="font-display text-sm font-bold text-gold">{fmt(linea.monto)}</span>
    </motion.div>
  )
}

export default function Calculadora({ config, setConfig, onPresupuesto }) {
  const { tipoEvento, salonId, invitados, duracionHoras, extrasSel } = config

  const presupuesto = useMemo(
    () => calcularPresupuesto({ tipoEvento, salonId, invitados, duracionHoras, extrasSel }),
    [tipoEvento, salonId, invitados, duracionHoras, extrasSel],
  )

  useEffect(() => {
    onPresupuesto(presupuesto)
  }, [presupuesto, onPresupuesto])

  const setInvitados = (v) => {
    const n = Number(v)
    const fill = ((n - 10) / (300 - 10)) * 100
    const el = document.getElementById("slider-invitados")
    if (el) el.style.setProperty("--fill", `${fill}%`)
    setConfig((c) => ({ ...c, invitados: n }))
  }

  const toggleExtra = (id) =>
    setConfig((c) => ({
      ...c,
      extrasSel: c.extrasSel.includes(id) ? c.extrasSel.filter((x) => x !== id) : [...c.extrasSel, id],
    }))

  const fillInicial = ((invitados - 10) / (300 - 10)) * 100

  return (
    <section id="calculadora" className="relative bg-ink-800/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="Diseña tu celebración"
          titulo="Calculadora de paquetes"
          subtitulo="Ajusta el tipo de evento, el salón, los invitados y los extras. Tu presupuesto se recalcula en vivo, línea por línea, con descuentos por volumen automáticos."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Controles */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8 rounded-2xl border border-gold/15 bg-ink-800 p-6 shadow-card sm:p-8"
          >
            {/* Tipo de evento */}
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                <Sparkles size={14} /> Tipo de evento
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {tiposEvento.map((t) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setConfig((c) => ({ ...c, tipoEvento: t.id }))}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-4 text-xs font-semibold uppercase tracking-wider transition-all ${
                      tipoEvento === t.id
                        ? "border-gold bg-gold-gradient-soft text-gold shadow-gold"
                        : "border-gold/20 bg-ink-700 text-neutral-300 hover:border-gold/50"
                    }`}
                  >
                    <span className="text-lg">{t.icono}</span>
                    {t.nombre}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Salón */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Salón (desde el tour)</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {salones.map((s) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setConfig((c) => ({ ...c, salonId: s.id }))}
                    className={`rounded-xl border px-3 py-4 text-xs font-semibold transition-all ${
                      salonId === s.id
                        ? "border-gold bg-gold-gradient-soft text-gold shadow-gold"
                        : "border-gold/20 bg-ink-700 text-neutral-300 hover:border-gold/50"
                    }`}
                  >
                    <span className="block font-display text-[13px] uppercase">{s.nombre}</span>
                    <span className="mt-1 block text-[10px] font-normal normal-case text-neutral-500">
                      hasta {s.capacidad} · {s.m2} m²
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Slider de invitados */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  <Users size={14} /> Nº de invitados
                </p>
                <motion.span
                  key={invitados}
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  className="font-display text-2xl font-bold text-gold-gradient"
                >
                  {invitados}
                </motion.span>
              </div>
              <input
                id="slider-invitados"
                type="range"
                min="10"
                max="300"
                step="5"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="slider-gold"
                style={{ "--fill": `${fillInicial}%` }}
                aria-label="Número de invitados"
              />
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                <span>10</span>
                <span className={invitados >= 200 ? "text-gold" : ""}>100 → −5%</span>
                <span className={invitados >= 200 ? "text-gold" : ""}>200 → −10%</span>
                <span>300</span>
              </div>
            </div>

            {/* Duración */}
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                <Clock size={14} /> Duración del evento
              </p>
              <div className="grid grid-cols-3 gap-3">
                {duraciones.map((d) => (
                  <motion.button
                    key={d.horas}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setConfig((c) => ({ ...c, duracionHoras: d.horas }))}
                    className={`rounded-xl border py-3.5 text-sm font-semibold uppercase tracking-wider transition-all ${
                      duracionHoras === d.horas
                        ? "border-gold bg-gold-gradient-soft text-gold shadow-gold"
                        : "border-gold/20 bg-ink-700 text-neutral-300 hover:border-gold/50"
                    }`}
                  >
                    {d.etiqueta}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">Extras del paquete</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {extras.map((ex) => {
                  const activo = extrasSel.includes(ex.id)
                  return (
                    <label
                      key={ex.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all ${
                        activo
                          ? "border-gold/60 bg-gold-gradient-soft"
                          : "border-gold/15 bg-ink-700 hover:border-gold/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="check-gold mt-0.5"
                        checked={activo}
                        onChange={() => toggleExtra(ex.id)}
                        aria-label={ex.nombre}
                      />
                      <span className="flex flex-col gap-0.5">
                        <span className="flex items-center gap-2 text-sm font-semibold text-neutral-100">
                          <span>{ex.icono}</span>
                          {ex.nombre}
                        </span>
                        <span className="text-[11px] leading-relaxed text-neutral-500">{ex.descripcion}</span>
                        <span className="text-xs font-bold text-gold">
                          ${ex.precio.toLocaleString("es-VE")} / {ex.unidad}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Presupuesto en vivo */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-fit rounded-2xl border border-gold/30 bg-gradient-to-b from-ink-700 to-ink-800 p-6 shadow-gold sm:p-8 lg:sticky lg:top-28"
          >
            <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              <Receipt size={14} /> Presupuesto en vivo
            </p>
            <p className="font-display text-lg font-bold text-champagne">
              {presupuesto.tipo.nombre} · {presupuesto.salon.nombre}
            </p>
            <p className="text-[11px] text-neutral-500">
              {presupuesto.invitados} invitados · {presupuesto.duracionHoras} horas
            </p>

            <div className="my-5 ornament-line" />

            <div className="flex flex-col">
              <AnimatePresence initial={false}>
                {presupuesto.lineas.map((l, i) => (
                  <FilaDesglose key={`${l.nombre}-${l.monto}`} linea={l} index={i} />
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-neutral-300">
              <span>Subtotal</span>
              <span className="font-display font-bold">{fmt(presupuesto.subtotal)}</span>
            </div>

            <AnimatePresence>
              {presupuesto.descuentoPct > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 flex items-center justify-between rounded-lg border border-gold/40 bg-gold-gradient-soft px-3 py-2 text-sm">
                    <span className="font-semibold text-gold">Descuento por volumen −{presupuesto.descuentoPct}%</span>
                    <span className="font-display font-bold text-gold">−{fmt(presupuesto.descuento)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 rounded-xl border border-gold/50 bg-gold-gradient-soft p-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Total estimado</span>
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={presupuesto.total}
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-4xl font-black text-gold-gradient sm:text-5xl"
                >
                  {fmt(presupuesto.total)}
                </motion.p>
              </AnimatePresence>
              <span className="mt-1 block text-[10px] text-neutral-500">
                Estimación referencial · no incluye impuestos · se confirma con fecha disponible
              </span>
            </div>

            <motion.a
              href="#reserva"
              whileHover={{ y: -2, boxShadow: "0 0 30px -6px rgba(212,175,55,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 block rounded-full bg-gold-gradient py-3.5 text-center text-sm font-semibold uppercase tracking-[0.2em] text-ink"
            >
              Solicitar esta reserva
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
