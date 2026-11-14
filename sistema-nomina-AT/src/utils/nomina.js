// Utilidades de cálculo de nómina venezolano referencial (demo).

export const TASA_DEDUCCIONES = {
  ivss: 0.04, // IVSS 4% del salario base
  faov: 0.01, // FAOV 1% del salario base
  rpe: 0.005  // RPE 0,5% del salario base
}

/**
 * Calcula la nómina referencial de un empleado.
 * Deducciones del trabajador: IVSS 4% + FAOV 1% + RPE 0,5% (sobre el salario base).
 * Asignaciones: salario base + cesta ticket (no tributable).
 * Neto a pagar en USD y su equivalente en Bs con la tasa referencial.
 */
export function calcNomina(empleado, tasa) {
  const base = Number(empleado.salarioBase) || 0
  const cesta = Number(empleado.cestaTicket) || 0
  const ivss = base * TASA_DEDUCCIONES.ivss
  const faov = base * TASA_DEDUCCIONES.faov
  const rpe = base * TASA_DEDUCCIONES.rpe
  const totalDeducciones = ivss + faov + rpe
  const totalAsignaciones = base + cesta
  const netoUsd = totalAsignaciones - totalDeducciones
  const netoBs = netoUsd * (Number(tasa) || 0)
  return { base, cesta, ivss, faov, rpe, totalDeducciones, totalAsignaciones, netoUsd, netoBs }
}

export function totalNominaUSD(empleados, tasa) {
  return empleados.reduce((acc, emp) => acc + calcNomina(emp, tasa).netoUsd, 0)
}

export function totalNominaBs(empleados, tasa) {
  return totalNominaUSD(empleados, tasa) * (Number(tasa) || 0)
}

export function resumenPorDepartamento(empleados, tasa) {
  const mapa = new Map()
  for (const emp of empleados) {
    const depto = emp.departamento || 'Sin departamento'
    const calc = calcNomina(emp, tasa)
    if (!mapa.has(depto)) {
      mapa.set(depto, { departamento: depto, personas: 0, asignaciones: 0, deducciones: 0, neto: 0 })
    }
    const fila = mapa.get(depto)
    fila.personas += 1
    fila.asignaciones += calc.totalAsignaciones
    fila.deducciones += calc.totalDeducciones
    fila.neto += calc.netoUsd
  }
  return Array.from(mapa.values()).sort((a, b) => b.neto - a.neto)
}

const USD = new Intl.NumberFormat('es-VE', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

export function fmtUSD(valor) {
  const n = Number(valor) || 0
  return n < 0 ? '-' + USD.format(Math.abs(n)) : USD.format(n)
}

export function fmtBs(valor) {
  const n = Number(valor) || 0
  const s = new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n)
  return 'Bs ' + s
}

export function fmtNum(valor) {
  return new Intl.NumberFormat('es-VE', { maximumFractionDigits: 0 }).format(Number(valor) || 0)
}

export function fmtFecha(iso) {
  if (!iso) return '—'
  const d = new Date(iso + 'T00:00:00')
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('es-VE', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function fmtFechaHora(ts) {
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('es-VE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function iniciales(nombre, apellido) {
  return ((nombre || '').charAt(0) + (apellido || '').charAt(0)).toUpperCase() || '—'
}
