// Datos simulados de la marca ficticia ATELIER 23 — moda urbana contemporánea.
// Cada producto usa su propia lista de IDs de Unsplash (sin repeticiones entre productos).

const U = (id) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=900&auto=format&fit=crop`

export const CATEGORIAS = ['Camisas', 'Hoodies', 'Pantalones', 'Chaquetas', 'Accesorios']

export const TALLAS = ['S', 'M', 'L', 'XL']

export const PRODUCTOS = [
  {
    id: 1,
    nombre: 'Camisa Ostende Oversize',
    categoria: 'Camisas',
    precio: 38.5,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: true,
    oferta: false,
    descripcion:
      'Camisa de popelín algodón con corte oversize y botón forrado. Un básico editorial que cae suelto sobre el cuerpo y se lleva tan bien con jeans como con un traje de lino. Tejida en un telar de densidad media que no se arruga con el calor de Caracas.',
    imagenes: [U('1490481651871-ab68de25d43d'), U('1521572163474-6864f9cf17ab'), U('1516762689617-e1cffcef479d')],
  },
  {
    id: 2,
    nombre: 'Hoodie Caracas Nocturna',
    categoria: 'Hoodies',
    precio: 54.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: true,
    oferta: false,
    descripcion:
      'Felpa francesa de 420 g con interior perchado, capucha doble capa y cordones encerados. El lavado enzyme le da un tacto envejecido desde el primer uso. Bordado tonal en el pecho: sin logos gritones.',
    imagenes: [U('1556821840-3a63f95609a7'), U('1509087859087-a38a65444a64'), U('1523381210434-271e8be1f52b')],
  },
  {
    id: 3,
    nombre: 'Pantalón Cargo Ávila',
    categoria: 'Pantalones',
    precio: 46.9,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Cargo de ripstop lavado con seis bolsillos reales, pinza frontal y bajo con cordón ajustable. Corte recto con caída suave, pensado para moverse por la ciudad todo el día sin perder la silueta.',
    imagenes: [U('1542272604-787c3835535d'), U('1565693413579-8ff3fdc1b8b0'), U('1591047139829-d91aecb6caea')],
  },
  {
    id: 4,
    nombre: 'Chaqueta Bomber Guayana',
    categoria: 'Chaquetas',
    precio: 89.0,
    tallas: ['M', 'L', 'XL'],
    nuevo: false,
    oferta: true,
    descripcion:
      'Bomber de nailon ligero con forro de punto técnico y puños acanalados en contraste. Resistente a la llovizna sin ser impermeable rígido: la chaqueta ideal para la lluvia breve y el aire acondicionado a dieciocho grados.',
    imagenes: [U('1551028719-00167b16eac5'), U('1529903384028-929ae12dcc68'), U('1533055640609-24b498dfd74c')],
  },
  {
    id: 5,
    nombre: 'Camisa Linen Maracaibo',
    categoria: 'Camisas',
    precio: 42.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Lino europeo pre-lavado con cuello italiano y pliegue trasero. Transpira como una brisa costera: la prenda más honesta para un mediodía en la Costa Oriental. Se arruga, y ese es el punto.',
    imagenes: [U('1496747611176-843222e1e57c'), U('1487222477894-8943e31ef7b2'), U('1495105787522-5334e3ffa0ef')],
  },
  {
    id: 6,
    nombre: 'Hoodie Zip Atelier Gris',
    categoria: 'Hoodies',
    precio: 58.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: true,
    descripcion:
      'Cremallera YKK de doble sentido, bolsillos oblicuos con forro polar y capucha estructurada. El gris ceniza se tiñe por inmersión, así que cada prenda guarda ligeras variaciones que la hacen única.',
    imagenes: [U('1503341504253-dff4815485f1'), U('1509631179647-0177331693ae'), U('1524253482453-3fed8d1fe888')],
  },
  {
    id: 7,
    nombre: 'Jean Relaxed Coro',
    categoria: 'Pantalones',
    precio: 52.5,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Denim de 13.5 oz tejido en shuttle loom, teñido con índigo natural y lavado en piedra suave. Cinco bolsillos clásicos, remaches de cobre y un desgaste puntual en la pierna derecha hecho a mano.',
    imagenes: [U('1541097062464-83c9db434750'), U('1541348263662-e068662d82af'), U('1554141220-83411835a60b')],
  },
  {
    id: 8,
    nombre: 'Chaqueta Trench Valera',
    categoria: 'Chaquetas',
    precio: 112.0,
    tallas: ['S', 'M', 'L'],
    nuevo: true,
    oferta: false,
    descripcion:
      'Trench de gabardina de algodón con doble peto, cinturón de ojales y guardapolvo trasero. Acabado water-repellent sin PFC. La pieza statement de la colección: editorial, severa, atemporal.',
    imagenes: [U('1539105137833-36f3e46b39cb'), U('1492707892479-7bc8d5a4ee93'), U('1467043237213-65f2da53396f')],
  },
  {
    id: 9,
    nombre: 'Camisa Rayas Puerto Píritu',
    categoria: 'Camisas',
    precio: 36.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: true,
    descripcion:
      'Popelín rayado de hilopeiné con cuello abotonado y puño de una posición. Las rayas se cortan a la horma para que continúen perfectas por hombros y espalda. Un clásico de sastrería en clave relajada.',
    imagenes: [U('1517841905240-472988babdf9'), U('1529139574466-a303027c1d8b'), U('1485968579580-b6d095142e6e')],
  },
  {
    id: 10,
    nombre: 'Pantalón Sastre Carabobo',
    categoria: 'Pantalones',
    precio: 64.0,
    tallas: ['M', 'L', 'XL'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Pantalón de sastrería en lana fría con doble pinza, ruedo sin rematar y bolsillo de relojero. Corte fluido que rompe limpio sobre el zapato. Se viste con camisa, se desfoga con hoodie.',
    imagenes: [U('1507003211169-0a1dd7228f2d'), U('1507680434567-5739c80be1ac'), U('1519085360753-af0119f7cbe7')],
  },
  {
    id: 11,
    nombre: 'Bolso Canvas Margarita',
    categoria: 'Accesorios',
    precio: 28.0,
    tallas: ['Talla única'],
    nuevo: true,
    oferta: false,
    descripcion:
      'Bolso tote de lona cruda de 12 oz con asas reforzadas en pita y bolsillo interior con cremallera. Serigrafía del monograma A23. Aguanta un portátil, una toalla y las compras del domingo.',
    imagenes: [U('1548036328-c9fa89d128fa'), U('1584917865442-de89df76afd3'), U('1591561954557-26941169b49e')],
  },
  {
    id: 12,
    nombre: 'Gorra Pico Curvo A23',
    categoria: 'Accesorios',
    precio: 19.5,
    tallas: ['Talla única'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Gorra de sarga peinada con six-panel clásico, visera pre-curvada y cierre metálico. Frente bordado con la marca del atelier en hilo cera. Se ablanda con el uso, como debe ser.',
    imagenes: [U('1533055640609-24b498dfd74c'), U('1524498250077-390f9e378fc0'), U('1511499767150-a486237ef009')],
  },
  {
    id: 13,
    nombre: 'Bufanda Punto Azul',
    categoria: 'Accesorios',
    precio: 24.0,
    tallas: ['Talla única'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Bufanda de punto grueso en mezcla de lana y alpaca, tejida en canalé con flecos a mano. El azul profundo viene del tinte índigo, así que madura y se aclara con cada lavada.',
    imagenes: [U('1520903920243-00d872a2d1e9'), U('1576871337622-98d48d1cf531'), U('1544441893-675973e31985')],
  },
  {
    id: 14,
    nombre: 'Chaqueta Denim Sintra',
    categoria: 'Chaquetas',
    precio: 78.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: true,
    descripcion:
      'Vaquera corta de 12 oz con botones metálicos envejecidos, costuras de refuerzo en triple pasada y panel de espalda ampliado. El índigo pesado cede poco a poco y termina dibujando tu cuerpo.',
    imagenes: [U('1489987707025-afc232f7ea0f'), U('1516826957135-700dedea698c'), U('1493256338651-d82f7acb2b38')],
  },
  {
    id: 15,
    nombre: 'Camisa Henley Teatro',
    categoria: 'Camisas',
    precio: 33.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: false,
    oferta: false,
    descripcion:
      'Henley de algodón orgánico peinado con tres botones de nácar y canesú entallado. El punto cuello tortuga cede exactamente lo necesario. Nuestra camiseta favorita disfrazada de camisa.',
    imagenes: [U('1519748771151-35a5d16b2d47'), U('1519741497674-611481863552'), U('1500917293891-ef795e70e1f6')],
  },
  {
    id: 16,
    nombre: 'Pantalón Jogger Litoral',
    categoria: 'Pantalones',
    precio: 41.0,
    tallas: ['S', 'M', 'L', 'XL'],
    nuevo: true,
    oferta: false,
    descripcion:
      'Jogger de punto técnico con cinturón elástico oculto, bolsillos con fuelle y tobillo acanalado. Ligero como una brisa, con acabado anti-pilling para sobrevivir a mil lavadas.',
    imagenes: [U('1441986300917-64674bd600d8'), U('1556905055-8f358a7a47b2'), U('1483985988355-763728e1935b')],
  },
]

export const LOOKBOOK = [
  {
    nombre: 'Look 01 — Oeste Cálido',
    descripcion: 'Lino, sombra y mediodía',
    imagen: U('1523170335258-f5ed11844a49'),
    span: 'col-span-2 row-span-2',
    alt: 'Editorial de moda con luz cálida del atardecer',
  },
  {
    nombre: 'Look 02 — Cemento Fresco',
    descripcion: 'Hoodie gris y denim pesado',
    imagen: U('1445205170230-053b83016050'),
    span: 'col-span-1 row-span-1',
    alt: 'Estudio editorial con prendas en riel',
  },
  {
    nombre: 'Look 03 — Azul Profundo',
    descripcion: 'Índigo natural sobre piel',
    imagen: U('1441984904994-e1b595bcf530'),
    span: 'col-span-1 row-span-2',
    alt: 'Prendas de moda en tonos índigo',
  },
  {
    nombre: 'Look 04 — Última Luz',
    descripcion: 'Trench, viento y concreto',
    imagen: U('1521223888768-743347b9599d'),
    span: 'col-span-1 row-span-1',
    alt: 'Editorial de moda urbana en blanco y negro suave',
  },
  {
    nombre: 'Look 05 — Riel Abierto',
    descripcion: 'La tienda como escenario',
    imagen: U('1560243563-062bfc001d21'),
    span: 'col-span-1 row-span-1',
    alt: 'Riel de ropa en tienda minimalista',
  },
]

export const HERO = {
  titular: 'Vestir bien\nes un idioma\nque todos\nhablamos.',
  subtitulo:
    'Colección Otoño 23 — piezas cortadas para el clima cambiante de la ciudad. Algodón honesto, índigo real y sastrería que respira.',
  imagen: U('1469334031218-e382a71b716b'),
  cta: 'Ver la colección',
}

export const CIUDADES_VENEZUELA = [
  'Caracas',
  'Maracaibo',
  'Valencia',
  'Barquisimeto',
  'Maracay',
  'Mérida',
  'San Cristóbal',
  'Puerto La Cruz',
  'Ciudad Bolívar',
  'Maturín',
  'Cumana',
  'Barinas',
  'Cabimas',
  'Ciudad Guayana',
  'Puerto Ayacucho',
  'Coro',
  'Los Teques',
  'Punto Fijo',
  'El Tigre',
  'Guacara',
]

export const GASTO_ENVIO_GRATIS = 60
