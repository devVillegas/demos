import { MapPin, Phone, Mail, RotateCcw } from "lucide-react";
import { hotel } from "../data/mockData";
import { DEMO_STORAGE_KEY } from "../hooks/useLocalStorage";

export default function Footer() {
  const resetDemo = () => {
    try {
      window.localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch {
      // Sin operación: si el storage falla, recargamos igualmente.
    }
    window.location.reload();
  };

  return (
    <footer className="section-pad border-t border-arena-200/10 bg-esmeralda-950 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-arena-100">{hotel.name}</p>
          <p className="mt-1 text-[10px] uppercase tracking-label text-dorado">
            {hotel.subtitle}
          </p>
          <p className="mt-5 max-w-md text-[13px] leading-relaxed text-arena-200/65">
            Una casa boutique de cuatro suites en el Gran Roque. Demo web
            interactiva construida por Asisnet: los datos de reserva viven
            únicamente en tu navegador.
          </p>
        </div>

        <nav aria-label="Secciones del sitio">
          <p className="label-caps mb-4">Explorar</p>
          <ul className="space-y-2.5 text-[13px] text-arena-200/75">
            {[
              ["#suites", "Suites"],
              ["#galeria", "Galería"],
              ["#servicios", "Servicios"],
              ["#testimonios", "Voces"],
              ["#mis-reservas", "Mis reservas"]
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-dorado">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label-caps mb-4">Contacto</p>
          <ul className="space-y-3 text-[13px] text-arena-200/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-dorado" aria-hidden="true" />
              {hotel.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-dorado" aria-hidden="true" />
              {hotel.phone}
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-dorado" aria-hidden="true" />
              {hotel.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-arena-200/10 pt-7 sm:flex-row">
        <p className="text-[11px] text-arena-300/50">
          © {new Date().getFullYear()} Casa del Viento · Demo interactiva de Asisnet
        </p>
        <button
          type="button"
          onClick={resetDemo}
          className="inline-flex items-center gap-2 border border-arena-200/20 px-4 py-2 text-[10px] uppercase tracking-label text-arena-300/70 transition-colors hover:border-dorado/60 hover:text-dorado"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Resetear datos de demo
        </button>
      </div>
    </footer>
  );
}
