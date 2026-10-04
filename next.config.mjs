/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ['sharp'],
  // Resolve the language entry point before Clerk middleware runs. This keeps
  // a first visit to / from entering the auth handshake before its /de redirect.
  async redirects() {
    return [{ source: '/', destination: '/de', permanent: true }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 360, 390, 430, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [48, 64, 96, 128, 160, 256, 320],
    qualities: [70, 76, 80, 82, 84, 88, 90, 92],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: false,
    remotePatterns: [
      { protocol: 'https', hostname: 'media.base44.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:folder(brand-assets|media|logos)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
