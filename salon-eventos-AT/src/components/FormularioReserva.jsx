import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, Clock3, User, Mail, Phone, MessageSquare, CheckCircle2, Receipt, Trash2 } from "lucide-react"
import { SectionTitle } from "./Ornament"
import { salones, tiposEvento } from "../data/mockData"

const fmt = (n) => `$${n.toLocaleString("es-VE")}`
const hoy = () => new Date().toISOString().split("T")[0]

const estadoInicial = {
  fecha: "",
  horario: "Tarde (2:00 pm — 8:00 pm)",
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
}

const horarios = [
  "Mañana (9:00 am — 1:00 pm)",
  "Tarde (2:00 pm — 8:00 pm)",
  "Noche (6:00 pm — 2:00 am)",
  "Jornada completa",
]

export default function FormularioReserva({ presupuesto, solicitudes, onGuardar }) {
  const [form, setForm] = useState(estadoInicial)
  const [errores, setErrores] = useState({})
  const [confirmado, setConfirmado] = useState(null)

  const set = (campo) => (e) => {
    setForm((f) => ({ ...f, [campo]: e.target.value }))
    setErrores((er) => ({ ...er, [campo]: undefined }))
  }

  const validar = () => {
    const er = {}
    if (!form.fecha) er.fecha = "Selecciona la fecha del evento"
    else if (form.fecha < hoy()) er.fecha = "La fecha no puede ser anterior a hoy"
    if (!form.nombre.trim()) er.nombre = "Ingresa tu nombre"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Ingresa un email válido"
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.telefono.trim())) er.telefono = "Ingresa un teléfono válido"
    return er
  }

  const enviar = (e) => {
    e.preventDefault()
    const er = validar()
    if (Object.keys(er).length > 0) {
      setErrores(er)
      return
    }
    const solicitud = {
      id: `SDE-${Date.now().toString(36).toUpperCase()}`,
      creadoEn: new Date().toISOString(),
      fecha: form.fecha,
      horario: form.horario,
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      mensaje: form.mensaje.trim(),
      presupuesto: {
        tipo: presupuesto.tipo.nombre,
        salon: presupuesto.salon.nombre,
        invitados: presupuesto.invitados,
        duracionHoras: presupuesto.duracionHoras,
        extras: presupuesto.lineas.map((l) => l.nombre),
        subtotal: presupuesto.subtotal,
        descuentoPct: presupuesto.descuentoPct,
        descuento: presupuesto.descuento,
        total: presupuesto.total,
      },
    }
    onGuardar(solicitud)
    setConfirmado(solicitud)
    setForm(estadoInicial)
  }

  const nuevaSolicitud = () => setConfirmado(null)

  return (
    <section id="reserva" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionTitle
        kicker="Reserva tu fecha"
        titulo="Solicitud de reserva"
        subtitulo="Completa tus datos y adjuntaremos el presupuesto que calculaste arriba. Tu solicitud queda guardada al instante en esta demo (búscala en el badge flotante)."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        {/* Formulario / Confirmación */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-gold/15 bg-ink-800 p-6 shadow-card sm:p-8"
        >
          <AnimatePresence mode="wait">
            {confirmado ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient shadow-goldLg"
                >
                  <CheckCircle2 size={38} className="text-ink" strokeWidth={2} />
                </motion.div>
                <h3 className="mt-6 font-display text-2xl font-bold uppercase tracking-wider text-gold-gradient">
                  Solicitud recibida
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-300">
                  Gracias, <strong className="text-champagne">{confirmado.nombre}</strong>. Tu solicitud{" "}
                  <span className="font-semibold text-gold">{confirmado.id}</span> para el{" "}
                  <strong className="text-champagne">{confirmado.fecha}</strong> fue guardada en la demo. Nuestro equipo
                  de eventos te contactará en menos de 24 horas hábiles.
                </p>
                <motion.button
                  type="button"
                  onClick={nuevaSolicitud}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 rounded-full border border-gold/50 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10"
                >
                  Crear otra solicitud
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={enviar}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fecha" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      <CalendarDays size={13} /> Fecha del evento
                    </label>
                    <input
                      id="fecha"
                      type="date"
                      min={hoy()}
                      value={form.fecha}
                      onChange={set("fecha")}
                      className={`input-dark ${errores.fecha ? "border-red-500/70" : ""}`}
                    />
                    {errores.fecha && <p className="mt-1.5 text-xs text-red-400">{errores.fecha}</p>}
                  </div>
                  <div>
                    <label htmlFor="horario" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      <Clock3 size={13} /> Horario preferido
                    </label>
                    <select id="horario" value={form.horario} onChange={set("horario")} className="input-dark">
                      {horarios.map((h) => (
                        <option key={h} value={h} className="bg-ink-700">
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="nombre" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    <User size={13} /> Nombre y apellido
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Ej. Valentina Márquez"
                    value={form.nombre}
                    onChange={set("nombre")}
                    className={`input-dark ${errores.nombre ? "border-red-500/70" : ""}`}
                  />
                  {errores.nombre && <p className="mt-1.5 text-xs text-red-400">{errores.nombre}</p>}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      <Mail size={13} /> Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="valentina@correo.com"
                      value={form.email}
                      onChange={set("email")}
                      className={`input-dark ${errores.email ? "border-red-500/70" : ""}`}
                    />
                    {errores.email && <p className="mt-1.5 text-xs text-red-400">{errores.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="telefono" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      <Phone size={13} /> Teléfono
                    </label>
                    <input
                      id="telefono"
                      type="tel"
                      placeholder="+58 412 555 0000"
                      value={form.telefono}
                      onChange={set("telefono")}
                      className={`input-dark ${errores.telefono ? "border-red-500/70" : ""}`}
                    />
                    {errores.telefono && <p className="mt-1.5 text-xs text-red-400">{errores.telefono}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="mensaje" className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    <MessageSquare size={13} /> Mensaje (opcional)
                  </label>
                  <textarea
                    id="mensaje"
                    rows="3"
                    placeholder="Cuéntanos sobre tu celebración: estilo, colores, sorpresas que imaginas…"
                    value={form.mensaje}
                    onChange={set("mensaje")}
                    className="input-dark resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ y: -2, boxShadow: "0 0 40px -8px rgba(212,175,55,0.7)" }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-gold-gradient py-4 text-sm font-semibold uppercase tracking-[0.25em] text-ink"
                >
                  Enviar solicitud de reserva
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Resumen del presupuesto adjunto */}
        <motion.aside
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="h-fit rounded-2xl border border-gold/30 bg-gradient-to-b from-ink-700 to-ink-800 p-6 shadow-gold sm:p-8 lg:sticky lg:top-28"
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Receipt size={14} /> Presupuesto adjunto a tu solicitud
          </p>

          <ul className="mt-5 flex flex-col gap-3 text-sm">
            <li className="flex justify-between border-b border-gold/10 pb-3">
              <span className="text-neutral-400">Evento</span>
              <span className="font-semibold text-champagne">{presupuesto.tipo.nombre}</span>
            </li>
            <li className="flex justify-between border-b border-gold/10 pb-3">
              <span className="text-neutral-400">Salón</span>
              <span className="font-semibold text-champagne">{presupuesto.salon.nombre}</span>
            </li>
            <li className="flex justify-between border-b border-gold/10 pb-3">
              <span className="text-neutral-400">Invitados</span>
              <span className="font-semibold text-champagne">{presupuesto.invitados}</span>
            </li>
            <li className="flex justify-between border-b border-gold/10 pb-3">
              <span className="text-neutral-400">Duración</span>
              <span className="font-semibold text-champagne">{presupuesto.duracionHoras} horas</span>
            </li>
            <li className="flex justify-between border-b border-gold/10 pb-3">
              <span className="text-neutral-400">Extras incluidos</span>
              <span className="text-right font-semibold text-champagne">{presupuesto.lineas.length} líneas</span>
            </li>
            {presupuesto.descuentoPct > 0 && (
              <li className="flex justify-between border-b border-gold/10 pb-3">
                <span className="text-gold">Descuento por volumen</span>
                <span className="font-semibold text-gold">−{presupuesto.descuentoPct}% ({fmt(presupuesto.descuento)})</span>
              </li>
            )}
          </ul>

          <div className="mt-5 rounded-xl border border-gold/50 bg-gold-gradient-soft p-4 text-center">
            <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">Total estimado</span>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={presupuesto.total}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-display text-3xl font-black text-gold-gradient"
              >
                {fmt(presupuesto.total)}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-neutral-500">
            <CheckCircle2 size={13} className="mt-0.5 flex-shrink-0 text-gold" />
            Este resumen se adjunta automáticamente a cada solicitud que envíes desde este formulario.
          </p>
        </motion.aside>
      </div>
    </section>
  )
}
