import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "ONCA IT",
  url: "https://oncait.com.ar",
  phone: "+54 11 4421-8558 / +54 249 438-2736",
  email: "hola@oncait.com",
  whatsapp: "5411442185583",
  social: {
    linkedin: "https://linkedin.com/company/oncait",
    instagram: "https://instagram.com/oncait",
  },
};

export const heroSlides = [
  {
    id: 1,
    image: "/images/home-1.png",
    client: "Sanitarios Arieta",
    service: "Control de stock",
  },
  {
    id: 2,
    image: "/images/home-2.png",
    client: "Farmagre SRL",
    service: "Entrega mercadería",
  },
  {
    id: 3,
    image: "/images/home-3.png",
    client: "Chisap",
    service: "Nueva sucursal",
  },
];

export const serviceKeys = [
  "visits",
  "orders",
  "preparation",
  "delivery",
  "reception",
  "collections",
  "authorization",
] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export const serviceIcons: Record<ServiceKey, string> = {
  visits: "👥",
  orders: "🛒",
  preparation: "📦",
  delivery: "🚚",
  reception: "📥",
  collections: "💰",
  authorization: "✓",
};

export const serviceSlugs: Record<string, ServiceKey> = {
  visitas: "visits",
  pedidos: "orders",
  preparacion: "preparation",
  entregas: "delivery",
  recepcion: "reception",
  cobranzas: "collections",
  autorizacion: "authorization",
};

export const serviceSlugsByLocale: Record<ServiceKey, string> = {
  visits: "visitas",
  orders: "pedidos",
  preparation: "preparacion",
  delivery: "entregas",
  reception: "recepcion",
  collections: "cobranzas",
  authorization: "autorizacion",
};

export const serviceVideos: Record<ServiceKey, string> = {
  visits: "/videos/visitas.mov",
  orders: "/videos/pedidos.mov",
  preparation: "/videos/preparacion.mov",
  delivery: "/videos/entregas.mov",
  reception: "/videos/recepcion.mov",
  collections: "/videos/cobranzas.mov",
  authorization: "/videos/autorizacion.mov",
};

export function getServiceSlug(serviceKey: ServiceKey): string {
  return serviceSlugsByLocale[serviceKey];
}

export const testimonials = [
  {
    company: "TALLERES BANFIELD",
    name: "Sebastián Queirolo",
    image: "/images/Sebastian Queirolo.png",
    focus: {
      lg: "10%",
      xl: "25%",
      "2xl": "1%",
    },
    
    quote:
      "El portal web desarrollado por <b>ONCA IT</b> significó una mejora sustancial en los ingresos de pedidos y en el servicio integral que damos a nuestros clientes",
  },
  {
    company: "PREVISORA DEL PARANÁ",
    name: "Esteban Maciel",
    image: "/images/Esteban-Maciel1.jpeg",
    focus: {
      xl: "5%",
      "2xl": "20%",
    },
    quote:
      "<b>ONCA IT</b> desarrolló nuestra app móvil para gestión de clientes brindando innovación y acompañamiento. Logramos integrar con nuestro ERP, mejorando procesos y fomentando la evolución continua.",
  },
  {
    company: "ELECTROOUTLET",
    name: "Claudio Rozental",
    image: "/images/Claudio rozental-1.png",
    focus: {
      xl: "68%",
      "2xl": "32%",
    },
    quote:
      "En este mundo tan cambiante debemos entender que tanto la Ai como la automatización de los procesos son las únicas herramientas que ayudarán a las empresas a ser competitivas. De la mano de <b>ONCA IT</b>, nuestro asesor tecnológico, estamos recorriendo ese camino.",
  },
  {
    company: "FARMAGRE SRL",
    name: "Gabriel Delizia",
    image: "/images/Gabriel Delizia.png",
    focus: {
      lg: "10%",
      xl: "80%",
      "2xl": "32%",
    },
    quote:
      "<b>ONCA Mobile</b> resultó fundamental en nuestra reingeniería logística. Permitió optimizar la eficiencia, reducir significativamente los errores y elevar la satisfacción de nuestros clientes.",
  },
  {
    company: "LA TRIESTINA",
    name: "Pablo Cosentino",
    image: "/images/Pablo Cosentino-1.jpeg",
    focus: {
      lg: "10%",
       xl: "78%",
      "2xl": "80%",
    },
    quote:
      "Logramos automatizar la preparación y empaque de pedidos minimizando errores, lo cual impactó positivamente en la satisfacción del cliente, en nuestra eficiencia y fiabilidad del stock.",
  },
];

export const partners = [
  { name: "Acudir", logo: "/images/partners/acudir.png" },
  { name: "Allub", logo: "/images/partners/allub.gif" },
  { name: "Chisap", logo: "/images/partners/chisap.svg" },
  { name: "Celulosa", logo: "/images/partners/celulosa.gif" },
  { name: "Daedaz", logo: "/images/partners/Daedaz.svg" },
  { name: "ElectroOutlet", logo: "/images/partners/electrooutlet.png" },
  { name: "Fresh", logo: "/images/partners/fresh.png" },
  { name: "Gleba", logo: "/images/partners/Gleba.svg" },
  { name: "GTC", logo: "/images/partners/gtc.png" },
  { name: "Mateo", logo: "/images/partners/mateo.png" },
  { name: "Mercomax", logo: "/images/partners/mercomax.png" },
  { name: "Motorarg", logo: "/images/partners/motorarg.png" },
  { name: "Schaeffler", logo: "/images/partners/schaeffler.png" },
  { name: "Oligra", logo: "/images/partners/oligra.png" },
  { name: "Pingakol", logo: "/images/partners/pingakol.png" },
  { name: "Talleres Banfield", logo: "/images/partners/Talleres Banfield.svg" },
  { name: "VIA", logo: "/images/partners/via.png" },
];
