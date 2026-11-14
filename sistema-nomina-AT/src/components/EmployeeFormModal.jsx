import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserRound, BadgeCheck, CalendarDays } from 'lucide-react'
import ModalShell from './ModalShell.jsx'
import { DEPARTAMENTOS } from '../data/mockData.js'

const FORM_VACIO = {
  nombre: '',
  apellido: '',
  cedula: '',
  cargo: '',
  departamento: '',
  salarioBase: '',
  cestaTicket: '',
  fechaIngreso: ''
}

const PATRON_CEDULA = /^V-\d{7,8}$/

export default function EmployeeFormModal({ abierto, onCerrar, onGuardar, empleadoEditar }) {
  const esEdicion = Boolean(empleadoEditar)
  const [form, setForm] = useState(() => {
    if (!empleadoEditar) return FORM_VACIO
    return {
      nombre: empleadoEditar.nombre,
      apellido: empleadoEditar.apellido,
      cedula: empleadoEditar.cedula,
      cargo: empleadoEditar.cargo,
      departamento: empleadoEditar.departamento,
      salarioBase: String(empleadoEditar.salarioBase),
      cestaTicket: empleadoEditar.cestaTicket != null ? String(empleadoEditar.cestaTicket) : '',
      fechaIngreso: empleadoEditar.fechaIngreso || ''
    }
  })
  const [errores, setErrores] = useState({})

  function setCampo(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
    setErrores((e) => ({ ...e, [campo]: undefined }))
  }

  function validar() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    if (!form.apellido.trim()) e.apellido = 'El apellido es obligatorio'
    const cedula = form.cedula.trim().toUpperCase()
    if (!cedula) e.cedula = 'La cédula es obligatoria'
    else if (!PATRON_CEDULA.test(cedula)) e.cedula = 'Formato: V-12345678 (7 u 8 dígitos)'
    if (!form.cargo.trim()) e.cargo = 'El cargo es obligatorio'
    if (!form.departamento) e.departamento = 'Selecciona un departamento'
    const salario = parseFloat(String(form.salarioBase).replace(',', '.'))
    if (!form.salarioBase || !Number.isFinite(salario) || salario <= 0) {
      e.salarioBase = 'Ingresa un salario mayor a 0'
    } else if (salario > 100000) {
      e.salarioBase = 'El salario parece demasiado alto'
    }
    if (form.cestaTicket !== '') {
      const cesta = parseFloat(String(form.cestaTicket).replace(',', '.'))
      if (!Number.isFinite(cesta) || cesta < 0) e.cestaTicket = 'Debe ser un monto válido'
    }
    if (!form.fechaIngreso) e.fechaIngreso = 'La fecha de ingreso es obligatoria'
    else if (new Date(form.fechaIngreso) > new Date()) e.fechaIngreso = 'No puede ser futura'
    return e
  }

  function enviar(ev) {
    ev.preventDefault()
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length > 0) return
    const datos = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      cedula: form.cedula.trim().toUpperCase(),
      cargo: form.cargo.trim(),
      departamento: form.departamento,
      salarioBase: parseFloat(String(form.salarioBase).replace(',', '.')),
      cestaTicket: form.cestaTicket === '' ? 0 : parseFloat(String(form.cestaTicket).replace(',', '.')),
      fechaIngreso: form.fechaIngreso
    }
    onGuardar(datos)
  }

  const claseInput = (campo) =>
    `w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-ink-950 placeholder-ink-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
      errores[campo] ? 'border-rosita-600' : 'border-ink-200 focus:border-brand-600'
    }`

  const Etiqueta = ({ children }) => (
    <label className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-wider text-ink-500">
      {children}
    </label>
  )

  const Error = ({ campo }) => (
    <AnimatePresence>
      {errores[campo] && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-1.5 text-[11.5px] font-medium text-rosita-600"
        >
          {errores[campo]}
        </motion.p>
      )}
    </AnimatePresence>
  )

  return (
    <ModalShell
      abierto={abierto}
      onCerrar={onCerrar}
      titulo={esEdicion ? 'Editar empleado' : 'Nuevo empleado'}
      subtitulo="Los datos se guardan en tu navegador (modo demo)."
      ancho="max-w-xl"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-800 shadow-soft hover:bg-ink-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="form-empleado"
            className="rounded-xl bg-gradient-to-r from-brand-600 to-violetx-600 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lift transition-all hover:-translate-y-px hover:shadow-modal"
          >
            {esEdicion ? 'Guardar cambios' : 'Agregar a la nómina'}
          </button>
        </div>
      }
    >
      <form id="form-empleado" onSubmit={enviar} noValidate>
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-violetx-600 text-white shadow-soft">
            <UserRound className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
          </div>
          <p className="text-[12px] leading-snug text-ink-700">
            Cédula en formato venezolano <span className="font-semibold">V-12345678</span>. Salarios y cesta ticket en
            USD.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Etiqueta>Nombre</Etiqueta>
            <input
              className={claseInput('nombre')}
              value={form.nombre}
              onChange={(e) => setCampo('nombre', e.target.value)}
              placeholder="María"
              maxLength={40}
            />
            <Error campo="nombre" />
          </div>
          <div>
            <Etiqueta>Apellido</Etiqueta>
            <input
              className={claseInput('apellido')}
              value={form.apellido}
              onChange={(e) => setCampo('apellido', e.target.value)}
              placeholder="Rodríguez"
              maxLength={40}
            />
            <Error campo="apellido" />
          </div>
          <div>
            <Etiqueta>Cédula de identidad</Etiqueta>
            <input
              className={`tabular ${claseInput('cedula')}`}
              value={form.cedula}
              onChange={(e) => setCampo('cedula', e.target.value)}
              placeholder="V-12345678"
              maxLength={10}
            />
            <Error campo="cedula" />
          </div>
          <div>
            <Etiqueta>Cargo</Etiqueta>
            <input
              className={claseInput('cargo')}
              value={form.cargo}
              onChange={(e) => setCampo('cargo', e.target.value)}
              placeholder="Analista de Compras"
              maxLength={50}
            />
            <Error campo="cargo" />
          </div>
          <div className="sm:col-span-2">
            <Etiqueta>Departamento</Etiqueta>
            <select
              className={claseInput('departamento')}
              value={form.departamento}
              onChange={(e) => setCampo('departamento', e.target.value)}
            >
              <option value="">Selecciona un departamento…</option>
              {DEPARTAMENTOS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <Error campo="departamento" />
          </div>
          <div>
            <Etiqueta>Salario base (USD)</Etiqueta>
            <input
              className={`tabular ${claseInput('salarioBase')}`}
              value={form.salarioBase}
              onChange={(e) => setCampo('salarioBase', e.target.value)}
              placeholder="450.00"
              inputMode="decimal"
            />
            <Error campo="salarioBase" />
          </div>
          <div>
            <Etiqueta>
              Cesta ticket mensual (USD) <span className="font-normal normal-case text-ink-400">opcional</span>
            </Etiqueta>
            <input
              className={`tabular ${claseInput('cestaTicket')}`}
              value={form.cestaTicket}
              onChange={(e) => setCampo('cestaTicket', e.target.value)}
              placeholder="130.00"
              inputMode="decimal"
            />
            <Error campo="cestaTicket" />
          </div>
          <div className="sm:col-span-2">
            <Etiqueta>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> Fecha de ingreso
              </span>
            </Etiqueta>
            <input
              type="date"
              className={claseInput('fechaIngreso')}
              value={form.fechaIngreso}
              onChange={(e) => setCampo('fechaIngreso', e.target.value)}
              max={new Date().toISOString().slice(0, 10)}
            />
            <Error campo="fechaIngreso" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-ink-100 px-3.5 py-2.5 text-[11.5px] text-ink-700">
          <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
          Aparecerá de inmediato en la tabla con el badge{' '}
          <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-600">
            Nuevo
          </span>
        </div>
      </form>
    </ModalShell>
  )
}
