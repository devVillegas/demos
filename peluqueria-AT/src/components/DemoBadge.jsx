import { Sparkle } from 'lucide-react';

export default function DemoBadge({ count, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 border border-gold/40 bg-cream/95 px-4 py-2.5 shadow-editorial backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-powder hover:shadow-card"
      aria-label={`Abrir visor de datos de la demo, ${count} reservas guardadas`}
    >
      <Sparkle size={14} strokeWidth={1.5} className="shrink-0 text-gold" />
      <span className="font-body text-[10px] font-medium uppercase tracking-widest2 text-ink">
        Modo Demo Interactiva
        <span className="mx-1.5 text-ink-faint">•</span>
        Asisnet
      </span>
      {count > 0 && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-powder px-1.5 font-body text-[10px] font-semibold text-cream">
          {count}
        </span>
      )}
    </button>
  );
}
