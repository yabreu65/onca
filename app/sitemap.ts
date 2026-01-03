import { MetadataRoute } from 'next';
import { siteConfig, serviceKeys } from '@/lib/utils';

const baseUrl = siteConfig.url;
const locales = ['es', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Add root and main pages for each locale
  locales.forEach((locale) => {
    // Homepage
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Services overview
    routes.push({
      url: `${baseUrl}/${locale}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Individual service pages
    const serviceSlugMap = {
      visits: locale === 'es' ? 'visitas' : 'visits',
      orders: locale === 'es' ? 'pedidos' : 'orders',
      preparation: locale === 'es' ? 'preparacion' : 'preparation',
      delivery: locale === 'es' ? 'entregas' : 'delivery',
      reception: locale === 'es' ? 'recepcion' : 'reception',
      collections: locale === 'es' ? 'cobranzas' : 'collections',
      authorization: locale === 'es' ? 'autorizacion' : 'authorization',
    };

    serviceKeys.forEach((key) => {
      routes.push({
        url: `${baseUrl}/${locale}/servicios/${serviceSlugMap[key]}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });

    // Contact page
    routes.push({
      url: `${baseUrl}/${locale}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Success stories
    routes.push({
      url: `${baseUrl}/${locale}/casos-de-exito`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Partners
    routes.push({
      url: `${baseUrl}/${locale}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    // Privacy policy
    routes.push({
      url: `${baseUrl}/${locale}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });

    // Terms and conditions
    routes.push({
      url: `${baseUrl}/${locale}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  });

  return routes;
}
