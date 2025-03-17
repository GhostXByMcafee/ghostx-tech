import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ghostx.tech';
  const locales = ['en', 'es', 'pt'];
  
  const routes = [
    '',
    '/about',
    '/atomic-swap',
    '/chatbot',
    '/privacy-tools',
  ];

  const lastModified = new Date();
  
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  locales.forEach(locale => {
    if (locale === 'en') return;
    
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  routes.forEach(route => {
    if (route === '') return;
    
    sitemap.push({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    locales.forEach(locale => {
      if (locale === 'en') return;
      
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  return sitemap;
} 