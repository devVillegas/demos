import { useState } from 'react'

/**
 * Imagen con respaldo: si falla la carga (sin conexión, URL muerta),
 * oculta la imagen y muestra un degradado de respaldo.
 */
export default function SmartImage({ src, alt, className = '', fallbackClassName = '', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={`bg-gradient-to-br from-electric via-electric-deep to-electric-bright ${fallbackClassName} ${className}`}
        {...rest}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
