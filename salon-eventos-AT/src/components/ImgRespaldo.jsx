import { useState } from "react"

/**
 * Imagen con respaldo: si la URL de Unsplash falla, la imagen se oculta
 * y se muestra un degradado dorado con la inicial del nombre dado.
 */
export default function ImgRespaldo({ src, alt, inicial = "✦", className = "", imgClassName = "" }) {
  const [fallo, setFallo] = useState(false)

  if (fallo) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gold-deep/60 via-ink-700 to-ink-800 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-4xl text-gold/70 drop-shadow-[0_0_18px_rgba(212,175,55,0.6)]">
          {inicial}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFallo(true)}
      className={`${className} ${imgClassName}`}
    />
  )
}
