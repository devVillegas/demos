import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LEVELS, SERVICES } from '../data/mockData.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import Icon from './Icon.jsx'

const MIN_WEEKS = 4
const MAX_WEEKS = 24
const DEFAULT_WEEKS = 8
const DEDICATED_TEAM_SURCHARGE = 0.25

function formatUSD(value) {
  return value.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Quoter() {
  const [quotations, setQuotations] = useLocalStorage('cotizaciones', [])
  const [selectedIds, setSelectedIds] = useState([SERVICES[0].id])
  const [levelId, setLevelId] = useState(LEVELS[1].id)
  const [weeks, setWeeks] = useState(DEFAULT_WEEKS)
  const [dedicatedTeam, setDedicatedTeam] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const level = LEVELS.find((l) => l.id === levelId)

  const breakdown = useMemo(() => {
    const lines = SERVICES.filter((s) => selectedIds.includes(s.id)).map((service) => {
      const base = service.from
      const withLevel = base * level.multiplier
      const weekly = withLevel / 4
      const line = Math.round(weekly * weeks)
      return {
        id: service.id,
        name: service.name,
        detail: `${formatUSD(base)} × ${level.name} (×${level.multiplier}) × ${weeks} sem.`,
        amount: line
      }
    })

    const subtotal = lines.reduce((acc, line) => acc + line.amount, 0)
    const teamLine = dedicatedTeam
      ? Math.round(subtotal * DEDICATED_TEAM_SURCHARGE)
      : 0
    const total = subtotal + teamLine

    return { lines, subtotal, teamLine, total }
  }, [selectedIds, level, weeks, dedicatedTeam])

  const toggleService = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
    setSubmitted(false)
  }

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
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateForm()) return

    const quotation = {
      id: `cot-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      empresa: form.empresa.trim(),
      servicios: SERVICES.filter((s) => selectedIds.includes(s.id)).map((s) => s.name),
      nivel: level.name,
      semanas: weeks,
      equipoDedicado: dedicatedTeam,
      total: breakdown.total
    }

    setQuotations((current) => [quotation, ...current])
    setSubmitted(true)
  }

  const startNewQuote = () => {
    setSubmitted(false)
    setShowForm(false)
    setForm({ nombre: '', email: '', empresa: '' })
    setErrors({})
  }

  return (
    <section id="cotizador" className="relative scroll-mt-24 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-140px] top-1/3 h-[360px] w-[360px] rounded-full bg-electric/15 blur-[120px]"
      />
      <div className="section-shell relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-electric-bright">
            Cotizador interactivo
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ice sm:text-4xl">
            Calcula tu inversión <span className="text-gradient">en segundos</span>.
          </h2>
          <p className="mt-4 text-muted">
            Combina servicios, nivel de ejecución y duración. El estimado se recalcula al instante y
            queda guardado en tu navegador al solicitarlo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="glass-card p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ice">1 · Servicios</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((service) => {
                const checked = selectedIds.includes(service.id)
                return (
                  <label
                    key={service.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-200 ${
                      checked
                        ? 'border-electric-soft/60 bg-brand-gradient-soft shadow-glow'
                        : 'border-white/10 bg-night-850 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(service.id)}
                      className="mt-0.5 h-4 w-4 cursor-pointer accent-[#4F46E5]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-ice">{service.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">
                        desde {formatUSD(service.from)}
                      </span>
                    </span>
                  </label>
                )
              })}
            </div>

            <h3 className="mt-8 font-display text-lg font-semibold text-ice">2 · Nivel</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {LEVELS.map((option) => {
                const active = option.id === levelId
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setLevelId(option.id)}
                    className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
                      active
                        ? 'border-electric-soft/70 bg-brand-gradient-soft shadow-glow'
                        : 'border-white/10 bg-night-850 hover:border-white/25'
                    }`}
                  >
                    {option.recommended && (
                      <span className="absolute -top-2.5 left-3 rounded-full bg-brand-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Recomendado
                      </span>
                    )}
                    <span className="block font-display text-sm font-semibold text-ice">
                      {option.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">×{option.multiplier}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted">
                      {option.description}
                    </span>
                  </button>
                )
              })}
            </div>

            <h3 className="mt-8 font-display text-lg font-semibold text-ice">3 · Duración</h3>
            <div className="mt-4 rounded-xl border border-white/10 bg-night-850 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Semanas de ejecución</span>
                <span className="rounded-lg bg-brand-gradient-soft px-3 py-1 font-display text-sm font-semibold text-electric-bright">
                  {weeks} semanas
                </span>
              </div>
              <input
                type="range"
                min={MIN_WEEKS}
                max={MAX_WEEKS}
                step={1}
                value={weeks}
                onChange={(event) => setWeeks(Number(event.target.value))}
                aria-label="Semanas de ejecución"
                className="mt-4"
              />
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>{MIN_WEEKS} sem.</span>
                <span>{MAX_WEEKS} sem.</span>
              </div>
            </div>

            <h3 className="mt-8 font-display text-lg font-semibold text-ice">4 · Extras</h3>
            <label
              className={`mt-4 flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-5 transition-all duration-200 ${
                dedicatedTeam
                  ? 'border-electric-soft/60 bg-brand-gradient-soft shadow-glow'
                  : 'border-white/10 bg-night-850 hover:border-white/20'
              }`}
            >
              <span>
                <span className="block text-sm font-semibold text-ice">Equipo dedicado</span>
                <span className="mt-0.5 block text-xs text-muted">
                  Célula exclusiva con PM, QA y arquitecto asignados (+25%).
                </span>
              </span>
              <input
                type="checkbox"
                checked={dedicatedTeam}
                onChange={(event) => setDedicatedTeam(event.target.checked)}
                className="h-5 w-5 cursor-pointer accent-[#4F46E5]"
              />
            </label>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-card overflow-hidden p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ice">Estimado en vivo</h3>
              <p className="mt-1 text-xs text-muted">
                Referencial; el precio final se confirma tras la reunión de alcance.
              </p>

              <div className="mt-6 space-y-3">
                {breakdown.lines.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-muted">
                    Selecciona al menos un servicio para ver el desglose.
                  </p>
                )}
                <AnimatePresence initial={false}>
                  {breakdown.lines.map((line) => (
                    <motion.div
                      key={line.id}
                      layout
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start justify-between gap-3 rounded-xl bg-night-850/80 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-ice">{line.name}</p>
                        <p className="mt-0.5 text-[11px] text-muted">{line.detail}</p>
                      </div>
                      <p className="font-display text-sm font-semibold text-ice">
                        {formatUSD(line.amount)}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {dedicatedTeam && breakdown.lines.length > 0 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    className="flex items-start justify-between gap-3 rounded-xl bg-night-850/80 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-ice">Equipo dedicado</p>
                      <p className="mt-0.5 text-[11px] text-muted">+25% sobre el subtotal</p>
                    </div>
                    <p className="font-display text-sm font-semibold text-ice">
                      {formatUSD(breakdown.teamLine)}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
                <span className="text-sm text-muted">Total estimado</span>
                <motion.span
                  key={breakdown.total}
                  initial={{ opacity: 0.4, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-3xl font-bold text-gradient"
                >
                  {formatUSD(breakdown.total)}
                </motion.span>
              </div>

              <AnimatePresence mode="wait">
                {!submitted && !showForm && (
                  <motion.button
                    key="request"
                    type="button"
                    onClick={() => setShowForm(true)}
                    disabled={breakdown.lines.length === 0}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 w-full rounded-xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Solicitar cotización
                  </motion.button>
                )}

                {!submitted && showForm && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="mt-6 space-y-3"
                    noValidate
                  >
                    <div>
                      <label htmlFor="quote-nombre" className="mb-1 block text-xs font-medium text-muted">
                        Nombre
                      </label>
                      <input
                        id="quote-nombre"
                        type="text"
                        value={form.nombre}
                        onChange={(event) => setForm({ ...form, nombre: event.target.value })}
                        placeholder="Alejandra Vargas"
                        className="input-demo"
                      />
                      {errors.nombre && <p className="mt-1 text-xs text-red-400">{errors.nombre}</p>}
                    </div>
                    <div>
                      <label htmlFor="quote-email" className="mb-1 block text-xs font-medium text-muted">
                        Email
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        placeholder="alejandra@empresa.com"
                        className="input-demo"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="quote-empresa" className="mb-1 block text-xs font-medium text-muted">
                        Empresa
                      </label>
                      <input
                        id="quote-empresa"
                        type="text"
                        value={form.empresa}
                        onChange={(event) => setForm({ ...form, empresa: event.target.value })}
                        placeholder="Comercial Andina S.A."
                        className="input-demo"
                      />
                      {errors.empresa && <p className="mt-1 text-xs text-red-400">{errors.empresa}</p>}
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02]"
                      >
                        Enviar solicitud
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="rounded-xl border border-white/15 px-4 py-3 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-ice"
                      >
                        Cancelar
                      </button>
                    </div>
                  </motion.form>
                )}

                {submitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                    className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-center"
                  >
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Icon name="CheckCircle2" size={26} />
                    </span>
                    <p className="mt-3 font-display text-base font-semibold text-ice">
                      ¡Cotización guardada!
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Total estimado {formatUSD(breakdown.total)}. Puedes revisarla en el visor de
                      datos de la demo (badge inferior derecho).
                    </p>
                    <button
                      type="button"
                      onClick={startNewQuote}
                      className="mt-4 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-ice transition hover:bg-white/10"
                    >
                      Crear otra cotización
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
