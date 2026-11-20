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
    const isDev = process.env.NODE_ENV !== 'production'
    // Only what the site actually loads: Google Analytics (consent-gated),
    // Vercel Analytics (same origin), the Web3Forms enquiry endpoint, hCaptcha
    // on the contact form (components/form-captcha.tsx) and the Google Maps
    // embed on /contact. Scripts are 'unsafe-inline' because Next and the
    // consent bootstrap emit inline scripts; a nonce-based policy would need
    // per-request middleware and would turn off static rendering.
    //
    // If another tag (e.g. Meta Pixel, Hotjar) is added later, its domains
    // must be added here or the browser will block it.
    const HCAPTCHA = 'https://hcaptcha.com https://*.hcaptcha.com'
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com ${HCAPTCHA}`,
      `style-src 'self' 'unsafe-inline' ${HCAPTCHA}`,
      "img-src 'self' data: blob: https://www.googletagmanager.com",
      "font-src 'self' data:",
      `connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com ${HCAPTCHA}`,
      `frame-src https://www.google.com ${HCAPTCHA}`,
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
