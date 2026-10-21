/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets the dev server be opened from other devices on the local network.
  allowedDevOrigins: ['192.168.1.6'],
  typescript: {
    ignoreBuildErrors: true,
  },
  // All imagery is local to /public now — the logo included — so no remote
  // hosts need allowing.
  // AVIF first, WebP fallback: the source PNGs are 0.9–2 MB each.
  images: { formats: ['image/avif', 'image/webp'] },
  poweredByHeader: false,
  // The six verticals were restructured in Aug 2026: Digital + AI became
  // Digital Platforms & Intelligent Automation, and Cybersecurity and Digital
  // Forensics merged into one vertical. Old URLs redirect permanently.
  async redirects() {
    return [
      { source: '/proof', destination: '/capabilities', permanent: true },
      { source: '/capabilities/digital-ai', destination: '/capabilities/digital-platforms', permanent: true },
      { source: '/capabilities/cybersecurity', destination: '/capabilities/cybersecurity-forensics', permanent: true },
      { source: '/capabilities/digital-forensics', destination: '/capabilities/cybersecurity-forensics', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
