import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, ArrowRight, AlertCircle } from "lucide-react";
import { hotel, guestOptions } from "../data/mockData";
import { validateDates, todayStr, addDaysStr } from "../lib/pricing";
import SmartImage from "./SmartImage";

const HERO_IMG =
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80";

export default function Hero({ dates, guests, onDates, onGuests, onSearch }) {
  const ref = useRef(null);
  const [error, setError] = useState(null);

  const { scrollY } = useScroll();
  const yImg = useTransform(scrollY, [0, 800], [0, 180]);
  const opacityText = useTransform(scrollY, [0, 450], [1, 0.15]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validateDates(dates.checkIn, dates.checkOut);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onSearch();
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y: yImg }} className="absolute inset-0 -bottom-48">
        <SmartImage
          src={HERO_IMG}
          alt="Mar caribe turquesa frente a Casa del Viento"
          className="h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-esmeralda-950/70 via-esmeralda-950/35 to-esmeralda-950/85" />

      <motion.div
        style={{ opacity: opacityText }}
        className="section-pad relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="pb-8">
          <motion.p variants={item} className="label-caps mb-5">
            {hotel.location}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-5xl font-light leading-[1.05] text-arena-50 sm:text-7xl lg:text-8xl"
          >
            Casa del Viento
          </motion.h1>
          <motion.div variants={item} className="mx-auto my-6 flex items-center gap-4">
            <span className="divider-line" />
            <span className="font-display text-xl italic text-arena-200/90 sm:text-2xl">
              {hotel.tagline}
            </span>
            <span className="divider-line" />
          </motion.div>
          <motion.p variants={item} className="mx-auto max-w-xl text-[15px] leading-relaxed text-arena-200/75">
            Cuatro suites de autor en el Gran Roque, donde el arrecife empieza
            donde termina tu terraza.
          </motion.p>
        </motion.div>

        <motion.form
          variants={item}
          onSubmit={handleSubmit}
          className="mt-8 w-full max-w-3xl border border-arena-200/25 bg-esmeralda-950/70 p-4 shadow-float backdrop-blur-md sm:p-5"
          aria-label="Búsqueda de disponibilidad"
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <div className="flex flex-col gap-1 border-arena-200/15 sm:border-r sm:pr-4">
              <label htmlFor="hero-checkin" className="label-caps mb-0.5">
                Llegada
              </label>
              <input
                id="hero-checkin"
                type="date"
                min={todayStr()}
                value={dates.checkIn}
                onChange={(e) => {
                  onDates({ ...dates, checkIn: e.target.value });
                  setError(null);
                }}
                className="input-dark"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="hero-checkout" className="label-caps mb-0.5">
                Salida
              </label>
              <input
                id="hero-checkout"
                type="date"
                min={dates.checkIn ? addDaysStr(dates.checkIn, 1) : todayStr()}
                value={dates.checkOut}
                onChange={(e) => {
                  onDates({ ...dates, checkOut: e.target.value });
                  setError(null);
                }}
                className="input-dark"
              />
            </div>
            <div className="flex flex-col justify-end">
              <label htmlFor="hero-guests" className="label-caps mb-0.5 sr-only">
                Huéspedes
              </label>
              <div className="relative">
                <Users
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-dorado"
                  aria-hidden="true"
                />
                <select
                  id="hero-guests"
                  value={guests}
                  onChange={(e) => onGuests(Number(e.target.value))}
                  className="input-dark appearance-none pl-10 pr-8"
                >
                  {guestOptions.map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "huésped" : "huéspedes"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-3 flex items-center gap-2 text-[13px] text-dorado-light">
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-gold mt-4 w-full sm:w-auto sm:px-10"
          >
            Ver disponibilidad
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <span className="block h-10 w-px bg-gradient-to-b from-transparent via-dorado to-transparent" />
      </motion.div>
    </section>
  );
}
