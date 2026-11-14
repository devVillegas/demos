import { useState } from 'react'
import { iniciales } from '../utils/nomina.js'

/**
 * Avatar con imagen de Unsplash y degradado de respaldo si la imagen falla.
 */
export default function Avatar({ foto, nombre, apellido, size = 'md', className = '' }) {
  const [fallo, setFallo] = useState(false)
  const tamano = {
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-12 w-12 text-sm'
  }[size] || 'h-10 w-10 text-xs'

  if (fallo || !foto) {
    return (
      <div
        className={`${tamano} ${className} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 via-brand-500 to-violetx-600 font-semibold text-white shadow-sm ring-1 ring-white/60`}
        aria-hidden="true"
      >
        {iniciales(nombre, apellido)}
      </div>
    )
  }

  return (
    <img
      src={foto}
      alt={`${nombre} ${apellido}`}
      loading="lazy"
      onError={() => setFallo(true)}
      className={`${tamano} ${className} shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm`}
    />
  )
}
