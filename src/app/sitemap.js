const BASE_URL = process.env.BASE_URL;

const routesArray = [
  { name: "Category", slug: "category/sitemap.xml" },
  { name: "Product", slug: "product/sitemap.xml" },
  { name: "Market", slug: "market/sitemap.xml" },
];

export default async function sitemap() {
  const routes = routesArray.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: new Date(),
  }));

  return [...routes];
}
