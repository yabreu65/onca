import { MetadataRoute } from 'next';
import { siteConfig, serviceKeys, getServiceSlug } from '@/lib/utils';

const baseUrl = siteConfig.url;
const locales = ['es', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  const getLocalizedUrl = (locale: string, path: string) => {
    return locale === 'es' ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
  };

  // Add root and main pages for each locale
  locales.forEach((locale) => {
    // Homepage
    routes.push({
      url: getLocalizedUrl(locale, '/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    // Services overview
    routes.push({
      url: getLocalizedUrl(locale, '/servicios'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Individual service pages
    serviceKeys.forEach((key) => {
      routes.push({
        url: getLocalizedUrl(locale, `/servicios/${getServiceSlug(key, locale as 'es' | 'en')}`),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });

    // Success stories
    routes.push({
      url: getLocalizedUrl(locale, '/casos-de-exito'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });

    // Partners
    routes.push({
      url: getLocalizedUrl(locale, '/partners'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });

    // Privacy policy
    routes.push({
      url: getLocalizedUrl(locale, '/privacidad'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });

    // Terms and conditions
    routes.push({
      url: getLocalizedUrl(locale, '/terminos'),
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    });
  });

  return routes;
}
