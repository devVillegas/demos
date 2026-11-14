import { useState } from "react";
import { Palmtree } from "lucide-react";

/**
 * Imagen con respaldo: si la URL de Unsplash falla, se oculta la imagen
 * y se muestra un degradado de la identidad del hotel.
 */
export default function SmartImage({ src, alt, className = "", imgClassName = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-esmeralda-900 via-esmeralda-700 to-dorado/60 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_30%_20%,#e4c55b_0,transparent_45%),radial-gradient(circle_at_75%_80%,#e8dcc8_0,transparent_40%)]" />
        <Palmtree className="h-10 w-10 text-arena-200/70" strokeWidth={1} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
