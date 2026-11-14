import { useCallback, useEffect, useState } from 'react'

const CLAVE_UNICA = 'asisnet_demo_nomina'

function leerAlmacen() {
  try {
    const raw = window.localStorage.getItem(CLAVE_UNICA)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function escribirAlmacen(valor) {
  try {
    window.localStorage.setItem(CLAVE_UNICA, JSON.stringify(valor))
  } catch {
    // Modo demo: si localStorage no está disponible, ignoramos silenciosamente
  }
}

/**
 * Hook de estado persistente para la demo. Toda la demo comparte UNA única
 * clave de localStorage: "asisnet_demo_nomina", con la forma:
 *   { empleados: [...], recibos: [...], creaciones: { id, tipo, ts } }
 *
 * @template T
 * @param {string} campo  Campo dentro del objeto demo ("empleados" | "recibos")
 * @param {T} valorInicial Valor si la clave no existe todavía
 * @returns {[T, (actualizador: (prev: T) => T) => void, () => void]}
 */
export function useDemoStorage(campo, valorInicial) {
  const [valor, setValor] = useState(() => {
    const raiz = leerAlmacen()
    if (raiz && Array.isArray(raiz[campo])) return raiz[campo]
    return valorInicial
  })

  useEffect(() => {
    const raiz = leerAlmacen() || {}
    escribirAlmacen({ ...raiz, [campo]: valor })
  }, [campo, valor])

  // Sincroniza entre pestañas / ventanas de la misma demo
  useEffect(() => {
    function alCambiar(e) {
      if (e.key !== CLAVE_UNICA || e.newValue == null) return
      try {
        const raiz = JSON.parse(e.newValue)
        if (Array.isArray(raiz[campo])) setValor(raiz[campo])
      } catch {
        // ignorar payloads corruptos
      }
    }
    window.addEventListener('storage', alCambiar)
    return () => window.removeEventListener('storage', alCambiar)
  }, [campo])

  const actualizar = useCallback((actualizador) => {
    setValor((prev) => (typeof actualizador === 'function' ? actualizador(prev) : actualizador))
  }, [])

  const limpiar = useCallback(() => {
    setValor(valorInicial)
  }, [valorInicial])

  return [valor, actualizar, limpiar]
}

export { CLAVE_UNICA }
