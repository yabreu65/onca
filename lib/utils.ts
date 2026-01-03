import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: 'ONCA IT',
  url: 'https://oncait.com.ar',
  phone: '+54 11 4421-8558 / +54 249 438-2736',
  email: 'hola@oncait.com',
  whatsapp: '5411442185583',
  social: {
    linkedin: 'https://linkedin.com/company/oncait',
    instagram: 'https://instagram.com/oncait',
  },
};

export const heroSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1920&q=80', client: 'Sanitarios Arieta', service: 'Control de stock' },
  { id: 2, image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&q=80', client: 'Farmagre SRL', service: 'Entrega mercadería' },
  { id: 3, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80', client: 'Chisap', service: 'Nueva sucursal' },
];

export const serviceKeys = ['visits', 'orders', 'preparation', 'delivery', 'reception', 'collections', 'authorization'] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export const serviceIcons: Record<ServiceKey, string> = {
  visits: '👥',
  orders: '🛒',
  preparation: '📦',
  delivery: '🚚',
  reception: '📥',
  collections: '💰',
  authorization: '✓',
};

export const serviceSlugs: Record<string, ServiceKey> = {
  'visitas': 'visits',
  'pedidos': 'orders',
  'preparacion': 'preparation',
  'entregas': 'delivery',
  'recepcion': 'reception',
  'cobranzas': 'collections',
  'autorizacion': 'authorization',
  'visits': 'visits',
  'orders': 'orders',
  'preparation': 'preparation',
  'delivery': 'delivery',
  'reception': 'reception',
  'collections': 'collections',
  'authorization': 'authorization',
};

export const serviceSlugsByLocale: Record<'es' | 'en', Record<ServiceKey, string>> = {
  es: {
    visits: 'visitas',
    orders: 'pedidos',
    preparation: 'preparacion',
    delivery: 'entregas',
    reception: 'recepcion',
    collections: 'cobranzas',
    authorization: 'autorizacion',
  },
  en: {
    visits: 'visits',
    orders: 'orders',
    preparation: 'preparation',
    delivery: 'delivery',
    reception: 'reception',
    collections: 'collections',
    authorization: 'authorization',
  },
};

export function getServiceSlug(serviceKey: ServiceKey, locale: 'es' | 'en'): string {
  return serviceSlugsByLocale[locale][serviceKey];
}

export const testimonials = [
  { company: 'TALLERES BANFIELD', name: 'Sebastián Queirolo', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', quote: { es: 'El portal web desarrollado por ONCA IT significó una mejora sustancial en los ingresos de pedidos y en el servicio integral que damos a nuestros clientes', en: 'The web portal developed by ONCA IT meant a substantial improvement in order income and in the comprehensive service we provide to our clients' } },
  { company: 'PREVISORA DEL PARANÁ', name: 'Esteban Maciel', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', quote: { es: 'ONCA IT desarrolló nuestra app móvil para gestión de clientes brindando innovación y acompañamiento. Logramos integrar con nuestro ERP, mejorando procesos y fomentando la evolución continua.', en: 'ONCA IT developed our mobile app for client management providing innovation and support. We integrated with our ERP, improving processes and fostering continuous evolution.' } },
  { company: 'ELECTROOUTLET', name: 'Claudio Rozental', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80', quote: { es: 'En este mundo tan cambiante debemos entender que tanto la Ai como la automatización de los procesos son las únicas herramientas que ayudarán a las empresas a ser competitivas. De la mano de ONCA IT, nuestro asesor tecnológico, estamos recorriendo ese camino.', en: 'In this ever-changing world, we must understand that both AI and process automation are the only tools that will help companies be competitive. Together with ONCA IT, our technology advisor, we are on that path.' } },
  { company: 'FARMAGRE SRL', name: 'Gabriel Delizia', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80', quote: { es: 'ONCA Mobile resultó fundamental en nuestra reingeniería logística. Permitió optimizar la eficiencia, reducir significativamente los errores y elevar la satisfacción de nuestros clientes.', en: 'ONCA Mobile was fundamental in our logistics reengineering. It allowed us to optimize efficiency, significantly reduce errors and increase customer satisfaction.' } },
  { company: 'LA TRIESTINA', name: 'Pablo Cosentino', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80', quote: { es: 'Logramos automatizar la preparación y empaque de pedidos minimizando errores, lo cual impactó positivamente en la satisfacción del cliente, en nuestra eficiencia y fiabilidad del stock.', en: 'We automated order preparation and packaging, minimizing errors, which positively impacted customer satisfaction, our efficiency and stock reliability.' } },
  { company: 'NETFOOD', name: 'José Cabrales', role: 'Director de operaciones', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80', quote: { es: 'Conectan al talento humano en desarrollo de software con los proyectos tecnológicos más desafiantes.', en: 'They connect human talent in software development with the most challenging technology projects.' } },
];

export const partners = ['Acudir', 'Allub Hnos', 'Chisap', 'Celulosa Campana', 'Daedaz', 'ElectroOutlet', 'Fresh', 'Gleba', 'GTC', 'Mateo', 'Mercomax', 'Motorarg', 'Schaeffler', 'Oligra', 'Pingakol', 'Talleres Banfield', 'VIA'];
