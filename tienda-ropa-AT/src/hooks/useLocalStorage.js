import { useState, useEffect } from 'react'

/**
 * Hook genérico de persistencia con la clave única de esta demo.
 * Sincroniza el estado con localStorage de forma segura (modo demo 100% frontend).
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`No se pudo leer "${key}" de localStorage:`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`No se pudo guardar "${key}" en localStorage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}
