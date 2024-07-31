/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  },
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  env: {
    CLIENT_ID_WIX: process.env.CLIENT_ID_WIX,
    CORPORATE_URL: process.env.CORPORATE_URL,
    APIKEY: process.env.APIKEY
  }
};

export default nextConfig;
