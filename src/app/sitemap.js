import { postRegistry } from './data/postRegistry';

export default function sitemap() {
  const baseUrl = 'https://karobarsolution.com';

  // 1. Static Routes (Jo hamesha same rehte hain)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // 2. Dynamic Blog Routes (Registry se khud uthaye ga)
  const blogRoutes = Object.keys(postRegistry).map((slug) => {
    const post = postRegistry[slug];
    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: post.lastModified ? new Date(post.lastModified) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  // Dono ko merge kar ke return karein
  return [...staticRoutes, ...blogRoutes];
}

