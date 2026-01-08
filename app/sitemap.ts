import { MetadataRoute } from 'next';
import { siteConfig, serviceKeys, getServiceSlug } from '@/lib/utils';

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Homepage
  routes.push({
    url: `${baseUrl}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Services overview
  routes.push({
    url: `${baseUrl}/servicios`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  });

  // Individual service pages
  serviceKeys.forEach((key) => {
    routes.push({
      url: `${baseUrl}/servicios/${getServiceSlug(key)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Success stories
  routes.push({
    url: `${baseUrl}/casos-de-exito`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  });

  // Partners
  routes.push({
    url: `${baseUrl}/partners`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  });

  // Privacy policy
  routes.push({
    url: `${baseUrl}/privacidad`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  // Terms and conditions
  routes.push({
    url: `${baseUrl}/terminos`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.3,
  });

  return routes;
}
