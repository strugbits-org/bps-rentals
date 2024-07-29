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
    CORPORATE_URL: process.env.CORPORATE_URL
  }
};

export default nextConfig;
