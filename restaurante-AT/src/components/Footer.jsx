import { Wine, Instagram, Mail, MapPin, Phone, RotateCcw } from "lucide-react";
import { RESTAURANT } from "../data/mockData.js";

export default function Footer({ onResetDemo }) {
  return (
    <footer className="relative bg-ink text-cream texture-dark border-t border-wine/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 md:py-18 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-wine text-cream">
                <Wine size={19} />
              </span>
              <div>
                <p className="font-display text-2xl font-semibold leading-none">Bruma</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">
                  {RESTAURANT.lema}
                </p>
              </div>
            </div>
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              Cocina de autor con mercado del día, brasa de Samán y memorias de
              fogón venezolano. Una demo interactiva presentada por{" "}
              <span className="text-gold font-semibold">Asisnet</span>.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-5">
              Encuéntranos
            </h4>
            <ul className="space-y-3.5 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-wine shrink-0 mt-0.5" />
                {RESTAURANT.direccion}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-wine shrink-0" />
                {RESTAURANT.telefono}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-wine shrink-0" />
                {RESTAURANT.correo}
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram size={15} className="text-wine shrink-0" />
                {RESTAURANT.instagram}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-gold mb-5">
              Navegación
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ["#carta", "La carta"],
                ["#chef", "El chef"],
                ["#reservar", "Reservar mesa"],
                ["#visitanos", "Horarios y ubicación"],
              ].map(([href, texto]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-cream/70 hover:text-gold transition-colors duration-300"
                  >
                    {texto}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-xs text-cream/45 text-center sm:text-left leading-relaxed">
            © {new Date().getFullYear()} Bruma — Cocina de autor. Demo interactiva
            de Asisnet Web Demos. Todo es simulado: no se procesan pagos ni
            reservas reales.
          </p>
          <button
            onClick={onResetDemo}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-cream/50 border border-cream/15 hover:text-gold hover:border-gold/50 transition-colors duration-300"
          >
            <RotateCcw size={13} />
            Resetear datos de demo
          </button>
        </div>
      </div>
    </footer>
  );
}
