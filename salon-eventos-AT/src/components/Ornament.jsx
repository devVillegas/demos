import { motion } from "framer-motion"

export function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="ornament-line w-16 sm:w-24" />
      <svg width="26" height="14" viewBox="0 0 26 14" fill="none" className="text-gold">
        <path d="M13 1L20 7L13 13L6 7L13 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M13 4L16.5 7L13 10L9.5 7L13 4Z" fill="currentColor" fillOpacity="0.5" />
      </svg>
      <span className="ornament-line w-16 sm:w-24" />
    </div>
  )
}

export function SectionTitle({ kicker, titulo, subtitulo, align = "center" }) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start"
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`flex flex-col ${alignCls}`}
    >
      {kicker && (
        <span className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
          {kicker}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-champagne sm:text-4xl lg:text-5xl">
        {titulo}
      </h2>
      <Ornament className="my-5 w-full" />
      {subtitulo && <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">{subtitulo}</p>}
    </motion.div>
  )
}
