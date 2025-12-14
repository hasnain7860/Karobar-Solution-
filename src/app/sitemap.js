export default function sitemap() {
  // CRITICAL: Agar domain abhi tak nahi khareeda, to yahan apni Vercel app ka link daalo
  // e.g., 'https://your-project-name.vercel.app'
  const baseUrl = 'https://karobarsolution.com'; 

  return [
    {
      url: baseUrl,
      lastModified: new Date(), // Ye har build par auto-update hoga
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Agar future mein aur pages banao, to unhein yahan add kar dena:
    // {
    //   url: `${baseUrl}/privacy-policy`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}

