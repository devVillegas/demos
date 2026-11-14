import { useCallback, useEffect, useState } from 'react'

export const DEMO_STORAGE_KEY = 'asisnet_demo_web_empresarial'

/**
 * Hook genérico de persistencia local para la demo.
 * Sincroniza el estado con localStorage bajo una clave única
 * y mantiene abiertos los cambios hechos en otras pestañas.
 */
export function useLocalStorage(key, initialValue) {
  const storageKey = `${DEMO_STORAGE_KEY}:${key}`

  const readValue = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      if (raw === null) {
        return initialValue
      }
      return JSON.parse(raw)
    } catch {
      return initialValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  const [storedValue, setStoredValue] = useState(readValue)

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(storedValue))
    } catch {
      /* almacenamiento no disponible: la demo sigue funcionando solo en memoria */
    }
  }, [storageKey, storedValue])

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== storageKey) return
      try {
        setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue)
      } catch {
        /* dato corrupto: se ignora */
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [storageKey, initialValue])

  const setValue = useCallback((value) => {
    setStoredValue((current) => {
      const next = typeof value === 'function' ? value(current) : value
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        /* almacenamiento no disponible */
      }
      return next
    })
  }, [])

  return [storedValue, setValue]
}

export default useLocalStorage
