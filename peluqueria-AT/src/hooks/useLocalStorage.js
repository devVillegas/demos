export const DEMO_KEY = 'asisnet_demo_peluqueria';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook genérico de persistencia. Toda la demo de peluquería usa la clave
 * única DEMO_KEY ("asisnet_demo_peluqueria"), pero el hook acepta cualquier
 * clave por si se reutiliza en otro contexto.
 */
export default function useLocalStorage(initialValue, key = DEMO_KEY) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn(`No se pudo leer "${key}" del almacenamiento local:`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`No se pudo guardar "${key}" en el almacenamiento local:`, error);
    }
  }, [key, value]);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`No se pudo borrar "${key}" del almacenamiento local:`, error);
    }
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, reset];
}
