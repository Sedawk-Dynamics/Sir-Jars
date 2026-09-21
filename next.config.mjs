/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // All imagery is local to /public now — the logo included — so no remote
  // hosts need allowing.
  images: {},
  // The six verticals were restructured in Aug 2026: Digital + AI became
  // Digital Platforms & Intelligent Automation, and Cybersecurity and Digital
  // Forensics merged into one vertical. Old URLs redirect permanently.
  async redirects() {
    return [
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
