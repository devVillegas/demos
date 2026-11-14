import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { COMPANY } from '../data/mockData.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import Icon from './Icon.jsx'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const initialForm = { nombre: '', email: '', empresa: '', mensaje: '' }

export default function Contact() {
  const [messages, setMessages] = useLocalStorage('mensajes', [])
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validateForm = () => {
    const nextErrors = {}
    if (form.nombre.trim().length < 2) {
      nextErrors.nombre = 'Escribe tu nombre completo.'
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Ingresa un correo electrónico válido.'
    }
    if (form.empresa.trim().length < 2) {
      nextErrors.empresa = 'Indica el nombre de tu empresa.'
    }
    if (form.mensaje.trim().length < 10) {
      nextErrors.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateForm()) return

    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      ...Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, value.trim()])
      )
    }

    setMessages((current) => [message, ...current])
    setForm(initialForm)
    setErrors({})
    setSent(true)
  }

  return (
    <section id="contacto" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-electric/15 blur-[130px]"
      />
      <div className="section-shell relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-bright">
            Contacto
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ice sm:text-4xl">
            Empecemos con una <span className="text-gradient">conversación honesta</span>.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Cuéntanos tu reto y en menos de 48 horas laborales te agendamos una sesión de
            diagnóstico sin costo. Sin presentación comercial inflada: solo preguntas y respuestas.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-sm text-ice">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft text-electric-bright ring-1 ring-electric-soft/40">
                <Icon name="Send" size={16} />
              </span>
              {COMPANY.email}
            </li>
            <li className="flex items-center gap-3 text-sm text-ice">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft text-electric-bright ring-1 ring-electric-soft/40">
                <Icon name="Inbox" size={16} />
              </span>
              {COMPANY.phone}
            </li>
            <li className="flex items-center gap-3 text-sm text-ice">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient-soft text-electric-bright ring-1 ring-electric-soft/40">
                <Icon name="Building2" size={16} />
              </span>
              {COMPANY.address}
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-card p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="flex min-h-[380px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300"
                >
                  <Icon name="CheckCircle2" size={34} />
                </motion.span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ice">
                  Mensaje enviado
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  Gracias por escribirnos. Tu mensaje quedó guardado en el visor de datos de la demo
                  y un consultor te responderá muy pronto.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-ice transition hover:bg-white/10"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-nombre" className="mb-1 block text-xs font-medium text-muted">
                      Nombre
                    </label>
                    <input
                      id="contact-nombre"
                      type="text"
                      value={form.nombre}
                      onChange={handleChange('nombre')}
                      placeholder="Alejandra Vargas"
                      className="input-demo"
                    />
                    {errors.nombre && <p className="mt-1 text-xs text-red-400">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-muted">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="alejandra@empresa.com"
                      className="input-demo"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-empresa" className="mb-1 block text-xs font-medium text-muted">
                    Empresa
                  </label>
                  <input
                    id="contact-empresa"
                    type="text"
                    value={form.empresa}
                    onChange={handleChange('empresa')}
                    placeholder="Comercial Andina S.A."
                    className="input-demo"
                  />
                  {errors.empresa && <p className="mt-1 text-xs text-red-400">{errors.empresa}</p>}
                </div>
                <div>
                  <label htmlFor="contact-mensaje" className="mb-1 block text-xs font-medium text-muted">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-mensaje"
                    rows={5}
                    value={form.mensaje}
                    onChange={handleChange('mensaje')}
                    placeholder="Cuéntanos qué estás construyendo y en qué te puede ayudar Nexora…"
                    className="input-demo resize-none"
                  />
                  {errors.mensaje && <p className="mt-1 text-xs text-red-400">{errors.mensaje}</p>}
                </div>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-cyan"
                >
                  Enviar mensaje
                  <Icon
                    name="ArrowRight"
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
