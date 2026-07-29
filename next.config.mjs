/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@base44/sdk"],
  env: {
    NEXT_PUBLIC_BASE44_APP_ID: process.env.NEXT_PUBLIC_BASE44_APP_ID,
    NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION: process.env.NEXT_PUBLIC_BASE44_FUNCTIONS_VERSION,
    NEXT_PUBLIC_BASE44_SERVER_URL: process.env.NEXT_PUBLIC_BASE44_SERVER_URL,
    NEXT_PUBLIC_BASE44_APP_BASE_URL: process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL,
    VITE_BASE44_APP_ID: process.env.VITE_BASE44_APP_ID,
    VITE_BASE44_FUNCTIONS_VERSION: process.env.VITE_BASE44_FUNCTIONS_VERSION,
    VITE_BASE44_SERVER_URL: process.env.VITE_BASE44_SERVER_URL,
    VITE_BASE44_APP_BASE_URL: process.env.VITE_BASE44_APP_BASE_URL,
  },
};

export default nextConfig;
