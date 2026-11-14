import { useState } from 'react';

const FALLBACK_GRADIENTS = [
  'from-powder-soft/70 via-gold-soft/40 to-cream-deep',
  'from-gold-soft/60 via-powder-soft/40 to-cream-deep',
  'from-powder-soft/50 via-cream-deep to-powder-soft/30',
];

function pickGradient(gradient, seed) {
  if (gradient) return gradient;
  return FALLBACK_GRADIENTS[seed % FALLBACK_GRADIENTS.length];
}

export default function SmartImage({ src, alt, className = '', gradient, seed = 0, ...rest }) {
  const [failed, setFailed] = useState(false);
  const fallback = pickGradient(gradient, seed);

  if (failed) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={`pointer-events-none bg-gradient-to-br ${fallback} ${className}`}
        {...rest}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
