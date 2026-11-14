/**
 * Datos ficticios de la demo: Casa del Viento — Hotel Boutique, Los Roques (Venezuela).
 * Las imágenes provienen de Unsplash; el componente <SmartImage /> oculta
 * cualquier imagen que falle y muestra un degradado de respaldo.
 */

const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const hotel = {
  name: "Casa del Viento",
  subtitle: "Hotel Boutique",
  location: "Gran Roque · Archipiélago Los Roques · Venezuela",
  tagline: "Donde el viento caribe dibuja el descanso",
  phone: "+58 212 555 0140",
  email: "reservas@casadelviento.demo",
  address: "Calle Bolívar, frente al muelle, Gran Roque, Los Roques"
};

export const suites = [
  {
    id: "junior",
    name: "Suite Junior del Viento",
    description:
      "Un refugio íntimo en el corazón del caserío: techos de yagua, textiles de algodón crudo y una ventana alta que deja pasar la brisa del este. Ideal para escapadas de pareja.",
    image: u("photo-1590490360182-c33d57733404", 1200),
    area: 38,
    capacity: 2,
    rate: 180,
    view: "Jardín interior",
    amenities: ["wifi", "aire", "desayunoZona", "ducha", "cajaFuerte"]
  },
  {
    id: "deluxe",
    name: "Suite Deluxe Jardín",
    description:
      "Planta baja con acceso directo a un patio privado de buganvilias y ducha exterior bajo la sombra del almendrón. El silencio aquí tiene sonido: hojas, grillos y mar lejano.",
    image: u("photo-1611892440504-42a792e24d32", 1200),
    area: 52,
    capacity: 3,
    rate: 240,
    view: "Patio privado",
    amenities: ["wifi", "aire", "patio", "duchaExterior", "hamaca", "cafe"]
  },
  {
    id: "panoramica",
    name: "Suite Panorámica del Mar",
    description:
      "En el segundo nivel, con ventanales de piso a techo sobre el cinturón de turquesa del arrecife. Amanecer incluido sin cargo, junto a una bañera tallada en piedra local.",
    image: u("photo-1582719478250-c58cae4dc59b", 1200),
    area: 64,
    capacity: 4,
    rate: 320,
    view: "Frente al mar",
    amenities: ["wifi", "aire", "banyera", "balcon", "minibar", "vista"]
  },
  {
    id: "presidencial",
    name: "Suite Presidencial Casa Grande",
    description:
      "La antigua casa del capitán, restaurada con maderas de deriva y arte de autores roqueños. Dos dormitorios, terraza con piscina privada y mayordomo dedicado de 7 a 23 h.",
    image: u("photo-1566073791250-593b399afcc0", 1200),
    area: 95,
    capacity: 6,
    rate: 520,
    view: "Terraza y piscina propia",
    amenities: [
      "wifi",
      "aire",
      "piscinaPrivada",
      "mayordomo",
      "dosDormitorios",
      "terraza",
      "chef"
    ]
  }
];

export const amenityLabels = {
  wifi: { label: "Wi-Fi de alta velocidad" },
  aire: { label: "Aire acondicionado silencioso" },
  desayunoZona: { label: "Rincón de café" },
  ducha: { label: "Ducha de lluvia" },
  cajaFuerte: { label: "Caja fuerte" },
  patio: { label: "Patio privado" },
  duchaExterior: { label: "Ducha exterior" },
  hamaca: { label: "Hamaca artesanal" },
  cafe: { label: "Barista en la mañana" },
  banyera: { label: "Bañera de piedra" },
  balcon: { label: "Balcón panorámico" },
  minibar: { label: "Minibar de cortesía" },
  vista: { label: "Vista al arrecife" },
  piscinaPrivada: { label: "Piscina privada" },
  mayordomo: { label: "Mayordomo dedicado" },
  dosDormitorios: { label: "Dos dormitorios" },
  terraza: { label: "Terraza al sol" },
  chef: { label: "Chef a bordo" }
};

export const galleryImages = [
  {
    id: 1,
    src: u("photo-1520250497591-112f2f40a3f4"),
    alt: "Terraza de la casa principal frente al mar",
    span: "md:col-span-3 md:row-span-2",
    ratio: "aspect-[4/5]"
  },
  {
    id: 2,
    src: u("photo-1571003123894-1f0594d2b5d9"),
    alt: "Detalle de cama con lino crudo",
    span: "md:col-span-2",
    ratio: "aspect-square"
  },
  {
    id: 3,
    src: u("photo-1540541338287-41700207dee6"),
    alt: "Piscina de sal al atardecer",
    span: "md:col-span-2",
    ratio: "aspect-square"
  },
  {
    id: 4,
    src: u("photo-1522708323590-d24dbb6b0267"),
    alt: "Sala de estar con maderas claras",
    span: "md:col-span-3",
    ratio: "aspect-[16/10]"
  },
  {
    id: 5,
    src: u("photo-1544161515-4ab6ce6db874"),
    alt: "Cabina de spa con velas",
    span: "md:col-span-2",
    ratio: "aspect-[4/5]"
  },
  {
    id: 6,
    src: u("photo-1414235077428-338989a2e8c0"),
    alt: "Mesa del restaurante bajo las estrellas",
    span: "md:col-span-2",
    ratio: "aspect-square"
  },
  {
    id: 7,
    src: u("photo-1507525428034-b723cf961d3e"),
    alt: "Playa de Cayo de Agua",
    span: "md:col-span-3",
    ratio: "aspect-[16/10]"
  },
  {
    id: 8,
    src: u("photo-1455587734955-081b22074882"),
    alt: "Interior de la Suite Presidencial",
    span: "md:col-span-3",
    ratio: "aspect-[4/5]"
  }
];

export const services = [
  {
    id: "spa",
    name: "Spa Sal & Viento",
    description:
      "Rituales de masaje con sal del arrecife y aceite de coco tostado, en cabinas abiertas al sonido del mar.",
    image: u("photo-1540555750447-d32ecb91c776", 1000)
  },
  {
    id: "restaurante",
    name: "Restaurante La Gaviata",
    description:
      "Cocina de menú diario con pesca del día, mango verde y marañón. Maridaje de vinos naturales y ron de añada.",
    image: u("photo-1517248135467-4c7edcad34c4", 1000)
  },
  {
    id: "piscina",
    name: "Piscina de sal",
    description:
      "Una alberca de agua de mar tratada sin cloro, rodeada de palmeras, con bar de coctelería al atardecer.",
    image: u("photo-1576013551627-0cc20b96c2a7", 1000)
  },
  {
    id: "traslado",
    name: "Traslado en lancha",
    description:
      "Traslado privado aeropuerto–Gran Roque en lancha de la casa, con champagne de bienvenida.",
    image: u("photo-1544551763-46a013bb70d5", 1000)
  }
];

export const testimonials = [
  {
    name: "Mariana De Sousa",
    origin: "Caracas",
    text: "La Suite Panorámica nos regaló el amanecer más bello de nuestra vida. El equipo sabe cuándo atender y cuándo desaparecer: eso es lujo de verdad.",
    stay: "Suite Panorámica del Mar · 4 noches"
  },
  {
    name: "Andrés Villalobos",
    origin: "Bogotá",
    text: "Vinimos por el kitesurf y nos quedamos por La Gaviata. El pulpo al marañón es un argumento suficiente para volver cada año.",
    stay: "Suite Deluxe Jardín · 6 noches"
  },
  {
    name: "Claudia Ferrer",
    origin: "Madrid",
    text: "Celebramos nuestra luna de miel en la Casa Grande. La terraza con piscina privada a medianoche, bajo la Vía Láctea, no tiene precio.",
    stay: "Suite Presidencial · 5 noches"
  }
];

export const guestOptions = [1, 2, 3, 4, 5, 6];
