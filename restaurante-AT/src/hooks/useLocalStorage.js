import { useEffect, useState } from "react";

/**
 * Hook genérico de persistencia en localStorage.
 * Guarda objetos completos y hace merge con el valor inicial,
 * de modo que añadir nuevas colecciones a la demo nunca rompe datos viejos.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (!stored) return initialValue;
      const parsed = JSON.parse(stored);
      if (Array.isArray(initialValue)) {
        return Array.isArray(parsed) ? parsed : initialValue;
      }
      if (typeof initialValue === "object" && initialValue !== null) {
        return typeof parsed === "object" && parsed !== null
          ? { ...initialValue, ...parsed }
          : initialValue;
      }
      return parsed;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* almacenamiento no disponible: la demo sigue funcionando en memoria */
    }
  }, [key, value]);

  return [value, setValue];
}
