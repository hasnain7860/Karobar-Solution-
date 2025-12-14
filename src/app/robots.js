export default function robots() {
  const baseUrl = 'https://karobarsolution.com'; // APNA DOMAIN YAHAN CHANGE KARO

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

