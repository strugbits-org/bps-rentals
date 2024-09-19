export async function GET() {
    const baseUrl = process.env.BASE_URL || 'https://rentals.blueprintstudios.com';
  
    const sitemaps = [
      { loc: `${baseUrl}/category/sitemap.xml`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/product/sitemap.xml`, lastmod: new Date().toISOString() },
      { loc: `${baseUrl}/market/sitemap.xml`, lastmod: new Date().toISOString() },
    ];
  
    const sitemapIndex = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps
          .map(
            (sitemap) => `
              <sitemap>
                <loc>${sitemap.loc}</loc>
                <lastmod>${sitemap.lastmod}</lastmod>
              </sitemap>
            `
          )
          .join('')}
      </sitemapindex>
    `;
  
    return new Response(sitemapIndex, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }