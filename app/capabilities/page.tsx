import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import CapabilityCards from '@/components/capability-cards'
import CapabilityOrbit from '@/components/capability-orbit'
import ClosingCta from '@/components/home/closing-cta'
import { patternVars } from '@/lib/patterns'

export const metadata: Metadata = {
  title: 'Services — what do you need help with?',
  description:
    'Publishing, media, digital platforms, data and business operations, the AI & Future Skills Academy, and cybersecurity and digital forensics — six connected capabilities coordinated by one accountable partner.',
  alternates: { canonical: '/capabilities' },
}

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Six services. One contact coordinating the work."
        intro="Publishing, media, digital systems, business operations, skills and security. Choose the service that fits your need — if the work crosses several areas, we plan it with you as one job."
        breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }]}
        image="/images/hero-cinematic.png"
        imageAlt="Specialists at work across connected disciplines."
        pattern="hatch"
      />

      <CapabilityCards />

      <section
        className="on-dark patterned py-20 lg:py-28"
        style={{ background: 'var(--color-plum)', ...patternVars('diagonal') }}
      >
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2
              className="font-extrabold tracking-tight leading-tight"
              style={{
                color: 'var(--color-ivory)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              }}
            >
              How the six connect
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'rgba(252,251,248,0.7)' }}
            >
              Select a capability to see what it covers and where human review sits.
            </p>
          </div>
          <CapabilityOrbit variant="dark" />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
