// Datos simulados de la demo Asisnet — Nexora Consulting.
// Todo el contenido es ficticio y vive 100% en el frontend.

export const COMPANY = {
  name: 'Nexora Consulting',
  tagline: 'Consultoría & Tecnología',
  email: 'hola@nexoraconsulting.com',
  phone: '+1 (555) 014-2088',
  address: 'Av. del Parque 2150, Piso 14 — Distrito Financiero, Ciudad de México'
}

export const HERO_STATS = [
  { id: 'proyectos', label: 'Proyectos entregados', value: 184, suffix: '+' },
  { id: 'clientes', label: 'Clientes activos', value: 62, suffix: '' },
  { id: 'anios', label: 'Años de experiencia', value: 12, suffix: '' },
  { id: 'nps', label: 'NPS promedio', value: 78, suffix: '/100' }
]

export const SERVICES = [
  {
    id: 'consultoria-estrategica',
    name: 'Consultoría estratégica',
    icon: 'Compass',
    from: 3500,
    blurb:
      'Hoja de ruta digital, diagnóstico tecnológico y acompañamiento en decisiones de inversión para directivos.',
    bullets: ['Diagnóstico en 2 semanas', 'Roadmap a 24 meses', 'Comité técnico mensual']
  },
  {
    id: 'desarrollo-web-movil',
    name: 'Desarrollo web & móvil',
    icon: 'Code2',
    from: 6800,
    blurb:
      'Plataformas web a medida, apps móviles multiplataforma e integraciones con tus sistemas actuales.',
    bullets: ['React / React Native', 'APIs REST y GraphQL', 'Diseño UI/UX incluido']
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    icon: 'CloudCog',
    from: 4200,
    blurb:
      'Migración a la nube, infraestructura como código y pipelines de CI/CD para desplegar sin miedo.',
    bullets: ['AWS · Azure · GCP', 'Terraform & Kubernetes', 'SLA de despliegue 99.9%']
  },
  {
    id: 'data-ia',
    name: 'Data & IA',
    icon: 'BrainCircuit',
    from: 7500,
    blurb:
      'Data warehouses, dashboards ejecutivos y modelos de IA aplicados a procesos reales de negocio.',
    bullets: ['Pipelines de datos', 'Forecasting & ML', 'Copilotos internos con LLM']
  },
  {
    id: 'ciberseguridad',
    name: 'Ciberseguridad',
    icon: 'ShieldCheck',
    from: 4800,
    blurb:
      'Auditorías de seguridad, pentesting y cumplimiento para proteger tu operación de extremo a extremo.',
    bullets: ['Pentest trimestral', 'ISO 27001 / SOC 2', 'Respuesta a incidentes 24/7']
  },
  {
    id: 'soporte-gestionado',
    name: 'Soporte gestionado',
    icon: 'Headset',
    from: 1900,
    blurb:
      'Mesa de ayuda gestionada, monitoreo continuo y mantenimiento preventivo de tu parque tecnológico.',
    bullets: ['Mesa de ayuda 24/7', 'Monitoreo proactivo', 'Reporte mensual ejecutivo']
  }
]

export const LEVELS = [
  {
    id: 'basico',
    name: 'Básico',
    multiplier: 1,
    description: 'Equipo reducido, alcance esencial y entregables documentados.',
    features: ['1–2 especialistas', 'Entregables estándar', 'Reuniones quincenales']
  },
  {
    id: 'pro',
    name: 'Pro',
    multiplier: 1.85,
    description: 'El punto dulce: equipo senior, arquitectura robusta y soporte extendido.',
    features: ['2–4 especialistas senior', 'Arquitectura y documentación técnica', 'Soporte por Slack 24h'],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    multiplier: 3.2,
    description: 'Despliegue completo: PMO dedicada, cumplimiento normativo y SLA contractual.',
    features: ['Célula multidisciplinaria', 'PMO y QA dedicados', 'SLA contractual y compliance']
  }
]

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Nexora rediseñó nuestra plataforma de logística y los tiempos de operación cayeron 34% en el primer trimestre. Fue la mejor decisión de inversión del año.',
    name: 'Mariana Osorio',
    role: 'COO — Andina Logistics',
    initials: 'MO',
    unsplash:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 't2',
    quote:
      'Pasamos de desplegar una vez al mes a hacerlo todos los días. Su equipo de Cloud & DevOps nos devolvió la agilidad que habíamos perdido.',
    name: 'Diego Fuentes',
    role: 'CTO — Cobalt Bank',
    initials: 'DF',
    unsplash:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 't3',
    quote:
      'El modelo de forecasting con IA nos permitió reducir el desabasto en un 21%. La demo convenció a todo el comité en menos de diez minutos.',
    name: 'Valeria Ríos',
    role: 'Directora de Operaciones — Meridiana Retail',
    initials: 'VR',
    unsplash:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop'
  }
]

export const CASE_LOGOS = [
  'Andina Logistics',
  'Cobalt Bank',
  'Meridiana Retail',
  'Grupo Habitat',
  'Vectoria Energy',
  'Lumen Health'
]

export const HERO_IMAGES = {
  primary:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  secondary:
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
}

export const CASE_STUDY_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
