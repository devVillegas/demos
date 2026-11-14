import { useState, useEffect, useCallback } from "react"

/**
 * Hook genérico de persistencia en localStorage.
 * Guarda/lee el valor bajo una clave única de la demo.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* almacenamiento no disponible: la demo sigue funcionando en memoria */
    }
  }, [key, value])

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      /* noop */
    }
    setValue(initialValue)
  }, [key, initialValue])

  return [value, setValue, remove]
}

export default useLocalStorage
