export const STORAGE_KEY = "asisnet_demo_salon_eventos"

export const venue = {
  nombre: "Salón Dorado Events",
  ciudad: "Caracas",
  lema: "Donde cada celebración se convierte en leyenda",
  descripcion:
    "Tres décadas elevando celebraciones en Caracas. Cuatro espacios únicos, un equipo de producción integral y una obsesión: que cada detalle brille en oro.",
  telefono: "+58 212 555 0199",
  whatsapp: "+58 412 555 0199",
  email: "reservas@salondoradoevents.com",
  direccion: "Av. Principal La Castellana, Torre Dorado, Piso 3, Caracas 1060, Venezuela",
  horario: "Lun a Sáb · 9:00 am — 7:00 pm",
  instagram: "@salondorado.ve",
  stats: {
    eventos: 1240,
    capacidad: 590,
    anos: 18,
  },
}

const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

export const salones = [
  {
    id: "cristal",
    nombre: "Salón Cristal",
    uso: "Bodas",
    capacidad: 250,
    m2: 480,
    ventaja: "Pista de baile bajo techo de cristal con corte de luz estelar",
    descripcion:
      "Nuestro espacio insignia. Un salón de doble altura con techo de cristal, flooring espejado y una pista de baile central que se enciende en escena. Escenografía modular para ceremonia y recepción en un mismo flujo.",
    imagen: u("1519167758481-83f550bb49b3"),
    galeria: [u("1519741497674-611481863552"), u("1465495976277-4387d4b0b4c6"), u("1519225421980-715cb0215aed")],
    tarifaBase: 1200,
  },
  {
    id: "ambar",
    nombre: "Ámbar",
    uso: "Corporativo",
    capacidad: 120,
    m2: 260,
    ventaja: "Sala ejecutiva con videowall 4K y cabina de traducción simultánea",
    descripcion:
      "Diseñado para reuniones que exigen altura: videowall LED de 6 metros, iluminación de escena programable, sistema de audio conferencia y catering de coffee break de autor. Perfecto para lanzamientos, convenciones y juntas anuales.",
    imagen: u("1540575467063-178a50c2df87"),
    galeria: [u("1505373877841-8d25f7d46678"), u("1414235077428-338989a4e8c0"), u("1511578314322-379afb476865")],
    tarifaBase: 800,
  },
  {
    id: "terraza",
    nombre: "Terraza Jardín",
    uso: "Coctelería",
    capacidad: 180,
    m2: 520,
    ventaja: "Skyline de Caracas al atardecer con pérgolas iluminadas",
    descripcion:
      "Una terraza panorámica entre pérgolas de luz cálida y vegetación tropical. Estaciones de coctelería de autor, barras flotantes y el atardecer caraqueño como telón de fondo. Ideal para receptions, lanzamientos de marca y celebraciones al aire libre.",
    imagen: u("1470337458703-46ad1756a187"),
    galeria: [u("1464366400600-7168b8af9bc3"), u("1425421669292-0c3da3b8f529"), u("1511795409834-ef04a87a4a9e")],
    tarifaBase: 950,
  },
  {
    id: "vault",
    nombre: "Íntimo Vault",
    uso: "Celebraciones privadas",
    capacidad: 40,
    m2: 90,
    ventaja: "Bóveda privada con mesa de chef para 16 comensales",
    descripcion:
      "El secreto mejor guardado de la casa: una bóveda de concreto aparente, velas, una mesa communal de nogal y servicio de chef a la vista. Cenas de aniversario, compromisos privados y cenas de degustación para grupos selectos.",
    imagen: u("1517248135467-4c7edcad34c4"),
    galeria: [u("1414235077428-338989a4e8c0"), u("1555244162-803834f70033"), u("1476224203421-9ac39bcb3327")],
    tarifaBase: 450,
  },
]

export const tiposEvento = [
  { id: "boda", nombre: "Boda", icono: "💍", recargoPct: 0 },
  { id: "corporativo", nombre: "Corporativo", icono: "💼", recargoPct: 0 },
  { id: "quinceanera", nombre: "Quinceañera", icono: "👑", recargoPct: 5 },
  { id: "aniversario", nombre: "Aniversario", icono: "🥂", recargoPct: 0 },
]

export const duraciones = [
  { horas: 4, etiqueta: "4 horas", multiplicador: 1.0 },
  { horas: 6, etiqueta: "6 horas", multiplicador: 1.25 },
  { horas: 8, etiqueta: "8 horas", multiplicador: 1.5 },
]

export const extras = [
  {
    id: "banquete",
    nombre: "Banquete 3 tiempos",
    descripcion: "Menú de autor: entrada, fondo y postre con servicio a la mesa",
    precio: 38,
    unidad: "persona",
    icono: "🍽️",
  },
  {
    id: "bar",
    nombre: "Bar premium",
    descripcion: "Coctelería de autor, espumantes y barra de destilados selectos",
    precio: 22,
    unidad: "persona",
    icono: "🍸",
  },
  {
    id: "dj",
    nombre: "DJ & sonido",
    descripcion: "DJ residente, cabina line-array y luces de pista sincronizadas",
    precio: 450,
    unidad: "evento",
    icono: "🎧",
  },
  {
    id: "iluminacion",
    nombre: "Iluminación arquitectónica",
    descripcion: "Diseño de luz programable sobre fachada, salón y pistas",
    precio: 380,
    unidad: "evento",
    icono: "💡",
  },
  {
    id: "foto",
    nombre: "Fotografía & video",
    descripcion: "Dúo de fotógrafos, video cinematográfico y Same-Day Edit",
    precio: 650,
    unidad: "evento",
    icono: "📸",
  },
  {
    id: "mobiliario",
    nombre: "Mobiliario VIP",
    descripcion: "Mesionas imperiales, sillas Tiffany doradas y lounge de terciopelo",
    precio: 12,
    unidad: "persona",
    icono: "🪑",
  },
]

export const galeriaEventos = [
  {
    titulo: "Boda Valentina & Andrés",
    salon: "Salón Cristal",
    imagen: u("1511578314322-379afb476865"),
  },
  {
    titulo: "Noche de chispas doradas",
    salon: "Terraza Jardín",
    imagen: u("1492684223066-81342ee5ff30"),
  },
  {
    titulo: "Confetti de quinceañera",
    salon: "Salón Cristal",
    imagen: u("1513151233558-d860c5398176"),
  },
  {
    titulo: "Convención TechSummit 2025",
    salon: "Ámbar",
    imagen: u("1470229722913-7c0e2dbbafd3"),
  },
  {
    titulo: "Coctel de lanzamiento Aurea",
    salon: "Terraza Jardín",
    imagen: u("1459749411175-04bf5292ceea"),
  },
  {
    titulo: "Cena de chef · Aniversario 40",
    salon: "Íntimo Vault",
    imagen: u("1520333789090-1afc82db536a"),
  },
]

export const testimonios = [
  {
    nombre: "Valentina Márquez",
    evento: "Boda · Salón Cristal",
    texto:
      "Nuestros invitados siguen hablando del momento en que se encendió la pista bajo el techo de cristal. El equipo de Salón Dorado nos llevó de la mano durante diez meses y no falló en un solo detalle.",
  },
  {
    nombre: "Ricardo Fuenmayor",
    evento: "Convención anual · Ámbar",
    texto:
      "Producción de nivel internacional sin salir de Caracas. El videowall, la iluminación y el catering hicieron que nuestro lanzamiento pareciera de Silicon Valley. Ya reservamos el próximo año.",
  },
  {
    nombre: "Camila & Diego Rondón",
    evento: "Aniversario 25 · Íntimo Vault",
    texto:
      "Cenamos dieciséis personas en la bóveda con el chef a la vista. Intimidad perfecta, vino impecable y una atención que se sintió de familia. La noche más especial de nuestros veinticinco años.",
  },
]
