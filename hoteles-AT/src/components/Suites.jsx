import { motion } from "framer-motion";
import {
  Wifi, Wind, Coffee, ShowerHead, Lock, TreePine, Umbrella, CupSoda,
  Bath, Sun, Wine, Waves, ConciergeBell, BedDouble, ChefHat, Users,
  Maximize, Eye, CalendarDays
} from "lucide-react";
import { suites, amenityLabels } from "../data/mockData";
import { formatUSD } from "../lib/pricing";
import SmartImage from "./SmartImage";

const amenityIcons = {
  wifi: Wifi,
  aire: Wind,
  desayunoZona: Coffee,
  ducha: ShowerHead,
  cajaFuerte: Lock,
  patio: TreePine,
  duchaExterior: ShowerHead,
  hamaca: Umbrella,
  cafe: CupSoda,
  banyera: Bath,
  balcon: Sun,
  minibar: Wine,
  vista: Eye,
  piscinaPrivada: Waves,
  mayordomo: ConciergeBell,
  dosDormitorios: BedDouble,
  terraza: Sun,
  chef: ChefHat
};

function SuiteCard({ suite, dates, guests, nights, onReserve, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-esmeralda-900/10 bg-white shadow-card transition-shadow duration-500 hover:shadow-float"
    >
      <div className="relative">
        <SmartImage
          src={suite.image}
          alt={`Suite ${suite.name}`}
          className="aspect-[4/3] w-full"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 border border-arena-200/40 bg-esmeralda-950/70 px-3 py-1.5 text-[10px] uppercase tracking-label text-arena-100 backdrop-blur">
          {suite.view}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl font-medium text-esmeralda-900 sm:text-[28px]">
          {suite.name}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-tinta/70">
          {suite.description}
        </p>

        <div className="mt-5 flex items-center gap-6 border-y border-esmeralda-900/10 py-3.5 text-[12px] uppercase tracking-[0.18em] text-esmeralda-800">
          <span className="inline-flex items-center gap-2">
            <Maximize className="h-4 w-4 text-dorado" aria-hidden="true" />
            {suite.area} m²
          </span>
          <span className="inline-flex items-center gap-2">
            <Users className="h-4 w-4 text-dorado" aria-hidden="true" />
            {suite.capacity} huésp.
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {suite.amenities.map((a) => {
            const Icon = amenityIcons[a] ?? Coffee;
            return (
              <li
                key={a}
                className="inline-flex items-center gap-1.5 text-[12px] text-tinta/65"
                title={amenityLabels[a]?.label}
              >
                <Icon className="h-3.5 w-3.5 text-dorado" aria-hidden="true" />
                {amenityLabels[a]?.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <p className="leading-none">
            <span className="font-display text-3xl text-esmeralda-900">
              {formatUSD(suite.rate)}
            </span>
            <span className="ml-1.5 text-[12px] uppercase tracking-[0.18em] text-tinta/55">
              / noche · IVA incl. aparte
            </span>
          </p>
          {nights > 0 && (
            <p className="text-[12px] text-dorado-dark">
              ≈ {formatUSD(suite.rate * nights)} por {nights}{" "}
              {nights === 1 ? "noche" : "noches"}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onReserve(suite)}
          className="btn-primary mt-6 w-full"
        >
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          Reservar esta suite
        </button>
        {dates.checkIn && dates.checkOut && nights > 0 && (
          <p className="mt-2.5 text-center text-[12px] text-tinta/55">
            Fechas seleccionadas: {dates.checkIn} → {dates.checkOut} · {guests}{" "}
            {guests === 1 ? "huésped" : "huéspedes"}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function Suites({ dates, guests, nights, onReserve }) {
  return (
    <section id="suites" className="section-pad bg-esmeralda-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start gap-4">
          <p className="label-caps">Las suites</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light text-arena-50 sm:text-6xl">
              Cuatro maneras de quedarse
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed text-arena-200/70">
              Cada suite lleva la firma de una artesana roqueña distinta. Elige
              la tuya y reserva en un minuto.
            </p>
          </div>
          <span className="divider-line" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {suites.map((suite, i) => (
            <SuiteCard
              key={suite.id}
              suite={suite}
              dates={dates}
              guests={guests}
              nights={nights}
              onReserve={onReserve}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
