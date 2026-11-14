import { motion, AnimatePresence } from 'framer-motion';
import { CalendarX2, X, CalendarHeart, Armchair } from 'lucide-react';
import { SERVICES, STYLISTS } from '../data/mockData.js';

export function formatBookingDate(dateIso) {
  return new Date(`${dateIso}T12:00:00`).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function BookingRow({ booking, onCancel, compact }) {
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const stylist = STYLISTS.find((s) => s.id === booking.stylistId);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.25 } }}
      className={`flex flex-col gap-4 border border-ink/10 bg-cream p-5 sm:flex-row sm:items-center sm:justify-between ${
        compact ? '' : 'sm:p-6'
      }`}
    >
      <div>
        <p className="display-italic text-2xl text-ink">{service ? service.name : 'Servicio'}</p>
        <p className="mt-1 font-body text-sm text-ink-soft">
          <span className="italic">{stylist ? stylist.name : 'Estilista'}</span> ·{' '}
          {formatBookingDate(booking.dateIso)} · {booking.time}
        </p>
        {!compact && (
          <p className="mt-1 font-body text-[12px] text-ink-faint">
            {booking.name} · {booking.phone}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onCancel(booking.id)}
        className="inline-flex items-center justify-center gap-2 border border-ink/20 px-4 py-2 font-body text-[11px] font-medium uppercase tracking-widest2 text-ink-soft transition-all duration-300 hover:border-powder hover:bg-powder hover:text-cream"
        aria-label={`Cancelar cita de ${booking.name} del ${formatBookingDate(booking.dateIso)}`}
      >
        <CalendarX2 size={14} strokeWidth={1.5} />
        Cancelar
      </button>
    </motion.li>
  );
}

function EmptyState({ compact }) {
  return (
    <div className="flex flex-col items-center border border-dashed border-ink/20 bg-cream-deep/40 px-6 py-12 text-center">
      <Armchair size={30} strokeWidth={1.2} className="text-powder" />
      <p className="display-italic mt-4 text-2xl text-ink">Aún no tienes reservas</p>
      <p className="mt-2 max-w-sm font-body text-sm font-light text-ink-soft">
        Cuando agendes tu primera cita en la agenda aparecerá aquí, lista para ver o cancelar.
      </p>
      {!compact && (
        <button
          type="button"
          onClick={() => {
            const el = document.querySelector('#agenda');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="btn-outline mt-6 !px-5 !py-2 !text-[11px]"
        >
          Ir a la agenda
        </button>
      )}
    </div>
  );
}

export function BookingsList({ bookings, onCancel, compact = false }) {
  if (bookings.length === 0) {
    return <EmptyState compact={compact} />;
  }
  const sorted = [...bookings].sort((a, b) =>
    `${a.dateIso}${a.time}`.localeCompare(`${b.dateIso}${b.time}`)
  );
  return (
    <ul className="space-y-4">
      <AnimatePresence initial={false}>
        {sorted.map((booking) => (
          <BookingRow key={booking.id} booking={booking} onCancel={onCancel} compact={compact} />
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default function MyBookings({ bookings, onCancel }) {
  return (
    <section id="reservas" className="relative py-24 sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="overline-label mb-4 flex items-center gap-3">
            <CalendarHeart size={14} strokeWidth={1.5} className="text-gold" />
            Tu cuaderno de citas
          </p>
          <h2 className="display-italic text-4xl leading-tight text-ink sm:text-5xl">
            Mis reservas
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="fine-line mt-8 max-w-md origin-left"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <BookingsList bookings={bookings} onCancel={onCancel} />
        </motion.div>
      </div>
    </section>
  );
}

export function ReservationsModal({ open, bookings, onClose, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Mis reservas demo"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden border border-gold/30 bg-cream shadow-editorial sm:max-h-[80vh]"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 sm:px-8">
              <div>
                <p className="overline-label">Visor de la demo</p>
                <h3 className="display-italic text-3xl text-ink">Mis reservas demo</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar visor de reservas"
                className="flex h-9 w-9 items-center justify-center border border-ink/20 text-ink-soft transition-colors hover:border-powder hover:text-powder"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <BookingsList bookings={bookings} onCancel={onCancel} compact />
            </div>
            <p className="border-t border-ink/10 px-6 py-4 font-body text-[11px] text-ink-faint sm:px-8">
              Estos datos viven solo en tu navegador (clave local «asisnet_demo_peluqueria»). Nada
              se envía a ningún servidor.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
