import { memo } from 'react'

const items = [
  'NUEVA COLECCIÓN OTOÑO 23',
  'ENVÍOS A TODA VENEZUELA',
  'ENVÍO GRATIS DESDE $60',
  'CAMBIOS SIN COSTO EN 14 DÍAS',
  'ATELIER 23 — MODA URBANA CONTEMPORÁNEA',
]

function MarqueeInner({ invert }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`px-6 text-[11px] font-semibold uppercase tracking-widest2 ${
              invert ? 'text-bone' : 'text-ink'
            }`}
          >
            {t}
          </span>
          <span className={`text-[11px] ${invert ? 'text-ember' : 'text-ember'}`}>✦</span>
        </span>
      ))}
    </div>
  )
}

function Marquee() {
  return (
    <div className="relative z-40 overflow-hidden border-b border-ink bg-ink py-2.5">
      <div className="flex w-max animate-marquee">
        <MarqueeInner invert />
        <MarqueeInner invert />
        <MarqueeInner invert />
        <MarqueeInner invert />
      </div>
    </div>
  )
}

export default memo(Marquee)
