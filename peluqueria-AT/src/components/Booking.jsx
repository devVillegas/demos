import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  User,
  CalendarDays,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  PartyPopper,
} from 'lucide-react';
import { SERVICES, STYLISTS, SCHEDULE } from '../data/mockData.js';

const STEPS = [
  { n: 1, label: 'Servicio', icon: Scissors },
  { n: 2, label: 'Estilista', icon: User },
  { n: 3, label: 'Fecha', icon: CalendarDays },
  { n: 4, label: 'Hora', icon: Clock },
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function toIso(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function generateDays(count = 14) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      iso: toIso(date),
      date,
      weekday: date.getDay(),
      weekdayLabel: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      dayNum: date.getDate(),
      monthLabel: date.toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''),
      isToday: i === 0,
      closed: date.getDay() === SCHEDULE.closedWeekday,
    });
  }
  return days;
}

function generateSlots() {
  const slots = [];
  const start = SCHEDULE.openingHour * 60;
  const end = SCHEDULE.closingHour * 60;
  for (let t = start; t + SCHEDULE.slotMinutes <= end; t += SCHEDULE.slotMinutes) {
    slots.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`);
  }
  return slots;
}

const stepVariants = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
  transition: { duration: 0.35, ease: 'easeOut' },
};

export default function Booking({
  preselectedServiceId,
  preselectedStylistId,
  bookings,
  onBooked,
  onOpenReservations,
}) {
  const days = useMemo(() => generateDays(14), []);
  const slots = useMemo(() => generateSlots(), []);

  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(preselectedServiceId || null);
  const [stylistId, setStylistId] = useState(preselectedStylistId || null);
  const [dateIso, setDateIso] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(null);
  const [error, setError] = useState('');

  const service = SERVICES.find((s) => s.id === serviceId) || null;
  const stylist = STYLISTS.find((s) => s.id === stylistId) || null;
  const selectedDay = days.find((d) => d.iso === dateIso) || null;

  useEffect(() => {
    if (preselectedServiceId && preselectedServiceId !== serviceId) {
      setServiceId(preselectedServiceId);
      if (step === 1) setStep(2);
    }
  }, [preselectedServiceId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (preselectedStylistId && preselectedStylistId !== stylistId) {
      setStylistId(preselectedStylistId);
      if (step === 2) setStep(3);
    }
  }, [preselectedStylistId]); // eslint-disable-line react-hooks/exhaustive-deps

  const occupiedSlots = useMemo(() => {
    if (!stylistId || !dateIso) return new Set();
    return new Set(
      bookings
        .filter((b) => b.stylistId === stylistId && b.dateIso === dateIso)
        .map((b) => b.time)
    );
  }, [bookings, stylistId, dateIso]);

  const goToStep = (target) => {
    if (target < step) {
      setError('');
      setStep(target);
      return;
    }
    if (target === 2 && !serviceId) {
      setError('Primero elige un servicio para continuar.');
      return;
    }
    if (target === 3 && !stylistId) {
      setError('Selecciona un estilista para continuar.');
      return;
    }
    if (target === 4 && !dateIso) {
      setError('Elige una fecha disponible para continuar.');
      return;
    }
    if (target === 5) {
      if (!time) {
        setError('Elige un horario disponible para continuar.');
        return;
      }
      if (name.trim().length < 3) {
        setError('Escribe tu nombre completo para confirmar la cita.');
        return;
      }
      if (phone.trim().length < 7) {
        setError('Necesitamos un teléfono de contacto válido para confirmar la cita.');
        return;
      }
      setError('');
      setConfirming(true);
      return;
    }
    setError('');
    setStep(Math.min(target, 4));
  };

  const confirmBooking = () => {
    const booking = {
      id: `cita-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      serviceId,
      stylistId,
      dateIso,
      time,
      name: name.trim(),
      phone: phone.trim(),
      createdAt: new Date().toISOString(),
    };
    onBooked(booking);
    setConfirmed(booking);
    setConfirming(false);
  };

  const resetFlow = () => {
    setStep(1);
    setServiceId(null);
    setStylistId(null);
    setDateIso(null);
    setTime(null);
    setName('');
    setPhone('');
    setConfirmed(null);
    setError('');
  };

  const pickService = (id) => {
    setServiceId(id);
    setError('');
    setStep(2);
  };

  const pickStylist = (id) => {
    setStylistId(id);
    setError('');
    setStep(3);
  };

  const pickDate = (iso, closed) => {
    if (closed) return;
    setDateIso(iso);
    setTime(null);
    setError('');
    setStep(4);
  };

  return (
    <section id="agenda" className="relative py-24 sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="overline-label mb-4">Agenda interactiva</p>
          <h2 className="display-italic text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Reserva tu cita en cuatro pasos
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="fine-line mx-auto mt-8 max-w-md origin-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="border border-ink/10 bg-cream-soft shadow-editorial"
        >
          <div className="flex flex-col items-stretch gap-4 border-b border-ink/10 px-6 py-6 sm:flex-row sm:items-center sm:gap-0 sm:px-10">
            {STEPS.map(({ n, label, icon: Icon }, i) => {
              const done = step > n;
              const active = step === n;
              return (
                <div key={n} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => goToStep(n)}
                    disabled={n > 1 && !serviceId}
                    className={`flex items-center gap-3 text-left transition-opacity duration-300 ${
                      n > 1 && !serviceId ? 'cursor-not-allowed opacity-40' : ''
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                        done || active
                          ? 'border-powder bg-powder text-cream'
                          : 'border-ink/25 text-ink-soft'
                      }`}
                    >
                      {done ? <Check size={16} strokeWidth={2} /> : <Icon size={16} strokeWidth={1.5} />}
                    </span>
                    <span className="hidden flex-col sm:flex">
                      <span
                        className={`font-body text-[10px] uppercase tracking-widest2 ${
                          active ? 'text-powder' : 'text-ink-faint'
                        }`}
                      >
                        Paso {n}
                      </span>
                      <span
                        className={`font-display text-lg leading-tight ${
                          active || done ? 'italic text-ink' : 'text-ink-soft'
                        }`}
                      >
                        {label}
                      </span>
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className="mx-3 hidden h-px flex-1 bg-gradient-to-r from-powder/50 to-ink/10 sm:mx-4 sm:block" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="relative min-h-[430px] px-6 py-10 sm:px-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" {...stepVariants}>
                  <h3 className="display-italic mb-1 text-3xl text-ink">¿Qué te hacemos hoy?</h3>
                  <p className="mb-8 font-body text-sm font-light text-ink-soft">
                    Selecciona el servicio de tu ritual.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => pickService(s.id)}
                        className={`group border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-powder/60 hover:bg-cream ${
                          serviceId === s.id ? 'border-powder bg-powder/5' : 'border-ink/15 bg-cream'
                        }`}
                      >
                        <span className="display-italic block text-xl text-ink">{s.name}</span>
                        <span className="mt-2 block font-body text-[12px] text-ink-soft">
                          {s.durationMin} min · ${s.priceUsd} USD
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" {...stepVariants}>
                  <h3 className="display-italic mb-1 text-3xl text-ink">¿Con quién?</h3>
                  <p className="mb-8 font-body text-sm font-light text-ink-soft">
                    Escoge a tu estilista; también puedes hacerlo desde sus tarjetas arriba.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {STYLISTS.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => pickStylist(s.id)}
                        className={`flex items-center gap-4 border p-4 text-left transition-all duration-300 hover:border-powder/60 hover:bg-cream ${
                          stylistId === s.id ? 'border-powder bg-powder/5' : 'border-ink/15 bg-cream'
                        }`}
                      >
                        <span className="display-italic flex-1 text-xl text-ink">{s.name}</span>
                        <span className="font-body text-[11px] uppercase tracking-widest2 text-powder">
                          {s.specialty}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" {...stepVariants}>
                  <h3 className="display-italic mb-1 text-3xl text-ink">¿Cuándo?</h3>
                  <p className="mb-8 font-body text-sm font-light text-ink-soft">
                    Próximos 14 días. Los domingos el estudio permanece cerrado.
                  </p>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                    {days.map((d) => {
                      const selected = dateIso === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          disabled={d.closed}
                          onClick={() => pickDate(d.iso, d.closed)}
                          className={`flex flex-col items-center border px-2 py-4 transition-all duration-300 ${
                            d.closed
                              ? 'cursor-not-allowed border-ink/10 bg-ink/5 opacity-45'
                              : selected
                                ? 'border-powder bg-powder text-cream shadow-card'
                                : 'border-ink/15 bg-cream hover:border-powder/60 hover:bg-powder/5'
                          }`}
                        >
                          <span
                            className={`font-body text-[10px] uppercase tracking-widest2 ${
                              selected ? 'text-cream/80' : 'text-ink-faint'
                            }`}
                          >
                            {d.closed ? 'Cerrado' : d.weekdayLabel}
                          </span>
                          <span
                            className={`display-italic text-2xl ${
                              selected ? 'text-cream' : 'text-ink'
                            }`}
                          >
                            {d.dayNum}
                          </span>
                          <span
                            className={`font-body text-[10px] uppercase tracking-widest2 ${
                              selected ? 'text-cream/80' : 'text-ink-soft'
                            }`}
                          >
                            {d.monthLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="s4" {...stepVariants}>
                  <h3 className="display-italic mb-1 text-3xl text-ink">¿A qué hora?</h3>
                  <p className="mb-8 font-body text-sm font-light text-ink-soft">
                    Franjas de 45 minutos, de 9:00 a 19:00. Las horas ya reservadas con{' '}
                    <span className="italic">{stylist ? stylist.name : 'tu estilista'}</span>{' '}
                    aparecen deshabilitadas.
                  </p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
                    {slots.map((slot) => {
                      const taken = occupiedSlots.has(slot);
                      const selected = time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={taken}
                          onClick={() => {
                            setTime(slot);
                            setError('');
                            setStep(5);
                          }}
                          className={`border py-3 font-body text-sm transition-all duration-300 ${
                            taken
                              ? 'cursor-not-allowed border-ink/10 bg-ink/5 text-ink-faint line-through opacity-50'
                              : selected
                                ? 'border-powder bg-powder text-cream shadow-card'
                                : 'border-ink/15 bg-cream hover:border-powder/60 hover:bg-powder/5'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="s5" {...stepVariants}>
                  <h3 className="display-italic mb-1 text-3xl text-ink">Tus datos</h3>
                  <p className="mb-8 font-body text-sm font-light text-ink-soft">
                    Solo lo necesario para confirmar tu reserva de demostración.
                  </p>
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="booking-name" className="field-label">
                          Nombre completo
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej. María Fernanda Ovalles"
                          className="field-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="booking-phone" className="field-label">
                          Teléfono
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej. 0412-555-0134"
                          className="field-input"
                        />
                      </div>
                      <div className="border border-ink/15 bg-cream p-5">
                        <p className="overline-label mb-3">Resumen del ritual</p>
                        <ul className="space-y-2 font-body text-sm text-ink">
                          <li className="flex justify-between gap-4">
                            <span className="text-ink-soft">Servicio</span>
                            <span className="italic">{service ? service.name : '—'}</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="text-ink-soft">Estilista</span>
                            <span className="italic">{stylist ? stylist.name : '—'}</span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="text-ink-soft">Fecha</span>
                            <span className="italic">
                              {selectedDay
                                ? selectedDay.date.toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                  })
                                : '—'}
                            </span>
                          </li>
                          <li className="flex justify-between gap-4">
                            <span className="text-ink-soft">Hora</span>
                            <span className="italic">{time || '—'}</span>
                          </li>
                          <li className="flex justify-between gap-4 border-t border-ink/10 pt-2">
                            <span className="text-ink-soft">Duración / Precio</span>
                            <span className="italic">
                              {service ? `${service.durationMin} min · $${service.priceUsd} USD` : '—'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center border border-ink/10 bg-cream-deep/40 p-8">
                      <p className="display-italic text-2xl leading-snug text-ink">
                        Al confirmar, tu cita se guardará al instante en esta demo y aparecerá en
                        «Mis reservas» y en la agenda.
                      </p>
                      <p className="mt-4 font-body text-sm font-light text-ink-soft">
                        Los horarios que ocupes quedarán bloqueados para el mismo estilista en esa
                        fecha, tal como en un sistema real de reservas.
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenReservations()}
                        className="mt-8 self-start font-body text-[12px] font-medium uppercase tracking-widest2 text-powder underline decoration-gold/60 underline-offset-8 transition-colors hover:text-powder-dark"
                      >
                        Ver mis reservas demo
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 border-l-2 border-powder bg-powder/10 px-4 py-3 font-body text-sm text-powder-dark"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between border-t border-ink/10 px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={() => goToStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="btn-outline !px-5 !py-2 !text-[11px] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={14} strokeWidth={1.5} />
              Atrás
            </button>
            {step < 5 ? (
              <button type="button" onClick={() => goToStep(step + 1)} className="btn-solid !px-5 !py-2 !text-[11px]">
                Continuar
                <ChevronRight size={14} strokeWidth={1.5} />
              </button>
            ) : (
              <button type="button" onClick={() => goToStep(5)} className="btn-solid !px-5 !py-2 !text-[11px]">
                Confirmar cita
                <Check size={14} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {confirming && service && stylist && selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Confirmar cita"
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg border border-gold/30 bg-cream p-8 shadow-editorial sm:p-10"
            >
              <div className="flex items-start justify-between">
                <p className="overline-label">Confirmación</p>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  aria-label="Cerrar"
                  className="text-ink-soft transition-colors hover:text-powder"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <h3 className="display-italic mt-4 text-4xl text-ink">¿Todo en orden?</h3>
              <div className="fine-line my-6" />
              <ul className="space-y-3 font-body text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-ink-soft">Cliente</span>
                  <span className="italic text-ink">{name.trim()}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-ink-soft">Teléfono</span>
                  <span className="italic text-ink">{phone.trim()}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-ink-soft">Servicio</span>
                  <span className="italic text-ink">{service.name}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-ink-soft">Estilista</span>
                  <span className="italic text-ink">{stylist.name}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-ink-soft">Fecha y hora</span>
                  <span className="italic text-ink">
                    {selectedDay.date.toLocaleDateString('es-ES', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                    , {time}
                  </span>
                </li>
                <li className="flex justify-between gap-4 border-t border-ink/10 pt-3">
                  <span className="text-ink-soft">Inversión</span>
                  <span className="italic text-ink">
                    ${service.priceUsd} USD · {service.durationMin} min
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <button type="button" onClick={confirmBooking} className="btn-solid flex-1">
                  Confirmar reserva
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="btn-outline flex-1"
                >
                  Revisar de nuevo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Cita confirmada"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="w-full max-w-md border border-gold/30 bg-cream p-10 text-center shadow-editorial"
            >
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 14 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-powder text-cream"
              >
                <PartyPopper size={26} strokeWidth={1.5} />
              </motion.span>
              <h3 className="display-italic mt-6 text-4xl text-ink">Cita confirmada</h3>
              <p className="mt-3 font-body text-sm font-light leading-relaxed text-ink-soft">
                Te esperamos, <span className="italic">{confirmed.name}</span>. Tu cita con{' '}
                <span className="italic">
                  {STYLISTS.find((s) => s.id === confirmed.stylistId)?.name}
                </span>{' '}
                quedó guardada en esta demo.
              </p>
              <div className="fine-line my-6" />
              <p className="font-body text-sm text-ink">
                {new Date(`${confirmed.dateIso}T${confirmed.time}`).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                · {confirmed.time}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" onClick={resetFlow} className="btn-outline flex-1">
                  Reservar otra
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmed(null);
                    onOpenReservations();
                  }}
                  className="btn-solid flex-1"
                >
                  Ver mis reservas
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
