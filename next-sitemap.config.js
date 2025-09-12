/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://rockyracing13.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/']
      }
    ],
    additionalSitemaps: [
      'https://rockyracing13.com/sitemap.xml'
    ]
  },
  exclude: [
    '/admin/*',
    '/api/*'
  ],
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/team'),  
    await config.transform(config, '/watch'),
    await config.transform(config, '/schedule'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/support'),
    await config.transform(config, '/sponsors'),
    await config.transform(config, '/contact')
  ]
}