import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Trash2, ChevronDown, BedDouble, Users, Moon } from "lucide-react";
import { formatDate, formatUSD } from "../lib/pricing";
import SmartImage from "./SmartImage";

function ReservationCard({ res, onCancel }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-esmeralda-900/10 bg-white shadow-card">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <SmartImage
          src={res.suiteImage}
          alt={res.suiteName}
          className="h-24 w-full shrink-0 sm:h-20 sm:w-32"
        />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] tracking-[0.2em] text-dorado-dark">
            {res.code}
          </p>
          <h4 className="truncate font-display text-xl text-esmeralda-900">
            {res.suiteName}
          </h4>
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-tinta/60">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-dorado" aria-hidden="true" />
              {formatDate(res.checkIn)} → {formatDate(res.checkOut)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5 text-dorado" aria-hidden="true" />
              {res.nights} {res.nights === 1 ? "noche" : "noches"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-dorado" aria-hidden="true" />
              {res.guests}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <p className="font-display text-2xl text-esmeralda-900">
            {formatUSD(res.breakdown.total)}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onCancel(res.id)}
              className="inline-flex items-center gap-1.5 border border-esmeralda-900/20 px-3.5 py-2 text-[11px] uppercase tracking-[0.15em] text-esmeralda-900 transition-colors hover:border-red-700 hover:text-red-700"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-dorado-dark transition-colors hover:text-esmeralda-900"
              aria-expanded={open}
            >
              Detalle
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-esmeralda-900/10"
          >
            <dl className="grid gap-x-8 gap-y-2 px-5 py-5 text-[13px] sm:grid-cols-2">
              <div className="flex justify-between sm:justify-start sm:gap-3">
                <dt className="text-tinta/55">Tarifa × noches</dt>
                <dd className="font-medium text-esmeralda-900">
                  {formatUSD(res.breakdown.room)}
                </dd>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-3">
                <dt className="text-tinta/55">Desayuno</dt>
                <dd className="font-medium text-esmeralda-900">
                  {res.breakfast ? formatUSD(res.breakdown.breakfast) : "No incluido"}
                </dd>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-3">
                <dt className="text-tinta/55">IVA hospedaje (16%)</dt>
                <dd className="font-medium text-esmeralda-900">
                  {formatUSD(res.breakdown.iva)}
                </dd>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-3">
                <dt className="text-tinta/55">Huésped</dt>
                <dd className="font-medium text-esmeralda-900">{res.guest.name}</dd>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-3">
                <dt className="text-tinta/55">Email</dt>
                <dd className="font-medium text-esmeralda-900">{res.guest.email}</dd>
              </div>
              <div className="flex justify-between sm:justify-start sm:gap-3">
                <dt className="text-tinta/55">Teléfono</dt>
                <dd className="font-medium text-esmeralda-900">{res.guest.phone}</dd>
              </div>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function MyReservations({ reservations, onCancel, emptyNote }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } }
  };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="mis-reservas" className="section-pad bg-arena-200/60 py-24 sm:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-4xl"
      >
        <motion.div variants={item} className="mb-10 flex flex-col items-start gap-4">
          <p className="label-caps-dark">Tu bitácora</p>
          <h2 className="font-display text-4xl font-light text-esmeralda-900 sm:text-5xl">
            Mis reservas
          </h2>
          <span className="divider-line" />
        </motion.div>

        {reservations.length === 0 ? (
          <motion.div
            variants={item}
            className="flex flex-col items-center border border-dashed border-esmeralda-900/25 bg-white/60 px-6 py-14 text-center"
          >
            <BedDouble className="h-10 w-10 text-esmeralda-800/40" strokeWidth={1.2} aria-hidden="true" />
            <p className="mt-4 font-display text-2xl text-esmeralda-900">
              Aún no hay reservas en esta demo
            </p>
            <p className="mt-2 max-w-sm text-[13px] text-tinta/60">
              {emptyNote}
            </p>
            <a href="#suites" className="btn-ghost mt-6">
              Ver suites
            </a>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reservations.map((res) => (
              <ReservationCard key={res.id} res={res} onCancel={onCancel} />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
