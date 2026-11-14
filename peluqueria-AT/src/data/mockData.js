export const SERVICES = [
  {
    id: 'corte-styling',
    name: 'Corte & Styling',
    tagline: 'El corte que te define',
    description:
      'Diagnóstico capilar, corte a tijera o máquina según tu estilo y acabado con styling profesional para que salgas impecable.',
    durationMin: 60,
    priceUsd: 25,
    image:
      'https://images.unsplash.com/photo-1560869713-7d0954650da1?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-powder-soft/70 via-cream-deep to-gold-soft/60',
  },
  {
    id: 'color-balayage',
    name: 'Color & Balayage',
    tagline: 'Luz en cada hebra',
    description:
      'Balayage, babylights, mechas o color global con técnica de lujo, sellado del tono y tratamiento brillo espejo de cortesía.',
    durationMin: 180,
    priceUsd: 95,
    image:
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-gold-soft/70 via-cream-deep to-powder-soft/60',
  },
  {
    id: 'barberia-premium',
    name: 'Barbería Premium',
    tagline: 'Ritual clásico de caballero',
    description:
      'Corte masculino con acabado de navaja, arreglo de barba con toalla caliente, masaje capilar y bebida de bienvenida.',
    durationMin: 75,
    priceUsd: 30,
    image:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-ink/40 via-cream-deep to-powder-soft/50',
  },
  {
    id: 'tratamiento-capilar',
    name: 'Tratamientos Capilares',
    tagline: 'Keratina & botox capilar',
    description:
      'Keratina alisadora, botox capilar o hidratación profunda con activos de primera línea para devolver fuerza, brillo y movimiento.',
    durationMin: 120,
    priceUsd: 80,
    image:
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-powder-soft/60 via-gold-soft/40 to-cream-deep',
  },
  {
    id: 'eventos-novias',
    name: 'Peinado para Eventos & Novias',
    tagline: 'Tu día, memorable',
    description:
      'Diseño de peinado para bodas, quinceañeras y gala: prueba previa, recogidos, ondas al agua y fijación de larga duración.',
    durationMin: 90,
    priceUsd: 65,
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-gold-soft/60 via-powder-soft/50 to-cream-deep',
  },
];

export const STYLISTS = [
  {
    id: 'valeria-montenegro',
    name: 'Valeria Montenegro',
    specialty: 'Color & Balayage',
    yearsExperience: 12,
    bio: 'Maestra colorista formada entre Caracas y Madrid. Su firma: rubios luminosos que envejecen con elegancia.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=70',
    gradient: 'from-powder-soft/70 to-gold-soft/50',
  },
  {
    id: 'sebastian-ferrer',
    name: 'Sebastián Ferrer',
    specialty: 'Barbería Premium',
    yearsExperience: 9,
    bio: 'Barbero clásico con alma contemporáneo. Navaja, espuma caliente y precisión milimétrica en cada perfil.',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=70',
    gradient: 'from-ink/30 to-powder-soft/50',
  },
  {
    id: 'camila-duarte',
    name: 'Camila Duarte',
    specialty: 'Tratamientos Capilares',
    yearsExperience: 7,
    bio: 'Especialista en keratina y botox capilar. Reconstruye cabellos castigados por el sol caraqueño y el plancha.',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=70',
    gradient: 'from-gold-soft/60 to-powder-soft/40',
  },
  {
    id: 'renata-solorzano',
    name: 'Renata Solórzano',
    specialty: 'Peinado para Eventos & Novias',
    yearsExperience: 15,
    bio: 'La favorita de las novias de la Gran Caracas. Recogidos de etiqueta con el equilibrio exacto entre arte y naturalidad.',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=70',
    gradient: 'from-powder-soft/60 to-cream-deep',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Llevo años buscando un balayage que no dañe mi cabello y Valeria logró exactamente eso. Salí de Casa Serena sintiéndome como en una editorial de moda.',
    author: 'Mariana L. Ríos',
    role: 'Clienta desde 2021',
    service: 'Color & Balayage',
  },
  {
    id: 't2',
    quote:
      'La barbería premium de Sebastián es otro nivel: toalla caliente, navaja, un café excelente. Mi corte no se despeina ni en la humedad de Caracas.',
    author: 'Andrés G. Salcedo',
    role: 'Cliento desde 2022',
    service: 'Barbería Premium',
  },
  {
    id: 't3',
    quote:
      'Mi cabello quedó destrozado por tantas decoloraciones. Camila aplicó botox capilar y en una sola sesión parecía otro cabello. No lo cambio por nada.',
    author: 'Paola M. Herrera',
    role: 'Clienta desde 2023',
    service: 'Tratamientos Capilares',
  },
  {
    id: 't4',
    quote:
      'Renata hizo el peinado de mi boda y de todas mis damas. Dieciséis horas de fiesta y el recogido seguía perfecto. Es, sencillamente, una artista.',
    author: 'Valentina C. Bracho',
    role: 'Novia 2024',
    service: 'Eventos & Novias',
  },
];

export const GALLERY = [
  {
    id: 'g1',
    alt: 'Estilista cortando cabello en el estudio Casa Serena',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-powder-soft/70 via-gold-soft/40 to-cream-deep',
    caption: 'Sesión de corte en cabina principal',
  },
  {
    id: 'g2',
    alt: 'Interior del estudio con espejos de latón',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-gold-soft/60 via-powder-soft/40 to-cream-deep',
    caption: 'Salón principal con espejos de latón',
  },
  {
    id: 'g3',
    alt: 'Detalle de color aplicado sobre cabello claro',
    image:
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-powder-soft/50 via-cream-deep to-gold-soft/50',
    caption: 'Trabajo de color en proceso',
  },
  {
    id: 'g4',
    alt: 'Barbería con silla clásica de cuero',
    image:
      'https://images.unsplash.com/photo-1552642986-ccb41e70582e?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-ink/30 via-powder-soft/40 to-cream-deep',
    caption: 'Rincón de barbería premium',
  },
  {
    id: 'g5',
    alt: 'Peinado de novia con recogido elegante',
    image:
      'https://images.unsplash.com/photo-1595959145226-a5d8b464f0d9?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-gold-soft/70 via-powder-soft/50 to-cream-deep',
    caption: 'Prueba de peinado de novia',
  },
  {
    id: 'g6',
    alt: 'Pensil con herramientas de peluquería sobre mármol',
    image:
      'https://images.unsplash.com/photo-1633681926035-ec1ac984418a?auto=format&fit=crop&w=900&q=70',
    gradient: 'from-powder-soft/60 via-cream-deep to-powder-soft/30',
    caption: 'Herramientas de la casa',
  },
];

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=75';

export const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=70';

export const SCHEDULE = {
  openingHour: 9,
  closingHour: 19,
  slotMinutes: 45,
  closedWeekday: 0,
};

export const STUDIO_INFO = {
  name: 'Casa Serena',
  claim: 'Estudio de belleza',
  address: 'Av. Andrés Bello, Edif. Mirador, Piso 2, Los Palos Grandes, Caracas',
  phone: '+58 212 286 40 19',
  email: 'hola@casaserena.ve',
  hoursLabel: 'Lunes a sábado · 9:00 — 19:00',
  closedLabel: 'Domingos cerrado',
};
