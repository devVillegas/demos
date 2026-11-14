import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Check, Croissant, AlertCircle, User, Mail, Phone, BadgeCheck
} from "lucide-react";
import { suites } from "../data/mockData";
import {
  nightsBetween, validateDates, formatDate, formatUSD,
  calcBreakdown, generateReservationCode, todayStr, addDaysStr
} from "../lib/pricing";
import SmartImage from "./SmartImage";

/**
 * Modal de reserva en tres actos: resumen → datos del huésped → confirmación.
 */
export default function BookingModal({ suite, dates, guests, onClose, onConfirm }) {
  const [step, setStep] = useState("summary");
  const [localDates, setLocalDates] = useState(dates);
  const [localGuests, setLocalGuests] = useState(guests);
  const [breakfast, setBreakfast] = useState(false);
  const [dateError, setDateError] = useState(null);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [guestError, setGuestError] = useState(null);
  const [reservation, setReservation] = useState(null);

  const currentSuite = suite ?? suites[0];
  const nights = nightsBetween(localDates.checkIn, localDates.checkOut);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const breakdown = useMemo(
    () =>
      nights > 0
        ? calcBreakdown({
            rate: currentSuite.rate,
            nights,
            guests: localGuests,
            withBreakfast: breakfast
          })
        : null,
    [currentSuite, nights, localGuests, breakfast]
  );

  const applyDates = (next) => {
    const err = validateDates(next.checkIn, next.checkOut);
    setDateError(err);
    setLocalDates(next);
  };

  const submitGuest = (e) => {
    e.preventDefault();
    if (!guest.name.trim() || !guest.email.trim() || !guest.phone.trim()) {
      setGuestError("Completa nombre, email y teléfono para continuar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) {
      setGuestError("Ingresa un email válido.");
      return;
    }
    setGuestError(null);

    const res = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      code: generateReservationCode(),
      suiteId: currentSuite.id,
      suiteName: currentSuite.name,
      suiteImage: currentSuite.image,
      checkIn: localDates.checkIn,
      checkOut: localDates.checkOut,
      nights,
      guests: localGuests,
      breakfast,
      breakdown,
      guest: { ...guest, name: guest.name.trim(), email: guest.email.trim() },
      createdAt: new Date().toISOString()
    };
    setReservation(res);
    onConfirm(res);
    setStep("done");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-esmeralda-950/80 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Reserva de suite"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-arena-50 shadow-float"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 border border-esmeralda-900/15 bg-arena-50/90 p-2 text-esmeralda-900 transition-colors hover:border-dorado hover:text-dorado-dark"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "summary" && (
          <div className="grid md:grid-cols-[2fr_3fr]">
            <SmartImage
              src={currentSuite.image}
              alt={`Suite ${currentSuite.name}`}
              className="hidden min-h-full md:block"
            />
            <div className="p-7 sm:p-10">
              <p className="label-caps-dark">Reserva</p>
              <h3 className="mt-2 font-display text-3xl font-light text-esmeralda-900">
                {currentSuite.name}
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-checkin" className="label-caps-dark mb-1 block">
                    Llegada
                  </label>
                  <input
                    id="modal-checkin"
                    type="date"
                    min={todayStr()}
                    value={localDates.checkIn}
                    onChange={(e) =>
                      applyDates({ ...localDates, checkIn: e.target.value })
                    }
                    className="w-full border border-esmeralda-900/20 bg-white px-3 py-2.5 text-[14px] text-esmeralda-950 focus:border-dorado focus:outline-none [color-scheme:light]"
                  />
                </div>
                <div>
                  <label htmlFor="modal-checkout" className="label-caps-dark mb-1 block">
                    Salida
                  </label>
                  <input
                    id="modal-checkout"
                    type="date"
                    min={
                      localDates.checkIn
                        ? addDaysStr(localDates.checkIn, 1)
                        : todayStr()
                    }
                    value={localDates.checkOut}
                    onChange={(e) =>
                      applyDates({ ...localDates, checkOut: e.target.value })
                    }
                    className="w-full border border-esmeralda-900/20 bg-white px-3 py-2.5 text-[14px] text-esmeralda-950 focus:border-dorado focus:outline-none [color-scheme:light]"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="modal-guests" className="label-caps-dark mb-1 block">
                    Huéspedes
                  </label>
                  <select
                    id="modal-guests"
                    value={localGuests}
                    onChange={(e) => setLocalGuests(Number(e.target.value))}
                    className="w-full border border-esmeralda-900/20 bg-white px-3 py-2.5 text-[14px] text-esmeralda-950 focus:border-dorado focus:outline-none"
                  >
                    {Array.from({ length: currentSuite.capacity }, (_, i) => i + 1).map(
                      (n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "huésped" : "huéspedes"}
                        </option>
                      )
                    )}
                  </select>
                  <p className="mt-1 text-[11px] text-tinta/50">
                    Capacidad máxima de esta suite: {currentSuite.capacity}.
                  </p>
                </div>
              </div>

              {dateError && (
                <p className="mt-3 flex items-center gap-2 text-[13px] font-medium text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {dateError}
                </p>
              )}

              <button
                type="button"
                onClick={() => setBreakfast((v) => !v)}
                aria-pressed={breakfast}
                className={`mt-5 flex w-full items-center justify-between border px-4 py-3.5 text-left transition-colors ${
                  breakfast
                    ? "border-dorado bg-dorado/10"
                    : "border-esmeralda-900/15 bg-white hover:border-esmeralda-900/35"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Croissant
                    className={`h-5 w-5 ${breakfast ? "text-dorado-dark" : "text-esmeralda-800/60"}`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-[13px] font-medium text-esmeralda-900">
                      Desayuno en La Gaviata
                    </span>
                    <span className="block text-[11px] text-tinta/60">
                      +$12 por persona / noche · opcionales
                    </span>
                  </span>
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center border transition-colors ${
                    breakfast
                      ? "border-dorado bg-dorado text-esmeralda-950"
                      : "border-esmeralda-900/30 bg-white"
                  }`}
                >
                  {breakfast && <Check className="h-4 w-4" aria-hidden="true" />}
                </span>
              </button>

              <div className="mt-6 border border-esmeralda-900/15 bg-white p-5">
                <p className="label-caps-dark mb-3">Desglose estimado</p>
                {nights > 0 && breakdown ? (
                  <dl className="space-y-2 text-[13px]">
                    <div className="flex justify-between">
                      <dt className="text-tinta/70">
                        {formatUSD(currentSuite.rate)} × {nights}{" "}
                        {nights === 1 ? "noche" : "noches"}
                      </dt>
                      <dd className="font-medium text-esmeralda-900">
                        {formatUSD(breakdown.room)}
                      </dd>
                    </div>
                    {breakfast && (
                      <div className="flex justify-between">
                        <dt className="text-tinta/70">
                          Desayuno · {localGuests}{" "}
                          {localGuests === 1 ? "persona" : "personas"} × {nights}
                        </dt>
                        <dd className="font-medium text-esmeralda-900">
                          {formatUSD(breakdown.breakfast)}
                        </dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-tinta/70">IVA de hospedaje (16%)</dt>
                      <dd className="font-medium text-esmeralda-900">
                        {formatUSD(breakdown.iva)}
                      </dd>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-esmeralda-900/10 pt-3">
                      <dt className="text-[12px] uppercase tracking-[0.18em] text-esmeralda-800">
                        Total estimado
                      </dt>
                      <dd className="font-display text-2xl text-esmeralda-900">
                        {formatUSD(breakdown.total)}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-[13px] text-tinta/60">
                    Selecciona fechas válidas para ver el desglose.
                  </p>
                )}
              </div>

              <button
                type="button"
                disabled={nights < 1 || Boolean(dateError)}
                onClick={() => setStep("form")}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={submitGuest} className="p-7 sm:p-10">
            <p className="label-caps-dark">Datos del huésped</p>
            <h3 className="mt-2 font-display text-3xl font-light text-esmeralda-900">
              Casi listo, {guest.name ? guest.name.split(" ")[0] : "viajero"}
            </h3>
            <p className="mt-3 text-[13px] leading-relaxed text-tinta/65">
              {currentSuite.name} · {formatDate(localDates.checkIn)} →{" "}
              {formatDate(localDates.checkOut)} · {nights}{" "}
              {nights === 1 ? "noche" : "noches"} · {localGuests}{" "}
              {localGuests === 1 ? "huésped" : "huéspedes"} · Total{" "}
              <strong className="text-esmeralda-900">{formatUSD(breakdown?.total ?? 0)}</strong>
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="g-name" className="label-caps-dark mb-1 block">
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-dorado" aria-hidden="true" />
                  <input
                    id="g-name"
                    type="text"
                    value={guest.name}
                    onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                    placeholder="Tu nombre y apellido"
                    className="input-field pl-7"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="g-email" className="label-caps-dark mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-dorado" aria-hidden="true" />
                  <input
                    id="g-email"
                    type="email"
                    value={guest.email}
                    onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="input-field pl-7"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="g-phone" className="label-caps-dark mb-1 block">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-dorado" aria-hidden="true" />
                  <input
                    id="g-phone"
                    type="tel"
                    value={guest.phone}
                    onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                    placeholder="+58 ..."
                    className="input-field pl-7"
                  />
                </div>
              </div>
            </div>

            {guestError && (
              <p className="mt-4 flex items-center gap-2 text-[13px] font-medium text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                {guestError}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
              <button type="submit" className="btn-gold flex-1">
                Confirmar reserva
              </button>
              <button
                type="button"
                onClick={() => setStep("summary")}
                className="btn-ghost flex-1"
              >
                Volver al resumen
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center p-10 text-center sm:p-14">
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dorado bg-dorado/10"
            >
              <BadgeCheck className="h-10 w-10 text-dorado-dark" aria-hidden="true" />
            </motion.span>
            <h3 className="mt-6 font-display text-4xl font-light text-esmeralda-900">
              Reserva confirmada
            </h3>
            <p className="mt-3 text-[14px] text-tinta/70">
              Te esperamos en Gran Roque, {reservation?.guest?.name?.split(" ")[0]}.
            </p>
            <p className="mt-6 border border-dashed border-dorado/60 bg-white px-6 py-3 font-mono text-lg tracking-[0.2em] text-esmeralda-900">
              {reservation?.code}
            </p>
            <p className="mt-3 text-[12px] text-tinta/55">
              Guarda este código: identifica tu reserva en «Mis reservas».
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-8">
              Volver al hotel
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
