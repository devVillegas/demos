const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const RESTAURANT = {
  nombre: "Bruma",
  lema: "Cocina de autor",
  ciudad: "Caracas · Venezuela",
  direccion: "Av. Andrés Bello, Altamira, Caracas 1060",
  telefono: "+58 212 555 0147",
  correo: "hola@bruma.food",
  instagram: "@bruma.caracas",
};

export const CATEGORIAS = [
  { id: "entradas", nombre: "Entradas" },
  { id: "platos", nombre: "Platos fuertes" },
  { id: "postres", nombre: "Postres" },
  { id: "bebidas", nombre: "Bebidas" },
  { id: "vinos", nombre: "Vinos" },
];

export const ETIQUETAS = {
  vegetariano: { nombre: "Vegetariano", icono: "🌿" },
  sin_gluten: { nombre: "Sin gluten", icono: "🌾" },
  chef: { nombre: "Recomendación del chef", icono: "👨‍🍳" },
};

export const CARTA = [
  {
    id: "e1",
    nombre: "Tartar de tomate ahumado",
    categoria: "entradas",
    descripcion:
      "Tomates pera macerados en humo de leña de roble, albahaca thai, aceite de cilantro y crumble de arepa tostada. Fresco, intenso y de temporada.",
    precio: 9.5,
    etiquetas: ["vegetariano", "chef"],
    imagen: u("photo-1546069901-ba9599a7e63c"),
  },
  {
    id: "e2",
    nombre: "Arepas de pernil de la abuela",
    categoria: "entradas",
    descripcion:
      "Masa de maíz blanco fermentada 24 horas, rellena de pernil mechado cocido lentamente, aguacate y nata de los Llanos. Un clásico venido a menos… y vuelto a más.",
    precio: 8.0,
    etiquetas: [],
    imagen: u("photo-1509440159596-0249088772ff"),
  },
  {
    id: "e3",
    nombre: "Ceviche de corvina al coco",
    categoria: "entradas",
    descripcion:
      "Corvina del Caribe curada en limón criollo, leche de coco tostada, ají dulce, cebollín y brotes de cilantro. Mar después de la lluvia.",
    precio: 12.0,
    etiquetas: ["sin_gluten", "chef"],
    imagen: u("photo-1559827260-dc66d52bef19"),
  },
  {
    id: "e4",
    nombre: "Crema de auyín y cúrcuma",
    categoria: "entradas",
    descripcion:
      "Auyín asado a fuego lento, emulsionado con aceite de cúrcuma fresca, crocante de semillas de calabaza y un hilo de miel de caña. Abrigo en plato hondo.",
    precio: 7.5,
    etiquetas: ["vegetariano"],
    imagen: u("photo-1547592166-23ac45744acd"),
  },
  {
    id: "p1",
    nombre: "Pabellón criollo de autor",
    categoria: "platos",
    descripcion:
      "Carne mechada glaseada en pilón de azabache, caraotas negras de 12 horas, arroz cremoso y plátano frito caramelizado. Venezuela entera en un plato de barro.",
    precio: 16.0,
    etiquetas: ["sin_gluten", "chef"],
    imagen: u("photo-1544025162-d76694265947"),
  },
  {
    id: "p2",
    nombre: "Pargo rojo entero a la brasa",
    categoria: "platos",
    descripcion:
      "Pargo entero de 800 g, brasa de Samán, mantequilla de ajo asado, limón quemado y papas al hilo. Para dos manos decididas y un molusco en vivo.",
    precio: 22.0,
    etiquetas: ["sin_gluten"],
    imagen: u("photo-1467003909585-2f8a72700288"),
  },
  {
    id: "p3",
    nombre: "Risotto de hongos y trufa",
    categoria: "platos",
    descripcion:
      "Arroz carnaroli mantecado con parmesano 24 meses, hongos de bosque andino, aceite de trufa negra y galleta de pan. La calma del mediodía en forma de grano.",
    precio: 18.0,
    etiquetas: ["vegetariano", "sin_gluten"],
    imagen: u("photo-1476124369491-e7addf5db371"),
  },
  {
    id: "p4",
    nombre: "Ribeye madurado 45 días",
    categoria: "platos",
    descripcion:
      "Corte de 350 g madurado en cámara seca, sal de Macuira, chimichurri tibio de yerbas andinas y cebollín quemado. Sangre y humo, sin adornos.",
    precio: 28.0,
    etiquetas: ["sin_gluten", "chef"],
    imagen: u("photo-1558030006-450675393462"),
  },
  {
    id: "p5",
    nombre: "Langostinos al ajillo",
    categoria: "platos",
    descripcion:
      "Langostinos de submarino 4-6, ajos confitados, guindilla dulce, brandy y pan de masa madre para mojar. Diez minutos de gloria directa al centro de la mesa.",
    precio: 24.0,
    etiquetas: ["sin_gluten"],
    imagen: u("photo-1565557623262-b51c2513a641"),
  },
  {
    id: "p6",
    nombre: "Pasta corta al pesto de cilantro",
    categoria: "platos",
    descripcion:
      "Casarecce extruida en bronce, pesto de cilantro criollo, almendra tostada, queso de mano fundido y limón verde. Un pesto que aprendió a hablar venezolano.",
    precio: 15.0,
    etiquetas: ["vegetariano"],
    imagen: u("photo-1563379926898-05f4575a45d8"),
  },
  {
    id: "d1",
    nombre: "Torta de chocolate 70% y dulce de leche",
    categoria: "postres",
    descripcion:
      "Bizcocho húmedo de cacao del Río Caribe, núcleo líquido de dulce de leche y helado de salvia. Oscuro, tibio y sin piedad.",
    precio: 8.0,
    etiquetas: ["vegetariano"],
    imagen: u("photo-1551024506-0bccd828d307"),
  },
  {
    id: "d2",
    nombre: "Suspiro de maracuyá",
    categoria: "postres",
    descripcion:
      "Crema batida de maracuyá sobre curd ácido, merengue suizo quemado al momento y polvo de orejones. El balance perfecto entre dama y tormenta.",
    precio: 7.0,
    etiquetas: ["vegetariano", "chef"],
    imagen: u("photo-1565958011703-44f9829ba187"),
  },
  {
    id: "d3",
    nombre: "Flan de coco quemado",
    categoria: "postres",
    descripcion:
      "Coco fresco rallado a mano, caramelo amargo y leche condensada horneadas a baño maría. Sabor a abuela, textura de espejo.",
    precio: 6.5,
    etiquetas: ["vegetariano", "sin_gluten"],
    imagen: u("photo-1488477181946-6428a029e7d0"),
  },
  {
    id: "b1",
    nombre: "Refresco de parchita casero",
    categoria: "bebidas",
    descripcion:
      "Parchita fresca exprimida, jarabe ligero de caña, agua de azahar y hielo tallado. Nuestro refresco de always, el más pedido de la casa.",
    precio: 3.5,
    etiquetas: ["vegetariano"],
    imagen: u("photo-1437418747212-8d9709afab22"),
  },
  {
    id: "b2",
    nombre: "Cerveza artesanal local",
    categoria: "bebidas",
    descripcion:
      "IPA elaborada en Caracas con notas de mango verde y toronja, servida a 6 °C en copa chopp. Colaboración con la cervecería del barrio.",
    precio: 5.0,
    etiquetas: ["vegetariano"],
    imagen: u("photo-1518176278397-f9c32e3c6f5e"),
  },
  {
    id: "b3",
    nombre: "Rum añejo 12 años",
    categoria: "bebidas",
    descripcion:
      "Rum venezolano añejado en barricas de roble blanco, servido solo con hielo grande y una cáscara de naranja. El digestivo oficial de la casa.",
    precio: 11.0,
    etiquetas: [],
    imagen: u("photo-1514362545857-3bc16c4c7d1b"),
  },
  {
    id: "v1",
    nombre: "Ribera del Duero Crianza · copa",
    categoria: "vinos",
    descripcion:
      "Tinto tempranillo de viñedos viejos, 14 meses en barrica. Frambuesa oscura, vainilla tostada y tanino de seda. Marida de maravilla con el ribeye.",
    precio: 9.0,
    etiquetas: [],
    imagen: u("photo-1510812431401-41d2bd2722f3"),
  },
  {
    id: "v2",
    nombre: "Champagne brut · copa",
    categoria: "vinos",
    descripcion:
      "Blend de chardonnay y pinot meunier, burbuja fina y persistente, final de bizcocho y limón. Para abrir la noche con razón.",
    precio: 14.0,
    etiquetas: ["chef"],
    imagen: u("photo-1506377247377-2a5b3b417ebb"),
  },
  {
    id: "v3",
    nombre: "Malbec Reserva · botella",
    categoria: "vinos",
    descripcion:
      "Botella de 750 ml de un malbec de altura, uvas de 1900 msnm. Violetas, mora y pimienta blanca. Ideal para mesa larga y conversación larga.",
    precio: 38.0,
    etiquetas: [],
    imagen: u("photo-1547595628-c61a29f496f0"),
  },
];

export const TESTIMONIOS = [
  {
    nombre: "Mariana Delgado",
    rol: "Crítica gastronómica",
    texto:
      "Bruma entiende que la alta cocina venezolana no es copiar París: es escuchar el fogón de uno. El pabellón de autor me devolvió a la cocina de mi madre, pero con chaleco de gala.",
    estrellas: 5,
  },
  {
    nombre: "Andrés Villalobos",
    rol: "Aniversario de bodas",
    texto:
      "Reservé para nuestro décimo aniversario y el servicio fue impecable. El maridaje de la mesa del chef convierte una cena en una noche que no se olvida.",
    estrellas: 5,
  },
  {
    nombre: "Katherine Ríos",
    rol: "Cena de negocios",
    texto:
      "Salas discretas, vino al nivel exacto y un risotto que deja en silencio a cualquier director financiero. Se volvió nuestra sala de reuniones favorita.",
    estrellas: 4,
  },
];

export const HORARIOS = [
  { dias: "Martes a Jueves", horas: "12:00 – 22:00" },
  { dias: "Viernes y Sábado", horas: "12:00 – 23:30" },
  { dias: "Domingo", horas: "12:30 – 18:00" },
  { dias: "Lunes", horas: "Cerrado — masa madre en reposo" },
];

export const HORAS_RETIRO = [
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const HORAS_RESERVA = [
  "12:00",
  "13:00",
  "14:00",
  "16:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export const OCASIONES = ["Cena", "Cumpleaños", "Aniversario", "Negocios"];

export const METODOS_PAGO = ["Efectivo", "Tarjeta", "Pago móvil", "Zelle"];

export const COSTO_DELIVERY = 3.0;
export const UMBRAL_DELIVERY_GRATIS = 35.0;
