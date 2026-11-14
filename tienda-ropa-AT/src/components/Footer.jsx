import { RotateCcw } from 'lucide-react'
import { CIUDADES_VENEZUELA } from '../data/mockData.js'

export default function Footer({ onReset }) {
  return (
    <footer className="border-t border-line bg-bone">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold">
              ATELIER <span className="text-ember">23</span>
            </p>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ink/60">
              Moda urbana contemporánea cortada en Caracas, pensada para toda Venezuela. Demo interactiva de Asisnet.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Instagram', 'TikTok', 'Pinterest'].map((r) => (
                <span key={r} className="cursor-default rounded-full border border-line px-4 py-1.5 text-[12px] font-medium text-ink/60 transition-colors hover:border-ink hover:text-ink">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Tienda</p>
            <ul className="flex flex-col gap-2.5 text-[14px] text-ink/60">
              <li><a href="#tienda" className="transition-colors hover:text-ember">Camisas</a></li>
              <li><a href="#tienda" className="transition-colors hover:text-ember">Hoodies</a></li>
              <li><a href="#tienda" className="transition-colors hover:text-ember">Pantalones</a></li>
              <li><a href="#tienda" className="transition-colors hover:text-ember">Chaquetas</a></li>
              <li><a href="#tienda" className="transition-colors hover:text-ember">Accesorios</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Ayuda</p>
            <ul className="flex flex-col gap-2.5 text-[14px] text-ink/60">
              <li><a href="#manifiesto" className="transition-colors hover:text-ember">Manifiesto</a></li>
              <li><span className="cursor-default">Envíos a toda Venezuela</span></li>
              <li><span className="cursor-default">Cambios en 14 días</span></li>
              <li><span className="cursor-default">Guía de tallas</span></li>
              <li><span className="cursor-default">Contacto: hola@atelier23.demo</span></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest2 text-stone2">Cobertura</p>
            <ul className="flex flex-col gap-2.5 text-[14px] text-ink/60">
              {CIUDADES_VENEZUELA.slice(0, 5).map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li className="text-ink/40">+ 15 ciudades más…</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-line pt-7 sm:flex-row">
          <p className="text-[12px] text-ink/45">
            © 2026 ATELIER 23 · Demo interactiva creada por Asisnet · Sin pagos reales ni datos compartidos.
          </p>
          <button
            onClick={onReset}
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[11px] font-semibold uppercase tracking-widest2 text-ink/50 transition-all hover:border-ember hover:text-ember"
          >
            <RotateCcw size={13} /> Resetear datos de demo
          </button>
        </div>
      </div>
    </footer>
  )
}
