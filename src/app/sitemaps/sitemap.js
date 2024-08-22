const BASE_URL = process.env.BASE_URL;

const routesArray = [
  { name: "Cart", slug: "cart" },
  { name: "Quote Request", slug: "quote-request" },
];

export default async function sitemap() {
  const routes = routesArray.map((page) => ({
    url: `${BASE_URL}/${page.slug}`,
    lastModified: new Date(),
  }));

  return [...routes];
}
