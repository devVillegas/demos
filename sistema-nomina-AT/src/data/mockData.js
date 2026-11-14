// Datos de ejemplo de la demo NominaPro VE.
// Solo se cargan si la clave localStorage "asisnet_demo_nomina" está vacía.

export const EMPLEADOS_SEMILLA = [
  {
    id: 'emp-mar-001',
    nombre: 'María',
    apellido: 'Rodríguez',
    cedula: 'V-13847291',
    cargo: 'Contadora General',
    departamento: 'Administración',
    salarioBase: 620,
    cestaTicket: 130,
    fechaIngreso: '2021-03-15',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-jos-002',
    nombre: 'José',
    apellido: 'Pérez',
    cedula: 'V-10458223',
    cargo: 'Almacenista',
    departamento: 'Almacén y Logística',
    salarioBase: 380,
    cestaTicket: 130,
    fechaIngreso: '2019-08-01',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-lau-003',
    nombre: 'Luisa',
    apellido: 'Fernández',
    cedula: 'V-17920554',
    cargo: 'Analista de Compras',
    departamento: 'Compras',
    salarioBase: 480,
    cestaTicket: 110,
    fechaIngreso: '2022-01-10',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-car-004',
    nombre: 'Carlos',
    apellido: 'González',
    cedula: 'V-9541027',
    cargo: 'Chofer Repartidor',
    departamento: 'Almacén y Logística',
    salarioBase: 340,
    cestaTicket: 130,
    fechaIngreso: '2018-05-21',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-and-005',
    nombre: 'Andrea',
    apellido: 'Silva',
    cedula: 'V-21554892',
    cargo: 'Ejecutiva de Ventas',
    departamento: 'Ventas',
    salarioBase: 450,
    cestaTicket: 100,
    fechaIngreso: '2023-02-06',
    foto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-mig-006',
    nombre: 'Miguel',
    apellido: 'Herrera',
    cedula: 'V-18990144',
    cargo: 'Desarrollador de Sistemas',
    departamento: 'Tecnología',
    salarioBase: 700,
    cestaTicket: 90,
    fechaIngreso: '2020-11-02',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-pau-007',
    nombre: 'Paula',
    apellido: 'Martínez',
    cedula: 'V-22331708',
    cargo: 'Asistente de Recursos Humanos',
    departamento: 'Recursos Humanos',
    salarioBase: 400,
    cestaTicket: 120,
    fechaIngreso: '2023-09-18',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  },
  {
    id: 'emp-jor-008',
    nombre: 'Jorge',
    apellido: 'Contreras',
    cedula: 'V-14776320',
    cargo: 'Supervisor de Almacén',
    departamento: 'Almacén y Logística',
    salarioBase: 520,
    cestaTicket: 130,
    fechaIngreso: '2017-04-03',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&q=60',
    nuevo: false
  }
]

export const DEPARTAMENTOS = [
  'Administración',
  'Almacén y Logística',
  'Compras',
  'Recursos Humanos',
  'Tecnología',
  'Ventas'
]

export const EMPRESA = {
  nombre: 'Distribuidora Andina C.A.',
  rif: 'J-40123857-6',
  direccion: 'Av. Los Cedros, Edif. Cámara Lara, Piso 3, Barquisimeto, Estado Lara',
  telefono: '+58 (251) 555-0182'
}

export const TASA_BCV_DEFAULT = 40.5
