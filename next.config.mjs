/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    CLIENT_ID_WIX: process.env.CLIENT_ID_WIX,
    CORPORATE_URL: process.env.CORPORATE_URL,
    APIKEY: process.env.APIKEY,
    BASE_URL: process.env.BASE_URL,
    CLIENT_SITE_ID_WIX: process.env.CLIENT_SITE_ID_WIX,
    CLIENT_API_KEY_WIX: process.env.CLIENT_API_KEY_WIX,
    MAX_FETCH_SIZE: process.env.MAX_FETCH_SIZE,
  },
};

export default nextConfig;
