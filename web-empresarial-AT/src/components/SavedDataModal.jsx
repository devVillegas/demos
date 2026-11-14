import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return iso
  }
}

function formatUSD(value) {
  return Number(value).toLocaleString('es-MX', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
}

function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 px-6 py-10 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-muted">
        <Icon name="Inbox" size={20} />
      </span>
      <p className="mt-3 text-sm text-muted">{text}</p>
    </div>
  )
}

function QuotationCard({ quote, onDelete }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-white/10 bg-night-850 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ice">
            {quote.nombre} · {quote.empresa}
          </p>
          <p className="text-xs text-muted">{quote.email}</p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(quote.id)}
          aria-label={`Eliminar cotización de ${quote.nombre}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Icon name="Trash2" size={15} />
        </button>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <dt className="text-muted">Servicios</dt>
        <dd className="text-ice/90">{quote.servicios.join(', ')}</dd>
        <dt className="text-muted">Nivel</dt>
        <dd className="text-ice/90">{quote.nivel}</dd>
        <dt className="text-muted">Duración</dt>
        <dd className="text-ice/90">{quote.semanas} semanas</dd>
        <dt className="text-muted">Equipo dedicado</dt>
        <dd className="text-ice/90">{quote.equipoDedicado ? 'Sí' : 'No'}</dd>
        <dt className="text-muted">Total estimado</dt>
        <dd className="font-display font-semibold text-electric-bright">{formatUSD(quote.total)}</dd>
        <dt className="text-muted">Enviada</dt>
        <dd className="text-ice/90">{formatDate(quote.createdAt)}</dd>
      </dl>
    </motion.article>
  )
}

function MessageCard({ message, onDelete }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-white/10 bg-night-850 p-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ice">
            {message.nombre} · {message.empresa}
          </p>
          <p className="text-xs text-muted">
            {message.email} — {formatDate(message.createdAt)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(message.id)}
          aria-label={`Eliminar mensaje de ${message.nombre}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Icon name="Trash2" size={15} />
        </button>
      </div>
      <p className="mt-3 whitespace-pre-wrap rounded-lg bg-night-900/80 p-3 text-sm leading-relaxed text-ice/90">
        {message.mensaje}
      </p>
    </motion.article>
  )
}

export default function SavedDataModal({ open, onClose, quotations, messages, onDeleteQuotation, onDeleteMessage }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-night-950/80 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Cotizaciones y mensajes guardados"
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-night-900 shadow-card sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <Icon name="Database" size={17} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ice">
                    Cotizaciones y mensajes guardados
                  </h3>
                  <p className="text-xs text-muted">Almacenados localmente en tu navegador</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar visor"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-white/5 hover:text-ice"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-8 overflow-y-auto px-6 py-5">
              <section>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-electric-bright">
                  Cotizaciones
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted">
                    {quotations.length}
                  </span>
                </h4>
                <div className="mt-3 space-y-3">
                  {quotations.length === 0 ? (
                    <EmptyState text="Aún no hay cotizaciones. Prueba el cotizador interactivo." />
                  ) : (
                    quotations.map((quote) => (
                      <QuotationCard key={quote.id} quote={quote} onDelete={onDeleteQuotation} />
                    ))
                  )}
                </div>
              </section>

              <section>
                <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-electric-bright">
                  Mensajes de contacto
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-muted">
                    {messages.length}
                  </span>
                </h4>
                <div className="mt-3 space-y-3">
                  {messages.length === 0 ? (
                    <EmptyState text="Aún no hay mensajes. Envía uno desde el formulario de contacto." />
                  ) : (
                    messages.map((message) => (
                      <MessageCard key={message.id} message={message} onDelete={onDeleteMessage} />
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="border-t border-white/10 px-6 py-3 text-center">
              <p className="text-[11px] text-muted">
                Demo Asisnet — los datos viven solo en localStorage y puedes borrarlos desde el
                footer.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
