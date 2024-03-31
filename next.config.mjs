/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    THIRDWEB_CLIENT_KEY: process.env.THIRDWEB_CLIENT_KEY,
    THIRDWEB_SECRET_KEY: process.env.THIRDWEB_SECRET_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "letsenhance.io",
      },
    ],
  },
};

export default nextConfig;
