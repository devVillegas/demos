import { useCallback, useEffect, useState } from "react";

const DEMO_STORAGE_KEY = "asisnet_demo_hoteles";

/**
 * Hook genérico de persistencia para la demo Asisnet.
 * Toda la demo usa la clave única "asisnet_demo_hoteles".
 */
export function useLocalStorage(initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
      if (raw === null) return initialValue;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Almacenamiento no disponible (modo privado): la demo sigue funcionando en memoria.
    }
  }, [value]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(DEMO_STORAGE_KEY);
    } catch {
      // Sin operación: si el storage falla no interrumpimos la demo.
    }
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue, reset];
}

export { DEMO_STORAGE_KEY };
